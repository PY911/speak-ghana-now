import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { findLanguage, findLesson, type Word } from "@/lib/lessons";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/learn/$lang/$lesson")({
  component: LessonPlayer,
});

type Step =
  | { kind: "flash"; word: Word }
  | { kind: "mc"; word: Word; options: string[] }
  | { kind: "recall"; word: Word; options: string[] }
  | { kind: "match"; pairs: Word[] };

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function buildSteps(words: Word[]): Step[] {
  const all = words;
  const steps: Step[] = [];
  // Phase 1: flashcards (introduce)
  words.forEach((w) => steps.push({ kind: "flash", word: w }));
  // Phase 2: multiple choice (english -> native)
  words.forEach((w) => {
    const distractors = shuffle(all.filter((x) => x.native !== w.native)).slice(0, 3).map((x) => x.native);
    steps.push({ kind: "mc", word: w, options: shuffle([w.native, ...distractors]) });
  });
  // Phase 3: recall (native -> english)
  words.forEach((w) => {
    const distractors = shuffle(all.filter((x) => x.english !== w.english)).slice(0, 3).map((x) => x.english);
    steps.push({ kind: "recall", word: w, options: shuffle([w.english, ...distractors]) });
  });
  // Phase 4: matching pairs (chunks of 4)
  chunk(shuffle(words), 4).forEach((pairs) => {
    if (pairs.length >= 2) steps.push({ kind: "match", pairs });
  });
  return steps;
}

function LessonPlayer() {
  const { lang: code, lesson: lessonId } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const lang = findLanguage(code);
  const lesson = findLesson(code, lessonId);

  const steps = useMemo(() => (lesson ? buildSteps(lesson.words) : []), [lesson]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [user, loading, navigate]);
  useEffect(() => { setFlipped(false); setPicked(null); }, [idx]);

  // Save on completion
  useEffect(() => {
    if (!done || !user || !lesson || saved) return;
    const score = correct;
    const xpGain = score * 5;
    (async () => {
      // Upsert lesson progress (keep best)
      const { data: existing } = await supabase
        .from("lesson_progress")
        .select("best_score")
        .eq("user_id", user.id).eq("language_code", code).eq("lesson_id", lessonId)
        .maybeSingle();
      const newBest = Math.max(existing?.best_score ?? 0, score);
      const isNew = !existing;
      await supabase.from("lesson_progress").upsert({
        user_id: user.id, language_code: code, lesson_id: lessonId,
        best_score: newBest, completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,language_code,lesson_id" });

      // Update profile XP + streak (only on first completion of this lesson today)
      if (isNew || score > (existing?.best_score ?? 0)) {
        const { data: prof } = await supabase
          .from("profiles").select("xp,streak,last_lesson_date").eq("id", user.id).maybeSingle();
        if (prof) {
          const today = new Date().toISOString().slice(0, 10);
          const last = prof.last_lesson_date;
          let streak = prof.streak;
          if (last !== today) {
            const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
            streak = last === yest ? streak + 1 : 1;
          }
          await supabase.from("profiles").update({
            xp: prof.xp + xpGain, streak, last_lesson_date: today,
          }).eq("id", user.id);
        }
      }
      setSaved(true);
      toast.success(`+${xpGain} XP earned!`);
    })();
  }, [done, user, lesson, code, lessonId, correct, saved]);

  if (!user) return null;
  if (!lang || !lesson) {
    return (
      <div className="min-h-screen bg-cream">
        <AppHeader />
        <div className="mx-auto max-w-2xl px-4 py-12 text-center">
          <h1 className="font-display text-2xl font-bold">Lesson not found</h1>
          <Link to="/learn" className="mt-4 inline-block underline">Back</Link>
        </div>
      </div>
    );
  }

  if (done) {
    const total = lesson.words.length;
    return (
      <div className="min-h-screen bg-cream">
        <AppHeader />
        <main className="mx-auto max-w-md px-4 py-12 text-center">
          <div className="text-6xl">🎉</div>
          <h1 className="mt-4 font-display text-4xl font-bold text-ink">Lesson complete!</h1>
          <p className="mt-2 text-muted-foreground">You got {correct} answers right · {total} new words.</p>
          <div className="mt-6 rounded-2xl border-2 border-ink bg-sun p-5 shadow-bold">
            <div className="text-xs font-bold uppercase tracking-wider">Earned</div>
            <div className="font-display text-3xl font-bold">⭐ {correct * 5} XP</div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/learn/$lang" params={{ lang: code }}
              className="rounded-xl bg-ink py-3 font-bold text-sun shadow-bold-sun transition-bounce hover:-translate-y-0.5">
              Back to {lang.name}
            </Link>
            <button onClick={() => { setIdx(0); setCorrect(0); setDone(false); setSaved(false); }}
              className="rounded-xl border-2 border-ink py-3 font-semibold">
              Practice again
            </button>
          </div>
        </main>
      </div>
    );
  }

  const step = steps[idx];
  const progress = ((idx) / steps.length) * 100;

  const pick = (opt: string, answer: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === answer) setCorrect((c) => c + 1);
    setTimeout(() => {
      if (idx + 1 >= steps.length) setDone(true);
      else setIdx((i) => i + 1);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-cream">
      <AppHeader />
      <main className="mx-auto max-w-xl px-4 py-6">
        <div className="flex items-center gap-3">
          <Link to="/learn/$lang" params={{ lang: code }} className="text-2xl">✕</Link>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-ink transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-8">
          {step.kind === "flash" && (
            <div>
              <p className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">Tap to flip</p>
              <button
                onClick={() => setFlipped((f) => !f)}
                className="mt-4 flex min-h-[16rem] w-full items-center justify-center rounded-3xl border-2 border-ink bg-card p-8 shadow-bold transition-bounce hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="font-display text-4xl font-bold text-ink sm:text-5xl">
                    {flipped ? step.word.english : step.word.native}
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    {flipped ? "English" : lang.name}
                  </div>
                </div>
              </button>
              <button
                onClick={() => { if (idx + 1 >= steps.length) setDone(true); else setIdx((i) => i + 1); }}
                className="mt-6 w-full rounded-xl bg-ink py-3 font-bold text-sun shadow-bold-sun transition-bounce hover:-translate-y-0.5"
              >
                Continue →
              </button>
            </div>
          )}

          {step.kind === "mc" && (
            <div>
              <p className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Translate to {lang.name}
              </p>
              <div className="mt-4 rounded-3xl border-2 border-ink bg-card p-8 text-center shadow-bold">
                <div className="font-display text-3xl font-bold text-ink sm:text-4xl">{step.word.english}</div>
              </div>
              <div className="mt-6 grid gap-3">
                {step.options.map((o) => {
                  const right = picked && o === step.word.native;
                  const wrong = picked === o && o !== step.word.native;
                  return (
                    <button key={o} onClick={() => pick(o, step.word.native)}
                      className={`rounded-xl border-2 p-4 text-left text-lg font-semibold transition ${
                        right ? "border-ink bg-sun" : wrong ? "border-destructive bg-destructive/10" : "border-ink/20 bg-card hover:border-ink"
                      }`}>
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step.kind === "recall" && (
            <div>
              <p className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                What does this mean?
              </p>
              <div className="mt-4 rounded-3xl border-2 border-ink bg-card p-8 text-center shadow-bold">
                <div className="font-display text-3xl font-bold text-ink sm:text-4xl">{step.word.native}</div>
              </div>
              <div className="mt-6 grid gap-3">
                {step.options.map((o) => {
                  const right = picked && o === step.word.english;
                  const wrong = picked === o && o !== step.word.english;
                  return (
                    <button key={o} onClick={() => pick(o, step.word.english)}
                      className={`rounded-xl border-2 p-4 text-left text-lg font-semibold transition ${
                        right ? "border-ink bg-sun" : wrong ? "border-destructive bg-destructive/10" : "border-ink/20 bg-card hover:border-ink"
                      }`}>
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step.kind === "match" && (
            <MatchPanel
              pairs={step.pairs}
              onDone={(score) => {
                setCorrect((c) => c + score);
                setTimeout(() => {
                  if (idx + 1 >= steps.length) setDone(true);
                  else setIdx((i) => i + 1);
                }, 700);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

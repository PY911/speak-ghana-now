import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { findLanguage, findLesson, type Word, type Sentence } from "@/lib/lessons";
import { speak, ttsAvailable } from "@/lib/tts";
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
  | { kind: "match"; pairs: Word[] }
  | { kind: "sentence"; sentence: Sentence };

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function buildSteps(words: Word[], sentences?: Sentence[]): Step[] {
  const all = words;
  const steps: Step[] = [];
  words.forEach((w) => steps.push({ kind: "flash", word: w }));
  words.forEach((w) => {
    const distractors = shuffle(all.filter((x) => x.native !== w.native)).slice(0, 3).map((x) => x.native);
    steps.push({ kind: "mc", word: w, options: shuffle([w.native, ...distractors]) });
  });
  words.forEach((w) => {
    const distractors = shuffle(all.filter((x) => x.english !== w.english)).slice(0, 3).map((x) => x.english);
    steps.push({ kind: "recall", word: w, options: shuffle([w.english, ...distractors]) });
  });
  chunk(shuffle(words), 4).forEach((pairs) => {
    if (pairs.length >= 2) steps.push({ kind: "match", pairs });
  });
  sentences?.forEach((s) => steps.push({ kind: "sentence", sentence: s }));
  return steps;
}

function SpeakButton({ text, voiceLang, size = "md" }: { text: string; voiceLang?: string; size?: "sm" | "md" }) {
  if (!ttsAvailable()) return null;
  const px = size === "sm" ? "h-9 w-9 text-base" : "h-12 w-12 text-xl";
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); speak(text, voiceLang); }}
      aria-label={`Listen to ${text}`}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-ink bg-card ${px} shadow-bold transition-bounce hover:-translate-y-0.5 hover:bg-sun`}
    >
      🔊
    </button>
  );
}

function LessonPlayer() {
  const { lang: code, lesson: lessonId } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const lang = findLanguage(code);
  const lesson = findLesson(code, lessonId);

  const steps = useMemo(() => (lesson ? buildSteps(lesson.words, lesson.sentences) : []), [lesson]);
  const [started, setStarted] = useState(false);
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

  // Intro screen — show tip & cultural note before starting
  if (!started) {
    return (
      <div className="min-h-screen bg-cream">
        <AppHeader />
        <main className="mx-auto max-w-xl px-4 py-8">
          <Link to="/learn/$lang" params={{ lang: code }} className="text-sm text-muted-foreground hover:text-ink">← Back</Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-4xl">{lesson.emoji}</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{lang.name}</div>
              <h1 className="font-display text-3xl font-bold text-ink">{lesson.title}</h1>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border-2 border-ink bg-card p-5 shadow-bold">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What you'll learn</div>
              <p className="mt-1 font-semibold">
                {lesson.words.length} words
                {lesson.sentences?.length ? ` and ${lesson.sentences.length} example phrases` : ""}.
              </p>
            </div>
            {lesson.tip && (
              <div className="rounded-2xl border-2 border-ink bg-sun/40 p-5 shadow-bold">
                <div className="text-xs font-bold uppercase tracking-wider">💡 Tip</div>
                <p className="mt-1 text-sm leading-relaxed">{lesson.tip}</p>
              </div>
            )}
            {lesson.culturalNote && (
              <div className="rounded-2xl border-2 border-ink bg-card p-5 shadow-bold">
                <div className="text-xs font-bold uppercase tracking-wider">🌍 Cultural note</div>
                <p className="mt-1 text-sm leading-relaxed">{lesson.culturalNote}</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setStarted(true)}
            className="mt-8 w-full rounded-xl bg-ink py-4 font-bold text-sun shadow-bold-sun transition-bounce hover:-translate-y-0.5"
          >
            Start lesson →
          </button>
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
                  {!flipped && step.word.pronunciation && (
                    <div className="mt-2 text-base italic text-muted-foreground">/{step.word.pronunciation}/</div>
                  )}
                  <div className="mt-3 text-sm text-muted-foreground">
                    {flipped ? "English" : lang.name}
                  </div>
                </div>
              </button>
              <div className="mt-4 flex justify-center">
                <SpeakButton text={step.word.native} voiceLang={lang.voiceLang} />
              </div>
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
                  const right = picked !== null && o === step.word.native;
                  const wrong = picked === o && o !== step.word.native;
                  return (
                    <button key={o} onClick={() => pick(o, step.word.native)}
                      className={`flex items-center justify-between gap-3 rounded-xl border-2 p-4 text-left text-lg font-semibold transition ${
                        right ? "border-ink bg-sun" : wrong ? "border-destructive bg-destructive/10" : "border-ink/20 bg-card hover:border-ink"
                      }`}>
                      <span>{o}</span>
                      {right && <SpeakButton text={o} voiceLang={lang.voiceLang} size="sm" />}
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
                <div className="flex items-center justify-center gap-3">
                  <div className="font-display text-3xl font-bold text-ink sm:text-4xl">{step.word.native}</div>
                  <SpeakButton text={step.word.native} voiceLang={lang.voiceLang} size="sm" />
                </div>
                {step.word.pronunciation && (
                  <div className="mt-2 text-sm italic text-muted-foreground">/{step.word.pronunciation}/</div>
                )}
              </div>
              <div className="mt-6 grid gap-3">
                {step.options.map((o) => {
                  const right = picked !== null && o === step.word.english;
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

          {step.kind === "sentence" && (
            <div>
              <p className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Example phrase
              </p>
              <div className="mt-4 rounded-3xl border-2 border-ink bg-card p-8 text-center shadow-bold">
                <div className="font-display text-2xl font-bold text-ink sm:text-3xl">{step.sentence.native}</div>
                {step.sentence.pronunciation && (
                  <div className="mt-2 text-sm italic text-muted-foreground">/{step.sentence.pronunciation}/</div>
                )}
                <div className="mt-4 text-base text-muted-foreground">{step.sentence.english}</div>
                <div className="mt-4 flex justify-center">
                  <SpeakButton text={step.sentence.native} voiceLang={lang.voiceLang} />
                </div>
              </div>
              <button
                onClick={() => { if (idx + 1 >= steps.length) setDone(true); else setIdx((i) => i + 1); }}
                className="mt-6 w-full rounded-xl bg-ink py-3 font-bold text-sun shadow-bold-sun transition-bounce hover:-translate-y-0.5"
              >
                Continue →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function MatchPanel({ pairs, onDone }: { pairs: Word[]; onDone: (score: number) => void }) {
  const [natives] = useState(() => shuffle(pairs.map((p) => p.native)));
  const [englishes] = useState(() => shuffle(pairs.map((p) => p.english)));
  const [selectedN, setSelectedN] = useState<string | null>(null);
  const [selectedE, setSelectedE] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<{ n: string; e: string } | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!selectedN || !selectedE) return;
    const pair = pairs.find((p) => p.native === selectedN);
    if (pair && pair.english === selectedE) {
      setMatched((m) => new Set(m).add(selectedN));
      setScore((s) => s + 1);
      setSelectedN(null); setSelectedE(null);
    } else {
      setWrong({ n: selectedN, e: selectedE });
      setTimeout(() => { setWrong(null); setSelectedN(null); setSelectedE(null); }, 600);
    }
  }, [selectedN, selectedE, pairs]);

  useEffect(() => {
    if (matched.size === pairs.length) {
      const finalScore = score;
      setTimeout(() => onDone(finalScore), 400);
    }
  }, [matched, pairs.length, score, onDone]);

  const cls = (val: string, kind: "n" | "e") => {
    const isMatched = kind === "n"
      ? matched.has(val)
      : pairs.some((p) => matched.has(p.native) && p.english === val);
    const isSelected = (kind === "n" ? selectedN : selectedE) === val;
    const isWrong = wrong && (kind === "n" ? wrong.n === val : wrong.e === val);
    if (isMatched) return "border-ink bg-sun opacity-50 line-through";
    if (isWrong) return "border-destructive bg-destructive/10";
    if (isSelected) return "border-ink bg-sun";
    return "border-ink/20 bg-card hover:border-ink";
  };

  return (
    <div>
      <p className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Match the pairs
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {natives.map((n) => (
            <button key={n} disabled={matched.has(n)}
              onClick={() => setSelectedN(n)}
              className={`w-full rounded-xl border-2 p-3 text-sm font-semibold transition ${cls(n, "n")}`}>
              {n}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {englishes.map((e) => {
            const isMatched = pairs.some((p) => matched.has(p.native) && p.english === e);
            return (
              <button key={e} disabled={isMatched}
                onClick={() => setSelectedE(e)}
                className={`w-full rounded-xl border-2 p-3 text-sm font-semibold transition ${cls(e, "e")}`}>
                {e}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

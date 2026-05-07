import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LANGUAGES, DAILY_XP_GOAL } from "@/lib/lessons";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Choose a language — GoGhana" },
      { name: "description", content: "Pick a Ghanaian language to start learning." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [completedByLang, setCompletedByLang] = useState<Record<string, number>>({});
  const [todayXp, setTodayXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("lesson_progress").select("language_code,best_score,completed_at")
      .eq("user_id", user.id).then(({ data }) => {
        const counts: Record<string, number> = {};
        const today = new Date().toISOString().slice(0, 10);
        let xp = 0;
        data?.forEach((r) => {
          counts[r.language_code] = (counts[r.language_code] || 0) + 1;
          if (r.completed_at?.slice(0, 10) === today) xp += (r.best_score ?? 0) * 5;
        });
        setCompletedByLang(counts);
        setTodayXp(xp);
      });
    supabase.from("profiles").select("streak").eq("id", user.id).maybeSingle()
      .then(({ data }) => data && setStreak(data.streak));
  }, [user]);

  if (!user) return null;

  const goalPct = Math.min(100, (todayXp / DAILY_XP_GOAL) * 100);
  const featured = LANGUAGES.find((l) => l.available && (completedByLang[l.code] ?? 0) < l.lessons.length);
  const featuredLesson = featured?.lessons.find(
    (_, i) => i === (completedByLang[featured.code] ?? 0)
  ) ?? featured?.lessons[0];

  return (
    <div className="min-h-screen bg-cream">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Daily goal */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-ink bg-card p-5 shadow-bold">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0">
                <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-muted" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-ink"
                    strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${goalPct}, 100`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {Math.round(goalPct)}%
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Daily goal</div>
                <div className="font-display text-xl font-bold">{todayXp} / {DAILY_XP_GOAL} XP</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-ink bg-sun p-5 shadow-bold">
            <div className="text-xs font-bold uppercase tracking-wider">Streak</div>
            <div className="font-display text-3xl font-bold">🔥 {streak} {streak === 1 ? "day" : "days"}</div>
            <div className="mt-1 text-xs text-ink/70">Complete a lesson today to keep it!</div>
          </div>
          <Link to="/leaderboard" className="rounded-2xl border-2 border-ink bg-ink p-5 text-sun shadow-bold-sun transition-bounce hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider opacity-70">Compete</div>
            <div className="font-display text-2xl font-bold">🏆 Leaderboard</div>
            <div className="mt-1 text-xs opacity-70">See top learners →</div>
          </Link>
        </div>

        {/* Lesson of the day */}
        {featured && featuredLesson && (
          <Link to="/learn/$lang/$lesson" params={{ lang: featured.code, lesson: featuredLesson.id }}
            className="mt-6 flex items-center justify-between rounded-2xl border-2 border-ink bg-gradient-to-r from-sun to-sun-deep p-5 shadow-bold transition-bounce hover:-translate-y-1">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-ink/70">Lesson of the day</div>
              <div className="font-display text-2xl font-bold text-ink">
                {featuredLesson.emoji} {featured.name} · {featuredLesson.title}
              </div>
            </div>
            <span className="rounded-full bg-ink px-4 py-2 font-bold text-sun">Start →</span>
          </Link>
        )}

        <h1 className="mt-10 font-display text-3xl font-bold text-ink sm:text-4xl">Choose a language</h1>
        <p className="mt-2 text-muted-foreground">Tap a card to start learning. More languages coming soon.</p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LANGUAGES.map((lang) => {
            const done = completedByLang[lang.code] || 0;
            const total = lang.lessons.length;
            const card = (
              <div
                className={`group relative h-full rounded-2xl border-2 border-ink bg-card p-5 transition-bounce ${
                  lang.available ? "shadow-bold hover:-translate-y-1 hover:shadow-bold-sun" : "opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-3xl">{lang.flag}</div>
                    <h2 className="mt-2 font-display text-2xl font-bold text-ink break-words">{lang.name}</h2>
                    <p className="text-sm text-muted-foreground">{lang.region}</p>
                  </div>
                  <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink whitespace-nowrap">{lang.greeting}</span>
                </div>
                {lang.available ? (
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold">{done}/{total} lessons</span>
                    <span className="font-bold text-ink group-hover:translate-x-1 transition-bounce">Start →</span>
                  </div>
                ) : (
                  <div className="mt-4 text-sm font-semibold text-muted-foreground">Coming soon</div>
                )}
              </div>
            );
            return lang.available ? (
              <Link key={lang.code} to="/learn/$lang" params={{ lang: lang.code }}>{card}</Link>
            ) : (
              <div key={lang.code}>{card}</div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

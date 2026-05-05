import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { findLanguage } from "@/lib/lessons";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/learn/$lang")({
  component: LangPage,
});

function LangPage() {
  const { lang: code } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const lang = findLanguage(code);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !lang) return;
    supabase
      .from("lesson_progress")
      .select("lesson_id,best_score")
      .eq("user_id", user.id)
      .eq("language_code", code)
      .then(({ data }) => {
        const map: Record<string, number> = {};
        data?.forEach((r) => { map[r.lesson_id] = r.best_score; });
        setProgress(map);
      });
  }, [user, code, lang]);

  if (!user) return null;
  if (!lang || !lang.available) {
    return (
      <div className="min-h-screen bg-cream">
        <AppHeader />
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <h1 className="font-display text-3xl font-bold">Coming soon</h1>
          <Link to="/learn" className="mt-4 inline-block font-semibold underline">Back to languages</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/learn" className="text-sm text-muted-foreground hover:text-ink">← All languages</Link>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-4xl">{lang.flag}</span>
          <div>
            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{lang.name}</h1>
            <p className="text-muted-foreground">{lang.region} • {lang.greeting}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {lang.lessons.map((lesson, i) => {
            const score = progress[lesson.id];
            const done = score !== undefined;
            return (
              <Link
                key={lesson.id}
                to="/learn/$lang/$lesson"
                params={{ lang: code, lesson: lesson.id }}
                className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-card p-5 shadow-bold transition-bounce hover:-translate-y-1 hover:shadow-bold-sun"
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${done ? "bg-sun" : "bg-muted"}`}>
                  {done ? "✓" : lesson.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lesson {i + 1}</div>
                  <h2 className="font-display text-xl font-bold text-ink">{lesson.title}</h2>
                  <p className="text-sm text-muted-foreground">{lesson.words.length} words{done ? ` • Best: ${score}/${lesson.words.length}` : ""}</p>
                </div>
                <span className="font-bold">→</span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

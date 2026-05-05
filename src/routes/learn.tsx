import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LANGUAGES } from "@/lib/lessons";
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

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("lesson_progress").select("language_code").eq("user_id", user.id).then(({ data }) => {
      const counts: Record<string, number> = {};
      data?.forEach((r) => { counts[r.language_code] = (counts[r.language_code] || 0) + 1; });
      setCompletedByLang(counts);
    });
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Choose a language</h1>
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
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl">{lang.flag}</div>
                    <h2 className="mt-2 font-display text-2xl font-bold text-ink">{lang.name}</h2>
                    <p className="text-sm text-muted-foreground">{lang.region}</p>
                  </div>
                  <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink">{lang.greeting}</span>
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

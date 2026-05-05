import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { LANGUAGES } from "@/lib/lessons";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — GoGhana" }] }),
  component: ProfilePage,
});

type Profile = { display_name: string | null; xp: number; streak: number; last_lesson_date: string | null };

function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<{ language_code: string; lesson_id: string; best_score: number }[]>([]);

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [user, loading, navigate]);
  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name,xp,streak,last_lesson_date").eq("id", user.id).maybeSingle()
      .then(({ data }) => setProfile(data));
    supabase.from("lesson_progress").select("language_code,lesson_id,best_score").eq("user_id", user.id)
      .then(({ data }) => setProgress(data || []));
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-3xl border-2 border-ink bg-card p-6 shadow-bold">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sun font-display text-3xl font-bold text-ink">
              {(profile?.display_name || user.email || "?")[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-bold text-ink">{profile?.display_name || "Learner"}</h1>
              <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border-2 border-ink bg-sun p-4 text-center">
              <div className="text-xs font-bold uppercase">Streak</div>
              <div className="font-display text-3xl font-bold">🔥 {profile?.streak ?? 0}</div>
            </div>
            <div className="rounded-2xl border-2 border-ink bg-ink p-4 text-center text-sun">
              <div className="text-xs font-bold uppercase">XP</div>
              <div className="font-display text-3xl font-bold">⭐ {profile?.xp ?? 0}</div>
            </div>
          </div>
        </div>

        <h2 className="mt-8 font-display text-2xl font-bold text-ink">Your progress</h2>
        {progress.length === 0 ? (
          <p className="mt-2 text-muted-foreground">No lessons yet. <Link to="/learn" className="font-semibold underline">Start one</Link>.</p>
        ) : (
          <div className="mt-4 space-y-2">
            {LANGUAGES.filter((l) => progress.some((p) => p.language_code === l.code)).map((l) => {
              const items = progress.filter((p) => p.language_code === l.code);
              return (
                <div key={l.code} className="rounded-2xl border-2 border-ink bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-lg font-bold">{l.flag} {l.name}</div>
                    <div className="text-sm text-muted-foreground">{items.length}/{l.lessons.length} lessons</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button onClick={async () => { await signOut(); navigate({ to: "/" }); }}
          className="mt-8 w-full rounded-xl border-2 border-ink py-3 font-semibold">
          Sign out
        </button>
      </main>
    </div>
  );
}

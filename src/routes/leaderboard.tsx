import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — GoGhana" },
      { name: "description", content: "Top GoGhana learners ranked by XP." },
    ],
  }),
  component: LeaderboardPage,
});

type Row = { id: string; display_name: string | null; xp: number; streak: number };

function LeaderboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("id,display_name,xp,streak")
      .order("xp", { ascending: false }).limit(50)
      .then(({ data }) => { setRows((data as Row[]) ?? []); setBusy(false); });
  }, [user]);

  if (!user) return null;

  const medal = (i: number) => (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`);

  return (
    <div className="min-h-screen bg-cream">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link to="/learn" className="text-sm text-muted-foreground hover:text-ink">← Back</Link>
        <h1 className="mt-4 font-display text-4xl font-bold text-ink">🏆 Leaderboard</h1>
        <p className="mt-1 text-muted-foreground">Top 50 learners ranked by total XP.</p>

        {busy ? (
          <p className="mt-8 text-center text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mt-8 text-center text-muted-foreground">No learners yet — be the first!</p>
        ) : (
          <ul className="mt-6 space-y-2">
            {rows.map((r, i) => {
              const me = r.id === user.id;
              return (
                <li key={r.id}
                  className={`flex items-center gap-4 rounded-2xl border-2 border-ink p-4 ${me ? "bg-sun shadow-bold" : "bg-card"}`}>
                  <div className="w-12 shrink-0 text-center font-display text-xl font-bold">{medal(i)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg font-bold truncate">
                      {r.display_name || "Anonymous"} {me && <span className="text-xs">(you)</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">🔥 {r.streak} day streak</div>
                  </div>
                  <div className="font-display text-xl font-bold">⭐ {r.xp}</div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}

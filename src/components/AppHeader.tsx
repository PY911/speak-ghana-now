import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import iconImg from "@/assets/goghana-icon.png";

export function AppHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<{ xp: number; streak: number } | null>(null);

  useEffect(() => {
    if (!user) return setStats(null);
    supabase
      .from("profiles")
      .select("xp,streak")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => data && setStats({ xp: data.xp, streak: data.streak }));
  }, [user]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={iconImg} alt="GoGhana" className="h-9 w-9 rounded-lg" />
          <span className="font-display text-xl font-bold text-ink">GoGhana</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {user ? (
            <>
              {stats && (
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="rounded-full bg-sun px-3 py-1 font-bold text-ink">🔥 {stats.streak}</span>
                  <span className="rounded-full bg-ink px-3 py-1 font-bold text-sun">⭐ {stats.xp} XP</span>
                </div>
              )}
              <Link to="/learn" className="rounded-lg px-3 py-2 font-semibold hover:bg-ink/5">Learn</Link>
              <Link to="/leaderboard" className="rounded-lg px-3 py-2 font-semibold hover:bg-ink/5">🏆</Link>
              <Link to="/profile" className="rounded-lg px-3 py-2 font-semibold hover:bg-ink/5">Profile</Link>
              <button
                onClick={async () => { await signOut(); navigate({ to: "/" }); }}
                className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-ink/5"
              >Sign out</button>
            </>
          ) : (
            <Link to="/auth" className="rounded-lg bg-ink px-4 py-2 font-bold text-sun shadow-bold-sun transition-bounce hover:-translate-y-0.5">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

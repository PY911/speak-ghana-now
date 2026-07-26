import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

/** Only same-origin relative paths are accepted as a post-login destination. */
const safeNext = (value: unknown) =>
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : undefined;

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — GoGhana" },
      { name: "description", content: "Sign in or create an account to start learning Ghanaian languages." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s.next) }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (next) window.location.href = next;
      else navigate({ to: "/learn" });
    }
  }, [user, loading, navigate, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/learn`,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/learn" });
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pattern-kente px-4 py-12">
      <div className="mx-auto max-w-md">
        <Link to="/" className="text-sm text-muted-foreground hover:text-ink">← Back</Link>
        <div className="mt-6 rounded-3xl border-2 border-ink bg-card p-6 shadow-bold sm:p-8">
          <h1 className="font-display text-3xl font-bold text-ink">
            {mode === "signin" ? "Welcome back" : "Start learning"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Continue your streak." : "Create a free account."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-sm font-semibold">Name</label>
                <input
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-ink/20 bg-background px-4 py-3 outline-none focus:border-ink"
                  placeholder="Kofi"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-ink/20 bg-background px-4 py-3 outline-none focus:border-ink"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-ink/20 bg-background px-4 py-3 outline-none focus:border-ink"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={busy}
              className="w-full rounded-xl bg-ink py-3 font-bold text-sun shadow-bold-sun transition-bounce hover:-translate-y-0.5 disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-sm text-muted-foreground hover:text-ink"
          >
            {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

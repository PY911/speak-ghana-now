DROP POLICY IF EXISTS "profiles_public_leaderboard_select" ON public.profiles;

REVOKE SELECT ON public.profiles FROM anon;

CREATE OR REPLACE VIEW public.leaderboard
WITH (security_invoker = off) AS
SELECT id, display_name, xp, streak
FROM public.profiles
ORDER BY xp DESC
LIMIT 50;

REVOKE ALL ON public.leaderboard FROM anon;
GRANT SELECT ON public.leaderboard TO authenticated;
GRANT ALL ON public.leaderboard TO service_role;
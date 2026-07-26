DROP VIEW IF EXISTS public.leaderboard;

CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (id uuid, display_name text, xp integer, streak integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.display_name, p.xp, p.streak
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
  ORDER BY p.xp DESC
  LIMIT 50;
$$;

REVOKE ALL ON FUNCTION public.get_leaderboard() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard() TO authenticated;
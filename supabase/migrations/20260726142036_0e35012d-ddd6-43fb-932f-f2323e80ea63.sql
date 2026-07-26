CREATE TABLE public.leaderboard_entries (
  user_id uuid PRIMARY KEY,
  display_name text,
  xp integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.leaderboard_entries TO authenticated;
GRANT ALL ON public.leaderboard_entries TO service_role;

ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leaderboard_select_authenticated"
ON public.leaderboard_entries FOR SELECT TO authenticated USING (true);

INSERT INTO public.leaderboard_entries (user_id, display_name, xp, streak)
SELECT p.id, p.display_name, p.xp, p.streak FROM public.profiles p
ON CONFLICT (user_id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.sync_leaderboard_entry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.leaderboard_entries (user_id, display_name, xp, streak, updated_at)
  VALUES (NEW.id, NEW.display_name, NEW.xp, NEW.streak, now())
  ON CONFLICT (user_id) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        xp = EXCLUDED.xp,
        streak = EXCLUDED.streak,
        updated_at = now();
  RETURN NEW;
END; $$;

REVOKE ALL ON FUNCTION public.sync_leaderboard_entry() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS profiles_sync_leaderboard ON public.profiles;
CREATE TRIGGER profiles_sync_leaderboard
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.sync_leaderboard_entry();

DROP FUNCTION IF EXISTS public.get_leaderboard();
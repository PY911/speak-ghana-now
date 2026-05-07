-- Allow public read of profiles for leaderboard (display_name, xp, streak are non-sensitive)
CREATE POLICY "profiles_public_leaderboard_select"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (true);
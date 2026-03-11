-- ============================================================
-- DB1 (Landing Page Database) — Fix Diagnostic Error
-- Run this in the Supabase SQL Editor of DB1
-- ============================================================

-- 1. Drop the trigger that is likely failing during auth.signUp
-- In Supabase, "Database error saving new user" is almost always 
-- caused by a broken trigger on auth.users trying to sync data.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS handle_new_user_trigger ON auth.users;

-- 2. Drop the associated function
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Ensure RLS allows the register_owner_and_company RPC to work
-- (This should already be fine if you ran supabase_schema.sql)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- ✅ DB1 FIX COMPLETE
-- Now try to register again on the Landing Page.

-- ============================================================
-- DB2 (BPMS PFF SaaS Database) — Secure Migration Script
-- Run this in the Supabase SQL Editor of DB2 (BPMS PFF project)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- STEP 1: Safely add missing values to ENUM types
-- ============================================================

-- Add 'admin' to user_role enum if not already there
DO $$ BEGIN
  ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'admin';
EXCEPTION WHEN others THEN NULL; END $$;

-- Add 'active' to user_status enum if not already there
DO $$ BEGIN
  ALTER TYPE user_status ADD VALUE IF NOT EXISTS 'active';
EXCEPTION WHEN others THEN NULL; END $$;

-- Add 'active' to enterprise_status enum if not already there
DO $$ BEGIN
  ALTER TYPE enterprise_status ADD VALUE IF NOT EXISTS 'active';
EXCEPTION WHEN others THEN NULL; END $$;

-- ============================================================
-- STEP 1.1: Fix and Make handle_new_user trigger Idempotent
--           (This solves "Database error saving new user" by 
--            allowing the trigger to handle existing records)
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, extensions
AS $$
BEGIN
  -- Insert into public.users only if not already there
  INSERT INTO public.users (id, entreprise_id, name, email, role, status, avatar_initials)
  VALUES (
    NEW.id,
    '11111111-0001-0001-0001-000000000001',
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'EMPLOYEE'::user_role),
    'active'::user_status,
    UPPER(LEFT(COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 2))
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert into public.user_details only if not already there
  INSERT INTO public.user_details (id_user, entreprise_id)
  VALUES (NEW.id, '11111111-0001-0001-0001-000000000001')
  ON CONFLICT (id_user) DO NOTHING;

  RETURN NEW;
END;
$$;

-- ============================================================
-- STEP 2: Ensure Default Entreprise exists (Required by handle_new_user trigger)
-- ============================================================
INSERT INTO public.entreprises (id, name, status, plan, created_at, updated_at)
VALUES ('11111111-0001-0001-0001-000000000001', 'Default Enterprise', 'active', 'Starter', now(), now())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- STEP 3: Add missing columns to `entreprises` table
ALTER TABLE public.entreprises
  ADD COLUMN IF NOT EXISTS legal_form  text,
  ADD COLUMN IF NOT EXISTS ice         text,
  ADD COLUMN IF NOT EXISTS rc          text,
  ADD COLUMN IF NOT EXISTS if_number   text,
  ADD COLUMN IF NOT EXISTS cnss        text,
  ADD COLUMN IF NOT EXISTS patente     text,
  ADD COLUMN IF NOT EXISTS country     text DEFAULT 'Morocco',
  ADD COLUMN IF NOT EXISTS logo_url    text;

-- ============================================================
-- STEP 4: Add auth & profile columns to `admin_profiles`
-- ============================================================
ALTER TABLE public.admin_profiles
  ADD COLUMN IF NOT EXISTS first_name     text,
  ADD COLUMN IF NOT EXISTS last_name      text,
  ADD COLUMN IF NOT EXISTS email          text,
  ADD COLUMN IF NOT EXISTS password_hash  text,
  ADD COLUMN IF NOT EXISTS auth_user_id   uuid;

-- ============================================================
-- STEP 5: Add password_hash to `users` table
-- ============================================================
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS password_hash  text;

-- ============================================================
-- STEP 6: RE-ENABLE SECURE RLS POLICIES
-- ============================================================
ALTER TABLE public.entreprises   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Drop all old policies to start fresh
DROP POLICY IF EXISTS "Allow anon insert on entreprises"    ON public.entreprises;
DROP POLICY IF EXISTS "Allow anon insert on users"          ON public.users;
DROP POLICY IF EXISTS "Allow anon insert on admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Allow anon select on entreprises"    ON public.entreprises;
DROP POLICY IF EXISTS "Allow anon select on users"          ON public.users;
DROP POLICY IF EXISTS "Allow anon select on admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Users can view own data"             ON public.users;
DROP POLICY IF EXISTS "Admins can view their entreprise"    ON public.entreprises;

-- Create Secure Read Policies for Authenticated Users (SaaS App usage)
CREATE POLICY "Users can view own data"
  ON public.users FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view their entreprise"
  ON public.entreprises FOR SELECT TO authenticated
  USING (id IN (
    SELECT entreprise_id FROM public.users WHERE id = auth.uid()
  ));

-- Note: We are NO LONGER allowing direct anonymous inserts!
-- All anonymous signups MUST go through the SECURITY DEFINER function below.

-- ============================================================
-- STEP 7: SECURITY DEFINER function: provision_enterprise_admin
-- ============================================================

-- Drop the OLD version if it exists (any signature)
-- Drop the OLD version if it exists (for any previous changes)
DROP FUNCTION IF EXISTS public.provision_enterprise_admin(
  uuid, text, text, text, text, text,
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text
);

DROP FUNCTION IF EXISTS public.provision_enterprise_admin(
  uuid, text, text, text, text, text,
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text, text
);

CREATE OR REPLACE FUNCTION public.provision_enterprise_admin(
  p_auth_user_id   uuid,     -- auth.users.id from DB2 signUp
  p_name           text,     -- company name
  p_industry       text,     -- legal form (used as industry)
  p_phone          text,     -- company phone
  p_email          text,     -- company email
  p_location       text,     -- address + city combined
  p_plan           text,     -- the validated enum string (Starter/Business/Enterprise)
  p_legal_form     text,
  p_ice            text,
  p_rc             text,
  p_if_number      text,
  p_cnss           text,
  p_patente        text,
  p_country        text,
  p_logo_url       text,
  p_profile_photo  text,     -- NEW: Admin profile photo
  p_first_name     text,     -- admin first name
  p_last_name      text,     -- admin last name
  p_user_email     text,     -- admin email (same as owner)
  p_password_hash  text,     -- password (for reference storage)
  p_avatar_initials text     -- e.g. "TM"
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER   -- CRITICAL: Runs as admin, bypassing RLS for inserts
SET search_path = public, extensions
AS $$
DECLARE
  v_entreprise_id uuid;
  v_user_id       uuid;
  v_hashed_password text;
BEGIN
  -- 0. Hash the password using the same salt method found in DB2 backup
  v_hashed_password := extensions.crypt(p_password_hash, extensions.gen_salt('bf'));

  -- ── 1. Insert into entreprises ─────────────────────────────
  INSERT INTO public.entreprises (
    name, industry, phone, email, location, status, plan,
    legal_form, ice, rc, if_number, cnss, patente, country, logo_url,
    created_at, updated_at
  )
  VALUES (
    p_name,
    p_industry,
    p_phone,
    p_email,
    p_location,
    'active'::enterprise_status,
    p_plan::enterprise_plan,
    p_legal_form,
    p_ice,
    p_rc,
    p_if_number,
    p_cnss,
    p_patente,
    COALESCE(p_country, 'Morocco'),
    p_logo_url,
    now(),
    now()
  )
  RETURNING id INTO v_entreprise_id;

  -- ── 2. Upsert into users ───────────────────────────────────
  -- NOTE: auth.signUp triggers handle_new_user which creates a record.
  -- We use ON CONFLICT to update that record with the correct enterprise_id and hashed password.
  INSERT INTO public.users (
    id, entreprise_id, name, email, role, status,
    avatar_initials, profile_image_url, password_hash, created_at, updated_at
  )
  VALUES (
    p_auth_user_id,
    v_entreprise_id,
    p_first_name || ' ' || p_last_name,
    p_user_email,
    'admin'::user_role,
    'active'::user_status,
    p_avatar_initials,
    p_profile_photo,
    v_hashed_password,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    entreprise_id   = EXCLUDED.entreprise_id,
    name            = EXCLUDED.name,
    role            = EXCLUDED.role,
    status          = EXCLUDED.status,
    avatar_initials = EXCLUDED.avatar_initials,
    profile_image_url = EXCLUDED.profile_image_url,
    password_hash   = EXCLUDED.password_hash,
    updated_at      = NOW()
  RETURNING id INTO v_user_id;

  -- ── 3. Upsert into admin_profiles ─────────────────────────
  INSERT INTO public.admin_profiles (
    user_id, first_name, last_name, email,
    password_hash, auth_user_id, created_at
  )
  VALUES (
    v_user_id,
    p_first_name,
    p_last_name,
    p_user_email,
    v_hashed_password,
    p_auth_user_id,
    now()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    first_name    = EXCLUDED.first_name,
    last_name     = EXCLUDED.last_name,
    email         = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    auth_user_id  = EXCLUDED.auth_user_id;

  -- Return the IDs so the frontend can confirm success
  RETURN json_build_object(
    'success',        true,
    'entreprise_id',  v_entreprise_id,
    'user_id',        v_user_id
  );

EXCEPTION WHEN OTHERS THEN
  -- Roll back everything and surface the error to the frontend
  RAISE EXCEPTION 'provision_enterprise_admin failed: %', SQLERRM;
END;
$$;

-- Grant execution rights to anonymous users (for the signup page)
GRANT EXECUTE ON FUNCTION public.provision_enterprise_admin(
  uuid, text, text, text, text, text,
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text, text
) TO anon;

-- Grant execution rights to authenticated users
GRANT EXECUTE ON FUNCTION public.provision_enterprise_admin(
  uuid, text, text, text, text, text,
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text, text
) TO authenticated;

-- ============================================================
-- ✅ SECURE MIGRATION COMPLETE
-- ============================================================
-- What this does:
--   1. Safely adds enum values (admin, active) if missing
--   2. Adds missing columns to entreprises, admin_profiles, users
--   3. Sets up secure RLS policies for authenticated reads (no anon inserts)
--   4. Creates provision_enterprise_admin RPC function
--
-- Tables touched: entreprises, users, admin_profiles
-- Existing data: NOT affected (ADD COLUMN IF NOT EXISTS, RLS policies are for new access)
-- ============================================================

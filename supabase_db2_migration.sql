-- ============================================================
-- DB2 (BPMS PFF SaaS Database) — Migration Script
-- Run this in the Supabase SQL Editor of DB2 (BPMS PFF project)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- STEP 1: Safely add missing values to ENUM types
-- These ensure 'admin', 'active' etc. exist before we insert.
-- The DO $$ block avoids errors if the value already exists.
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
-- STEP 2: Add missing columns to `entreprises` table
--         (fields from DB1 `companies` that are not in DB2)
-- ============================================================
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
-- STEP 3: Add auth & profile columns to `admin_profiles`
-- ============================================================
ALTER TABLE public.admin_profiles
  ADD COLUMN IF NOT EXISTS first_name     text,
  ADD COLUMN IF NOT EXISTS last_name      text,
  ADD COLUMN IF NOT EXISTS email          text,
  ADD COLUMN IF NOT EXISTS password_hash  text,
  ADD COLUMN IF NOT EXISTS auth_user_id   uuid;

-- ============================================================
-- STEP 4: Add password_hash to `users` table
-- ============================================================
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS password_hash  text;

-- ============================================================
-- STEP 5: RLS Policies
-- Allow anonymous inserts (signup runs before session exists)
-- ============================================================
ALTER TABLE public.entreprises   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Remove old conflicting policies first
DROP POLICY IF EXISTS "Allow anon insert on entreprises"    ON public.entreprises;
DROP POLICY IF EXISTS "Allow anon insert on users"          ON public.users;
DROP POLICY IF EXISTS "Allow anon insert on admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Users can view own data"             ON public.users;
DROP POLICY IF EXISTS "Admins can view their entreprise"    ON public.entreprises;

-- Insert policies (open to anon so signup can write data)
CREATE POLICY "Allow anon insert on entreprises"
  ON public.entreprises FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon insert on users"
  ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon insert on admin_profiles"
  ON public.admin_profiles FOR INSERT WITH CHECK (true);

-- Read policies (only authenticated users see their own data)
CREATE POLICY "Users can view own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view their entreprise"
  ON public.entreprises FOR SELECT
  USING (id IN (
    SELECT entreprise_id FROM public.users WHERE id = auth.uid()
  ));

-- ============================================================
-- STEP 6: SECURITY DEFINER function: provision_enterprise_admin
-- This function runs as postgres (elevated perms), so it can
-- bypass RLS and FK restrictions safely during signup.
--
-- Parameters: 20 total (1 uuid + 19 text)
-- ============================================================

-- Drop the OLD version if it exists (any signature)
DROP FUNCTION IF EXISTS public.provision_enterprise_admin(
  uuid, text, text, text, text, text,
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text
);

CREATE OR REPLACE FUNCTION public.provision_enterprise_admin(
  p_auth_user_id   uuid,     -- auth.users.id from DB2 signUp
  p_name           text,     -- company name
  p_industry       text,     -- legal form (used as industry)
  p_phone          text,     -- company phone
  p_email          text,     -- company email
  p_location       text,     -- address + city combined
  p_plan           text,     -- selected plan name
  p_legal_form     text,     -- legal form (SARL, SA, etc.)
  p_ice            text,
  p_rc             text,
  p_if_number      text,
  p_cnss           text,
  p_patente        text,
  p_country        text,
  p_logo_url       text,
  p_first_name     text,     -- admin first name
  p_last_name      text,     -- admin last name
  p_user_email     text,     -- admin email (same as owner)
  p_password_hash  text,     -- password (for reference storage)
  p_avatar_initials text     -- e.g. "TM" for Taha Mizi
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_entreprise_id uuid;
  v_user_id       uuid;
BEGIN
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
    'active'::enterprise_status,   -- cast to enum safely
    p_plan::enterprise_plan,       -- cast text to enum safely
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

  -- ── 2. Insert into users ───────────────────────────────────
  -- id = auth.users.id → clean 1:1 link, no extra join needed
  INSERT INTO public.users (
    id, entreprise_id, name, email, role, status,
    avatar_initials, password_hash, created_at, updated_at
  )
  VALUES (
    p_auth_user_id,
    v_entreprise_id,
    p_first_name || ' ' || p_last_name,
    p_user_email,
    'admin'::user_role,            -- cast to enum safely
    'active'::user_status,         -- cast to enum safely
    p_avatar_initials,
    p_password_hash,
    now(),
    now()
  )
  RETURNING id INTO v_user_id;

  -- ── 3. Insert into admin_profiles ─────────────────────────
  INSERT INTO public.admin_profiles (
    user_id, first_name, last_name, email,
    password_hash, auth_user_id, created_at
  )
  VALUES (
    v_user_id,
    p_first_name,
    p_last_name,
    p_user_email,
    p_password_hash,
    p_auth_user_id,
    now()
  );

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

-- Grant execute to both anon (pre-session signup) and authenticated
GRANT EXECUTE ON FUNCTION public.provision_enterprise_admin(
  uuid, text, text, text, text, text,
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text
) TO anon;

GRANT EXECUTE ON FUNCTION public.provision_enterprise_admin(
  uuid, text, text, text, text, text,
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text
) TO authenticated;

-- ============================================================
-- ✅ MIGRATION COMPLETE — Safe to run
-- ============================================================
-- What this does:
--   1. Safely adds enum values (admin, active) if missing
--   2. Adds missing columns to entreprises, admin_profiles, users
--   3. Sets up RLS policies for anon inserts + auth reads
--   4. Creates provision_enterprise_admin RPC function
--
-- Tables touched: entreprises, users, admin_profiles
-- Existing data: NOT affected (ADD COLUMN IF NOT EXISTS)
-- ============================================================

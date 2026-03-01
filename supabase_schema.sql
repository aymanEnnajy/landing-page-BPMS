-- ============================================================
-- BPMS SaaS Platform – Complete Database Schema
-- Supabase (PostgreSQL)
-- ============================================================
-- Run this ENTIRE script in your Supabase SQL Editor.
-- If tables already exist, DROP them first or use the DROP commands below.
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- ⚠ CLEAN SLATE (uncomment if you need to reset)
-- ============================================================
-- drop trigger if exists on_auth_user_created on auth.users;
-- drop function if exists public.handle_new_user();
-- drop table if exists public.subscriptions cascade;
-- drop table if exists public.payments cascade;
-- drop table if exists public.companies cascade;
-- drop table if exists public.owners cascade;


-- ============================================================
-- 👤 1. OWNERS TABLE
-- ============================================================

create table if not exists public.owners (
    id uuid primary key,  -- UUID from auth.signUp(), no FK to avoid permission conflicts
    first_name text not null,
    last_name text not null,
    email text unique not null,
    phone text,
    address text,
    profile_photo_url text,
    role text default 'owner' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.owners enable row level security;

drop policy if exists "Owners can view own profile" on public.owners;
drop policy if exists "Owners can update own profile" on public.owners;
drop policy if exists "Allow owner insert on signup" on public.owners;
drop policy if exists "Allow anon insert on owners" on public.owners;

create policy "Owners can view own profile"
    on public.owners for select
    using (auth.uid() = id);

create policy "Owners can update own profile"
    on public.owners for update
    using (auth.uid() = id);

-- ✅ Allows insert without a session (email confirmation workaround)
create policy "Allow anon insert on owners"
    on public.owners for insert
    with check (true);


-- ============================================================
-- 🏢 2. COMPANIES TABLE
-- ============================================================

create table if not exists public.companies (
    id uuid primary key default uuid_generate_v4(),
    owner_id uuid not null,  -- owner UUID, no FK to avoid anon permission conflicts
    company_name text not null,
    legal_form text,
    ice text,
    rc text,
    if_number text,
    cnss text,
    patente text,
    company_email text,
    company_phone text,
    address text,
    city text,
    country text default 'Morocco',
    logo_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.companies enable row level security;

drop policy if exists "Owners can view own company" on public.companies;
drop policy if exists "Owners can update own company" on public.companies;
drop policy if exists "Allow company creation by owner" on public.companies;
drop policy if exists "Owners can delete own company" on public.companies;
drop policy if exists "Allow anon insert on companies" on public.companies;

create policy "Owners can view own company"
    on public.companies for select
    using (owner_id = auth.uid());

create policy "Owners can update own company"
    on public.companies for update
    using (owner_id = auth.uid());

-- ✅ Allows insert without a session (email confirmation workaround)
create policy "Allow anon insert on companies"
    on public.companies for insert
    with check (true);

create policy "Owners can delete own company"
    on public.companies for delete
    using (owner_id = auth.uid());


-- ============================================================
-- 💳 3. PAYMENTS TABLE
-- ============================================================

create table if not exists public.payments (
    id uuid primary key default uuid_generate_v4(),
    owner_id uuid references public.owners(id) on delete cascade not null,
    card_holder_name text not null,
    card_last_four text not null,
    card_brand text,
    expiration_month text not null,
    expiration_year text not null,
    stripe_payment_method_id text,
    amount numeric(10, 2),
    currency text default 'MAD',
    status text default 'pending' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;

drop policy if exists "Owners can view own payments" on public.payments;
drop policy if exists "Allow payment creation by owner" on public.payments;
drop policy if exists "Allow anon insert on payments" on public.payments;

create policy "Owners can view own payments"
    on public.payments for select
    using (owner_id = auth.uid());

-- ✅ Allows insert without a session (email confirmation workaround)
create policy "Allow anon insert on payments"
    on public.payments for insert
    with check (true);


-- ============================================================
-- 📦 4. SUBSCRIPTIONS TABLE
-- ============================================================

create table if not exists public.subscriptions (
    id uuid primary key default uuid_generate_v4(),
    company_id uuid references public.companies(id) on delete cascade not null,
    payment_id uuid references public.payments(id) on delete set null,
    plan_name text not null,
    duration text not null,
    start_date date not null,
    end_date date not null,
    price numeric(10, 2) not null,
    currency text default 'MAD',
    status text default 'active' not null,
    cancel_at_period_end boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

drop policy if exists "Owners can view own company subscriptions" on public.subscriptions;
drop policy if exists "Allow subscription creation" on public.subscriptions;
drop policy if exists "Allow subscription update" on public.subscriptions;
drop policy if exists "Allow anon insert on subscriptions" on public.subscriptions;

create policy "Owners can view own company subscriptions"
    on public.subscriptions for select
    using (
        company_id in (
            select id from public.companies where owner_id = auth.uid()
        )
    );

-- ✅ Allows insert without a session (email confirmation workaround)
create policy "Allow anon insert on subscriptions"
    on public.subscriptions for insert
    with check (true);

create policy "Allow subscription update"
    on public.subscriptions for update
    using (
        company_id in (
            select id from public.companies where owner_id = auth.uid()
        )
    );


-- ============================================================
-- 🔐 5. SECURITY DEFINER FUNCTION FOR SIGNUP
-- ============================================================
-- This function runs with elevated (postgres) privileges so the
-- anon role can insert into owners/companies/payments/subscriptions
-- without hitting FK permission errors on auth.users.
-- ============================================================

drop function if exists public.register_owner_and_company(
    uuid, text, text, text, text, text, text,
    text, text, text, text, text, text, text, text, text, text,
    text, text, numeric, text,
    text, text, numeric, text, date, date
);

create or replace function public.register_owner_and_company(
    -- Owner fields
    p_user_id         uuid,
    p_first_name      text,
    p_last_name       text,
    p_email           text,
    p_phone           text,
    p_address         text,
    p_profile_photo   text,
    -- Company fields
    p_company_name    text,
    p_legal_form      text,
    p_ice             text,
    p_rc              text,
    p_if_number       text,
    p_cnss            text,
    p_patente         text,
    p_company_email   text,
    p_company_phone   text,
    p_company_address text,
    p_city            text,
    p_logo_url        text,
    -- Payment fields (nullable)
    p_card_holder     text,
    p_card_last_four  text,
    p_card_brand      text,
    p_exp_month       text,
    p_exp_year        text,
    p_amount          numeric,
    p_currency        text,
    -- Subscription fields (nullable)
    p_plan_name       text,
    p_duration        text,
    p_price           numeric,
    p_sub_currency    text,
    p_start_date      date,
    p_end_date        date
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
    v_company_id  uuid;
    v_payment_id  uuid;
begin
    -- 1. Insert owner
    insert into public.owners (id, first_name, last_name, email, phone, address, profile_photo_url, role)
    values (p_user_id, p_first_name, p_last_name, p_email, p_phone, p_address, p_profile_photo, 'owner');

    -- 2. Insert company
    insert into public.companies (
        owner_id, company_name, legal_form, ice, rc, if_number,
        cnss, patente, company_email, company_phone, address, city, logo_url
    )
    values (
        p_user_id, p_company_name, p_legal_form, p_ice, p_rc, p_if_number,
        p_cnss, p_patente, p_company_email, p_company_phone, p_company_address, p_city, p_logo_url
    )
    returning id into v_company_id;

    -- 3. Insert payment (only if card data provided)
    if p_card_holder is not null and p_card_last_four is not null then
        insert into public.payments (
            owner_id, card_holder_name, card_last_four, card_brand,
            expiration_month, expiration_year, amount, currency, status
        )
        values (
            p_user_id, p_card_holder, p_card_last_four, p_card_brand,
            p_exp_month, p_exp_year, p_amount, p_currency, 'completed'
        )
        returning id into v_payment_id;
    end if;

    -- 4. Insert subscription (only if plan data provided)
    if p_plan_name is not null then
        insert into public.subscriptions (
            company_id, payment_id, plan_name, duration,
            start_date, end_date, price, currency, status
        )
        values (
            v_company_id, v_payment_id, p_plan_name, p_duration,
            p_start_date, p_end_date, p_price, p_sub_currency, 'active'
        );
    end if;

    return json_build_object(
        'success', true,
        'company_id', v_company_id,
        'payment_id', v_payment_id
    );

exception when others then
    raise exception '%', sqlerrm;
end;
$$;

-- Grant execute to anon so it can be called without a session
grant execute on function public.register_owner_and_company(
    uuid, text, text, text, text, text, text,
    text, text, text, text, text, text, text, text, text, text, text, text,
    text, text, text, text, text, numeric, text,
    text, text, numeric, text, date, date
) to anon;


-- ============================================================
-- ✅ SCHEMA COMPLETE
-- ============================================================
-- Tables: owners, companies, payments, subscriptions
-- Function: register_owner_and_company (SECURITY DEFINER)
--   → Called via supabase.rpc() from the frontend
--   → Runs with elevated privileges, bypasses FK permission issues
-- Storage: Create buckets "user-avatars" and "company-logos"
-- ============================================================

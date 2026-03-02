import { createClient } from "@supabase/supabase-js";

// ─── DB2: SaaS Application Database (BPMS PFF) ───────────────────────────────
// This is the OPERATIONAL database where the actual HR SaaS runs.
// When a user subscribes, we create their enterprise, admin user, and auth account here.

const supabaseDb2Url = import.meta.env.VITE_SUPABASE_DB2_URL as string;
const supabaseDb2AnonKey = import.meta.env.VITE_SUPABASE_DB2_ANON_KEY as string;

if (!supabaseDb2Url || !supabaseDb2AnonKey) {
    console.error("Missing DB2 Supabase environment variables");
}

export const supabaseDb2 = createClient(supabaseDb2Url, supabaseDb2AnonKey);

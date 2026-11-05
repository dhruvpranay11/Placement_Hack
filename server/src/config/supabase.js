import { createClient } from '@supabase/supabase-js';
import env from './env.js';

// Public client — uses anon key, respects RLS policies.
// Used for user-context operations where the auth token is forwarded.
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

// Admin client — uses service role key, bypasses RLS.
// Used only for server-side operations that need elevated privileges.
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

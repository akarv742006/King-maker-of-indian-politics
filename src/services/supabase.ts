import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vzapudcurobcokhzotju.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your-anon-key-here' &&
  !supabaseUrl.includes('your-project')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Helper to check live database connectivity to Supabase
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase client not initialized. Please ensure VITE_SUPABASE_ANON_KEY is provided in .env.',
    };
  }

  try {
    const { error } = await supabase.from('states').select('count', { count: 'exact', head: true });
    if (error) {
      // If table doesn't exist yet, it still contacted the API
      return {
        success: false,
        message: `Connected to Supabase project, but query returned: ${error.message}`,
      };
    }
    return {
      success: true,
      message: 'Successfully connected to Supabase production database!',
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Failed to connect: ${err?.message || 'Unknown network error'}`,
    };
  }
}

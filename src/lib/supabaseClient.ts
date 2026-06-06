import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_OLD || process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_OLD || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseUrl ="https://vagytysnkicbwgavdcyq.supabase.co"
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZ3l0eXNua2ljYndnYXZkY3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTU1NzEsImV4cCI6MjA2NDE3MTU3MX0.sIXIz5DmCisX35m9O8F_8n8QiMb_5ANS0uV__XyIhkk"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)

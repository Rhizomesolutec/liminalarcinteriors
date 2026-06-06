import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    "https://vagytysnkicbwgavdcyq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZ3l0eXNua2ljYndnYXZkY3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTU1NzEsImV4cCI6MjA2NDE3MTU3MX0.sIXIz5DmCisX35m9O8F_8n8QiMb_5ANS0uV__XyIhkk"
    ,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: any[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

import { NextResponse } from 'next/server'
import { supabase } from "@/lib/supabaseClient"

export async function GET() {
  const { count, error } = await supabase
  .from("contact_messages")
  .select('*', { count: 'exact', head: true })
  .eq('is_readed', false);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ count }, { status: 200 })
}
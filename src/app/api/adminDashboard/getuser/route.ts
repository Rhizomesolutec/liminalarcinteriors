import { createClient } from "@/lib/supabaseServar";

import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.admin.listUsers();
  const { data: user } = await supabase.auth.getUser();

  const usersData = data.users.filter((data) => data.id !== user.user?.id);
  
  return NextResponse.json(usersData, {
    status: 200,
  });
}

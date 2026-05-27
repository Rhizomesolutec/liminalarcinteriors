import { createClient } from "@/lib/supabaseServar";
// import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { userId } = (await req.json()) as {
    userId: string;
  };

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
  return NextResponse.json(" Admin user deleted ", {
    status: 200,
  });
}

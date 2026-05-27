import { createClient } from "@/lib/supabaseServar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { name, email, role } = (await req.json()) as {
    name: string;
    email: string;
    role: string;
  };
  console.log(name,email,role)
  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      name,
      password: await bcrypt.hash("admin@123", 10),
      role,
    },
  });

  if (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
  return NextResponse.json("updated phone number and whatsApp number ", {
    status: 200,
  });
}

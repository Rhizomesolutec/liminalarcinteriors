import { createClient } from "@/lib/supabaseServar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { oldPassword, newPassword } = (await req.json()) as {
    oldPassword: string;
    newPassword: string;
  };

  console.log(oldPassword, newPassword);

  const { data: user } = await supabase.auth.getUser();
  const password = user.user?.user_metadata.password as string;
  console.log(user);

  const isValid = await bcrypt.compare(oldPassword, password);
  console.log(isValid);
  if (!isValid)
    return NextResponse.json("Old password is incorrect", {
      status: 401,
    });

  if (!user.user?.id) {
    return NextResponse.json("User ID not found", {
      status: 400,
    });
  }

  const { data, error } = await supabase.auth.updateUser({data:{
    password: await bcrypt.hash(newPassword, 10),
  }});
  console.log(data, error);
  return NextResponse.json("Password updated successfully", {
    status: 200,
  });
  //   const isValid = await bcrypt.compare(user.user.);
}

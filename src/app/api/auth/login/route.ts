import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabaseServar";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as {
      email: string;
      password: string;
      captchaToken: string;
    };

 
    const supabase = await createClient();

    const { data: allUserData, error: errorData } =
      await supabase.auth.admin.listUsers();
    if (errorData) throw errorData;

    const user = allUserData.users.find((user) => user.email === data.email);

    //  const da= await supabase.auth.admin.updateUserById(
    //     "07205405-04b5-4b38-8932-33a52572056f",
    //     {
    //       user_metadata: {
    //         first_name: "amjed",
    //         last_name: "pulikkal",
    //         role: "premium_user",
    //         password: (await bcrypt.hash("admin@123", 10)),
    //       },
    //     }
    //   );

    const user_metadata = user?.user_metadata || {};

    if (user_metadata.password) {
      const isMatch = await bcrypt.compare(
        data.password,
        user_metadata.password
      );
      if (!isMatch) throw "password not match";
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: `/api/auth/callback`,
        captchaToken: data.captchaToken,
      },
    });
    if (error) throw error;

    // revalidatePath("/dashboard", "layout");
    return NextResponse.json("email send to admin", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

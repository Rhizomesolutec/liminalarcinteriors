import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id, rating, testimonial } = await req.json();
//   console.log(await req.json());
    await supabase
      .from("reviews")
      .update({ rating, review: testimonial })
      .eq("id", id);
  return NextResponse.json("ok", { status: 200 });
}

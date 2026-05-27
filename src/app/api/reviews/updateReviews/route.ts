import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const showOnLanding = searchParams.get("showOnLanding");
  const id = searchParams.get("id");

  //   const { id,  } = await req.json();
  //   //   console.log(await req.json());
  await supabase.from("reviews").update({ showOnLanding }).eq("id", id);

  return NextResponse.json("updated", { status: 200 });
}

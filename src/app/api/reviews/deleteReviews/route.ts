import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reviewsId = searchParams.get("reviewsId");
    if (!reviewsId) throw "reviews id is required"
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", reviewsId);
    console.log("dataaa", data, error);

    if (!data) throw "reviews not finded "
    await supabase.storage.from("static.images").remove([data[0].images?.path]);

    await supabase.from("reviews").delete().eq("id", reviewsId);
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }

  return NextResponse.json("ok", { status: 200 });
}

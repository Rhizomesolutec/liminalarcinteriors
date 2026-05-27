import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectid } = await req.json();
    const { data } = (await supabase
      .from("projects")
      .select("*")
      .eq("id", projectid)) as unknown as { data: Project[] };

    const { data: removeData } = await supabase.storage
      .from("static.images")
      .list(`projects/${data[0]?.title}`);

    const filesToRemove = removeData?.map(
      (x) => `projects/${data[0]?.title}/${x.name}`
    );
    console.log(projectid, filesToRemove);
    if (filesToRemove?.length) {
      await supabase.storage.from("static.images").remove(filesToRemove);
    }

    await supabase.from("projects").delete().eq("id", projectid);
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }

  return NextResponse.json("", { status: 200 });
}

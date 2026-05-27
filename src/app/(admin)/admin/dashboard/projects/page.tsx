import ProjectServalComponent from "@/components/admin/inistalComponent/projectServalComponent";
import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/type";
import React from "react";

export default async function page() {
 const { data }  = await supabase.from('projects').select('*,project_gallery(image_url)') as {data:Project[]}

  return (
    <>
      <ProjectServalComponent inistalData={data} />
    </>
  );
}

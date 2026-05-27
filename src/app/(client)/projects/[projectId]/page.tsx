import React from "react";

import { notFound } from "next/navigation";
import ProjectDetails from "./projectDetails";
import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/type";

type tParams = Promise<{ projectId: string }>;

export async function generateMetadata({ params }: { params: tParams }) {
  const title = decodeURIComponent((await params)?.projectId || "")
    .split("-")
    .join(" ");
  const { data:project } = await supabase
    .from("projects")
    .select("*,project_gallery(image_url)")
    .eq("title", title)
    .single();

  if (!project) return notFound();

  return {
    title: `${project.title} – Liminal Arc Projects`,
    description: project.description?.slice(0, 150),
    openGraph: {
      title: `${project.title} – Liminal Arc`,
      description: project.description,
      url: `https://www.liminalarcinteriors.com/projects/${title}`,
      images: [
        {
          url: project.main_image?.image_url || "/default-project.jpg",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function page({ params }: { params: tParams }) {
  const title = decodeURIComponent((await params)?.projectId || "")
    .split("-")
    .join(" ");

  const { data, error } = await supabase
    .from("projects")
    .select("*,project_gallery(image_url)")
    .eq("title", title);

  // const data = projects.find((data) => data.title === title);
  if (!data || error) {
    notFound();
  }

  return (
    <>
      <ProjectDetails project={data[0] as unknown as Project} />
    </>
  );
}

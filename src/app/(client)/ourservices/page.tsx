import OurServices from "@/components/ourServices";
import { supabase } from "@/lib/supabaseClient";
import { Service } from "@/types/type";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MEP Drawings in UAE | Interior Design & Fit-Out | Liminal Arc Dubai",
  description:
    "Liminal Arc, one of the top MEP companies in Dubai, offers MEP drawings in UAE, interior design, joinery works, project management, and complete fit-out solutions.",
  alternates: {
    canonical: "https://www.liminalarcinteriors.com/ourservices",
  },
};

export default async function page() {
  const { data } = await supabase
    .from("services")
    .select("*,sub_services(*)");

  return <OurServices data={data as Service[]} />;
}

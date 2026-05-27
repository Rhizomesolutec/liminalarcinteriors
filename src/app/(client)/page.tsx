import React from "react";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import { Project, Service } from "@/types/type";

// Import Stitch UI layout components
import LiminalArcHero from "@/components/stitch/LiminalArcHero";
import LiminalArcClientCloud from "@/components/stitch/LiminalArcClientCloud";
import LiminalArcServices from "@/components/stitch/LiminalArcServices";
import LiminalArcShowcase from "@/components/stitch/LiminalArcShowcase";
import LiminalArcPhilosophy from "@/components/stitch/LiminalArcPhilosophy";
import LiminalArcInquiry from "@/components/stitch/LiminalArcInquiry";

export const metadata: Metadata = {
  title: "Liminal Arc Interiors | Best Interior Design Company in Dubai",
  description:
    "Discover why Liminal Arc Interiors ranks among the best interior design and architectural fit-out companies in Dubai. We create elegant, fluid interiors for luxury villas, penthouses, and commercial spaces.",
  alternates: {
    canonical: "https://www.liminalarcinteriors.com/",
  },
};

export default async function Home() {
  // Fetch services and subservices
  const { data: services } = await supabase
    .from("services")
    .select("*,sub_services(*)");

  // Fetch projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*");

  // Fetch admin settings for contact numbers
  const { data: adminDashboard } = await supabase
    .from("admin_dashboard")
    .select("*");

  // Filter project data inline matching Stitch specifications
  const typedProjects = projects as Project[] | null;
  const showcaseProjects = typedProjects?.filter(p => p.showOnLanding) || [];
  const latestProject = showcaseProjects[0] || typedProjects?.[0] || null;

  const contactPhone = adminDashboard?.[0]?.phone_number;

  return (
    <>
      {/* Hero Section */}
      <LiminalArcHero />

      <main className="w-full bg-[#1A1A1A] overflow-hidden text-[#F5F0E8] font-body">
        
        {/* Partners / Client Cloud */}
        <LiminalArcClientCloud />

        {/* Services Grid */}
        <LiminalArcServices services={services as Service[]} />

        {/* Dynamic Project Portfolio Showcase */}
        <LiminalArcShowcase projects={showcaseProjects} />

        {/* Philosophy Block */}
        <LiminalArcPhilosophy />

        {/* Inquiry / Contact Form */}
        <LiminalArcInquiry phoneNumber={contactPhone} />

      </main>
    </>
  );
}

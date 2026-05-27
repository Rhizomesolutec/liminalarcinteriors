import EnhancedProjectsSection from "@/components/client/projectClinetside";
import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Project Management Companies in Dubai | Liminal Arc UAE",
  description:
    "Liminal Arc UAE stands among the top project management companies in Dubai, offering expert project management services UAE for residential and commercial projects.",
  alternates: {
    canonical: "https://www.liminalarcinteriors.com/projects",
  },
};

export default async function page() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("showOnLanding", true);

  return (
    <>
      <EnhancedProjectsSection projects={data as Project[]} />
      <div className="w-[90%] max-w-5xl mx-auto pt-2 md:pt-6 pb-12 text-[#7F6456] space-y-6 text-justify md:text-left leading-relaxed">
        <p>
          At Liminal Arc, our work embodies our passion for creativity, quality, and functional superiority in residential and commercial interiors in Dubai. As one of the most trusted interior companies in Dubai, we are proud to display our extensive portfolio of work, which showcases our expertise in providing innovative and stunning interior designs that meet our clients’ needs.
        </p>
        <p>
          Our portfolio of work includes luxury villas, apartments, corporate offices, retail outlets, and hospitality interiors designed with meticulous attention to detail and the latest design trends. Each of our projects showcases our capability to integrate aesthetics with functionality, making spaces both beautiful and functional. Our team is committed to understanding our clients’ vision, space requirements, and design preferences to provide unique interior designs that improve space functionality and comfort.
        </p>
        <p>
          From conceptualization to final delivery, we adhere to superior quality standards with meticulous planning, material selection, and expert project management. Our approach ensures that every project is completed with precision, creativity, and longevity.
        </p>
        <p>
          Through our relentless pursuit of excellence, Liminal Arc has further solidified its position among the most trusted interior companies in Dubai, providing design solutions that turn spaces into inspiring places while also ensuring long-term value and customer satisfaction.
        </p>
      </div>
    </>
  );
}

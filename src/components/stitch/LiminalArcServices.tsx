import React from "react";
import { Service } from "@/types/type";

interface LiminalArcServicesProps {
  services?: Service[] | null;
}

const DEFAULT_SERVICES = [
  {
    service_name: "Interior Design & Fit-Out",
    description: "Turnkey solutions for luxury residential and commercial spaces inspired by fluid architectural forms.",
    icon: "architecture"
  },
  {
    service_name: "Smart Automation",
    description: "Seamlessly integrated intelligent systems for lighting, climate, and security control.",
    icon: "smart_home"
  },
  {
    service_name: "General Maintenance",
    description: "Precision-focused repair and upkeep of structural and aesthetic interior elements.",
    icon: "engineering"
  },
  {
    service_name: "Facility Management",
    description: "Comprehensive operational oversight for high-end commercial complexes and estates.",
    icon: "corporate_fare"
  },
  {
    service_name: "AMC Contracts",
    description: "Annual Maintenance Contracts designed to preserve the integrity of your investment.",
    icon: "history_edu"
  }
];

function getServiceIcon(name: string): string {
  const lowercase = name.toLowerCase();
  if (lowercase.includes("interior") || lowercase.includes("fit")) return "architecture";
  if (lowercase.includes("architect")) return "layers";
  if (lowercase.includes("automation") || lowercase.includes("smart")) return "smart_home";
  if (lowercase.includes("maintenance")) return "engineering";
  if (lowercase.includes("facility")) return "corporate_fare";
  if (lowercase.includes("amc") || lowercase.includes("contract")) return "history_edu";
  if (lowercase.includes("approval") || lowercase.includes("authorit")) return "gavel";
  return "construction";
}

export default function LiminalArcServices({ services }: LiminalArcServicesProps) {
  // Render database items or defaults
  const renderedItems = (services && services.length > 0)
    ? services.slice(0, 5).map((s) => ({
        service_name: s.service_name,
        description: s.description,
        icon: getServiceIcon(s.service_name)
      }))
    : DEFAULT_SERVICES;

  return (
    <section className="py-32 bg-[#1A1A1A] overflow-hidden" id="services">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline text-[10px] uppercase tracking-[0.5em] text-[#C4A05A] mb-6">Expertise</h2>
            <h3 className="text-4xl md:text-6xl font-light font-headline tracking-tight text-[#F5F0E8]">
              Comprehensive <br />Interior Solutions
            </h3>
          </div>
          <p className="max-w-sm text-sm opacity-60 leading-loose text-gray-300">
            From avant-garde conceptualization to meticulous execution and long-term facility care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C4A05A]/10 border border-[#C4A05A]/10">
          {renderedItems.map((item, idx) => (
            <div key={idx} className="bg-[#1A1A1A] p-12 hover:bg-[#C4A05A]/5 transition-colors group">
              <span className="material-symbols-outlined text-4xl text-[#C4A05A] mb-8 block font-light">
                {item.icon}
              </span>
              <h4 className="text-xl font-headline mb-4 tracking-wide text-[#F5F0E8] group-hover:text-[#C4A05A] transition-colors">
                {item.service_name}
              </h4>
              <p className="text-sm opacity-60 leading-relaxed text-gray-300">
                {item.description}
              </p>
            </div>
          ))}

          {/* Inquiry / CTA Card */}
          <a 
            href="#contact" 
            className="bg-[#C4A05A] p-12 flex flex-col justify-center items-center text-[#1A1A1A] text-center group cursor-pointer transition-colors hover:bg-[#F5F0E8]"
          >
            <p className="font-headline font-bold uppercase tracking-widest mb-4">Inquire About Services</p>
            <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/types/type";

interface LiminalArcShowcaseProps {
  projects?: Project[] | null;
}

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Palm Jumeirah Residence",
    category: "Residential",
    year: "2023",
    main_image: {
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2RlVfENyF_YPj59jelaZcj0ugC3xKNo3Z670o8a35i98hL7wv0N3Ocun-e6Ga57bmoIpbmw44bdrEn5pIEhfnLuP1U-I5oN1t6TQsIvPXyUGrmZVBPawGl0-HDLGZSZc5il2XcW8i3Rj9s0HfXA03FFhpaj8LhBuJZCwIYsRnBn0QfWrtBduFCekNy_kKQKMzgXCJod50HvggeqyUsqB9dyvHbqBPE2s91NIX9-vl0JSeTEwC2tkfpYD8hfbP7mJbG9J5EC5SC58"
    }
  },
  {
    id: 2,
    title: "Luxury Offices, DIFC",
    category: "Corporate",
    year: "2024",
    main_image: {
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTIFBYqbeo8BCHP-YyTshOCA5RmasP29s84-YoG_kFBJpdKOq1caOn1oER1XIsT0be5CS_nDq_5mQCq9a0AE42ZMcWU9ihiR8lhnbkSUJJslEMnbRzELWZC3yjnC4BOb2iLQI2gMWqQtwbvu5UrmNFoTZg1mCCF4W4xsNhYqYMFQSu6-3Aum9rzZivqFDm0E2tJMOiknAHr058HKZrSNnzAWhn7OdH_ji3FFtjExhYvtHnCtCkvnZPpxlYTbrRijrjaAcBRxkAX2w"
    }
  },
  {
    id: 3,
    title: "Heritage Renovations",
    category: "Hospitality",
    year: "2022",
    main_image: {
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2bFOWavkmmUPNUX5IXg-_4InpCoBkXkRFMyWam-FKqWmcJyONqAlgpD_7Ee75SG6BzDEwAYal3S8JKr6g3u7V00jwx51_ObHJIiyQnrDmEgyA74eNRuUOd1VE-Nk1yjd8bJhCr4dBHtma45S8vkxuY11ZfoTCCoo2VInnSJDod2zYgrChRhn3-U-eGzfi-k3911ehhNGQbh9iqJbjdjI67_vV7oZHCiT372WMESjoNYcUktcN1RwKQTBlI_2p62swcOxBuA5y0tw"
    }
  }
];

export default function LiminalArcShowcase({ projects }: LiminalArcShowcaseProps) {
  const router = useRouter();
  const renderedProjects = (projects && projects.length > 0)
    ? projects
    : (DEFAULT_PROJECTS as unknown as Project[]);

  return (
    <section className="py-32 bg-[#1A1A1A]" id="portfolio">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <h2 className="font-headline text-[10px] uppercase tracking-[0.5em] text-[#C4A05A] mb-6">Curated Portfolio</h2>
        <h3 className="text-4xl md:text-6xl font-light font-headline tracking-tight mb-20 text-[#F5F0E8]">Major Projects</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {renderedProjects.map((project, idx) => {
            const aspectClass = idx % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/6]";
            const masonryClass = (idx % 3 === 1) ? "md:mt-16" : "";
            
            return (
              <div 
                key={project.id} 
                className={`space-y-6 cursor-pointer ${masonryClass}`}
                onClick={() => router.push(`/projects/${project.title.split(" ").join("-")}`)}
              >
                <div className={`${aspectClass} bg-neutral-800 relative overflow-hidden group`}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${project.main_image?.image_url || "/logo.png"}')` }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#C4A05A] text-[#1A1A1A] px-6 py-2 text-[10px] uppercase font-bold tracking-widest">
                      View Project
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4A05A] mb-1">
                      {project.category}
                    </p>
                    <h4 className="text-xl font-light font-headline text-[#F5F0E8]">
                      {project.title}
                    </h4>
                  </div>
                  <span className="text-xs opacity-40 text-[#F5F0E8]">
                    {project.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

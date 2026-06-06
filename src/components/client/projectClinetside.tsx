"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types/type";

// ── ProjectCard ──────────────────────────────────────────────────────────────

type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  onClick: () => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer transition-all duration-500 ${
        isActive ? "scale-[1.03]" : ""
      }`}
    >
      {/* Card shell — sharp edges, gold border on active */}
      <div
        className={`relative overflow-hidden transition-all duration-500 ${
          isActive
            ? "border border-[#e8c178]"
            : "border border-[#e8c178]/10 hover:border-[#e8c178]/40"
        }`}
      >
        {/* ── Image ── */}
        <div className="relative h-72 overflow-hidden">
          <Image
            fill
            src={project.main_image?.image_url}
            alt={project.title}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/90 via-[#131313]/30 to-transparent" />

          {/* Corner accent lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#e8c178]/50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#e8c178]/50 pointer-events-none" />

          {/* Category badge — top left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="font-[Manrope] text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 bg-[#131313]/80 text-[#e8c178] border border-[#e8c178]/40">
              {project.category}
            </span>
          </div>

          {/* Status badge — top right */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`font-[Manrope] text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1 border ${
                project.status === "Completed"
                  ? "bg-emerald-900/60 text-emerald-400 border-emerald-400/40"
                  : "bg-sky-900/60 text-sky-400 border-sky-400/40"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Title & location — bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-[Epilogue] font-light text-[22px] leading-[28px] uppercase text-[#e4e2e1] mb-1 group-hover:text-[#e8c178] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-[Manrope] text-[12px] tracking-[0.05em] text-[#e4e2e1]/50">
              {project.location}
            </p>
            {/* Animated underline */}
            <div className="h-px w-0 group-hover:w-full bg-[#e8c178] mt-3 transition-all duration-500" />
          </div>
        </div>

        {/* Active indicator — gold bottom bar */}
        {isActive && (
          <div className="h-0.5 w-full bg-[#e8c178]" />
        )}
      </div>
    </div>
  );
};

// ── EnhancedProjectsSection ──────────────────────────────────────────────────

const EnhancedProjectsSection = ({ projects }: { projects: Project[] }) => {
  const router = useRouter();

  return (
    <section className="py-32 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto px-16">

        {/* ── Header ── */}
        <div className="mb-20">
          {/* Top rule + label */}
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px flex-1 bg-[#e8c178]/15" />
            <span className="font-[Manrope] text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e8c178]">
              Portfolio
            </span>
            <div className="h-px flex-1 bg-[#e8c178]/15" />
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-end">
            {/* Title */}
            <div className="md:col-span-7">
              <h1 className="font-[Epilogue] font-light text-[56px] leading-[62px] tracking-[-0.02em] uppercase text-[#e4e2e1]">
                UAE Signature
                <br />
                <span className="text-[#e8c178]">Interior Projects</span>
              </h1>
            </div>

            {/* Description + gold vertical rule */}
            <div className="md:col-span-5 flex gap-6">
              <div className="w-px bg-[#e8c178]/30 self-stretch hidden md:block" />
              <p className="font-[Manrope] text-[14px] leading-[24px] text-[#e4e2e1]/50">
                Explore our portfolio of exceptional projects that showcase our
                commitment to quality, innovation, and design excellence.
              </p>
            </div>
          </div>
        </div>

        {/* ── Project Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={false}
              onClick={() =>
                router.push(`/projects/${project.title.split(" ").join("-")}`)
              }
            />
          ))}
        </div>

        {/* ── Footer rule ── */}
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-[#e8c178]/10" />
          <span className="font-[Manrope] text-[10px] font-semibold tracking-[0.25em] uppercase text-[#e4e2e1]/20">
            {projects.length} Projects
          </span>
          <div className="h-px flex-1 bg-[#e8c178]/10" />
        </div>

      </div>
    </section>
  );
};

export default EnhancedProjectsSection;
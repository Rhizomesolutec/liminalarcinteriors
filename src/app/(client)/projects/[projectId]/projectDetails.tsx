"use client";

import Image from "next/image";
import React, { useState } from "react";

import { Project } from "@/types/type";

type ProjectDetailsProps = {
  project: Project;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="bg-[#131313] text-[#e4e2e1] overflow-hidden border border-[#e8c178]/20">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="bg-[#0e0e0e] border-b border-[#e8c178]/20 px-12 py-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* Title block */}
          <div>
            {/* Category label */}
            <p className="font-[Manrope] text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e8c178]/70 mb-4">
              {project.category}
            </p>
            <h2
              className="font-[Epilogue] font-light text-[48px] leading-[56px] tracking-[-0.01em] uppercase text-[#e4e2e1] mb-3"
            >
              {project.title}
            </h2>
            <p className="font-[Manrope] text-[14px] leading-[24px] text-[#e4e2e1]/50 tracking-[0.01em]">
              {project.location}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-12">
            <div className="border-l border-[#e8c178]/30 pl-8">
              <div className="font-[Epilogue] font-light text-[32px] text-[#e8c178]">
                {project.area}
              </div>
              <div className="font-[Manrope] text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e4e2e1]/40 mt-1">
                Area
              </div>
            </div>
            <div className="border-l border-[#e8c178]/30 pl-8">
              <div className="font-[Epilogue] font-light text-[32px] text-[#e8c178]">
                {project.rooms}
              </div>
              <div className="font-[Manrope] text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e4e2e1]/40 mt-1">
                Rooms
              </div>
            </div>
            <div className="border-l border-[#e8c178]/30 pl-8">
              <div
                className={`font-[Epilogue] font-light text-[32px] ${
                  project.status === "Completed"
                    ? "text-emerald-400"
                    : "text-sky-400"
                }`}
              >
                {project.year}
              </div>
              <div className="font-[Manrope] text-[11px] font-semibold tracking-[0.15em] uppercase text-[#e4e2e1]/40 mt-1">
                {project.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Image Gallery ────────────────────────────────────────────── */}
      <div className="px-12 pt-12 pb-0">

        {/* Main image */}
        <div className="relative aspect-video overflow-hidden border border-[#e8c178]/10">
          <Image
            fill
            src={project.project_gallery[selectedImageIndex]?.image_url?.image_url}
            alt={`${project.title} — Image ${selectedImageIndex + 1}`}
            className="object-cover transition-all duration-700"
          />
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#e8c178]/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#e8c178]/40 pointer-events-none" />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {project.project_gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 relative w-[88px] h-[60px] overflow-hidden transition-all duration-300 ${
                selectedImageIndex === index
                  ? "border border-[#e8c178] opacity-100"
                  : "border border-[#e8c178]/10 opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                fill
                src={image.image_url?.image_url}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Body: Two-Column Layout ──────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#e8c178]/10 px-12 py-14">

        {/* Left — Overview & Features */}
        <div className="space-y-12 lg:pr-14">

          {/* Overview */}
          <div>
            <h3 className="font-[Manrope] text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e8c178] mb-6">
              Project Overview
            </h3>
            <p className="font-[Epilogue] font-light text-[24px] leading-[34px] text-[#e4e2e1]/80">
              {project.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-[Manrope] text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e8c178]/70 mb-5">
              Key Features
            </h4>
            <ul className="space-y-3">
              {project.project_features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 bg-[#e8c178] flex-shrink-0 mt-[9px]" />
                  <span className="font-[Manrope] text-[14px] leading-[24px] text-[#e4e2e1]/60">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="font-[Manrope] text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e8c178]/70 mb-5">
              Materials Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.project_materials.map((material, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 border border-[#e8c178]/30 text-[#e8c178] font-[Manrope] text-[11px] font-semibold tracking-[0.12em] uppercase"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Project Specs & Testimonial */}
        <div className="space-y-12 lg:pl-14 pt-12 lg:pt-0">

          {/* Project Details table */}
          <div>
            <h4 className="font-[Manrope] text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e8c178] mb-6">
              Project Details
            </h4>
            <div className="divide-y divide-[#e8c178]/10">
              {[
                { label: "Category", value: project.category },
                {
                  label: "Status",
                  value: project.status,
                  highlight:
                    project.status === "Completed"
                      ? "text-emerald-400"
                      : "text-sky-400",
                },
                { label: "Year", value: project.year },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-4"
                >
                  <span className="font-[Manrope] text-[12px] tracking-[0.05em] text-[#e4e2e1]/40 uppercase">
                    {label}
                  </span>
                  <span
                    className={`font-[Manrope] text-[13px] font-semibold tracking-[0.08em] uppercase ${
                      highlight ?? "text-[#e8c178]"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div>
            <h4 className="font-[Manrope] text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e8c178]/70 mb-6">
              Client Testimonial
            </h4>
            <div className="relative pl-8 border-l border-[#e8c178]/50">
              {/* Large decorative quote mark */}
              <span
                aria-hidden
                className="absolute -top-2 left-4 font-[Epilogue] text-[80px] leading-none text-[#e8c178]/10 select-none pointer-events-none"
              >
                "
              </span>
              <p className="font-[Epilogue] font-light text-[18px] leading-[28px] text-[#e4e2e1]/70 italic mb-6">
                &ldquo;{project.project_testimonials.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-[#e8c178]/10 border border-[#e8c178]/30 flex items-center justify-center text-[#e8c178] font-[Epilogue] font-light text-[16px]">
                  {project.project_testimonials.author.charAt(0)}
                </div>
                <div>
                  <div className="font-[Manrope] text-[13px] font-semibold tracking-[0.08em] text-[#e8c178]">
                    {project.project_testimonials.author}
                  </div>
                  <div className="font-[Manrope] text-[11px] tracking-[0.05em] text-[#e4e2e1]/40">
                    {project.project_testimonials.role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-2">
            <button className="flex-1 bg-[#e8c178] text-[#131313] py-3.5 px-6 font-[Manrope] text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#d4ae66] transition-colors duration-300">
              Start Similar Project
            </button>
            <button className="px-6 py-3.5 border border-[#e8c178]/50 text-[#e8c178] font-[Manrope] text-[11px] font-semibold tracking-[0.15em] uppercase hover:border-[#e8c178] hover:bg-[#e8c178]/5 transition-all duration-300">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
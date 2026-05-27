"use client";

import Image from "next/image";
import React from "react";
// import projects from "./data.json";
import { useRouter } from "next/navigation";

import { Project } from "@/types/type";
// type Project = {
//   id: number;
//   title: string;
//   location: string;
//   category: string;
//   status: string;
//   duration: string;
//   budget: string;
//   area: string;
//   rooms: string;
//   year: string;
//   mainImage: string;
//   gallery: string[];
//   description: string;
//   features: string[];
//   materials: string[];
//   testimonial: {
//     quote: string;
//     author: string;
//     role: string;
//   };
// };

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
      className={`group cursor-pointer transition-all duration-500 ${
        isActive ? "scale-105" : "hover:scale-102"
      }`}
      onClick={() => onClick()}
    >
      <div
        className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ${
          isActive
            ? "shadow-2xl border-2 border-[#7F6456]"
            : "shadow-lg hover:shadow-xl"
        }`}
      >
        {/* Main Project Image */}
        <div className="relative h-80 overflow-hidden">
          <Image
            fill
            src={project.main_image?.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Project Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-[#7F6456] text-white text-sm font-semibold rounded-full backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Project Status */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`px-3 py-1 text-white text-sm font-semibold rounded-full backdrop-blur-sm ${
                project.status === "Completed" ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Project Title & Quick Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm opacity-90 mb-2">{project.location}</p>
          </div>
        </div>

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#7F6456] rotate-45 border-2 border-white"></div>
        )}
      </div>
    </div>
  );
};

const EnhancedProjectsSection = ({ projects }: { projects: Project[] }) => {
  const router = useRouter();
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-[#F5F1ED]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#7F6456] via-[#A68B7A] to-[#7F6456] bg-clip-text text-transparent mb-6">
            UAE Signature Interior Projects
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-[#7F6456] to-[#A68B7A] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of exceptional projects that showcase our
            commitment to quality, innovation, and design excellence.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

        {/* Selected Project Details */}
        {/* <ProjectDetails project={projects[selectedProject]} /> */}
      </div>
    </section>
  );
};

export default EnhancedProjectsSection;

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
    <div className="bg-white  shadow-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7F6456] to-[#A68B7A] text-white p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
            <p className="text-lg opacity-90">{project.location}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{project.area}</div>
              <div className="text-sm opacity-80">Area</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{project.rooms}</div>
              <div className="text-sm opacity-80">Rooms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="p-8">
        <div className="mb-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              fill
              src={project.project_gallery[selectedImageIndex]?.image_url?.image_url}
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex  gap-3 mb-8 overflow-x-auto pb-2">
          {project.project_gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                selectedImageIndex === index
                  ? "ring-3 ring-[#7F6456] shadow-lg"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                fill
                src={image.image_url?.image_url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Project Details Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Description & Features */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#7F6456] mb-4">
                Project Overview
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#7F6456] mb-3">
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.project_features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#7F6456] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#7F6456] mb-3">
                Materials Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.project_materials.map((material, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#F5F1ED] text-[#7F6456] rounded-full text-sm font-medium"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            <div className="bg-[#F5F1ED] rounded-2xl p-6">
              <h4 className="text-xl font-semibold text-[#7F6456] mb-4">
                Project Details
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-[#7F6456]">
                    {project.category}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-[#7F6456]">
                    {project.duration}
                  </span>
                </div> */}
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Budget Range</span>
                  <span className="font-semibold text-[#7F6456]">{project.budget}</span>
                </div> */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`font-semibold ${
                      project.status === "Completed"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year</span>
                  <span className="font-semibold text-[#7F6456]">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#7F6456] mb-3">
                Client Testimonial
              </h4>
              <div className="bg-white border-l-4 border-[#7F6456] pl-6 py-4">
                <p className="text-gray-700 italic mb-3">
                  &quot{project.project_testimonials.quote}&quot
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#7F6456] rounded-full flex items-center justify-center text-white font-bold">
                    {project.project_testimonials.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#7F6456]">
                      {project.project_testimonials.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.project_testimonials.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#7F6456] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#6B5447] transition-colors duration-300">
                Start Similar Project
              </button>
              <button className="px-6 py-3 border-2 border-[#7F6456] text-[#7F6456] rounded-xl font-semibold hover:bg-[#7F6456] hover:text-white transition-all duration-300">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

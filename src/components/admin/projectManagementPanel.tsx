"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  MapPin,
  Calendar,
  Home,
  Image as ImageIcon,
  User,
  Search,
  Grid,
  List,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import NextImage from "next/image";
import { AlertDialog } from "./alertDialog";
import { toast } from "sonner";
import { Project } from "@/types/type";
import { AnimatePresence, motion } from "motion/react";

//
// --- TYPE DEFINITIONS ---
// //
// type ProjectFeature = {
//   feature: string;
// };

// type ProjectGalleryItem = {
//   image_url: { path: string; image_url: string };
// };

// type ProjectMaterial = {
//   material: string;
// };

// type ProjectTestimonial = {
//   role: string;
//   quote: string;
//   author: string;
// };

type ViewMode = "grid" | "list";

// Props coming from parent
interface Props {
  open: (value: boolean) => void;
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projects: Project[];
  setSelectProjects: React.Dispatch<React.SetStateAction<Project | null>>;
}

export const ProjectManagementPanel: React.FC<Props> = ({
  open,
  setProjects,
  projects,
  setSelectProjects,
}) => {
  //
  // --- LOCAL STATE ---
  //
  // openDialog holds project.id when user clicks delete, or false otherwise
  const [openDialog, setOpenDialog] = useState<number | boolean>(false);

  // selectedProject is shown in the detail modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  //
  // --- CONFIGS & CONSTANTS ---
  //
  const statusConfig: Record<
    string,
    {
      color: string;
      bg: string;
      icon: React.FC<{ className?: string; size?: number }>;
    }
  > = {
    Completed: {
      color: "text-green-400",
      bg: "bg-green-500/20",
      icon: CheckCircle,
    },
    "In Progress": {
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      icon: Clock,
    },
    Planning: {
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      icon: AlertTriangle,
    },
    "On Hold": {
      color: "text-red-400",
      bg: "bg-red-500/20",
      icon: XCircle,
    },
  };

  const categories = ["All", "Interior Design", "Landscaping", "Architecture"];
  const statuses = ["All", "Completed", "In Progress", "Planning", "On Hold"];

  //
  // --- EFFECTS & DATA FETCHING ---
  //
  const fetchData = async () => {
    try {
      const res = await fetch("/api/projects/getProjects");
      const data: Project[] = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  // Uncomment if you want to fetch on mount:
  // useEffect(() => {
  //   fetchData();
  // }, []);

  //
  // --- EVENT HANDLERS ---
  //
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (openDialog === false) return;

    const response = fetch("/api/projects/deleteProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectid: openDialog }),
    });

    toast.promise(response, {
      loading: "Deleting project...",
      success: () => {
        fetchData();
        return `Project deleted successfully.`;
      },
      error: (data) => {

        
        return `${data}`;
      },
    });
  };

  //
  // --- FILTER LOGIC ---
  //
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  //
  // --- STATS FOR HEADER CARDS ---
  //
  const projectStats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === "Completed").length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    planning: projects.filter((p) => p.status === "Planning").length,
  };

  //
  // --- RENDER ---
  //
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Project Management
              </h1>
              <p className="text-gray-300">
                Manage and track all your design projects
              </p>
            </div>

            <button
              onClick={() => open(true)}
              className="group relative px-6 py-3 cursor-pointer bg-[#7F6456]/20 backdrop-blur-xl border border-[#7F6456]/30 rounded-xl text-amber-100 font-semibold hover:bg-[#7F6456]/30 hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>

          {/* ===== STATS CARDS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {projectStats.total}
              </div>
              <div className="text-gray-400 text-sm">Total Projects</div>
            </div>
            <div className="backdrop-blur-sm bg-green-500/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {projectStats.completed}
              </div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
            <div className="backdrop-blur-sm bg-yellow-500/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {projectStats.inProgress}
              </div>
              <div className="text-gray-400 text-sm">In Progress</div>
            </div>
            <div className="backdrop-blur-sm bg-blue-500/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {projectStats.planning}
              </div>
              <div className="text-gray-400 text-sm">Planning</div>
            </div>
          </div>

          {/* ===== FILTERS & SEARCH ===== */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm w-full"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFilterCategory(e.target.value)
              }
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category.toLowerCase() === "all" ? "all" : category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFilterStatus(e.target.value)
              }
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
            >
              {statuses.map((status,index) => (
                <option
                  key={status+index}
                  value={status.toLowerCase() === "all" ? "all" : status}
                >
                  {status}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-white/10 rounded-lg border border-white/20 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded text-sm transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#7F6456] text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded text-sm transition-colors ${
                  viewMode === "list"
                    ? "bg-[#7F6456] text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== PROJECTS GRID / LIST ===== */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredProjects.map((project) => {
            const statusStyle =
              statusConfig[project.status] || statusConfig["Planning"];

            return (
              <div
                key={project.id}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                  <NextImage
                    src={project.main_image?.image_url}
                    className="object-cover"
                    fill
                    alt="Project Main"
                  />

                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.color} backdrop-blur-sm`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white line-clamp-1">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectProjects(project);
                        }}
                        className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDialog(project.id);
                        }}
                        className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar className="w-4 h-4 text-green-400" />
                      <span>{project.year}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Home className="w-4 h-4 text-purple-400" />
                      <span>
                        {project.area} • {project.rooms}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <ImageIcon className="w-3 h-3" />
                      {project.project_gallery?.length || 0} images
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== NO RESULTS ===== */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No projects found</div>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
      <AnimatePresence>
        {/* ===== PROJECT DETAIL MODAL ===== */}
        {showModal && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-300 mt-1">
                      {selectedProject.location}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Project Details */}
                    <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-4">
                        Project Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-sm">
                            Status
                          </label>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                statusConfig[selectedProject.status]?.bg
                              } ${statusConfig[selectedProject.status]?.color}`}
                            >
                              {selectedProject.status}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">
                            Category
                          </label>
                          <p className="text-white">
                            {selectedProject.category}
                          </p>
                        </div>

                        <div>
                          <label className="text-gray-400 text-sm">Year</label>
                          <p className="text-white">{selectedProject.year}</p>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Area</label>
                          <p className="text-white">{selectedProject.area}</p>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">Rooms</label>
                          <p className="text-white">{selectedProject.rooms}</p>
                        </div>
                      </div>
                    </div>

                    {/* Materials */}
                    <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3">Materials</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.project_materials.map((mat, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3">
                        Description
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3">
                        Key Features
                      </h3>
                      <div className="space-y-2">
                        {selectedProject.project_features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    {selectedProject.project_testimonials && (
                      <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">
                          Client Testimonial
                        </h3>
                        <blockquote className="text-gray-300 italic mb-3">
                          &ldquo;{selectedProject.project_testimonials.quote}
                          &ldquo;
                        </blockquote>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-400" />
                          <span className="text-white font-medium">
                            {selectedProject.project_testimonials.author}
                          </span>
                          <span className="text-gray-400">
                            • {selectedProject.project_testimonials.role}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gallery */}
                <div className="mt-6 backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-4">
                    Project Gallery ({selectedProject.project_gallery.length}{" "}
                    images)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedProject.project_gallery.map(
                      ({ image_url }, idx) => (
                        <div
                          key={idx}
                          className="aspect-square overflow-hidden relative bg-white/10 rounded-lg p-4 flex flex-col items-center justify-center"
                        >
                          <NextImage
                            src={image_url.image_url}
                            fill
                            alt="Gallery"
                            className="object-contain"
                          />
                          <span className="text-xs text-gray-400 text-center line-clamp-2 mt-2">
                            {image_url.image_url.split("/").pop()}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/20">
                  <button
                    onClick={() => setSelectProjects(selectedProject)}
                    className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                  >
                    Edit Project
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AlertDialog
        callBack={handleDelete}
        open={openDialog}
        setOpen={setOpenDialog}
        text={`This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.`}
      />
    </div>
  );
};

export default ProjectManagementPanel;

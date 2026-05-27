"use client";

import React, { useState, ChangeEvent } from "react";
import {
  X,
  Plus,
  Upload,
  Image as ImageIc,
  Save,
  Trash2,
  FileText,
  Layers,
  Target,
  Palette,
  ArrowLeft,
  Home,
  MapPin,
  Calendar,
  Users,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { nanoid } from "nanoid";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface FormDataType {
  title: string;
  location: string;
  category: string;
  status: string;
  duration: string;
  budget: string;
  area: string;
  rooms: string;
  year: number;
  description: string;
  features: string[];
  materials: string[];
  images: File[];
  main_image: File | null;
  testimonial: Testimonial;
  showOnLanding: boolean;
}

interface Props {
  open: React.Dispatch<React.SetStateAction<boolean>>;

  fetchData: () => Promise<void>;
}
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function ProjectConfiguration({ open, fetchData }: Props) {
  // Initial form state
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    location: "",
    category: "",
    status: "In Progress",
    duration: "",
    budget: "",
    area: "",
    rooms: "",
    year: new Date().getFullYear(),
    description: "",
    features: [],
    materials: [],
    images: [],
    main_image: null,
    testimonial: {
      quote: "",
      author: "",
      role: "",
    },
    showOnLanding: false,
  });

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // For adding features/materials
  const [newFeature, setNewFeature] = useState<string>("");
  const [newMaterial, setNewMaterial] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = [
    "Interior Design",
    "Architecture",
    "Renovation",
    "Commercial",
    "Residential",
  ];
  const statuses = ["Planning", "In Progress", "Completed", "On Hold"];

  // Simple validation function
  const validateForm = (): boolean => {
    const tempErrors: Record<string, string> = {};

    if (!formData.title.trim()) tempErrors.title = "Project title is required.";
    if (!formData.location.trim())
      tempErrors.location = "Location is required.";
    if (!formData.category) tempErrors.category = "Please select a category.";
    if (!formData.description.trim())
      tempErrors.description = "Description cannot be empty.";

    // Year validation
    // // if (formData.year < 2020 ) {
    //   tempErrors.year = "Year must be between 2020 and 2030.";
    // }

    // Main image validation
    if (!formData.main_image) {
      tempErrors.main_image = "Main image is required.";
    }

    // Images validation
    if (formData.images.length === 0) {
      tempErrors.images = "At least one project image is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  // Add a feature
  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  // Add a material
  const addMaterial = () => {
    if (newMaterial.trim()) {
      setFormData((prev) => ({
        ...prev,
        materials: [...prev.materials, newMaterial.trim()],
      }));
      setNewMaterial("");
    }
  };

  // Remove a feature by index
  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Remove a material by index
  const removeMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };
  const validateAndFilterFiles = (
    files: File[]
  ): { valid: File[]; invalidNames: string[] } => {
    const valid: File[] = [];
    const invalidNames: string[] = [];

    files.forEach((file) => {
      if (file.size <= MAX_FILE_SIZE) {
        valid.push(file);
      } else {
        invalidNames.push(file.name);
      }
    });

    return { valid, invalidNames };
  };
  // Create a hidden file input to pick multiple images
  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;

      const files = Array.from(target.files || []);
      const { valid, invalidNames } = validateAndFilterFiles(files);

      if (invalidNames.length > 0) {
        invalidNames.forEach((name) =>
          toast.error(`"${name}" exceeds 10MB and was skipped.`)
        );
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...valid],
      }));
    };
    input.click();
  };

  // Create a hidden file input to pick a single main image
  const addMainImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = false;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;

      if (target.files[0].size > MAX_FILE_SIZE) {
        toast.error(
          `"${target.files[0].name}" exceeds 10MB. Choose a smaller file.`
        );
        return;
      }
      const files = Array.from(target.files || []);
      if (files.length > 0) {
        setFormData((prev) => ({
          ...prev,
          main_image: files[0],
        }));
      }
    };
    input.click();
  };

  // Remove an image from the grid
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const uploadImage = async (projectName: string, file: File) => {
    const path = `projects/${projectName}/${nanoid()}-${file.name}`;

    const { error } = await supabase.storage
      .from("static.images")
      .upload(path, file, { contentType: file.type });

    if (error) console.log(error);

    const url = supabase.storage.from("static.images").getPublicUrl(path)
      .data.publicUrl;
    console.log(url);
    return { image_url: url, path };
  };
  // Handle generic input changes for text / select / number
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  // Handle testimonial sub‐object changes
  const handleTestimonialChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      testimonial: {
        ...prev.testimonial,
        [name]: value,
      },
    }));
  };

  // Toggle landing‐page boolean
  const toggleLandingPage = () => {
    setFormData((prev) => ({
      ...prev,
      showOnLanding: !prev.showOnLanding,
    }));
  };

  // Form submission
  const handleSubmit = async () => {
    // 1. Validate
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");

      return;
    }
    setIsSubmitting(true);
    // 2. Build FormData
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("location", formData.location);
    payload.append("category", formData.category);
    payload.append("status", formData.status);
    payload.append("duration", formData.duration);
    payload.append("budget", formData.budget);
    payload.append("area", formData.area);
    payload.append("rooms", formData.rooms);
    payload.append("year", formData.year.toString());
    payload.append("description", formData.description);
    payload.append("showOnLanding", String(formData.showOnLanding));

    payload.append("testimonial_quote", formData.testimonial.quote);
    payload.append("testimonial_author", formData.testimonial.author);
    payload.append("testimonial_role", formData.testimonial.role);

    formData.features.forEach((item) => {
      payload.append("features[]", item);
    });
    formData.materials.forEach((item) => {
      payload.append("materials[]", item);
    });
    const new_images = [];

    for (const file of formData.images) {
      const data = await uploadImage(formData.title, file);
      new_images.push(data);
    }

    payload.append("images", JSON.stringify(new_images));

    if (formData.main_image) {
      const data = await uploadImage(formData.title, formData.main_image);
      payload.append("main_image", JSON.stringify(data));
    }

    // 3. Fire off the request via promiseToast
    const responsePromise = () =>
      fetch("/api/projects/createProject", {
        method: "POST",
        body: payload,
      });
    toast.promise(responsePromise, {
      loading: "Loading...",
      success: () => {
        open(false);
        fetchData();
        return `New project successfully added `;
      },
      error: () => {
        setIsSubmitting(false);

        return "Error";
      },
    });
  };

  // Tab definitions
  const tabs = [
    { id: "basic", label: "Basic Info", icon: Home },
    { id: "details", label: "Details", icon: FileText },
    { id: "features", label: "Features", icon: Layers },
    { id: "images", label: "Images", icon: ImageIc },
    { id: "testimonial", label: "Testimonial", icon: Users },
  ];

  const [activeTab, setActiveTab] = useState<string>("basic");

  return (
    <div className="px-5">
      <div className="p-5">
        <button
          onClick={() => open(false)}
          className="group flex gap-2.5 w-44 relative px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#7F6456]/20"
        >
          <ArrowLeft />
          <p>Go Back</p>
        </button>
      </div>

      <div className="w-full h-full flex-col flex items-center justify-center">
        <div className="w-full backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="md:flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#7F6456] rounded-xl flex items-center justify-center">
                <Palette className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Project Configuration
                </h2>
                <p className="text-gray-300 text-sm">
                  Configure project details and settings
                </p>
              </div>
            </div>

            {/* Landing Page Toggle */}
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium">
                Show on Landing Page
              </span>
              <button
                onClick={toggleLandingPage}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:ring-offset-2 ${
                  formData.showOnLanding ? "bg-[#7F6456]" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.showOnLanding ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              {formData.showOnLanding ? (
                <ToggleRight className="text-[#7F6456]" size={20} />
              ) : (
                <ToggleLeft className="text-gray-400" size={20} />
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/20 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#7F6456] border-b-2 border-[#7F6456] bg-[#7F6456]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {/* ===== BASIC INFO ===== */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Title */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                      placeholder="Enter project title"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                        placeholder="Project location"
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                    >
                      <option value="" className="bg-gray-800">
                        Select Category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-gray-800">
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                    >
                      {statuses.map((status, index) => (
                        <option
                          key={status + index}
                          value={status}
                          className="bg-gray-800"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ===== DETAILS ===== */}
            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Year */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Year
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full md:w-48 pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                        min={2020}
                        max={2030}
                      />
                    </div>
                    {errors.year && (
                      <p className="text-red-400 text-sm mt-1">{errors.year}</p>
                    )}
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                      placeholder="e.g., 1,800 sq ft"
                    />
                  </div>

                  {/* Rooms */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Rooms
                    </label>
                    <input
                      type="text"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                      placeholder="e.g., 2 BR + 3 BA"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent resize-none"
                    placeholder="Describe your project in detail..."
                  />
                  <div className="flex items-center justify-end text-sm text-gray-400 mt-2">
                    <span>{formData.description.length} characters</span>
                  </div>
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ===== FEATURES ===== */}
            {activeTab === "features" && (
              <div className="space-y-6">
                {/* Add New Feature */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Plus className="mr-2" size={18} />
                    Add Project Features
                  </h3>
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Feature description"
                      className="flex-1 md:px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456]"
                    />
                    <button
                      onClick={addFeature}
                      className="px-4 py-2 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <AnimatePresence>
                    {formData.features.map((feature, index) => (
                      <motion.div
                        key={feature + index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
                      >
                        <span className="text-gray-300 flex items-center">
                          <Target className="mr-2 text-[#7F6456]" size={16} />
                          {feature}
                        </span>
                        <button
                          onClick={() => removeFeature(index)}
                          className="p-1 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Add Materials */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Plus className="mr-2" size={18} />
                    Add Materials Used
                  </h3>
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      value={newMaterial}
                      onChange={(e) => setNewMaterial(e.target.value)}
                      placeholder="Material name"
                      className="flex-1 md:px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456]"
                    />
                    <button
                      onClick={addMaterial}
                      className="px-4 py-2 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Materials List */}
                <div className="space-y-3">
                  <AnimatePresence>
                    {formData.materials.map((material, index) => (
                      <motion.div
                        key={material + index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
                      >
                        <span className="text-gray-300 flex items-center">
                          <Layers className="mr-2 text-[#7F6456]" size={16} />
                          {material}
                        </span>
                        <button
                          onClick={() => removeMaterial(index)}
                          className="p-1 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* ===== IMAGES ===== */}
            {activeTab === "images" && (
              <div className="space-y-4">
                {/* Upload Main Image */}
                <button
                  onClick={addMainImage}
                  className="w-full p-8 border-2 border-dashed border-white/30 rounded-2xl hover:border-[#7F6456] hover:bg-[#7F6456]/10 transition-all duration-300 text-center group"
                >
                  <Upload
                    className="mx-auto mb-4 text-gray-400 group-hover:text-[#7F6456]"
                    size={32}
                  />
                  <p className="text-gray-400 group-hover:text-white">
                    Click to upload project Main Image
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </button>
                {errors.main_image && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.main_image}
                  </p>
                )}
                {/* Main Image Preview */}
                <div className="grid grid-cols-2 gap-4">
                  {formData.main_image && (
                    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 group">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#7F6456]/20 rounded-lg flex items-center justify-center">
                          <ImageIc className="text-[#7F6456]" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {formData.main_image.name}
                          </p>
                          <p className="text-gray-400 text-xs">Image file</p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, main_image: null }))
                        }
                        className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors text-red-400 opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Upload Additional Images */}
                <button
                  onClick={addImage}
                  className="w-full p-8 border-2 border-dashed border-white/30 rounded-2xl hover:border-[#7F6456] hover:bg-[#7F6456]/10 transition-all duration-300 text-center group"
                >
                  <Upload
                    className="mx-auto mb-4 text-gray-400 group-hover:text-[#7F6456]"
                    size={32}
                  />
                  <p className="text-gray-400 group-hover:text-white">
                    Click to upload project images
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </button>
                {errors.images && (
                  <p className="text-red-400 text-sm mt-1">{errors.images}</p>
                )}
                {/* Additional Images Preview */}
                <div className="grid grid-cols-2 gap-4">
                  {formData.images.map((image, index) => (
                    <div
                      key={index + "images"}
                      className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#7F6456]/20 rounded-lg flex items-center justify-center">
                          <ImageIc className="text-[#7F6456]" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {image.name}
                          </p>
                          <p className="text-gray-400 text-xs">Image file</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors text-red-400 opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== TESTIMONIAL ===== */}
            {activeTab === "testimonial" && (
              <div className="space-y-6">
                {/* Quote */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Client Quote
                  </label>
                  <textarea
                    name="quote"
                    value={formData.testimonial.quote}
                    onChange={handleTestimonialChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent resize-none"
                    placeholder="Enter client testimonial quote..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Name */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.testimonial.author}
                      onChange={handleTestimonialChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                      placeholder="Client name"
                    />
                  </div>

                  {/* Client Role */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Client Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.testimonial.role}
                      onChange={handleTestimonialChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                      placeholder="Client role/title"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end p-6 border-t border-white/20">
            <div className="flex space-x-3">
              {isSubmitting ? (
                <button
                  
                  className="flex items-center space-x-2 px-15 py-6 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-semibold transition-colors shadow-lg"
                >
                  <span className="loader -mt-10"></span>
                  {/* <span>Save Project</span> */}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-semibold transition-colors shadow-lg"
                >
                  <Save size={18} />
                  <span>Save Project</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  X,
  Plus,
  Minus,
  Upload,
  Image as ImageIcon,
  Save,
  Trash2,
  FileText,
  Layers,
  Target,
  Palette,
  ArrowLeft,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { nanoid } from "nanoid";
import ServiceINput from "./serviceINput";
import { Image as TypeImage } from "@/types/type";

//
// --- TYPE DEFINITIONS ---
//
interface Props {
  open: Dispatch<SetStateAction<boolean>>;
  callBack: () => void;
}

interface FormDataState {
  serviceName: string;
  services: Record<string, string[]>; // category → list of sub‐services
  images: File[];
  coverImages: File[]; // single or zero
  body: string;
}

interface FormErrors {
  serviceName?: string;
  services?: string;
  images?: string;
  coverImages?: string;
  body?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function ServiceModal({ open, callBack }: Props) {
  //
  // --- LOCAL STATE ---
  //
  const [activeTab, setActiveTab] = useState<
    "services" | "images" | "description"
  >("services");

  const [formData, setFormData] = useState<FormDataState>({
    serviceName: "",
    services: {},
    images: [],
    coverImages: [],
    body: "",
  });

  const [newService, setNewService] = useState<string>("");

  const [subServiceImage, setSubServiceImage] = useState<
    Record<string, { image: File }>
  >({});

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  //
  // --- HELPERS & VALIDATION ---
  //

  // Validate before saving
  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};

    // serviceName required
    if (!formData.serviceName.trim()) {
      tempErrors.serviceName = "Service name is required.";
    }

    // At least one category
    if (Object.keys(formData.services).length === 0) {
      tempErrors.services = "Add at least one service category.";
    }

    // Description required
    if (!formData.body.trim()) {
      tempErrors.body = "Description cannot be empty.";
    }

    // Cover image required
    if (formData.coverImages.length === 0) {
      tempErrors.coverImages = "Upload a cover image (≤ 10MB).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle file size validation

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

  //
  // --- EVENT HANDLERS ---
  //

  // Add a new service category
  const addService = () => {
    if (newService.trim()) {
      setFormData((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          [newService.trim()]: [],
        },
      }));
      setNewService("");
      // Clear any previous services error
      setErrors((prev) => {
        // const { services, ...rest } = prev;
        const { ...rest } = prev;
        return rest;
      });
    }
  };

  // Add a new sub‐service under selected category
  const addSubService = (newSubService: string, selectedService: string) => {
    if (newSubService.trim() && selectedService) {
      setFormData((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          [selectedService]: [
            ...(prev.services[selectedService] || []),
            newSubService.trim(),
          ],
        },
      }));
    }
  };

  // Remove a service category entirely
  const removeService = (service: string) => {
    const newObj = { ...subServiceImage };
    delete newObj[service];

    setSubServiceImage(newObj);
    setFormData((prev) => {
      const newServices = { ...prev.services };
      delete newServices[service];
      return {
        ...prev,
        services: newServices,
      };
    });
  };

  // Remove a specific sub‐service
  const removeSubService = (service: string, subServiceIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: prev.services[service].filter(
          (_, index) => index !== subServiceIndex
        ),
      },
    }));
  };

  // Add multiple images (gallery), only those ≤ 10MB
  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;

      const files = Array.from(target.files);
      const { valid, invalidNames } = validateAndFilterFiles(files);

      if (invalidNames.length > 0) {
        invalidNames.forEach((name) =>
          toast.error(`"${name}" exceeds 10MB and was skipped.`)
        );
      }

      if (valid.length > 0) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...valid],
        }));
      }
    };

    input.click();
  };
  const addSubImage = (subService_name: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;

      const files = Array.from(target.files);
      const { valid, invalidNames } = validateAndFilterFiles(files);

      if (invalidNames.length > 0) {
        invalidNames.forEach((name) =>
          toast.error(`"${name}" exceeds 10MB and was skipped.`)
        );
      }

      if (valid.length > 0) {
        const newObj = { ...subServiceImage };
        newObj[subService_name] = { image: valid[0] };

        setSubServiceImage(newObj);
      }
    };

    input.click();
  };

  // Add a single cover image, must be ≤ 10MB
  const addCoverImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = false;

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;

      const file = target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds 10MB. Choose a smaller file.`);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        coverImages: [file],
      }));

      // Clear any previous coverImages error
      setErrors((prev) => {
        const { ...rest } = prev;
        // const { coverImages, ...rest } = prev;
        return rest;
      });
    };

    input.click();
  };

  // Remove a gallery image by index
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Remove the cover image entirely
  const removeCoverImage = () => {
    setFormData((prev) => ({
      ...prev,
      coverImages: [],
    }));
  };
  const uploadImage = async (serviceName: string, file: File) => {
    const path = `service/${serviceName}/${nanoid()}-${file.name}`;

    const { error } = await supabase.storage
      .from("static.images")
      .upload(path, file, { contentType: file.type });

    if (error) console.log(error);

    const url = supabase.storage.from("static.images").getPublicUrl(path)
      .data.publicUrl;
    console.log(url);
    return { image_url: url, path };
  };

  // Handle Save (submit)
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = new FormData();
      payload.append("serviceName", formData.serviceName.trim());
      payload.append("description", formData.body.trim());
      payload.append("services", JSON.stringify(formData.services));

      // Append cover image (only one allowed)
      formData.coverImages.forEach(async (coverImg) => {
        const data = await uploadImage(formData.serviceName, coverImg);
        payload.append("coverImages", JSON.stringify(data));
      });
      const newsubServiceImage: Record<string, TypeImage> = {};

      for (const [key, value] of Object.entries(subServiceImage)) {
        newsubServiceImage[key] = await uploadImage(
          formData.serviceName,
          value.image
        );
      }
      payload.append("subServiceImages", JSON.stringify(newsubServiceImage));
      // Append gallery images
      if (formData.images.length > 0) {
        const data = await Promise.all(
          formData.images.map((img) => uploadImage(formData.serviceName, img))
        );
        payload.append("images", JSON.stringify(data));
      }

      const res = fetch("/api/services/crateService", {
        method: "POST",
        body: payload,
      });

      toast.promise(res, {
        loading: "Saving service...",
        success: () => {
          callBack();
          return "Service successfully added.";
        },
        error: () => {
          setIsSubmitting(false);
          return "Error saving service.";
        },
      });
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  //
  // --- RENDER ---
  //
  return (
    <div className="px-5">
      <div className="py-5">
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
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#7F6456] rounded-xl flex items-center justify-center">
                <Palette className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Service Configuration
                </h2>
              </div>
            </div>
          </div>

          {/* Service Name */}
          <div className="p-6 border-b border-white/20">
            <label className="block text-white font-medium mb-2">
              Service Name
            </label>
            <input
              type="text"
              value={formData.serviceName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  serviceName: e.target.value,
                }));
                setErrors((prev) => {
                  // const { serviceName, ...rest } = prev;
                  const { ...rest } = prev;
                  return rest;
                });
              }}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
              placeholder="Enter service name"
            />
            {errors.serviceName && (
              <p className="text-red-400 text-sm mt-1">{errors.serviceName}</p>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/20 overflow-auto">
            {[
              { id: "services", label: "Services", icon: Layers },
              { id: "images", label: "Images", icon: ImageIcon },
              { id: "description", label: "Description", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "services" | "images" | "description")
                }
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
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
          <div className="p-6">
            {activeTab === "services" && (
              <div className="space-y-6">
                {/* Add New Service Category */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Plus className="mr-2" size={18} />
                    Add New Service Category
                  </h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newService}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewService(e.target.value)
                      }
                      placeholder="Service category name"
                      className="flex-1 md:px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456]"
                    />
                    <button
                      onClick={addService}
                      className="px-4 py-2 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {errors.services && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.services}
                    </p>
                  )}
                </div>

                {/* Existing Services */}
                <div className="space-y-4 flex flex-wrap gap-2">
                  <AnimatePresence>
                    {Object.entries(formData.services).map(
                      ([service, subServices]) => (
                        <motion.div
                          key={service}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          layout
                          className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-semibold flex items-center">
                              <Target
                                className="mr-2 text-[#7F6456]"
                                size={16}
                              />
                              {service}
                            </h4>
                            <button
                              onClick={() => removeService(service)}
                              className="p-1 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="space-y-2 mb-3 relative">
                            {subServiceImage[service] && (
                              <Image
                                onClick={() => addSubImage(service)}
                                className="object-cover rounded-2xl"
                                fill
                                src={URL.createObjectURL(
                                  subServiceImage[service]?.image
                                )}
                                alt={`images+${service}`}
                              />
                            )}
                            <button
                              onClick={() => addSubImage(service)}
                              className="w-full p-8 border-2 border-dashed border-white/30 rounded-2xl hover:border-[#7F6456] hover:bg-[#7F6456]/10 transition-all duration-300 text-center group"
                            >
                              <Upload
                                className="mx-auto mb-4 text-gray-400 group-hover:text-[#7F6456]"
                                size={32}
                              />
                              <p className="text-gray-400 group-hover:text-white">
                                Click to upload image
                              </p>
                              <p className="text-gray-500 text-sm mt-1">
                                PNG, JPG, JPEG up to 10MB
                              </p>
                            </button>
                          </div>
                          {/* Sub‐services List */}
                          <div className="space-y-2 mb-3">
                            {subServices.map((subService, index) => (
                              <motion.div
                                key={subService + index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                              >
                                <span className="text-gray-300 text-sm">
                                  {subService}
                                </span>
                                <button
                                  onClick={() =>
                                    removeSubService(service, index)
                                  }
                                  className="p-1 hover:bg-red-500/20 rounded transition-colors text-red-400"
                                >
                                  <Minus size={14} />
                                </button>
                              </motion.div>
                            ))}
                          </div>

                          {/* Add a Sub‐service */}
                          <div className="flex space-x-2">
                            <ServiceINput
                              addSubService={addSubService}
                              service={service}
                            />
                          </div>
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div className="space-y-6">
                {/* Cover Image Upload */}
                <div className="space-y-4">
                  <button
                    onClick={addCoverImage}
                    className="w-full p-8 border-2 border-dashed border-white/30 rounded-2xl hover:border-[#7F6456] hover:bg-[#7F6456]/10 transition-all duration-300 text-center group"
                  >
                    <Upload
                      className="mx-auto mb-4 text-gray-400 group-hover:text-[#7F6456]"
                      size={32}
                    />
                    <p className="text-gray-400 group-hover:text-white">
                      Click to upload cover image
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </button>

                  {errors.coverImages && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.coverImages}
                    </p>
                  )}

                  {/* Cover Image Preview */}
                  {formData.coverImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative bg-[#7F6456]/20 rounded-lg flex items-center justify-center">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Cover-${index}`}
                            fill
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-400 text-xs">Cover file</p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoverImage}
                        className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors text-red-400 opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Gallery Images Upload */}
                <div className="space-y-4">
                  <button
                    onClick={addImage}
                    className="w-full p-8 border-2 border-dashed border-white/30 rounded-2xl hover:border-[#7F6456] hover:bg-[#7F6456]/10 transition-all duration-300 text-center group"
                  >
                    <Upload
                      className="mx-auto mb-4 text-gray-400 group-hover:text-[#7F6456]"
                      size={32}
                    />
                    <p className="text-gray-400 group-hover:text-white">
                      Click to upload images
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      PNG, JPG, JPEG up to 10MB each
                    </p>
                  </button>

                  {errors.images && (
                    <p className="text-red-400 text-sm mt-1">{errors.images}</p>
                  )}

                  {/* Gallery Preview */}
                  <div className="grid grid-cols-2 gap-4">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 relative bg-[#7F6456]/20 rounded-lg flex items-center justify-center">
                            <Image
                              src={URL.createObjectURL(image)}
                              alt={`Image-${index}`}
                              fill
                            />
                          </div>
                          <div className="flex-1 min-w-0">
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
              </div>
            )}

            {activeTab === "description" && (
              <div className="space-y-4">
                <label className="block text-white font-medium mb-2">
                  Service Description
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }));
                    setErrors((prev) => {
                      // const { body, ...rest } = prev;
                      const { ...rest } = prev;
                      return rest;
                    });
                  }}
                  rows={8}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent resize-none"
                  placeholder="Enter detailed service description..."
                />
                {errors.body && (
                  <p className="text-red-400 text-sm mt-1">{errors.body}</p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{formData.body.length} characters</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-white/20">
            <button
              onClick={() => open(false)}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <div className="flex space-x-3">
              {isSubmitting ? (
                <button className="flex items-center space-x-2 px-15 py-6 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-semibold transition-colors shadow-lg">
                  <span className="loader -mt-10"></span>
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-semibold transition-colors shadow-lg"
                >
                  <Save size={18} />
                  <span>Save Service</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

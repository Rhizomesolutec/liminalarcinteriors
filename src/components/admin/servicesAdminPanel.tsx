

"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Users,
  Star,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Service } from "@/types/type";
import { AlertDialog } from "./alertDialog";

// Type definitions



interface ServicesAdminPanelProps {
  open: (isOpen: boolean) => void;
  services: Service[];
  setSelectServices: React.Dispatch<React.SetStateAction<Service | null>>
  fetchData: () => Promise<void>
}

type ViewMode = "grid" | "list";

const ServicesAdminPanel: React.FC<ServicesAdminPanelProps> = ({
  open,
  services,
  setSelectServices,
  fetchData
}) => {
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [openDialog, setOpenDialog] = useState<number | boolean>(false);

  const toggleServiceExpansion = (serviceId: number): void => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  const openServiceModal = (service: Service): void => {
    setSelectedService(service);
    setShowModal(true);
  };

  const filteredServices = services.filter(
    (service) =>
      service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {

    if (openDialog === false) return;

    toast.promise(fetch(`/api/services/deleteService?serviceId=${openDialog}`), {
      loading: "Loading...",
      success: () => {
        // Note: fetchData function is not defined in the original code
        // You may need to pass it as a prop or define it
        fetchData();
        return `Service successfully deleted`;
      },
      error: "Error",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Services Management
              </h1>
              <p className="text-gray-300">
                Manage your services, sub-services, and testimonials
              </p>
            </div>

            <div className="md:flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
                />
              </div>

              <div className="flex  md:block hidden bg-white/10 rounded-lg border border-white/20 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded text-sm transition-colors ${viewMode === "grid"
                    ? "bg-[#7F6456] text-white"
                    : "text-gray-300 hover:text-white"
                    }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded text-sm transition-colors ${viewMode === "list"
                    ? "bg-[#7F6456] text-white"
                    : "text-gray-300 hover:text-white"
                    }`}
                >
                  List
                </button>
              </div>

              <button
                onClick={() => open(true)}
                className="group md:mt-0 mt-3 relative px-6 py-2 cursor-pointer bg-[#7F6456]/20 backdrop-blur-xl border border-[#7F6456]/30 rounded-lg text-amber-100 font-semibold hover:bg-[#7F6456]/30 hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid/List */}
        <div
          className={`grid gap-6 ${viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
            }`}
        >
          {!!services.length &&
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Service Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {service.service_name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openServiceModal(service)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectServices(service)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setOpenDialog(service.id);
                        }}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-blue-400">
                      <Users className="w-4 h-4" />
                      <span>
                        {service.sub_services?.length || 0} Sub-services
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-purple-400">
                      <ImageIcon className="w-4 h-4" />
                      <span>{service.images?.length || 0} Images</span>
                    </div>
                  </div>
                </div>

                {/* Sub-services Preview */}
                <div className="p-4">
                  <button
                    onClick={() => toggleServiceExpansion(service.service_id)}
                    className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors mb-3"
                  >
                    <span className="text-sm font-medium">Sub-services</span>
                    {expandedServices.has(service.service_id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {expandedServices.has(service.service_id) ? (
                    <div className="space-y-3">
                      {service.sub_services?.map((subService) => (
                        <div
                          key={subService.sub_service_name}
                          className="bg-white/5 rounded-lg p-3"
                        >
                          <h4 className="text-white font-medium mb-2">
                            {subService.sub_service_name}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {subService.features
                              ?.slice(0, 3)
                              .map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded"
                                >
                                  {feature}
                                </span>
                              ))}
                            {subService.features && subService.features.length > 3 && (
                              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">
                                +{subService.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {service.sub_services?.slice(0, 3).map((subService, index) => (
                        <span
                          key={"subService.created_at" + index + subService.id}
                          className="px-3 py-1 bg-white/10 text-gray-300 text-xs rounded-full"
                        >
                          {subService.sub_service_name}
                        </span>
                      ))}
                      {service.sub_services && service.sub_services.length > 3 && (
                        <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                          +{service.sub_services.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="flex justify-center items-center opacity-50">
            <Image
              className="animate-pulse"
              alt="vector43"
              src={"/Vector 3 (2).png"}
              width={400}
              height={400}
            />
          </div>
        )}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No services found</div>
            <p className="text-gray-500 mt-2">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedService.service_name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Description</h3>
                  <p className="text-gray-300">{selectedService.description}</p>
                </div>

                {/* Sub-services */}
                <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-4">
                    Sub-services & Features
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedService.sub_services?.map((subService) => (
                      <div
                        key={subService.created_at + "sub"}
                        className="bg-white/5 rounded-lg p-3"
                      >
                        <h4 className="text-white font-medium mb-2">
                          {subService.sub_service_name}
                        </h4>
                        <div className="space-y-1">
                          {subService.features?.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-4">
                    Images ({selectedService.images?.length || 0})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedService.images?.map((image, idx) => (
                      <div
                        key={idx}
                        className="aspect-square overflow-hidden relative bg-white/10 rounded-lg p-3 flex items-center justify-center"
                      >
                        <Image alt={`Service image ${idx + 1}`} src={image.image_url!} fill />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-4">
                    Testimonials ({selectedService.testimonials?.length || 0})
                  </h3>
                  <div className="space-y-3">
                    {selectedService.testimonials?.map((testimonial, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">
                            {testimonial.name}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < testimonial.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-500"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {testimonial.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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

export default ServicesAdminPanel;


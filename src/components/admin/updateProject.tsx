// "use client";

// import React, { useState } from "react";
// import {
//   X,
//   Plus,
//   Minus,
//   Upload,
//   Image,
//   Save,
//   Eye,
//   Trash2,
//   FileText,
//   Layers,
//   Target,
//   Palette,
//   ArrowLeft,
//   Home,
//   MapPin,
//   Calendar,
//   DollarSign,
//   Users,
//   Clock,
//   ToggleLeft,
//   ToggleRight,
// } from "lucide-react";
// import { AnimatePresence, motion } from "motion/react";
// import Link from "next/link";
// import { toast } from "sonner";

// export default function UpdateProjectProjectConfiguration({
//   open,
//   data,
// }) {
//   const [activeTab, setActiveTab] = useState("basic");
//   const [formData, setFormData] = useState(data);

//   const [newFeature, setNewFeature] = useState("");
//   const [newMaterial, setNewMaterial] = useState("");

//   const categories = [
//     "Interior Design",
//     "Architecture",
//     "Renovation",
//     "Commercial",
//     "Residential",
//   ];
//   const statuses = ["Planning", "In Progress", "Completed", "On Hold"];
//   console.log("dddddd", formData);
//   const addFeature = () => {
//     if (newFeature.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         project_features: [...prev.project_features, newFeature],
//       }));
//       setNewFeature("");
//     }
//   };

//   const addMaterial = () => {
//     if (newMaterial.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         project_materials: [...prev.project_materials, newMaterial],
//       }));
//       setNewMaterial("");
//     }
//   };

//   const removeFeature = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index),
//     }));
//   };

//   const removeMaterial = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       materials: prev.materials.filter((_, i) => i !== index),
//     }));
//   };

//   const addImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.multiple = true;
//     input.onchange = (e) => {
//       const files = Array.from(e.target.files);
//       const images = files.map((data) => {
//         return { image_url: data };
//       });
//       console.log(images);
//       setFormData((prev) => ({
//         ...prev,
//         project_gallery: [...prev.project_gallery, ...images],
//       }));
//     };
//     input.click();
//   };
//   const addMainImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.multiple = false;
//     input.onchange = (e) => {
//       const files = Array.from(e.target.files);
//       if (files.length > 0) {
//         setFormData((prev) => ({
//           ...prev,
//           main_image: files[0],
//         }));
//       }
//     };
//     input.click();
//   };

//   const removeImage = (image_url) => {
//     setFormData((prev) => ({
//       ...prev,
//       project_gallery: prev.project_gallery.filter(
//         ({ image_url: obj }) => obj !== image_url
//       ),
//     }));
//   };
//   const removeMainImage = () => {
//     setFormData((prev) => ({
//       ...prev,
//       main_image: null,
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleTestimonialChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       project_testimonials: {
//         ...prev.project_testimonials,
//         [name]: value,
//       },
//     }));
//   };

//   const toggleLandingPage = () => {
//     setFormData((prev) => ({
//       ...prev,
//       showOnLanding: !prev.showOnLanding,
//     }));
//   };

//   const tabs = [
//     { id: "basic", label: "Basic Info", icon: Home },
//     { id: "details", label: "Details", icon: FileText },
//     { id: "features", label: "Features", icon: Layers },
//     { id: "images", label: "Images", icon: Image },
//     { id: "testimonial", label: "Testimonial", icon: Users },
//   ];
//   const handleSubmit = async () => {
//     const form = new FormData();

//     form.append("title", formData.title);
//     form.append("location", formData.location);
//     form.append("category", formData.category);
//     form.append("status", formData.status);
//     form.append("duration", formData.duration);
//     form.append("budget", formData.budget);
//     form.append("area", formData.area);
//     form.append("rooms", formData.rooms);
//     form.append("year", formData.year.toString());
//     form.append("description", formData.description);
//     form.append("showOnLanding", formData.showOnLanding.toString());

//     form.append("testimonial_quote", formData.project_testimonials?.quote);
//     form.append("testimonial_author", formData.project_testimonials?.author);
//     form.append("testimonial_role", formData.project_testimonials?.role);
//     form.append("id", formData.id);

//     formData.project_features.forEach((item) => {
//       form.append(`project_features[]`, item);
//     });

//     formData.project_materials.forEach((item) => {
//       form.append(`project_materials[]`, item);
//     });

//     formData.project_gallery.forEach((item) => {
//       if (item.image_url instanceof File) {
//         // newly picked File
//         form.append("new_gallery_images", item.image_url);
//       } else if (
//         typeof item.image_url === "object" &&
//         "path" in item.image_url
//       ) {
//         // already existing → send its path
//         console.log("eeeeeeeeeee-");
//         form.append("existing_gallery_paths[]", item.image_url.path);
//       }
//     });

//     if (formData.main_image instanceof File) {
//       form.append("main_image", formData.main_image);
//     } else if (
//       formData.main_image !== null &&
//       typeof formData.main_image === "object" &&
//       "path" in formData.main_image
//     ) {
//       form.append("existing_main_image_path", formData.main_image.path);
//     }

//     const response = fetch("/api/projects/updateProject", {
//       method: "POST",
//       body: form,
//     });
//     toast.promise(response, {
//       loading: "Loading...",
//       success: () => {
//         open();
//         return `New project successfully added `;
//       },
//       error: "Error",
//     });
//     // promiseToast(response);
//   };

//   return (
//     <>
//       <div className="px-5">
//         <div className="p-5">
//           <button
//             onClick={() => open()}
//             className="group flex gap-2.5 w-44 relative px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#7F6456]/20"
//           >
//             <ArrowLeft />
//             <p>Go Back</p>
//           </button>
//         </div>

//         <div className="w-full h-full flex-col flex items-center justify-center">
//           <div className="w-full backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
//             <div className="flex items-center justify-between p-6 border-b border-white/20">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-[#7F6456] rounded-xl flex items-center justify-center">
//                   <Palette className="text-white" size={20} />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">
//                     Project Configuration
//                   </h2>
//                   <p className="text-gray-300 text-sm">
//                     Configure project details and settings
//                   </p>
//                 </div>
//               </div>

//               {/* Landing Page Toggle */}
//               <div className="flex items-center space-x-3">
//                 <span className="text-white font-medium">
//                   Show on Landing Page
//                 </span>
//                 <button
//                   onClick={toggleLandingPage}
//                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:ring-offset-2 ${
//                     formData.showOnLanding ? "bg-[#7F6456]" : "bg-gray-600"
//                   }`}
//                 >
//                   <span
//                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                       formData.showOnLanding ? "translate-x-6" : "translate-x-1"
//                     }`}
//                   />
//                 </button>
//                 {formData.showOnLanding ? (
//                   <ToggleRight className="text-[#7F6456]" size={20} />
//                 ) : (
//                   <ToggleLeft className="text-gray-400" size={20} />
//                 )}
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-white/20 overflow-x-auto">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex-shrink-0 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
//                     activeTab === tab.id
//                       ? "text-[#7F6456] border-b-2 border-[#7F6456] bg-[#7F6456]/10"
//                       : "text-gray-300 hover:text-white hover:bg-white/5"
//                   }`}
//                 >
//                   <tab.icon size={18} />
//                   <span>{tab.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             <div className="p-6 max-h-96 overflow-y-auto">
//               {activeTab === "basic" && (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Project Title
//                       </label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                         placeholder="Enter project title"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Location
//                       </label>
//                       <div className="relative">
//                         <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <input
//                           type="text"
//                           name="location"
//                           value={formData.location}
//                           onChange={handleInputChange}
//                           className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                           placeholder="Project location"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Category
//                       </label>
//                       <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                         required
//                       >
//                         <option value="" className="bg-gray-800">
//                           Select Category
//                         </option>
//                         {categories.map((cat) => (
//                           <option key={cat} value={cat} className="bg-gray-800">
//                             {cat}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Status
//                       </label>
//                       <select
//                         name="status"
//                         value={formData.status}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                       >
//                         {statuses.map((status) => (
//                           <option
//                             key={status}
//                             value={status}
//                             className="bg-gray-800"
//                           >
//                             {status}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "details" && (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Year
//                       </label>
//                       <div className="relative">
//                         <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <input
//                           type="number"
//                           name="year"
//                           value={formData.year}
//                           onChange={handleInputChange}
//                           className="w-full md:w-48 pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                           min="2020"
//                           max="2030"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Area
//                       </label>
//                       <input
//                         type="text"
//                         name="area"
//                         value={formData.area}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                         placeholder="e.g., 1,800 sq ft"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Rooms
//                       </label>
//                       <input
//                         type="text"
//                         name="rooms"
//                         value={formData.rooms}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                         placeholder="e.g., 2 BR + 3 BA"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-white font-medium mb-2">
//                       Project Description
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       rows={6}
//                       className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent resize-none"
//                       placeholder="Describe your project in detail..."
//                       required
//                     />
//                     <div className="flex items-center justify-end text-sm text-gray-400 mt-2">
//                       <span>{formData.description.length} characters</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "features" && (
//                 <div className="space-y-6">
//                   {/* Add New Feature */}
//                   <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4">
//                     <h3 className="text-white font-semibold mb-3 flex items-center">
//                       <Plus className="mr-2" size={18} />
//                       Add Project Features
//                     </h3>
//                     <div className="flex space-x-2 mb-4">
//                       <input
//                         type="text"
//                         value={newFeature}
//                         onChange={(e) => setNewFeature(e.target.value)}
//                         placeholder="Feature description"
//                         className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456]"
//                       />
//                       <button
//                         onClick={addFeature}
//                         className="px-4 py-2 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-medium transition-colors"
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>

//                   {/* Features List */}
//                   <div className="space-y-3">
//                     <AnimatePresence>
//                       {formData.project_features.map((feature, index) => (
//                         <motion.div
//                           key={feature + index}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, scale: 0.95 }}
//                           transition={{ duration: 0.2, ease: "easeOut" }}
//                           className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
//                         >
//                           <span className="text-gray-300 flex items-center">
//                             <Target className="mr-2 text-[#7F6456]" size={16} />
//                             {feature}
//                           </span>
//                           <button
//                             onClick={() => removeFeature(index)}
//                             className="p-1 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </div>

//                   {/* Add Materials */}
//                   <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4">
//                     <h3 className="text-white font-semibold mb-3 flex items-center">
//                       <Plus className="mr-2" size={18} />
//                       Add Materials Used
//                     </h3>
//                     <div className="flex space-x-2 mb-4">
//                       <input
//                         type="text"
//                         value={newMaterial}
//                         onChange={(e) => setNewMaterial(e.target.value)}
//                         placeholder="Material name"
//                         className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456]"
//                       />
//                       <button
//                         onClick={addMaterial}
//                         className="px-4 py-2 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-medium transition-colors"
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>

//                   {/* Materials List */}
//                   <div className="space-y-3">
//                     <AnimatePresence>
//                       {formData.project_materials.map((material, index) => (
//                         <motion.div
//                           key={material + index}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, scale: 0.95 }}
//                           transition={{ duration: 0.2, ease: "easeOut" }}
//                           className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
//                         >
//                           <span className="text-gray-300 flex items-center">
//                             <Layers className="mr-2 text-[#7F6456]" size={16} />
//                             {material}
//                           </span>
//                           <button
//                             onClick={() => removeMaterial(index)}
//                             className="p-1 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "images" && (
//                 <div className="space-y-4">
//                   {/* main Images */}
//                   <button
//                     onClick={addMainImage}
//                     className="w-full p-8 border-2 border-dashed border-white/30 rounded-2xl hover:border-[#7F6456] hover:bg-[#7F6456]/10 transition-all duration-300 text-center group"
//                   >
//                     <Upload
//                       className="mx-auto mb-4 text-gray-400 group-hover:text-[#7F6456]"
//                       size={32}
//                     />
//                     <p className="text-gray-400 group-hover:text-white">
//                       Click to upload project Main Image
//                     </p>
//                     <p className="text-gray-500 text-sm mt-1">
//                       PNG, JPG, JPEG up to 10MB
//                     </p>
//                   </button>

//                   {/* Image List */}
//                   <div className="grid grid-cols-2 gap-4">
//                     {formData.main_image && (
//                       <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 group">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-12 h-12 bg-[#7F6456]/20 rounded-lg flex items-center justify-center">
//                             <Image className="text-[#7F6456]" size={20} />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-white text-sm font-medium truncate">
//                               {formData.main_image?.image_url}
//                             </p>
//                             <p className="text-gray-400 text-xs">Image file</p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => removeMainImage()}
//                           className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors text-red-400 opacity-0 group-hover:opacity-100"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     onClick={addImage}
//                     className="w-full p-8 border-2 border-dashed border-white/30 rounded-2xl hover:border-[#7F6456] hover:bg-[#7F6456]/10 transition-all duration-300 text-center group"
//                   >
//                     <Upload
//                       className="mx-auto mb-4 text-gray-400 group-hover:text-[#7F6456]"
//                       size={32}
//                     />
//                     <p className="text-gray-400 group-hover:text-white">
//                       Click to upload project images
//                     </p>
//                     <p className="text-gray-500 text-sm mt-1">
//                       PNG, JPG, JPEG up to 10MB
//                     </p>
//                   </button>

//                   {/* Image List */}
//                   <div className="grid grid-cols-2 gap-4">
//                     {formData.project_gallery.map(({ image_url }, index) => (
//                       <div
//                         key={index}
//                         className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 group"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="w-12 h-12 bg-[#7F6456]/20 rounded-lg flex items-center justify-center">
//                             <Image className="text-[#7F6456]" size={20} />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-white text-sm font-medium truncate">
//                               {image_url.image_url}
//                             </p>
//                             <p className="text-gray-400 text-xs">Image file</p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => removeImage(image_url)}
//                           className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors text-red-400 opacity-0 group-hover:opacity-100"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === "testimonial" && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-white font-medium mb-2">
//                       Client Quote
//                     </label>
//                     <textarea
//                       name="quote"
//                       value={formData?.project_testimonials?.quote || ""}
//                       onChange={handleTestimonialChange}
//                       rows={4}
//                       className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent resize-none"
//                       placeholder="Enter client testimonial quote..."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Client Name
//                       </label>
//                       <input
//                         type="text"
//                         name="author"
//                         value={formData?.project_testimonials?.author || ""}
//                         onChange={handleTestimonialChange}
//                         className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                         placeholder="Client name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-white font-medium mb-2">
//                         Client Role
//                       </label>
//                       <input
//                         type="text"
//                         name="role"
//                         value={formData?.project_testimonials?.role || ""}
//                         onChange={handleTestimonialChange}
//                         className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
//                         placeholder="Client role/title"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="flex items-center justify-between p-6 border-t border-white/20">
//               <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
//                 Cancel
//               </button>
//               <div className="flex space-x-3">
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-colors">
//                   <Eye size={18} />
//                   <span>Preview</span>
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="flex items-center space-x-2 px-6 py-3 bg-[#7F6456] hover:bg-[#8D7164] rounded-xl text-white font-semibold transition-colors shadow-lg"
//                 >
//                   <Save size={18} />
//                   <span>Save Project</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, ChangeEvent } from "react";
import {
  X,
  Plus,
  Upload,
  // Image as ImageIc,
  Save,
  ArrowLeft,
  MapPin,
  Calendar,
  Layers,
  Target,
  ToggleLeft,
  ToggleRight,
  Palette,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Project } from "@/types/type";
import { supabase } from "@/lib/supabaseClient";
import { nanoid } from "nanoid";
import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface ExistingImage {
  path: string;
  image_url: string;
}

interface GalleryItem {
  image_url: File | ExistingImage;
}

interface ProjectData {
  id: string;
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
  showOnLanding: boolean;
  project_features: string[];
  project_materials: string[];
  project_gallery: GalleryItem[];
  main_image: File | ExistingImage | null;
  project_testimonials: Testimonial;
}

interface Props {
  open: () => void;
  data: Project;
}

interface ValidationErrors {
  title?: string;
  location?: string;
  category?: string;
  description?: string;
  year?: string;
}
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export default function UpdateProjectProjectConfiguration({
  open,
  data,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [formData, setFormData] = useState<ProjectData>({
    ...data,
  } as unknown as ProjectData);
  const [newFeature, setNewFeature] = useState<string>("");
  const [newMaterial, setNewMaterial] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [removeImages, setRemoveImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = [
    "Interior Design",
    "Architecture",
    "Renovation",
    "Commercial",
    "Residential",
  ];
  const statuses = ["Planning", "In Progress", "Completed", "On Hold"];

  const validate = (): boolean => {
    const errs: ValidationErrors = {};
    if (!formData.title.trim()) errs.title = "Project title is required.";
    if (!formData.location.trim()) errs.location = "Location is required.";
    if (!formData.category.trim()) errs.category = "Category is required.";
    if (!formData.description.trim())
      errs.description = "Description is required.";
    if (isNaN(formData.year) || formData.year < 2020 || formData.year > 2030)
      errs.year = "Year must be between 2020 and 2030.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        project_features: [...prev.project_features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setFormData((prev) => ({
        ...prev,
        project_materials: [...prev.project_materials, newMaterial.trim()],
      }));
      setNewMaterial("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      project_features: prev.project_features.filter((_, i) => i !== index),
    }));
  };

  const removeMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      project_materials: prev.project_materials.filter((_, i) => i !== index),
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

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;

      const files = Array.from(target.files || []);
      const { valid, invalidNames } = validateAndFilterFiles(files);

      if (invalidNames.length > 0) {
        invalidNames.forEach((name) =>
          toast.error(`"${name}" exceeds 10MB and was skipped.`)
        );
      }

      const images: GalleryItem[] = valid.map((file) => ({ image_url: file }));
      setFormData((prev) => ({
        ...prev,
        project_gallery: [...prev.project_gallery, ...images],
      }));
    };
    input.click();
  };

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

  const removeImage = (image: GalleryItem) => {
    setFormData((prev) => ({
      ...prev,
      project_gallery: prev.project_gallery.filter((item) => item !== image),
    }));
    if (!(image.image_url instanceof File))
      setRemoveImages([...removeImages, image.image_url.path]);
  };

  const removeMainImage = () => {
    setFormData((prev) => ({ ...prev, main_image: null }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTestimonialChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      project_testimonials: {
        ...prev.project_testimonials,
        [name]: value,
      },
    }));
  };

  const toggleLandingPage = () => {
    setFormData((prev) => ({
      ...prev,
      showOnLanding: !prev.showOnLanding,
    }));
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "details", label: "Details" },
    { id: "features", label: "Features" },
    { id: "images", label: "Images" },
    { id: "testimonial", label: "Testimonial" },
  ];
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
  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fix validation errors.");
      return;
    }
    setIsSubmitting(true);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("location", formData.location);
    form.append("category", formData.category);
    form.append("status", formData.status);
    form.append("duration", formData.duration);
    form.append("budget", formData.budget);
    form.append("area", formData.area);
    form.append("rooms", formData.rooms);
    form.append("year", formData.year.toString());
    form.append("description", formData.description);
    form.append("showOnLanding", formData.showOnLanding.toString());
    form.append("testimonial_quote", formData.project_testimonials.quote);
    form.append("testimonial_author", formData.project_testimonials.author);
    form.append("testimonial_role", formData.project_testimonials.role);
    form.append("id", formData.id);

    formData.project_features.forEach((item) => {
      form.append("project_features[]", item);
    });
    removeImages.forEach((item) => {
      form.append("remove_images[]", item);
    });
    formData.project_materials.forEach((item) => {
      form.append("project_materials[]", item);
    });

    const gallery_images = [];
    for (const item of formData.project_gallery) {
      if (item.image_url instanceof File) {
        const data = await uploadImage(formData.title, item.image_url);
        gallery_images.push(data);
      } else {
        gallery_images.push(item.image_url);
        // form.append("existing_gallery_paths[]", item.image_url.path);
      }
    }
    form.append("new_gallery_images", JSON.stringify(gallery_images));
    // formData.project_gallery.forEach((item) => {
    // });
    if (formData.main_image instanceof File) {
      form.append("old_cover_image_path", data.main_image.path);
      const dataRes = await uploadImage(formData.title, formData.main_image);
      form.append("main_image", JSON.stringify(dataRes));
    } else if (formData.main_image && "path" in formData.main_image) {
      form.append("main_image", JSON.stringify(formData.main_image));
    }
    const response = fetch("/api/projects/updateProject", {
      method: "POST",
      body: form,
    });

    toast.promise(response, {
      loading: "Updating project...",
      success: () => {
        open();
        return `Project updated successfully`;
      },
      error: () => {
        setIsSubmitting(false);
        return "Error updating project";
      },
    });
  };

  return (
    <div className="px-5">
      <div className="p-5">
        <button
          onClick={() => open()}
          className="group flex gap-2.5 w-44 relative px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#7F6456]/20"
        >
          <ArrowLeft />
          <p>Go Back</p>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex-col flex items-center justify-center"
      >
        <div className="w-full backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
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
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      required
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

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
                        required
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                      required
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

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

            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                    )}
                  </div>

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
                    required
                  />
                  <div className="flex items-center justify-end text-sm text-gray-400 mt-2">
                    <span>{formData.description.length} characters</span>
                  </div>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-6">
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

                <div className="space-y-3">
                  <AnimatePresence>
                    {formData.project_features.map((feature, index) => (
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
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

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

                <div className="space-y-3">
                  <AnimatePresence>
                    {formData.project_materials.map((material, index) => (
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
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  {formData.main_image && (
                    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 group">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 relative h-12 bg-[#7F6456]/20 rounded-lg flex items-center justify-center">
                          {/* <ImageIc className="text-[#7F6456]" size={20} /> */}

                          {formData.main_image instanceof File ? (
                            <Image
                              src={URL.createObjectURL(formData.main_image)}
                              fill
                              alt={formData.main_image?.name}
                            />
                          ) : (
                            <Image
                              src={formData.main_image?.image_url}
                              fill
                              alt={formData.main_image?.path}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {formData.main_image instanceof File
                              ? formData.main_image.name
                              : formData.main_image.path}
                          </p>
                          <p className="text-gray-400 text-xs">Image file</p>
                        </div>
                      </div>
                      <button
                        onClick={removeMainImage}
                        className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors text-red-400 opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

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

                <div className="grid grid-cols-2 gap-4">
                  {formData.project_gallery.map((item, index) => (
                    <div
                      key={index + "images"}
                      className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 relative h-12 bg-[#7F6456]/20 rounded-lg flex items-center justify-center">
                          {/* <ImageIc className="text-[#7F6456]" size={20} /> */}

                          {item.image_url instanceof File ? (
                            <Image
                              src={URL.createObjectURL(item.image_url)}
                              fill
                              className="object-cover"
                              alt={item.image_url.name}
                            />
                          ) : (
                            <Image
                              src={item?.image_url?.image_url}
                              fill
                              className="object-cover"
                              alt={item?.image_url?.path}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {item.image_url instanceof File
                              ? item.image_url.name
                              : item.image_url.path}
                          </p>
                          <p className="text-gray-400 text-xs">Image file</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeImage(item)}
                        className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors text-red-400 opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "testimonial" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Client Quote
                  </label>
                  <textarea
                    name="quote"
                    value={formData.project_testimonials.quote}
                    onChange={handleTestimonialChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent resize-none"
                    placeholder="Enter client testimonial quote..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.project_testimonials.author}
                      onChange={handleTestimonialChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                      placeholder="Client name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Client Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.project_testimonials.role}
                      onChange={handleTestimonialChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:border-transparent"
                      placeholder="Client role/title"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

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
      </motion.div>
    </div>
  );
}

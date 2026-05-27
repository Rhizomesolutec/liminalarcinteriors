
"use client";
import { toast } from "sonner";
import React, { JSX, useEffect, useState } from "react";
import {
  Star,
  User,
  MessageSquare,
  Camera,
  X,
  Send,
  CheckCircle,
  AlertCircle,
  Home,
  Wrench,
  Copy,
  AlertTriangle,
} from "lucide-react";
import { nanoid } from "nanoid";
import ReviewRatingUI from "@/components/admin/testimonial";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { AnimatePresence, motion } from "motion/react";

// Type definitions
interface Service {
  id: string;
  service_name: string;
}

interface ImageFile {
  file: File;
  preview: string;
  name: string;
}

interface FormData {
  name: string;
  email: string;
  rating: number;
  title: string;
  review: string;
  dynamic_link: string;
  images: ImageFile[];
  projectPhase: string;
  company: string;
  serviceDate?: string;
  responseTime?: number;
  professionalism?: number;
  projectDuration?: string;
}

interface ItemData {
  title?: string;
  [key: string]: unknown;
}

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  review: string;
  company: string;
  service_id: number;
  dynamic_link?: string;
  is_readed: boolean;
  is_dynamic: boolean;
  showOnLanding: boolean;
  image?: string;
  created_at: string;
  [key: string]: unknown;
}

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "project" | "service";
  itemData?: ItemData | null;
  fetchData: () => Promise<void>;
}



// const ReviewForm: React.FC<ReviewFormProps> = ({
//   isOpen,
//   onClose,
//   type = "project",
//   itemData = null,
//   fetchData,
// }) => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [isDynamicLinkEnabled, setIsDynamicLinkEnabled] =
//     useState<boolean>(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     rating: 0,
//     title: "",
//     review: "",
//     dynamic_link: "",
//     images: [],
//     projectPhase: "",
//     company: "",
//   });

//   const [hoveredRating, setHoveredRating] = useState<number>(0);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

//   const handlecopy = (): void => {
//     navigator.clipboard
//       .writeText(`https://www.liminalarcinteriors.com/testimonial/${formData.dynamic_link}`)
//       .then(() => {
//         toast.success(
//           `Copied to clipboard: https://www.liminalarcinteriors.com/testimonial/${formData.dynamic_link}`
//         );
//       })
//       .catch((err) => {
//         console.error("Failed to copy!", err);
//       });
//   };

//   const handleInputChange = (
//     field: keyof FormData,
//     value: string | number | ImageFile[]
//   ): void => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleDinamicLink = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setIsDynamicLinkEnabled(e.target.checked);
//     if (e.target.checked) {
//       const id = nanoid(10);
//       setFormData((prev) => ({ ...prev, dynamic_link: id }));
//     } else {
//       setFormData((prev) => ({ ...prev, dynamic_link: "" }));
//     }
//     console.log("clicked", e);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const files = Array.from(e.target.files || []);
//     if (files.length + formData.images.length > 1) {
//       alert("Maximum 1 images allowed");
//       return;
//     }

//     const newImages: ImageFile[] = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//       name: file.name,
//     }));

//     setFormData((prev) => ({
//       ...prev,
//       images: newImages,
//     }));
//   };

//   const removeImage = (index: number): void => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   useEffect(() => {
//     const getData = async (): Promise<void> => {
//       try {
//         const res = await fetch("/api/services/getServices?serviceId=true");
//         const { data }: { data: Service[] } = await res.json();
//         console.log("data", data);
//         setServices(data || []);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setServices([]);
//       }
//     };
//     getData();
//   }, []);

//   const resetForm = (): void => {
//     setFormData({
//       name: "",
//       email: "",
//       rating: 0,
//       title: "",
//       review: "",
//       dynamic_link: "",
//       images: [],
//       projectPhase: type === "project" ? "completed" : "",
//       company: "",
//       professionalism: type === "service" ? 5 : 0,
//     });
//     setSubmitStatus(null);
//   };
//   const uploadImage = async (name: string, file: File) => {
//     const path = `projects/${name}/${nanoid()}-${file.name}`;

//     const { error } = await supabase.storage
//       .from("static.images")
//       .upload(path, file, { contentType: file.type });

//     if (error) console.log(error);

//     const url = supabase.storage.from("static.images").getPublicUrl(path)
//       .data.publicUrl;
//     console.log(url);
//     return { image_url: url, path };
//   };
//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
//   ): Promise<void> => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const newForm = new FormData();
//       newForm.append("name", formData.name);
//       newForm.append("email", formData.email);

//       if (!isDynamicLinkEnabled) {
//         newForm.append("rating", formData.rating.toString());
//         newForm.append("review", formData.review);
//       } else {
//         newForm.append("isDynamicLinkEnabled", "true");
//       }

//       if (formData.images[0]?.file) {
//         const data = await uploadImage(
//           formData.projectPhase,
//           formData.images[0].file
//         );
//         newForm.append("image", JSON.stringify(data));
//       }

//       newForm.append("dynamic_link", formData.dynamic_link);
//       newForm.append("service_id", formData.projectPhase);
//       newForm.append("company", formData.company);

//       toast.promise(
//         fetch("/api/reviews/createReviews", {
//           method: "POST",
//           body: newForm,
//         }),
//         {
//           loading: "Loading...",
//           success: () => {
//             resetForm();
//             onClose();
//             fetchData();
//             return "New project successfully added";
//           },
//           error: "Error",
//         }
//       );
//     } catch (error) {
//       console.error("Submit error:", error);
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStarRating = (
//     currentRating: number,
//     onRate: (rating: number) => void,
//     size: string = "w-6 h-6"
//   ): JSX.Element => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => onRate(star)}
//             onMouseEnter={() => setHoveredRating(star)}
//             onMouseLeave={() => setHoveredRating(0)}
//             className="transition-colors"
//           >
//             <Star
//               className={`${size} transition-colors ${
//                 star <= (hoveredRating || currentRating)
//                   ? "fill-yellow-400 text-yellow-400"
//                   : "text-gray-400 hover:text-yellow-300"
//               }`}
//             />
//           </button>
//         ))}
//       </div>
//     );
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//       <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-auto">
//         <div className="p-6">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               {type === "project" ? (
//                 <Home className="w-8 h-8 text-blue-400" />
//               ) : (
//                 <Wrench className="w-8 h-8 text-green-400" />
//               )}
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   {type === "project" ? "Project Review" : "Service Review"}
//                 </h2>
//                 <p className="text-gray-300">
//                   {itemData?.title || `Share your ${type} experience`}
//                 </p>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={onClose}
//               className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-6">
//               {/* Personal Information */}
//               <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
//                 <h3 className="text-white font-medium mb-4 flex items-center gap-2">
//                   <User className="w-5 h-5 text-blue-400" />
//                   Your Information
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-gray-300 text-sm mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={(e) =>
//                         handleInputChange("name", e.target.value)
//                       }
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                       placeholder="Your full name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-300 text-sm mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={(e) =>
//                         handleInputChange("email", e.target.value)
//                       }
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                       placeholder="your.email@example.com"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-300 text-sm mb-2">
//                       Company/Organization *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.company}
//                       onChange={(e) =>
//                         handleInputChange("company", e.target.value)
//                       }
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                       placeholder="company"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Overall Rating */}
//               <div
//                 className={`${
//                   !isDynamicLinkEnabled
//                     ? "opacity-100"
//                     : "opacity-75 cursor-not-allowed "
//                 } backdrop-blur-sm bg-white/5 rounded-lg p-4`}
//               >
//                 <h3 className="text-white font-medium mb-4">
//                   Overall Rating *
//                 </h3>
//                 <div className="flex items-center gap-4">
//                   {renderStarRating(
//                     formData.rating,
//                     (rating) => handleInputChange("rating", rating),
//                     "w-8 h-8"
//                   )}
//                   <span className="text-gray-300">
//                     {formData.rating > 0 && `${formData.rating}/5`}
//                   </span>
//                 </div>
//               </div>

//               {/* Type-specific fields */}
//               {type === "project" ? (
//                 <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
//                   <h3 className="text-white font-medium mb-4 flex items-center gap-2">
//                     <Home className="w-5 h-5 text-purple-400" />
//                     Service Details
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <select
//                         value={formData.projectPhase}
//                         onChange={(e) =>
//                           handleInputChange("projectPhase", e.target.value)
//                         }
//                         className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                       >
//                         <option className="text-black" value="">
//                           Select option
//                         </option>
//                         {services?.map((data) => (
//                           <option
//                             key={data.service_name + "option"}
//                             className="text-black"
//                             value={data.id}
//                           >
//                             {data.service_name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
//                   <h3 className="text-white font-medium mb-4 flex items-center gap-2">
//                     <Wrench className="w-5 h-5 text-green-400" />
//                     Service Details
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-gray-300 text-sm mb-2">
//                         Service Date
//                       </label>
//                       <input
//                         type="date"
//                         value={formData.serviceDate || ""}
//                         onChange={(e) =>
//                           handleInputChange("serviceDate", e.target.value)
//                         }
//                         className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-300 text-sm mb-2">
//                         Response Time Rating
//                       </label>
//                       {renderStarRating(formData.responseTime || 0, (rating) =>
//                         handleInputChange("responseTime", rating)
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-gray-300 text-sm mb-2">
//                         Professionalism Rating
//                       </label>
//                       {renderStarRating(
//                         formData.professionalism || 0,
//                         (rating) => handleInputChange("professionalism", rating)
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right Column */}
//             <div className="space-y-6">
//               {/* Recommendation */}
//               <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-2 cursor-pointer text-white">
//                     <input
//                       type="checkbox"
//                       name="dynamic_link"
//                       checked={isDynamicLinkEnabled}
//                       onChange={handleDinamicLink}
//                       className="text-green-400 focus:ring-green-500"
//                     />
//                     <span>Auto-gen review link</span>
//                   </label>
//                 </div>
//                 {!!formData.dynamic_link.length && (
//                   <div className="flex gap-4 text-md ">
//                     <Copy
//                       className="text-white/40 hover:text-white/20 transition-colors cursor-pointer"
//                       onClick={handlecopy}
//                     />
//                     <p className="text-blue-500 ">
//                       https://www.liminalarcinteriors.com/testimonial/
//                       {formData.dynamic_link}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Review Content */}
//               <div
//                 className={`${
//                   !isDynamicLinkEnabled
//                     ? "opacity-100"
//                     : "opacity-75 cursor-not-allowed "
//                 } backdrop-blur-sm bg-white/5 rounded-lg p-4`}
//               >
//                 <h3 className="text-white font-medium mb-4 flex items-center gap-2">
//                   <MessageSquare className="w-5 h-5 text-yellow-400" />
//                   Your Review
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-gray-300 text-sm mb-2">
//                       Detailed Review *
//                     </label>
//                     <textarea
//                       disabled={isDynamicLinkEnabled}
//                       required
//                       rows={6}
//                       value={formData.review}
//                       onChange={(e) =>
//                         handleInputChange("review", e.target.value)
//                       }
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
//                       placeholder={`Tell us about your ${type} experience. What did you like? What could be improved?`}
//                     />
//                   </div>
//                   <p className="text-red-600">
//                     {isDynamicLinkEnabled ? "Disabled" : ""}
//                   </p>
//                 </div>
//               </div>

//               {/* Image Upload */}
//               <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
//                 <h3 className="text-white font-medium mb-4 flex items-center gap-2">
//                   <Camera className="w-5 h-5 text-purple-400" />
//                   Photos 
//                 </h3>
//                 <div className="space-y-4">
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                     id="image-upload"
//                   />
//                   <label
//                     htmlFor="image-upload"
//                     className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors"
//                   >
//                     <Camera className="w-5 h-5 text-gray-400" />
//                     <span className="text-gray-400">Upload images 1</span>
//                   </label>

//                   {formData.images.length > 0 && (
//                     <div className="grid grid-cols-3 gap-2">
//                       {formData.images.map((image, index) => (
//                         <div key={index} className="relative group">
//                           <div className="relative w-full h-20">
//                             <Image
//                               fill
//                               src={image.preview}
//                               alt={`Upload ${index + 1}`}
//                               className="object-cover rounded-lg"
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                           >
//                             <X className="w-3 h-3 text-white" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Section */}
//           <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/20">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isSubmitting || formData.rating === 0}
//               className="px-6 py-2 bg-[#7F6456]/20 backdrop-blur-xl border border-[#7F6456]/30 rounded-lg text-amber-100 font-semibold hover:bg-[#7F6456]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-100/30 border-t-amber-100"></div>
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-4 h-4" />
//                   Submit Review
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Status Messages */}
//           {submitStatus === "success" && (
//             <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400">
//               <CheckCircle className="w-5 h-5" />
//               Review submitted successfully! Thank you for your feedback.
//             </div>
//           )}

//           {submitStatus === "error" && (
//             <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
//               <AlertCircle className="w-5 h-5" />
//               Failed to submit review. Please try again.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };



// Types
interface FormData {
  name: string;
  email: string;
  rating: number;
  title: string;
  review: string;
  dynamic_link: string;
  images: ImageFile[];
  projectPhase: string;
  company: string;
  serviceDate?: string;
  responseTime?: number;
  professionalism?: number;
}

interface ImageFile {
  file: File;
  preview: string;
  name: string;
}

interface Service {
  id: string;
  service_name: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// interface ReviewFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   type?: "project" | "service";
//   itemData?: any;
//   fetchData: () => void;
// }

type SubmitStatus = "success" | "error" | null;

const ReviewForm: React.FC<ReviewFormProps> = ({
  isOpen,
  onClose,
  type = "project",
  itemData = null,
  fetchData,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isDynamicLinkEnabled, setIsDynamicLinkEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    rating: 0,
    title: "",
    review: "",
    dynamic_link: "",
    images: [],
    projectPhase: "",
    company: "",
  });

  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Animation variants
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: -50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: -50,
      transition: {
        duration: 0.2
      }
    }
  } as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  } as const;

  const errorVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  } as const;

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      
      case 'company':
        if (!value.trim()) return 'Company is required';
        if (value.trim().length < 2) return 'Company name must be at least 2 characters';
        if (value.trim().length > 100) return 'Company name must be less than 100 characters';
        return '';
      
      case 'rating':
        if (!isDynamicLinkEnabled && (value as unknown as number) === 0) return 'Rating is required';
        if ((value as unknown as number) < 1 || (value as unknown as number) > 5) return 'Rating must be between 1 and 5';
        return '';
      
      case 'review':
        if (!isDynamicLinkEnabled && !value.trim()) return 'Review is required';
        if (!isDynamicLinkEnabled && value.trim().length < 10) return 'Review must be at least 10 characters';
        if (value.trim().length > 1000) return 'Review must be less than 1000 characters';
        return '';
      
      case 'projectPhase':
        if (type === 'project' && !value) return 'Please select a service';
        return '';
      
      case 'serviceDate':
        if (type === 'service' && value && new Date(value) > new Date()) {
          return 'Service date cannot be in the future';
        }
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    const requiredFields = ['name', 'email', 'company'];
    
    if (!isDynamicLinkEnabled) {
      requiredFields.push('rating', 'review');
    }
    
    if (type === 'project') {
      requiredFields.push('projectPhase');
    }

    requiredFields.forEach(field => {
      const error = validateField(field, String(formData[field as keyof FormData] ?? ""));
      if (error) errors[field] = error;
    });

    // Validate images
    if (formData.images.length > 1) {
      errors.images = 'Maximum 1 image allowed';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
    const error = validateField(field, String(formData[field as keyof FormData] ?? ""));
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handlecopy = (): void => {
    navigator.clipboard
      .writeText(`https://www.liminalarcinteriors.com/testimonial/${formData.dynamic_link}`)
      .then(() => {
        toast.success(
          `Copied to clipboard: https://www.liminalarcinteriors.com/testimonial/${formData.dynamic_link}`
        );
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | number | ImageFile[]
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDinamicLink = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsDynamicLinkEnabled(e.target.checked);
    if (e.target.checked) {
      const id = nanoid(10);
      setFormData((prev) => ({ ...prev, dynamic_link: id }));
      // Clear validation errors for rating and review when dynamic link is enabled
      setValidationErrors(prev => ({
        ...prev,
        rating: '',
        review: ''
      }));
    } else {
      setFormData((prev) => ({ ...prev, dynamic_link: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + formData.images.length > 1) {
      setValidationErrors(prev => ({
        ...prev,
        images: 'Maximum 1 image allowed'
      }));
      return;
    }

    // Clear image validation error
    setValidationErrors(prev => ({
      ...prev,
      images: ''
    }));

    const newImages: ImageFile[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const removeImage = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const res = await fetch("/api/services/getServices?serviceId=true");
        const { data }: { data: Service[] } = await res.json();
        setServices(data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      }
    };
    getData();
  }, []);

  const resetForm = (): void => {
    setFormData({
      name: "",
      email: "",
      rating: 0,
      title: "",
      review: "",
      dynamic_link: "",
      images: [],
      projectPhase: type === "project" ? "" : "",
      company: "",
      professionalism: type === "service" ? 5 : 0,
    });
    setSubmitStatus(null);
    setValidationErrors({});
    setTouchedFields(new Set());
  };

  const uploadImage = async (name: string, file: File) => {
    const path = `projects/${name}/${nanoid()}-${file.name}`;

    const { error } = await supabase.storage
      .from("static.images")
      .upload(path, file, { contentType: file.type });

    if (error) console.log(error);

    const url = supabase.storage.from("static.images").getPublicUrl(path)
      .data.publicUrl;
    return { image_url: url, path };
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const newForm = new FormData();
      newForm.append("name", formData.name);
      newForm.append("email", formData.email);

      if (!isDynamicLinkEnabled) {
        newForm.append("rating", formData.rating.toString());
        newForm.append("review", formData.review);
      } else {
        newForm.append("isDynamicLinkEnabled", "true");
      }

      if (formData.images[0]?.file) {
        const data = await uploadImage(
          formData.projectPhase,
          formData.images[0].file
        );
        newForm.append("image", JSON.stringify(data));
      }

      newForm.append("dynamic_link", formData.dynamic_link);
      newForm.append("service_id", formData.projectPhase);
      newForm.append("company", formData.company);

      toast.promise(
        fetch("/api/reviews/createReviews", {
          method: "POST",
          body: newForm,
        }),
        {
          loading: "Submitting review...",
          success: () => {
            resetForm();
            onClose();
            fetchData();
            return "Review successfully submitted!";
          },
          error: "Failed to submit review. Please try again.",
        }
      );
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
      toast.error("An error occurred while submitting the review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = (
    currentRating: number,
    onRate: (rating: number) => void,
    size: string = "w-6 h-6"
  ): JSX.Element => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={isDynamicLinkEnabled}
          >
            <Star
              className={`${size} transition-colors ${
                star <= (hoveredRating || currentRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400 hover:text-yellow-300"
              }`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  const renderFieldError = (field: string) => {
    const error = validationErrors[field];
    const isFieldTouched = touchedFields.has(field);
    
    if (!error || !isFieldTouched) return null;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          variants={errorVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex items-center gap-2 mt-1 text-red-400 text-sm"
        >
          <AlertTriangle className="w-4 h-4" />
          {error}
        </motion.div>
      </AnimatePresence>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {type === "project" ? (
                    <Home className="w-8 h-8 text-blue-400" />
                  ) : (
                    <Wrench className="w-8 h-8 text-green-400" />
                  )}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {type === "project" ? "Project Review" : "Service Review"}
                  </h2>
                  <p className="text-gray-300">
                    {itemData?.title || `Share your ${type} experience`}
                  </p>
                </div>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Left Column */}
              <div className="space-y-6">
                {/* Personal Information */}
                <motion.div
                  variants={itemVariants}
                  className="backdrop-blur-sm bg-white/5 rounded-lg p-4"
                >
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Your Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        onBlur={() => handleFieldBlur("name")}
                        className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.name && touchedFields.has("name")
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-white/20 focus:ring-blue-500/50"
                        }`}
                        placeholder="Your full name"
                      />
                      {renderFieldError("name")}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onBlur={() => handleFieldBlur("email")}
                        className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.email && touchedFields.has("email")
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-white/20 focus:ring-blue-500/50"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {renderFieldError("email")}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        Company/Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        onBlur={() => handleFieldBlur("company")}
                        className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.company && touchedFields.has("company")
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-white/20 focus:ring-blue-500/50"
                        }`}
                        placeholder="Company name"
                      />
                      {renderFieldError("company")}
                    </div>
                  </div>
                </motion.div>

                {/* Overall Rating */}
                <motion.div
                  variants={itemVariants}
                  className={`${
                    !isDynamicLinkEnabled
                      ? "opacity-100"
                      : "opacity-75 cursor-not-allowed"
                  } backdrop-blur-sm bg-white/5 rounded-lg p-4`}
                >
                  <h3 className="text-white font-medium mb-4">
                    Overall Rating {!isDynamicLinkEnabled && "*"}
                  </h3>
                  <div className="flex items-center gap-4">
                    {renderStarRating(
                      formData.rating,
                      (rating) => {
                        handleInputChange("rating", rating);
                        handleFieldBlur("rating");
                      },
                      "w-8 h-8"
                    )}
                    <span className="text-gray-300">
                      {formData.rating > 0 && `${formData.rating}/5`}
                    </span>
                  </div>
                  {renderFieldError("rating")}
                </motion.div>

                {/* Type-specific fields */}
                <motion.div
                  variants={itemVariants}
                  className="backdrop-blur-sm bg-white/5 rounded-lg p-4"
                >
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    {type === "project" ? (
                      <Home className="w-5 h-5 text-purple-400" />
                    ) : (
                      <Wrench className="w-5 h-5 text-green-400" />
                    )}
                    Service Details
                  </h3>
                  <div className="space-y-4">
                    {type === "project" ? (
                      <div>
                        <select
                          value={formData.projectPhase}
                          onChange={(e) => {
                            handleInputChange("projectPhase", e.target.value);
                            handleFieldBlur("projectPhase");
                          }}
                          className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                            validationErrors.projectPhase && touchedFields.has("projectPhase")
                              ? "border-red-500 focus:ring-red-500/50"
                              : "border-white/20 focus:ring-blue-500/50"
                          }`}
                        >
                          <option className="text-black" value="">
                            Select service *
                          </option>
                          {services?.map((data) => (
                            <option
                              key={data.service_name + "option"}
                              className="text-black"
                              value={data.id}
                            >
                              {data.service_name}
                            </option>
                          ))}
                        </select>
                        {renderFieldError("projectPhase")}
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">
                            Service Date
                          </label>
                          <input
                            type="date"
                            value={formData.serviceDate || ""}
                            onChange={(e) => {
                              handleInputChange("serviceDate", e.target.value);
                              handleFieldBlur("serviceDate");
                            }}
                            className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                              validationErrors.serviceDate && touchedFields.has("serviceDate")
                                ? "border-red-500 focus:ring-red-500/50"
                                : "border-white/20 focus:ring-blue-500/50"
                            }`}
                          />
                          {renderFieldError("serviceDate")}
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">
                            Response Time Rating
                          </label>
                          {renderStarRating(formData.responseTime || 0, (rating) =>
                            handleInputChange("responseTime", rating)
                          )}
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">
                            Professionalism Rating
                          </label>
                          {renderStarRating(
                            formData.professionalism || 0,
                            (rating) => handleInputChange("professionalism", rating)
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Dynamic Link */}
                <motion.div
                  variants={itemVariants}
                  className="backdrop-blur-sm bg-white/5 rounded-lg p-4"
                >
                  <div className="flex gap-4">
                    <motion.label
                      className="flex items-center gap-2 cursor-pointer text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        name="dynamic_link"
                        checked={isDynamicLinkEnabled}
                        onChange={handleDinamicLink}
                        className="text-green-400 focus:ring-green-500"
                      />
                      <span>Auto-generate review link</span>
                    </motion.label>
                  </div>
                  <AnimatePresence>
                    {!!formData.dynamic_link.length && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 text-md mt-2"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Copy
                            className="text-white/40 hover:text-white/20 transition-colors cursor-pointer"
                            onClick={handlecopy}
                          />
                        </motion.div>
                        <p className="text-blue-500 break-all">
                          https://www.liminalarcinteriors.com/testimonial/{formData.dynamic_link}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Review Content */}
                <motion.div
                  variants={itemVariants}
                  className={`${
                    !isDynamicLinkEnabled
                      ? "opacity-100"
                      : "opacity-75 cursor-not-allowed"
                  } backdrop-blur-sm bg-white/5 rounded-lg p-4`}
                >
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-yellow-400" />
                    Your Review {!isDynamicLinkEnabled && "*"}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        Detailed Review {!isDynamicLinkEnabled && "*"}
                      </label>
                      <textarea
                        disabled={isDynamicLinkEnabled}
                        required={!isDynamicLinkEnabled}
                        rows={6}
                        value={formData.review}
                        onChange={(e) => handleInputChange("review", e.target.value)}
                        onBlur={() => handleFieldBlur("review")}
                        className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 resize-none transition-all ${
                          validationErrors.review && touchedFields.has("review")
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-white/20 focus:ring-blue-500/50"
                        }`}
                        placeholder={`Tell us about your ${type} experience. What did you like? What could be improved?`}
                      />
                      {renderFieldError("review")}
                    </div>
                    {isDynamicLinkEnabled && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-amber-400 text-sm"
                      >
                        Review field disabled - customer will provide review via generated link
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {/* Image Upload */}
                <motion.div
                  variants={itemVariants}
                  className="backdrop-blur-sm bg-white/5 rounded-lg p-4"
                >
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-purple-400" />
                    Photos (Optional)
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <motion.label
                      htmlFor="image-upload"
                      className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                        validationErrors.images
                          ? "border-red-500 hover:border-red-400"
                          : "border-white/20 hover:border-white/40"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Camera className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-400">Upload image (max 1)</span>
                    </motion.label>
                    {renderFieldError("images")}

                    <AnimatePresence>
                      {formData.images.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-3 gap-2"
                        >
                          {formData.images.map((image, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="relative group"
                            >
                              <div className="relative w-full h-20">
                                <Image
                                  fill
                                  src={image.preview}
                                  alt={`Upload ${index + 1}`}
                                  className="object-cover rounded-lg"
                                />
                              </div>
                              <motion.button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="w-3 h-3 text-white" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Submit Section */}
            <motion.div
              variants={itemVariants}
              className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/20"
            >
              <motion.button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#7F6456]/20 backdrop-blur-xl border border-[#7F6456]/30 rounded-lg text-amber-100 font-semibold hover:bg-[#7F6456]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-amber-100/30 border-t-amber-100 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.div>
                  Review submitted successfully! Thank you for your feedback.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                  >
                    <AlertCircle className="w-5 h-5" />
                  </motion.div>
                  Failed to submit review. Please try again.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Validation Summary */}
            <AnimatePresence>
              {Object.keys(validationErrors).filter(key => validationErrors[key]).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">Please fix the following issues:</span>
                  </div>
                  <ul className="text-sm text-red-300 space-y-1">
                    {Object.entries(validationErrors)
                      .filter(([, error]) => error)
                      .map(([field, error]) => (
                        <motion.li
                          key={field}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1 h-1 bg-red-400 rounded-full" />
                          {error}
                        </motion.li>
                      ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// export default ReviewForm;

// Demo component to show usage
const ReviewFormDemo: React.FC = () => {
  const [showProjectReview, setShowProjectReview] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch("/api/reviews/getReviews");
      const data: Review[] = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen p-6">
        <div className="mx-auto">
          <div className="flex justify-end">
            <button
              onClick={() => setShowProjectReview(true)}
              className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 font-semibold transition-all duration-300 flex items-center gap-2 justify-center"
            >
              Add review
            </button>
          </div>

          <ReviewForm
            isOpen={showProjectReview}
            onClose={() => setShowProjectReview(false)}
            type="project"
            fetchData={fetchData}
          />

          <ReviewRatingUI reviews={reviews} fetchData={fetchData}  />
        </div>
      </div>
    </>
  );
};

export default ReviewFormDemo;

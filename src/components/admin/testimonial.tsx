// import React, { useState } from "react";
// import { Star, Eye, Trash2, Filter, Search, Image, Copy } from "lucide-react";
// import ReviewModal from "./reviewModal";
// import { toast } from "sonner";
// import { AlertDialog } from "./alertDialog";

// const AdminReviews = ({ reviews = [], fetchData }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRating, setFilterRating] = useState("all");
//   const [filterService, setFilterService] = useState("all");
//   const [openDialog, setOpenDialog] = useState<string | false>(false);
//   const [selectedReview, setSelectedReview] = useState(null);
//   // const [editData, setEditData] = useState({});
//   // const [newImages, setNewImages] = useState([]);

//   const openModal = (review) => {
//     setSelectedReview(review);
//     // setEditData(review);
//     // setNewImages([]);
//     // setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedReview(null);
//     // setEditData({});
//     // setNewImages([]);
//   };

//   // const handleImageUpload = (event) => {
//   //   const files = Array.from(event.target.files);
//   //   const imageUrls = files.map((file) => URL.createObjectURL(file));
//   //   setNewImages((prev) => [...prev, ...imageUrls]);
//   // };

//   // const removeImage = (index, isExisting = false) => {
//   //   if (isExisting) {
//   //     setEditData((prev) => ({
//   //       ...prev,
//   //       images: prev.images?.filter((_, i) => i !== index) || [],
//   //     }));
//   //   } else {
//   //     setNewImages((prev) => prev.filter((_, i) => i !== index));
//   // //   }
//   // // };

//   // const handleSave = () => {
//   //   // Here you would implement the actual save logic
//   //   console.log("Saving review:", editData);
//   //   console.log("New images:", newImages);
//   //   closeModal();
//   // };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         size={16}
//         className={`${
//           i < rating ? "text-yellow-400 fill-current" : "text-gray-600"
//         }`}
//       />
//     ));
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const filteredReviews = reviews.filter((review) => {
//     const matchesSearch =
//       review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.company?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRating =
//       filterRating === "all" || review.rating.toString() === filterRating;
//     const matchesService =
//       filterService === "all" || review.service_id.toString() === filterService;

//     return matchesSearch && matchesRating && matchesService;
//   });

//   console.log("datsssssss", reviews);
//   const deleteReviews = (id:number) => {
//     const response = fetch(`/api/reviews/deleteReviews?reviewsId=${id}`);
//     toast.promise(response, {
//       loading: "Deleting reviews...",
//       success: () => {
//         fetchData();
//         return `reviews deleted successfully.`;
//       },
//       error: "Error deleting reviews.",
//     });
//   };

//   const handlecopy = (link) => {
//     navigator.clipboard
//       .writeText(`https://www.liminalarcinteriors.com/testimonial/${link}`)
//       .then(() => {
//         toast.success(
//           `Copied to clipboard: https://www.liminalarcinteriors.com/testimonial/${link}`
//         );
//       })
//       .catch((err) => {
//         console.error("Failed to copy!", err);
//       });
//   };
//   return (
//     <>
//       <AlertDialog
//         callBack={() => deleteReviews(openDialog)}
//         open={openDialog}
//         setOpen={setOpenDialog}
//         text={`This action cannot be undone. This will permanently delete your
//             account and remove your data from our servers.`}
//       />
//       <div className="  p-6">
//         {selectedReview && (
//           <ReviewModal
//             onClose={() => setSelectedReview(null)}
//             review={selectedReview}
//             onSave={(updatedData) => {
//               // Handle save logic here
//               console.log("Updated data:", updatedData);
//               // API call to update review
//             }}
//           />
//         )}
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2">
//               Reviews Management
//             </h1>
//             <p className="text-gray-400">Manage and monitor customer reviews</p>
//           </div>

//           {/* Filters and Search */}
//           <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700/50">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {/* Search */}
//               <div className="relative">
//                 <Search
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search reviews..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Rating Filter */}
//               <div className="relative">
//                 <Filter
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <select
//                   value={filterRating}
//                   onChange={(e) => setFilterRating(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
//                 >
//                   <option value="all">All Ratings</option>
//                   <option value="5">5 Stars</option>
//                   <option value="4">4 Stars</option>
//                   <option value="3">3 Stars</option>
//                   <option value="2">2 Stars</option>
//                   <option value="1">1 Star</option>
//                 </select>
//               </div>

//               {/* Service Filter */}
//               <div>
//                 <select
//                   value={filterService}
//                   onChange={(e) => setFilterService(e.target.value)}
//                   className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
//                 >
//                   <option value="all">All Services</option>
//                   <option value="1">Service 1</option>
//                   <option value="2">Service 2</option>
//                   <option value="3">Service 3</option>
//                 </select>
//               </div>

//               {/* Results Count */}
//               <div className="flex items-center justify-end">
//                 <span className="text-gray-400">
//                   {filteredReviews.length} review
//                   {filteredReviews.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Reviews List */}
//           <div className="space-y-4">
//             {filteredReviews.map((review) => (
//               <div
//                 key={review.id}
//                 className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/60 transition-all duration-200"
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
//                   {/* Main Content */}
//                   <div className="flex-1">
//                     {!!!review.is_readed && (
//                       <div className="flex gap-2 items-center">
//                         <div className="size-2 bg-green-600 rounded-full"></div>
//                         <p className="font-extrabold">New</p>
//                       </div>
//                     )}
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <h3 className="text-lg font-semibold text-white mb-1">
//                           {review.name}
//                         </h3>
//                         <p className="text-gray-400 text-sm">{review.email}</p>
//                         {review.company && (
//                           <p className="text-blue-400 text-sm font-medium">
//                             {review.company}
//                           </p>
//                         )}
//                       </div>
//                       <div className="flex flex-col items-end gap-2">
//                         <div className="flex items-center gap-1">
//                           {renderStars(review.rating)}
//                           <span className="text-yellow-400 font-medium ml-1">
//                             {review.rating}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {review.is_dynamic && (
//                             <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-600/30">
//                               Dynamic
//                             </span>
//                           )}
//                           {review.is_dynamic &&
//                             (!review.rating || !review.review) && (
//                               <span className="px-2 py-1 bg-yellow-400 text-xs rounded-full border ">
//                                 Pending
//                               </span>
//                             )}
//                           {review.images && review.images.length > 0 && (
//                             <span className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full border border-purple-600/30">
//                               <Image size={12} />
//                               {review.images.length}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Review Text */}
//                     {review.review && (
//                       <div className="mb-4">
//                         <p className="text-gray-300 leading-relaxed">
//                           {review.review}
//                         </p>
//                       </div>
//                     )}

//                     {/* Meta Information */}
//                     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
//                       <span>Service ID: {review.services?.service_name}</span>
//                       <span>•</span>
//                       <span>{formatDate(review.created_at)}</span>
//                       {review.dynamic_link && (
//                         <>
//                           <span>•</span>

//                           <div className="flex gap-4 text-md ">
//                             <Copy
//                               className="text-white/40 hover:text-white/20  transition-colors cursor-pointer"
//                               onClick={() => handlecopy(review.dynamic_link)}
//                             />
//                             <p className="text-blue-500 ">
//                               https://www.liminalarcinteriors.com/testimonial/
//                               {review.dynamic_link}
//                             </p>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex lg:flex-col gap-2">
//                     <button
//                       onClick={() => openModal(review)}
//                       className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-600/30"
//                     >
//                       <Eye size={16} />
//                       View
//                     </button>
//                     <button
//                       onClick={() => setOpenDialog(review.id)}
//                       className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors border border-red-600/30"
//                     >
//                       <Trash2 size={16} />
//                       Delete
//                     </button>
//                     <div className="flex items-center space-x-3">
//                       <span className="text-white font-medium">
//                         Show on Landing Page
//                       </span>
//                       <button
//                         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:ring-offset-2 ${
//                           review.showOnLanding ? "bg-green-600" : "bg-[#e71e1e]"
//                         }`}
//                       >
//                         <span
//                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                             review.showOnLanding
//                               ? "translate-x-6"
//                               : "translate-x-1"
//                           }`}
//                         />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {filteredReviews.length === 0 && (
//             <div className="text-center py-12">
//               <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700/50">
//                 <Star className="mx-auto text-gray-500 mb-4" size={48} />
//                 <h3 className="text-xl font-semibold text-gray-400 mb-2">
//                   No reviews found
//                 </h3>
//                 <p className="text-gray-500">
//                   Try adjusting your search or filter criteria
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminReviews;

import React, { useState, ChangeEvent, FC } from "react";
import {
  Star,
  Eye,
  Trash2,
  Filter,
  Search,
  Copy,
} from "lucide-react";
import ReviewModal from "./reviewModal";
import { toast } from "sonner";
import { AlertDialog } from "./alertDialog";
import { Image } from "@/types/type";

// Define Review interface based on used fields
export interface ServiceInfo {
  service_name: string;
}

export interface Review {
  id: number;
  name: string;
  email: string;
  company?: string;
  rating: number;
  is_readed: boolean;
  is_dynamic: boolean;
  images?: Image;
  services?: ServiceInfo;
  service_id: number;
  created_at: string;
  dynamic_link?: string;
  showOnLanding: boolean;
  review?: string;
}

interface AdminReviewsProps {
  reviews?: Review[];
  fetchData: () => void;
}

const AdminReviews: FC<AdminReviewsProps> = ({ reviews = [], fetchData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterService, setFilterService] = useState<string>("all");
  const [openDialog, setOpenDialog] = useState<number | boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const openModal = (review: Review) => {
    setSelectedReview(review);
  };

  const closeModal = () => {
    setSelectedReview(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-600"
        }`}
      />
    ));
  };

  const handelShowOnLanding = async (id: number, showOnLanding: boolean) => {
    const response = fetch(
      `/api/reviews/updateReviews?showOnLanding=${showOnLanding}&id=${id}`
    );

    toast.promise(response, {
      loading: "updating reviews...",
      success: () => {
        fetchData();
        return `updated status.`;
      },
      error: "Error deleting reviews.",
    });
    // const data = await res.json();
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.company?.toLowerCase().includes(searchTerm.toLowerCase()!) ||
      false;
    const matchesRating =
      filterRating === "all" || review.rating.toString() === filterRating;
    const matchesService =
      filterService === "all" || review.service_id.toString() === filterService;

    return matchesSearch && matchesRating && matchesService;
  });

  const deleteReviews = (id: number) => {
    const response = fetch(`/api/reviews/deleteReviews?reviewsId=${id}`);
    toast.promise(response, {
      loading: "Deleting reviews...",
      success: () => {
        fetchData();
        return `Reviews deleted successfully.`;
      },
      error: "Error deleting reviews.",
    });
  };

  const handleCopy = (link: string) => {
    navigator.clipboard
      .writeText(`https://www.liminalarcinteriors.com/testimonial/${link}`)
      .then(() => {
        toast.success(
          `Copied to clipboard: https://www.liminalarcinteriors.com/testimonial/${link}`
        );
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };

  return (
    <>
      <AlertDialog
        callBack={() => deleteReviews(openDialog as number)}
        open={openDialog}
        setOpen={setOpenDialog}
        text={`This action cannot be undone. This will permanently delete your account and remove your data from our servers.`}
      />
      <div className="p-6">
        {selectedReview && (
          <ReviewModal onClose={closeModal} review={selectedReview} />
        )}
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Reviews Management
            </h1>
            <p className="text-gray-400">Manage and monitor customer reviews</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={filterRating}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFilterRating(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <select
                  value={filterService}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFilterService(e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Services</option>
                  <option value="1">Service 1</option>
                  <option value="2">Service 2</option>
                  <option value="3">Service 3</option>
                </select>
              </div>

              <div className="flex items-center justify-end">
                <span className="text-gray-400">
                  {filteredReviews.length} review
                  {filteredReviews.length !== 1 && "s"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/60 transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    {!review.is_readed && (
                      <div className="flex gap-2 items-center">
                        <div className="size-2 bg-green-600 rounded-full"></div>
                        <p className="font-extrabold">New</p>
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {review.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{review.email}</p>
                        {review.company && (
                          <p className="text-blue-400 text-sm font-medium">
                            {review.company}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-yellow-400 font-medium ml-1">
                            {review.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {review.is_dynamic && (
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-600/30">
                              Dynamic
                            </span>
                          )}
                          {review.is_dynamic &&
                            (!review.rating || !review.review) && (
                              <span className="px-2 py-1 bg-yellow-400 text-xs rounded-full border ">
                                Pending
                              </span>
                            )}
                         
                        </div>
                      </div>
                    </div>

                    {review.review && (
                      <div className="mb-4">
                        <p className="text-gray-300 leading-relaxed">
                          {review.review}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span>Service: {review.services?.service_name}</span>
                      <span>•</span>
                      <span>{formatDate(review.created_at)}</span>
                      {review.dynamic_link && (
                        <>
                          <span>•</span>
                          <div className="flex gap-4 text-md">
                            <Copy
                              className="text-white/40 hover:text-white/20 transition-colors cursor-pointer"
                              onClick={() => handleCopy(review.dynamic_link!)}
                            />
                            <p className="text-blue-500">
                              https://www.liminalarcinteriors.com/testimonial/
                              {review.dynamic_link}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => openModal(review)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-600/30"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button
                      onClick={() => setOpenDialog(review.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors border border-red-600/30"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                    {!!review.rating && review.review && (
                      <div className="flex items-center space-x-3">
                        <span className="text-white font-medium">
                          Show on Landing Page
                        </span>

                        <button
                          onClick={() =>
                            handelShowOnLanding(
                              review.id,
                              !review.showOnLanding
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F6456] focus:ring-offset-2 ${
                            review.showOnLanding
                              ? "bg-green-600"
                              : "bg-[#e71e1e]"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              review.showOnLanding
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700/50">
                <Star className="mx-auto text-gray-500 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReviews;

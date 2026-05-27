import React, { useState,  } from "react";
import { Star, X,  } from "lucide-react";
import Image from "next/image";
import { ServiceInfo } from "./testimonial";
import { Image as TypeImage } from "@/types/type";

interface Review {
  id: number;
  name: string;
  email: string;
  company?: string;
  rating: number;
  is_readed: boolean;
  is_dynamic: boolean;
  images?: TypeImage;
  services?: ServiceInfo;
  service_id: number;
  created_at: string;
  dynamic_link?: string;
  showOnLanding: boolean;
  review?: string;
}


interface ReviewModalProps {
  onClose: () => void;
  review: Review | null;
  
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  onClose,
  review,
}) => {
  const [editData, setEditData] = useState<Review>(review!);

  const handleClose = () => {
    

    onClose();
  };


  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Edit Review</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  disabled
                  type="text"
                  value={editData.name || ""}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  disabled
                  type="email"
                  value={editData.email || ""}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  disabled
                  type="text"
                  value={editData.company || ""}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service ID
                </label>
                <div className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {editData.services?.service_name || ""}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="transition-colors">
                    <Star
                      size={24}
                      className={`${
                        star <= (editData.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600 hover:text-yellow-300"
                      }`}
                    />
                  </div>
                ))}
                <span className="text-white ml-2">
                  {editData.rating || 0}/5
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Review
              </label>
              <textarea
                disabled
                rows={4}
                value={editData.review || ""}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter review text..."
              />
            </div>

            {/* Dynamic Link */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dynamic Link
              </label>

              <input
                type="url"
                value={editData.dynamic_link || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    dynamic_link: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>

            {/* Images Section */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Images
              </label>

              {/* Existing Images */}

              {/* New Images */}
              {!!editData.images && (
                <div className="relative mb-4 w-52 h-52">
                  <Image
                    fill
                    src={editData.images?.image_url || ""}
                    alt={editData.images?.image_url || "new"}
                    className="w-full h-24 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-700">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;

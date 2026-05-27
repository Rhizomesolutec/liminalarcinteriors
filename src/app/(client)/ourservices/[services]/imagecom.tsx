"use client";
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

import { Service } from "@/types/type";
import Image from "next/image";

// Mock data for demonstration

const ReviewGallery = ({ data }: { data: Service }) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleTap = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  console.log(data);
  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#7F6456] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&rsquo;t just take our word for it. Here&rsquo;s what our
            satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.reviews?.map((review, index) => (
            <div
              key={index + "testimonials"}
              className="relative h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => handleTap(index)}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={review.images?.image_url}
                  alt={review.images?.image_url}
                  fill
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Review Content Overlay */}
              <div
                className={`absolute inset-0 backdrop-blur-sm border-2   p-6 flex flex-col justify-center transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100"
                    : "opacity-0 lg:group-hover:opacity-100"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  {/* Avatar and Name */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mr-4">
                      <span className="text-white font-semibold text-lg">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          {review.name}
                        </p>
                        <p className="text-white/30 -mt-2.5">
                          {review.company}
                        </p>
                      </div>
                      <div className="  flex items-center mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-white/90 text-sm leading-relaxed italic">
                    &ldquo;{review.review}&rdquo;
                  </p>
                </div>
              </div>

              {/* Subtle Hover Indicator */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-12">
          <button className="bg-[#7F6456] hover:bg-[#6B5447] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Read More Reviews
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ReviewGallery;

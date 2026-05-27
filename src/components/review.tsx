"use client";
import { FC, useState } from "react";

export default function TestimonialForm({
  data,
}: {
  data: { name: string; email: string; id: number };
}) {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data.email || "",
    company: "",
    rating: 0,
    testimonial: "",
    projectType: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async () => {
    if ((data && !formData.testimonial) || formData.rating === 0) {
      return;
    } else if (
      formData.rating === 0 ||
      !formData.name ||
      !formData.email ||
      !formData.testimonial
    ) {
      return;
    }
    console.log("Testimonial submitted:", formData);
    let payload = {};

    if (data) {
      payload = {
        testimonial: formData.testimonial,
        rating: formData.rating,
        id: data.id,
      };
    } else {
      payload = formData;
    }
    const response = await fetch("/api/reviews/updateReviewsClint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      setIsSubmitted(true);
    }
  };

  interface StarIconProps {
    /** whether the star is filled (active) */
    filled: boolean;
    /** called when the mouse enters (hover) */
    onHover: () => void;
    /** called when the star is clicked */
    onClick: () => void;
  }

  const StarIcon: FC<StarIconProps> = ({ filled, onHover, onClick }) => (
    <svg
      className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
        filled ? "text-yellow-400" : "text-white/30"
      } hover:text-yellow-300 hover:scale-110`}
      fill="currentColor"
      viewBox="0 0 20 20"
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A]  flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden p-12 text-center max-w-lg">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-green-400 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-[#D4C4B0] to-[#7F6456] bg-clip-text text-transparent">
            Thank You!
          </h3>
          <p className="text-[#D4C4B0] text-lg">
            Your testimonial has been submitted successfully. We appreciate your
            feedback!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="mb-8 text-center">
              {/* User Welcome Section */}
              {(data.name || data.email) && (
                <div className="mb-3 p-4 ">
                  <p className="text-[#D4C4B0] text-2xl mb-1">
                    Hello,{" "}
                    <span className="text-white font-semibold">
                      {data.name || "Valued Client"}
                    </span>
                    !
                  </p>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-[#D4C4B0] to-[#7F6456] bg-clip-text text-transparent leading-tight">
                Share Your Experience
              </h1>
              <p className="text-[#D4C4B0] text-xl font-light">
                Help others by sharing your project experience with us.
              </p>
            </div>

            <div className="space-y-6">
              {/* Name */}
              {!data && (
                <>
                  <div className="group">
                    <label className="block text-[#D4C4B0] font-medium mb-2 transition-colors duration-300 group-focus-within:text-[#7F6456]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white/30 pb-3 text-white text-lg placeholder:text-white/50 focus:outline-none focus:border-[#7F6456] transition-colors duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {/* Email */}
                  <div className="group">
                    <label className="block text-[#D4C4B0] font-medium mb-2 transition-colors duration-300 group-focus-within:text-[#7F6456]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white/30 pb-3 text-white text-lg placeholder:text-white/50 focus:outline-none focus:border-[#7F6456] transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  {/* Company */}
                  <div className="group">
                    <label className="block text-[#D4C4B0] font-medium mb-2 transition-colors duration-300 group-focus-within:text-[#7F6456]">
                      Company/Organization (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b-2 border-white/30 pb-3 text-white text-lg placeholder:text-white/50 focus:outline-none focus:border-[#7F6456] transition-colors duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                </>
              )}

              {/* Project Type */}
              {/* <div className="group">
                <label className="block text-[#D4C4B0] font-medium mb-2 transition-colors duration-300 group-focus-within:text-[#7F6456]">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border-2 border-white/20 rounded-2xl p-4 text-white text-lg focus:outline-none focus:border-[#7F6456] focus:bg-white/10 transition-all duration-300"
                >
                  <option value="" className="bg-[#2C1810] text-white">Select project type</option>
                  <option value="residential" className="bg-[#2C1810] text-white">Residential Design</option>
                  <option value="commercial" className="bg-[#2C1810] text-white">Commercial Space</option>
                  <option value="renovation" className="bg-[#2C1810] text-white">Renovation</option>
                  <option value="consultation" className="bg-[#2C1810] text-white">Design Consultation</option>
                  <option value="other" className="bg-[#2C1810] text-white">Other</option>
                </select>
              </div> */}

              {/* Rating */}
              <div className="group">
                <label className="block text-[#D4C4B0] font-medium mb-4 transition-colors duration-300">
                  Overall Rating
                </label>
                <div
                  className="flex gap-2 mb-2"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      filled={star <= (hoverRating || formData.rating)}
                      onHover={() => setHoverRating(star)}
                      onClick={() => handleRatingClick(star)}
                    />
                  ))}
                </div>
                <p className="text-white/60 text-sm">
                  {formData.rating > 0 && (
                    <span>
                      {formData.rating === 1 && "Poor"}
                      {formData.rating === 2 && "Fair"}
                      {formData.rating === 3 && "Good"}
                      {formData.rating === 4 && "Very Good"}
                      {formData.rating === 5 && "Excellent"}
                    </span>
                  )}
                </p>
              </div>

              {/* Testimonial */}
              <div className="group">
                <label className="block text-[#D4C4B0] font-medium mb-2 transition-colors duration-300 group-focus-within:text-[#7F6456]">
                  Your Testimonial
                </label>
                <textarea
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-white/5 border-2 border-white/20 rounded-2xl p-4 text-white text-lg placeholder:text-white/50 focus:outline-none focus:border-[#7F6456] focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="Share your experience working with us. What did you like most about our service? How did we help bring your vision to life?"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    (!data &&
                      (formData.rating === 0 ||
                        !formData.name ||
                        !formData.email ||
                        !formData.testimonial)) ||
                    (data && (formData.rating === 0 || !formData.testimonial))
                  }
                  className="group flex-1 px-8 py-4 bg-gradient-to-r from-[#7F6456] to-[#A68B7A] text-white font-semibold text-lg rounded-full hover:from-[#6B5447] hover:to-[#7F6456] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#7F6456]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="flex items-center justify-center gap-2">
                    Submit Testimonial
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-white/60 text-sm">
                Your testimonial may be featured on our website and marketing
                materials. We respect your privacy and will only use the
                information you provide here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

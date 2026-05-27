"use client";
import React, { useState } from "react";
import { toast } from "sonner";

interface LiminalArcInquiryProps {
  phoneNumber?: string;
}

export default function LiminalArcInquiry({ phoneNumber }: LiminalArcInquiryProps) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    fullname?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayPhone = phoneNumber || "+971 52 483 1439";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9\s\+\-\(\)]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Inquiry sent successfully!");
        setFormData({ fullname: "", email: "", phone: "", message: "" });
      } else {
        const result = await response.json();
        toast.error(`Error: ${result.error || "Failed to send message"}`);
      }
    } catch (err) {
      toast.error("A network error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-[#1A1A1A]" id="contact">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Contact Info Columns */}
        <div>
          <h2 className="font-headline text-[10px] uppercase tracking-[0.5em] text-[#C4A05A] mb-6">Contact</h2>
          <h3 className="text-4xl md:text-5xl font-light font-headline tracking-tight mb-12 text-[#F5F0E8]">
            Ready to define <br />your space?
          </h3>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <span className="material-symbols-outlined text-[#C4A05A] text-2xl">call</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 text-gray-400">Call Us</p>
                <p className="text-lg font-light tracking-wide text-[#F5F0E8]">{displayPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="material-symbols-outlined text-[#C4A05A] text-2xl">mail</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 text-gray-400">Email</p>
                <p className="text-lg font-light tracking-wide text-[#F5F0E8]">info@liminalarcinteriors.com</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="material-symbols-outlined text-[#C4A05A] text-2xl">location_on</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 text-gray-400">Visit</p>
                <p className="text-lg font-light tracking-wide text-[#F5F0E8]">
                  Office 204, Dar Al Nahda Building, Hor Al Anz East, Dubai, UAE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400">Full Name</label>
              <input 
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:border-[#C4A05A] focus:outline-none transition-colors placeholder:text-white/10 text-[#F5F0E8]" 
                placeholder="John Doe"
              />
              {errors.fullname && <p className="text-red-400 text-xs">{errors.fullname}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400">Email Address</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:border-[#C4A05A] focus:outline-none transition-colors placeholder:text-white/10 text-[#F5F0E8]" 
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400">Phone Number</label>
            <input 
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:border-[#C4A05A] focus:outline-none transition-colors placeholder:text-white/10 text-[#F5F0E8]" 
              placeholder="+971 50 123 4567"
            />
            {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-transparent border-b border-[#F5F0E8]/20 py-4 focus:border-[#C4A05A] focus:outline-none transition-colors placeholder:text-white/10 text-[#F5F0E8] resize-none" 
              placeholder="Tell us about your project..."
            />
            {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C4A05A] text-[#1A1A1A] py-6 font-headline font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-[#F5F0E8] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>

      </div>
    </section>
  );
}

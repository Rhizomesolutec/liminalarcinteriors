"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function BannerCLC() {
  const [cIndex, setCIndex] = useState(0);
  const [time, setTime] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  } as const;

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 120,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.8,
      rotateX: 90,
      transition: {
        duration: 0.3,
      },
    },
  } as const;

  const decorativeVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1,
      transition: { 
        delay: 1.2, 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: { 
      scaleX: 0, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  } as const;

  const textData = [
    {
      headline: "Designing Dreams, Building Realities",
      subheadline:
        "From stunning landscapes to flawless interiors, we craft spaces that inspire and endure.",
      accent: "Excellence in Every Detail"
    },
    {
      headline: "Where Innovation Meets Craftsmanship", 
      subheadline:
        "Delivering excellence in design, engineering, and construction — with quality you can trust.",
      accent: "Built to Last"
    },
    {
      headline: "Transforming Ideas into Landmarks",
      subheadline:
        "We shape environments that blend creativity, sustainability, and functionality.",
      accent: "Sustainable Solutions"
    },
    {
      headline: "Your Vision, Our Commitment",
      subheadline:
        "Partner with us to build spaces that stand out and stand strong for generations.",
      accent: "Trusted Partnership"
    },
  ];

  const nextSlide = () => {
    setTime((prev) => prev + 1);
  };

  useEffect(() => {
    setCIndex((prevIndex) => (prevIndex + 1) % textData.length);
  }, [time, textData.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen top-0 absolute h-screen flex items-center justify-center z-0 pointer-events-none">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#7F6456]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#7F6456]/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between z-20 relative">
        {/* Text Content */}
        <div className="lg:w-1/2 w-full text-center lg:text-left mb-12 lg:mb-0">
          {/* Accent Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`accent-${cIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-4"
            >
              <span className="text-[#7F6456] text-sm font-semibold tracking-wider uppercase bg-[#7F6456]/10 px-4 py-2 rounded-full border border-[#7F6456]/20">
                {textData[cIndex]?.accent}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              className="inline-block mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={cIndex}
            >
              {textData[cIndex]?.headline?.split(" ").map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="whitespace-nowrap inline-block mr-3 mb-2"
                >
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white inline-block"
                      key={charIndex}
                      variants={characterVariants}
                      style={{
                        textShadow: "0 4px 20px rgba(127, 100, 86, 0.3), 0 2px 10px rgba(0, 0, 0, 0.5)"
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Decorative Line */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`line-${cIndex}`}
              variants={decorativeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-24 h-1 bg-gradient-to-r from-[#7F6456] to-[#7F6456]/40 mb-6 mx-auto lg:mx-0 origin-left"
            />
          </AnimatePresence>

          {/* Subheadline */}
          <AnimatePresence mode="wait">
            <motion.p
              className="text-gray-100 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0"
              key={`SubText+${cIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {textData[cIndex]?.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* Progress Indicators */}
          <motion.div 
            className="flex justify-center lg:justify-start mt-8 space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {textData.map((_, index) => (
              <div
                key={index}
                className={`h-1 transition-all duration-500 rounded-full ${
                  index === cIndex 
                    ? 'w-12 bg-[#7F6456]' 
                    : 'w-3 bg-white/30'
                }`}
              />
            ))}
          </motion.div>
        </div>

        {/* Logo Section */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Logo Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7F6456]/20 to-transparent rounded-2xl blur-xl transform rotate-6 scale-110"></div>
            
            {/* Logo Container */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
              <Image
                className="drop-shadow-2xl"
                src="/logo.png"
                width={300}
                height={350}
                alt="Company Logo"
                style={{
                  filter: "drop-shadow(0 10px 30px rgba(127, 100, 86, 0.3))"
                }}
              />
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#7F6456]/40"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#7F6456]/40"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#7F6456]/40"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#7F6456]/40"></div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-3 h-3 bg-[#7F6456] rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-2 h-2 bg-white/60 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
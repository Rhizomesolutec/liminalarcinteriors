"use client";
import React, { useState, useEffect, useRef, useCallback, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Service as TypeService } from "@/types/type";
import { generateSlug } from "@/lib/utils";

// Type definitions

export default function Service({
  services,
}: {
  services: TypeService[];
}): JSX.Element {
  const [cindex, setcIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [dragDistance, setDragDistance] = useState<number>(0);
  const [hasDragged, setHasDragged] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // const [services] = useState<ServiceItem[]>([
  //   {
  //     name: "/todd-kent-178j8tJrNlc-unsplash.jpg",
  //     heading: "Architectural Design",
  //     body: `Innovative and practical architectural solutions tailored to your vision. From concept to construction, we ensure designs that inspire and perform.`,
  //     nav: [
  //       "Architectural Design Projects",
  //       "3D Rendering and Visualization",
  //       "Project Management",
  //       "Sustainable and Green Building Practices",
  //     ],
  //   },
  //   {
  //     name: "/0-1--5-.1587627053.6613.webp",
  //     heading: "Engineering",
  //     body: `At Liminal Arc, engineering makes sure that every design is based on accuracy, security, and clever functioning. We provide the technological foundation for every exquisite place, from structural integrity to seamless systems.`,
  //     nav: [
  //       "Structural planning",
  //       "Electrical layout & execution",
  //       "Plumbing systems",
  //       "HVAC integration",
  //     ],
  //   },
  //   {
  //     name: "/francesca-tosolini-6japTIjUQoI-unsplash.jpg",
  //     heading: "MEP Drawings",
  //     body: `Integrated mechanical, electrical, and plumbing systems for optimized performance. We ensure safety, functionality, and compliance in every build.`,
  //     nav: [
  //       "HVAC and Ducting Systems",
  //       "Electrical & Power Layouts",
  //       "Plumbing & Drainage Design",
  //       "Fire Protection & Coordination Drawings",
  //     ],
  //   },
  //   {
  //     name: "/photo-1600607687939-ce8a6c25118c.jpg",
  //     heading: "Interior Design",
  //     body: `Bring life and function into your spaces with creative and client-centric interiors. We blend style with comfort to create environments that speak to you.`,
  //     nav: [
  //       "Space Planning & Concepts",
  //       "Material and Finish Selection",
  //       "Lighting & Furniture Design",
  //     ],
  //   },
  //   {
  //     name: "/home-2486092_1280.jpg",
  //     heading: "Civil & Interior Fit out",
  //     body: `End-to-end civil and fit-out solutions that ensure quality and detail in execution. From partitions to finishes, we build with precision.`,
  //     nav: [
  //       "Partitioning & False Ceilings",
  //       "Flooring & Wall Finishes",
  //       "Electrical & HVAC Installations",
  //       "Plumbing & Sanitary Works",
  //     ],
  //   },
  //   {
  //     name: "/ ",
  //     heading: "Joinery",
  //     body: `Custom woodwork crafted with detail, elegance, and function. We design and fabricate furniture and fixtures that elevate your space.`,
  //     nav: [
  //       "Custom Furniture Fabrication",
  //       "Doors, Frames & Cladding",
  //       "Shelving & Storage Units",
  //       "Finishing & Polishing Works",
  //     ],
  //   },
  //   {
  //     name: "/photo-1600566753190-17f0baa2a6c3.jpg",
  //     heading: "Authorities",
  //     body: `Navigating approval processes is a crucial part of any interior or fit-out project. We assist clients in securing all necessary approvals from relevant authorities and building managements.`,
  //     nav: [
  //       "Civil Defense Authorities",
  //       "Electricity & Water Authorities",
  //       "Environmental & Sustainability Authorities",
  //       "Free Zones & Special Authorities",
  //     ],
  //   },
  //   {
  //     name: "/33-1100x733.jpg",
  //     heading: "Approvals",
  //     body: `We specialize in delivering carpentry and joinery works that fully comply with local authority regulations and building management standards across the UAE.`,
  //     nav: [
  //       "Food & Beverage Sector Approvals",
  //       "Building Management & Developer Approvals",
  //       "Building Owner/Landlord NOC",
  //       "Mall Management Approval (For retail spaces)",
  //     ],
  //   },
  //   {
  //     name: "/e10c68fd076d4591ad9389d155d29555.jpg",
  //     heading: "Landscaping",
  //     body: `Transform outdoor spaces into stunning, functional environments. From lush gardens to modern hardscapes, we design landscapes that harmonize with architecture and nature.`,
  //     nav: [
  //       "Garden Design",
  //       "Landscape Architecture",
  //       "Landscaping for Climate",
  //       "Sustainable Landscaping",
  //     ],
  //   },
  // ]);

  // Clear interval function
  const clearAutoPlay = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start interval function
  const startAutoPlay = useCallback((): void => {
    clearAutoPlay();
    if (!isDragging) {
      intervalRef.current = setInterval(() => {
        setcIndex((prevIndex: number) => (prevIndex + 1) % services.length);
      }, 6000);
    }
  }, [isDragging, services.length, clearAutoPlay]);

  const goNext = useCallback((): void => {
    setcIndex((prevIndex: number) => (prevIndex + 1) % services.length);
  }, [services.length]);

  const goPrev = useCallback((): void => {
    setcIndex((prevIndex: number) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  }, [services.length]);

  const goToSlide = useCallback(
    (index: number): void => {
      setcIndex(index);
      clearAutoPlay();
      setTimeout(startAutoPlay, 1000);
    },
    [clearAutoPlay, startAutoPlay]
  );

  // Handle image click for navigation
  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!hasDragged) {
        e.stopPropagation();
        router.push(
          `/ourservices/${generateSlug(services[cindex].service_name)}`
        );
      }
    },
    [hasDragged, services, cindex, router]
  );

  const handleStart = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ): void => {
      setIsDragging(true);
      setHasDragged(false);
      clearAutoPlay();

      const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;

      const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;

      setStartX(clientX);
      setStartY(clientY);
      setDragDistance(0);
    },
    [clearAutoPlay]
  );

  const handleMove = useCallback(
    (e: globalThis.MouseEvent | globalThis.TouchEvent): void => {
      if (!isDragging) return;

      const clientX =
        "clientX" in e
          ? e.clientX
          : (e as globalThis.TouchEvent).touches[0].clientX;

      const clientY =
        "clientY" in e
          ? e.clientY
          : (e as globalThis.TouchEvent).touches[0].clientY;

      const distance = clientX - startX;
      const verticalDistance = Math.abs(clientY - (startY || clientY));

      if (Math.abs(distance) > verticalDistance && Math.abs(distance) > 10) {
        if ("preventDefault" in e) {
          e.preventDefault();
        }
        setDragDistance(distance);
        setHasDragged(true);
      } else if (
        verticalDistance > Math.abs(distance) &&
        verticalDistance > 20
      ) {
        setIsDragging(false);
        setHasDragged(false);
        setDragDistance(0);
      }
    },
    [isDragging, startX, startY]
  );

  const handleEnd = useCallback((): void => {
    if (!isDragging) return;

    const threshold = 80;
    if (Math.abs(dragDistance) > threshold && hasDragged) {
      if (dragDistance > 0) {
        goPrev();
      } else {
        goNext();
      }
    }

    setIsDragging(false);
    setHasDragged(false);
    setDragDistance(0);

    // Restart autoplay after a delay
    setTimeout(startAutoPlay, 1000);
  }, [isDragging, dragDistance, hasDragged, goNext, goPrev, startAutoPlay]);

  const handleNextClick = useCallback((): void => {
    goNext();
    clearAutoPlay();
    setTimeout(startAutoPlay, 2000);
  }, [goNext, clearAutoPlay, startAutoPlay]);

  const handlePrevClick = useCallback((): void => {
    goPrev();
    clearAutoPlay();
    setTimeout(startAutoPlay, 2000);
  }, [goPrev, clearAutoPlay, startAutoPlay]);

  // Mouse and touch event handlers
  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent): void => {
      if (isDragging) handleMove(e);
    };

    const handleGlobalMouseUp = (): void => {
      if (isDragging) handleEnd();
    };

    const handleGlobalTouchMove = (e: globalThis.TouchEvent): void => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e);
      }
    };

    const handleGlobalTouchEnd = (): void => {
      if (isDragging) handleEnd();
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchmove", handleGlobalTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // Auto-play effect
  useEffect(() => {
    startAutoPlay();
    return clearAutoPlay;
  }, [startAutoPlay, clearAutoPlay]);

  // Pause on hover
  const handleMouseEnter = (): void => {
    clearAutoPlay();
  };

  const handleMouseLeave = (): void => {
    if (!isDragging) {
      startAutoPlay();
    }
  };

  return (
    <div className="sm:px-20 relative">
      <div
        ref={carouselRef}
        className="relative overflow-hidden sm:rounded-2xl h-screen cursor-grab active:cursor-grabbing select-none group"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {
          if (isDragging) {
            e.preventDefault();
            handleMove(e.nativeEvent);
          }
        }}
        onTouchEnd={() => handleEnd()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ touchAction: "pan-y pinch-zoom" }}
      >
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7F6456]/20 via-transparent to-black/40 z-10 pointer-events-none"></div>

        {/* Main Carousel Container */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`slide-${cindex}`}
              className="absolute inset-0"
              initial={{
                opacity: 0,
                scale: 1.1,
                x: 100,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: isDragging ? dragDistance * 0.15 : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                x: -100,
              }}
              transition={{
                duration: isDragging ? 0 : 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div
                className="w-full h-full relative cursor-pointer group/image"
                onClick={handleImageClick}
              >
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 8,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    key={cindex}
                    src={services[cindex].cover_image?.image_url || ""}
                    fill
                    className="object-cover pointer-events-none"
                    alt={services[cindex].service_name}
                    priority
                  />
                </motion.div>

                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Drag Indicator */}
          {isDragging && hasDragged && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="bg-[#7F6456]/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl border border-white/20">
                <div className="flex items-center gap-3 text-white">
                  {dragDistance > 0 ? (
                    <>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span className="text-sm font-semibold">
                        Previous Service
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-semibold">
                        Next Service
                      </span>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Navigation Buttons */}
        <motion.button
          onClick={handlePrevClick}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-[#7F6456]/80 hover:bg-[#7F6456] rounded-full p-4 backdrop-blur-sm transition-all duration-300 shadow-lg border border-white/20 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>

        <motion.button
          onClick={handleNextClick}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-[#7F6456]/80 hover:bg-[#7F6456] rounded-full p-4 backdrop-blur-sm transition-all duration-300 shadow-lg border border-white/20 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>

        {/* Enhanced Progress Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {services.map((_, index: number) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-500 ${index === cindex
                  ? "w-12 h-3 bg-[#7F6456] rounded-full"
                  : "w-3 h-3 bg-white/50 hover:bg-white/70 rounded-full"
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === cindex && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#7F6456] to-[#7F6456]/60 rounded-full"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Enhanced Text Overlay Panel */}
        <AnimatePresence>
          <motion.div
            key={cindex}
            className="absolute bg-gray-200 w-80 h-52 top-0 right-0 z-20 rounded-bl-xl shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.div
              className="flex justify-center items-start flex-col h-full p-6"
              key={`text-${cindex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h3 className="text-xl font-extrabold text-amber-800 mb-3">
                {services[cindex].service_name}
              </h3>

              <div className="space-y-1">
                {services[cindex].sub_services &&
                  services[cindex].sub_services.map((item, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-3 h-3 text-amber-700 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <p className="text-gray-700">{item.sub_service_name}</p>
                    </div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #7f6456;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6d5347;
        }
      `}</style>
    </div>
  );
}

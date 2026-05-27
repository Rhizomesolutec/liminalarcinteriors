"use client";

import React, { useEffect } from "react";

import Image from "next/image";
import { Service } from "@/types/type";

type Props = {
  data: Service;
};

const SubCat: React.FC<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isMobile, setMobile] = React.useState<boolean>(false);

  const handleTap = (index: number | null) => {
    console.log(index);
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="py-6 md:py-16 px-4 md:px-6">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2
          className="text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-700 bg-clip-text text-transparent mb-4"
          style={{ color: "#7F6456" }}
        >
          Our Services
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Discover our comprehensive range of services designed to meet your
          needs
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.sub_services.map((sub_service, index) => (
          <div
            key={index + "subservice"}
            className="group relative transform hover:scale-105 transition-all duration-500 ease-out"
          >
            {/* Card Container */}
            <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-orange-100 hover:border-orange-200">
              {/* Number Badge */}
              {/* <div className="absolute -top-4 -left-4 z-[9999] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                     style={{background: 'linear-gradient(135deg, #7F6456 0%, #9B7B63 100%)'}}>
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div> */}

              {/* Category Title */}
              <div className="p-6 pb-4">
                <h3
                  className="text-xl font-bold text-center mb-4 nasalization"
                  style={{ color: "#7F6456" }}
                >
                  {sub_service.sub_service_name}
                </h3>
              </div>

              {/* Image/Content Container */}
              <div className="relative w-full h-64 mx-auto overflow-hidden rounded-2xl m-4 shadow-inner">
                {/* Background Image */}
                <Image
                  onClick={() => handleTap(index)}
                  width={280}
                  height={256}
                  className={`absolute inset-0 w-full h-full object-cover cursor-pointer transition-all duration-700 ease-in-out transform
                      ${
                        activeIndex === index ||
                        (!isMobile &&
                          "group-hover:scale-110 group-hover:blur-sm group-hover:brightness-50")
                      }`}
                  src={sub_service.image?.image_url || ""}
                  alt={`${data.service_name} service image`}
                />

                {/* Overlay Content */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-amber-900/40 to-transparent 
                    flex items-center justify-center p-6 transition-all duration-500 transform
                    ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : isMobile
                        ? "opacity-0 translate-y-full"
                        : "opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0"
                    }`}
                >
                  <div className="text-center">
                    {/* Topics List */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-h-48 overflow-y-auto border border-orange-200">
                      <ul
                        className="space-y-2 text-sm"
                        style={{ color: "#7F6456" }}
                      >
                        {sub_service.features?.map(
                          (topic: string, i: number) => (
                            <li
                              key={i + "topic"}
                              className="flex items-center space-x-2 animate-fade-in"
                            >
                              <div
                                className="w-2  h-2 rounded-full flex-shrink-0"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #7F6456 0%, #9B7B63 100%)",
                                }}
                              ></div>
                              <span className="text-left">{topic}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Mobile hint */}
                  </div>
                </div>

                {/* Hover hint for desktop */}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-200/30 to-transparent rounded-bl-3xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-200/30 to-transparent rounded-tr-3xl"></div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                style={{ backgroundColor: "#7F6456" }}
              ></div>
              <div
                className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                style={{ backgroundColor: "#9B7B63", animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                style={{ backgroundColor: "#A67C5A", animationDelay: "1s" }}
              ></div>
            </div>
            {!isMobile && (
              <div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 
                      opacity-100 group-hover:opacity-0 transition-all duration-300 delay-200"
              >
                <div
                  className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-orange-200"
                  style={{ color: "#7F6456" }}
                >
                  Hover to explore
                </div>
              </div>
            )}

            {isMobile && (
              <p
                onClick={() => {
                  if (activeIndex === index) {
                    handleTap(null);
                  }
                }}
                className="text-white/80 text-xs mt-3 font-medium"
              >
                Tap to {activeIndex === index ? "close" : "explore"}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCat;

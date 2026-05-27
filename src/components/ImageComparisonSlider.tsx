"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface ImageComparisonProps {
  bImage: string;
  fImage: string;
}
const ImageComparisonSlider: React.FC<ImageComparisonProps> = ({
  bImage,
  fImage,
}) => {
  const [position, setPosition] = useState(50);

 const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPosition(Number(e.target.value)); 
};

  const containerStyle = {
    "--position": `${position}%`,
  } as React.CSSProperties;
  return (
    <motion.div whileHover={{scale:1.2}}
    //   ref={containerRef}
      className="relative overflow-hidden sm:w-48 w-full rounded-lg shadow-xl"
      style={containerStyle}
    >
      <div className="sm:w-56 w-full h-full sm:h-48 relative">
        {/* After image (full width) */}
        <Image
          width={300}
          height={300}
          className="w-full h-full object-cover object-center"
          src={fImage}
          alt="After image"
        />

        {/* Before image (partial width based on slider) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <Image
            width={300}
            height={300}
            className="w-full h-full object-cover object-left "
            src={bImage}
            alt="Before image"
          />
        </div>

        {/* Slider input */}
        <input
        //   ref={sliderRef}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={handleSliderChange }
          aria-label="Percentage of before photo shown"
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10"
        />

        {/* Slider line */}
        <div
          className="absolute inset-y-0 w-1 bg-white pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        ></div>

        {/* Slider button */}
        <div
          className="absolute bg-white text-black p-2 rounded-full flex items-center justify-center pointer-events-none shadow-md"
          style={{
            top: "50%",
            left: `${position}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <line
              x1="128"
              y1="40"
              x2="128"
              y2="216"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <line
              x1="96"
              y1="128"
              x2="16"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <polyline
              points="48 160 16 128 48 96"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
            <line
              x1="160"
              y1="128"
              x2="240"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <polyline
              points="208 96 240 128 208 160"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
export default ImageComparisonSlider;

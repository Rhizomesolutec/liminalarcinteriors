"use client";


import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

const logos1 = [
  "/clinetLogo/download (6).jpg",
  "/clinetLogo/download (3).png",
  "/clinetLogo/images.png",
  "/clinetLogo/download (3).jpg",
  "/clinetLogo/download (4).png",
  "/clinetLogo/clint13e.webp",
  "/clinetLogo/download (4).jpg",
  "/clinetLogo/download (14).png",
];
const logos2 = [
  "/clinetLogo/download (6).png",
  "/clinetLogo/download (7).png",
  "/clinetLogo/download (8).png",
  "/clinetLogo/download (9).png",
  "/clinetLogo/download (10).png",
  "/clinetLogo/download (11).png",
  "/clinetLogo/download (12).png",
  "/clinetLogo/download (13).png",
  
];
const logos3 = [
  "/clinetLogo/download (15).png",
  "/clinetLogo/download (16).png",
  "/clinetLogo/download (18).png",
  "/clinetLogo/images3.png",
  "/clinetLogo/download (20).png",
  "/clinetLogo/download (22).png",
  "/clinetLogo/download.png",
  "/clinetLogo/download5.png",
];
const logos4 = [
  "/clinetLogo/download22.jpg",
  "/clinetLogo/emirates-airlienes-1.svg",
  "/clinetLogo/download (5).png",
  "/clinetLogo/download (5).jpg",
  "/clinetLogo/download (21).png",
  "/clinetLogo/download (1).jpg",
  "/clinetLogo/download (1).png",
  "/clinetLogo/dubai-police-logo-F263188BEE-seeklogo.com.png",
];

export default function OurClients() {
  return (
    <div className="servicesBgImage pb-20 ">
      <div className="flex justify-center">
        <h1 className=" hover-underline-animation center nasalization pt-24 text-4xl text-[#7F6456]">
          OUR CLIENTS
        </h1>
      </div>
      <div className="px-10 pt-10">
        <div className="flex justify-center flex-wrap gap-4">
          {logos1.map((src, index) => (
           <motion.div whileHover={{scale:1.05}} key={index}  className="w-[120px] h-[120px] relative">
              <Image
                src={src}
                fill
                alt={`Client logo ${index + 1}`}
                className="object-contain rounded-lg"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          {logos2.map((src, index) => (
           <motion.div whileHover={{scale:1.05}} key={index} className="w-[120px] h-[120px] relative">
              <Image
                src={src}
                fill
                alt={`Client logo ${index + 1}`}
                className="object-contain rounded-lg"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          {logos3.map((src, index) => (
            <motion.div whileHover={{scale:1.05}} key={index} className="w-[120px] h-[120px] relative">
              <Image
                src={src}
                fill
                alt={`Client logo ${index + 1}`}
                className="object-contain rounded-lg"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          {logos4.map((src, index) => (
            <motion.div whileHover={{scale:1.05}} key={index} className="w-[120px] h-[120px] relative">
              <Image
                src={src}
                fill
                alt={`Client logo ${index + 1}`}
                className="object-contain rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

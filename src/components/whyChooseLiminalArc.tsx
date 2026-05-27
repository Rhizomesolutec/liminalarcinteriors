"use client";

import { motion } from "motion/react";
import Image from "next/image";

import React from "react";

export default function WhyChooseLiminalArc() {
  const logos = [
    {
      image: "/quality-badge.png",
      title: "Premium Quality",
      description:
        "We use only the finest materials to ensure long-lasting durability and beauty.",
    },
    {
      image: "/web-design.png",
      title: "Modern Design",
      description:
        "Our creations blend timeless woodcraft with contemporary aesthetics to suit any space.",
    },
    // {
    //   image: "/trust.png",
    //   title: "Trusted Brand",
    //   description:
    //     "Renowned for reliability, we’ve earned the trust of architects, designers, and homeowners alike.",
    // },
    {
      image: "/route.png",
      title: "Streamlined Process",
      description:
        "From concept to installation, we ensure a smooth and transparent customer experience.",
    },
    {
      image: "/abilities.png",
      title: "Skilled Craftsmanship",
      description:
        "Our team of seasoned artisans brings precision and passion to every project.",
    },
    // {
    //   image: "/handcraft.png",
    //   title: "Handcrafted with Care",
    //   description:`
    //     "Each piece is meticulously crafted by hand, reflecting attention to every detail.",
    // },
  ];

  return (
    <div className=" px-6 pt-20">
      <div className="sm:flex ">
        <div className=" sm:w-1/2 flex-wrap gap-4 text-[#7F6456]">
          <div className="flex justify-center ">
            <h1 className=" hover-underline-animation text-center nasalization text-3xl text-[#7F6456]">
              Why Choose Liminal Arc
            </h1>
          </div>
          <p className="pt-10">
            At <samp className="nasalization">Liminal Arc</samp> we believe that exceptional interiors 
            begin with thoughtful craftsmanship, premium quality materials, and a strong commitment to customer satisfaction.
            As one of the best interior design companies in Dubai, we don’t just design interiors—we craft stories through detail, 
            quality, and care. What makes us different is what makes your space truly unforgettable. Here’s what sets us apart.
          </p>
          <div className="flex justify-evenly pt-8">
            {logos.map((data, index) => (
              <div
                key={`${index + "24"}`}
                className=" flex justify-center flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={`${index + data.image}`}
                  className="w-[70px] h-[70px] relative"
                >
                  <Image
                    src={data.image}
                    fill
                    alt={`Client logo ${index + 1}`}
                    className="object-contain rounded-lg"
                  />
                </motion.div>
                <p className="text-center">{data.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:w-1/2 text-[#7F6456]  sm:mt-0 mt-10  px-5">

          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
             src={"/WhatsApp Image 2025-05-26 at 4.11.50 PM (1).jpeg"}
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-110 "
              alt=""
              fill
            />
          </div>
       
        </div>
      </div>

      <div className="sm:flex mt-10  ">
        <div className=" sm:w-1/2 flex-wrap gap-4   px-5 ">
          <div className="relative w-full h-full overflow-hidden rounded-lg ">
            <Image
              src={"/ibrary1280.jpg"}
             className="object-cover transition-transform duration-500 ease-in-out hover:scale-110 "
              alt=""
              fill
            />
          </div>
        </div>
        <div className="sm:w-1/2 text-[#7F6456] sm:mt-0 mt-10">
          <div className="flex justify-center ">
            <h1 className=" hover-underline-animation center nasalization text-3xl text-[#7F6456]">
              Our Authorizations
            </h1>
          </div>
          <p className="pt-10">
            Our certifications distinguish us within the interior design and
            fit-out industry, highlighting our unwavering commitment to quality,
            excellence, and best practices. They serve as a testament to our
            dedication to delivering exceptional results, maintaining full
            compliance, and promoting sustainability in every project we
            undertake.
          </p>

          <div className=" flex justify-center  pt-7">
            <div className="inline-block">
              <Image
                src={"/logLAF.png"}
                width={100}
                height={100}
                alt={"logLAF.webp"}
              />
            </div>
            <div className="inline-block">
              <Image
                src={"/Group 2261.png"}
                width={100}
                height={100}
                alt={"Group 2261.webp"}
              />
            </div>
            <div className="inline-block">
              <Image
                src="/download 10.png"
                width={80}
                height={80}
                alt="Group"
              />
            </div>

            <div className="inline-block">
              <Image
                src={"/logo2.png"}
                width={100}
                height={100}
                alt={"logo2.webp"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

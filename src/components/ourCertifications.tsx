"use client"

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function OurCertifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <div className="py-24 flex justify-center ">
        <p className="nasalization hover-underline-animation text-4xl text-[#7F6456] text-center">
          Our Certifications
        </p>
      </div>

      <div className="flex flex-wrap justify-evenly gap-8 px-4" ref={ref}>
        {[ 
          {
            src: "/8d1ba13b-e31a-43ee-aab7-f187f704cb60.jpg",
            title: "Government E-Marketplace (GEV) Certification",
            desc: "Recognized as a registered vendor on the Government e-Marketplace, ensuring verified business compliance.",
            alt: "GEV Certificate"
          },
          {
            src: "/1746853721271-1d396663-da7f-4260-8c8b-76871714790c_1.jpg",
            title: "ISO 14001: Environmental Management",
            desc: "Demonstrates our commitment to sustainable and eco-conscious operations.",
            alt: "ISO 14001 Certificate"
          },
          {
            src: "/1746855302712-4fd7fa1e-68d2-4134-b764-a3980b730908_1.jpg",
            title: "ISO 9001: Quality Management",
            desc: "Ensures our processes consistently deliver high quality and client satisfaction.",
            alt: "ISO 9001 Certificate"
          }
        ].map((cert, index) => (
          <motion.div
            key={index}
            className="text-center max-w-[300px]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <Image
              alt={cert.alt}
              src={cert.src}
              width={300}
              height={400}
              className="rounded-lg shadow-md"
            />
            <p className="mt-4 text-[#704e3c] font-medium">{cert.title}</p>
            <p className="text-sm text-[#704e3c]">{cert.desc}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default OurCertifications;

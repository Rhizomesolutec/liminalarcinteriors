"use client";

import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

const imgAnimation2 = {
  animate: {
    y: [0, -30, 0],
  },
  transition: {
    duration: 2,

    repeat: Infinity,
  },
};
const imgAnimation3 = {
  animate: {
    y: [0, -20, 0],
  },
  transition: {
    duration: 2,

    repeat: Infinity,
  },
};

export default function CallCpmponent({data}:{data:{phone_number:string,whatsApp_number:string}}) {
  const sendMessage = () => {
    // const phoneNumber = "+971509472658"; 
    const phoneNumber = data.whatsApp_number;
    const message = "Hello! I'm interested in your service."; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const handleCall = () => {
    // window.location.href = `tel:+971588636991`;
    window.location.href = `tel:${data.phone_number}`;
  };
  return (
    <div className="fixed right-0 bottom-0 z-[9999]">
      <motion.div
        {...imgAnimation2}
        onClick={handleCall}
        className=" cursor-pointer  -mt-3 "
      >
        <Image
          inlist={{ x: 300 }}
          src="/telephone-call_3059561.png"
          alt="review.png"
          width={50}
          height={50}
          className="rounded-full bg-white"
        ></Image>
      </motion.div>
      <motion.div
        onClick={sendMessage}
        className="cursor-pointer  "
        {...imgAnimation3}
      >
        <Image
          src="/download-removebg-preview.png"
          alt="review.png"
          width={60}
          height={60}
        ></Image>
      </motion.div>
    </div>
  );
}

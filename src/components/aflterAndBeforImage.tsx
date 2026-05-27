
import React from "react";
import ImageComparisonSlider from "./ImageComparisonSlider";

export default function AflterAndBeforImage() {
  const images = [
    {
      bImage: "/bImage4.jpeg",
      fImage: "/fImage4.jpeg",
    },
    {
      fImage:
        "/fImage3.jpeg",
      bImage: "/bImage3.jpeg",
    },
    { fImage: "/havenly_k.jpg", bImage: "/f9544380-5.jpg" },
    { fImage: "/fImage2.jpeg", bImage: "/bImage2.jpeg" },
    { fImage: "/fImag1.jpeg", bImage: "/bImg2.jpeg" },
  ];
  return (
  <div className=" px-6 pt-20">
      <div className="flex justify-center text-center ">
        <h1 className=" hover-underline-animation  nasalization text-4xl text-[#7F6456]">
          Projects We’re Excited About
        </h1>
      </div>
      <p className="text-center text-[#7F6456] ">
        Just like our work ethic, our designs and creative ideas are totally
        clear and open from the very start.
      </p>
      <div className="flex justify-evenly gap-6 flex-wrap pt-10">
        {images.map((src, index) => (
          <ImageComparisonSlider key={`${index+src.bImage+src.fImage}`} bImage={src.bImage} fImage={src.fImage} />
        ))}
      </div>
    </div>
  );
}

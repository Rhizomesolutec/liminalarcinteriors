import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Liminal Arc | Project Management Services UAE",
  description:
    "Learn about Liminal Arc — a leading firm in the UAE offering expert project management services, MEP design, interior design, joinery, and fit-out solutions.",
};

export default function AboutPage() {
  return (
    <main className="w-full overflow-hidden">
      <div className="mt-10" id="about">
        <div className="w-full sm:flex h-[500px]">
          <div className="sm:w-[600px] hidden sm:block w-full">
            <div className="relative">
              <Image
                width={500}
                height={500}
                src={"/Group 2259 (2).png"}
                alt={"Group 2259 (2).png"}
              />
            </div>
          </div>
          <div className="flex justify-center items-center sm:mt-0 sm:w-3/5 px-6 sm:pr-10">
            <div>
              <p className="nasalization hover-underline-animation center text-4xl text-[#7F6456]">
                About Us
              </p>
              <p className="text-[#704e3c]">
                At LIMINAL ARC, we specialize in end-to-end solutions for
                transforming spaces across the UAE. From innovative interior
                design concepts to precise architectural drawings, MEP plans,
                and everything in between, we ensure every detail is
                meticulously covered. Our expert team navigates all regulatory
                approvals, ensuring smooth, hassle-free project execution from
                start to finish. Whether it&apos;s residential, commercial, or
                industrial, we bring your vision to life with unmatched
                precision, creativity, and professionalism. From securing
                authority approvals to handing over the keys, we oversee every
                step of your interior journey, crafting spaces that are not
                only functional but also ready to inspire—whether for work or
                living.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



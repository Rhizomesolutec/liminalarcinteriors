import React from "react";

export default function LiminalArcPhilosophy() {
  return (
    <section className="py-40 relative bg-[#131313] overflow-hidden" id="philosophy">
      {/* Background outline text */}
      <div className="absolute top-0 right-0 text-[20rem] font-bold text-white/5 select-none leading-none -translate-y-1/4 translate-x-1/4 text-outline font-headline">
        ART
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl">
          <h2 className="font-headline text-[10px] uppercase tracking-[0.5em] text-[#C4A05A] mb-12">The Philosophy</h2>
          <blockquote className="text-4xl md:text-6xl lg:text-7xl font-light font-headline leading-[1.2] tracking-tight text-[#F5F0E8]">
            "Interior Design is a <span className="italic text-[#C4A05A]">bold art</span> that gives life to the space we live in every day."
          </blockquote>
          <div className="mt-16 w-24 h-px bg-[#C4A05A]" />
          <p className="mt-8 text-lg opacity-60 font-light max-w-xl text-gray-300">
            We believe that the boundary between architecture and interior should be seamless—a liminal transition where form follows soul.
          </p>
        </div>
      </div>
    </section>
  );
}

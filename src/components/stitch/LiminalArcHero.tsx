"use client";

import React from "react";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDY8HF7nqwl7xht2JlGvFD6DwRhlI07dVvAIehqTn-K4RFIZKp08pY8yDRN3SKzkFPc2vywZi1nWOEy6kFBQM3wzGqvlBlpCyvxNGuEtaLUWo8hnfMxXY9X87I8VXtuGSJfVTOSuzNrjCXULlrpbMTN2oRFHhjeBThQxZpLg1hJMtSZFJWy3v8PgTbEekjGNHLbnTUrq_B5zbFOS84PIVHz_18l0Uj-G72YOiP7k0gK0ZJHMMFUy7yvYpu3mhTVzc3VS7FXG3iSSCs";

export default function LiminalArcHero() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/40 to-[#1A1A1A]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-screen-2xl px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-start gap-6 max-w-3xl">
          <div className="w-12 h-px bg-[#C4A05A] mb-2" />

          <h1 className="text-[#F5F0E8] font-headline text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]">
            Where Spaces <br />
            <span className="italic font-extralight text-[#C4A05A]">Tell Stories</span>
          </h1>

          <p className="text-[#F5F0E8] font-body text-base md:text-lg opacity-80 max-w-xl border-l border-[#C4A05A]/40 pl-6 py-2 leading-relaxed">
            Redefining luxury through parametric fluidity and bespoke architectural narratives in the heart of Dubai.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#C4A05A] text-[#1A1A1A] px-10 py-5 font-headline text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:bg-[#F5F0E8] text-center"
            >
              Book a Consultation
            </button>
            <a
              href="#portfolio"
              className="border border-[#F5F0E8]/30 text-[#F5F0E8] px-10 py-5 font-headline text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:border-[#C4A05A] hover:text-[#C4A05A] text-center"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="font-headline text-[9px] uppercase tracking-[0.4em] rotate-90 mb-8">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C4A05A] to-transparent" />
      </div>
    </main>
  );
}


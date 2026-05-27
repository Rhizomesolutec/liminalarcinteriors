import React from "react";

export default function LiminalArcClientCloud() {
  const clients = ["DAMAC", "RTA", "Dubai Metro", "Gold Souk", "DP World"];

  return (
    <section className="py-20 bg-[#1A1A1A] border-y border-[#F5F0E8]/5">
      <div className="max-w-screen-2xl mx-auto px-12">
        <p className="text-center font-headline text-[10px] uppercase tracking-[0.5em] text-[#C4A05A] mb-12 opacity-60">
          Trusted Partners &amp; Clients
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-100 transition-opacity duration-500">
          {clients.map((client) => (
            <span key={client} className="text-2xl font-bold tracking-tighter font-headline text-[#F5F0E8]">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

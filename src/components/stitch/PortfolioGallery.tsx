"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface PortfolioItem {
  image_url: string;
  caption?: string;
  category?: string;
  year?: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  title?: string;
  subtitle?: string;
}

const FILTERS = ["ALL", "RESIDENTIAL", "HOSPITALITY", "CORPORATE", "HERITAGE RENOVATION"] as const;
type FilterKey = (typeof FILTERS)[number];

export default function PortfolioGallery({
  items,
  title = "Curated Works",
  subtitle = "A synthesis of craftsmanship and architectural precision. We craft spatial narratives for the most discerning clients.",
}: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");

  const filtered =
    activeFilter === "ALL"
      ? items
      : items.filter(
          (item) =>
            item.category?.toUpperCase() === activeFilter
        );

  return (
    <section className="portfolio-gallery-root w-full bg-[#faf9f7] py-16 px-4 md:px-12">
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8">
            <h2 className="portfolio-heading text-4xl md:text-6xl font-light uppercase tracking-tight text-[#1a1a1a] mb-4 leading-tight">
              {title}
            </h2>
            <div className="h-px w-16 bg-[#7F6456] mb-6" />
            <p className="text-[#7F6456]/80 text-base md:text-lg font-light max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap gap-6 border-b border-[#7F6456]/20 pb-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`portfolio-filter-btn text-[10px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 pb-3 -mb-[13px] ${
                activeFilter === f
                  ? "text-[#7F6456] border-b-2 border-[#7F6456]"
                  : "text-[#9a8880] hover:text-[#7F6456]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="max-w-7xl mx-auto py-20 text-center text-[#7F6456]/60 text-sm tracking-widest uppercase">
          No projects in this category yet.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-6">
          {filtered.map((item, i) => {
            // Alternate layout patterns for visual interest
            const spanClass = getColSpan(i, filtered.length);
            const aspectClass = getAspect(i, filtered.length);

            return (
              <div
                key={i}
                className={`${spanClass} group cursor-pointer`}
              >
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden ${aspectClass} mb-4 border border-[#7F6456]/15`}
                >
                  <Image
                    src={item.image_url}
                    alt={item.caption || `Portfolio project ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#1a1a1a]/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Meta */}
                <div className="flex justify-between items-end">
                  <div>
                    {(item.category || item.year) && (
                      <span className="block text-[10px] tracking-[0.2em] uppercase text-[#7F6456] font-semibold mb-1">
                        {[item.category, item.year].filter(Boolean).join(" • ")}
                      </span>
                    )}
                    {item.caption && (
                      <h3 className="text-base md:text-lg font-light uppercase tracking-wide text-[#1a1a1a]">
                        {item.caption}
                      </h3>
                    )}
                  </div>
                  {/* Arrow indicator */}
                  <span className="text-[#7F6456] text-xl font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 flex-shrink-0">
                    ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto mt-16 flex justify-center">
        <div className="w-px h-16 bg-[#7F6456]/20" />
      </div>
    </section>
  );
}

/** Returns Tailwind col-span classes to create an asymmetric editorial grid */
function getColSpan(i: number, total: number): string {
  if (total === 1) return "md:col-span-12";
  if (total === 2) return "md:col-span-6";

  const pattern = [
    "md:col-span-8", // 0 – large feature
    "md:col-span-4", // 1 – narrow portrait
    "md:col-span-5", // 2 – square
    "md:col-span-7", // 3 – landscape
    "md:col-span-4", // 4
    "md:col-span-8", // 5 – wide landscape
    "md:col-span-6", // 6
    "md:col-span-6", // 7
  ];
  return pattern[i % pattern.length];
}

/** Returns Tailwind aspect-ratio classes */
function getAspect(i: number, total: number): string {
  if (total <= 2) return "aspect-video";

  const aspects = [
    "aspect-video",         // 0
    "aspect-[3/4]",         // 1
    "aspect-square",        // 2
    "aspect-[4/3]",         // 3
    "aspect-square",        // 4
    "aspect-[16/8]",        // 5
    "aspect-[4/5]",         // 6
    "aspect-video",         // 7
  ];
  return aspects[i % aspects.length];
}

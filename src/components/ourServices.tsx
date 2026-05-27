"use client";

/**
 * OurServices — rebuilt from Stitch design system:
 * "Liminal Arc Interiors" (ID: 5524949917452636782)
 * Screen: "Full Portfolio Gallery" (ID: 4355f244dcab4d5b8acfd83ad4c56364)
 *
 * Design tokens (DARK mode):
 *  background          #131313
 *  surface-container   #1f2020
 *  primary (text)      #c8c6c5
 *  on-surface          #e4e2e1
 *  on-surface-variant  #c4c7c7
 *  secondary (gold)    #e8c178
 *  outline-variant     #444748
 *  outline             #8e9192
 *
 *  Headline font: Epilogue 300 → var(--font-epilogue)
 *  Body / Label font: Manrope 400/600 → var(--font-manrope)
 *  Both fonts are loaded in layout.tsx via next/font/google
 */

import { Service } from "@/types/type";
import { generateSlug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ─── Design tokens (exactly from Stitch "Liminal Arc Interiors") ──────────────
const T = {
  bg: "#131313",
  surface: "#131313",
  surfaceContainer: "#1f2020",
  surfaceContainerHigh: "#2a2a2a",
  surfaceContainerHighest: "#353535",
  onSurface: "#e4e2e1",
  onSurfaceVariant: "#c4c7c7",
  primary: "#c8c6c5",          // primary text / headings
  primaryContainer: "#1a1a1a", // dark card fill
  secondary: "#e8c178",        // champagne gold accent
  onSecondary: "#412d00",
  outlineVariant: "#444748",
  outline: "#8e9192",
  // CSS vars from next/font/google (loaded in layout.tsx)
  fontEpilogue: "var(--font-epilogue), sans-serif",
  fontManrope: "var(--font-manrope), sans-serif",
};

// ─── Filter tabs ──────────────────────────────────────────────────────────────
const FILTERS = [
  "ALL SERVICES",
  "DESIGN",
  "ENGINEERING",
  "FIT-OUT",
  "APPROVALS",
] as const;
type FilterKey = (typeof FILTERS)[number];

function getCategory(name: string): FilterKey {
  const n = name.toLowerCase();
  if (n.includes("interior") || n.includes("architectural") || n.includes("3d") || n.includes("landscap")) return "DESIGN";
  if (n.includes("mep") || n.includes("civil") || n.includes("engineer")) return "ENGINEERING";
  if (n.includes("fit") || n.includes("carpentry") || n.includes("wood") || n.includes("joinery")) return "FIT-OUT";
  if (n.includes("approval") || n.includes("authorit")) return "APPROVALS";
  return "DESIGN";
}

// ─── Asymmetric 12-col grid layout (mirrors Stitch pattern exactly) ───────────
const LAYOUT: { col: string; aspect: string; offset?: string }[] = [
  { col: "md:col-span-8", aspect: "aspect-[16/9]" },
  { col: "md:col-span-4", aspect: "aspect-[3/4]",  offset: "md:mt-24" },
  { col: "md:col-span-5", aspect: "aspect-square" },
  { col: "md:col-span-7", aspect: "aspect-[4/3]",  offset: "md:-mt-12" },
  { col: "md:col-span-4", aspect: "aspect-square" },
  { col: "md:col-span-8", aspect: "aspect-[16/8]" },
  { col: "md:col-span-6", aspect: "aspect-[4/5]" },
  { col: "md:col-span-6", aspect: "aspect-video" },
];

// ─── Individual service card ──────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const router = useRouter();
  const layout = LAYOUT[index % LAYOUT.length];
  const slug = generateSlug(service.service_name);
  const cat = getCategory(service.service_name);
  const imgUrl = service.cover_image?.image_url || "";

  return (
    <div
      className={`${layout.col} ${layout.offset ?? ""} group cursor-pointer`}
      onClick={() => router.push(`/ourservices/${slug}`)}
    >
      {/* ── Image container ── */}
      <div
        className={`relative overflow-hidden ${layout.aspect} mb-5`}
        style={{ border: `1px solid ${T.secondary}33` }} // gold at 20% opacity
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={service.service_name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : (
          <div style={{ background: `linear-gradient(135deg, ${T.surfaceContainerHigh}, ${T.surfaceContainerHighest})` }} className="absolute inset-0" />
        )}
        {/* Veil — lifts on hover (Stitch: bg-neutral-950/20 → transparent) */}
        <div
          className="absolute inset-0 transition-colors duration-500 group-hover:opacity-0"
          style={{ background: "rgba(19,19,19,0.25)" }}
        />
      </div>

      {/* ── Meta row ── */}
      <div className="flex justify-between items-end">
        <div>
          {/* label-caps: Manrope 11px 600 tracking-[0.15em] */}
          <span
            className="block mb-2 uppercase"
            style={{
              fontFamily: T.fontManrope,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              lineHeight: "16px",
              color: T.secondary,
            }}
          >
            {cat}
          </span>
          {/* headline-md: Epilogue 32px 300 */}
          <h3
            className="uppercase"
            style={{
              fontFamily: T.fontEpilogue,
              fontSize: "clamp(18px, 2vw, 28px)",
              fontWeight: 300,
              letterSpacing: "0em",
              lineHeight: "1.25",
              color: T.primary,
            }}
          >
            {service.service_name}
          </h3>
        </div>
        {/* Arrow — Stitch: north_east icon in secondary color */}
        <span
          className="text-2xl font-light opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 ml-4 flex-shrink-0"
          style={{ color: T.secondary }}
        >
          ↗
        </span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function OurServices({ data }: { data: Service[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL SERVICES");

  const filtered =
    activeFilter === "ALL SERVICES"
      ? data
      : data.filter((s) => getCategory(s.service_name) === activeFilter);

  return (
    <div style={{ background: T.bg, color: T.onSurface }} className="min-h-screen overflow-hidden">

      {/* ══════════════════════════════════════════════
          HERO HEADER
          Stitch: <header class="px-12 py-24 max-w-7xl">
              <h1 class="font-display-xl text-display-xl uppercase text-primary">
                  Curated Works
      ══════════════════════════════════════════════ */}
      <header className="px-6 md:px-12 pt-20 pb-16 md:pt-24 md:pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8">
            {/* Eyebrow label */}
            <span
              className="block mb-8 uppercase"
              style={{
                fontFamily: T.fontManrope,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                color: T.secondary,
              }}
            >
              What We Do
            </span>

            {/* display-xl: Epilogue 80px 300, tracking -0.02em */}
            <h1
              className="uppercase mb-8 leading-none"
              style={{
                fontFamily: T.fontEpilogue,
                fontSize: "clamp(52px, 7vw, 80px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: "90px",
                color: T.primary,
              }}
            >
              Our<br />Services
            </h1>

            {/* Gold rule — Stitch: <div class="h-px w-24 bg-secondary mb-8"> */}
            <div
              className="mb-8"
              style={{ height: "1px", width: "96px", background: T.secondary }}
            />

            {/* Subtitle — headline-md: Epilogue 32px 300 in on-surface-variant */}
            <p
              className="max-w-2xl"
              style={{
                fontFamily: T.fontEpilogue,
                fontSize: "clamp(16px, 2vw, 32px)",
                fontWeight: 300,
                lineHeight: "40px",
                letterSpacing: "0em",
                color: T.onSurfaceVariant,
              }}
            >
              A synthesis of parametric fluidity and architectural precision.
              We craft spatial narratives for the most discerning clients.
            </p>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          FILTER BAR
          Stitch: <section class="px-12 mb-16 max-w-7xl">
              <div class="flex flex-wrap gap-8 border-b border-outline-variant/30 pb-4">
      ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 mb-14 max-w-7xl mx-auto">
        <div
          className="flex flex-wrap gap-4 md:gap-8 pb-4"
          style={{ borderBottom: `1px solid ${T.outlineVariant}4D` }} // 30% opacity
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="transition-colors duration-300 pb-4 -mb-[17px] z-10"
              style={
                activeFilter === f
                  ? {
                      fontFamily: T.fontManrope,
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.25em",
                      color: T.secondary,
                      borderBottom: `1px solid ${T.secondary}`,
                    }
                  : {
                      fontFamily: T.fontManrope,
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.25em",
                      color: T.onSurfaceVariant,
                    }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROJECT GRID
          Stitch: <section class="px-12 pb-32 max-w-7xl">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8">
      ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div
            className="py-24 text-center uppercase"
            style={{
              fontFamily: T.fontManrope,
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: T.outline,
            }}
          >
            No services in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-8">
            {filtered.map((service, i) => (
              <ServiceCard key={service.service_id} service={service} index={i} />
            ))}

            {/* Vertical breath divider (Stitch: col-span-12 hidden md:block) */}
            {filtered.length > 4 && (
              <div className="hidden md:block col-span-12 py-10">
                <div style={{ width: "1px", height: "128px", background: `${T.secondary}4D` }} />
              </div>
            )}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
          Stitch: <section class="bg-primary-container py-32 border-t border-secondary/20">
              <h2 class="font-headline-lg text-headline-lg uppercase text-primary">
                  Ready to start your journey?
              <button class="border border-secondary text-secondary px-12 py-5">
                  BOOK A CONSULTATION
      ══════════════════════════════════════════════ */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          background: T.primaryContainer,
          borderTop: `1px solid ${T.secondary}33`,
        }}
      >
        {/* Ghost decorative letter (Stitch: material-symbols at 5% opacity) */}
        <span
          aria-hidden
          className="absolute -right-8 -top-8 font-light uppercase leading-none select-none pointer-events-none"
          style={{
            fontFamily: T.fontEpilogue,
            fontSize: "clamp(160px, 22vw, 300px)",
            fontWeight: 300,
            color: `${T.secondary}0D`, // 5% opacity
          }}
        >
          A
        </span>

        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto text-center">
          {/* headline-lg: Epilogue 48px 300 tracking-wider */}
          <h2
            className="uppercase mb-12 tracking-wider"
            style={{
              fontFamily: T.fontEpilogue,
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 300,
              lineHeight: "56px",
              letterSpacing: "-0.01em",
              color: T.primary,
            }}
          >
            Ready to start your journey?
          </h2>

          {/* Secondary ghost button — 1px gold border, gold text */}
          <Link href="/contact">
            <button
              className="inline-block px-12 py-5 uppercase transition-all duration-500"
              style={{
                fontFamily: T.fontManrope,
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                border: `1px solid ${T.secondary}`,
                color: T.secondary,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = T.secondary;
                (e.currentTarget as HTMLButtonElement).style.color = T.onSecondary;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = T.secondary;
              }}
            >
              BOOK A CONSULTATION
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

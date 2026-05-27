"use server";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Service } from "@/types/type";
import { PostgrestResponse } from "@supabase/supabase-js";
import { generateSlug } from "@/lib/utils";
import Imagecom from "./imagecom";

// ─── Design tokens — "Liminal Arc Interiors" DARK system ─────────────────────
const T = {
  bg:                     "#131313",
  surfaceContainerLowest: "#0e0e0e",
  surfaceContainerLow:    "#1b1c1c",
  surfaceContainer:       "#1f2020",
  surfaceContainerHigh:   "#2a2a2a",
  onSurface:              "#e4e2e1",
  onSurfaceVariant:       "#c4c7c7",
  primary:                "#c8c6c5",
  primaryContainer:       "#1a1a1a",
  secondary:              "#e8c178",   // champagne gold
  onSecondary:            "#412d00",
  outlineVariant:         "#444748",
  outline:                "#8e9192",
  ep:  "var(--font-epilogue), sans-serif",
  mn:  "var(--font-manrope), sans-serif",
};

type tParams = Promise<{ services: string }>;

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: tParams }) {
  const paramService = decodeURIComponent((await params)?.services || "");

  const { data: allServices } = await supabase.from("services").select("service_name");
  const matchedService = allServices?.find(
    (s) => generateSlug(s.service_name) === paramService || s.service_name === paramService
  );
  if (!matchedService) return notFound();
  const serviceName = matchedService.service_name;

  if (serviceName.toLowerCase().includes("mep") || serviceName.toLowerCase() === "mep drawings") {
    return {
      title: "Top MEP Companies in Dubai | Design & Drawings in UAE",
      description: "Liminal Arc is one of the top MEP companies in Dubai offering professional MEP drawings in UAE with high-quality design, engineering, and project management services.",
      alternates: { canonical: `https://www.liminalarcinteriors.com/ourservices/${generateSlug(serviceName)}` },
    };
  }
  if (serviceName.toLowerCase() === "carpentry & woodworks" || serviceName.toLowerCase() === "carpentry and woodworks") {
    return {
      title: "Carpentry & Woodworks – Liminal Arc UAE",
      description: "Custom woodwork crafted with detail, elegance, and function. We design and fabricate furniture and fixtures that elevate your space.",
      alternates: { canonical: `https://www.liminalarcinteriors.com/ourservices/${generateSlug(serviceName)}` },
    };
  }
  if (serviceName.toLowerCase() === "approvals and authorities" || serviceName.toLowerCase() === "approvals & authorities") {
    return {
      title: "Approvals and Authorities – Liminal Arc UAE",
      description: "We specialize in delivering carpentry and joinery works that fully comply with local authority regulations and building management standards across the UAE.",
      alternates: { canonical: `https://www.liminalarcinteriors.com/ourservices/${generateSlug(serviceName)}` },
    };
  }

  const { data, error } = await supabase.from("services").select("*").eq("service_name", serviceName).single();
  if (error || !data) return notFound();

  const imageUrl = data.cover_image?.image_url || "/default-og.jpg";
  return {
    title: `${data.service_name} – Liminal Arc UAE`,
    description: data.description || `Explore ${data.service_name} services by Liminal Arc in the UAE.`,
    alternates: { canonical: `https://www.liminalarcinteriors.com/ourservices/${generateSlug(serviceName)}` },
    openGraph: {
      title: `${data.service_name} – Liminal Arc UAE`,
      description: data.description,
      url: `https://www.liminalarcinteriors.com/ourservices/${generateSlug(serviceName)}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: data.service_name }],
    },
  };
}

// ─── Process steps derived from Stitch design ────────────────────────────────
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Spatial Alchemy",
    body: "Discovery and conceptualisation where we distil your vision into a cohesive architectural language. We explore the tension between function and aesthetic form.",
    cta: "EXPLORE CONCEPT",
  },
  {
    num: "02",
    title: "Precision Engineering",
    body: "Technical development and design iteration. Every joint, seam, and fixture is engineered with mathematical rigour for absolute structural integrity.",
    cta: "VIEW BLUEPRINTS",
  },
  {
    num: "03",
    title: "Masterful Execution",
    body: "Bespoke craftsmanship and turnkey delivery. Our site teams execute the design with uncompromising attention to detail for a flawless final result.",
    cta: "FINAL DELIVERY",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function page({ params }: { params: tParams }) {
  const paramService = decodeURIComponent((await params)?.services || "");

  const { data: allServicesList } = await supabase.from("services").select("service_name");
  const matchedServiceObj = allServicesList?.find(
    (s) => generateSlug(s.service_name) === paramService || s.service_name === paramService
  );
  if (!matchedServiceObj) notFound();
  const services = matchedServiceObj.service_name;

  const { data, error } = (await supabase
    .from("services")
    .select("*,sub_services(*),reviews(*)")
    .eq("service_name", services)
    .eq("reviews.showOnLanding", true)) as PostgrestResponse<Service>;

  if (error || !data || data.length === 0) notFound();
  const serviceData = data[0];

  const coverImg = serviceData.cover_image?.image_url || "";
  const galleryImages = serviceData.images || [];

  return (
    <div style={{ background: T.bg, color: T.onSurface, fontFamily: T.mn }} className="min-h-screen overflow-x-hidden">

      {/* ══════════════════════════════════════════
          BREADCRUMB NAV
      ══════════════════════════════════════════ */}
      <div className="px-6 md:px-16 pt-6" style={{ borderBottom: `1px solid ${T.outlineVariant}33` }}>
        <nav
          className="flex items-center gap-2 pb-4"
          style={{ fontFamily: T.mn, fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: T.outline }}
        >
          <Link href="/" className="hover:opacity-100 transition-opacity" style={{ color: T.outline }}>HOME</Link>
          <span style={{ color: T.outlineVariant }}>›</span>
          <Link href="/ourservices" className="hover:opacity-100 transition-opacity" style={{ color: T.outline }}>SERVICES</Link>
          <span style={{ color: T.outlineVariant }}>›</span>
          <span style={{ color: T.secondary }}>{serviceData.service_name.toUpperCase()}</span>
        </nav>
      </div>

      {/* ══════════════════════════════════════════
          HERO — full-screen, clipped bottom
          Stitch: <section class="relative h-screen ... hero-clip">
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full flex items-center justify-start overflow-hidden"
        style={{
          height: "92vh",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
        }}
      >
        {/* Cover image */}
        {coverImg ? (
          <Image
            src={coverImg}
            alt={serviceData.service_name}
            fill
            priority
            className="object-cover"
            style={{ filter: "brightness(0.4) grayscale(20%)" }}
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${T.surfaceContainerHigh}, ${T.surfaceContainerLow})` }} />
        )}

        {/* Decorative vertical gold line — right side */}
        <div
          className="absolute right-16 bottom-0 hidden md:block"
          style={{ width: "1px", height: "256px", background: `${T.secondary}4D` }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 md:px-16 max-w-4xl pt-10">
          {/* Gold rule */}
          <div style={{ height: "1px", width: "96px", background: T.secondary, marginBottom: "32px" }} />

          {/* display-xl: Epilogue 80px 300 */}
          <h1
            className="uppercase mb-6 leading-none"
            style={{
              fontFamily: T.ep,
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: T.onSurface,
            }}
          >
            {serviceData.service_name}
          </h1>

          {/* Subtitle in gold — headline-md */}
          <p
            className="max-w-2xl"
            style={{
              fontFamily: T.ep,
              fontSize: "clamp(18px, 2vw, 32px)",
              fontWeight: 300,
              lineHeight: "40px",
              color: `${T.secondary}CC`, // 80% opacity
            }}
          >
            {serviceData.description?.split(".")[0] || "Transforming abstract concepts into tangible architectural masterpieces."}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICE OVERVIEW
          Stitch: 5-col heading + 7-col description + feature bullets
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left: Gold headline + vertical line */}
          <div className="md:col-span-5">
            <h2
              className="mb-8"
              style={{
                fontFamily: T.ep,
                fontSize: "clamp(32px, 3vw, 48px)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
                lineHeight: "56px",
                color: T.secondary,
              }}
            >
              Bespoke<br />Mastery
            </h2>
            {/* Vertical gold line — hidden on mobile */}
            <div className="hidden md:block" style={{ width: "1px", height: "128px", background: T.secondary }} />
          </div>

          {/* Right: Body + feature bullets */}
          <div className="md:col-span-7 space-y-8">
            {serviceData.description && (
              <p
                style={{
                  fontFamily: T.ep,
                  fontSize: "clamp(16px, 1.6vw, 28px)",
                  fontWeight: 300,
                  lineHeight: "40px",
                  color: T.onSurface,
                }}
              >
                {serviceData.description}
              </p>
            )}

            {/* Feature bullets from sub-service names (Stitch: 2-col grid) */}
            {serviceData.sub_services?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                {serviceData.sub_services.slice(0, 4).map((sub, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-4">
                      {/* Gold square bullet */}
                      <span style={{ width: "8px", height: "8px", background: T.secondary, flexShrink: 0, display: "inline-block" }} />
                      <h4 style={{ fontFamily: T.mn, fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: T.secondary }}>
                        {sub.sub_service_name?.toUpperCase()}
                      </h4>
                    </div>
                    {sub.features?.length > 0 && (
                      <p style={{ fontFamily: T.mn, fontSize: "14px", fontWeight: 400, lineHeight: "24px", color: `${T.onSurface}B3` }}>
                        {sub.features.slice(0, 3).join(" · ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THE PROCESS — 3 numbered phases
          Stitch: <section class="bg-surface-container-low py-32 ...">
      ══════════════════════════════════════════ */}
      <section style={{ background: T.surfaceContainerLow }} className="px-6 md:px-16 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <h2
            className="mb-14 md:mb-16 tracking-[0.3em]"
            style={{ fontFamily: T.mn, fontSize: "11px", fontWeight: 600, color: T.secondary }}
          >
            THE ARCHITECTURAL ODYSSEY
          </h2>

          {/* 3-col process grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3"
            style={{ borderTop: `1px solid ${T.secondary}33` }}
          >
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={i}
                className="pt-10 pb-16 group"
                style={{
                  paddingRight: i < 2 ? "48px" : undefined,
                  paddingLeft: i > 0 ? "48px" : undefined,
                  borderRight: i < 2 ? `1px solid ${T.secondary}33` : undefined,
                  borderBottom: undefined,
                }}
              >
                {/* Ghost number */}
                <span
                  className="block mb-6"
                  style={{
                    fontFamily: T.ep,
                    fontSize: "48px",
                    fontWeight: 300,
                    color: `${T.onSurface}1A`, // 10% opacity
                    transition: "color 300ms",
                  }}
                >
                  {step.num}
                </span>
                <h3
                  className="uppercase mb-5"
                  style={{ fontFamily: T.ep, fontSize: "28px", fontWeight: 300, lineHeight: "40px", color: T.onSurface }}
                >
                  {step.title}
                </h3>
                <p
                  className="mb-8"
                  style={{ fontFamily: T.mn, fontSize: "14px", fontWeight: 400, lineHeight: "24px", color: `${T.onSurface}99` }}
                >
                  {step.body}
                </p>
                <div
                  className="flex items-center gap-2"
                  style={{ fontFamily: T.mn, fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: T.secondary }}
                >
                  {step.cta} →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY — Related Works
          Stitch: <section class="py-32 px-margin"> 2-col grid
      ══════════════════════════════════════════ */}
      {galleryImages.length > 0 && (
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex justify-between items-end mb-14">
            <div>
              <h2
                className="uppercase mb-3"
                style={{ fontFamily: T.ep, fontSize: "clamp(28px, 3vw, 48px)", fontWeight: 300, letterSpacing: "-0.01em", color: T.onSurface }}
              >
                Our Work
              </h2>
              <div style={{ height: "3px", width: "80px", background: T.secondary }} />
            </div>
            <Link
              href="/ourservices"
              style={{ fontFamily: T.mn, fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: T.secondary }}
              className="hover:opacity-70 transition-opacity"
            >
              ALL SERVICES ↗
            </Link>
          </div>

          {/* Image grid — mirrors Stitch 2-col with hover overlay */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.slice(0, 6).map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden"
                style={{
                  aspectRatio: i === 0 ? "16/10" : i % 3 === 2 ? "16/10" : "16/10",
                }}
              >
                <Image
                  src={img.image_url || ""}
                  alt={`${serviceData.service_name} project ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 transition-colors duration-300"
                  style={{ background: "rgba(0,0,0,0.35)" }}
                />
                {/* Hover reveal — gold underline animation */}
                <div
                  className="absolute bottom-0 left-0 w-full p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <p style={{ fontFamily: T.mn, fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: T.secondary, marginBottom: "4px" }}>
                    {serviceData.service_name.toUpperCase()}
                  </p>
                  <div
                    className="group-hover:w-full transition-all duration-500"
                    style={{ height: "1px", width: 0, background: T.secondary }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          CLIENT REVIEWS (existing Imagecom component)
      ══════════════════════════════════════════ */}
      {!!serviceData?.reviews?.length && (
        <section className="px-6 md:px-16 py-16" style={{ background: T.surfaceContainerLow }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-baseline gap-4 mb-12">
              <h2
                className="uppercase"
                style={{ fontFamily: T.ep, fontSize: "clamp(24px, 2.5vw, 40px)", fontWeight: 300, color: T.onSurface }}
              >
                ProjectNest
              </h2>
              <span style={{ color: T.outlineVariant }}>—</span>
              <p style={{ fontFamily: T.mn, fontSize: "14px", color: T.onSurfaceVariant }}>
                A collective showcase of our completed works.
              </p>
            </div>
            <Imagecom data={serviceData} />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          INQUIRY CTA
          Stitch: dotted gold background + form
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 px-6 md:px-16 relative overflow-hidden"
        style={{ background: T.surfaceContainerLowest }}
      >
        {/* Gold dot texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${T.secondary} 0.5px, transparent 0.5px)`, backgroundSize: "24px 24px" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="uppercase mb-4"
            style={{ fontFamily: T.ep, fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 300, letterSpacing: "-0.02em", color: T.onSurface }}
          >
            Begin Your Narrative
          </h2>
          <p style={{ fontFamily: T.mn, fontSize: "14px", color: `${T.onSurface}99`, marginBottom: "48px" }}>
            Allow our designers to craft your next masterpiece.
          </p>

          <Link href="/contact">
            <button
              className="px-12 py-4 uppercase transition-all duration-500 hover:bg-[#e8c178] hover:text-[#412d00]"
              style={{
                fontFamily: T.mn,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                border: `1px solid ${T.secondary}`,
                color: T.secondary,
                background: "transparent",
              }}
            >
              INITIATE CONSULTATION
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { DrawerNav } from "./navDrawer";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  const isPath = pathname === "/";

  const paths = [
    // { title: "Portfolio", href: "/projects" },
    { title: "Services", href: "/ourservices" },
    { title: "Inquiry", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Keep navbar visible on scroll, but background transitions can happen
      setShowNavbar(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 h-20 bg-[#1A1A1A]/90 backdrop-blur-md border-b border-[#C4A05A]/20 z-50 flex justify-between items-center px-6 md:px-12"
          >
            {/* Logo Brand */}
            <div className="flex items-center">
              <Link href={"/"}>
                <div className="text-xl font-light tracking-tighter text-[#F5F0E8] font-headline">
                  Liminal Arc <span className="font-bold text-[#C4A05A]">Interiors</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-10">
              <ul className="flex items-center gap-10">
                {paths.map((data, index) => (
                  <li key={`${index + "nav"}`}>
                    <Link
                      href={data.href}
                      className={`font-headline uppercase tracking-[0.3em] text-[10px] font-medium transition-all ${
                        pathname === data.href
                          ? "text-[#C4A05A]"
                          : "text-[#F5F0E8] opacity-70 hover:opacity-100 hover:text-[#C4A05A]"
                      }`}
                    >
                      {data.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button & Mobile Drawer */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden sm:block font-headline uppercase tracking-[0.2em] text-[10px] font-semibold text-[#1A1A1A] bg-[#C4A05A] px-6 py-3 scale-100 hover:bg-[#F5F0E8] active:scale-95 transition-all"
              >
                Consultation
              </Link>

              <div className="lg:hidden text-[#F5F0E8]">
                <DrawerNav />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

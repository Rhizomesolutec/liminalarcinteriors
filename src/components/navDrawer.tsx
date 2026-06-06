"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function DrawerNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home",     href: "/" },
    { name: "Services", href: "/ourservices" },
    { name: "Projects", href: "/projects" },
    { name: "About",    href: "/#about" },
    { name: "Contact",  href: "/contact" },
  ];

  const socialLinks = [
    {
      url: "https://www.facebook.com/profile.php?id=61573591764228",
      icon: "/icons8-facebook-48.svg",
      alt: "Facebook",
    },
    {
      url: "https://www.instagram.com/liminalarc.interiors?igsh=eXN1aW1ubDMybnow",
      icon: "/icons8-instagram-logo.svg",
      alt: "Instagram",
    },
    {
      url: "https://www.linkedin.com/company/liminalarcinteriors/",
      icon: "/icons8-linkedin-logo.svg",
      alt: "LinkedIn",
    },
  ];

  return (
    <>
      {/* ── Hamburger Trigger ─────────────────────────────────────── */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="relative z-50 flex flex-col justify-center gap-[5px] p-2 group"
      >
        {/* Three gold lines — replaces the generic SVG hamburger */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-px bg-[#e8c178] origin-left"
            style={{ width: i === 1 ? 20 : 14 }}
            whileHover={{ width: 20 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.button>

      {/* ── Full-Screen Overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] z-50 flex flex-col"
              style={{
                backgroundColor: "#131313",
                borderLeft: "1px solid rgba(232,193,120,0.15)",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "none",
              }}
            >
              {/* Gold top accent line */}
              <div className="h-px w-full bg-[#e8c178]/40" />

              {/* Header row: brand + close */}
              <div className="flex items-center justify-between px-10 py-7 border-b border-[#e8c178]/10">
                <span
                  className="font-[Epilogue] font-light text-[22px] tracking-tight text-[#e8c178]"
                >
                  LIMINAL ARC
                </span>

                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-10 h-10 border border-[#e8c178]/30 flex items-center justify-center text-[#e8c178] hover:border-[#e8c178] hover:bg-[#e8c178]/5 transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-10">
                <ul className="flex flex-col gap-1">
                  {navLinks.map(({ name, href }, index) => (
                    <motion.li
                      key={name}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.15 + index * 0.08,
                        duration: 0.45,
                        type: "spring",
                        stiffness: 120,
                      }}
                      className="border-b border-[#e8c178]/10 last:border-b-0"
                    >
                      <Link
                        href={href}
                        onClick={handleLinkClick}
                        className="group flex items-center justify-between py-5 text-[#e4e2e1]/50 hover:text-[#e8c178] transition-colors duration-300"
                      >
                        {/* Index label */}
                        <span className="font-[Manrope] text-[10px] font-semibold tracking-[0.2em] text-[#e8c178]/30 group-hover:text-[#e8c178]/60 transition-colors w-8">
                          0{index + 1}
                        </span>

                        {/* Link name */}
                        <span className="flex-1 font-[Epilogue] font-light text-[36px] leading-none tracking-[-0.01em] uppercase group-hover:text-[#e8c178] transition-colors duration-300">
                          {name}
                        </span>

                        {/* Arrow indicator */}
                        <motion.span
                          className="text-[#e8c178]/0 group-hover:text-[#e8c178] font-[Manrope] text-[11px] tracking-[0.15em]"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer: socials + label */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="px-10 py-8 border-t border-[#e8c178]/10 flex items-center justify-between"
              >
                {/* Social links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      key={`social-${index}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 border border-[#e8c178]/20 flex items-center justify-center hover:border-[#e8c178]/60 hover:bg-[#e8c178]/5 transition-all duration-300"
                      >
                        <Image
                          src={item.icon}
                          alt={item.alt}
                          width={16}
                          height={16}
                        />
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Right label */}
                <span className="font-[Manrope] text-[10px] font-semibold tracking-[0.2em] uppercase text-[#e4e2e1]/20">
                  Follow Us
                </span>
              </motion.div>

              {/* Gold bottom accent line */}
              <div className="h-px w-full bg-[#e8c178]/40" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
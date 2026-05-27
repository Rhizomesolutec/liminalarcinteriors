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

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="relative z-50"
      >
        <svg
          className="block size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </motion.button>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.3
              }}
              className="fixed top-0 right-0 bottom-0 w-full bg-[#1a1a1a] z-50 flex flex-col"
              style={{
                // iOS specific fixes
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'none'
              }}
            >
              {/* Header with Close Button */}
              <div className="flex justify-end p-4">
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white hover:text-[#D4AF37] rounded-full transition-colors"
                  aria-label="Close navigation menu"
                >
                  <svg
                    className="size-10"
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

              {/* Navigation Menu */}
              <nav className="flex-1 flex items-center justify-center px-6">
                <ul className="flex w-full flex-col gap-8 items-center text-center">
                  {[
                    { name: "Home", href: "/" },
                    { name: "Services", href: "/ourservices" },
                    // { name: "Blogs", href: "/#blogs" },
                    { name: "Projects", href: "/projects" },
                    { name: "About", href: "/#about" },
                    { name: "Contact", href: "/contact" },
                  ].map(({ name, href }, index) => (
                    <motion.li
                      key={name}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.2 + index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <Link
                        href={href}
                        className="block text-2xl font-medium text-[#FFFFF0] uppercase tracking-wider hover:text-[#D4AF37] transition-colors py-2 relative"
                        onClick={handleLinkClick}
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="block"
                        >
                          {name}
                        </motion.span>
                        <motion.div
                          className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#7F6456]"
                          whileHover={{
                            width: "100%",
                            x: "-50%",
                            transition: { duration: 0.3 },
                          }}
                        />
                      </Link>
                    </motion.li>
                  ))}
                  
                  {/* Social Media Icons */}
                  <motion.div 
                    className="flex justify-between items-center gap-4 mt-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    {[
                      {
                        url: "https://www.facebook.com/profile.php?id=61573591764228",
                        icon: "/icons8-facebook-48.svg",
                        alt: "Facebook"
                      },
                      {
                        url: "https://www.instagram.com/liminalarc.interiors?igsh=eXN1aW1ubDMybnow",
                        icon: "/icons8-instagram-logo.svg",
                        alt: "Instagram"
                      },
                      {
                        url: "https://www.linkedin.com/company/liminalarcinteriors/",
                        icon: "/icons8-linkedin-logo.svg",
                        alt: "LinkedIn"
                      },
                    ].map((item, index) => (
                      <Link
                        key={`social-link-${index}`}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2"
                        >
                          <Image
                            src={item.icon}
                            alt={item.alt}
                            width={30}
                            height={30}
                          />
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
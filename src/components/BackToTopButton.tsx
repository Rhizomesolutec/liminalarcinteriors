"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="backToTop"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          whileHover={{ 
            scale: 1.1, 
            y: -5,
            boxShadow: "0 20px 40px rgba(127, 100, 86, 0.4)" 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
          className="fixed bottom-8 left-8 cursor-pointer z-50 w-14 h-14 rounded-full 
                     bg-gradient-to-br from-[#7F6456] via-[#A0845C] to-[#C4A47C]
                     text-white font-bold text-lg
                     shadow-xl hover:shadow-2xl
                     backdrop-blur-sm bg-opacity-95
                     border border-[#7F6456]/30
                     flex items-center justify-center
                     group transition-all duration-300
                     before:absolute before:inset-0 before:rounded-full 
                     before:bg-gradient-to-br before:from-white/15 before:to-[#7F6456]/10
                     before:opacity-0 hover:before:opacity-100 before:transition-opacity"
        >
          <motion.span
            className="relative z-10 text-4xl"
            animate={{ y: [0, -2, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            ↑
          </motion.span>
          
          {/* Ripple effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#7F6456]/20"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ 
              scale: [0, 1.2, 1.5], 
              opacity: [0, 0.4, 0] 
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#C4A47C] rounded-full shadow-sm"
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${40 + i * 10}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
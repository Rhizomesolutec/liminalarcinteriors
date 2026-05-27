"use client"

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Index() {
  const [isMouse, setIsMouse] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const cursorSize = 40;
  const subCursorSize = 8;

  // Set up motion values for the cursor's position
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };
  const subMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Smooth the movement with a spring
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const subSmoothOptions = { damping: 10, stiffness: 1400, mass: 0.2 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };
  const subSmoothMouse = {
    x: useSpring(subMouse.x, subSmoothOptions),
    y: useSpring(subMouse.y, subSmoothOptions),
  };

  // Detect if the device has a fine pointer (i.e. a mouse)
  useEffect(() => {
    if (window.matchMedia("(pointer:fine)").matches) {
      setIsMouse(true);
    }
  }, []);

  // Update cursor position on mouse move
  const manageMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
    subMouse.x.set(clientX - subCursorSize / 2);
    subMouse.y.set(clientY - subCursorSize / 2);
  },  [mouse.x, mouse.y, subMouse.x, subMouse.y] );

  // Hide the cursor if the pointer leaves the window
  const handleMouseOut = useCallback((e: MouseEvent) => {
    if (!e.relatedTarget || (e.relatedTarget as HTMLElement).nodeName === "HTML") {
      setCursorVisible(false);
    }
  }, []);

  // Show the cursor when the mouse re-enters the window
  const handleMouseOver = useCallback(() => {
    setCursorVisible(true);
  }, []);

  useEffect(() => {
    if (isMouse) {
      window.addEventListener("mousemove", manageMouseMove);
      window.addEventListener("mouseout", handleMouseOut);
      window.addEventListener("mouseover", handleMouseOver);
  
      return () => {
        window.removeEventListener("mousemove", manageMouseMove);
        window.removeEventListener("mouseout", handleMouseOut);
        window.removeEventListener("mouseover", handleMouseOver);
      };
    }
  }, [isMouse, manageMouseMove, handleMouseOut, handleMouseOver]);

  // Render the custom cursor only if a mouse is detected and the cursor should be visible
  if (!isMouse || !cursorVisible) return null;

  return (
    <>
      <motion.div
        style={{
          left: smoothMouse.x.get() == 0 ? "-45px" : smoothMouse.x,
          top: smoothMouse.y,
        }}
        className="w-10 h-10 fixed z-50 outline-1 outline-offset-1 outline-black/30 rounded-full pointer-events-none"
      ></motion.div>
      <motion.div
        style={{ left: subSmoothMouse.x, top: subSmoothMouse.y }}
        className="bg-black fixed w-1 z-40 h-1 rounded-full"
      ></motion.div>
    </>
  );
}

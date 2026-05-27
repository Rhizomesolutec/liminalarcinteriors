"use client";
import { ReactNode, useEffect, useRef } from "react";
type AutoScrollSectionProps = {
  children: ReactNode;
};

const AutoScrollSection: React.FC<AutoScrollSectionProps> = ({ children }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={sectionRef}>{children}</div>;
};

export default AutoScrollSection;

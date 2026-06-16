"use client";
import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add('hide-native-cursor');
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check for hoverable elements
    const handleElementHover = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );

      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    // Initial setup and mutation observer for dynamic elements
    handleElementHover();
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('hide-native-cursor');
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  // Smooth follow effect for dot
  useEffect(() => {
    const smoothFollow = () => {
      setDotPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
    };

    const animationFrame = requestAnimationFrame(function animate() {
      smoothFollow();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full border-2 border-[#6b8af6] transition-transform duration-150 ease-out ${
          isHovering ? "scale-150 bg-[#6b8af6]/10" : "scale-100"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          left: position.x - 20,
          top: position.y - 20,
          width: 40,
          height: 40,
        }}
      />
      {/* Inner dot */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full bg-[#3c45b9] transition-transform duration-75 ${
          isHovering ? "scale-0" : "scale-100"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          left: dotPosition.x - 4,
          top: dotPosition.y - 4,
          width: 8,
          height: 8,
        }}
      />
    </>
  );
};

export default CustomCursor;

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Button Hamburger */}
      <button
        className="flex flex-col justify-between w-10 h-8 z-50 relative"
        onClick={toggleMenu}
      >
        <motion.div
          className="w-10 h-1 bg-white rounded origin-left"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-10 h-1 bg-white rounded"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-10 h-1 bg-white rounded origin-left"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Menu */}
      <motion.div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center gap-8 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          Home
        </Link>
        <Link href="/about" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          About
        </Link>
        <Link href="/experience" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          Experience
        </Link>
        <Link href="/portofolio" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          Portfolio
        </Link>
        <Link href="/blog" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          Blog
        </Link>
        <Link href="/contact" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          Contact
        </Link>
      </motion.div>
    </div>
  );
}

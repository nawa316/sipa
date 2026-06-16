"use client";

import { motion } from "framer-motion";

export default function RunningText() {
  return (
    <div className="overflow-hidden whitespace-nowrap text-white">
      <motion.div
        className="inline-block text-xl dm_serif_text"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        🌐 Web Developer & Software Engineer | Information Systems Student | Open To Work
      </motion.div>
    </div>
  );
}

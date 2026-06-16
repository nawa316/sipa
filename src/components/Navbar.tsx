"use client";
import React from "react";
import RunningText from "@/components/RunningText";
import HamburgerMenu from "@/components/HamburgerMenu";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center flex-row justify-center fixed px-6 py-4 top-0 z-50 bg-[#6b8af6]">
      <Link href="/" className="mr-auto content-center justify-center self-center items-center text-3xl font-bold dm_serif_text text-white hover:text-gray-200 transition-colors">
        Awan
      </Link>
      <div className="hidden md:block md:max-w-[400px] lg:max-w-[600px] h-fit border rounded-full border-dashed dm_serif_text">
        <RunningText />
      </div>
      <div className="ml-auto">
        <HamburgerMenu />
      </div>
    </nav>
  );
}

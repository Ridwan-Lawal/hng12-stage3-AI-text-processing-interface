import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";

export default function NavBar() {
  return (
    <nav className="px-6 py-2 h-[13vh] top-0  w-full shadow-sm flex items-center shadow-gray-800">
      {/* logo and text */}
      <div className="flex items-center gap-5">
        {/* logo */}
        <div className="relative h-[60px] w-[50px]">
          <Image
            src={logo}
            alt="logo"
            quality={100}
            priority={true}
            fill
            className="object-contain"
          />
        </div>

        {/* Nav text */}
        <div className="flex flex-col gap-1">
          <h1 className="text-white font-bold text-xl">AI Text Processor</h1>
          <p className="text-gray-400 text-sm">
            Detect, translate, and summarize your text.
          </p>
        </div>
      </div>
    </nav>
  );
}

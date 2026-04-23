"use client";

import { useState } from "react";
import { siteContent } from "../data/content";

export default function ImageCompareSlider() {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden group select-none shadow-xl border border-gray-100">
      {/* After Image (Compressed) - Background */}
      <div className="absolute inset-0 bg-gray-100">
        <img
          src={siteContent.home.slider.compressed.image}
          alt="Compressed Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
          {siteContent.home.slider.compressed.label}
        </div>
      </div>

      {/* Before Image (Original) - Foreground clipped via state */}
      <div
        className="absolute inset-0 bg-gray-200"
        style={{
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      >
        <img
          src={siteContent.home.slider.original.image}
          alt="Original Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
          {siteContent.home.slider.original.label}
        </div>
      </div>

      {/* Invisible Interactive Range Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
      />

      {/* Custom Slider Line & Handle Visuals */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none z-0 flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

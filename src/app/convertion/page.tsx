"use client";

import React, { useState, useCallback } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import { siteContent } from "../../data/content";
import { HowitWorks } from "../../components/HowitWorks";

export default function ConvertionPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState("webp");
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
  });

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    // Logic to trigger PixelPinch Conversion API would go here
    console.log("Converting files to:", format, "with quality:", quality);

    setTimeout(() => {
      setIsProcessing(false);
      alert("Conversion started! (API Integration point)");
    }, 1500);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Convert Your Images
        </h1>
        <p className="text-gray-600">
          Upload, resize, and optimize in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white/50 hover:border-indigo-400"}`}
          >
            <input {...getInputProps()} />
            <div className="text-5xl mb-4">📸</div>
            <p className="text-lg font-medium text-gray-700">
              {isDragActive
                ? "Drop files here..."
                : "Drag & drop images, or click to select"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports PNG, JPG, WebP, GIF
            </p>
          </div>

          {files.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4">
                Selected Files ({files.length})
              </h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                  >
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <span className="text-gray-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Settings & Action */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Target Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="webp">WebP (Recommended)</option>
                <option value="png">PNG</option>
                <option value="jpg">JPEG</option>
                <option value="gif">GIF</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-gray-700">
                  Quality
                </label>
                <span className="text-sm font-medium text-indigo-600">
                  {quality}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleConvert}
                disabled={files.length === 0 || isProcessing}
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg
                  ${
                    files.length === 0 || isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                  }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Convert Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <HowitWorks {...siteContent.home.howItWorks} />
    </main>
  );
}

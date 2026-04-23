"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ConvertionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("webp");
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection via button
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setConvertedUrl(null);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setConvertedUrl(null);
    }
  };

  // API-Based Compression Logic
  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const formData = new FormData();
      // Note: "file" is the standard key. If your Render backend expects
      // something like "image" or "upload", change the string below!
      formData.append("image", file);
      formData.append("format", format);

      const response = await fetch(
        "https://pixel-pinch.onrender.com/optimize",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const blob = await response.blob();
      setConvertedUrl(URL.createObjectURL(blob));
      setConvertedSize(blob.size);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to compress the image. Check the console for details.");
    } finally {
      setIsConverting(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-white/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Compress Your Images
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            Powered by the PixelPinch API for lightning-fast, high-quality cloud
            compression.
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-indigo-300 rounded-2xl bg-white/50 p-12 text-center hover:bg-white/80 transition-colors cursor-pointer group shadow-inner mb-8"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {file ? file.name : "Drag & Drop images here"}
          </h3>
          <p className="text-gray-500 mb-6">
            {file
              ? `Original size: ${formatBytes(file.size)}`
              : "or click to browse your files"}
          </p>
        </div>

        {/* Settings & Action Area */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/40 p-6 rounded-2xl border border-white/50 shadow-sm">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <label className="font-semibold text-gray-800 whitespace-nowrap">
              Output Format:
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="bg-white/80 border border-gray-200 text-gray-800 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto font-medium"
            >
              <option value="webp">WebP (Recommended)</option>
              <option value="jpeg">JPEG (Standard)</option>
              <option value="png">PNG (Lossless)</option>
            </select>
          </div>

          {convertedUrl ? (
            <a
              href={convertedUrl}
              download={`compressed-image.${format}`}
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors text-center"
            >
              Download ({formatBytes(convertedSize || 0)})
            </a>
          ) : (
            <button
              onClick={handleConvert}
              disabled={!file || isConverting}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
            >
              {isConverting ? "Compressing..." : "Start Compression"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Spinner from "../../components/Spinner";
import { siteContent } from "../../data/content";

export default function ConvertionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("webp");
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection via button
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setConvertedUrl(null);
      setConvertedSize(null);
      setErrorMsg(null);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setConvertedUrl(null);
      setConvertedSize(null);
      setErrorMsg(null);
    }
  };

  // Reset the state to upload a new file
  const handleClear = () => {
    setFile(null);
    setConvertedUrl(null);
    setConvertedSize(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // API-Based Compression Logic
  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setErrorMsg(null);

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
        if (response.status === 400) {
          const errorData = await response.json();
          setErrorMsg(
            `Failed to compress the image. ${errorData.error}` ||
              "Invalid request parameters.",
          );
        } else {
          setErrorMsg(`Server responded with status: ${response.status}`);
        }
        // throw new Error(`Server responded with status: ${response.status}`);
      } else {
        const blob = await response.blob();
        setConvertedUrl(URL.createObjectURL(blob));
        setConvertedSize(blob.size);
      }
    } catch (error: any) {
      console.error("Conversion failed:", error);
      setErrorMsg(
        `Failed to compress the image. ${error?.message || ""}. Please try again.`,
      );
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
          <div className="flex flex-col w-full md:w-auto">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <label className="font-semibold text-gray-800 whitespace-nowrap">
                Output Format:
              </label>
              <select
                value={format}
                onChange={(e) => {
                  setFormat(e.target.value);
                  setConvertedUrl(null);
                  setConvertedSize(null);
                }}
                className="bg-white/80 border border-gray-200 text-gray-800 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto font-medium"
              >
                <option value="webp">WebP (Recommended)</option>
                <option value="jpeg">JPEG (Standard)</option>
                <option value="png">PNG (Lossless)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
            {(convertedUrl || errorMsg) && (
              <button
                onClick={handleClear}
                className="flex-1 md:flex-none w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl shadow-lg transition-colors flex items-center justify-center"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleConvert}
              disabled={!file || isConverting}
              className="flex-1 md:flex-none w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors flex items-center justify-center"
            >
              {isConverting ? (
                <>
                  <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Compressing...
                </>
              ) : (
                "Start Compression"
              )}
            </button>

            {convertedUrl && (
              <a
                href={convertedUrl}
                download={`compressed-image.${format}`}
                title={`Download (${formatBytes(convertedSize || 0)})`}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl shadow-lg transition-colors flex items-center justify-center flex-shrink-0"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {convertedUrl && file && convertedSize !== null && (
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/40 p-6 rounded-2xl border border-white/50 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-3 justify-center md:justify-start">
              <p
                className={`text-sm font-medium ${file.size > convertedSize ? "text-green-600" : "text-amber-600"}`}
              >
                Success! Converted to {format.toUpperCase()}.{" "}
                {file.size > convertedSize
                  ? `Reduced by ${formatBytes(file.size - convertedSize)}.`
                  : `Size increased by ${formatBytes(convertedSize - file.size)}.`}
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-xl shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

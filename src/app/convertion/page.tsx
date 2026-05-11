"use client";

import { useState, useRef, Suspense } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Spinner from "../../components/Spinner";
import { API_ENDPOINTS } from "../../data/api";

function ImageConversionContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState(searchParams?.get("format") || "webp");
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection via button
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setConvertedUrl(null);
      setErrorMsg(null);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setConvertedUrl(null);
      setErrorMsg(null);
    }
  };

  // Update format and sync with URL
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFormat = e.target.value;
    setFormat(newFormat);
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("format", newFormat);
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Reset the state to upload a new file
  const handleClear = () => {
    setFile(null);
    setConvertedUrl(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Generate converted image using an actual API call
  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("format", format);

      // Update the URL to point to your actual backend API fetch
      const response = await fetch(API_ENDPOINTS.CONVERT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const convertedBlobUrl = URL.createObjectURL(blob);
      setConvertedUrl(convertedBlobUrl);
    } catch (error: any) {
      console.error("Image conversion failed:", error);
      setErrorMsg(
        `Failed to convert image. ${error?.message || ""}. Please try again.`,
      );
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-white/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Image Converter
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            Easily convert your images between formats like WEBP, PNG, and JPEG.
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {file ? file.name : "Drag & Drop an image here"}
          </h3>
          <p className="text-gray-500 mb-6">
            {file ? "Ready to convert" : "or click to browse your files"}
          </p>
        </div>

        {/* Settings & Action Area */}
        <div className="flex flex-col md:flex-row gap-6 items-end justify-between bg-white/40 p-6 rounded-2xl border border-white/50 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex flex-col gap-1 w-full sm:w-48">
              <label className="text-sm font-semibold text-gray-700">
                Convert To
              </label>
              <select
                value={format}
                onChange={handleFormatChange}
                className="bg-white/80 border border-gray-200 text-gray-800 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full font-medium"
              >
                <option value="webp">WEBP</option>
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="gif">GIF</option>
              </select>
            </div>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            {(convertedUrl || errorMsg || file) && (
              <button
                onClick={handleClear}
                className="flex-1 md:flex-none bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl shadow-lg transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleConvert}
              disabled={!file || isConverting}
              className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors flex items-center justify-center"
            >
              {isConverting ? (
                <>
                  <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                  Converting...
                </>
              ) : (
                "Convert"
              )}
            </button>
          </div>
        </div>

        {/* Result Area */}
        {convertedUrl && (
          <div className="flex flex-col items-center justify-center bg-white/40 p-8 rounded-2xl border border-white/50 shadow-sm animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Your Converted Image
            </h3>
            <div className="relative border-4 border-white shadow-xl rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mb-6 max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={convertedUrl}
                alt="Converted Image"
                className="max-w-full h-auto object-contain"
              />
            </div>
            <a
              href={convertedUrl}
              download={`converted.${format}`}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
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
              Download Image
            </a>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm">
            <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ImageConversionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-20">
          <Spinner className="animate-spin h-8 w-8 text-indigo-600" />
        </div>
      }
    >
      <ImageConversionContent />
    </Suspense>
  );
}

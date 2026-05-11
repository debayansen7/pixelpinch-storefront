"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Uncaught application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-red-50 rounded-2xl border border-red-200 mx-4 my-12 md:mx-auto max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-red-700 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-red-600 mb-8">
        We're sorry for the inconvenience.{" "}
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

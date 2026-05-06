"use client";

import { useEffect } from "react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl font-black text-primary mb-4">Oops!</div>
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tighter mb-4">
          Something went wrong
        </h2>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

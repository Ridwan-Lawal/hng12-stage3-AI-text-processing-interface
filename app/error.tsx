"use client";

import React from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center gap-6 justify-center border h-[80vh] px-6">
      <h1 className="text-2xl font-bold text-white">{error.message}</h1>
      <button
        onClick={reset}
        className="py-3 px-8 text-gray-800 bg-white rounded-md"
      >
        Go back to chat
      </button>
    </div>
  );
}

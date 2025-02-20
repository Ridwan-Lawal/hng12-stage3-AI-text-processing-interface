import React from "react";

export default function NotFound() {
  return (
    <div className="flex items-center gap-5  justify-center h-[75vh] ">
      <h1 className="text-2xl font-bold text-white">404</h1>
      <div className="border-l border-white h-10" />
      <p className="text-lg font-medium text-white">
        Page could not be loaded.
      </p>
    </div>
  );
}

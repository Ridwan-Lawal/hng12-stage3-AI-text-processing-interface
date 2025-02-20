import Spinner from "@/app/_ui/Spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[80vh]  gap-4">
      <Spinner />{" "}
      <p className="text-white font-medium">AI - Text Processing Interface</p>
    </div>
  );
}

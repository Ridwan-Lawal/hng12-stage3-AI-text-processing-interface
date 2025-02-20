"use client";

import React from "react";

interface ResponseChatProps {
  prompt: {
    aiResponse: string;
    promptFrom: string;
    responseType: string;
  };
}

export default function ResponseChat({ prompt }: ResponseChatProps) {
  return (
    <div className="break-all chat space-y-2 self-start">
      <h1 className="text-white text-sm font-medium">
        {prompt?.responseType === "translate"
          ? "Translated Text:"
          : "Summarized Text"}
      </h1>
      <p className="text-[13px] text-gray-100">{prompt?.aiResponse}</p>
    </div>
  );
}

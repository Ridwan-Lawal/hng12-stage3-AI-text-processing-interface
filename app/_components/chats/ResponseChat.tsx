"use client";

import { Dot } from "lucide-react";
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
          : "Summarized Text:"}
      </h1>
      {prompt?.responseType === "translate" ? (
        <p className="text-[13px] text-gray-100">{prompt?.aiResponse}</p>
      ) : (
        <ul className="space-y-2">
          {prompt?.aiResponse.split("*").map((point, id) => (
            <li key={id} className="flex items-start gap-1 text-gray-100">
              <span>
                {" "}
                {id > 0 && <Dot className="size-[18px] text-gray-100 " />}
              </span>{" "}
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

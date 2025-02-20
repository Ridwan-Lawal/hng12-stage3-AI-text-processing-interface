"use client";

import { FileText, Languages } from "lucide-react";
import React, { useEffect, useRef } from "react";

export default function ChatArea() {
  const pageBottomRef = useRef(null);

  useEffect(() => {
    if (pageBottomRef?.current === null) return;
    const pageBottomEl: HTMLDivElement = pageBottomRef?.current;

    function scrollToBottom() {
      pageBottomEl?.scrollIntoView({ behavior: "smooth" });
    }

    scrollToBottom();
  }, []);

  return (
    <div className="border-red-500 h-[68vh] border overflow-auto max-w-[700px] mx-auto">
      {/* each chats */}
      <div className="chat">
        {/* text and detected language  */}
        <div className="chat-text">
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa rem
            facilis voluptate consequatur maxime tenetur! A ipsam, beatae
          </p>

          {/* detected language */}
          <p className="flex items-center gap-2 text-gray-100">
            <Languages className="size-4 " />
            <span className="text-[13px] italic">Detected language: </span>
          </p>
        </div>

        {/* summarize and translate button */}
        <div>
          {/* summarize */}
          <button
            className="btn btn-summarize"
            aria-label="Summarize your texts"
          >
            <FileText className="size-4 text-white" />
            <span>Summarize</span>
          </button>

          <div>
            <select name="languages" id="languages"></select>
            <button
              className="btn btn-translate"
              aria-label="Summarize your texts"
            >
              <Languages className="size-4 " />
              <span>Translate</span>
            </button>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="page-buttom" ref={pageBottomRef} />
    </div>
  );
}

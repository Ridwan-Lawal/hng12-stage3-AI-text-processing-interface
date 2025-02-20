/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Chat from "@/app/_components/chats/Chat";
import ResponseChat from "@/app/_components/chats/ResponseChat";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function ChatArea() {
  const pageBottomRef = useRef<HTMLDivElement | null>(null);
  const prompts = useSelector((store: any) => store?.chats?.prompts);

  useEffect(() => {
    const pageBottomEl = pageBottomRef?.current;
    function scrollToBottom() {
      pageBottomEl?.scrollIntoView({ behavior: "smooth" });
    }

    scrollToBottom();
  }, [prompts.length]);

  return (
    <div className="border-red-500 h-[68vh] border overflow-auto max-w-[700px] mx-auto px-4 flex flex-col gap-5">
      {/* each chats */}
      {prompts?.map((prompt, id) =>
        prompt?.promptFrom === "user" ? (
          <Chat key={id} prompt={prompt} />
        ) : (
          <ResponseChat key={id} prompt={prompt} />
        )
      )}

      {/* bottom */}
      <div className="page-buttom" ref={pageBottomRef} />
    </div>
  );
}

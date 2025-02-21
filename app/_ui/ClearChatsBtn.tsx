"use client";
import { clearAllPrompts } from "@/app/_lib/redux/chatsSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function ClearChatsBtn() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => dispatch(clearAllPrompts())}
        className="bg-white text-gray-800 font-medium rounded-md text-sm py-2 px-4 hover:text-white hover:bg-gray-700 transition-colors ease-in-out"
      >
        Clear chats
      </button>
    </div>
  );
}

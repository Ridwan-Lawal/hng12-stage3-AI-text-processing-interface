"use client";

import React, { useState } from "react";
import { languages } from "@/app/_lib/constant";
import { FileText, Languages } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addPrompts } from "@/app/_lib/redux/chatsSlice";
import MiniSpinner from "@/app/_ui/MiniSpinner";

interface ChatProps {
  prompt: {
    prompt: string;
    languageDetected: string;
  };
}

export default function Chat({ prompt }: ChatProps) {
  const [targetLanguage, setTargetLanguage] = useState<string>("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const dispatch = useDispatch();

  async function handleTranslate() {
    try {
      setIsTranslating(true);
      // Checking if the Translator APi is supported
      const isTranslatorSupported = "ai" in self && "translator" in self.ai;

      if (!isTranslatorSupported) {
        console.log("error");
        throw new Error("Your browser doesn't support the Translator api");
      }

      // if translator is supported, then create a translator that translate from the languate detected, to the target language
      const translator = await self.ai.translator.create({
        sourceLanguage: prompt.languageDetected,
        targetLanguage,
      });
      const res = await translator.translate(prompt?.prompt);

      dispatch(
        addPrompts({
          aiResponse: res,
          promptFrom: "AI",
          responseType: "translate",
        })
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsTranslating(false);
    }
  }

  return (
    <div className="chat break-all self-end">
      {/* text and detected language  */}
      <div className="chat-text">
        <p className="break-all">{prompt?.prompt}</p>

        {/* detected language */}
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-gray-100">
            <Languages className="size-4 " />
            <span className="text-[13px] italic">
              Language: {prompt?.languageDetected}{" "}
            </span>
          </p>
          {prompt?.prompt.length > 150 && (
            <button
              className="btn btn-summarize"
              aria-label="Summarize your texts"
            >
              <FileText className="size-3 sm:size-4 text-white" />
              <span>Summarize</span>
            </button>
          )}
        </div>
      </div>

      {/* summarize and translate button */}
      <div className="flex items-center  mt-4 gap-6 justify-end">
        <div className="flex items-center gap-4 justify-end">
          <select
            name="languages"
            id="languages"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="py-2 px-2 sm:py-2.5 sm:pl-3 bg-gray-700 rounded-md text-white text-xs sm:text-md capitalize"
          >
            {languages?.map((language) => (
              <option
                key={language?.langAbbrv}
                value={language.langAbbrv}
                className="capitalize"
              >
                {language?.lang} ({language?.langAbbrv})
              </option>
            ))}
          </select>
          <button
            onClick={handleTranslate}
            className="btn btn-translate"
            aria-label="Summarize your texts"
          >
            <Languages className="size-4 " />
            {isTranslating ? (
              <MiniSpinner color="white" />
            ) : (
              <span>Translate</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

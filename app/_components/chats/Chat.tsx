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
  const [isSummarizing, setIsSummarizing] = useState(false);
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

  async function handleSummarize() {
    try {
      setIsSummarizing(true);

      // Checking if the summarizer api is supported by the browser

      const doesApiSupport = "ai" in self && "summarizer" in self.ai;
      if (!doesApiSupport) {
        throw new Error("Your browser does not support the Summarizer API!");
      }

      //   if browser supports it, check if it's downloaded, if not download it, and create the api

      const options = {
        type: "key-points",
        format: "markdown",
        length: "short",
      };

      const apiAvailability = await self.ai.summarizer.capabilities();

      let summarizer;

      if (apiAvailability?.available === "no") {
        throw new Error("The Summarizer API isn't usable.");
      }
      if (apiAvailability?.available === "readily") {
        // The Summarizer API can be used immediately .
        summarizer = await self.ai.summarizer.create(options);
      } else {
        // The Summarizer API can be used after the model is downloaded.
        console.log("about to download");
        summarizer = await self.ai.summarizer.create(options);
        summarizer.addEventListener("downloadprogress", (e) => {
          console.log(e.loaded, e.total);
        });
        await summarizer.ready;
      }

      //   If your browser is readily to summarize, then summarize the texts below

      const summarizedText = await summarizer.summarize(prompt?.prompt);

      dispatch(
        addPrompts({
          aiResponse: summarizedText,
          promptFrom: "AI",
          responseType: "summarize",
        })
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSummarizing(false);
    }
  }

  return (
    <div className="chat transition-all duration-300 break-all self-end">
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
              onClick={handleSummarize}
              className="btn btn-summarize"
              aria-label="Summarize your texts"
              disabled={isTranslating || isSummarizing}
            >
              <FileText className="size-3 sm:size-4 text-white" />
              {isSummarizing ? (
                <MiniSpinner color="white" />
              ) : (
                <span>Summarize</span>
              )}
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
            disabled={isTranslating || isSummarizing}
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

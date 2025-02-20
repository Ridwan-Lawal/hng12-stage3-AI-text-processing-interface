"use client";

import { addPrompts } from "@/app/_lib/redux/chatsSlice";
import MiniSpinner from "@/app/_ui/MiniSpinner";
import { Send } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function TextArea() {
  const [prompt, setUserPrompt] = useState<string>("");
  const [isDetectingLanguage, setIsDetectingLanguage] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    if (prompt === "" || prompt.length < 2) {
      toast.error("Please enter a valid input");
    }

    // if there'no error,

    try {
      // loading state
      setIsDetectingLanguage(true);

      // Step 1 -  Checking if browser support language detector
      const doesLanguageDetectorExist =
        "ai" in self && "languageDetector" in self.ai;

      if (!doesLanguageDetectorExist) {
        throw new Error(
          "Your browser does not support the Language Detector API"
        );
      }

      // step 2 - Checking if browser can detect language detector
      const languageDetectorCapabilites =
        await self?.ai.languageDetector.capabilities();

      const languageDetectAvailabilityStatus =
        languageDetectorCapabilites?.available;

      let detector;

      if (languageDetectAvailabilityStatus === "no") {
        throw new Error("The Language detector isn't usable.");
      } else if (languageDetectAvailabilityStatus === "readily") {
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }

      // detecting for languages
      const promptLanguages = await detector.detect(prompt);
      console.log(promptLanguages);

      // if the prompt is an invalid prompt
      if (promptLanguages?.at(0)?.detectedLanguage === "no")
        throw new Error("Language couldn't be detected!");

      // if the prompt is a a valid prompt

      // add the data to redux store
      dispatch(
        addPrompts({
          prompt,
          languageDetected: promptLanguages?.at(0)?.detectedLanguage,
          promptFrom: "user",
        })
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDetectingLanguage(false);
    }

    setUserPrompt("");
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-3 h-[19vh] text-area">
      <fieldset className="flex items-center gap-6 max-w-[700px] mx-auto">
        <textarea
          name="prompt"
          id="prompt"
          aria-label="Prompt text"
          value={prompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          autoComplete="prompt"
          aria-required={true}
          aria-live="polite"
          disabled={isDetectingLanguage}
          aria-disabled={isDetectingLanguage}
          placeholder="Enter a prompt..."
          className=""
        />

        <button
          disabled={!prompt.length || isDetectingLanguage}
          aria-disabled={isDetectingLanguage}
          aria-label="send prompt"
          className={`rounded-lg px-4 py-3.5    transition-colors ${
            !prompt.length ? "bg-gray-300" : "bg-white hover:bg-gray-950 group"
          } `}
        >
          {isDetectingLanguage ? (
            <MiniSpinner color="#161616" />
          ) : (
            <Send className=" text-gray-700 size-5 group-hover:text-white" />
          )}
        </button>
      </fieldset>
    </form>
  );
}

// continue with the chat area
// disable the send button if there is no text in it

// const [state, formAction, isDetectingLanguage] = useActionState(
//   languageDetectAction,
//   null
// );

// const { error, input } = state ?? {};
// console.log(error, input);

// useEffect(() => {
//   if (error?.prompt?.at(0) === undefined) return;
//   if (error?.prompt?.at(0)) {
//     const errorText = error?.prompt?.at(0) as string;
//     toast.error(errorText);
//   }
// }, [error]);

// useEffect(() => {
//   if (state === undefined || state === null) return;
//   if (state?.success) {
//     toast.success("working");
//   }
//   if (state?.success === false) {
//     toast.error(state?.message);
//   }
// });

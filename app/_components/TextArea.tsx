import { Send } from "lucide-react";
import React from "react";

export default function TextArea() {
  return (
    <form action="" className="px-6 py-3 h-[19vh]">
      <fieldset className="flex items-center gap-6 max-w-[700px] mx-auto">
        <textarea
          name="prompt"
          id="prompt"
          aria-label="Prompt text"
          autoComplete="prompt"
          //   aria-required={true}
          //   aria-live='polite'
          //   disabled={isSubmitting}
          //   aria-disabled={isSubmitting}
          //   aria-describedby={errors?.title?.at(0)}
          //   aria-invalid={errors?.title?.at(0) ? true : false}
          placeholder="Enter a prompt..."
          className="flex-grow focus:outline-none focus:border focus:border-blue-600 bg-gray-700 text-white rounded-xl py-4 px-5 text-sm font-medium h-[90px]"
        />

        <button
          aria-label="send prompt"
          className="rounded-lg px-4 py-3.5 bg-white hover:bg-gray-950 group transition-colors "
        >
          <Send className=" text-gray-700 size-5 group-hover:text-white" />
        </button>
      </fieldset>
    </form>
  );
}

// continue with the chat area
// disable the send button if there is no text in it

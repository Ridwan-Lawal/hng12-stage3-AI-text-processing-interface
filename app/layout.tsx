/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "@/app/_ui/NavBar";
import TextArea from "@/app/_components/chats/TextArea";
import { roboto } from "@/app/_styles/fonts";
import "@/app/_styles/globals.css";
import StoreProvider from "@/app/_lib/redux/StoreProvider";
import { Toaster } from "react-hot-toast";

interface Metadata {
  title: {
    template: string;
    default: string;
  };
  description: string;
  metadatabase: any;
  other: {
    "origin-trial": string[];
  };
}

export const metadata: Metadata = {
  title: {
    template: "%s - Ai-text-processing",
    default: "Chat - Ai-text-processing",
  },
  description:
    "An application that allows you to input text and utilize features such as summarization, translation, and language detection.",
  metadatabase: new URL(
    "https://hng12-stage3-ai-text-processing-interface.vercel.app/"
  ),
  other: {
    "origin-trial": [
      process.env.NEXT_PUBLIC_TRANSLATOR_ORIGIN_TRIAL_TOKEN,
      process.env.NEXT_PUBLIC_DETECTOR_ORIGIN_TRIAL_TOKEN,
      process.env.NEXT_PUBLIC_SUMMARIZER_ORIGIN_TRIAL_TOKEN,
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={`${roboto.className}  min-h-screen flex flex-col`}>
          <header>
            <NavBar />
          </header>
          <main className="flex-grow ">{children}</main>
          <footer>
            <TextArea />
          </footer>

          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}

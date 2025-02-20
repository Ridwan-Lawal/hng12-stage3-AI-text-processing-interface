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
}

export const metadata: Metadata = {
  title: {
    template: "%s - Ai-text-processing",
    default: "Chat - Ai-text-processing",
  },
  description:
    "An application that allows you to input text and utilize features such as summarization, translation, and language detection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${roboto.className} border min-h-screen flex flex-col`}
        >
          <header>
            <NavBar />
          </header>
          <main className="flex-grow border">{children}</main>
          <footer>
            <TextArea />
          </footer>
        </body>
        <Toaster />
      </StoreProvider>
    </html>
  );
}

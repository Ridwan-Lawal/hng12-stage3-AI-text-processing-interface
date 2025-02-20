import NavBar from "@/app/_components/NavBar";
import TextArea from "@/app/_components/TextArea";
import { roboto } from "@/app/_styles/fonts";
import "@/app/_styles/globals.css";

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
      <body className={`${roboto.className} border min-h-screen flex flex-col`}>
        <header>
          <NavBar />
        </header>
        <main className="flex-grow border">{children}</main>
        <footer>
          <TextArea />
        </footer>
      </body>
    </html>
  );
}

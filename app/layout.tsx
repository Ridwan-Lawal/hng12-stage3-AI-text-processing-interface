import NavBar from "@/app/_components/NavBar";
import TextArea from "@/app/_components/TextArea";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
        <footer>
          <TextArea />
        </footer>
      </body>
    </html>
  );
}

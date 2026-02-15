import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "My World",
  description: "My personal headquarters on the internet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrains.className} bg-black text-white`}>
        <nav className="w-full px-8 py-6 flex justify-between items-center border-b border-gray-800">
          <a href="/" className="text-emerald-400 hover:text-emerald-300 transition">
            Abbas Ali
          </a>

          <div className="space-x-6 text-gray-400">
            <a href="/articles" className="hover:text-purple-400 transition">
              Articles
            </a>

            <a href="/projects" className="hover:text-blue-400 transition">
              Projects
            </a>

          </div>
        </nav>

        {children}
      </body>
      
    </html>
  );
}

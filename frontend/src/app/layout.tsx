import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerForge Pulse | The AI that tells you how a recruiter actually sees you.",
  description: "CareerForge Pulse analyzes your resume, responses, and technical readiness in under 2 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} dark antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden">
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

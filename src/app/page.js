import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Process from "@/components/landing/Process";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <Header />
      <main className="w-full  flex flex-col relative">
        {/* אזור ה-Hero (Hero) */}
        <Hero />


        {/* אזור הפיצ'רים (Features) */}
        <Features />

        {/* אזור התהליך (Process) */}
        <Process />

        {/* אזור התהליך (Pricing) */}
        <Pricing />

        {/* אזור התהליך (Footer) */}
        <Footer />
      </main>
    </div>
  );
}

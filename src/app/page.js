'use client'; // קריטי! מאפשר לדף להגיב לשינויי סטטוס

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Process from "@/components/landing/Process";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // זה החלק שאחראי על ה"קסם" של אישור האימייל
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="w-full flex flex-col relative">
        <Hero />
        <Features />
        <Process />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
}
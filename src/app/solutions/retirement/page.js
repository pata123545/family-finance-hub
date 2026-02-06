"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { Palmtree, ShieldCheck, HeartPulse, ArrowLeft } from "lucide-react";

export default function Retirement() {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-white">
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            החופש הכלכלי <br />
                            <span className="text-emerald-700">שמגיע לכם</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            תכנון פרישה חכם הוא המפתח לשקט נפשי. וודאו שהנכסים שצברתם יעבדו בשבילכם גם בשנים הבאות.
                        </p>
                    </div>
                </section>

                {/* Features */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                                <ShieldCheck size={40} className="text-emerald-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-3">בדיקת כפל ביטוחים</h3>
                                <p className="text-slate-500">רבים משלמים אלפי שקלים מיותרים בשנה. אנחנו בודקים את כל הפוליסות שלכם ועושים סדר.</p>
                            </div>
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                                <Palmtree size={40} className="text-emerald-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-3">ניהול קצבאות</h3>
                                <p className="text-slate-500">ראו את כל מקורות ההכנסה הפנסיוניים במקום אחד ותכננו את תזרים המזומנים החודשי.</p>
                            </div>
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                                <HeartPulse size={40} className="text-emerald-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-3">העברה בינדורית</h3>
                                <p className="text-slate-500">כלים חכמים לניהול ירושות, צוואות והעברת עושר לדור הבא בצורה מסודרת.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-emerald-900 text-white text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <Link href="/register">
                            <button className="px-10 py-5 bg-white text-emerald-900 rounded-xl font-bold text-xl hover:bg-emerald-50 transition-all shadow-lg inline-flex items-center gap-2">
                                התחילו לתכנן את העתיד <ArrowLeft />
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

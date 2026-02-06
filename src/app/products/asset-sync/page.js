"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { Wallet, ShieldCheck, Building2, Globe, ArrowLeft, RefreshCw } from "lucide-react";

export default function AssetSync() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-bold mb-6">
                            <RefreshCw size={14} className="animate-spin-slow" /> AUTO SYNC
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                            כל הנכסים שלך <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">במקום אחד</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                            תשכחו מלהיכנס ל-5 אפליקציות שונות בבוקר. אנחנו מתחברים לכל הבנקים, כרטיסי האשראי ובתי ההשקעות בצורה מאובטחת.
                        </p>
                    </div>
                </section>

                {/* Security & Coverage */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900">תמיכה רחבה. אבטחה מקסימלית.</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-8 bg-slate-50 rounded-2xl">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><Building2 size={32} /></div>
                                <h3 className="text-xl font-bold mb-2">כל הבנקים המקומיים</h3>
                                <p className="text-slate-500 text-sm">פועלים, לאומי, דיסקונט, מזרחי, יהב ועוד.</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-2xl">
                                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"><Globe size={32} /></div>
                                <h3 className="text-xl font-bold mb-2">נכסים גלובליים</h3>
                                <p className="text-slate-500 text-sm">חשבונות מט״ח, Interactive Brokers (בקרוב), וקריפטו.</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-2xl">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck size={32} /></div>
                                <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
                                <p className="text-slate-500 text-sm">תקן ISO 27001, הצפנה מקצה לקצה וגישת קריאה בלבד.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-slate-50 border-t border-slate-200 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <Link href="/register">
                            <button className="px-10 py-5 bg-blue-600 text-white rounded-xl font-bold text-xl hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/50 inline-flex items-center gap-2">
                                חברו את החשבון הראשון בחינם <ArrowLeft />
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

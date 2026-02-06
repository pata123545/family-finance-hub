"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { Gem, Briefcase, Globe2, ArrowLeft, BarChart3, TrendingUp } from "lucide-react";

export default function FamilyOffice() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                {/* Dark Mode Hero */}
                <section className="relative pt-32 pb-24 overflow-hidden">
                    {/* Abstract gold accent */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-900/30 border border-amber-600/30 rounded-full text-amber-500 text-xs font-bold mb-8 uppercase tracking-widest">
                            <Gem size={12} /> Wealth Management
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                            הסטנדרט החדש <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">לניהול הון משפחתי</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
                            פתרון הוליסטי לבעלי הון (HNW individuals). שילוב של טכנולוגיה עלית עם ליווי אנושי של מומחים, לניהול אופטימלי של נכסים מורכבים.
                        </p>
                    </div>
                </section>

                {/* Premium Features */}
                <section className="py-24 border-t border-slate-900/50 bg-slate-900/50">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-8">מעבר לניהול השקעות סטנדרטי</h2>
                            <ul className="space-y-8">
                                <li className="flex gap-4">
                                    <div className="bg-slate-800 p-3 rounded-xl h-fit border border-slate-700"><Globe2 className="text-amber-500" /></div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">ניהול נכסים גלובלי</h3>
                                        <p className="text-slate-400 text-sm mt-1">נדל״ן בחו״ל, חשבונות בנק זרים, והשקעות אלטרנטיביות - הכל בדשבורד אחד המומר לשקל.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-slate-800 p-3 rounded-xl h-fit border border-slate-700"><Briefcase className="text-amber-500" /></div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">מיסוי וזכויות</h3>
                                        <p className="text-slate-400 text-sm mt-1">דוחות מס אוטומטיים לרואה החשבון וניתוח מעמיק של הטבות מס שלא נוצלו.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-slate-800 p-3 rounded-xl h-fit border border-slate-700"><BarChart3 className="text-amber-500" /></div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">הקצאת נכסים חכמה</h3>
                                        <p className="text-slate-400 text-sm mt-1">ניתוח סיכונים ברמת התיק הכולל (Total Wealth) והמלצות לאיזון מחדש (Rebalancing).</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            {/* Abstract Visual */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2064&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
                                <div className="absolute bottom-6 left-6 right-6 bg-slate-950/90 backdrop-blur-md p-6 rounded-xl border border-slate-800">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider">שווי נכסים כולל</span>
                                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">+12.5% <TrendingUp size={12} /></span>
                                    </div>
                                    <div className="text-3xl font-mono text-white">₪14,250,000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-amber-600 text-white text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-6">Family Office 2.0 - הזמינו הדגמה אישית</h2>
                        <Link href="/register?plan=private_wealth">
                            <button className="px-10 py-5 bg-black/20 text-white rounded-xl font-bold text-xl hover:bg-black/30 transition-all backdrop-blur-sm border border-white/10 inline-flex items-center gap-2">
                                תיאום פגישה <ArrowLeft />
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { PieChart, ListFilter, ArrowLeft, Target, Bell } from "lucide-react";

export default function SmartBudget() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-indigo-950"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                            תקציב שלא צריך <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">לנהל ידנית</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                            הוצאות נרשמות ומתויגות באופן אוטומטי. הציבו יעדים וקבלו התראות בזמן אמת כדי להישאר במסלול הנכון.
                        </p>
                    </div>
                </section>

                {/* Main Features */}
                <section className="py-24 bg-white relative">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-1 md:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">תיוג אוטומטי חכם</h3>
                            <p className="text-slate-500 mb-8 max-w-md">המערכת יודעת ש-"רמי לוי" זה מזון ו-"נטפליקס" זה בידור. עם דיוק של 98%, אתם יכולים להיפרד מהתיוג הידני.</p>
                            {/* Dummy UI Representation */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-3 max-w-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">🍔</div>
                                        <div><p className="font-bold text-slate-800">Wolt</p><p className="text-xs text-slate-400">היום, 13:45</p></div>
                                    </div>
                                    <span className="font-bold text-slate-900">-85₪</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">⛽</div>
                                        <div><p className="font-bold text-slate-800">פז</p><p className="text-xs text-slate-400">אתמול, 18:20</p></div>
                                    </div>
                                    <span className="font-bold text-slate-900">-250₪</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white flex flex-col justify-between">
                            <div>
                                <Target className="mb-6 opacity-80" size={40} />
                                <h3 className="text-2xl font-bold mb-2">יעדי חיסכון</h3>
                                <p className="text-indigo-100 text-sm">הגדירו תקציב לכל קטגוריה וקבלו התראות לפני שאתם חורגים.</p>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between text-xs font-bold mb-1 opacity-80"><span>מסעדות</span><span>85%</span></div>
                                <div className="w-full bg-indigo-900/50 rounded-full h-2">
                                    <div className="bg-white h-2 rounded-full w-[85%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-slate-50 border-t border-slate-200 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <Link href="/register">
                            <button className="px-10 py-5 bg-slate-900 text-white rounded-xl font-bold text-xl hover:bg-slate-800 transition-all shadow-lg inline-flex items-center gap-2">
                                התחילו לנהל תקציב חכם <ArrowLeft />
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

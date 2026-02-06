"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { BrainCircuit, Sparkles, TrendingUp, AlertTriangle, CheckCircle2, ArrowLeft } from "lucide-react";

export default function AiCfo() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900"></div>
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-bold mb-6">
                            <BrainCircuit size={14} /> AI POWERED
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                            סמנכ״ל כספים <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">אישי</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                            הבינה המלאכותית שלנו עובדת בשבילך 24/7. היא מנתחת כל תנועה, מזהה הזדמנויות לחיסכון, ומוודאת שאתם תמיד בכיוון הנכון לצמיחה.
                        </p>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">יותר מנתונים - תובנות.</h2>
                                <div className="space-y-6">
                                    {[
                                        { title: "זיהוי חיובים כפולים", desc: "האלגוריתם סורק את חשבונות הבנק והאשראי ומזהה מיד אם חויבתם פעמיים על אותו שירות." },
                                        { title: "משא ומתן עם ספקים", desc: "אנחנו מזהים כשמחיר המנוי שלכם לאינטרנט או לביטוח עולה, ומציעים אלטרנטיבות זולות יותר." },
                                        { title: "תחזית תזרים מזומנים", desc: "צפו את היתרה שלכם 30 יום קדימה על בסיס התחייבויות עתידיות והכנסות צפויות." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="mt-1 bg-indigo-100 p-2 rounded-lg text-indigo-600 h-fit"><CheckCircle2 size={20} /></div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{item.title}</h4>
                                                <p className="text-slate-500 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle className="text-red-500" />
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">חריגה צפויה בקטגוריית מזון</p>
                                                <p className="text-xs text-slate-500">לפי קצב ההוצאות הנוכחי</p>
                                            </div>
                                        </div>
                                        <span className="text-red-600 font-bold text-sm">-₪450</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="text-emerald-500" />
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">הזדמנות לחיסכון בביטוח</p>
                                                <p className="text-xs text-slate-500">נמצאה פוליסה זהה זולה ב-20%</p>
                                            </div>
                                        </div>
                                        <span className="text-emerald-600 font-bold text-sm">+₪1,200/שנה</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-white border-t border-slate-100 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">מוכנים לשדרג את הניהול הפיננסי?</h2>
                        <Link href="/register">
                            <button className="px-10 py-5 bg-indigo-600 text-white rounded-xl font-bold text-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/50 inline-flex items-center gap-2">
                                נסו את ה-AI CFO בחינם <ArrowLeft />
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

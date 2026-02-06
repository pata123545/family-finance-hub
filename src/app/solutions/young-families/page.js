"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { Baby, Home, TrendingUp, ArrowLeft } from "lucide-react";

export default function YoungFamilies() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-white">
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            לבנות יסודות כלכליים <br />
                            <span className="text-indigo-600">חזקים למשפחה</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            משכנתא ראשונה, הוצאות גן, ותכנון העתיד. אנחנו כאן כדי לעזור לכם לצלוח את השנים המאתגרות והחשובות ביותר.
                        </p>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 bg-orange-50 rounded-3xl group hover:bg-orange-100 transition-colors">
                            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white transition-colors"><Home size={28} /></div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">חוסכים לדירה?</h3>
                            <p className="text-slate-500">הגדירו יעד חיסכון, עקבו אחרי ההתקדמות, וקבלו טיפים איך להגיע לשם מהר יותר.</p>
                        </div>
                        <div className="p-8 bg-pink-50 rounded-3xl group hover:bg-pink-100 transition-colors">
                            <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white transition-colors"><Baby size={28} /></div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">ניהול הוצאות ילדים</h3>
                            <p className="text-slate-500">מגנים ועד חוגים - ראו בדיוק כמה עולה לגדל את המשפחה ותכננו את התקציב בהתאם.</p>
                        </div>
                        <div className="p-8 bg-blue-50 rounded-3xl group hover:bg-blue-100 transition-colors">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white transition-colors"><TrendingUp size={28} /></div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">השקעות לטווח ארוך</h3>
                            <p className="text-slate-500">זה הזמן שבו הריבית דריבית עובדת הכי חזק. התחילו להשקיע לעתיד הילדים כבר היום.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-slate-900 text-white text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <Link href="/register">
                            <button className="px-10 py-5 bg-indigo-600 text-white rounded-xl font-bold text-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/50 inline-flex items-center gap-2">
                                התחילו בחינם <ArrowLeft />
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

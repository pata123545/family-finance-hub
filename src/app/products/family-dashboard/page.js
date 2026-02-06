"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { Users, Lock, Eye, Share2, ArrowLeft } from "lucide-react";

export default function FamilyDashboard() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                            חדר המצב <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">המשפחתי</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                            פיננסים זה עניין משפחתי. שתפו מידע, קבלו החלטות משותפות, והובילו את משק הבית בתיאום מושלם.
                        </p>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="py-24 bg-white">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="bg-purple-50 text-purple-600 p-3 rounded-xl h-fit"><Share2 size={24} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">שיתוף בני זוג</h3>
                                        <p className="text-slate-500 leading-relaxed">אין יותר "כמה הוצאת השבוע?". שני בני הזוג רואים את התמונה המלאה בזמן אמת, מכל מכשיר.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-pink-50 text-pink-600 p-3 rounded-xl h-fit"><Lock size={24} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">הרשאות לילדים</h3>
                                        <p className="text-slate-500 leading-relaxed">תנו לילדים גישה מוגבלת לכרטיס נטען או דמי כיס, ולמדו אותם אחריות פיננסית מגיל צעיר.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Abstract visual of connected devices */}
                                <div className="aspect-square bg-slate-50 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl p-6 rounded-2xl border border-slate-100 z-10">
                                        <Users size={48} className="text-purple-600" />
                                    </div>
                                    <div className="absolute top-[15%] left-[15%] bg-white p-3 rounded-xl shadow-md animate-bounce-slow"><Eye size={20} className="text-slate-400" /></div>
                                    <div className="absolute bottom-[15%] right-[15%] bg-white p-3 rounded-xl shadow-md animate-bounce-slow delay-700"><Lock size={20} className="text-slate-400" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-slate-50 border-t border-slate-200 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <Link href="/register">
                            <button className="px-10 py-5 bg-purple-600 text-white rounded-xl font-bold text-xl hover:bg-purple-500 transition-all shadow-lg hover:shadow-purple-500/50 inline-flex items-center gap-2">
                                פתחו חדר מצב למשפחה <ArrowLeft />
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

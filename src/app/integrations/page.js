"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Link2, CheckCircle } from "lucide-react";

export default function Integrations() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-6 border border-blue-100">
                            <Link2 size={14} /> 50+ Integrations
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            מתחברים לכל מקום
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            הפלטפורמה שלנו תומכת בחיבור מאובטח ליותר מ-50 גופים פיננסיים, בנקים, וחברות ביטוח בישראל.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {/* Mockups for Bank Logos */}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col items-center justify-center gap-4 group h-40">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    LOGO
                                </div>
                                <span className="font-bold text-slate-700 text-sm">Bank Name {i + 1}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 bg-slate-50 rounded-3xl p-10 text-center border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">חסר לכם מוסד פיננסי?</h3>
                        <p className="text-slate-500 mb-8">
                            אנחנו מוסיפים אינטגרציות חדשות כל שבוע. שלחו לנו בקשה ונדאג להוסיף את החיבור המבוקש.
                        </p>
                        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                            בקשת חיבור חדש
                        </button>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

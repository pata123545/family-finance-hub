"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Sparkles, Zap, CheckCircle2 } from "lucide-react";

export default function New() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mb-6 border border-indigo-100">
                            <Sparkles size={14} /> Changelog
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            מה חדש במערכת?
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            אנחנו כל הזמן משפרים ומוסיפים יכולות חדשות. הנה העדכונים האחרונים.
                        </p>
                    </div>

                    <div className="space-y-12 relative before:absolute before:inset-0 before:mr-[7px] before:h-full before:w-0.5 before:bg-slate-100 md:before:mr-[8.5rem] md:before:mx-0">

                        {/* Update Item 1 */}
                        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12">
                            <div className="flex md:w-32 md:justify-end items-center md:items-start shrink-0">
                                <span className="text-sm font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">אוקטובר 2023</span>
                            </div>
                            <div className="absolute right-[0] md:right-[8.5rem] w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm translate-x-1.5 md:translate-x-[5px] mt-1.5"></div>

                            <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">New Feature</span>
                                    <h3 className="text-lg font-bold text-slate-900">AI CFO - סמנכ״ל כספים אישי</h3>
                                </div>
                                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                                    השקנו את מנוע הבינה המלאכותית החדש שלנו שמנתח את כל ההוצאות וההכנסות שלכם ומספק תובנות אקטיביות לחיסכון וצמיחה.
                                </p>
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="AI Feature" className="w-full h-48 object-cover rounded-xl" />
                            </div>
                        </div>

                        {/* Update Item 2 */}
                        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12">
                            <div className="flex md:w-32 md:justify-end items-center md:items-start shrink-0">
                                <span className="text-sm font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">ספטמבר 2023</span>
                            </div>
                            <div className="absolute right-[0] md:right-[8.5rem] w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm translate-x-1.5 md:translate-x-[5px] mt-1.5"></div>

                            <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">Improvement</span>
                                    <h3 className="text-lg font-bold text-slate-900">אינטגרציה ל-3 בנקים נוספים</h3>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    הרחבנו את התמיכה בבנקים נוספים לרבות בנק ירושלים ו-One Zero. הסנכרון כעת מהיר ב-50%.
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <div className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-medium text-slate-500">Bank Yahav</div>
                                    <div className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-medium text-slate-500">One Zero</div>
                                </div>
                            </div>
                        </div>

                        {/* Update Item 3 */}
                        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12">
                            <div className="flex md:w-32 md:justify-end items-center md:items-start shrink-0">
                                <span className="text-sm font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">אוגוסט 2023</span>
                            </div>
                            <div className="absolute right-[0] md:right-[8.5rem] w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm translate-x-1.5 md:translate-x-[5px] mt-1.5"></div>

                            <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">Mobile App</span>
                                    <h3 className="text-lg font-bold text-slate-900">אפליקציית מובייל חדשה</h3>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    גרסת המובייל החדשה שלנו זמינה כעת להורדה בחנויות האפליקציות. עיצוב חדש, וגישה מהירה לכל הנתונים מכל מקום.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

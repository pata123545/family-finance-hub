"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { Users, Shield, Target, Award, ArrowLeft, HeartHandshake } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow">

                {/* --- Hero Section --- */}
                <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
                            אנחנו משנים את הדרך בה <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">משפחות מנהלות הון.</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                            החזון שלנו הוא להנגיש טכנולוגיות ניהול עושר שעד היום היו שמורות רק לעשירונים העליונים (Family Offices),
                            ולאפשר לכל משפחה ישראלית לקבל שליטה מלאה על העתיד הכלכלי שלה.
                        </p>
                    </div>
                </section>

                {/* --- Story & Mission --- */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                        <div className="order-2 md:order-1 relative">
                            <div className="absolute -inset-4 bg-indigo-50 rounded-3xl transform rotate-2"></div>
                            <div className="relative bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-lg">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">F</div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">Family Finance Hub</h3>
                                        <p className="text-xs text-slate-500">Established 2023</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 leading-relaxed italic border-r-4 border-indigo-200 pr-4">
                                    "הקמנו את הפלטפורמה הזו מתוך צורך אישי. כשחיפשנו דרך לראות את התמונה המלאה של הנכסים שלנו - בנקים, פנסיות, נדל״ן והשקעות - גילינו שאין פתרון אחד שמרכז הכל בצורה חכמה ואוטומטית."
                                </p>
                            </div>
                        </div>

                        <div className="order-1 md:order-2 text-center md:text-right">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-4">
                                <Target size={14} /> המשימה שלנו
                            </div>
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">מאוטומציה לצמיחה</h2>
                            <p className="text-lg text-slate-500 mb-6 leading-relaxed">
                                בעולם הפיננסי המודרני, המידע מפוזר בין עשרות גופים שונים. חוסר השקיפות הזה עולה למשפחות אלפי שקלים בשנה בעמלות מיותרות, כפל ביטוחים והזדמנויות השקעה מפוספסות.
                            </p>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                אנחנו כאן כדי לעשות סדר. באמצעות טכנולוגיית Open Finance ובינה מלאכותית, אנחנו מחזירים את הכוח לידיים שלכם.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- Values --- */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">הערכים שמובילים אותנו</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Shield size={32} />,
                                    title: "אבטחה ופרטיות מעל הכל",
                                    desc: "אנחנו לא מתפשרים על אבטחת המידע. הנתונים שלכם מוצפנים, ואנו פועלים תחת רגולציה מחמירה של בנק ישראל.",
                                    color: "text-emerald-600",
                                    bg: "bg-emerald-50"
                                },
                                {
                                    icon: <HeartHandshake size={32} />,
                                    title: "אובייקטיביות מוחלטת",
                                    desc: "אנחנו לא מוכרים מוצרים פיננסיים ולא מקבלים עמלות הפצה מבנקים. האינטרס היחיד שלנו הוא הצמיחה שלכם.",
                                    color: "text-blue-600",
                                    bg: "bg-blue-50"
                                },
                                {
                                    icon: <Award size={32} />,
                                    title: "מצוינות טכנולוגית",
                                    desc: "אנחנו משתמשים בכלים המתקדמים ביותר בעולם (AI, ML) כדי לספק לכם תובנות שפעם היו זמינות רק למשקיעים מוסדיים.",
                                    color: "text-indigo-600",
                                    bg: "bg-indigo-50"
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center">
                                    <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Team / Investors Trust --- */}
                <section className="py-24 bg-white text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">בגיבוי המובילים בתעשייה</h2>
                        <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
                            הפלטפורמה פותחה בליווי יועצים בכירים מעולמות הבנקאות, אבטחת הסייבר והפינטק, כדי להבטיח את המוצר הטוב והבטוח ביותר.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholders for logos - representing trust */}
                            <div className="flex items-center gap-2 font-bold text-2xl text-slate-700"><Shield size={24} /> CyberSec <span className="text-xs font-normal bg-slate-100 px-2 py-0.5 rounded">Advisor</span></div>
                            <div className="flex items-center gap-2 font-bold text-2xl text-slate-700"><Users size={24} /> FinTech <span className="text-xs font-normal bg-slate-100 px-2 py-0.5 rounded">Partners</span></div>
                            <div className="flex items-center gap-2 font-bold text-2xl text-slate-700"><Target size={24} /> Bank <span className="text-xs font-normal bg-slate-100 px-2 py-0.5 rounded">Api</span></div>
                        </div>
                    </div>
                </section>

                {/* --- CTA --- */}
                <section className="py-20 bg-slate-900 text-white text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-6">הצטרפו למהפכה הפיננסית</h2>
                        <Link href="/register">
                            <button className="px-10 py-5 bg-indigo-600 text-white rounded-xl font-bold text-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-3 mx-auto">
                                פתחו חשבון בחינם <ArrowLeft />
                            </button>
                        </Link>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ShieldCheck, Lock, Server, FileKey, Eye, Fingerprint } from "lucide-react";

export default function Security() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-slate-900/90 z-0"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold mb-6 border border-emerald-500/20">
                            <ShieldCheck size={14} /> Bank-Level Security
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                            המידע שלך בטוח <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">יותר מאי פעם.</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                            אנו משתמשים בסטנדרטים המחמירים ביותר של הצפנה ואבטחת מידע, זהים לאלו של הבנקים והמוסדות הפיננסיים המובילים בעולם.
                        </p>
                    </div>
                </section>

                {/* Security Standards Grid */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Lock size={32} />,
                                    title: "הצפנת קצה-לקצה",
                                    desc: "כל המידע שלך מוצפן בטכנולוגיית AES-256, הסטנדרט המוביל בתעשייה, הן במעבר (Transit) והן במנוחה (Rest).",
                                    bg: "bg-indigo-50",
                                    color: "text-indigo-600"
                                },
                                {
                                    icon: <Server size={32} />,
                                    title: "תשתית מאובטחת",
                                    desc: "השרתים שלנו ממוקמים במתקני AWS המאובטחים ביותר, עם ניטור 24/7 והגנות מרובות שכבות מפני התקפות סייבר.",
                                    bg: "bg-blue-50",
                                    color: "text-blue-600"
                                },
                                {
                                    icon: <FileKey size={32} />,
                                    title: "תקן ISO 27001",
                                    desc: "אנחנו עומדים בתקני האבטחה הבינלאומיים המחמירים ביותר לניהול אבטחת מידע, ומבוקרים באופן שוטף.",
                                    bg: "bg-emerald-50",
                                    color: "text-emerald-600"
                                },
                                {
                                    icon: <Eye size={32} />,
                                    title: "פרטיות מוחלטת",
                                    desc: "המידע שלך שייך לך. אנחנו לא מוכרים מידע לצד שלישי לעולם. הגישה לנתונים היא שלך ושלך בלבד.",
                                    bg: "bg-purple-50",
                                    color: "text-purple-600"
                                },
                                {
                                    icon: <Fingerprint size={32} />,
                                    title: "אימות דו-שלבי (2FA)",
                                    desc: "שכבת הגנה נוספת לגישה לחשבון שלך, המבטיחה שרק אתה יכול לגשת לנתונים הרגישים.",
                                    bg: "bg-orange-50",
                                    color: "text-orange-600"
                                },
                                {
                                    icon: <ShieldCheck size={32} />,
                                    title: "SOC 2 Type II",
                                    desc: "אנחנו בתהליך הסמכה לתקן SOC 2, המעיד על בקרות פנימיות מחמירות בנושאי אבטחה, זמינות ופרטיות.",
                                    bg: "bg-teal-50",
                                    color: "text-teal-600"
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all group">
                                    <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}

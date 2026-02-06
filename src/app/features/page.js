"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Zap, LayoutDashboard, Brain, Wallet, LineChart, Bell } from "lucide-react";

export default function Features() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-20">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            כל הכלים לניהול <br />
                            <span className="text-indigo-600">העושר המשפחתי</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            פלטפורמה אחת חכמה שמחליפה את האקסלים, האפליקציות הבנקאיות והניירת.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <LayoutDashboard size={32} />,
                                title: "דשבורד ריכוזי",
                                desc: "תמונת מצב מלאה של כל הנכסים וההתחייבויות במקום אחד. בנקים, כרטיסי אשראי, פנסיות, נדל״ן והשקעות אלטרנטיביות.",
                                color: "text-blue-600 bg-blue-50"
                            },
                            {
                                icon: <Brain size={32} />,
                                title: "AI CFO",
                                desc: "מנהל כספים אישי מבוסס בינה מלאכותית שמזהה דפוסים, מתריע על חריגות וממליץ על צעדים לחיסכון וייעול.",
                                color: "text-purple-600 bg-purple-50"
                            },
                            {
                                icon: <Wallet size={32} />,
                                title: "סנכרון אוטומטי",
                                desc: "חיבור מאובטח לכל המוסדות הפיננסיים בישראל. הנתונים מתעדכנים אוטומטית ללא צורך בהזנה ידנית מייגעת.",
                                color: "text-emerald-600 bg-emerald-50"
                            },
                            {
                                icon: <LineChart size={32} />,
                                title: "ניתוח השקעות",
                                desc: "כלים מתקדמים לניתוח תיק ההשקעות, פיזור סיכונים, ותשואות בזמן אמת. השוואה למדדי שוק מובילים.",
                                color: "text-indigo-600 bg-indigo-50"
                            },
                            {
                                icon: <Bell size={32} />,
                                title: "התראות חכמות",
                                desc: "קבלו עדכונים בזמן אמת על חיובים חריגים, הזדמנויות השקעה, או מועדי פירעון קרובים. לעולם לא תפספסו דבר.",
                                color: "text-orange-600 bg-orange-50"
                            },
                            {
                                icon: <Zap size={32} />,
                                title: "תכנון תזרים",
                                desc: "כלי חיזוי תזרים מזומנים (Cash Flow) המאפשר לתכנן הוצאות עתידיות ולמנוע כניסה למינוס מיותר.",
                                color: "text-rose-600 bg-rose-50"
                            },
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

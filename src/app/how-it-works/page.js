"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import {
    ShieldCheck,
    Smartphone,
    TrendingUp,
    Banknote,
    Lock,
    FileText,
    BarChart3,
    ArrowLeft
} from "lucide-react";

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
            <Header />

            <main className="flex-grow">
                {/* --- Hero Section --- */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-[0.4]"
                        style={{ backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(to right, #f1f5f9 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs tracking-wider mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            תהליך פשוט ומהיר
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            איך המערכת <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">עובדת?</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            הפכנו את ניהול ההון המשפחתי לחוויה אוטומטית, חכמה ומאובטחת.
                            בלי אקסלים ידניים, בלי סיסמאות מרובות, ובלי כאבי ראש.
                        </p>
                    </div>
                </section>

                {/* --- Detailed Steps Section --- */}
                <section className="py-24 bg-zinc-50">
                    <div className="max-w-5xl mx-auto px-6 space-y-24">

                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute inset-0 bg-blue-100 rounded-[2rem] transform rotate-3 transition-transform group-hover:rotate-6"></div>
                                <div className="relative bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl text-center md:text-right overflow-hidden">
                                    <div className="absolute top-0 left-0 p-4 opacity-5 pointer-events-none">
                                        <Banknote size={200} />
                                    </div>
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto md:mx-0">
                                        <Smartphone size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">חיבור נכסים חכם</h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        מתחברים בבטחה לכל הבנקים, כרטיסי האשראי, קרנות ההשתלמות וקופות הגמל שלכם.
                                        המערכת משתמשת בתקן הבנקאות הפתוחה (Open Finance) כדי למשוך נתונים לקריאה בלבד.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 text-center md:text-right">
                                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-bold rounded-lg mb-4 text-sm">שלב 01</div>
                                <h2 className="text-4xl font-extrabold text-slate-900 mb-6">מרכזים הכל במקום אחד</h2>
                                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                    לא צריך להיכנס ל-5 אפליקציות שונות כדי להבין כמה כסף יש לכם.
                                    אנחנו עושים סדר בבלגן ומציגים לכם תמונת מצב אחודה ומדויקת של כל הנכסים וההתחייבויות.
                                </p>
                                <ul className="space-y-3 text-right inline-block">
                                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0"><ShieldCheck size={14} /></div>
                                        תמיכה בכל המוסדות הפיננסיים הגדולים בישראל
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0"><ShieldCheck size={14} /></div>
                                        חיבור חד-פעמי מאובטח (ללא שמירת סיסמאות)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute inset-0 bg-indigo-100 rounded-[2rem] transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                                <div className="relative bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl text-center md:text-right overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                        <FileText size={200} />
                                    </div>
                                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 mx-auto md:mx-0">
                                        <BarChart3 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">ניתוח עומק אוטומטי</h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        מנוע ה-AI שלנו סורק את כל ההיסטוריה הפיננסית שלכם.
                                        הוא מזהה חיובים כפולים, מנויים ששכחתם לבטל, עמלות גבוהות מדי ודפוסי הוצאה שניתן לייעל.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 text-center md:text-right">
                                <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 font-bold rounded-lg mb-4 text-sm">שלב 02</div>
                                <h2 className="text-4xl font-extrabold text-slate-900 mb-6">מבינים לאן הכסף הולך</h2>
                                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                    הנתונים הגולמיים הופכים לתובנות ברורות.
                                    אנחנו מקטלגים אוטומטית כל הוצאה והכנסה, ומציגים לכם דוח חכם שמראה בדיוק איפה אפשר לחסוך.
                                </p>
                                <ul className="space-y-3 text-right inline-block">
                                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0"><ShieldCheck size={14} /></div>
                                        זיהוי אוטומטי של קטגוריות (מזון, רכב, ביטוחים...)
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0"><ShieldCheck size={14} /></div>
                                        התראות חכמות על חריגות בתקציב
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute inset-0 bg-emerald-100 rounded-[2rem] transform rotate-3 transition-transform group-hover:rotate-6"></div>
                                <div className="relative bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl text-center md:text-right overflow-hidden">
                                    <div className="absolute top-0 left-0 p-4 opacity-5 pointer-events-none">
                                        <TrendingUp size={200} />
                                    </div>
                                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 mx-auto md:mx-0">
                                        <TrendingUp size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">בניית הון וצמיחה</h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        זה לא רק חיסכון - זו צמיחה. המערכת בונה לכם תוכנית השקעה מותאמת אישית ליעדים שלכם (דירה, פרישה, לימודים).
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 text-center md:text-right">
                                <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 font-bold rounded-lg mb-4 text-sm">שלב 03</div>
                                <h2 className="text-4xl font-extrabold text-slate-900 mb-6">הכסף עובד בשבילכם</h2>
                                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                    במקום שהכסף ישכב בעו"ש וישחק, אנחנו עוזרים לכם לנתב אותו לאפיקים שמניבים תשואה.
                                    ניהול ההון שלכם עולה רמה לסטנדרט של Family Office.
                                </p>
                                <ul className="space-y-3 text-right inline-block">
                                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0"><ShieldCheck size={14} /></div>
                                        המלצות אובייקטיביות מבוססות חיסכון בעמלות
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0"><ShieldCheck size={14} /></div>
                                        מעקב רציף אחר ביצועי תיק ההשקעות
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- FAQ Section --- */}
                <section className="py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">שאלות נפוצות</h2>

                        <div className="space-y-6">
                            {[
                                {
                                    q: "האם זה בטוח לתת גישה לחשבון הבנק?",
                                    a: "בהחלט. אנחנו משתמשים בתקן הבנקאות הפתוחה של בנק ישראל. המשמעות היא שהסיסמאות שלכם לא נשמרות אצלנו לעולם, והגישה היא לקריאה בלבד (Read-Only) - אי אפשר לבצע פעולות בחשבון דרך המערכת."
                                },
                                {
                                    q: "עם אילו בנקים המערכת עובדת?",
                                    a: "המערכת תומכת בכל הבנקים הגדולים בישראל (פועלים, לאומי, דיסקונט, מזרחי, בינלאומי וכו') וברוב חברות כרטיסי האשראי ובתי ההשקעות."
                                },
                                {
                                    q: "מה קורה עם המידע שלי?",
                                    a: "הפרטיות שלכם היא ערך עליון. המידע מוצפן ברמת בנקאית (AES-256) ולא מועבר לשום צד שלישי ללא אישור מפורש מכם. אנחנו לא מוכרים את המידע שלכם למפרסמים."
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">{item.q}</h4>
                                    <p className="text-slate-600">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- CTA Section --- */}
                <section className="py-20 bg-slate-900 text-white text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">מוכנים לקחת שליטה על העתיד הכלכלי?</h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            הצטרפו לאלפי משפחות שכבר מנהלות את ההון שלהן חכם יותר. ההרשמה לוקחת פחות מ-2 דקות.
                        </p>
                        <Link href="/register">
                            <button className="px-10 py-5 bg-indigo-600 text-white rounded-xl font-bold text-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-3 mx-auto">
                                מתחילים עכשיו בחינם <ArrowLeft />
                            </button>
                        </Link>
                        <p className="mt-4 text-sm text-slate-500">ללא התחייבות • אין צורך באשראי לרישום</p>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}

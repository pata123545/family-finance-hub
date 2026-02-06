"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-20">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            דברו איתנו
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            הצוות שלנו זמין לכל שאלה, בקשה או התייעצות. <br />
                            אנחנו משתדלים לענות לכל פנייה תוך 24 שעות עסקים.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Contact Info */}
                        <div className="space-y-10">
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8">פרטי התקשרות</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 shrink-0">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">אימייל</h4>
                                            <p className="text-slate-500">support@familyoffice.co.il</p>
                                            <p className="text-slate-400 text-sm mt-1">מענה תוך 24 שעות</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 shrink-0">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">טלפון</h4>
                                            <p className="text-slate-500">*9876</p>
                                            <p className="text-slate-400 text-sm mt-1">א-ה, 09:00 - 18:00</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">משרדים</h4>
                                            <p className="text-slate-500">שדרות רוטשילד 45, תל אביב</p>
                                            <p className="text-slate-400 text-sm mt-1">קומה 22, מתחם FamilyHub</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><MessageSquare /> צריכים תמיכה טכנית?</h3>
                                    <p className="text-indigo-100 mb-6">
                                        מרכז העזרה שלנו זמין 24/7 עם מדריכים, שאלות נפוצות ופתרונות מהירים.
                                    </p>
                                    <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors">
                                        למרכז העזרה
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">שלחו לנו הודעה</h3>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">שם מלא</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="ישראל ישראלי" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">טלפון</label>
                                        <input type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="050-0000000" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">אימייל</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="your@email.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">נושא הפנייה</label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors text-slate-600">
                                        <option>תמיכה טכנית</option>
                                        <option>התעניינות במוצר</option>
                                        <option>שיתופי פעולה</option>
                                        <option>אחר</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">הודעה</label>
                                    <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="איך נוכל לעזור?"></textarea>
                                </div>

                                <button type="button" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 mt-4">
                                    שליחת הודעה <Send size={18} />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

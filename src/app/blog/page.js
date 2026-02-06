"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import Link from "next/link";

const blogPosts = [
    {
        id: 1,
        title: "איך לבנות תקציב משפחתי שמחזיק מעמד",
        excerpt: "טיפים מעשיים לניהול הוצאות המשפחה ללא וויתור על איכות החיים.",
        category: "ניהול תקציב",
        author: "דנה כהן",
        date: "12 אוקטובר, 2023",
        readTime: "5 דק׳ קריאה",
        image: "bg-gradient-to-br from-indigo-500 to-purple-600"
    },
    {
        id: 2,
        title: "המדריך המלא להשקעות פסיביות ב-2024",
        excerpt: "כל מה שצריך לדעת על קרנות סל, מדדים ופיזור סיכונים חכם.",
        category: "השקעות",
        author: "רון לוי",
        date: "28 ספטמבר, 2023",
        readTime: "8 דק׳ קריאה",
        image: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
        id: 3,
        title: "בינה מלאכותית בכספים: העתיד כבר כאן",
        excerpt: "כיצד AI עוזר למשפחות לחסוך אלפי שקלים בשנה באופן אוטומטי.",
        category: "טכנולוגיה",
        author: "צוות FamilyOffice",
        date: "15 ספטמבר, 2023",
        readTime: "4 דק׳ קריאה",
        image: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
        id: 4,
        title: "טעויות נפוצות בתכנון פרישה",
        excerpt: "איך להימנע מהמלכודות שעלולות לפגוע ברמת החיים שלכם בגיל השלישי.",
        category: "פרישה",
        author: "יעל אברהמי",
        date: "02 ספטמבר, 2023",
        readTime: "6 דק׳ קריאה",
        image: "bg-gradient-to-br from-orange-500 to-amber-600"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            הבלוג שלנו
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            תובנות, מדריכים וחדשות מעולם הניהול הפיננסי למשפחות.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="group bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">

                                {/* Image Placeholder */}
                                <div className={`h-48 w-full ${post.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1">
                                        <Tag size={12} className="text-indigo-500" /> {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 mb-6 text-sm leading-relaxed flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-xs text-slate-400 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-600">{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button className="px-8 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                            טען עוד מאמרים
                        </button>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

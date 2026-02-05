import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function VerifiedPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-8 text-center animate-in fade-in zoom-in duration-500">

                {/* אייקון גדול וירוק עם אפקט רקע */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full shadow-inner">
                        <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={2} />
                    </div>
                </div>

                {/* כותרת וטקסט */}
                <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
                    החשבון אומת בהצלחה!
                </h1>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                    תודה שאישרת את כתובת המייל שלך.<br />
                    החשבון שלך מוכן לפעולה ואתה יכול להתחיל לנהל את הכספים שלך בחוכמה.
                </p>

                {/* כפתור מעבר לדאשבורד */}
                <Link
                    href="/dashboard"
                    className="group flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-indigo-500/30 transform hover:-translate-y-1"
                >
                    <span>מעבר ללוח הבקרה</span>
                    <ArrowRight className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* קישור קטן למטה */}
                <div className="mt-6 text-sm text-slate-400">
                    הועברת לכאן באופן מאובטח
                </div>
            </div>
        </div>
    );
}
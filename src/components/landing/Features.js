"use client";

import { BrainCircuit, Building2, Lock, Users, ArrowUpRight, Sparkles, Check, ChevronLeft } from "lucide-react";

export default function Features() {

  // Bank list for animation
  const banks = [
    { name: "בנק הפועלים", color: "bg-red-500" },
    { name: "בנק לאומי", color: "bg-pink-500" },
    { name: "דיסקונט", color: "bg-green-500" },
    { name: "Max", color: "bg-blue-500" },
    { name: "Cal", color: "bg-yellow-500" }
  ];

  return (
    <section className="w-full py-24 bg-[#F8FAFC] relative overflow-hidden" id="features">

      {/* כותרת הסקשן */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold mb-6 uppercase tracking-wider">
          <Sparkles size={12} fill="currentColor" /> Features
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tight">
          לא עוד טבלאות אקסל. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">זו מערכת הפעלה למשפחה.</span>
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
          כל הכלים שצריך כדי לנהל את ההון המשפחתי, בממשק אחד שמרגיש כמו הקוקפיט של המטוס הפרטי שלך.
        </p>
      </div>

      {/* הגריד (Bento Grid) */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-8 h-auto md:h-[650px]"> {/* Increased Height & Gap */}

        {/* כרטיס 1: AI (גדול - תופס 2 עמודות) */}
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 flex flex-col justify-between group hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 relative overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] -z-10 group-hover:bg-indigo-100/80 transition-colors duration-500"></div>

          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-indigo-50 rounded-2xl shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <BrainCircuit size={28} />
            </div>
            <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg shadow-indigo-200">
              <Sparkles size={12} fill="currentColor" /> AI POWERED
            </span>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">סמנכ״ל כספים אישי (CFO)</h3>
            <p className="text-slate-500 leading-relaxed max-w-lg text-lg">
              המערכת לא רק מציגה נתונים, היא מבינה אותם. האלגוריתם מזהה כפילויות בחיובים, מציע הזדמנויות לחיסכון בריביות, ומתריע לפני חריגה מהתקציב.
            </p>
          </div>

          {/* ויז'ואל קטן בתוך הכרטיס - Floating Card */}
          <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full md:w-2/3 self-end transform md:translate-x-8 md:translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500 ease-out">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-sm font-bold text-slate-800">המלצת מערכת</p>
              <span className="text-[10px] text-slate-400 mr-auto">לפני 2 דק׳</span>
            </div>
            <p className="text-sm text-slate-600 leading-snug">
              שמתי לב לחיוב כפול ב-"ביטוח ישיר".
              <span className="block mt-1 font-medium text-indigo-600 flex items-center gap-1 cursor-pointer hover:underline">
                לחץ לטיפול אוטומטי <ChevronLeft size={14} />
              </span>
            </p>
          </div>
        </div>

        {/* כרטיס 2: סנכרון בנקים (גבוה - תופס 2 שורות בצד שמאל) */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl hover:shadow-slate-800/50 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 opacity-90"></div>

          <div className="relative z-10">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl w-fit mb-8 border border-white/10 group-hover:bg-white/20 transition-colors">
              <Building2 className="text-white" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">כל הנכסים במקום אחד</h3>
            <p className="text-slate-400 leading-relaxed">
              חיבור מאובטח לכל הבנקים, כרטיסי האשראי, קרנות ההשתלמות והפנסיה בישראל. הכל מתעדכן אוטומטית.
            </p>
          </div>

          {/* רשימת בנקים מדומה - Animated List */}
          <div className="mt-8 space-y-3 relative z-10">
            {banks.map((bank, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${bank.color} shadow-[0_0_8px_rgba(255,255,255,0.3)]`}></div>
                  <span className="text-slate-300 text-sm font-medium group-hover/item:text-white transition-colors">{bank.name}</span>
                </div>
                <Check size={14} className="text-emerald-400 opacity-0 group-hover/item:opacity-100 transition-opacity transform translate-x-2 group-hover/item:translate-x-0" />
              </div>
            ))}
          </div>
        </div>

        {/* כרטיס 3: אבטחה (רגיל) */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div className="p-4 bg-emerald-50 rounded-2xl w-fit mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
            <Lock size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">תקן אבטחה בנקאי</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              הצפנת AES-256, עמידה בתקן SOC2, וללא שמירת סיסמאות. הפרטיות שלך היא הערך העליון.
            </p>
          </div>
        </div>

        {/* כרטיס 4: ניהול משפחתי (רגיל) */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div className="p-4 bg-blue-50 rounded-2xl w-fit mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
            <Users size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">חדר מצב משפחתי</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              שתפו גישה עם בן/בת הזוג, הגדירו הרשאות לילדים, וקבלו תמונה מלאה של משק הבית.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
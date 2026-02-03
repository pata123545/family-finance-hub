"use client";

import { BrainCircuit, Building2, Lock, Users, ArrowUpRight, Sparkles } from "lucide-react";

export default function Features() {
  return (
    <section className="w-full py-24 bg-white relative overflow-hidden">
      
      {/* כותרת הסקשן */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          לא עוד טבלאות אקסל. <br />
          <span className="text-indigo-600">זו מערכת הפעלה למשפחה.</span>
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-tight">
          כל הכלים שצריך כדי לנהל את ההון המשפחתי, בממשק אחד שמרגיש כמו הקוקפיט של המטוס הפרטי שלך.
        </p>
      </div>

      {/* הגריד (Bento Grid) */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
        
        {/* כרטיס 1: AI (גדול - תופס 2 עמודות) */}
        <div className="md:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between group hover:border-indigo-100 transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-[80px] -z-10 group-hover:bg-indigo-100/80 transition-colors"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white rounded-2xl shadow-sm">
               <BrainCircuit className="text-indigo-600" size={24} />
            </div>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full flex items-center gap-1">
              <Sparkles size={12} /> AI POWERED
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">סמנכ״ל כספים אישי (CFO)</h3>
            <p className="text-slate-500 leading-relaxed max-w-md">
              המערכת לא רק מציגה נתונים, היא מבינה אותם. האלגוריתם מזהה כפילויות בחיובים, מציע הזדמנויות לחיסכון בריביות, ומתריע לפני חריגה מהתקציב.
            </p>
          </div>

          {/* ויז'ואל קטן בתוך הכרטיס */}
          <div className="mt-8 bg-white rounded-xl p-4 shadow-sm border border-slate-100 w-full md:w-2/3 self-end transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <p className="text-sm font-bold text-slate-700">המלצת מערכת</p>
             </div>
             <p className="text-xs text-slate-500">
                זיהיתי חיוב כפול בחברת הביטוח. לחיצה כאן לטיפול אוטומטי.
             </p>
          </div>
        </div>

        {/* כרטיס 2: סנכרון בנקים (גבוה - תופס 2 שורות בצד שמאל) */}
        <div className="bg-slate-900 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="p-3 bg-slate-800 rounded-2xl w-fit mb-6 border border-slate-700">
               <Building2 className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">כל הנכסים במקום אחד</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              חיבור מאובטח לכל הבנקים, כרטיסי האשראי, קרנות ההשתלמות והפנסיה בישראל. הכל מתעדכן אוטומטית.
            </p>
          </div>

          {/* רשימת בנקים מדומה */}
          <div className="mt-6 space-y-3 relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
             {["בנק הפועלים", "לאומי", "דיסקונט", "Max", "Cal"].map((bank, i) => (
               <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                  <span className="text-slate-300 text-xs">{bank}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
               </div>
             ))}
          </div>
        </div>

        {/* כרטיס 3: אבטחה (רגיל) */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="p-3 bg-emerald-50 rounded-2xl w-fit mb-4">
               <Lock className="text-emerald-600" size={24} />
            </div>
            <div>
               <h3 className="text-lg font-bold text-slate-900 mb-2">תקן אבטחה בנקאי</h3>
               <p className="text-sm text-slate-500 leading-relaxed">
                  הצפנת AES-256, עמידה בתקן SOC2, וללא שמירת סיסמאות בשרתים שלנו. הפרטיות שלך היא הערך העליון.
               </p>
            </div>
        </div>

        {/* כרטיס 4: ניהול משפחתי (רגיל) */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="p-3 bg-blue-50 rounded-2xl w-fit mb-4">
               <Users className="text-blue-600" size={24} />
            </div>
            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">חדר מצב משפחתי</h3>
               <p className="text-sm text-slate-500 leading-relaxed">
                  שתפו גישה עם בן/בת הזוג, הגדירו הרשאות לילדים, וקבלו תמונה מלאה של משק הבית בזמן אמת.
               </p>
            </div>
        </div>

      </div>
    </section>
  );
}
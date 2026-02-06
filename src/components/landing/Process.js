"use client";

import { CheckCircle2, Link, Search, TrendingUp, Sparkles, ArrowDown } from "lucide-react";

const steps = [
  {
    title: "חיבור נכסים מאובטח",
    description: "בתוך פחות מ-2 דקות, מחברים את כל חשבונות הבנק, כרטיסי האשראי ותיקי ההשקעות באמצעות תקן הבנקאות הפתוחה (Open Banking).",
    icon: <Link size={24} />,
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-200",
    lightColor: "bg-blue-50"
  },
  {
    title: "סריקת עומק (X-Ray)",
    description: "ה-AI שלנו סורק 3 שנים אחורה, מזהה חיובים כפולים, עמלות מיותרות, ודפוסים נסתרים בהתנהלות הפיננסית שלכם.",
    icon: <Search size={24} />,
    color: "from-indigo-500 to-indigo-600",
    shadow: "shadow-indigo-200",
    lightColor: "bg-indigo-50"
  },
  {
    title: "בניית אסטרטגיה וצמיחה",
    description: "המערכת בונה אוטומטית תקציב חכם, וממליצה על אפיקי חיסכון והשקעה מותאמים אישית כדי להגדיל את ההון המשפחתי.",
    icon: <TrendingUp size={24} />,
    color: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-200",
    lightColor: "bg-emerald-50"
  }
];

export default function Process() {
  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden" id="process">

      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500 text-xs font-bold mb-6 uppercase tracking-wider shadow-sm">
            <Sparkles size={12} className="text-indigo-500" /> How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tight">
            ממורכבות <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">לפשטות</span>
          </h2>
          <p className="text-xl text-slate-500 font-light">שלושה צעדים פשוטים לשליטה פיננסית מלאה</p>
        </div>

        <div className="relative">
          {/* הקו המחבר (Timeline Line) */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-indigo-300 to-emerald-200 hidden md:block transform -translate-x-1/2"></div>

          <div className="space-y-16 md:space-y-32">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* צד הטקסט */}
                <div className="flex-1 w-full md:w-1/2 md:px-16">
                  <div className={`
                    p-8 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white/60 
                    hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 
                    relative overflow-hidden group text-center md:text-right
                  `}>
                    {/* Gradient Hover Glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}></div>

                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 mx-auto md:mx-0 shadow-lg ${step.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* הנקודה על הציר (Timeline Dot) */}
                <div className="relative flex-shrink-0 z-10 hidden md:flex items-center justify-center w-14 h-14 bg-white border border-slate-100 rounded-full shadow-md">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${step.color} animate-pulse shadow-sm`}></div>
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-16 text-slate-300">
                      <ArrowDown size={14} className="animate-bounce" />
                    </div>
                  )}
                </div>

                {/* צד ריק לאיזון (Spacer) */}
                <div className="flex-1 w-full md:w-1/2 hidden md:block"></div>

              </div>
            ))}
          </div>
        </div>

        {/* Call to Action פנימי */}
        <div className="mt-32 text-center">
          <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-800/20 hover:-translate-y-1">
            התחילו את התהליך עכשיו
          </button>
        </div>
      </div>
    </section>
  );
}
"use client";

import { CheckCircle2, Link, Search, TrendingUp } from "lucide-react";

const steps = [
  {
    title: "חיבור נכסים מאובטח",
    description: "בתוך פחות מ-2 דקות, מחברים את כל חשבונות הבנק, כרטיסי האשראי ותיקי ההשקעות באמצעות תקן הבנקאות הפתוחה (Open Banking).",
    icon: <Link size={24} />,
    color: "bg-blue-600"
  },
  {
    title: "סריקת עומק (X-Ray)",
    description: "ה-AI שלנו סורק 3 שנים אחורה, מזהה חיובים כפולים, עמלות מיותרות, ודפוסים נסתרים בהתנהלות הפיננסית שלכם.",
    icon: <Search size={24} />,
    color: "bg-indigo-600"
  },
  {
    title: "בניית אסטרטגיה וצמיחה",
    description: "המערכת בונה אוטומטית תקציב חכם, וממליצה על אפיקי חיסכון והשקעה מותאמים אישית כדי להגדיל את ההון המשפחתי.",
    icon: <TrendingUp size={24} />,
    color: "bg-emerald-600"
  }
];

export default function Process() {
  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            ממורכבות <span className="text-indigo-600">לפשטות</span>
          </h2>
          <p className="text-lg text-slate-500">שלושה צעדים פשוטים לשליטה פיננסית מלאה</p>
        </div>

        <div className="relative">
          {/* הקו המחבר (Timeline Line) */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-slate-200 hidden md:block transform -translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* צד הטקסט */}
                <div className="flex-1 w-full md:w-1/2 md:px-12">
                  <div className={`p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group text-center md:text-right`}>
                     {/* מסגרת צבעונית עדינה בצד */}
                     <div className={`absolute top-0 right-0 w-1.5 h-full ${step.color} opacity-80`}></div>
                     
                     <div className={`w-12 h-12 rounded-2xl ${step.color} bg-opacity-10 flex items-center justify-center text-white mb-6 mx-auto md:mx-0 shadow-lg`}>
                        <div className={`${step.color} p-2.5 rounded-xl`}>
                            {step.icon}
                        </div>
                     </div>
                     
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                     <p className="text-slate-500 leading-relaxed">
                        {step.description}
                     </p>
                  </div>
                </div>

                {/* הנקודה על הציר (Timeline Dot) */}
                <div className="relative flex-shrink-0 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white border-4 border-slate-100 rounded-full shadow-sm">
                   <div className={`w-4 h-4 rounded-full ${step.color}`}></div>
                </div>

                {/* צד ריק לאיזון (Spacer) */}
                <div className="flex-1 w-full md:w-1/2 hidden md:block"></div>
                
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action פנימי */}
        <div className="mt-24 text-center">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-200">
                התחילו את התהליך עכשיו
            </button>
        </div>
      </div>
    </section>
  );
}
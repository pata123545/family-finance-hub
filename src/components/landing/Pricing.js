"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, X, ArrowLeft } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "למשפחות בתחילת הדרך שרוצות סדר בסיסי.",
      price: isAnnual ? "0" : "0",
      period: "תמיד בחינם",
      features: [
        "חיבור לחשבון בנק אחד",
        "סיווג הוצאות ידני",
        "דוחות חודשיים בסיסיים",
        "אפליקציה למובייל",
      ],
      notIncluded: ["סינכרון אוטומטי מלא", "AI CFO אישי", "ניהול השקעות"],
      cta: "התחילו חינם",
      popular: false,
    },
    {
      id: "family_office",
      name: "Family Office",
      description: "החבילה המושלמת לשליטה מלאה וצמיחה.",
      price: isAnnual ? "49" : "59",
      period: "לחודש",
      features: [
        "חיבור לכל הבנקים והכרטיסים",
        "סיווג אוטומטי מבוסס AI",
        "התראות חריגה בזמן אמת",
        "ניהול תקציב חכם",
        "תמיכה בוואטסאפ",
      ],
      notIncluded: ["ייעוץ אנושי אישי"],
      cta: "נסו 14 יום חינם",
      popular: true,
    },
    {
      id: "private_wealth",
      name: "Private Wealth",
      description: "ליווי היברידי (טכנולוגיה + אדם) לניהול הון.",
      price: isAnnual ? "119" : "139",
      period: "לחודש",
      features: [
        "כל הפיצ'רים של Family Office",
        "פגישת רבעונית עם מומחה פיננסי",
        "אופטימיזציית מס",
        "ניהול תיק השקעות",
        "ערוץ VIP ישיר",
      ],
      notIncluded: [],
      cta: "צור קשר להצטרפות",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="w-full py-24 bg-[#F8FAFC] relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* כותרת */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold tracking-wide mb-4">
            שקיפות מלאה
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            השקעה קטנה <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">לעתיד גדול</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            בחרו את המסלול שמתאים לשלב שבו המשפחה שלכם נמצאת כרגע.
            אפשר לשדרג או לבטל בכל רגע.
          </p>

          {/* מתג חודשי/שנתי משופר */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <span className={`text-base font-medium transition-colors duration-300 ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>חודשי</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-16 h-9 bg-slate-200 rounded-full p-1 relative transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div className={`w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 transform ${isAnnual ? '-translate-x-7' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-base font-medium transition-colors duration-300 ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
              שנתי <span className="text-emerald-600 text-[10px] font-bold bg-emerald-100/50 px-2 py-0.5 rounded-full mr-1.5 align-middle border border-emerald-100">-20%</span>
            </span>
          </div>
        </div>

        {/* הגריד של הכרטיסים */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-[2rem] p-8 flex flex-col transition-all duration-500 group
                ${plan.popular
                  ? 'border-0 ring-1 ring-indigo-200 shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] scale-105 z-10'
                  : 'border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2'
                }`}
            >
              {plan.popular && (
                <>
                  <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-20 blur-sm -z-10"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-xl ring-4 ring-[#F8FAFC]">
                    <Sparkles size={12} className="text-amber-300" /> MOST POPULAR
                  </div>
                </>
              )}

              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-3 ${plan.popular ? 'text-indigo-900' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className="text-sm text-slate-500 min-h-[40px] leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className={`text-5xl font-extrabold tracking-tight ${plan.popular ? 'text-slate-900' : 'text-slate-900'}`}>₪{plan.price}</span>
                <span className="text-slate-400 text-base font-medium">/{plan.period}</span>
              </div>

              {/* כפתור פעולה מחובר ללינק */}
              <Link href={`/register?plan=${plan.id}&billing=${isAnnual ? 'annual' : 'monthly'}`} className="w-full">
                <button className={`w-full py-4 rounded-xl font-bold text-lg mb-8 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3
                    ${plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
                    : 'bg-white text-slate-700 border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}>
                  {plan.cta}
                  {plan.popular && <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />}
                </button>
              </Link>

              {/* רשימת הפיצ'רים */}
              <div className="space-y-4 text-sm flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">מה בחבילה:</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${plan.popular ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-40">
                    <div className="mt-0.5 rounded-full p-0.5 bg-slate-50 text-slate-400 flex-shrink-0">
                      <X size={12} strokeWidth={3} />
                    </div>
                    <span className="text-slate-500 line-through decoration-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* הערה קטנה למטה */}
        <p className="text-center text-slate-400 text-xs mt-16 max-w-lg mx-auto leading-relaxed">
          * המחירים כוללים מע״מ. החיוב מתבצע בשקלים חדשים.
          ניתן לבטל את המנוי בכל עת דרך הגדרות החשבון ללא קנסות יציאה או אותיות קטנות.
        </p>

      </div>
    </section>
  );
}
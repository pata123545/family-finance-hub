"use client";

import { useState } from "react";
import { Check, Sparkles, X } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
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
      popular: true, // זה הכרטיס המודגש
    },
    {
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
    <section id="pricing" className="w-full py-24 bg-[#F8FAFC] relative">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* כותרת */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            השקעה קטנה <span className="text-indigo-600">לעתיד גדול</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            בחרו את המסלול שמתאים לשלב שבו המשפחה שלכם נמצאת כרגע.
            אפשר לשדרג או לבטל בכל רגע.
          </p>

          {/* מתג חודשי/שנתי */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>חודשי</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-slate-900 rounded-full p-1 relative transition-colors focus:outline-none"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${isAnnual ? 'translate-x-[-24px]' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              שנתי <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full mr-1">-20%</span>
            </span>
          </div>
        </div>

        {/* הגריד של הכרטיסים */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-[2rem] p-8 border transition-all duration-300 flex flex-col
                ${plan.popular 
                  ? 'border-indigo-600 shadow-[0_20px_40px_-10px_rgba(79,70,229,0.15)] scale-105 z-10 ring-4 ring-indigo-50' 
                  : 'border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1 shadow-lg">
                  <Sparkles size={12} fill="currentColor" /> MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-500 min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">₪{plan.price}</span>
                <span className="text-slate-400 text-sm font-medium">/{plan.period}</span>
              </div>

              {/* כפתור פעולה */}
              <button className={`w-full py-4 rounded-xl font-bold mb-8 transition-all duration-300
                ${plan.popular 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                  : 'bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}>
                {plan.cta}
              </button>

              {/* רשימת הפיצ'רים */}
              <div className="space-y-4 text-sm flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-50">
                    <div className="mt-0.5 rounded-full p-0.5 bg-slate-50 text-slate-400">
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
        <p className="text-center text-slate-400 text-xs mt-12">
          * המחירים כוללים מע״מ. ניתן לבטל את המנוי בכל עת ללא קנסות יציאה.
        </p>

      </div>
    </section>
  );
}
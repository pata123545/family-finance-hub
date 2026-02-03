"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ShieldCheck, TrendingUp, Activity, Star, PieChart, Wallet, CreditCard, ArrowUpRight } from "lucide-react";

// --- נתוני ה-Mockup נשארים אותו דבר ---
const screenMockups = [
  {
    id: 1,
    title: "מבט על",
    icon: <Activity size={20} />, // הקטנתי טיפה אייקונים
    content: (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">שווי נקי</p>
            <h3 className="text-3xl font-bold text-slate-900 font-mono tracking-tight">₪2,450,000</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-bold">
            <TrendingUp size={14} /> +12.5%
          </div>
        </div>
        <div className="h-40 w-full flex items-end justify-between gap-2"> {/* הקטנתי גובה גרף */}
          {[45, 60, 50, 75, 55, 90, 80].map((h, i) => (
            <div key={i} className="w-full bg-indigo-50/50 rounded-t-lg h-full flex items-end overflow-hidden">
              <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-500 rounded-t-lg opacity-90 transition-all duration-500" style={{ height: `${h}%` }}></div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  // ... שאר המסכים (אותו קוד, רק התאמות קטנות אם צריך) ...
   {
    id: 2,
    title: "תקציב חכם",
    icon: <PieChart size={20} />,
    content: (
      <div className="space-y-5">
         <div className="flex justify-between items-center mb-2">
            <h4 className="text-base font-bold text-slate-900">הוצאות החודש</h4>
            <span className="text-slate-400 text-xs">אוקטובר 2023</span>
         </div>
         <div className="space-y-3">
            {[
              { name: "מגורים", amount: "₪6,500", color: "bg-blue-500", percent: "45%" },
              { name: "מזון", amount: "₪3,200", color: "bg-emerald-500", percent: "25%" },
              { name: "פנאי", amount: "₪2,800", color: "bg-amber-500", percent: "20%" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">{item.name}</span>
                  <span className="font-bold text-slate-900">{item.amount}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: item.percent }}></div>
                </div>
              </div>
            ))}
         </div>
      </div>
    )
  },
  {
    id: 3,
    title: "השקעות",
    icon: <Wallet size={20} />,
    content: (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
             <p className="text-[10px] text-slate-400 mb-1">רווח כולל</p>
             <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">+₪145k <ArrowUpRight size={14}/></p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
             <p className="text-[10px] text-slate-400 mb-1">תשואה</p>
             <p className="text-lg font-bold text-slate-900">8.4%</p>
          </div>
        </div>
        <div className="space-y-2">
           {[
             { symbol: "S&P 500", value: "₪450k", change: "+1.2%" },
             { symbol: "נדל״ן", value: "₪1.2M", change: "+0.5%" },
           ].map((asset, i) => (
             <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-500">
                   <CreditCard size={12} />
                 </div>
                 <span className="font-bold text-slate-700 text-sm">{asset.symbol}</span>
               </div>
               <div className="text-right">
                 <p className="font-bold text-slate-900 text-sm">{asset.value}</p>
               </div>
             </div>
           ))}
        </div>
      </div>
    )
  }
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3; // הקטנתי את זווית הסיבוב (יותר עדין)
    const rotateY = ((x - centerX) / centerX) * 3;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % screenMockups.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    // שינוי 1: min-h-[90vh] מבטיח גובה, flex items-center ממרכז הכל
    <section className="w-full relative min-h-[95vh] flex items-center overflow-hidden bg-[#F8FAFC]">
      
      {/* רקע */}
      <div className="absolute inset-0 z-0 opacity-[0.25]" 
           style={{ backgroundImage: 'linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(to right, #CBD5E1 1px, transparent 1px)', backgroundSize: '90px 90px' }}>
      </div>

      {/* ה-Blobs ברקע קצת יותר רחוקים */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-[pulse_10s_infinite]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-[pulse_15s_infinite]"></div>

      {/* קונטיינר ראשי */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-32"> {/* הגדלתי GAP ל-32 */}
        
        {/* צד ימין: טקסט (הוקטן מעט וקיבל יותר אוויר) */}
        <div className="flex-1 lg:flex-[1.2] text-center lg:text-right pt-20 lg:pt-0">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8 transform cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-slate-500 text-xs font-bold tracking-wide">FAMILY OFFICE 2.0</span>
          </div>

          {/* הכותרת הוקטנה מ-8xl ל-7xl ומרווח השורות גדל */}
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            ניהול הון משפחתי <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 via-blue-600 to-indigo-600 animate-[text-shimmer_4s_infinite] bg-[length:200%_auto]">
              בסטנדרט בינלאומי
            </span>
          </h1>
          
          {/* התיאור הוקטן מ-2xl ל-xl כדי לא להשתלט */}
          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
            הפלטפורמה שנותנת לך שליטה אבסולוטית. 
            סנכרון נכסים בזמן אמת, אופטימיזציה של התחייבויות, ובינה מלאכותית שעובדת בשבילך.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 flex items-center justify-center gap-2 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">פתיחת תיק <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm hover:border-slate-300">
              איך זה עובד?
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 border-t border-slate-200/50 pt-6 max-w-xl">
             <div className="flex flex-col gap-0.5"><span className="text-2xl font-bold text-slate-900">₪2.4B+</span><span className="text-xs text-slate-500 font-medium">נכסים מנוהלים</span></div>
             <div className="w-px h-8 bg-slate-200"></div>
             <div className="flex flex-col gap-0.5"><span className="text-2xl font-bold text-slate-900">15k+</span><span className="text-xs text-slate-500 font-medium">משפחות</span></div>
             <div className="w-px h-8 bg-slate-200"></div>
             <div className="flex items-center gap-2"><ShieldCheck className="text-indigo-600" size={20} /><span className="text-xs text-slate-500 font-medium">ISO 27001</span></div>
          </div>
        </div>

        {/* צד שמאל: הכרטיס הוקטן כדי לא להשתלט */}
        <div 
            className="flex-1 w-full max-w-[600px] relative perspective-1000 pb-20 lg:pb-0" // הקטנתי את ה-max-w ל-600px
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
        >
          <div 
             className="absolute top-8 left-8 w-full h-full bg-indigo-900/5 rounded-[2rem] -z-10 blur-sm transition-transform duration-100 ease-out"
             style={{ transform: `rotateX(${rotation.x * -1}deg) rotateY(${rotation.y * -1}deg) scale(0.95)` }}
          ></div>

          <div 
             className="relative bg-white rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden h-[480px] transition-transform duration-100 ease-out transform-gpu" // הקטנתי גובה ל-480px
             style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            {/* תוכן המסכים */}
            {screenMockups.map((screen, index) => (
              <div 
                key={screen.id}
                className={`absolute inset-0 p-8 transition-all duration-1000 ease-in-out flex flex-col select-none
                  ${index === activeIndex ? 'opacity-100 z-10 translate-y-0 scale-100' : 'opacity-0 z-0 translate-y-4 scale-95 pointer-events-none'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-inner">
                    {screen.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{screen.title}</h3>
                </div>
                
                <div className="flex-1">
                  {screen.content}
                </div>
              </div>
            ))}

            {/* אינדיקטורים */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
              {screenMockups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-6 bg-indigo-600' : 'w-1.5 bg-slate-300 hover:bg-indigo-400'}`}
                />
              ))}
            </div>
          </div>

          {/* כרטיס צף מוקטן */}
          <div className="absolute -bottom-0 -right-4 bg-white p-4 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] border border-slate-50 w-56 z-30 hidden sm:block animate-[float_5s_ease-in-out_infinite]">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
                    <Star size={14} fill="currentColor" />
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-xs mb-0.5">סנכרון הושלם</p>
                    <p className="text-[10px] text-slate-500 leading-snug font-medium">
                        הנתונים מעודכנים לעכשיו.
                    </p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
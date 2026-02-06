"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, TrendingUp, Activity, Star, PieChart, Wallet, CreditCard, ArrowUpRight, Lock } from "lucide-react";

// --- Custom Hook for Count Up Animation ---
function useCountUp(end, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (easeOutExpo)
      const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

      setCount(end * ease);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count.toFixed(decimals);
}

// --- נתוני ה-Mockup נשארים אותו דבר ---
const screenMockups = [
  {
    id: 1,
    title: "מבט על",
    icon: <Activity size={20} />,
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
        <div className="h-40 w-full flex items-end justify-between gap-2">
          {[45, 60, 50, 75, 55, 90, 80].map((h, i) => (
            <div key={i} className="w-full bg-indigo-50/50 rounded-t-lg h-full flex items-end overflow-hidden">
              <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-500 rounded-t-lg opacity-90 transition-all duration-500" style={{ height: `${h}%` }}></div>
            </div>
          ))}
        </div>
      </div>
    )
  },
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
            <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">+₪145k <ArrowUpRight size={14} /></p>
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

  // Counters
  const assetsCount = useCountUp(2.4, 2500, 1);
  const familiesCount = useCountUp(15, 2000, 0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
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
    <section className="w-full relative min-h-[95vh] flex items-center overflow-hidden bg-[#F8FAFC]"> {/* הוספתי overflow-hidden כדי למנוע גלילה מיותרת */}

      {/* רקע עם טקסטורה עדינה יותר */}
      <div className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', // נקודות במקום פסים לרקע נקי יותר
          backgroundSize: '40px 40px'
        }}>
      </div>

      {/* ה-Blobs עם טקסטורת Noise */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-[pulse_10s_infinite]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-[pulse_15s_infinite]"></div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* קונטיינר ראשי */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

        {/* צד ימין: טקסט */}
        <div className="flex-1 lg:flex-[1.2] text-center lg:text-right pt-32 lg:pt-0">

          {/* New Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-indigo-100 shadow-sm mb-8 transform cursor-default group hover:border-indigo-200 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-slate-600 text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-slate-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-blue-600 transition-all">
              Family Office 2.0
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
            ניהול הון משפחתי <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 via-blue-500 to-indigo-600 animate-[text-shimmer_6s_infinite] bg-[length:200%_auto]">
              בסטנדרט בינלאומי
            </span>
          </h1>

          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
            הפלטפורמה המאובטחת שמרכזת את כל הנכסים, ההתחייבויות וההשקעות של המשפחה במקום אחד. כולל סמנכ״ל כספים מבוסס AI.
          </p>

          <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start items-center mb-14">
            <Link href="/register">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">פתיחת תיק <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /></span>
              </button>
            </Link>
            <Link href="/how-it-works" className="hidden lg:block">
              <button className="px-8 py-4 bg-white/50 backdrop-blur-sm text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-sm hover:border-slate-300">
                איך זה עובד?
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 border-t border-slate-200/60 pt-8 max-w-xl">
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">₪{assetsCount}B+</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">נכסים מנוהלים</span>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{familiesCount}k+</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">משפחות</span>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col gap-0.5 justify-center h-full">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <ShieldCheck size={24} />
                <Lock size={16} className="text-emerald-500" />
              </div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">ISO 27001 Secured</span>
            </div>
          </div>
        </div>

        {/* צד שמאל: הכרטיס עם אפקט זכוכית */}
        <div
          className="flex-1 w-full max-w-[600px] relative perspective-1000 pb-20 lg:pb-0"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}
        >
          {/* Shadow Blob moving with card */}
          <div
            className="absolute top-12 left-12 w-full h-full bg-indigo-900/10 rounded-[2.5rem] -z-10 blur-xl transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: `rotateX(${rotation.x * -1}deg) rotateY(${rotation.y * -1}deg) scale(0.95)` }}
          ></div>

          {/* Main Glass Card */}
          <div
            className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl ring-1 ring-white/50 border border-white/60 overflow-hidden h-[500px] transition-transform duration-100 ease-out transform-gpu will-change-transform"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
            }}
          >
            {/* Reflet (Shine effect) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-50 pointer-events-none z-20"></div>

            {/* תוכן המסכים */}
            {screenMockups.map((screen, index) => (
              <div
                key={screen.id}
                className={`absolute inset-0 p-8 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col select-none
                  ${index === activeIndex ? 'opacity-100 z-10 translate-y-0 filter-none' : 'opacity-0 z-0 translate-y-4 blur-sm pointer-events-none'}`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                    {screen.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{screen.title}</h3>
                    <div className="h-1 w-8 bg-indigo-500 rounded-full mt-1"></div>
                  </div>

                </div>

                <div className="flex-1 relative">
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
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>

          {/* כרטיס צף מוקטן - Floating Notification */}
          <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-64 z-30 hidden sm:flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">המידע שלך מוגן</p>
              <p className="text-xs text-slate-500 leading-snug">
                הצפנה ברמה בנקאית (AES-256)
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
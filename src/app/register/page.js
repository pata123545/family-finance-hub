'use client';

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, User, Mail, Phone, Lock, Loader2, Send, CheckCircle2, Globe, TrendingUp, Zap, BarChart3, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Auto-Rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
          phone: formData.phone,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setIsLoading(false);

    if (error) {
      alert("שגיאה בהרשמה: " + error.message);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans overflow-hidden" dir="rtl">

      {/* --- RIGHT SIDE: FORM (Clean Luxury) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 sm:px-14 lg:px-28 relative bg-slate-50/50">

        {/* Back Button (Glass Pill) */}
        {!isSubmitted && (
          <Link href="/" className="absolute top-8 right-8 flex items-center gap-2.5 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md text-xs font-bold text-slate-500 hover:text-indigo-600 transition-all z-20 group">
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> יציאה
          </Link>
        )}

        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">

          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-[#4f39f6] blur-md rounded-xl group-hover:bg-[#4f39f6]/30 transition-all"></div>
              <div className="relative w-12 h-12 bg-[#4f39f6] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-200 transform group-hover:rotate-3 transition-transform duration-300">
                F
                <div className="absolute top-[2px] right-[2px] w-4 h-4 bg-white/10 rounded-bl-lg"></div>
              </div>
            </div>
            <div>
              <span className="block text-2xl font-black tracking-tight text-slate-900 leading-none">
                Family<span className="text-indigo-600">Hub</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Join the Future</span>
            </div>
          </div>

          {/* Content Area */}
          {isSubmitted ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-100">
                <Send size={32} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-3">מייל אימות נשלח!</h1>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                היי <span className="font-bold text-slate-900">{formData.name.split(" ")[0]}</span>, שלחנו קישור לכתובת: <br />
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-900 font-bold mt-1 inline-block">{formData.email}</span>
              </p>
              <Link href="/login" className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group">
                חזרה להתחברות <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="relative">
              {/* Progress Indicator */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'bg-indigo-600 w-8' : 'bg-slate-200 w-4'}`}></div>
                ))}
              </div>

              <form onSubmit={step === 3 ? handleSubmit : nextStep} className="space-y-6">

                {/* Step 1: Name */}
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">נעים להכיר!</h1>
                    <p className="text-lg text-slate-500 font-medium mb-8">איך לקרוא לך במערכת?</p>

                    <div className="space-y-2 group text-right">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">שם מלא</label>
                      <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                        <input
                          type="text"
                          required
                          autoFocus
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-14 bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl px-5 pl-12 transition-all outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal shadow-sm group-hover:border-slate-300 focus:ring-4 focus:ring-indigo-500/10"
                          placeholder="ישראל ישראלי"
                        />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact */}
                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">פרטי התקשרות</h1>
                    <p className="text-lg text-slate-500 font-medium mb-8">לאן לשלוח עדכונים חשובים?</p>

                    <div className="space-y-4">
                      <div className="space-y-2 group text-right">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">אימייל</label>
                        <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                          <input
                            type="email"
                            required
                            autoFocus
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            style={{ direction: 'ltr', textAlign: 'right' }}
                            className="w-full h-14 bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl px-5 pl-12 transition-all outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal shadow-sm group-hover:border-slate-300 focus:ring-4 focus:ring-indigo-500/10"
                            placeholder="name@example.com"
                          />
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        </div>
                      </div>

                      <div className="space-y-2 group text-right">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">טלפון</label>
                        <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            style={{ direction: 'ltr', textAlign: 'right' }}
                            className="w-full h-14 bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl px-5 pl-12 transition-all outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal shadow-sm group-hover:border-slate-300 focus:ring-4 focus:ring-indigo-500/10"
                            placeholder="050-0000000"
                          />
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Password */}
                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">אבטחת חשבון</h1>
                    <p className="text-lg text-slate-500 font-medium mb-8">בחר סיסמה חזקה להגנה על הנכסים.</p>

                    <div className="space-y-2 group text-right">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">סיסמה</label>
                      <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                        <input
                          type="password"
                          required
                          autoFocus
                          value={formData.password}
                          onChange={e => setFormData({ ...formData, password: e.target.value })}
                          style={{ direction: 'ltr', textAlign: 'right' }}
                          className="w-full h-14 bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl px-5 pl-12 transition-all outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal shadow-sm group-hover:border-slate-300 focus:ring-4 focus:ring-indigo-500/10"
                          placeholder="••••••••"
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Buttons logic */}
                <div className="flex gap-4 pt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 h-14 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors"
                    >
                      חזרה
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-14 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-lg shadow-slate-300 hover:shadow-indigo-200 hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isLoading ? <Loader2 size={20} className="animate-spin text-white/70" /> : (
                      <>
                        <span>{step === 3 ? "יצירת חשבון" : "המשך"}</span>
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm font-medium">
                  כבר יש לך חשבון? <Link href="/login" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-colors">התחברות</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- LEFT SIDE: CAROUSEL (Electric Indigo - EXACT MATCH TO LOGIN) --- */}
      <div
        className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-16 xl:p-24 text-white transition-all duration-1000"
        style={{ backgroundColor: '#4f39f6' }}
      >

        {/* Carousel Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">

          {/* Slide 1: One Place */}
          <div className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center ${currentSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-xs font-bold mb-8 w-fit">
              <Globe size={14} /> <span>Centralized Hub</span>
            </div>
            <h2 className="text-5xl font-black leading-[1.15] mb-6 drop-shadow-lg">
              כל הנכסים והתקציבים <br />
              <span className="text-white/90">במקום אחד.</span>
            </h2>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-lg mb-12">
              תמונת מצב מלאה בזמן אמת. נדל"ן, השקעות, חסכונות והוצאות שוטפות בממשק אחד חכם.
            </p>
            {/* Visual 1 */}
            <div className="relative w-full h-64">
              <div className="absolute top-0 right-0 w-72 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl transform rotate-[-3deg]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white"><TrendingUp size={24} /></div>
                  <div>
                    <p className="text-xs text-indigo-100 uppercase font-bold">שווי נקי</p>
                    <p className="text-2xl font-black text-white">₪2.4M</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden"><div className="h-full w-[85%] bg-white rounded-full"></div></div>
                  <div className="flex justify-between text-xs text-indigo-100 font-bold"><span>נכסים</span><span>+12%</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2: Smart Management */}
          <div className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center ${currentSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-xs font-bold mb-8 w-fit">
              <Zap size={14} /> <span>AI Powered</span>
            </div>
            <h2 className="text-5xl font-black leading-[1.15] mb-6 drop-shadow-lg">
              ניהול פיננסי חכם <br />
              <span className="text-white/90">למשפחות שרוצות יותר.</span>
            </h2>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-lg mb-12">
              המערכת לומדת את ההרגלים שלכם, מזהה חריגות ומציעה דרכים חכמות לצמיחה כלכלית.
            </p>
            {/* Visual 2 */}
            <div className="relative w-full h-64">
              <div className="absolute top-0 right-0 w-72 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl transform rotate-[2deg]">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white"><BarChart3 size={24} /></div>
                  <span className="bg-emerald-400 text-emerald-900 text-xs font-bold px-2 py-1 rounded-full">+4,200₪</span>
                </div>
                <p className="text-lg font-bold text-white mb-1">זוהתה הזדמנות לחיסכון</p>
                <p className="text-sm text-indigo-100 opacity-80">חסכון צפוי בביטוחים השנה</p>
              </div>
            </div>
          </div>

          {/* Slide 3: Security */}
          <div className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center ${currentSlide === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-xs font-bold mb-8 w-fit">
              <Shield size={14} /> <span>Bank-Grade Security</span>
            </div>
            <h2 className="text-5xl font-black leading-[1.15] mb-6 drop-shadow-lg">
              שקט נפשי מלא <br />
              <span className="text-white/90">בסטנדרט בנקאי.</span>
            </h2>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-lg mb-12">
              הצפנה מקצה לקצה, גיבויים אוטומטיים ותקני אבטחה מחמירים (ISO 27001) לשמירה על הפרטיות.
            </p>
            {/* Visual 3 */}
            <div className="relative w-full h-64">
              <div className="absolute top-4 right-10 w-64 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-full shadow-2xl flex items-center justify-center aspect-square">
                <div className="text-center">
                  <Shield size={64} className="text-white mx-auto mb-4 opacity-90" />
                  <p className="text-xl font-black text-white">SECURE</p>
                  <p className="text-xs font-bold text-indigo-200 tracking-widest mt-1">ENCRYPTED 256-BIT</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Indicators */}
        <div className="relative z-20 flex gap-3 pt-8">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
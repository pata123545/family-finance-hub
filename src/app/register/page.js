"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Shield, User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// תיקון הייבוא: משתמשים באובייקט המוכן מה-lib
import { supabase } from "@/lib/supabase"; 

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // פונקציה למעבר שלבים
  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // --- הפונקציה המעודכנת שמבצעת הרשמה אמיתית ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // שליחת בקשה ל-Supabase
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        // המידע הזה יישמר ב-User Metadata
        data: {
          full_name: formData.name,
          phone: formData.phone,
        },
      },
    });

    if (error) {
      alert("שגיאה בהרשמה: " + error.message);
      setIsLoading(false);
      return;
    }

    // אם ההרשמה הצליחה -> מעבר לדשבורד
    router.push("/dashboard");
  };

  // חישוב אחוז התקדמות
  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen w-full flex bg-white font-sans" dir="rtl">
      
      {/* --- צד ימין: הטופס (Wizard) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 relative py-12 lg:py-0 transition-all">
        
        {/* כפתור חזרה */}
        <Link href="/" className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 flex items-center gap-2 text-sm font-medium transition-colors">
          <ArrowRight size={16} /> יציאה
        </Link>

        {/* בר התקדמות עליון */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
           <div className="h-full bg-indigo-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="max-w-md w-full mx-auto">
          
          <div className="flex items-center gap-2 mb-12 opacity-80">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-xs">F</div>
            <span className="font-bold text-slate-900">FamilyOffice</span>
          </div>

          <form onSubmit={step === 3 ? handleSubmit : nextStep} className="min-h-[300px] flex flex-col justify-between">
            
            {/* שלב 1: היכרות */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight text-right">
                  נעים להכיר! <br /> איך לקרוא לך?
                </h1>
                <p className="text-slate-500 mb-8 text-lg text-right">כדי שנדע איך לפנות אליך במערכת.</p>
                
                <div className="space-y-4">
                  <div className="relative group text-right">
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 pr-12 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-xl text-slate-900 font-bold placeholder:font-normal text-right"
                      placeholder="השם המלא שלך"
                      autoFocus
                      required
                    />
                    <User className="absolute right-4 top-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  </div>
                </div>
              </div>
            )}

            {/* שלב 2: פרטי קשר */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                 <button type="button" onClick={prevStep} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium mb-6">
                    <ArrowRight size={14}/> חזרה
                 </button>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight text-right">
                  היי {formData.name.split(" ")[0]}, <br /> איך נשמור על קשר?
                </h1>
                <p className="text-slate-500 mb-8 text-lg text-right">פרטים אלו ישמשו אותך להתחברות בעתיד.</p>
                
                <div className="space-y-4">
                  <div className="relative group text-right">
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-4 pr-12 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-lg text-slate-900 font-bold placeholder:font-normal text-right"
                      placeholder="כתובת האימייל שלך"
                      autoFocus
                      required
                    />
                    <Mail className="absolute right-4 top-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  </div>
                  <div className="relative group text-right">
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-5 py-4 pr-12 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-lg text-slate-900 font-bold placeholder:font-normal text-right"
                      placeholder="מספר נייד (05X...)"
                      required
                    />
                    <Phone className="absolute right-4 top-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  </div>
                </div>
              </div>
            )}

            {/* שלב 3: סיסמה */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <button type="button" onClick={prevStep} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium mb-6">
                    <ArrowRight size={14}/> חזרה
                 </button>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight text-right">
                  צעד אחרון <br /> וסיימנו.
                </h1>
                <p className="text-slate-500 mb-8 text-lg text-right">בחר סיסמה חזקה שתגן על המידע שלך.</p>
                
                <div className="space-y-4">
                  <div className="relative group text-right">
                    <input 
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-5 py-4 pr-12 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-xl text-slate-900 font-bold placeholder:font-normal text-right"
                      placeholder="••••••••"
                      autoFocus
                      required
                    />
                    <Lock className="absolute right-4 top-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  </div>
                  
                  <div className="flex items-start gap-3 pt-2 px-1 justify-start">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" required />
                    <p className="text-xs text-slate-500 leading-snug text-right">
                        אני מאשר/ת את <a href="#" className="text-indigo-600 font-bold">תנאי השימוש</a>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10">
              <button 
                type="submit" 
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {step === 3 ? "יצירת חשבון" : "המשך"} 
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              {step === 1 && (
                 <p className="mt-6 text-center text-sm text-slate-500">
                    כבר יש לך חשבון? <Link href="/login" className="text-indigo-600 font-bold hover:underline transition-colors">התחברות</Link>
                 </p>
              )}
            </div>

          </form>
        </div>
      </div>

      {/* --- צד שמאל: האווירה --- */}
      <div className="hidden lg:flex w-1/2 bg-[#0B0F19] relative overflow-hidden flex-col justify-center items-center text-center p-16 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-lg">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/10">
             <Shield className="text-indigo-400" size={32} />
          </div>
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            המידע שלך מוצפן <br /> ומאובטח.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            אנחנו שומרים על הסטנדרטים הגבוהים ביותר של אבטחת מידע כדי שתוכל לנהל את הכספים שלך בראש שקט.
          </p>
          
          <div className="inline-flex flex-col gap-3 bg-white/5 p-6 rounded-2xl border border-white/10 text-right">
             <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>מערכת ניהול פיננסית חכמה</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>אבטחה בסטנדרט בנקאי</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>מעקב יעדים וחיסכון בזמן אמת</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
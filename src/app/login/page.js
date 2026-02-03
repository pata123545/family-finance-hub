'use client';

import { useState, useEffect } from "react";
import { ArrowRight, Mail, Lock, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// תיקון האימפורט: מייבאים את supabase עצמו ולא את הפונקציה ליצירתו
import { supabase } from "@/lib/supabase"; 

export default function LoginPage() {
  const router = useRouter();

  // סטייט לפרטי התחברות
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // בדיקה אם המשתמש כבר מחובר (זיכרון אוטומטי)
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setIsLoading(false);

    if (error) {
      alert("שגיאה בהתחברות: " + error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans" dir="rtl">
      
      {/* צד ימין: טופס */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 relative">
        
        <Link href="/" className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 flex items-center gap-2 text-sm font-medium transition-colors">
          <ArrowRight size={16} /> חזרה לאתר
        </Link>

        <div className="max-w-md w-full mx-auto">
          
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">F</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Family<span className="text-indigo-600">Office</span>
            </span>
          </div>

          <div className="min-h-[320px]">
            <form onSubmit={handleLogin} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2 font-sans text-right">היי, טוב לראות אותך</h1>
              <p className="text-slate-500 mb-8 font-sans text-right">הכנס אימייל וסיסמה כדי להתחבר לחשבונך.</p>

              <div className="space-y-6">
                {/* שדה אימייל */}
                <div className="relative group text-right">
                  <label className="block text-sm font-bold text-slate-700 mb-2 font-sans">כתובת אימייל</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ direction: 'rtl', textAlign: 'right' }}
                      className="w-full px-5 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-lg text-slate-900 font-medium placeholder:font-normal font-sans"
                      placeholder="your@email.com"
                      autoFocus
                      required
                    />
                    <Mail className="absolute left-4 top-5 text-slate-400" size={20} />
                  </div>
                </div>

                {/* שדה סיסמה */}
                <div className="relative group text-right">
                  <label className="block text-sm font-bold text-slate-700 mb-2 font-sans">סיסמה</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ direction: 'ltr', textAlign: 'right' }}
                      className="w-full px-5 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-lg text-slate-900 font-medium placeholder:font-normal font-sans"
                      placeholder="••••••••"
                      required
                    />
                    <Lock className="absolute left-4 top-5 text-slate-400" size={20} />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading || !email || password.length < 6}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70 font-sans"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>כניסה למערכת <ArrowLeft size={20}/></>}
                </button>
              </div>
            </form>
          </div>
          
          <p className="mt-12 text-center text-sm text-slate-500 font-sans">
              עדיין אין לך חשבון?{' '}
              <Link 
                href="/register" 
                className="text-indigo-600 font-bold hover:underline transition-colors"
              >
                פתח תיק בחינם
              </Link>
            </p>
        </div>
      </div>

      {/* צד שמאל: עיצוב גרפי */}
      <div className="hidden lg:flex w-1/2 bg-[#0B0F19] relative overflow-hidden flex-col justify-between p-16 text-white" dir="rtl">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-xs font-medium backdrop-blur-sm mb-6 font-sans">
            <ShieldCheck size={14} /> כניסה מאובטחת ומנוהלת
          </div>
          <h2 className="text-5xl font-extrabold leading-tight mb-6 text-right font-sans">
            פשוט, מהיר <br /> ובטוח יותר.
          </h2>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed text-right font-sans">
            המידע הפיננסי שלך מוגן תחת הסטנדרטים המחמירים ביותר של אבטחה ופרטיות.
          </p>
        </div>
      </div>
    </div>
  );
}
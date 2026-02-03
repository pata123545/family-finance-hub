"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { 
  User, CreditCard, Sparkles, Shield, 
  LogOut, Loader2, Save, BadgeCheck, Mail, Phone, Crown, ChevronLeft
} from "lucide-react";

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    occupation: "נהג מונית",
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;
      setUser(authUser);

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      setFormData({
        full_name: profile?.full_name || "",
        occupation: profile?.occupation || "נהג מונית"
      });
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: formData.full_name, occupation: formData.occupation })
      .eq('id', user.id);
    setSaving(false);
    if (!error) alert("הפרופיל עודכן בסטנדרט גבוה");
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <Loader2 className="animate-spin text-slate-200" size={40} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-8 font-sans bg-[#FAFAFB]" dir="rtl">
      
      {/* כותרת פרופיל יוקרתית */}
      <div className="relative mb-14 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-28 h-28 bg-[#1A1C1E] rounded-[2.2rem] flex items-center justify-center text-white text-4xl font-light shadow-2xl">
              {formData.full_name?.charAt(0) || "U"}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg border-4 border-white">
              <Crown size={16} />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-right space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl font-light text-black tracking-tight">{formData.full_name || "משתמש מערכת"}</h1>
              <BadgeCheck className="text-indigo-500" size={24} />
            </div>
            <p className="text-black font-medium tracking-wide uppercase text-[11px] opacity-70">
              {formData.occupation} • חשבון מנוהל על ידי Family Office AI
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* אזור תוכן מרכזי */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm transition-all hover:shadow-md">
            <h2 className="text-[11px] font-black text-black uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              <User size={14} className="text-indigo-600" />
              הגדרות זהות
            </h2>
            
            <form onSubmit={handleUpdateProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group space-y-3">
                  <label className="text-[10px] font-bold text-black mr-2 uppercase tracking-widest">שם מלא</label>
                  <input 
                    type="text" 
                    value={formData.full_name} 
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
                    className="w-full px-0 py-3 bg-transparent border-b border-slate-100 rounded-none text-black font-medium focus:border-indigo-500 transition-all outline-none" 
                    placeholder="הזן את שמך"
                  />
                </div>
                <div className="group space-y-3">
                  <label className="text-[10px] font-bold text-black mr-2 uppercase tracking-widest">סטטוס מקצועי</label>
                  <select 
                    value={formData.occupation} 
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})} 
                    className="w-full px-0 py-3 bg-transparent border-b border-slate-100 rounded-none text-base font-medium focus:border-indigo-500 transition-all outline-none cursor-pointer appearance-none"
                  >
                    <option value="נהג מונית">נהג מונית מקצועי</option>
                    <option value="עצמאי">עצמאי / יזם</option>
                    <option value="שכיר">מגזר פרטי</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-start pt-6">
            <button 
              type="submit" 
              disabled={saving} 
              className="group relative  w-40 h-12 px-12 py-2 bg-slate-900 text-white rounded-2xl transition-all duration-300 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 active:scale-95 shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-base font-bold tracking-wide">
                {saving ? (
                  <Loader2 size={20} className="animate-spin text-white/80" />
                ) : (
                  <Save size={20} className="text-white/90" />
                )}
                <span className="drop-shadow-sm">עדכון פרופיל</span>
              </span>
              
              {/* אפקט יוקרתי: הבהוב אור עדין שעובר על הכפתור במעבר עכבר */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
              </div>
            </form>
          </section>

          <section className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
            <h2 className="text-[10px] font-bold text-black uppercase tracking-[0.3em] mb-8">פרטי קשר וסנכרון</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
               <div className="flex items-center gap-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <Mail size={18} className="text-black" />
                  <div>
                    <p className="text-[10px] font-bold text-black uppercase">כתובת אימייל</p>
                    <p className="font-medium text-slate-700">{user?.email}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <Phone size={18} className="text-black" />
                  <div>
                    <p className="text-[10px] font-bold text-black uppercase">נייד רשום</p>
                    <p className="font-medium text-black" dir="ltr">{user?.phone || "+972 --- ---"}</p>
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar יוקרתי */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-[#1A1C1E] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[80px]"></div>
            
            <h3 className="text-[10px] font-bold mb-8 flex items-center gap-3 uppercase tracking-[0.2em] opacity-60">
              <CreditCard size={16} /> סטטוס מנוי
            </h3>
            
            <div className="space-y-1 mb-10">
              <p className="text-4xl font-light text-slate-900 tracking-tighter normal">Family Free</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">גישה בסיסית</p>
            </div>
            
            <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-lg">
              שדרוג למסלול פרימיום
            </button>
          </section>

          <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Sparkles className="text-indigo-500" size={16} /> 
              הגדרות בינה מלאכותית
            </h3>
            <div className="space-y-5">
               <div className="flex items-center justify-between group">
                 <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">ניתוח נתונים עמוק</span>
                 <div className="w-9 h-5 bg-indigo-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
               <div className="flex items-center justify-between group">
                 <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">התראות חכמות</span>
                 <div className="w-9 h-5 bg-slate-100 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
            </div>
          </section>

          <button 
            onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} 
            className="w-full py-5 border border-slate-100 text-slate-400 rounded-[2.2rem] text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
          >
            <LogOut size={14} /> סיום התחברות
          </button>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.5em] opacity-40 italic">
          ניהול הון משפחתי • Family Office Elite 2026
        </p>
      </div>
    </div>
  );
}
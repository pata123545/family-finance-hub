"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NotificationBell from "@/components/NotificationBell";
import AIButton from '@/components/AIButton'; // <--- הרכיב החכם שלנו
import { createClient } from "@/lib/supabase"; 
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  PieChart, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Bell,
  CalendarClock
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- סטייטים לנתוני משתמש ---
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- טעינת נתונים בכניסה ---
  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          router.push("/login"); 
          return;
        }
        setUser(user);

        // ניסיון לשלוף פרופיל (שם מלא וכו')
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(profileData);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  // --- פונקציית יציאה ---
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // --- תפריט ניווט ---
  const navItems = [
    { href: "/dashboard", label: "ראשי", icon: <LayoutDashboard size={20} /> },
    { href: "/dashboard/transactions", label: "תנועות", icon: <ArrowRightLeft size={20} /> },
    { href: "/dashboard/fixed-expenses", label: "התחייבויות", icon: <CalendarClock size={20} /> },
    { href: "/dashboard/budget", label: "תקציב", icon: <PieChart size={20} /> },
    { href: "/dashboard/investments", label: "השקעות", icon: <TrendingUp size={20} /> },
    { href: "/dashboard/settings", label: "הגדרות", icon: <Settings size={20} /> },
  ];

  // מסך טעינה ראשוני
  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-400">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      
      {/* --- סרגל צד (Sidebar) --- */}
      <aside className={`
        fixed inset-y-0 right-0 z-50 w-72 bg-white border-l border-slate-100 shadow-xl shadow-slate-200/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="h-full flex flex-col p-6">
          
          {/* לוגו */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-slate-200">
              F
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Family<span className="text-indigo-600">Office</span>
            </span>
            
            <button onClick={() => setIsMobileMenuOpen(false)} className="mr-auto lg:hidden text-slate-400">
              <X size={24} />
            </button>
          </div>

          {/* כרטיס פרופיל */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-8 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg border-2 border-white shadow-sm">
                {profile?.full_name 
                  ? profile.full_name[0] 
                  : (user?.email ? user.email[0].toUpperCase() : <User size={20}/>)
                }
             </div>
             <div className="overflow-hidden">
                <p className="font-bold text-sm text-slate-900 truncate">
                  {profile?.full_name || "משתמש יקר"}
                </p>
                <p className="text-xs text-slate-500 truncate font-medium" dir="ltr">
                  {user?.email || user?.phone || ""}
                </p>
             </div>
          </div>

          {/* תפריט ניווט */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group relative overflow-hidden
                    ${isActive 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                      : "text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-md hover:shadow-slate-100"
                    }`}
                >
                  {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-l-full"></div>}
                  
                  <span className={`${isActive ? "text-indigo-200" : "group-hover:text-indigo-600 transition-colors"}`}>
                     {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* כפתור התנתקות */}
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all text-sm font-bold mt-6 group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>התנתקות</span>
          </button>
        </div>
      </aside>

      {/* --- תוכן ראשי --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-slate-100 bg-white/50 backdrop-blur-xl sticky top-0 z-40">
           
           {/* צד ימין של ההדר (תפריט מובייל + כותרת) */}
           <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                 <Menu size={24} />
              </button>
              <h2 className="text-xl font-extrabold text-slate-900 hidden sm:block">
                 {navItems.find(i => i.href === pathname)?.label || "ברוכים הבאים"}
              </h2>
           </div>

           {/* צד שמאל של ההדר (AI, פעמון, תאריך) */}
           <div className="flex items-center gap-3 sm:gap-4">
              
              {/* --- 1. כפתור AI (הכי ימני בקבוצה הזו) --- */}
              {user && <AIButton user={user} />}

              {/* --- 2. כפתור פעמון --- */}
              <div className="flex items-center gap-2">
                {/* כפתורים אחרים אם יש... */}
                <NotificationBell /> 
              </div>
              
              {/* --- 3. תאריך (מוסתר במובייל) --- */}
              <div className="hidden sm:flex flex-col items-end mr-2">
                 <span className="text-xs font-bold text-slate-400">היום</span>
                 <span className="text-sm font-bold text-slate-900">
                    {new Date().toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })}
                 </span>
              </div>
           </div>
        </header>

        {/* תוכן העמוד המשתנה */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          {children}
        </div>
      </main>

      {/* רקע כהה למובייל כשפותחים תפריט */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}
    </div>
  );
}
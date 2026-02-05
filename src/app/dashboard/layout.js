"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NotificationBell from "@/components/NotificationBell";
import AIButton from '@/components/AIButton';
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
  CalendarClock
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user: authUser }, error } = await supabase.auth.getUser();
        if (error || !authUser) {
          router.push("/login");
          return;
        }
        setUser(authUser);
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', authUser.id).single();
        setProfile(profileData);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { href: "/dashboard", label: "ראשי", icon: <LayoutDashboard size={18} /> },
    { href: "/dashboard/transactions", label: "תנועות", icon: <ArrowRightLeft size={18} /> },
    { href: "/dashboard/fixed-expenses", label: "התחייבויות", icon: <CalendarClock size={18} /> },
    { href: "/dashboard/budget", label: "תקציב", icon: <PieChart size={18} /> },
    { href: "/dashboard/investments", label: "השקעות", icon: <TrendingUp size={18} /> },
  ];

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-white text-slate-400 font-light tracking-widest text-sm uppercase">Loading...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col font-sans text-slate-900">

      {/* --- ה-Header המוגבל ברוחב (Centered Floating Header) --- */}
      <div className="w-full sticky top-0 z-50 pt-4 px-6 lg:px-10">
        <header className="max-w-8xl mx-auto h-20 border border-slate-100 bg-white backdrop-blur-md rounded-[2rem] shadow-sm dark:bg-zinc-900/80 dark:border-zinc-800">
          <div className="h-full px-8 flex items-center justify-between">

            {/* לוגו */}
            <div className="flex items-center gap-3 min-w-[150px]">
              <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-slate-200/50">
                F
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white hidden md:block">
                FamilyOffice
              </span>
            </div>

            {/* ניווט מרכזי */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200
                      ${isActive
                        ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* צד שמאל: AI, פעמון, הגדרות, פרופיל */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-[150px] justify-end">
              <div className="hidden sm:block">
                {user && <AIButton user={user} />}
              </div>

              <NotificationBell />

              <Link
                href="/dashboard/settings"
                className={`p-2.5 rounded-full transition-all ${pathname === '/dashboard/settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <Settings size={20} strokeWidth={1.5} />
              </Link>

              <div className="w-[1px] h-6 bg-slate-100 dark:bg-zinc-800 mx-1 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden dark:bg-zinc-800 dark:border-zinc-700">
                  {profile?.full_name ? (
                    <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">{profile.full_name[0]}</span>
                  ) : (
                    <User size={18} className="text-slate-400" />
                  )}
                </button>
                <button onClick={handleSignOut} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-600 dark:text-zinc-400">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>

        {/* תפריט מובייל (Centered) */}
        {isMobileMenuOpen && (
          <div className="max-w-7xl mx-auto mt-2 bg-white border border-slate-100 rounded-[1.5rem] shadow-xl overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 lg:hidden">
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all
                    ${pathname === item.href ? "bg-slate-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* --- תוכן העמוד הראשי --- */}
      <main className="flex-1 h-full overflow-hidden relative w-full">
        {children}
      </main>

    </div>
  );
}
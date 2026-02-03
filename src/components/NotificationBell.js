"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { Bell, Sparkles, Info, Zap, X, Clock, Loader2 } from "lucide-react";

export default function NotificationBell() {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // 1. חישוב מונה הודעות שלא נקראו
  const unreadCount = useMemo(() => {
    return notifications.filter(n => n.is_read === false || n.is_read === null).length;
  }, [notifications]);

  // 2. משיכת נתונים ראשונית
  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error) setNotifications(data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    let channel;

    const initRealtime = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const userId = session.user.id;

      channel = supabase
        .channel(`notifications_live_${userId}`)
        .on(
          'postgres_changes',
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'notifications', 
            filter: `user_id=eq.${userId}` 
          },
          (payload) => {
            console.log("New notification live!", payload.new);
            setNotifications(prev => {
              if (prev.find(n => n.id === payload.new.id)) return prev;
              return [payload.new, ...prev];
            });
          }
        )
        .subscribe((status) => {
          console.log("Realtime status:", status);
        });
    };

    initRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // 3. סגירת התפריט בלחיצה בחוץ
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4. לוגיקה מתוקנת: קודם פותחים, אחר כך מעדכנים
  const handleToggle = async () => {
    // שלב א': פתח/סגור את התפריט מיד
    const nextState = !isOpen;
    setIsOpen(nextState);

    // שלב ב': אם פתחנו ויש הודעות חדשות, נעדכן בשרת בשקט ב-background
    if (nextState && unreadCount > 0) {
      try {
        // עדכון אופטימי (מקומי) כדי שהנקודה תיעלם מיד
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // שים לב: אנחנו לא משתמשים ב-await כאן כדי לא לעכב את ה-UI
          supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', user.id)
            .eq('is_read', false)
            .then(({ error }) => {
              if (error) console.error("Database update failed:", error);
            });
        }
      } catch (err) {
        console.error("Silent update error:", err);
      }
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef} dir="rtl">
      <button 
        onClick={handleToggle}
        className="relative p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all active:scale-95 group"
      >
        <Bell size={20} className={`${unreadCount > 0 ? 'text-indigo-600 animate-pulse' : ''} transition-all`} />
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-md z-10">
            {unreadCount}
          </span>
        )}
      </button>

      {/* חלונית התראות */}
      {isOpen && (
        <div className="absolute left-0 mt-10 w-72 bg-white border border-slate-100 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 origin-top-left">
          <div className="p-4 border-b border-slate-50 bg-slate-50/30">
            <h3 className="font-bold text-slate-900 text-sm">התראות</h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className="p-4 border-b border-slate-50 last:border-none flex items-start gap-3 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  {n.type === 'ai_insight' ? <Sparkles size={14} className="text-fuchsia-500" /> : <Info size={14} className="text-slate-400" />}
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-xs font-bold text-slate-900 truncate">{n.title}</p>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{n.description}</p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
               <p className="p-8 text-center text-[11px] text-slate-300 font-bold uppercase tracking-widest">אין הודעות חדשות</p>
            )}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); setShowFullHistory(true); }} 
            className="w-full py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors"
          >
            כל ההיסטוריה
          </button>
        </div>
      )}

      {/* מודאל היסטוריה */}
      {showFullHistory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-start justify-center p-4 sm:pt-24 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Archive</h2>
              <button 
                onClick={() => setShowFullHistory(false)} 
                className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-red-500 transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-[#FBFBFE]">
              {notifications.map((n) => (
                <div key={n.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex gap-6 items-center shadow-sm">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${n.type === 'ai_insight' ? 'bg-fuchsia-50 text-fuchsia-600' : 'bg-slate-50 text-slate-400'}`}>
                    <Zap size={20} />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-lg font-black text-slate-900 mb-1">{n.title}</p>
                    <p className="text-sm text-slate-500">{n.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
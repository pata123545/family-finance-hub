"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import {
  Bell, Sparkles, AlertTriangle, Shield, Wallet,
  X, Check, Trash2, Clock, ChevronLeft
} from "lucide-react";

export default function NotificationBell() {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // 1. Calculate unread count
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.is_read).length;
  }, [notifications]);

  // 2. Fetch notifications
  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error) setNotifications(data || []);
  };

  useEffect(() => {
    fetchNotifications();

    // Realtime subscription
    let channel;
    const initRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel(`notifications_live_${user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            setNotifications(prev => [payload.new, ...prev]);
          }
        )
        .subscribe();
    };

    initRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // 3. Mark all as read
  const handleMarkAllRead = async (e) => {
    if (e) e.stopPropagation();

    // Optimistic update
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Icon Helper with Premium Styles
  const getIcon = (type) => {
    switch (type) {
      case 'alert': return <div className="p-2 bg-red-50 text-red-600 rounded-full"><AlertTriangle size={18} /></div>;
      case 'success': return <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full"><Check size={18} /></div>;
      case 'ai_insight': return <div className="p-2 bg-purple-50 text-purple-600 rounded-full"><Sparkles size={18} /></div>;
      case 'security': return <div className="p-2 bg-orange-50 text-orange-600 rounded-full"><Shield size={18} /></div>;
      default: return <div className="p-2 bg-slate-50 text-slate-600 rounded-full"><Bell size={18} /></div>;
    }
  };

  const getTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'עכשיו';
    if (diffInSeconds < 3600) return `לפני ${Math.floor(diffInSeconds / 60)} דק'`;
    if (diffInSeconds < 86400) return `לפני ${Math.floor(diffInSeconds / 3600)} ש'`;
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <div className="relative inline-block" ref={dropdownRef} dir="rtl">

      {/* Bell Button (Clean) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-full transition-all duration-300 group
            ${isOpen ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:text-slate-900 hover:shadow-md border border-slate-100'}
        `}
      >
        <Bell size={20} className={`${isOpen ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      {/* Styled Floating Dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-4 w-[420px] min-w-[360px] max-w-[90vw] bg-white backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-300 z-50 origin-top-left font-sans animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ width: '420px' }}
        >

          {/* Clean Header */}
          <div className="px-6 py-5 flex justify-between items-center border-b border-slate-100/50">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">מרכז ההתראות</h3>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wide">
                {unreadCount > 0 ? `${unreadCount} הודעות חדשות` : 'הכל מעודכן'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
              >
                סמן כנקרא
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent py-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                <Bell size={32} className="text-slate-300 mb-3" />
                <p className="text-slate-400 font-bold text-sm">אין הודעות חדשות</p>
              </div>
            ) : (
              <div className="space-y-1 px-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-3xl flex items-start gap-4 transition-all group relative overflow-hidden
                                    ${n.is_read ? 'hover:bg-slate-50' : 'bg-white hover:bg-slate-50'}
                                `}
                  >
                    {/* Unread Indicator Dot */}
                    {!n.is_read && (
                      <div className="absolute top-6 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    )}

                    <div className="shrink-0 mt-1">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm leading-tight ${n.is_read ? 'font-bold text-slate-600' : 'font-black text-slate-900'}`}>{n.title}</h4>
                        <span className="text-[10px] font-bold text-slate-300 whitespace-nowrap mr-2">{getTimeAgo(n.created_at)}</span>
                      </div>
                      <p className={`text-xs leading-relaxed ${n.is_read ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-slate-100/50 bg-slate-50/50">
            <button
              onClick={() => { setIsOpen(false); setShowFullHistory(true); }}
              className="w-full py-3 rounded-2xl bg-white border border-slate-100 text-slate-600 hover:text-indigo-600 hover:border-indigo-100 shadow-sm hover:shadow-md transition-all text-xs font-bold flex items-center justify-center gap-2"
            >
              כל ההיסטוריה <ChevronLeft size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Full History Modal (Clean) */}
      {showFullHistory && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ring-1 ring-slate-900/5">

            {/* Modal Header */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900">ארכיון הודעות</h2>
                <p className="text-slate-400 text-sm mt-1 font-medium">היסטוריית פעילות מלאה</p>
              </div>
              <button
                onClick={() => setShowFullHistory(false)}
                className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200">
              <div className="relative border-r-2 border-slate-100 mr-4 space-y-8">
                {notifications.map((n, idx) => (
                  <div key={`hist-${n.id}`} className="relative pr-8">
                    {/* Timeline Dot */}
                    <div className="absolute top-1 right-[-9px] w-4 h-4 rounded-full bg-white border-4 border-slate-200"></div>

                    <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all group">
                      <div className="shrink-0 mt-1">
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="font-bold text-slate-900">{n.title}</h3>
                          <span className="text-xs font-bold text-slate-300">{new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-md">{n.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
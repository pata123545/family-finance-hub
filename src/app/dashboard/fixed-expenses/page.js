"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import {
  Plus, Trash2, Calendar, Landmark, CreditCard, Home, Zap, Clock, AlertCircle,
  ArrowUpRight, ArrowDownLeft, Wallet, CheckCircle2, X
} from "lucide-react";

export default function FixedExpensesPage() {
  const supabase = createClient();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Summary State
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  const [newItem, setNewItem] = useState({
    title: "",
    total_amount: "", // Optional total debt
    monthly_amount: "",
    charge_day: "10",
    category: "הלוואה"
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('fixed_expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('charge_day', { ascending: true });

      if (error) throw error;

      setItems(data || []);

      // Calcs
      const monthlySum = data?.reduce((sum, item) => sum + Number(item.monthly_amount), 0) || 0;
      const debtSum = data?.reduce((sum, item) => sum + Number(item.total_amount || 0), 0) || 0;

      setTotalMonthly(monthlySum);
      setTotalDebt(debtSum);

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('fixed_expenses').insert({
      user_id: user.id,
      title: newItem.title,
      category: newItem.category,
      total_amount: newItem.total_amount ? parseFloat(newItem.total_amount) : null,
      monthly_amount: parseFloat(newItem.monthly_amount),
      charge_day: parseInt(newItem.charge_day)
    });

    if (!error) {
      setShowModal(false);
      setNewItem({ title: "", total_amount: "", monthly_amount: "", charge_day: "10", category: "הלוואה" });
      fetchItems();
    } else {
      alert(error.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("למחוק התחייבות זו?")) return;
    await supabase.from('fixed_expenses').delete().eq('id', id);
    fetchItems();
  }

  // Calculate Next Date & Days Remaining
  const getChargeDetails = (day) => {
    const today = new Date();
    const currentDay = today.getDate();
    let nextDate = new Date();

    if (day >= currentDay) {
      nextDate.setDate(day);
    } else {
      nextDate.setMonth(nextDate.getMonth() + 1);
      nextDate.setDate(day);
    }

    // Calculate days remaining
    const diffTime = Math.abs(nextDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      dateStr: nextDate.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' }),
      daysRemaining: diffDays,
      isSoon: diffDays <= 5 // Highlight if within 5 days
    };
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'משכנתא': return <Home size={20} className="text-indigo-500" />;
      case 'הלוואה': return <Landmark size={20} className="text-amber-500" />;
      case 'רכב': return <Zap size={20} className="text-blue-500" />;
      case 'שכירות': return <Home size={20} className="text-indigo-500" />;
      case 'מנוי/שירות': return <Calendar size={20} className="text-emerald-500" />;
      default: return <CreditCard size={20} className="text-slate-500" />;
    }
  };

  if (loading) return (
    <div className="py-24 text-center space-y-4">
      <div className="animate-spin w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full mx-auto"></div>
      <p className="text-slate-400 font-bold text-sm tracking-widest">טוען התחייבויות...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">התחייבויות קבועות</h1>
          <p className="text-slate-500 mt-1">ניהול הלוואות, משכנתא והוראות קבע שוטפות</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95"
        >
          <Plus size={20} /> הוספת התחייבות
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Payment Card */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm shadow-red-100/50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-[50px] opacity-50 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="text-red-500 font-bold text-sm mb-3 flex items-center gap-2">
              <div className="p-2 bg-red-50 rounded-xl"><ArrowDownLeft size={18} /></div>
              צפי חיוב חודשי
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">₪{totalMonthly.toLocaleString()}</span>
            </div>
            <p className="text-slate-400 text-sm mt-2 font-medium">סכום זה יורד באופן קבוע מהחשבון</p>
          </div>
        </div>

        {/* total Debt Card */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm shadow-indigo-100/50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[50px] opacity-50 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="text-indigo-600 font-bold text-sm mb-3 flex items-center gap-2">
              <div className="p-2 bg-indigo-50 rounded-xl"><Landmark size={18} /></div>
              יתרת חוב כוללת
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">₪{totalDebt.toLocaleString()}</span>
            </div>
            <p className="text-slate-400 text-sm mt-2 font-medium">כולל יתרות משכנתא והלוואות פעילות</p>
          </div>
        </div>
      </div>

      {/* Expenses List (Grid Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {items.map((item) => {
          const { dateStr, daysRemaining, isSoon } = getChargeDetails(item.charge_day);

          return (
            <div key={item.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full">

              {/* Card Header */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.title}</h3>
                      <p className="text-xs font-bold text-slate-400">{item.category}</p>
                    </div>
                  </div>

                  {/* Next Date Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${isSoon ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'
                    }`}>
                    <Clock size={12} />
                    {daysRemaining === 0 ? 'היום!' : `בעוד ${daysRemaining} ימים`}
                  </div>
                </div>

                {/* Payment Amount */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">חיוב חודשי</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">₪{item.monthly_amount.toLocaleString()}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                    <Calendar size={12} /> יורד ב-{item.charge_day} לחודש
                  </p>
                </div>

                {/* Debt Progress Bar (If applicable) */}
                {item.total_amount > 0 && (
                  <div className="mb-6 bg-slate-50 p-3 rounded-xl">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-500">נותר לשלם</span>
                      <span className="text-slate-900">₪{item.total_amount.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      {/* Just a visual progress placeholder - logic would require total_paid */}
                      <div className="h-full bg-indigo-500 w-3/4 rounded-full opacity-50"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-slate-300">מזהה: {item.id.slice(0, 4)}</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-lg transition-colors"
                  title="מחק התחייבות"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}

        {/* Add New Card (Empty State) */}
        <button
          onClick={() => setShowModal(true)}
          className="border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all min-h-[300px] group"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform text-slate-300 group-hover:text-indigo-400">
            <Plus size={32} />
          </div>
          <p className="font-bold">הוספת התחייבות חדשה</p>
        </button>
      </div>

      {/* --- Add New Modal --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">הוספת התחייבות</h2>
                <p className="text-sm font-bold text-slate-400">הגדרת תשלום קבוע או הלוואה חדשה</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-6">

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">תיאור ההתחייבות</label>
                <input required type="text" className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                  value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} placeholder="למשל: ספוטיפיי, הלוואת רכב" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">סוג</label>
                  <div className="relative">
                    <select className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white appearance-none cursor-pointer"
                      value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                      <option>הלוואה</option>
                      <option>משכנתא</option>
                      <option>הוראת קבע</option>
                      <option>שכירות</option>
                      <option>מנוי/שירות</option>
                    </select>
                    <ArrowDownLeft size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">יום חיוב</label>
                  <div className="relative">
                    <select className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white appearance-none cursor-pointer font-mono"
                      value={newItem.charge_day} onChange={e => setNewItem({ ...newItem, charge_day: e.target.value })}>
                      {[...Array(28)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">סכום חיוב חודשי (₪)</label>
                <input required type="number" className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                  value={newItem.monthly_amount} onChange={e => setNewItem({ ...newItem, monthly_amount: e.target.value })} placeholder="0.00" />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">יתרת חוב כוללת (אופציונלי)</label>
                <input type="number" className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                  value={newItem.total_amount} onChange={e => setNewItem({ ...newItem, total_amount: e.target.value })} placeholder="רק עבור הלוואות" />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2">
                  <CheckCircle2 size={20} /> שמור התחייבות
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
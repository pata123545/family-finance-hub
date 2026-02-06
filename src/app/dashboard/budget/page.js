"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import {
  Plus, Edit2, TrendingUp, AlertTriangle, CheckCircle2,
  PieChart, Wallet, ArrowRight, X, Save, AlertCircle,
  ChevronDown, ChevronUp
} from "lucide-react";
import {
  ShoppingBag, Car, Home, Zap, Coffee, Heart,
  Smartphone, GraduationCap, CreditCard, HelpCircle,
  Landmark, Tv, Baby, Shirt, Scissors, Sparkles, Briefcase, Banknote
} from "lucide-react";

// --- קבוצות קטגוריות מורחבות ---
const EXPENSE_GROUPS = {
  "חשבונות ומגורים": ["שכירות", "משכנתא", "ארנונה", "חשמל", "מים", "גז", "טלויזיה/כבלים", "סלולר/אינטרנט", "ועד בית", "תחזוקת בית"],
  "שוטף וכללי": ["מזון וסופר", "דלק ורכב", "תחבורה ציבורית", "בילויים ומסעדות", "פארם ובריאות", "מתנות", "מוצרי חשמל"],
  "ילדים וחינוך": ["גן/צהרון", "בית ספר", "ביגוד (ילדים)", "חוגים", "ציוד לבית ספר", "דמי כיס"],
  "בנקים ופיננסים": ["הלוואות", "כרטיסי אשראי", "עמלות בנק", "חסכונות", "ביטוחים"],
  "אישי וטיפוח": ["ביגוד (מבוגרים)", "מספרה/טיפוח", "קוסמטיקה", "ספורט/חדר כושר"],
  "הכנסות": ["משכורת", "הכנסה נוספת", "קצבאות", "מתנות/בונוס"]
};

// Helper to get category icon
const getCategoryIcon = (category) => {
  if (!category) return <Wallet className="text-slate-400" size={18} />;
  const cat = category.toString().toLowerCase();

  // Specific mapping
  if (cat.includes('משכנתא') || cat.includes('הלוואה')) return <Landmark size={18} />;
  if (cat.includes('אוכל') || cat.includes('סופר')) return <ShoppingBag size={18} />;
  if (cat.includes('רכב') || cat.includes('דלק')) return <Car size={18} />;
  if (cat.includes('בית') || cat.includes('שכירות') || cat.includes('וועד')) return <Home size={18} />;
  if (cat.includes('חשמל') || cat.includes('מים') || cat.includes('גז')) return <Zap size={18} />;
  if (cat.includes('בילוי') || cat.includes('מסעדה')) return <Coffee size={18} />;
  if (cat.includes('בריאות') || cat.includes('פארם')) return <Heart size={18} />;
  if (cat.includes('תקשורת') || cat.includes('אינטרנט') || cat.includes('סלולר')) return <Smartphone size={18} />;
  if (cat.includes('חינוך') || cat.includes('גן') || cat.includes('בית ספר')) return <GraduationCap size={18} />;
  if (cat.includes('ילדים') || cat.includes('תינוק')) return <Baby size={18} />;
  if (cat.includes('ביגוד')) return <Shirt size={18} />;
  if (cat.includes('טיפוח') || cat.includes('מספרה')) return <Scissors size={18} />;
  if (cat.includes('טלוויזיה') || cat.includes('כבלים')) return <Tv size={18} />;
  if (cat.includes('משכורת') || cat.includes('הכנסה')) return <Briefcase size={18} />;

  return <CreditCard size={18} />;
};

export default function BudgetPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState({ category: "", amount: "" });

  // UI State for Modal
  const [expandedGroup, setExpandedGroup] = useState("שוטף וכללי");

  const [summary, setSummary] = useState({
    totalBudget: 0,
    totalSpent: 0,
    percentage: 0
  });

  useEffect(() => {
    fetchData();
  }, []);


  async function fetchData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch Budgets
      const { data: budgetData, error: budgetError } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id);

      // 2. Fetch Transactions (Current Month Expenses)
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      const { data: txData } = await supabase
        .from('transactions')
        .select('category, amount')
        .eq('user_id', user.id)
        .gte('date', startOfMonth)
        .lt('amount', 0); // Only expenses for budget tracking

      // 3. Process Data
      const spendingMap = {};
      txData?.forEach(tx => {
        const cat = tx.category;
        const amount = Math.abs(tx.amount);
        spendingMap[cat] = (spendingMap[cat] || 0) + amount;
      });

      // Merge Budgets with Spending
      const processedBudgets = (budgetData || []).map(b => ({
        ...b,
        amount: b.limit_amount || b.amount || 0, // Handle both column names
        spent: spendingMap[b.category] || 0,
        percentage: Math.min(100, Math.round(((spendingMap[b.category] || 0) / (b.limit_amount || b.amount || 1)) * 100))
      }));

      // Find unbudgeted categories
      const categoriesWithSpending = Object.keys(spendingMap);
      const budgetCategories = processedBudgets.map(b => b.category);

      const unbudgeted = categoriesWithSpending
        .filter(cat => !budgetCategories.includes(cat))
        .map(cat => ({
          id: `temp-${cat}`,
          category: cat,
          amount: 0,
          spent: spendingMap[cat],
          percentage: 100,
          isUnbudgeted: true
        }));

      // Sort: Budgeted first, then by spent amount high to low
      const finalBudgets = [...processedBudgets, ...unbudgeted].sort((a, b) => {
        if (a.isUnbudgeted === b.isUnbudgeted) return b.spent - a.spent;
        return a.isUnbudgeted ? 1 : -1;
      });

      setBudgets(finalBudgets);

      // Calculate Summary
      const totalB = processedBudgets.reduce((sum, item) => sum + item.amount, 0);
      const totalS = Object.values(spendingMap).reduce((sum, val) => sum + val, 0);

      setSummary({
        totalBudget: totalB,
        totalSpent: totalS,
        percentage: totalB > 0 ? Math.round((totalS / totalB) * 100) : 0
      });

    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveBudget(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('budgets')
      .upsert({
        user_id: user.id,
        category: editItem.category,
        limit_amount: parseFloat(editItem.amount), // Saving as limit_amount to match DB
        period: 'monthly'
      }, { onConflict: 'category, user_id' });

    if (!error) {
      setShowModal(false);
      fetchData();
    } else {
      alert("שגיאה: " + error.message);
    }
  }

  const openModal = (item = null) => {
    if (item) {
      setEditItem({ category: item.category, amount: item.amount || "" });
    } else {
      setEditItem({ category: "", amount: "" });
    }
    setShowModal(true);
  };

  if (loading) return (
    <div className="py-24 text-center space-y-4">
      <div className="animate-spin w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full mx-auto"></div>
      <p className="text-slate-400 font-bold text-sm tracking-widest">טוען נתוני תקציב...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">ניהול תקציב חודשי</h1>
          <p className="text-slate-500 mt-1">מעקב אחר יעדים והוצאות בזמן אמת</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          <Plus size={20} /> הגדרת יעד חדש
        </button>
      </div>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Budget */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Wallet size={20} /></div>
            <span className="text-slate-500 font-bold text-sm">תקציב כולל</span>
          </div>
          <div className="text-3xl font-black text-slate-900">₪{summary.totalBudget.toLocaleString()}</div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full group-hover:bg-indigo-600 transition-colors" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Spent */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-xl ${summary.totalSpent > summary.totalBudget ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
              <TrendingUp size={20} />
            </div>
            <span className="text-slate-500 font-bold text-sm">בוצע בפועל (הוצאות)</span>
          </div>
          <div className="text-3xl font-black text-slate-900">₪{summary.totalSpent.toLocaleString()}</div>
          <p className="text-xs font-bold text-slate-400 mt-2">
            {summary.totalSpent > summary.totalBudget ? 'חרגת מהתקציב הכולל!' : `נותרו ₪${(summary.totalBudget - summary.totalSpent).toLocaleString()} לניצול`}
          </p>
        </div>

        {/* Status */}
        <div className={`p-6 rounded-[2rem] border relative overflow-hidden flex flex-col justify-center transition-colors duration-300 ${summary.percentage >= 100 ? 'bg-red-50 border-red-100' :
          summary.percentage >= 85 ? 'bg-amber-50 border-amber-100' :
            'bg-emerald-50 border-emerald-100'
          }`}>
          <div className="flex items-center gap-3 mb-1">
            {summary.percentage >= 100 ? <AlertTriangle className="text-red-500" /> : <CheckCircle2 className="text-emerald-600" />}
            <span className={`font-bold text-lg ${summary.percentage >= 100 ? 'text-red-600' :
              summary.percentage >= 85 ? 'text-amber-600' :
                'text-emerald-700'
              }`}>
              {summary.percentage >= 100 ? 'חריגה מהתקציב' :
                summary.percentage >= 85 ? 'קרוב ליעד' :
                  'במסגרת התקציב'}
            </span>
          </div>
          <p className={`text-sm font-medium ${summary.percentage >= 100 ? 'text-red-400' : 'text-emerald-600'
            }`}>
            ניצלת {summary.percentage}% מהתקציב החודשי שלך
          </p>
        </div>
      </div>

      {/* --- Budget List --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {budgets.map((item) => {
          const isOver = item.spent > item.amount && item.amount > 0;
          const isClose = item.spent > item.amount * 0.85 && !isOver;
          const statusColor = isOver ? 'text-red-500' : isClose ? 'text-amber-500' : 'text-emerald-500';
          const barColor = isOver ? 'bg-red-500' : isClose ? 'bg-amber-500' : 'bg-emerald-500';

          return (
            <div key={item.category} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform shadow-inner">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-lg">{item.category}</h3>
                      {item.isUnbudgeted && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md border border-slate-200">ללא יעד</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      הוצאת <span className="text-slate-900 font-bold">₪{item.spent.toLocaleString()}</span> מתוך <span className="text-slate-900 font-bold">₪{item.amount.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => openModal(item)}
                  className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-3 box-border border border-slate-50">
                <div
                  className={`absolute top-0 right-0 h-full rounded-full transition-all duration-700 ease-in-out ${barColor} shadow-sm`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                ></div>
              </div>

              {/* Footer info */}
              <div className="flex justify-between items-center text-xs font-bold">
                <span className={`${statusColor}`}>
                  {isOver ? `חריגה של ₪${(item.spent - item.amount).toLocaleString()}` : `${item.percentage}% נוצלו`}
                </span>
                <span className="text-slate-400">
                  {item.amount > 0 ? `נותר: ₪${Math.max(0, item.amount - item.spent).toLocaleString()}` : 'הגדר יעד'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Edit Modal --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100 flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6 shrink-0">
              <div>
                <h2 className="text-2xl font-black text-slate-900">הגדרת תקציב</h2>
                <p className="text-sm font-bold text-slate-400">הגדר תקרת הוצאה חודשית</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBudget} className="space-y-6 overflow-y-auto custom-scrollbar flex-1 pr-1">

              {/* Selected Category Display */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">קטגוריה</label>
                <input
                  type="text"
                  required
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={editItem.category}
                  onChange={e => setEditItem({ ...editItem, category: e.target.value })}
                  placeholder="בחר מקטגוריות למטה או הקלד..."
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">תקציב חודשי (₪)</label>
                <input
                  type="number"
                  required
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={editItem.amount}
                  onChange={e => setEditItem({ ...editItem, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              {/* Category Selection Groups */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black text-slate-400 uppercase">בחירה מהירה</h4>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(EXPENSE_GROUPS).map(([group, items]) => (
                    <div key={group} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedGroup(expandedGroup === group ? null : group)}
                        className="w-full p-3 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition-colors text-right"
                      >
                        <span className="font-bold text-slate-700 text-sm">{group}</span>
                        {expandedGroup === group ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                      </button>

                      {expandedGroup === group && (
                        <div className="p-3 bg-white flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
                          {items.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setEditItem(prev => ({ ...prev, category: cat }))}
                              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${editItem.category === cat
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-300'
                                }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 sticky bottom-0 bg-white pb-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-colors flex justify-center gap-2 shadow-lg"
                >
                  <Save size={20} /> שמור הגדרות
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Car,
  Home,
  Zap,
  Coffee,
  Wallet,
  Calendar,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Info,
  Clock,
  Tag,
  CreditCard,
  Smartphone,
  Heart,
  GraduationCap,
  Download,
  Filter,
  Trash2,
  Edit2,
  X,
  Save,
  Loader2,
  Sparkles
} from "lucide-react";

export default function TransactionsPage() {
  const supabase = createClient();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterType, setFilterType] = useState('all'); // all | income | expense
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(''); // YYYY-MM
  const [selectedCategory, setSelectedCategory] = useState('all');

  // UI State
  const [expandedId, setExpandedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
    // Set current month as default
    const now = new Date();
    setSelectedMonth(now.toISOString().slice(0, 7));
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (!error) setTransactions(data || []);
    } catch (err) {
      console.error("שגיאה במשיכת תנועות:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק תנועה זו?')) return;

    setActionLoading(true);
    try {
      const { error } = await supabase.from('transactions').delete().eq('id', id);
      if (error) throw error;

      setTransactions(transactions.filter(t => t.id !== id));
      setExpandedId(null);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('שגיאה במחיקת התנועה');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction({ ...transaction });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('transactions')
        .update({
          description: editingTransaction.description,
          amount: parseFloat(editingTransaction.amount),
          date: editingTransaction.date,
          category: editingTransaction.category
        })
        .eq('id', editingTransaction.id);

      if (error) throw error;

      setTransactions(transactions.map(t =>
        t.id === editingTransaction.id ? editingTransaction : t
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('שגיאה בעדכון התנועה');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["תאריך", "תיאור", "קטגוריה", "סכום", "סוג"],
      ...filteredTransactions.map(t => [
        t.date,
        `"${t.description}"`,
        t.category,
        t.amount,
        t.amount > 0 ? "הכנסה" : "הוצאה"
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const getCategoryIcon = (category) => {
    if (!category) return <Wallet size={20} className="text-slate-400" />;
    const cat = category.toString().toLowerCase();

    if (cat.includes('משכורת') || cat.includes('הכנסה') || cat.includes('בונוס')) return <Zap size={20} className="text-amber-500" />;
    if (cat.includes('דלק') || cat.includes('רכב') || cat.includes('תיקון') || cat.includes('טסט')) return <Car size={20} className="text-blue-500" />;
    if (cat.includes('בית') || cat.includes('ועד') || cat.includes('שכירות')) return <Home size={20} className="text-indigo-500" />;
    if (cat.includes('משכנתא') || cat.includes('הלוואה')) return <CreditCard size={20} className="text-red-500" />;
    if (cat.includes('אוכל') || cat.includes('סופר') || cat.includes('קניות')) return <ShoppingBag size={20} className="text-emerald-500" />;
    if (cat.includes('בילוי') || cat.includes('מסעדה') || cat.includes('קפה')) return <Coffee size={20} className="text-orange-500" />;
    if (cat.includes('חשמל') || cat.includes('מים') || cat.includes('ארנונה') || cat.includes('גז')) return <Zap size={20} className="text-yellow-500" />;
    if (cat.includes('תקשורת') || cat.includes('אינטרנט') || cat.includes('סלולר')) return <Smartphone size={20} className="text-slate-600" />;
    if (cat.includes('בריאות') || cat.includes('פארם') || cat.includes('רופא')) return <Heart size={20} className="text-rose-500" />;
    if (cat.includes('חינוך') || cat.includes('גן') || cat.includes('בית ספר') || cat.includes('חוג')) return <GraduationCap size={20} className="text-purple-500" />;

    return <Wallet size={20} className="text-slate-400" />;
  };

  const getDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time for comparison
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return 'היום';
    if (date.getTime() === yesterday.getTime()) return 'אתמול';

    return date.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // derived state
  const uniqueCategories = [...new Set(transactions.map(t => t.category).filter(Boolean))].sort();

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all'
      ? true
      : filterType === 'income' ? t.amount > 0 : t.amount < 0;

    // Date Filter (Year-Month)
    const matchesDate = selectedMonth ? t.date.startsWith(selectedMonth) : true;

    // Category Filter
    const matchesCategory = selectedCategory === 'all' ? true : t.category === selectedCategory;

    return matchesSearch && matchesType && matchesDate && matchesCategory;
  });

  const totalIncome = filteredTransactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0);

  // Group by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const dateKey = transaction.date.slice(0, 10);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6" dir="rtl">

      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">פירוט תנועות</h1>
          <p className="text-slate-500 mt-1">ניהול ומעקב אחר הפעילות הפיננסית שלך</p>
        </div>

        {/* Filter Tabs (mimicking dashboard tabs) */}
        <div className="bg-slate-100/80 p-1.5 rounded-xl inline-flex relative">
          {['all', 'income', 'expense'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`relative z-10 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${filterType === type
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {type === 'all' ? 'הכל' : type === 'income' ? 'הכנסות' : 'הוצאות'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Income */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm shadow-emerald-100/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[50px] opacity-50 pointer-events-none"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="text-emerald-600 font-bold text-sm mb-3 flex items-center gap-2">
                <div className="p-2 bg-emerald-50 rounded-xl"><ArrowUpRight size={18} /></div>
                סך הכנסות (מסונן)
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">₪{totalIncome.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm shadow-red-100/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-[50px] opacity-50 pointer-events-none"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="text-red-500 font-bold text-sm mb-3 flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-xl"><ArrowDownLeft size={18} /></div>
                סך הוצאות (מסונן)
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">₪{totalExpense.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar - Clean Style */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

          {/* Search Input - Icon Left */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              dir="rtl"
              type="text"
              placeholder="חיפוש לפי תיאור או קטגוריה..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 focus:bg-white"
            />
          </div>

          {/* Right Side Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">

            {/* Date Picker */}
            <div className="relative shrink-0">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 pr-10 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all hover:bg-white focus:bg-white"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            {/* Category Dropdown */}
            <div className="relative shrink-0 text-slate-700">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-10 appearance-none text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all hover:bg-white focus:bg-white min-w-[160px] cursor-pointer"
              >
                <option value="all">כל הקטגוריות</option>
                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportCSV}
              className="bg-white p-3 rounded-xl border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all shadow-sm shrink-0"
              title="ייצוא ל-CSV"
            >
              <Download size={20} />
            </button>

          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-8 pb-12">
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="animate-spin w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-slate-400 font-bold text-sm tracking-widest">מסנכרן נתונים...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-dashed border-slate-200 flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <PlusCircle size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">לא נמצאו תנועות</h3>
              <p className="text-slate-400 font-bold mt-1 text-sm max-w-xs mx-auto">נסה לשנות את מסנני החיפוש או התאריך.</p>
            </div>
            <button onClick={() => { setSelectedMonth(''); setFilterType('all'); setSearchTerm(''); setSelectedCategory('all'); }} className="text-indigo-600 font-bold text-sm hover:underline">
              נקה את כל הסינונים
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {sortedDates.map((date) => (
              <div key={date} className="space-y-3">

                {/* Centered Date Header with Dividers */}
                <div className="flex items-center justify-center gap-4 py-2 opacity-80">
                  <div className="h-px bg-slate-200 w-16"></div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-[#F8FAFC] px-2">
                    {getDateLabel(date)}
                  </span>
                  <div className="h-px bg-slate-200 w-16"></div>
                </div>

                <div className="space-y-3">
                  {groupedTransactions[date].map((t) => (
                    <div
                      key={t.id}
                      className="bg-white rounded-[1.5rem] p-1 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 hover:scale-[1.005] transition-all duration-300 group overflow-hidden"
                    >
                      <div
                        onClick={() => toggleExpand(t.id)}
                        className="flex items-center justify-between p-4 cursor-pointer relative"
                      >
                        {/* Hover Highlight Line */}
                        <div className={`absolute right-0 top-4 bottom-4 w-1 rounded-l-full transition-colors ${t.amount > 0 ? 'bg-green-500' : 'bg-slate-200 group-hover:bg-slate-900'
                          }`}></div>

                        <div className="flex items-center gap-4 pr-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${t.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-900'
                            }`}>
                            {getCategoryIcon(t.category)}
                          </div>

                          <div className="flex flex-col">
                            <h4 className="font-bold text-slate-900 text-base leading-tight">
                              {t.description}
                            </h4>
                            <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-500 transition-colors">
                              {t.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pl-2">
                          <p className={`text-lg font-black tracking-tight ${t.amount > 0 ? 'text-green-600' : 'text-slate-900'
                            }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} ₪
                          </p>
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-all">
                            {expandedId === t.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Section */}
                      {expandedId === t.id && (
                        <div className="px-4 pb-4 pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50 flex flex-col sm:flex-row gap-4">
                            {/* Details */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">תאריך</p>
                                <p className="text-xs font-bold text-slate-700">{new Date(t.date).toLocaleDateString('he-IL')}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">סוג</p>
                                <p className="text-xs font-bold text-slate-700">{t.amount > 0 ? 'הכנסה' : 'הוצאה'}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">מזהה</p>
                                <p className="text-xs font-mono font-bold text-slate-500 truncate">{t.id.slice(0, 6)}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">סטטוס</p>
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                  <Sparkles size={10} /> הושלם
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 sm:border-r border-slate-200 sm:pr-4">
                              <button
                                onClick={() => handleEditClick(t)}
                                className="p-2 bg-white text-indigo-600 border border-indigo-100 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                                title="ערוך"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(t.id)}
                                className="p-2 bg-white text-red-600 border border-red-100 rounded-xl hover:bg-red-50 transition-colors shadow-sm"
                                title="מחק"
                              >
                                {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingTransaction && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900">עריכת תנועה</h2>
                <p className="text-sm font-bold text-slate-400">עדכון פרטי עסקה במערכת</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-3">תיאור התנועה</label>
                <input
                  type="text"
                  required
                  value={editingTransaction.description}
                  onChange={e => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-3">סכום (₪)</label>
                  <input
                    type="number"
                    required
                    value={editingTransaction.amount}
                    onChange={e => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
                    className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-3">תאריך</label>
                  <input
                    type="date"
                    required
                    value={editingTransaction.date.slice(0, 10)}
                    onChange={e => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
                    className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-3">קטגוריה</label>
                <div className="grid grid-cols-3 gap-2/5">
                  {['אוכל', 'רכב', 'בית', 'קניות', 'בילוי', 'משכורת', 'בריאות', 'חינוך', 'אחר'].map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setEditingTransaction({ ...editingTransaction, category: cat })}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border-2 ${editingTransaction.category === cat
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105'
                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-5 mt-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {actionLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />} שמור שינויים במערכת
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="text-center py-12">
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] opacity-50 italic">ניהול הון משפחתי • סביבת נתונים מאובטחת</p>
      </footer>

    </div>
  );
}
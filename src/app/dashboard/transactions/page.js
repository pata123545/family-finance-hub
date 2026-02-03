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
  GraduationCap
} from "lucide-react";

export default function TransactionsPage() {
  const supabase = createClient();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState('');
  // State לניהול התנועה הפתוחה
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchTransactions();
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

const getCategoryIcon = (category) => {
    if (!category) return <Wallet size={20} className="text-slate-400" />;
    
    const cat = category.toString().toLowerCase();

    // קטגוריות הכנסה
    if (cat.includes('משכורת') || cat.includes('הכנסה') || cat.includes('בונוס')) 
      return <Zap size={20} className="text-amber-500" />;
    
    // רכב ותחבורה (קריטי עבור נהג מונית)
    if (cat.includes('דלק') || cat.includes('רכב') || cat.includes('תיקון') || cat.includes('טסט')) 
      return <Car size={20} className="text-blue-500" />;
    
    // מגורים והתחייבויות
    if (cat.includes('בית') || cat.includes('ועד') || cat.includes('שכירות')) 
      return <Home size={20} className="text-indigo-500" />;
    if (cat.includes('משכנתא') || cat.includes('הלוואה')) 
      return <CreditCard size={20} className="text-red-500" />;
    
    // קניות ואוכל
    if (cat.includes('אוכל') || cat.includes('סופר') || cat.includes('קניות')) 
      return <ShoppingBag size={20} className="text-emerald-500" />;
    if (cat.includes('בילוי') || cat.includes('מסעדה') || cat.includes('קפה')) 
      return <Coffee size={20} className="text-orange-500" />;
    
    // חשבונות ותשלומי שוטפים
    if (cat.includes('חשמל') || cat.includes('מים') || cat.includes('ארנונה') || cat.includes('גז')) 
      return <Zap size={20} className="text-yellow-500" />;
    if (cat.includes('תקשורת') || cat.includes('אינטרנט') || cat.includes('סלולר')) 
      return <Smartphone size={20} className="text-slate-600" />;
    
    // בריאות וחינוך (מתאים לניהול משפחתי)
    if (cat.includes('בריאות') || cat.includes('פארם') || cat.includes('רופא')) 
      return <Heart size={20} className="text-rose-500" />;
    if (cat.includes('חינוך') || cat.includes('גן') || cat.includes('בית ספר') || cat.includes('חוג')) 
      return <GraduationCap size={20} className="text-purple-500" />;

    // ברירת מחדל יוקרתית
    return <Wallet size={20} className="text-slate-400" />;
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' 
      ? true 
      : filterType === 'income' ? t.amount > 0 : t.amount < 0;
    
    return matchesSearch && matchesType;
  });

  const totalIncome = filteredTransactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 font-sans bg-[#FBFBFE] min-h-screen" dir="rtl">
      
      {/* כותרת עליונה */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">פירוט תנועות</h1>
        <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
          <Calendar size={16} />
          <span>מעודכן ליום: {new Date().toLocaleDateString('he-IL')}</span>
        </div>
      </div>

      {/* כרטיסי סיכום */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
           <div className="relative z-10 flex justify-between items-end">
             <div>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">סה"כ הכנסות</p>
               <p className="text-4xl font-bold text-green-600 tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>
                 ₪{totalIncome.toLocaleString()}
               </p>
             </div>
             <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
               <ArrowUpRight size={28} />
             </div>
           </div>
        </div>

        <div className="relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
           <div className="relative z-10 flex justify-between items-end">
             <div>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">סה"כ הוצאות</p>
               <p className="text-4xl font-bold text-slate-900 tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>
                 ₪{totalExpense.toLocaleString()}
               </p>
             </div>
             <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-100">
               <ArrowDownLeft size={28} />
             </div>
           </div>
        </div>
      </div>

      {/* סרגל כלים */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
        <div className="flex bg-white p-1.5  border border-slate-200 shadow-sm w-full lg:w-auto h-14">
          {['all', 'income', 'expense'].map((type) => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                filterType === type 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type === 'all' ? 'הכל' : type === 'income' ? 'הכנסות' : 'הוצאות'}
            </button>
          ))}
        </div>

          <div className="relative w-full lg:w-96 group">
            <input 
              dir="rtl"
              type="text" 
              placeholder="חפש לפי תיאור או קטגוריה..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // pr-10 נותן מרווח מימין, pl-12 נותן מקום לאייקון בשמאל
              className="w-full pr-10 pl-12 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all shadow-sm outline-none placeholder:text-slate-100"
            />
            {/* האייקון ממוקם בשמאל וממורכז אנכית */}
            <Search 
              size={20} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-500 transition-colors pointer-events-none" 
            />
          </div>
      </div>

      {/* רשימת תנועות */}
      <div className="space-y-4">
        {loading ? (
           <div className="py-24 text-center space-y-4">
             <div className="animate-spin w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full mx-auto"></div>
             <p className="text-slate-400 font-bold text-sm tracking-widest">מסנכרן נתונים...</p>
           </div>
        ) : filteredTransactions.length === 0 ? (
           <div className="bg-white rounded-[2.5rem] p-24 text-center border border-dashed border-slate-200 flex flex-col items-center gap-6">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                <PlusCircle size={40} />
             </div>
             <div>
               <h3 className="text-2xl font-black text-slate-900">ברוך הבא</h3>
               <p className="text-slate-400 font-bold mt-2 max-w-xs mx-auto">עדיין לא נרשמו תנועות בחשבון שלך.</p>
             </div>
           </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all">
            {filteredTransactions.map((t, idx) => (
              <div key={t.id} className={idx !== filteredTransactions.length - 1 ? 'border-b border-slate-50' : ''}>
                {/* שורת התנועה הראשית */}
                <div 
                  onClick={() => toggleExpand(t.id)}
                  className="flex items-center justify-between p-6 transition-all hover:bg-slate-50/80 cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-sm ${
                      t.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-500'
                    }`}>
                      {getCategoryIcon(t.category)}
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">
                        {t.description}
                      </h4>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100/50">
                          {t.category}
                        </span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span className="text-[11px] font-bold">
                          {new Date(t.date).toLocaleDateString('he-IL')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-left">
                      <p className={`text-2xl font-bold tracking-tight ${
                        t.amount > 0 ? 'text-green-600' : 'text-slate-900'
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} ₪
                      </p>
                    </div>
                    {expandedId === t.id ? (
                      <ChevronUp size={20} className="text-slate-400 transition-transform" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400 transition-transform group-hover:translate-y-0.5" />
                    )}
                  </div>
                </div>

                {/* אזור פרטים נוספים נפתח */}
                {expandedId === t.id && (
                  <div className="px-6 pb-6 pt-2 bg-slate-50/30 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                          <Clock size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">תאריך ביצוע</p>
                          <p className="text-sm font-bold text-slate-700">{new Date(t.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                          <Tag size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">סיווג תנועה</p>
                          <p className="text-sm font-bold text-slate-700">{t.category || 'כללי'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                          <Info size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">סטטוס</p>
                          <p className="text-sm font-bold text-green-600">אושר סופית</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="text-center py-12">
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] opacity-50 italic">ניהול הון משפחתי • סביבת נתונים מאובטחת</p>
      </footer>

    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { 
  Plus, Trash2, Calendar, 
  ShoppingCart, Car, Home, Zap, Coffee, HeartPulse, 
  Landmark, CreditCard, Droplet, Tv, Smartphone, 
  Baby, Shirt, School, Scissors, Sparkles, HelpCircle, X,
  Wallet, Banknote, TrendingUp, Briefcase
} from "lucide-react";

// --- קבוצות הוצאות (כמו קודם) ---
const EXPENSE_GROUPS = {
  "בנקים ופיננסים": ["הלוואות", "כרטיסי אשראי", "עמלות בנק", "חסכונות"],
  "חשבונות ומגורים": ["שכירות", "משכנתא", "ארנונה", "חשמל", "מים", "גז", "טלויזיה/כבלים", "סלולר/אינטרנט", "ועד בית", "חשבונות - אחר"],
  "ילדים וחינוך": ["גן/צהרון", "בית ספר", "ביגוד (ילדים)", "תספורת (ילדים)", "חוגים", "ציוד לבית ספר", "ילדים - אחר"],
  "מותרות וטיפוח": ["מספרה/תספורת", "ציפורניים/קוסמטיקה", "צבע לשיער", "ביגוד (מבוגרים)", "טיפוח - אחר"],
  "שוטף וכללי": ["מזון וסופר", "דלק ורכב", "תחבורה ציבורית", "בילויים ומסעדות", "פארם ובריאות", "מתנות", "אחר"]
};

// --- קטגוריות הכנסה החדשות ---
const INCOME_CATEGORIES = [
  "משכורת (בן זוג)",
  "משכורת (בת זוג)",
  "הכנסה נוספת",
  "קצבת ילדים / ביטוח לאומי",
  "מתנות / בונוסים"
];

const getCategoryIcon = (cat) => {
  if (!cat) return <HelpCircle size={20} />;
  const c = cat.toLowerCase();

  // --- הכנסות ---
  if (c.includes("משכורת")) return <Briefcase size={20} />;
  if (c.includes("נוספת") || c.includes("בונוס")) return <TrendingUp size={20} />;
  if (c.includes("קצבה") || c.includes("ביטוח")) return <Banknote size={20} />;
  
  // --- הוצאות (הלוגיקה הקיימת) ---
  if (c.includes("הלוואות") || c.includes("משכנתא") || c.includes("חסכונות")) return <Landmark size={20} />;
  if (c.includes("כרטיס") || c.includes("עמלות")) return <CreditCard size={20} />;
  if (c.includes("חשמל")) return <Zap size={20} />;
  if (c.includes("מים")) return <Droplet size={20} />;
  if (c.includes("טלויזיה") || c.includes("כבלים")) return <Tv size={20} />;
  if (c.includes("סלולר") || c.includes("אינטרנט")) return <Smartphone size={20} />;
  if (c.includes("ארנונה") || c.includes("שכירות") || c.includes("ועד") || c.includes("בית")) return <Home size={20} />;
  if (c.includes("גן") || c.includes("תינוק")) return <Baby size={20} />;
  if (c.includes("ספר") || c.includes("חוג")) return <School size={20} />;
  if (c.includes("ביגוד")) return <Shirt size={20} />;
  if (c.includes("תספורת") || c.includes("מספרה") || c.includes("צבע")) return <Scissors size={20} />;
  if (c.includes("ציפורניים") || c.includes("קוסמטיקה")) return <Sparkles size={20} />;
  if (c.includes("מזון") || c.includes("סופר")) return <ShoppingCart size={20} />;
  if (c.includes("רכב") || c.includes("דלק") || c.includes("תחבורה")) return <Car size={20} />;
  if (c.includes("בילוי") || c.includes("מסעדות")) return <Coffee size={20} />;
  if (c.includes("בריאות") || c.includes("פארם")) return <HeartPulse size={20} />;
  
  return <HelpCircle size={20} />;
};

export default function TransactionsPage() {
  const supabase = createClient();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // סטייט לטופס
  const [newTx, setNewTx] = useState({ 
    description: "", 
    amount: "", 
    category: "", 
    is_income: false 
  });

  const [customCategoryName, setCustomCategoryName] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTransaction(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // ולידציה: חובה לבחור קטגוריה גם בהכנסה וגם בהוצאה עכשיו
    if (!newTx.category) {
        alert("אנא בחר קטגוריה");
        return;
    }

    const amount = parseFloat(newTx.amount);
    
    let finalCategory = newTx.category;
    
    // אם נבחרה קטגוריה של "אחר" או "הכנסה נוספת" ויש פירוט
    if ((newTx.category.includes("אחר") || newTx.category.includes("נוספת")) && customCategoryName.trim() !== "") {
        finalCategory = customCategoryName;
    }

    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      description: newTx.description,
      amount: newTx.is_income ? amount : -amount,
      category: finalCategory,
      is_income: newTx.is_income,
      date: new Date().toISOString()
    });

    if (!error) {
      setShowAddModal(false);
      setNewTx({ description: "", amount: "", category: "", is_income: false });
      setCustomCategoryName(""); 
      fetchTransactions();
    } else {
      alert("שגיאה: " + error.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("בטוח למחוק?")) return;
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (!error) fetchTransactions();
  }

  // איפוס קטגוריה בעת החלפת סוג (הכנסה/הוצאה)
  const toggleTxType = (isIncome) => {
      setNewTx({ ...newTx, is_income: isIncome, category: "" });
      setCustomCategoryName("");
  };

  if (loading) return <div className="p-10 text-center text-slate-400">טוען תנועות...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">תנועות עו״ש</h1>
          <p className="text-slate-500">פירוט הכנסות והוצאות לפי קטגוריות.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
        >
          <Plus size={18} /> הוספת תנועה
        </button>
      </div>

      {/* טבלה */}
      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-xs font-bold text-slate-400 uppercase">
                <th className="px-6 py-4">תיאור / הערה</th>
                <th className="px-6 py-4">קטגוריה</th>
                <th className="px-6 py-4">תאריך</th>
                <th className="px-6 py-4">סכום</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {transactions.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-slate-400">אין תנועות להצגה</td></tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">{tx.description}</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <span className="text-slate-400">{getCategoryIcon(tx.category)}</span>
                          <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 border border-slate-200">
                              {tx.category}
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 flex items-center gap-2">
                        <Calendar size={14}/> {new Date(tx.date).toLocaleDateString('he-IL')}
                    </td>
                    <td className={`px-6 py-4 font-bold font-mono text-base ${tx.is_income ? 'text-emerald-600' : 'text-slate-900'}`} dir="ltr">
                      {tx.is_income ? '+' : ''}₪{Math.abs(tx.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <button onClick={() => handleDelete(tx.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- מודאל הוספה --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out] flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">הוספת תנועה חדשה</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24}/></button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              
              {/* סוג פעולה */}
              <div>
                <label className="text-sm font-bold text-slate-700">סוג פעולה</label>
                <div className="flex gap-2 mt-1">
                  <button type="button" onClick={() => toggleTxType(false)} className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${!newTx.is_income ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200'}`}>הוצאה</button>
                  <button type="button" onClick={() => toggleTxType(true)} className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${newTx.is_income ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-500 border-slate-200'}`}>הכנסה</button>
                </div>
              </div>

              {/* אזור בחירת קטגוריה (דינמי) */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 block">בחירת מקור/יעד</label>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-[300px] overflow-y-auto">
                    
                    {/* אם זו הכנסה -> הצג קטגוריות הכנסה */}
                    {newTx.is_income ? (
                        <div className="flex flex-wrap gap-2">
                            {INCOME_CATEGORIES.map(item => {
                                const isSelected = newTx.category === item;
                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setNewTx({...newTx, category: item})}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                                            isSelected 
                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-105' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                                        }`}
                                    >
                                        {getCategoryIcon(item)}
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        // אם זו הוצאה -> הצג קבוצות הוצאה
                        Object.entries(EXPENSE_GROUPS).map(([groupName, items]) => (
                            <div key={groupName} className="mb-4 last:mb-0">
                                <h3 className="text-xs font-bold text-slate-400 mb-2">{groupName}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map(item => {
                                        const isSelected = newTx.category === item;
                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => setNewTx({...newTx, category: item})}
                                                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                                                    isSelected 
                                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' 
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                                                }`}
                                            >
                                                {getCategoryIcon(item)}
                                                {item}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
              </div>

              {/* שדה טקסט חופשי (מופיע אם בחרנו "אחר" או "הכנסה נוספת") */}
              {(newTx.category.includes("אחר") || newTx.category.includes("נוספת")) && (
                 <div className="animate-[fadeIn_0.3s_ease-out]">
                    <label className="text-sm font-bold text-indigo-600">פירוט (מהי ההכנסה/הוצאה?)</label>
                    <input 
                        type="text" 
                        className="w-full p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 font-bold placeholder:font-normal mt-1 focus:ring-2 focus:ring-indigo-200" 
                        value={customCategoryName} 
                        onChange={e => setCustomCategoryName(e.target.value)} 
                        placeholder={newTx.is_income ? "למשל: עבודה פרטית, מכירת רכב" : "למשל: תרומה, דו״ח"} 
                        autoFocus
                    />
                 </div>
              )}

              {/* תיאור */}
              <div>
                <label className="text-sm font-bold text-slate-700">תיאור / הערה</label>
                <input 
                    required 
                    type="text" 
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200" 
                    value={newTx.description} 
                    onChange={e => setNewTx({...newTx, description: e.target.value})} 
                    placeholder="למשל: משכורת פברואר" 
                />
              </div>
              
              {/* סכום */}
              <div>
                <label className="text-sm font-bold text-slate-700">סכום (₪)</label>
                <input required type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-lg" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} placeholder="0.00" />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors shadow-lg">
                    שמור תנועה
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
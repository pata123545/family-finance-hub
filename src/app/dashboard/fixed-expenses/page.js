"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Plus, Trash2, Calendar, Landmark, CreditCard, Home, Zap, Clock, AlertCircle } from "lucide-react";

export default function FixedExpensesPage() {
  const supabase = createClient();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // סיכומים
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  const [newItem, setNewItem] = useState({ 
    title: "", 
    total_amount: "", // סכום ההלוואה הכולל (אופציונלי)
    monthly_amount: "", // ההחזר החודשי
    charge_day: "10", // ברירת מחדל לכרטיסי אשראי
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
        .order('charge_day', { ascending: true }); // מסדר לפי היום בחודש

      if (error) throw error;

      setItems(data || []);
      
      // חישובים
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
    if(!confirm("למחוק התחייבות זו?")) return;
    await supabase.from('fixed_expenses').delete().eq('id', id);
    fetchItems();
  }

  // פונקציה לחישוב התאריך הבא
  const getNextChargeDate = (day) => {
    const today = new Date();
    const currentDay = today.getDate();
    let nextDate = new Date();
    
    // אם היום בחודש עוד לא עבר (למשל היום ה-5 והחיוב ב-10) -> זה החודש הזה
    if (day >= currentDay) {
        nextDate.setDate(day);
    } else {
        // אם התאריך כבר עבר -> זה בחודש הבא
        nextDate.setMonth(nextDate.getMonth() + 1);
        nextDate.setDate(day);
    }
    return nextDate.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' });
  };

  if (loading) return <div className="p-10 text-center text-slate-400">טוען התחייבויות...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-extrabold text-slate-900">התחייבויות קבועות</h1>
           <p className="text-slate-500">הלוואות, משכנתא והוראות קבע שיורדות בתאריך קבוע.</p>
        </div>
        <button 
           onClick={() => setShowModal(true)}
           className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
        >
            <Plus size={18} /> הוספת התחייבות
        </button>
      </div>

      {/* --- כרטיסי סיכום --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-slate-500 font-bold text-sm mb-1">סה״כ יורד בחודש הבא</p>
                  <h2 className="text-4xl font-extrabold text-slate-900">₪{totalMonthly.toLocaleString()}</h2>
                  <p className="text-xs text-slate-400 mt-2">סכום זה "משוריין" מהמשכורת שלך</p>
              </div>
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                  <Calendar size={32}/>
              </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-lg flex items-center justify-between">
              <div>
                  <p className="text-slate-400 font-bold text-sm mb-1">יתרת חוב כוללת</p>
                  <h2 className="text-4xl font-extrabold text-white">₪{totalDebt.toLocaleString()}</h2>
                  <p className="text-slate-400 text-xs mt-2">סך כל ההלוואות והמשכנתא שנותרו</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-300">
                  <Landmark size={32}/>
              </div>
          </div>
      </div>

      {/* --- טבלה חכמה --- */}
      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-xs font-bold text-slate-400 uppercase">
                <th className="px-6 py-4">תיאור</th>
                <th className="px-6 py-4">יום חיוב</th>
                <th className="px-6 py-4">חיוב קרוב</th>
                <th className="px-6 py-4">תשלום חודשי</th>
                <th className="px-6 py-4">יתרת חוב</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
               {items.map((item) => {
                   const nextDate = getNextChargeDate(item.charge_day);
                   // בדיקה ויזואלית: אם החיוב הוא בעתיד הקרוב (10 ימים) נדגיש אותו
                   return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{item.title}</div>
                            <div className="text-xs text-slate-500">{item.category}</div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-bold border border-slate-200">
                                כל {item.charge_day} לחודש
                            </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2 font-bold text-slate-700">
                           <Clock size={14} className="text-indigo-500"/> {nextDate}
                        </td>
                        <td className="px-6 py-4 font-bold text-red-600 text-base font-mono">
                            ₪{item.monthly_amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-mono">
                            {item.total_amount > 0 ? `₪${item.total_amount.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => handleDelete(item.id)} className="text-slate-300 hover:text-red-500">
                                <Trash2 size={18}/>
                            </button>
                        </td>
                    </tr>
                   )
               })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- מודאל הוספה --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <h2 className="text-xl font-bold mb-4">הוספת התחייבות קבועה</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              
              <div>
                <label className="text-sm font-bold text-slate-700">שם (מה יורד?)</label>
                <input required type="text" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} placeholder="למשל: הלוואה לרכב, משכנתא" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-slate-700">סוג</label>
                    <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                        <option>הלוואה</option>
                        <option>משכנתא</option>
                        <option>הוראת קבע</option>
                        <option>שכירות</option>
                        <option>מנוי/שירות</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700">יום חיוב בחודש</label>
                    <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono" value={newItem.charge_day} onChange={e => setNewItem({...newItem, charge_day: e.target.value})}>
                        {[...Array(28)].map((_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                        ))}
                        <option value="10">10 (כרטיסי אשראי)</option>
                        <option value="15">15</option>
                    </select>
                  </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">תשלום חודשי קבוע (₪)</label>
                <input required type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" value={newItem.monthly_amount} onChange={e => setNewItem({...newItem, monthly_amount: e.target.value})} placeholder="0.00" />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">סך כל החוב/הלוואה (אופציונלי)</label>
                <input type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200" value={newItem.total_amount} onChange={e => setNewItem({...newItem, total_amount: e.target.value})} placeholder="למשל: 50000" />
                <p className="text-xs text-slate-400 mt-1">השאר ריק אם זה תשלום ללא סוף (כמו נטפליקס)</p>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors">
                    שמור התחייבות
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="w-full py-3 text-slate-500 font-bold mt-2">ביטול</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
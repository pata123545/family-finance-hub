"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { TrendingUp, PieChart, Plus, Trash2, Building2, Bitcoin, LineChart, Globe, DollarSign, RefreshCw } from "lucide-react";

// פונקציית עזר לבחירת אייקון לפי סוג נכס
const getAssetIcon = (type) => {
  switch (type) {
    case 'crypto': return <Bitcoin size={20} />;
    case 'real_estate': return <Building2 size={20} />;
    case 'stock': return <LineChart size={20} />;
    case 'etf': return <Globe size={20} />;
    default: return <DollarSign size={20} />;
  }
};

// פונקציית עזר לצבעים
const getAssetColor = (type) => {
  switch (type) {
    case 'crypto': return "bg-orange-100 text-orange-600";
    case 'real_estate': return "bg-slate-200 text-slate-700";
    case 'stock': return "bg-blue-100 text-blue-600";
    case 'etf': return "bg-emerald-100 text-emerald-600";
    default: return "bg-indigo-50 text-indigo-600";
  }
};

export default function InvestmentsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // סטייט לטופס הוספה
  const [newAsset, setNewAsset] = useState({ name: "", type: "stock", balance: "" });

  useEffect(() => {
    fetchAssets();
  }, []);

  async function fetchAssets() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // שליפת חשבונות מסוג השקעות בלבד
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .in('type', ['stock', 'crypto', 'real_estate', 'etf', 'investment']); 
        // הערה: נשתמש בטבלת accounts הקיימת, אך נסנן לפי סוגים

      if (error) throw error;

      setAssets(data || []);
      
      // חישוב שווי כולל
      const total = data?.reduce((sum, item) => sum + Number(item.balance), 0) || 0;
      setTotalValue(total);

    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddAsset(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('accounts').insert({
      user_id: user.id,
      name: newAsset.name,
      type: newAsset.type,
      balance: parseFloat(newAsset.balance), // כאן זה "שווי נוכחי"
      icon: newAsset.type // נשמור את הסוג גם כאייקון לשימוש עתידי
    });

    if (!error) {
      setShowModal(false);
      setNewAsset({ name: "", type: "stock", balance: "" });
      fetchAssets();
    } else {
      alert("שגיאה: " + error.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("למחוק את הנכס הזה מהתיק?")) return;
    await supabase.from('accounts').delete().eq('id', id);
    fetchAssets();
  }

  if (loading) return <div className="p-10 text-center text-slate-400">טוען תיק השקעות...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
      
      {/* כותרת */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-extrabold text-slate-900">תיק השקעות</h1>
           <p className="text-slate-500">מבט כולל על כל הנכסים הפיננסיים והאלטרנטיביים.</p>
        </div>
        <button 
           onClick={() => setShowModal(true)}
           className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
        >
            <Plus size={18} /> הוספת נכס
        </button>
      </div>

      {/* --- מדדים ראשיים (KPI) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* שווי תיק */}
         <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] opacity-40 group-hover:bg-indigo-100 transition-colors"></div>
            <div className="relative z-10">
                <p className="text-slate-500 font-bold text-sm mb-2">שווי תיק כולל</p>
                <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">₪{totalValue.toLocaleString()}</h2>
                
                {/* גרף דמה קטן */}
                <div className="mt-6 h-16 flex items-end gap-1 opacity-50">
                    {[40, 60, 45, 70, 65, 85, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-indigo-600 rounded-t-sm" style={{ height: `${h}%`, opacity: (i+2)/10 }}></div>
                    ))}
                </div>
            </div>
         </div>

         {/* פיזור (פאי פשוט) */}
         <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-center relative overflow-hidden">
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-[60px] opacity-40"></div>
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><PieChart size={18}/> הקצאת נכסים</h3>
             <div className="space-y-3 relative z-10">
                 {/* חישוב אחוזים פשוט להצגה */}
                 {['stock', 'crypto', 'real_estate'].map(type => {
                     const sumType = assets.filter(a => a.type === type).reduce((s, a) => s + a.balance, 0);
                     if (sumType === 0) return null;
                     const percent = Math.round((sumType / totalValue) * 100);
                     return (
                         <div key={type} className="flex justify-between items-center text-sm">
                             <span className="capitalize opacity-80">{type === 'stock' ? 'מניות' : type === 'real_estate' ? 'נדל״ן' : 'קריפטו'}</span>
                             <div className="flex items-center gap-2">
                                 <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                     <div className="h-full bg-indigo-400" style={{ width: `${percent}%` }}></div>
                                 </div>
                                 <span className="font-bold font-mono">{percent}%</span>
                             </div>
                         </div>
                     )
                 })}
                 {assets.length === 0 && <p className="text-slate-400 text-sm">אין נתונים להצגה</p>}
             </div>
         </div>
      </div>

      {/* --- רשימת נכסים --- */}
      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">אחזקות</h3>
            <button onClick={fetchAssets} className="text-slate-400 hover:text-indigo-600 transition-colors">
                <RefreshCw size={18} />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-right">
               <thead>
                  <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 bg-slate-50/50">
                     <th className="px-6 py-4">שם הנכס</th>
                     <th className="px-6 py-4">סוג</th>
                     <th className="px-6 py-4">שווי נוכחי</th>
                     <th className="px-6 py-4"></th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  {assets.length === 0 ? (
                      <tr><td colSpan="4" className="p-8 text-center text-slate-400">התיק ריק. הוסף נכס ראשון!</td></tr>
                  ) : (
                    assets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${getAssetColor(asset.type)}`}>
                                    {getAssetIcon(asset.type)}
                                </div>
                                <span className="font-bold text-slate-900">{asset.name}</span>
                            </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200 uppercase">
                                    {asset.type === 'stock' ? 'מניות' : asset.type === 'crypto' ? 'קריפטו' : asset.type === 'real_estate' ? 'נדל״ן' : asset.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-900 font-mono text-base">
                            ₪{asset.balance.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-left">
                                <button onClick={() => handleDelete(asset.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
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
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <h2 className="text-xl font-bold mb-4">הוספת נכס לתיק</h2>
            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700">שם הנכס</label>
                <input required type="text" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 mt-1" value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} placeholder="למשל: מניית אפל, דירה בת״א" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">סוג השקעה</label>
                <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 mt-1" value={newAsset.type} onChange={e => setNewAsset({...newAsset, type: e.target.value})}>
                    <option value="stock">מניות (Stock)</option>
                    <option value="crypto">קריפטו (Crypto)</option>
                    <option value="real_estate">נדל״ן (Real Estate)</option>
                    <option value="etf">קרן סל (ETF)</option>
                    <option value="cash">מזומן/פקדון (Cash)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">שווי נוכחי (₪)</label>
                <input required type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 mt-1 font-bold" value={newAsset.balance} onChange={e => setNewAsset({...newAsset, balance: e.target.value})} placeholder="0.00" />
              </div>
              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">ביטול</button>
                <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 shadow-lg shadow-indigo-200">שמור בתיק</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
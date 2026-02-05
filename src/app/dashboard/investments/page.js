"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import {
  TrendingUp, PieChart, Plus, Trash2, Building2, Bitcoin,
  LineChart, Globe, DollarSign, RefreshCw, Briefcase,
  Wallet, ArrowUpRight, ArrowDownRight, MoreHorizontal, X,
  CheckCircle2
} from "lucide-react";

// Helper: Asset Type Configuration
const ASSET_TYPES = {
  'stock': { label: 'מניות', icon: <LineChart size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
  'crypto': { label: 'קריפטו', icon: <Bitcoin size={20} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  'real_estate': { label: 'נדל״ן', icon: <Building2 size={20} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  'etf': { label: 'קרנות סל', icon: <Globe size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  'cash': { label: 'מזומן/עו״ש', icon: <DollarSign size={20} />, color: 'text-slate-600', bg: 'bg-slate-50' },
  'investment': { label: 'השקעה אחרת', icon: <Briefcase size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' }
};

export default function InvestmentsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // New Asset Form State
  const [newAsset, setNewAsset] = useState({ name: "", type: "stock", balance: "" });

  useEffect(() => {
    fetchAssets();
  }, []);

  async function fetchAssets() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch "Investment" accounts
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .in('type', Object.keys(ASSET_TYPES));

      if (error) throw error;

      setAssets(data || []);

      // Calculate Total
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
      balance: parseFloat(newAsset.balance),
      icon: newAsset.type
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

  // Calculate Allocation for Progress Bars
  const getAllocationStats = () => {
    const stats = {};
    assets.forEach(a => {
      stats[a.type] = (stats[a.type] || 0) + a.balance;
    });
    return Object.entries(stats)
      .map(([type, value]) => ({
        type,
        value,
        percent: Math.round((value / totalValue) * 100)
      }))
      .sort((a, b) => b.value - a.value);
  };

  const allocationStats = getAllocationStats();

  if (loading) return (
    <div className="py-24 text-center space-y-4">
      <div className="animate-spin w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full mx-auto"></div>
      <p className="text-slate-400 font-bold text-sm tracking-widest">טוען תיק נכסים...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">תיק השקעות</h1>
          <p className="text-slate-500 mt-1">מבט כולל על הנכסים והפיזור הפיננסי שלך</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} /> הוספת נכס
        </button>
      </div>

      {/* --- Wealth Overview --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Total Net Worth Card (Dark Theme) */}
        <div className="lg:col-span-2 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-between group">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none text-right"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md"><Wallet size={24} className="text-indigo-300" /></div>
              <span className="text-indigo-200 font-bold text-sm tracking-wide">שווי תיק כולל</span>
            </div>
            <h2 className="text-6xl font-black tracking-tight mb-2">₪{totalValue.toLocaleString()}</h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-bold">
              <TrendingUp size={14} /> +0.0% (אין נתונים היסטוריים)
            </div>
          </div>

          {/* Visual Trend Line (Decorative) */}
          <div className="relative z-10 mt-8 h-24 flex items-end gap-1 opacity-20">
            {[30, 45, 40, 60, 55, 75, 70, 90, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-white rounded-t-sm hover:opacity-100 transition-opacity duration-300" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>

        {/* Allocation Card (Light Theme) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <PieChart size={20} className="text-slate-400" /> פיזור נכסים
          </h3>

          <div className="space-y-5 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {allocationStats.length === 0 ? (
              <p className="text-slate-400 text-sm font-medium">אין נכסים להצגה</p>
            ) : (
              allocationStats.map(stat => {
                const config = ASSET_TYPES[stat.type] || ASSET_TYPES['investment'];
                return (
                  <div key={stat.type} className="group cursor-default">
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs p-1 rounded-md ${config.bg} ${config.color}`}>{config.icon}</span>
                        <span className="font-bold text-slate-700">{config.label}</span>
                      </div>
                      <span className="font-bold text-slate-900">{stat.percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${config.bg.replace('bg-', 'bg-').replace('50', '500')}`} style={{ width: `${stat.percent}%` }}></div>
                    </div>
                    <div className="text-right mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-slate-400">
                      ₪{stat.value.toLocaleString()}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* --- Assets Grid --- */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <RefreshCw size={20} className="text-slate-400" /> כל הנכסים
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => {
            const config = ASSET_TYPES[asset.type] || ASSET_TYPES['investment'];
            return (
              <div key={asset.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${config.bg} ${config.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      {config.icon}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-bold text-slate-500">
                      {config.label}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 leading-tight mb-1">{asset.name}</h4>
                  <p className="text-3xl font-black text-slate-900 tracking-tight mb-4">₪{asset.balance.toLocaleString()}</p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-slate-400">עודכן לאחרונה: היום</span>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Empty Add Card */}
          <button
            onClick={() => setShowModal(true)}
            className="border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all min-h-[220px] group"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform text-slate-300 group-hover:text-indigo-400">
              <Plus size={32} />
            </div>
            <p className="font-bold">הוספת נכס חדש</p>
          </button>
        </div>
      </div>

      {/* --- Add Asset Modal --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">הוספת נכס</h2>
                <p className="text-sm font-bold text-slate-400">מעקב אחר נכס חדש בתיק</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="space-y-6">

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">שם הנכס</label>
                <input
                  required
                  type="text"
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                  value={newAsset.name}
                  onChange={e => setNewAsset({ ...newAsset, name: e.target.value })}
                  placeholder="למשל: מניית טסלה, ביטקוין, דירה"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">סוג</label>
                  <div className="relative">
                    <select
                      className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white appearance-none cursor-pointer"
                      value={newAsset.type}
                      onChange={e => setNewAsset({ ...newAsset, type: e.target.value })}
                    >
                      {Object.entries(ASSET_TYPES).map(([key, config]) => (
                        <option key={key} value={key}>{config.label}</option>
                      ))}
                    </select>
                    <ArrowDownRight size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">שווי (₪)</label>
                  <input
                    required
                    type="number"
                    className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                    value={newAsset.balance}
                    onChange={e => setNewAsset({ ...newAsset, balance: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2 mt-4"
              >
                <CheckCircle2 size={20} /> שמור נכס בתיק
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
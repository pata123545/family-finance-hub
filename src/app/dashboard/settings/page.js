"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { initiateBankConnection, fetchAccountBalance, BANK_PROVIDERS } from "@/lib/bank-api";
import {
  User, CreditCard, Sparkles, Shield, Lock,
  LogOut, Loader2, Save, BadgeCheck, Mail, Phone, Crown,
  Building2, Plus, CheckCircle2, AlertTriangle, Wallet,
  Smartphone, Bell, X, Trash2, Landmark, Globe, Link as LinkIcon
} from "lucide-react";

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);

  // Data State
  const [bankAccounts, setBankAccounts] = useState([]);

  // Forms
  const [formData, setFormData] = useState({
    full_name: "",
    occupation: "שכיר",
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [passLoading, setPassLoading] = useState(false);

  // UI State for Modals
  const [showManualModal, setShowManualModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);

  // Manual Connection State
  const [newConnection, setNewConnection] = useState({
    name: "",
    type: "bank",
    balance: "",
  });

  // API Connection State
  const [connectingProvider, setConnectingProvider] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;
    setUser(authUser);

    // 1. Fetch Profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    setFormData({
      full_name: profile?.full_name || "",
      occupation: profile?.occupation || "שכיר",
    });

    // 2. Fetch Connected Accounts
    fetchAccounts(authUser.id);

    setLoading(false);
  }

  async function fetchAccounts(userId) {
    if (!userId) return;
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .in('type', ['bank', 'credit_card', 'cash']);

    if (!error) {
      setBankAccounts(data || []);
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        occupation: formData.occupation
      })
      .eq('id', user.id);

    setSaving(false);

    if (!error) {
      alert("הפרופיל עודכן בהצלחה");
    } else {
      alert("שגיאה בעדכון: " + error.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }
    setPassLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: passwordForm.newPassword
    });
    setPassLoading(false);

    if (!error) {
      alert("הסיסמה שונתה בהצלחה!");
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } else {
      alert("שגיאה: " + error.message);
    }
  };

  // --- Manual Add Logic ---
  const handleManualAdd = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    const { error } = await supabase.from('accounts').insert({
      user_id: user.id,
      name: newConnection.name,
      type: newConnection.type,
      balance: parseFloat(newConnection.balance || 0),
      icon: newConnection.type
    });

    if (!error) {
      setShowManualModal(false);
      setNewConnection({ name: "", type: "bank", balance: "" });
      fetchAccounts(user.id);
    } else {
      alert("שגיאה בהוספה: " + error.message);
    }
  };

  // --- API Connection Logic ---
  const handleApiConnect = async (provider) => {
    if (connectingProvider) return; // prevent double click
    setConnectingProvider(provider.id);

    try {
      // 1. Simulate Auth Flow
      const result = await initiateBankConnection(provider.id);

      if (result.success) {
        // 2. Simulate Fetching Balance
        const initialBalance = await fetchAccountBalance(result.token);

        // 3. Save to Supabase (Simulating a real synced account)
        const { error } = await supabase.from('accounts').insert({
          user_id: user.id,
          name: provider.name,
          type: 'bank', // usually logic detects if card or bank
          balance: initialBalance,
          icon: 'bank' // could store 'api_connected' flag
        });

        if (!error) {
          setShowApiModal(false);
          fetchAccounts(user.id);
          alert(`חיבור ל-${provider.name} בוצע בהצלחה!`);
        } else {
          throw new Error(error.message);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      alert("שגיאה בחיבור לבנק: " + err.message);
    } finally {
      setConnectingProvider(null);
    }
  };

  const handleDeleteAccount = async (id) => {
    if (!confirm("למחוק חיבור זה?")) return;
    await supabase.from('accounts').delete().eq('id', id);
    fetchAccounts(user?.id);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) return (
    <div className="py-24 text-center space-y-4">
      <div className="animate-spin w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full mx-auto"></div>
      <p className="text-slate-400 font-bold text-sm tracking-widest">טוען הגדרות...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6" dir="rtl">

      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">הגדרות חשבון</h1>
          <p className="text-slate-500 mt-1">ניהול פרופיל, אבטחה וחיבורים פיננסיים</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shadow-sm active:scale-95"
        >
          <LogOut size={20} /> התנתק החוצה
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Profile Widget */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white text-2xl font-light shadow-lg">
                {formData.full_name ? formData.full_name.charAt(0) : "U"}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">הפרופיל שלי</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-xs font-bold border border-indigo-100">
                    {formData.occupation}
                  </span>
                  <span className="text-sm font-medium text-slate-400">{user?.email}</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
              <User size={24} />
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">שם מלא לתצוגה</label>
                <input
                  required
                  type="text"
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
                  value={formData.full_name}
                  onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">תחום עיסוק</label>
                <div className="relative">
                  <select
                    className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer transition-all"
                    value={formData.occupation}
                    onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                  >
                    <option value="שכיר">שכיר</option>
                    <option value="עצמאי">עצמאי / פרילנסר</option>
                    <option value="בעל עסק">בעל עסק</option>
                    <option value="פנסיונר">פנסיונר</option>
                    <option value="סטודנט">סטודנט</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} שמור שינויים
              </button>
            </div>
          </form>
        </div>

        {/* 2. Subscription */}
        <div className="bg-[#1A1C1E] p-8 rounded-[2.5rem] border border-slate-800 shadow-xl text-white relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl"><Sparkles size={24} className="text-indigo-300" /></div>
              <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">Pro</span>
            </div>
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-1">החבילה שלך</h3>
            <p className="text-3xl font-black tracking-tight mb-2">Family Plus</p>
            <p className="text-sm text-slate-400 leading-relaxed opacity-80">
              גישה מלאה לניתוח תקציב חכם, חיבור בנקים אוטומטי ותובנות AI.
            </p>
          </div>
          <button className="w-full mt-6 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-black/20">
            שדרוג חבילה
          </button>
        </div>

        {/* 3. Security */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Shield className="text-orange-500" /> אבטחה
              </h2>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">סיסמה חדשה</label>
                <input
                  type="password"
                  required minLength={6}
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="••••••••"
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">אימות</label>
                <input
                  type="password"
                  required minLength={6}
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="••••••••"
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={passLoading}
                className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30 transition-all flex justify-center items-center gap-2 mt-2"
              >
                {passLoading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />} עדכן סיסמה
              </button>
            </form>
          </div>
        </div>

        {/* 4. Connections (Large) */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Building2 className="text-blue-500" /> חיבורי בנקים וכרטיסים (API)
              </h2>
              <p className="text-sm text-slate-500 mt-1">חיבור אוטומטי למערכת הבנקאית בישראל</p>
            </div>
            <div className="flex gap-2">
              {/* API Connect Button */}
              <button
                onClick={() => setShowApiModal(true)}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all shadow-md active:scale-95"
              >
                <LinkIcon size={18} /> חיבור אוטומטי
              </button>

              {/* Manual Add Button */}
              <button
                onClick={() => setShowManualModal(true)}
                className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"
                title="הוספה ידנית"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[100px]">
            {bankAccounts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-8 border-2 border-dashed border-slate-100 rounded-2xl">
                <Landmark size={40} className="mb-2 opacity-50" />
                <p className="font-bold text-sm">טרם חובר חשבון בנק</p>
                <button onClick={() => setShowApiModal(true)} className="text-blue-600 text-sm font-bold mt-1 hover:underline">התחבר עכשיו ב-Open Banking</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm text-lg font-black shrink-0 ${account.type === 'bank' ? 'bg-white text-red-600' :
                        account.type === 'credit_card' ? 'bg-white text-blue-600' : 'bg-white text-emerald-600'
                      }`}>
                      {account.type === 'bank' ? 'B' : account.type === 'credit_card' ? <CreditCard size={20} /> : <Wallet size={20} />}
                    </div>
                    <div className="mr-4 flex-1">
                      <h4 className="font-bold text-slate-900">{account.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-slate-500">
                          {account.type === 'bank' ? 'חשבון בנק' : account.type === 'credit_card' ? 'כרטיס אשראי' : 'מזומן'}
                        </span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <span className="text-xs font-bold text-slate-900">₪{account.balance?.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteAccount(account.id)}
                      className="absolute left-4 opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* --- API Connection Modal --- */}
      {showApiModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900">בחר בנק לחיבור</h2>
                <p className="text-sm font-bold text-slate-400">החיבור מאובטח בתקן Open Banking</p>
              </div>
              <button onClick={() => setShowApiModal(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {BANK_PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleApiConnect(provider)}
                  disabled={connectingProvider !== null}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group ${connectingProvider === provider.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg ${provider.color} transition-transform group-hover:scale-110`}>
                    {connectingProvider === provider.id ? <Loader2 className="animate-spin" /> : provider.logo}
                  </div>
                  <span className="font-bold text-slate-700 text-sm text-center">{provider.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex gap-4 items-center">
              <Shield className="text-blue-500 shrink-0" size={24} />
              <p className="text-xs text-blue-800 font-medium">
                הנתונים שלך מוצפנים ומאובטחים. החיבור מתבצע באמצעות טוקן גישה לקריאה בלבד ללא שמירת סיסמאות בנק.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Manual Add Modal --- */}
      {showManualModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900">הוספה ידנית</h2>
              <button onClick={() => setShowManualModal(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">שם הבנק / הכרטיס</label>
                <input
                  type="text"
                  required
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  value={newConnection.name}
                  onChange={e => setNewConnection({ ...newConnection, name: e.target.value })}
                  placeholder="כותרת לחשבון"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">סוג</label>
                  <select
                    className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 appearance-none cursor-pointer"
                    value={newConnection.type}
                    onChange={e => setNewConnection({ ...newConnection, type: e.target.value })}
                  >
                    <option value="bank">בנק</option>
                    <option value="credit_card">כרטיס אשראי</option>
                    <option value="cash">מזומן / ארנק</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">יתרה (₪)</label>
                  <input
                    type="number"
                    className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    value={newConnection.balance}
                    onChange={e => setNewConnection({ ...newConnection, balance: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-700 transition-colors flex justify-center gap-2 mt-4"
              >
                <CheckCircle2 size={20} /> שמור חשבון
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
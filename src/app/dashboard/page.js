"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, PiggyBank, Activity, Calendar, ArrowLeft } from "lucide-react";

export default function DashboardPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  
  // נתונים לסיכום
  const [summary, setSummary] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    investmentsValue: 0
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. שם פרטי
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (profile?.full_name) {
             setUserName(profile.full_name.split(" ")[0]);
        }

        // 2. יתרה כוללת
        const { data: accounts } = await supabase.from('accounts').select('balance, type').eq('user_id', user.id);
        const totalAssets = accounts?.reduce((sum, acc) => sum + Number(acc.balance), 0) || 0;
        
        const investments = accounts
            ?.filter(a => ['stock', 'crypto', 'real_estate', 'etf'].includes(a.type))
            .reduce((sum, acc) => sum + Number(acc.balance), 0) || 0;

        // 3. תנועות החודש + 5 פעולות אחרונות
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

        // שליפת כל תנועות החודש לחישובים
        const { data: monthTx } = await supabase
            .from('transactions')
            .select('amount, is_income')
            .eq('user_id', user.id)
            .gte('date', startOfMonth)
            .lte('date', endOfMonth);

        let income = 0;
        let expenses = 0;
        monthTx?.forEach(t => {
            if (t.is_income) income += Number(t.amount);
            else expenses += Math.abs(Number(t.amount));
        });

        // שליפת 5 הפעולות האחרונות (בלי קשר לתאריך) להצגה למטה
        const { data: recentTx } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: false })
            .limit(5);

        setSummary({
            totalBalance: totalAssets,
            monthlyIncome: income,
            monthlyExpenses: expenses,
            investmentsValue: investments
        });
        
        setRecentTransactions(recentTx || []);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-slate-400">טוען נתונים...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
      
      {/* כותרת */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">
            היי {userName || "חבר"},
        </h1>
        <p className="text-slate-500 mt-1">הנה תמונת המצב הפיננסית שלך להיום.</p>
      </div>

      {/* --- כרטיסים ראשיים --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 text-indigo-200">
                <div className="p-2 bg-white/10 rounded-xl"><Wallet size={20}/></div>
                <span className="font-bold text-sm">שווי נכסים כולל</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">
                ₪{summary.totalBalance.toLocaleString()}
            </h2>
            <p className="text-slate-400 text-sm">כולל עו״ש, השקעות וחסכונות</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 text-red-500">
                <div className="p-2 bg-red-50 rounded-xl"><ArrowDownRight size={20}/></div>
                <span className="font-bold text-sm">הוצאות החודש</span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                ₪{summary.monthlyExpenses.toLocaleString()}
            </h2>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-red-500 w-2/3"></div> 
            </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 text-emerald-600">
                <div className="p-2 bg-emerald-50 rounded-xl"><ArrowUpRight size={20}/></div>
                <span className="font-bold text-sm">הכנסות החודש</span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                ₪{summary.monthlyIncome.toLocaleString()}
            </h2>
            <p className="text-emerald-600 font-bold text-sm mt-4 flex items-center gap-1">
                <TrendingUp size={16}/> תזרים חיובי
            </p>
        </div>
      </div>

      {/* --- שורה שנייה: השקעות וחיסכון --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 flex items-center justify-between">
             <div>
                <p className="text-indigo-600 font-bold mb-1 flex items-center gap-2">
                    <Activity size={18}/> תיק השקעות
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900">
                    ₪{summary.investmentsValue.toLocaleString()}
                </h3>
                <p className="text-slate-500 text-sm mt-1">מניות, קריפטו ונדל״ן</p>
             </div>
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-md">
                 <TrendingUp size={28}/>
             </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 flex items-center justify-between">
             <div>
                <p className="text-emerald-700 font-bold mb-1 flex items-center gap-2">
                    <PiggyBank size={18}/> נשאר בכיס (חיסכון)
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900">
                    ₪{(summary.monthlyIncome - summary.monthlyExpenses).toLocaleString()}
                </h3>
                <p className="text-slate-500 text-sm mt-1">החודש הזה</p>
             </div>
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-md">
                 <ArrowUpRight size={28}/>
             </div>
          </div>
      </div>

      {/* --- פעולות אחרונות (החלק שביקשת להחזיר) --- */}
      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">פעולות אחרונות</h3>
            <Link href="/dashboard/transactions" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                לכל התנועות <ArrowLeft size={16}/>
            </Link>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-right">
                <tbody className="divide-y divide-slate-50">
                    {recentTransactions.length === 0 ? (
                        <tr><td className="p-8 text-center text-slate-400">עדיין אין פעולות. זה הזמן להוסיף!</td></tr>
                    ) : (
                        recentTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900">{tx.description}</span>
                                        <span className="text-xs text-slate-500">{tx.category}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14}/> 
                                        {new Date(tx.date).toLocaleDateString('he-IL', {day: 'numeric', month: 'short'})}
                                    </div>
                                </td>
                                <td className={`px-8 py-5 font-bold font-mono text-lg text-left dir-ltr ${tx.is_income ? 'text-emerald-600' : 'text-slate-900'}`}>
                                    {tx.is_income ? '+' : '-'}₪{Math.abs(tx.amount).toLocaleString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
}
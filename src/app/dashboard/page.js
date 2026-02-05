"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, PiggyBank, Activity, Calendar, ArrowLeft,
    MoreHorizontal, ShoppingBag, Coffee, Car, Home, Zap, Smartphone, ArrowRightLeft, CreditCard,
    Plus, Send, RefreshCcw, PieChart as PieChartIcon, LayoutDashboard, List
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

const getCategoryIcon = (category) => {
    const map = {
        'food': <Coffee size={18} />,
        'shopping': <ShoppingBag size={18} />,
        'transport': <Car size={18} />,
        'housing': <Home size={18} />,
        'utilities': <Zap size={18} />,
        'communication': <Smartphone size={18} />,
        'transfer': <ArrowRightLeft size={18} />,
        'salary': <Wallet size={18} />,
    };
    return map[category?.toLowerCase()] || <CreditCard size={18} />;
};

export default function DashboardPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview"); // overview | analytics

    // Summary Data
    const [summary, setSummary] = useState({
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        investmentsValue: 0
    });

    const [recentTransactions, setRecentTransactions] = useState([]);
    const [upcomingPayments, setUpcomingPayments] = useState([]);
    const [balanceChartData, setBalanceChartData] = useState([]); // { name: 'Jan', income: 0, expense: 0 }
    const [assetAllocationData, setAssetAllocationData] = useState([]); // { name: 'Stocks', value: 0 }
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                // 1. User Profile
                const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
                if (profile?.full_name) setUserName(profile.full_name.split(" ")[0]);

                // 2. Accounts & Asset Allocation
                const { data: accounts } = await supabase.from('accounts').select('balance, type').eq('user_id', user.id);

                const totalAssets = accounts?.reduce((sum, acc) => sum + Number(acc.balance), 0) || 0;

                const investmentsTypes = ['stock', 'crypto', 'real_estate', 'etf', 'savings'];
                const investments = accounts
                    ?.filter(a => investmentsTypes.includes(a.type))
                    .reduce((sum, acc) => sum + Number(acc.balance), 0) || 0;

                // Asset Allocation Logic
                const assetsMap = {};
                accounts?.forEach(acc => {
                    const typeName = acc.type === 'checking' ? 'עו״ש' :
                        acc.type === 'savings' ? 'חסכונות' :
                            acc.type === 'stock' ? 'מניות' :
                                acc.type === 'crypto' ? 'קריפטו' :
                                    acc.type === 'real_estate' ? 'נדל״ן' :
                                        acc.type === 'credit' ? 'אשראי' : acc.type;

                    if (Number(acc.balance) > 0) {
                        assetsMap[typeName] = (assetsMap[typeName] || 0) + Number(acc.balance);
                    }
                });
                const assetData = Object.entries(assetsMap).map(([name, value]) => ({ name, value }));
                setAssetAllocationData(assetData);

                // 3. Transactions & Monthly Summary
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

                // Current Month Transactions
                const { data: monthTx } = await supabase.from('transactions')
                    .select('amount, is_income')
                    .eq('user_id', user.id).gte('date', startOfMonth).lte('date', endOfMonth);

                let income = 0;
                let expenses = 0;
                monthTx?.forEach(t => {
                    if (t.is_income) income += Number(t.amount);
                    else expenses += Math.abs(Number(t.amount));
                });

                // Recent 5 Transactions
                const { data: recentTx } = await supabase.from('transactions')
                    .select('*').eq('user_id', user.id).order('date', { ascending: false }).limit(5);
                setRecentTransactions(recentTx || []);

                // 4. Upcoming Payments (Fixed Expenses)
                const { data: fixedExpenses } = await supabase.from('fixed_expenses').select('*').eq('user_id', user.id);

                const currentDay = now.getDate();
                const payments = fixedExpenses?.map(item => {
                    let nextDate = new Date();
                    if (item.charge_day >= currentDay) {
                        nextDate.setDate(item.charge_day);
                    } else {
                        nextDate.setMonth(nextDate.getMonth() + 1);
                        nextDate.setDate(item.charge_day);
                    }

                    const diffTime = nextDate - now;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    let dateLabel = diffDays === 0 ? 'היום' : diffDays === 1 ? 'מחר' : `בעוד ${diffDays} ימים`;
                    if (diffDays > 30) dateLabel = `ב-${item.charge_day} לחודש`;

                    return {
                        id: item.id,
                        name: item.title,
                        amount: item.monthly_amount,
                        date: dateLabel,
                        rawDate: nextDate, // for sorting
                        icon: item.category === 'housing' ? <Home size={16} /> :
                            item.category === 'utilities' ? <Zap size={16} /> :
                                item.category === 'loan' ? <Landmark size={16} /> : <Activity size={16} />
                    };
                })
                    .sort((a, b) => a.rawDate - b.rawDate)
                    .slice(0, 3); // Top 3

                setUpcomingPayments(payments || []);

                // 5. Balance History (Last 6 Months) for Charts
                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
                sixMonthsAgo.setDate(1); // Start of that month

                const { data: historyTx } = await supabase.from('transactions')
                    .select('amount, is_income, date')
                    .eq('user_id', user.id)
                    .gte('date', sixMonthsAgo.toISOString())
                    .order('date', { ascending: true });

                const chartMap = {};
                // Initialize last 6 months
                for (let i = 0; i < 6; i++) {
                    const d = new Date(sixMonthsAgo);
                    d.setMonth(d.getMonth() + i);
                    const key = d.toLocaleDateString('en-US', { month: 'short' }); // Jan, Feb...
                    chartMap[key] = { name: key, income: 0, expense: 0 };
                }

                historyTx?.forEach(tx => {
                    const d = new Date(tx.date);
                    const key = d.toLocaleDateString('en-US', { month: 'short' });
                    if (chartMap[key]) {
                        if (tx.is_income) chartMap[key].income += Number(tx.amount);
                        else chartMap[key].expense += Math.abs(Number(tx.amount));
                    }
                });

                setBalanceChartData(Object.values(chartMap));


                setSummary({
                    totalBalance: totalAssets,
                    monthlyIncome: income,
                    monthlyExpenses: expenses,
                    investmentsValue: investments
                });

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleTabChange = (tab) => {
        if (tab === 'budget') {
            router.push('/dashboard/budget');
        } else {
            setActiveTab(tab);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen text-slate-400">
            <div className="animate-pulse">טוען נתונים...</div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 p-6">

            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">היי {userName || "חבר"},</h1>
                    <p className="text-slate-500 mt-1">סקירה פיננסית {activeTab === 'overview' ? 'יומית' : 'מעמיקה'}</p>
                </div>

                <div className="bg-slate-100/80 p-1.5 rounded-xl inline-flex relative">
                    {['overview', 'analytics', 'budget'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`relative z-10 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === tab
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab === 'overview' && 'סקירה'}
                            {tab === 'analytics' && 'ניתוח נתונים'}
                            {tab === 'budget' && 'תקציב'}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- TAB CONTENT: OVERVIEW --- */}
            {activeTab === 'overview' && (
                <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">

                    {/* Quick Actions Bar */}
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        <Link href="/dashboard/transactions" className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:scale-105 transition-transform">
                            <Plus size={18} /> פעולה חדשה
                        </Link>
                        <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-100 px-5 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                            <Send size={18} className="text-indigo-500" /> העברת כספים
                        </button>
                        <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-100 px-5 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                            <RefreshCcw size={18} className="text-emerald-500" /> המרת מט״ח
                        </button>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Balance */}
                        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl shadow-indigo-500/10 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 text-indigo-200">
                                    <div className="p-2 bg-white/10 rounded-xl"><Wallet size={20} /></div>
                                    <span className="font-bold text-sm">שווי נכסים כולל</span>
                                </div>
                                <h2 className="text-4xl font-extrabold tracking-tight mb-2">₪{summary.totalBalance.toLocaleString()}</h2>
                                <p className="text-slate-400 text-sm">כולל עו״ש, השקעות וחסכונות</p>
                            </div>
                        </div>

                        {/* Upcoming Payments Widget */}
                        <div className="md:col-span-2 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Calendar size={18} className="text-indigo-500" /> תשלומים קרובים
                            </h3>
                            {upcomingPayments.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {upcomingPayments.map(payment => (
                                        <div key={payment.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="p-2.5 bg-white rounded-xl text-slate-400 shadow-sm">{payment.icon}</div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm truncate max-w-[100px]" title={payment.name}>{payment.name}</p>
                                                <p className="text-xs text-indigo-600 font-medium">{payment.date}</p>
                                            </div>
                                            <div className="mr-auto font-mono font-bold text-slate-900">₪{payment.amount.toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-slate-400 text-sm text-center py-6">אין תשלומים קרובים החודש 🎉</div>
                            )}
                        </div>
                    </div>

                    {/* Secondary KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Expense */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-red-100/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-[50px] opacity-50 pointer-events-none"></div>
                            <div className="flex items-center gap-3 mb-4 text-red-500 relative z-10">
                                <div className="p-2 bg-red-50 rounded-xl"><ArrowDownRight size={20} /></div>
                                <span className="font-bold text-sm">הוצאות החודש</span>
                            </div>
                            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2 relative z-10">₪{summary.monthlyExpenses.toLocaleString()}</h2>
                        </div>

                        {/* Income */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-emerald-100/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[50px] opacity-50 pointer-events-none"></div>
                            <div className="flex items-center gap-3 mb-4 text-emerald-600 relative z-10">
                                <div className="p-2 bg-emerald-50 rounded-xl"><ArrowUpRight size={20} /></div>
                                <span className="font-bold text-sm">הכנסות החודש</span>
                            </div>
                            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2 relative z-10">₪{summary.monthlyIncome.toLocaleString()}</h2>
                        </div>

                        {/* Savings */}
                        <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 hover:shadow-md transition-shadow">
                            <p className="text-indigo-600 font-bold mb-1 flex items-center gap-2"><PiggyBank size={18} /> נשאר בכיס</p>
                            <h3 className="text-3xl font-extrabold text-slate-900">₪{(summary.monthlyIncome - summary.monthlyExpenses).toLocaleString()}</h3>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">פעולות אחרונות</h3>
                            <Link href="/dashboard/transactions" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">לכל התנועות <ArrowLeft size={16} /></Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-right">
                                <tbody className="divide-y divide-slate-50">
                                    {recentTransactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group cursor-default">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">{getCategoryIcon(tx.category)}</div>
                                                    <div className="flex flex-col"><span className="font-bold text-slate-900">{tx.description}</span><span className="text-xs text-slate-500">{tx.category}</span></div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-slate-400 text-sm">
                                                <div className="flex items-center gap-2"><Calendar size={14} /> {new Date(tx.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })}</div>
                                            </td>
                                            <td className={`px-8 py-5 font-bold font-mono text-lg text-left dir-ltr ${tx.is_income ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                {tx.is_income ? '+' : '-'}₪{Math.abs(tx.amount).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentTransactions.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-8 text-center text-slate-400">לא נמצאו פעולות לאחרונה</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB CONTENT: ANALYTICS --- */}
            {activeTab === 'analytics' && (
                <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
                    {/* Monthly Balance Chart */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-slate-400" /> מאזן חודשי (6 חודשים)</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-600"></span><span className="text-sm text-slate-600">הכנסות</span></div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-sm text-slate-600">הוצאות</span></div>
                            </div>
                        </div>
                        <div className="h-[400px] w-full" dir="ltr">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={balanceChartData} barSize="15%">
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }} dy={10} />
                                    <YAxis hide={true} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff', textAlign: 'right' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: 'transparent', stroke: '#E0E5F2', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Bar dataKey="income" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Asset Allocation Pie Chart */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><PieChartIcon size={20} className="text-slate-400" /> פילוח נכסים</h3>
                            <div className="h-[300px] w-full flex items-center justify-center" dir="ltr">
                                {assetAllocationData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={assetAllocationData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                                                {assetAllocationData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="text-slate-400">אין נתונים להצגה</div>
                                )}
                            </div>
                        </div>
                        {/* Insights Placeholder */}
                        <div className="bg-indigo-900 text-white p-8 rounded-[2rem] flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">תובנות מהירות</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-white/20 rounded-full mt-1"><ArrowUpRight size={14} /></div>
                                    <p className="text-indigo-100">ההוצאות שלך ירדו ב-<strong>15%</strong> בהשוואה לחודש שעבר. כל הכבוד!</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1 bg-white/20 rounded-full mt-1"><Activity size={14} /></div>
                                    <p className="text-indigo-100">תיק ההשקעות שלך גדל ב-<strong>₪4,200</strong> החודש.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import {
    Package, Plus, Search, Filter, AlertTriangle, TrendingUp,
    TrendingDown, ShoppingCart, Coins, Archive, MoreVertical,
    Edit3, Trash2
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function InventoryDashboard({ user }) {
    const supabase = createClient();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [inventoryStats, setInventoryStats] = useState({
        totalValue: 0,
        totalItems: 0,
        lowStockAlerts: 0,
        potentialProfit: 0
    });

    // Modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [transactionType, setTransactionType] = useState('sell'); // 'sell' | 'restock'

    // Form Data
    const [newItem, setNewItem] = useState({
        name: "",
        sku: "",
        category: "",
        quantity: 0,
        cost_price: 0,
        selling_price: 0,
        low_stock_threshold: 5
    });

    const [transactionData, setTransactionData] = useState({
        quantity: 1,
        create_financial_record: true,
        note: ""
    });

    useEffect(() => {
        if (user) fetchInventory();
    }, [user]);

    async function fetchInventory() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('inventory_items')
                .select('*')
                .eq('user_id', user.id)
                .order('name');

            if (error) throw error;

            setItems(data || []);
            calculateStats(data || []);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        } finally {
            setLoading(false);
        }
    }

    function calculateStats(data) {
        const stats = data.reduce((acc, item) => {
            acc.totalItems += item.quantity;
            acc.totalValue += (item.quantity * item.cost_price);
            if (item.quantity <= item.low_stock_threshold) acc.lowStockAlerts += 1;
            acc.potentialProfit += (item.quantity * (item.selling_price - item.cost_price));
            return acc;
        }, { totalValue: 0, totalItems: 0, lowStockAlerts: 0, potentialProfit: 0 });
        setInventoryStats(stats);
    }

    async function handleAddItem(e) {
        e.preventDefault();
        try {
            const { error } = await supabase.from('inventory_items').insert([{
                ...newItem,
                user_id: user.id
            }]);

            if (error) throw error;

            setIsAddModalOpen(false);
            setNewItem({ name: "", sku: "", category: "", quantity: 0, cost_price: 0, selling_price: 0, low_stock_threshold: 5 });
            fetchInventory();
        } catch (error) {
            console.error("Error adding item:", error);
            alert("שגיאה בהוספת מוצר. אנא נסה שוב.");
        }
    }

    async function handleTransaction(e) {
        e.preventDefault();
        if (!selectedItem) return;

        const qtyChange = Number(transactionData.quantity);
        const newQty = transactionType === 'restock'
            ? selectedItem.quantity + qtyChange
            : selectedItem.quantity - qtyChange;

        if (newQty < 0) {
            alert("שגיאה: לא ניתן למכור יותר מהמלאי הקיים!");
            return;
        }

        try {
            // 1. Update Inventory Item
            const { error: updateError } = await supabase
                .from('inventory_items')
                .update({ quantity: newQty })
                .eq('id', selectedItem.id);

            if (updateError) throw updateError;

            // 2. Log Inventory Change
            await supabase.from('inventory_logs').insert([{
                user_id: user.id,
                item_id: selectedItem.id,
                change_type: transactionType,
                quantity_change: transactionType === 'restock' ? qtyChange : -qtyChange,
                previous_quantity: selectedItem.quantity,
                new_quantity: newQty,
                note: transactionData.note
            }]);

            // 3. Create Financial Transaction (if selected)
            if (transactionData.create_financial_record) {
                const amount = transactionType === 'restock'
                    ? qtyChange * selectedItem.cost_price
                    : qtyChange * selectedItem.selling_price;

                await supabase.from('transactions').insert([{
                    user_id: user.id,
                    amount: amount,
                    is_income: transactionType === 'sell',
                    category: transactionType === 'sell' ? 'Sales' : 'Inventory',
                    description: `${transactionType === 'sell' ? 'מכירה' : 'רכישת מלאי'}: ${selectedItem.name} (x${qtyChange})`,
                    date: new Date().toISOString()
                }]);
            }

            setIsTransactionModalOpen(false);
            setTransactionData({ quantity: 1, create_financial_record: true, note: "" });
            fetchInventory();
        } catch (error) {
            console.error("Error processing transaction:", error);
            alert("שגיאה בביצוע הפעולה. אנא נסה שוב.");
        }
    }

    // Filtered Items
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center py-10">טוען נתוני מלאי...</div>;

    return (
        <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-3 mb-2 text-indigo-600">
                        <div className="p-2 bg-indigo-50 rounded-xl"><Coins size={20} /></div>
                        <span className="font-bold text-sm">שווי מלאי</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">₪{inventoryStats.totalValue.toLocaleString()}</h2>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-3 mb-2 text-emerald-600">
                        <div className="p-2 bg-emerald-50 rounded-xl"><TrendingUp size={20} /></div>
                        <span className="font-bold text-sm">פוטנציאל רווח</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">₪{inventoryStats.potentialProfit.toLocaleString()}</h2>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-3 mb-2 text-blue-600">
                        <div className="p-2 bg-blue-50 rounded-xl"><Package size={20} /></div>
                        <span className="font-bold text-sm">סה״כ פריטים</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">{inventoryStats.totalItems}</h2>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-3 mb-2 text-red-500">
                        <div className="p-2 bg-red-50 rounded-xl"><AlertTriangle size={20} /></div>
                        <span className="font-bold text-sm">מלאי נמוך</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">{inventoryStats.lowStockAlerts}</h2>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="חיפוש מוצר, מק״ט..."
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                >
                    <Plus size={18} /> הוסף מוצר
                </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                        <tr>
                            <th className="px-6 py-4 font-bold">שם המוצר</th>
                            <th className="px-6 py-4 font-bold">מק״ט</th>
                            <th className="px-6 py-4 font-bold">מלאי</th>
                            <th className="px-6 py-4 font-bold">עלות</th>
                            <th className="px-6 py-4 font-bold">מחיר מכירה</th>
                            <th className="px-6 py-4 font-bold">שווי כולל</th>
                            <th className="px-6 py-4 font-bold">פעולות</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredItems.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                                <td className="px-6 py-4 text-slate-500 font-mono text-sm">{item.sku || '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${item.quantity <= item.low_stock_threshold ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {item.quantity} יח׳
                                        {item.quantity <= item.low_stock_threshold && <AlertTriangle size={12} />}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">₪{Number(item.cost_price).toLocaleString()}</td>
                                <td className="px-6 py-4 text-slate-900 font-bold">₪{Number(item.selling_price).toLocaleString()}</td>
                                <td className="px-6 py-4 text-indigo-600 font-bold">₪{(item.quantity * item.cost_price).toLocaleString()}</td>
                                <td className="px-6 py-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setSelectedItem(item); setTransactionType('sell'); setIsTransactionModalOpen(true); }}
                                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg" title="מכירה"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                    <button
                                        onClick={() => { setSelectedItem(item); setTransactionType('restock'); setIsTransactionModalOpen(true); }}
                                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg" title="הזמנת מלאי"
                                    >
                                        <Archive size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                                    לא נמצאו מוצרים. זה הזמן להוסיף את המוצר הראשון שלך!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Item Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">הוספת מוצר חדש</h2>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">שם המוצר</label>
                                <input required type="text" className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
                                    value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">מק״ט (אופציונלי)</label>
                                    <input type="text" className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
                                        value={newItem.sku} onChange={e => setNewItem({ ...newItem, sku: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">כמות התחלתית</label>
                                    <input required type="number" min="0" className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
                                        value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">מחיר עלות (₪)</label>
                                    <input required type="number" step="0.01" className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
                                        value={newItem.cost_price} onChange={e => setNewItem({ ...newItem, cost_price: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">מחיר מכירה (₪)</label>
                                    <input required type="number" step="0.01" className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
                                        value={newItem.selling_price} onChange={e => setNewItem({ ...newItem, selling_price: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">ביטול</button>
                                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200">שמור מוצר</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Transaction Modal (Sell/Restock) */}
            {isTransactionModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
                        <div className={`p-4 rounded-2xl mb-6 ${transactionType === 'sell' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                {transactionType === 'sell' ? <ShoppingCart size={24} /> : <Archive size={24} />}
                                {transactionType === 'sell' ? 'מכירת מוצר' : 'עדכון מלאי'}
                            </h2>
                            <p className="text-sm opacity-80">{selectedItem.name} (נוכחי: {selectedItem.quantity})</p>
                        </div>

                        <form onSubmit={handleTransaction} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">כמות ל{transactionType === 'sell' ? 'מכירה' : 'הוספה'}</label>
                                <input required type="number" min="1" className="w-full p-4 text-lg font-bold bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
                                    value={transactionData.quantity} onChange={e => setTransactionData({ ...transactionData, quantity: e.target.value })} />
                            </div>

                            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                <input type="checkbox" className="mt-1 w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                                    checked={transactionData.create_financial_record}
                                    onChange={e => setTransactionData({ ...transactionData, create_financial_record: e.target.checked })} />
                                <div>
                                    <span className="font-bold text-slate-900 block">תיעוד כספי אוטומטי</span>
                                    <span className="text-xs text-slate-500">
                                        יצור פעולת {transactionType === 'sell' ? 'הכנסה' : 'הוצאה'} בשווי ₪{((Number(transactionData.quantity) || 0) * (transactionType === 'sell' ? selectedItem.selling_price : selectedItem.cost_price)).toLocaleString()}
                                    </span>
                                </div>
                            </label>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">הערות (אופציונלי)</label>
                                <textarea className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 resize-none h-24"
                                    placeholder="הערה לתנועה..."
                                    value={transactionData.note || ""} onChange={e => setTransactionData({ ...transactionData, note: e.target.value })}></textarea>
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setIsTransactionModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">ביטול</button>
                                <button type="submit" className={`flex-1 py-3 text-white font-bold rounded-xl shadow-lg transition-all ${transactionType === 'sell' ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700' : 'bg-blue-600 shadow-blue-200 hover:bg-blue-700'}`}>
                                    {transactionType === 'sell' ? 'בצע מכירה' : 'עדכן מלאי'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

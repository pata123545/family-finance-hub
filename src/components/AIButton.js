"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Loader2, X, Send, Bot, Trash2 } from "lucide-react";

export default function AIButton({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // גלילה אוטומטית למטה בתוך הצ'אט בלבד
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    
    if (nextState && messages.length === 0) {
        setMessages([{ role: 'ai', content: `היי ${user?.email?.split('@')[0] || ''}, אני העוזר הפיננסי שלך. הנתונים מולי - מה תרצה לבדוק?` }]);
    }

    // פוקוס ללא גלילה של העמוד
    if (nextState) {
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
    }
  };

  const handleClearChat = () => {
    setMessages([{ role: 'ai', content: "השיחה נוקתה. איך אפשר לעזור מחדש?" }]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: user.id,
          question: input 
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.insight }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "תקלה בתקשורת, נסה שוב. 😅" }]);
    } finally {
      setIsLoading(false);
      // החזרת פוקוס ללא גלילה
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={`relative p-2.5 rounded-xl transition-all border border-transparent 
          ${isOpen 
            ? 'bg-indigo-600 text-white shadow-md' 
            : 'text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm hover:border-slate-100'
          }
        `}
      >
        <Sparkles size={20} />
      </button>

      {isOpen && (
        <div 
            className="fixed left-0 z-[50] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-300 font-sans"
            style={{ 
                top: '100px',
                width: '350px', 
                height: '500px' 
            }} 
        >
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center shadow-inner">
                    <Bot size={20} className="text-white" />
                </div>
                <div>
                    <h3 className="text-sm font-bold">היועץ האישי</h3>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-[10px]">מחובר לנתונים</span>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-1">
                 <button onClick={handleClearChat} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="נקה שיחה">
                    <Trash2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                    <X size={18} />
                </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
            {messages.map((msg, index) => (
                <div key={index} className={`flex w-full ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`
                        max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm relative border
                        ${msg.role === 'user' 
                            ? 'bg-indigo-600 text-white border-indigo-600 rounded-tr-none' 
                            : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'
                        }
                    `}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-end w-full">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1 justify-center w-14">
                        <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 shrink-0">
            <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="שאל אותי משהו..."
                    className="w-full bg-transparent py-3 pr-3 pl-10 text-sm focus:outline-none text-slate-900 placeholder:text-slate-400"
                    dir="rtl"
                />
                <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute left-1.5 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? <Loader2 size={16} className="animate-spin"/> : <Send size={16} className="rotate-180" />} 
                </button>
            </div>
          </form>
      </div>
      )}
    </>
  );
}
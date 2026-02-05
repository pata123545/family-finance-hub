"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Loader2, X, Send, Bot, Trash2, ChevronRight, Zap } from "lucide-react";

export default function AIButton({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const SUGGESTIONS = [
    "כמה כסף נשאר לי החודש?",
    "האם חרגתי בתקציב המזון?",
    "צפה את ההוצאות לשבוע הבא",
    "איך אני יכול לחסוך יותר?"
  ];

  // Auto-scroll to bottom
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

    // Initial welcome message if empty
    if (nextState && messages.length === 0) {
      setMessages([{ role: 'ai', content: `היי ${user?.email?.split('@')[0] || ''}, אני יועץ ה-AI הפיננסי שלך. לנתח עבורך את התקציב?` }]);
    }

    // Focus input without scrolling page
    if (nextState) {
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
    }
  };

  const handleClearChat = () => {
    setMessages([{ role: 'ai', content: "השיחה נוקתה. אני כאן לכל שאלה!" }]);
  };

  const handleSend = async (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;

    if (!textToSend.trim()) return;

    // Optimistic UI update
    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          question: textToSend
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.insight }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "אופס, נראה שיש תקלה בתקשורת. נסה שוב מאוחר יותר. 😅" }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        title="יועץ פיננסי חכם"
        className={`relative p-3 rounded-2xl transition-all duration-300 border
          ${isOpen
            ? 'bg-indigo-600 text-white shadow-lg border-indigo-500 scale-105'
            : 'bg-white text-slate-500 hover:text-indigo-600 hover:shadow-md border-slate-200 hover:-translate-y-0.5'
          }
        `}
      >
        <Sparkles size={20} className={isOpen ? "animate-pulse" : ""} />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-26 left-4 md:left-8 z-[100] flex flex-col bg-white rounded-[1rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-300 font-sans"
          style={{
            width: 'min(90vw, 380px)',
            height: 'min(70vh, 600px)',
            boxShadow: '0 20px 60px -10px rgba(0,0,0,0.15)'
          }}
        >
          {/* Header (Forced LTR for specific layout request) */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 flex justify-between items-center text-white shrink-0 relative overflow-hidden" dir="rtl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[50px] opacity-20 -mr-10 -mt-10"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
                <Bot size={22} className="text-white" />
              </div>
              <div className="text-right">
                <h3 className="text-base font-bold tracking-tight">Financial AI</h3>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-medium text-slate-300">Active Advisor</span>
                </div>
              </div>
            </div>

            <div className="flex gap-0 top-2 relative z-10">
              <button
                onClick={handleClearChat}
                className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors backdrop-blur-sm"
                title="Clear Chat"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors backdrop-blur-sm"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div key={index} className={`flex w-full ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`
                        max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm relative animated-message
                        ${msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }
                    `}>
                  {msg.content}
                  <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking Indicator */}
            {isLoading && (
              <div className="flex justify-end w-full">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1.5 justify-center w-20">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}

            {/* Quick Suggestions (Only show when chat is empty or last message was from AI) */}
            {!isLoading && (messages.length === 0 || messages[messages.length - 1].role === 'ai') && (
              <div className="grid grid-cols-1 gap-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-xs font-bold text-slate-400 px-1 mb-1">שאלות נפוצות</p>
                {SUGGESTIONS.map((sugg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(null, sugg)}
                    className="bg-white border border-slate-200 text-slate-600 text-sm font-medium p-3 rounded-xl hover:bg-indigo-50 hover:border-indigo-100 hover:text-indigo-600 transition-all text-right flex items-center justify-between group"
                  >
                    <span>{sugg}</span>
                    <Zap size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area (Forced LTR for button positioning) */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-inner" dir="ltr">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="שאל אותי על הכסף שלך..."
                className="w-full bg-transparent py-4 pr-4 pl-12 text-sm font-medium focus:outline-none text-slate-900 placeholder:text-slate-400 text-right"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute left-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md hover:shadow-indigo-500/30 active:scale-95"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="rotate-180 ml-0.5" />}
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-300 mt-2 font-medium">
              בינה מלאכותית יכולה לעשות טעויות. בדוק מידע חשוב.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
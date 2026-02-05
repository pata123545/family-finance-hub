"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-sm text-center border border-slate-100 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 dark:bg-indigo-900/20">
          <Mail size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 dark:text-white">
          בדוק את המייל שלך
        </h1>
        
        <p className="text-slate-500 mb-8 leading-relaxed dark:text-zinc-400">
          שלחנו לך קישור אישור לכתובת המייל שהזנת. 
          אנא לחץ עליו כדי להפעיל את החשבון ולהתחיל לנהל את הכספים שלך ב-FamilyOffice.
        </p>

        <div className="space-y-4">
          <Link 
            href="/login" 
            className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all dark:bg-white dark:text-black"
          >
            חזרה להתחברות
          </Link>
          
          <p className="text-sm text-slate-400">
            לא קיבלת מייל? בדוק בתיקיית הספאם.
          </p>
        </div>
      </div>
    </div>
  );
}
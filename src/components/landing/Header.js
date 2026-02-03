import Link from "next/link"; // 1. ייבוא רכיב הקישור
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* לוגו: לחיצה עליו תחזיר לדף הבית */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:bg-indigo-600 transition-colors">
            F
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Family<span className="text-indigo-600">Office</span>
          </span>
        </Link>

        {/* תפריט הניווט (Nav) נשאר אותו דבר */}
        <Nav />

        {/* הכפתורים - עכשיו הם לינקים */}
        <div className="flex items-center gap-3">
            
            {/* כפתור התחברות */}
            <Link 
              href="/login" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2 transition-colors"
            >
              התחברות
            </Link>

            {/* כפתור הרשמה */}
            <Link 
              href="/register" 
              className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-200"
            >
              התחילו עכשיו
            </Link>
            
        </div>
      </div>
    </header>
  );
}
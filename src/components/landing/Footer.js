import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Mail, MapPin, Phone, ShieldCheck, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-slate-300 border-t border-slate-800 relative overflow-hidden font-sans">

      {/* אלמנט עיצובי: זוהר עדין ברקע */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 border-b border-slate-800 pb-16">

          {/* עמודה 1: המותג (גדול יותר) - span 5 */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-900/30">
                F
              </div>
              <span className="text-3xl font-bold text-white tracking-wide">
                Family<span className="text-indigo-500">Office</span>
              </span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-light">
              מערכת ההפעלה הפיננסית למשפחות.
              <br />
              משלבים טכנולוגיה מתקדמת עם עקרונות ניהול הון של המאיון העליון, נגיש לכולם.
            </p>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full flex items-center gap-2 text-sm text-emerald-400">
                <ShieldCheck size={16} /> Bank-Level Security (SOC2)
              </div>
            </div>
          </div>

          {/* עמודה 2: קישורים - span 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 text-lg">מוצר</h4>
            <ul className="space-y-5 text-sm">
              <li><a href="/features" className="hover:text-indigo-400 transition-colors">פיצ'רים</a></li>
              <li><a href="/new" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group">חדש <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">Update</span></a></li>
              <li><a href="/#pricing" className="hover:text-indigo-400 transition-colors">מחירים</a></li>
              <li><a href="/security" className="hover:text-indigo-400 transition-colors">אבטחה</a></li>
              <li><a href="/integrations" className="hover:text-indigo-400 transition-colors">אינטגרציות</a></li>
            </ul>
          </div>

          {/* עמודה 3: משאבים - span 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 text-lg">חברה</h4>
            <ul className="space-y-5 text-sm">
              <li><a href="/about" className="hover:text-indigo-400 transition-colors">אודות</a></li>
              <li><a href="/blog" className="hover:text-indigo-400 transition-colors">בלוג</a></li>
              <li><a href="/contact" className="hover:text-indigo-400 transition-colors">צור קשר</a></li>
            </ul>
          </div>

          {/* עמודה 4: ניוזלטר (Inner Circle) - span 3 */}
          <div className="lg:col-span-3">
            <div className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors group">
              <h4 className="text-white font-bold mb-2 text-lg">הצטרפו ל-Inner Circle</h4>
              <p className="text-slate-400 text-sm mb-4">טיפים שבועיים להתנהלות פיננסית חכמה.</p>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="כתובת האימייל שלך..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
                />
                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 group-hover:shadow-indigo-500/20">
                  הרשמה <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* שורה תחתונה: זכויות יוצרים וסושיאל */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 text-sm text-slate-500">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p>© 2026 Family Office Ltd.</p>
            <div className="hidden md:block w-1 h-1 bg-slate-800 rounded-full"></div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">פרטיות</a>
              <a href="#" className="hover:text-slate-300 transition-colors">תנאי שימוש</a>
              <a href="#" className="hover:text-slate-300 transition-colors">עוגיות</a>
            </div>
          </div>

          <div className="flex gap-4">
            {[<Linkedin size={20} />, <Twitter size={20} />, <Facebook size={20} />, <Instagram size={20} />].map((icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:-translate-y-1">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
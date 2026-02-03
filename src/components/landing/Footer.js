import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-slate-300 border-t border-slate-800 relative overflow-hidden font-sans">
      
      {/* אלמנט עיצובי: זוהר עדין ברקע */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* עמודה 1: המותג */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-900/50">
                F
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">
                Family<span className="text-indigo-500">Office</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              מערכת ההפעלה הפיננסית למשפחות. 
              משלבים טכנולוגיה מתקדמת עם עקרונות ניהול הון של המאיון העליון, נגיש לכולם.
            </p>
            <div className="flex gap-4 pt-2">
               {[<Linkedin size={18}/>, <Twitter size={18}/>, <Facebook size={18}/>, <Instagram size={18}/>].map((icon, i) => (
                   <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-slate-800 hover:border-indigo-500">
                      {icon}
                   </a>
               ))}
            </div>
          </div>

          {/* עמודה 2: קישורים מהירים */}
          <div>
             <h4 className="text-white font-bold mb-6 text-lg">המוצר</h4>
             <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2">פיצ'רים <span className="text-[10px] bg-indigo-900/50 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-800">חדש</span></a></li>
                <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">מחירים</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">אבטחה ופרטיות</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">אינטגרציות בנקים</a></li>
             </ul>
          </div>

          {/* עמודה 3: משאבים */}
          <div>
             <h4 className="text-white font-bold mb-6 text-lg">משאבים</h4>
             <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">בלוג פיננסי</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">מרכז עזרה</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">מחשבון ריבית דריבית</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">וובינרים</a></li>
             </ul>
          </div>

          {/* עמודה 4: צור קשר וניוזלטר */}
          <div>
              <h4 className="text-white font-bold mb-6 text-lg">יצירת קשר</h4>
              <ul className="space-y-4 text-sm mb-8">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-indigo-500 mt-0.5" />
                  <span>support@familyoffice.co.il</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-indigo-500 mt-0.5" />
                  <span>מגדלי אלון, תל אביב</span>
                </li>
              </ul>
          </div>
        </div>

        {/* שורה תחתונה: זכויות יוצרים ומשפטית */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
           <p>© 2026 Family Office Ltd. כל הזכויות שמורות.</p>
           <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">תנאי שימוש</a>
              <a href="#" className="hover:text-slate-300 transition-colors">מדיניות פרטיות</a>
              <a href="#" className="hover:text-slate-300 transition-colors">הצהרת נגישות</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
// src/app/layout.js
import { Assistant } from 'next/font/google';
import "./globals.css";

// הגדרת פונט Assistant
const assistant = Assistant({ 
  subsets: ['hebrew', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-assistant',
});

export const metadata = {
  title: "Family Office | ניהול הון משפחתי",
  description: "מערכת מתקדמת לניהול פיננסי",
};

export default function RootLayout({ children }) {
  return (
    // הוספנו lang, dir וגם את ה-attribute ש-Next.js ביקש
    <html 
      lang="he" 
      dir="rtl" 
      data-scroll-behavior="smooth" 
      className="scroll-smooth"
    >
      <body 
        className={`${assistant.variable} font-sans antialiased bg-[#F8FAFC] text-slate-900 m-0 p-0 w-full overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
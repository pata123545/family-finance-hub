"use client";

import { useState } from "react";
import Link from "next/link";
import Nav, { navLinks } from "./Nav";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* לוגו: לחיצה עליו תחזיר לדף הבית */}
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:bg-indigo-600 transition-colors">
              F
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Family<span className="text-indigo-600">Office</span>
            </span>
          </Link>

          {/* תפריט הניווט (Desktop) */}
          <Nav />

          {/* הכפתורים (Desktop + Mobile Toggle) */}
          <div className="flex items-center gap-3">

            {/* כפתורי פעולה (מוסתרים במובייל אם רוצים, או משאירים) - נשאיר אותם ב-LG ומעלה */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2 transition-colors"
              >
                התחברות
              </Link>

              <Link
                href="/register"
                className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-200"
              >
                התחילו עכשיו
              </Link>
            </div>

            {/* Hamburger Button (Mobile Only) */}
            <button
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative z-50"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[899] lg:hidden backdrop-blur-sm animate-in fade-in duration-300"
            onClick={toggleMobileMenu}
          ></div>

          {/* Side Drawer */}
          <div className="fixed inset-y-0 left-0 top-0 bottom-0 z-[900] w-[80%] max-w-sm bg-white lg:hidden p-6 overflow-y-auto animate-in slide-in-from-left duration-300 shadow-2xl">

            {/* Header within Drawer */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Family<span className="text-indigo-600">Office</span>
                </span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col space-y-6">

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-slate-100 last:border-0">
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setActiveMobileDropdown(activeMobileDropdown === link.name ? null : link.name)}
                          className="flex items-center justify-between w-full py-4 text-lg font-bold text-slate-900 group"
                        >
                          <span className="group-hover:text-indigo-600 transition-colors">{link.name}</span>
                          <ChevronDown size={18} className={`transition-transform duration-300 ${activeMobileDropdown === link.name ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
                        </button>

                        {/* Mobile Dropdown Items */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeMobileDropdown === link.name ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                          <div className="space-y-2 pl-2">
                            {link.dropdownItems.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group/item"
                              >
                                <div className="p-2 bg-white text-indigo-500 rounded-lg shadow-sm group-hover/item:text-indigo-600 group-hover/item:scale-110 transition-all">
                                  {item.icon}
                                </div>
                                <span className="text-sm font-medium text-slate-600 group-hover/item:text-indigo-700">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-4 text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-3 mt-auto pt-6">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-3.5 text-slate-700 font-bold bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                    התחברות
                  </button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors">
                    התחילו עכשיו
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}
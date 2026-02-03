import { ChevronDown } from "lucide-react";

export const navLinks = [
  { name: "מוצרים", href: "#products", hasDropdown: true },
  { name: "פתרונות", href: "#solutions", hasDropdown: true },
  { name: "מחירים", href: "#pricing", hasDropdown: false },
  { name: "אודות", href: "#about", hasDropdown: false },
];

export default function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="flex items-center text-md gap-1 px-4 py-2 text-slate-700 font-medium hover:text-indigo-400 hover:bg-indigo-50 rounded-lg transition-all"
        >
          {link.name}
          {/* מציג חץ קטן רק אם זה תפריט נפתח */}
          {link.hasDropdown && <ChevronDown size={16} className="text-slate-400" />}
        </a>
      ))}
    </nav>
  );
}
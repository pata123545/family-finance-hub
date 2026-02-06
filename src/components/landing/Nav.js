import { useState } from "react";
import Link from "next/link";
import { ChevronDown, BrainCircuit, Wallet, PieChart, Activity, Users, TrendingUp, ShieldCheck } from "lucide-react";

export const navLinks = [
  {
    name: "מוצרים",
    href: "#products",
    hasDropdown: true,
    dropdownItems: [
      { name: "סמנכ״ל כספים אישי (AI CFO)", icon: <BrainCircuit size={18} />, href: "/products/ai-cfo" },
      { name: "סנכרון נכסים אוטומטי", icon: <Wallet size={18} />, href: "/products/asset-sync" },
      { name: "ניהול תקציב חכם", icon: <PieChart size={18} />, href: "/products/smart-budget" },
      { name: "חדר מצב משפחתי", icon: <Activity size={18} />, href: "/products/family-dashboard" },
    ]
  },
  {
    name: "פתרונות",
    href: "#solutions",
    hasDropdown: true,
    dropdownItems: [
      { name: "למשפחות צעירות", icon: <Users size={18} />, href: "/solutions/young-families" },
      { name: "תכנון פרישה וגיל שלישי", icon: <ShieldCheck size={18} />, href: "/solutions/retirement" },
      { name: "Private Wealth / Family Office", icon: <TrendingUp size={18} />, href: "/solutions/family-office" },
    ]
  },
  { name: "מחירים", href: "/#pricing", hasDropdown: false }, // הוספתי / כדי שיעבוד גם מדפים פנימיים
  { name: "אודות", href: "/about", hasDropdown: false },
];

export default function Nav() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (name) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="hidden lg:flex items-center gap-6" onMouseLeave={handleMouseLeave}>
      {navLinks.map((link) => (
        <div
          key={link.name}
          className="relative group"
          onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.name)}
        >
          {/* הקישור הראשי */}
          <Link
            href={link.href}
            className={`flex items-center text-sm font-bold gap-1 px-3 py-2 rounded-lg transition-all duration-200
                ${activeDropdown === link.name ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}
              `}
          >
            {link.name}
            {link.hasDropdown && (
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`}
              />
            )}
          </Link>

          {/* Dropdown Menu */}
          {link.hasDropdown && (
            <div
              className={`absolute top-full right-0 pt-2 w-64 transform transition-all duration-200 origin-top-right z-50
                        ${activeDropdown === link.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible pointer-events-none'}
                    `}
            >
              <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-2">
                {link.dropdownItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item"
                  >
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover/item:bg-indigo-100 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover/item:text-indigo-700">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
// ============================================================
// CivicSetu v2 - Main App
// File: src/App.jsx
// ============================================================

import { useState } from "react";
import {
  Shield, LayoutDashboard, MessageSquareWarning,
  Menu, X, Globe, ChevronRight, Bell, Sun, Moon,
  MapPin, ChevronDown, Building2
} from "lucide-react";
import WelfareEngine from "./WelfareEngine";
import WardDashboard from "./WardDashboard";
import ComplaintPortal from "./ComplaintPortal";

// ── ✏️ ADD YOUR CITIES AND WARDS HERE ─────────────────────────
const CITIES = [
  {
    name: "Ludhiana",
    wards: Array.from({ length: 95 }, (_, i) => `Ward ${i + 1}`)
  },
  {
    name: "Amritsar",
    wards: Array.from({ length: 85 }, (_, i) => `Ward ${i + 1}`)
  },
  {
    name: "Jalandhar",
    wards: Array.from({ length: 80 }, (_, i) => `Ward ${i + 1}`)
  },
  {
    name: "Patiala",
    wards: Array.from({ length: 60 }, (_, i) => `Ward ${i + 1}`)
  },
  // ✏️ Add more cities here
];

// ── Notifications data ─────────────────────────────────────
// ✏️ Update these with real alerts
const NOTIFICATIONS = [
  { id: 1, text: "New scheme: PM Vishwakarma Yojana added", time: "2h ago", unread: true },
  { id: 2, text: "Ward 5 road work completed ahead of schedule", time: "5h ago", unread: true },
  { id: 3, text: "Water supply disruption fixed in Sector 7", time: "1d ago", unread: false },
];

const LANG = {
  en: {
    appName: "CivicSetu", tagline: "Bridging Citizens & Governance",
    nav: ["Welfare Engine", "Ward Dashboard", "Complaint Portal"],
    navSub: ["Find your benefits", "Ward transparency", "File a complaint"],
    footer: "Designed for India. Built for every citizen.",
    selectCity: "Select Your City",
    selectWard: "Select Your Ward",
    welcome: "Welcome to CivicSetu",
    welcomeSub: "Please select your city and ward to get personalised civic information.",
    proceed: "Continue →",
    changeWard: "Change Ward",
    notifications: "Notifications",
    noNotif: "No new notifications",
    lang: "ਪੰਜਾਬੀ",
  },
  hi: {
    appName: "सिविकसेतु", tagline: "नागरिक और शासन के बीच सेतु",
    nav: ["कल्याण इंजन", "वार्ड डैशबोर्ड", "शिकायत पोर्टल"],
    navSub: ["अपने लाभ खोजें", "वार्ड पारदर्शिता", "शिकायत दर्ज करें"],
    footer: "भारत के लिए डिज़ाइन। हर नागरिक के लिए निर्मित।",
    selectCity: "अपना शहर चुनें",
    selectWard: "अपना वार्ड चुनें",
    welcome: "सिविकसेतु में आपका स्वागत है",
    welcomeSub: "व्यक्तिगत नागरिक जानकारी के लिए अपना शहर और वार्ड चुनें।",
    proceed: "आगे बढ़ें →",
    changeWard: "वार्ड बदलें",
    notifications: "सूचनाएं",
    noNotif: "कोई नई सूचना नहीं",
    lang: "English",
  },
  pa: {
    appName: "ਸਿਵਿਕਸੇਤੂ", tagline: "ਨਾਗਰਿਕ ਅਤੇ ਸ਼ਾਸਨ ਵਿਚਕਾਰ ਪੁਲ",
    nav: ["ਭਲਾਈ ਇੰਜਣ", "ਵਾਰਡ ਡੈਸ਼ਬੋਰਡ", "ਸ਼ਿਕਾਇਤ ਪੋਰਟਲ"],
    navSub: ["ਆਪਣੇ ਲਾਭ ਲੱਭੋ", "ਵਾਰਡ ਪਾਰਦਰਸ਼ਤਾ", "ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ"],
    footer: "ਭਾਰਤ ਲਈ ਡਿਜ਼ਾਈਨ। ਹਰ ਨਾਗਰਿਕ ਲਈ ਬਣਾਇਆ।",
    selectCity: "ਆਪਣਾ ਸ਼ਹਿਰ ਚੁਣੋ",
    selectWard: "ਆਪਣਾ ਵਾਰਡ ਚੁਣੋ",
    welcome: "ਸਿਵਿਕਸੇਤੂ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    welcomeSub: "ਨਿੱਜੀ ਨਾਗਰਿਕ ਜਾਣਕਾਰੀ ਲਈ ਆਪਣਾ ਸ਼ਹਿਰ ਅਤੇ ਵਾਰਡ ਚੁਣੋ।",
    proceed: "ਅੱਗੇ ਵਧੋ →",
    changeWard: "ਵਾਰਡ ਬਦਲੋ",
    notifications: "ਸੂਚਨਾਵਾਂ",
    noNotif: "ਕੋਈ ਨਵੀਂ ਸੂਚਨਾ ਨਹੀਂ",
    lang: "हिन्दी",
  },
};

const LANG_CYCLE = { en: "hi", hi: "pa", pa: "en" };
const NAV_ICONS = [Shield, LayoutDashboard, MessageSquareWarning];

// ── Welcome / Ward Selector Screen ────────────────────────
function WardSelector({ onConfirm, lang, darkMode }) {
  const t = LANG[lang];
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const wards = CITIES.find(c => c.name === city)?.wards || [];

  const bg = darkMode ? "bg-gray-950" : "bg-orange-50";
  const card = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const text = darkMode ? "text-white" : "text-gray-900";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const select = darkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-300 text-gray-900";

  return (
    <div className={`min-h-screen ${bg} flex items-center justify-center p-6`}>
      <div className={`w-full max-w-md border rounded-2xl p-8 shadow-2xl ${card}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-lg">CS</span>
          </div>
          <div>
            <p className={`font-black text-xl ${text}`}>{t.appName}</p>
            <p className={`text-xs ${sub}`}>{t.tagline}</p>
          </div>
        </div>

        <h2 className={`text-2xl font-bold mb-2 ${text}`}>{t.welcome}</h2>
        <p className={`text-sm mb-8 ${sub}`}>{t.welcomeSub}</p>

        {/* City Select */}
        <div className="mb-4">
          <label className={`block text-xs font-semibold mb-2 ${sub} uppercase tracking-wider`}>
            <MapPin size={11} className="inline mr-1" />{t.selectCity}
          </label>
          <select
            value={city}
            onChange={e => { setCity(e.target.value); setWard(""); }}
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors ${select}`}
          >
            <option value="">-- {t.selectCity} --</option>
            {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        {/* Ward Select */}
        <div className="mb-8">
          <label className={`block text-xs font-semibold mb-2 ${sub} uppercase tracking-wider`}>
            <Building2 size={11} className="inline mr-1" />{t.selectWard}
          </label>
          <select
            value={ward}
            onChange={e => setWard(e.target.value)}
            disabled={!city}
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-40 ${select}`}
          >
            <option value="">-- {t.selectWard} --</option>
            {wards.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>

        <button
          onClick={() => city && ward && onConfirm(city, ward)}
          disabled={!city || !ward}
          className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all text-sm shadow-lg"
        >
          {t.proceed}
        </button>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState(0);
  const [lang, setLang] = useState("en");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [wardSelected, setWardSelected] = useState(false);
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  const t = LANG[lang];

  const dm = {
    app: darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900",
    sidebar: darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
    header: darkMode ? "bg-gray-900/80 border-gray-800" : "bg-white/80 border-gray-200",
    footer: darkMode ? "border-gray-800 text-gray-600" : "border-gray-200 text-gray-400",
    navActive: darkMode ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-orange-50 text-orange-600 border border-orange-200",
    navHover: darkMode ? "text-gray-400 hover:bg-gray-800 hover:text-gray-100" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
    btn: darkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-600",
    notifPanel: darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
    notifItem: darkMode ? "border-gray-800 hover:bg-gray-800" : "border-gray-100 hover:bg-gray-50",
    subText: darkMode ? "text-gray-400" : "text-gray-500",
  };

  if (!wardSelected) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl ${dm.btn} transition-all`}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setLang(LANG_CYCLE[lang])} className={`px-3 py-2 rounded-xl text-xs font-semibold ${dm.btn} transition-all`}>
            {t.lang}
          </button>
        </div>
        <WardSelector onConfirm={(c, w) => { setCity(c); setWard(w); setWardSelected(true); }} lang={lang} darkMode={darkMode} />
      </div>
    );
  }

  const pages = [
    <WelfareEngine lang={lang} darkMode={darkMode} city={city} ward={ward} />,
    <WardDashboard lang={lang} darkMode={darkMode} city={city} ward={ward} />,
    <ComplaintPortal lang={lang} darkMode={darkMode} city={city} ward={ward} />,
  ];

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${dm.app}`}
      style={{ fontFamily: "'DM Sans', 'Noto Sans Devanagari', 'Noto Sans Gurmukhi', sans-serif" }}>

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className={`flex flex-col transition-all duration-300 border-r ${dm.sidebar} ${sidebarOpen ? "w-64" : "w-16"}`}>
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-sm">CS</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-bold text-base leading-tight">{t.appName}</p>
              <p className={`text-xs leading-tight ${dm.subText}`}>{t.tagline}</p>
            </div>
          )}
        </div>

        {/* Ward Badge */}
        {sidebarOpen && (
          <div className={`mx-3 mt-3 px-3 py-2 rounded-xl ${darkMode ? "bg-orange-500/10 border border-orange-500/20" : "bg-orange-50 border border-orange-200"}`}>
            <p className="text-xs text-orange-500 font-semibold truncate">📍 {city} — {ward}</p>
            <button onClick={() => setWardSelected(false)} className={`text-xs mt-0.5 ${dm.subText} hover:text-orange-400 transition-colors`}>
              {t.changeWard}
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {t.nav.map((label, i) => {
            const Icon = NAV_ICONS[i];
            const active = activePage === i;
            return (
              <button key={i} onClick={() => setActivePage(i)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${active ? dm.navActive : dm.navHover}`}>
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && (
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold leading-tight">{label}</p>
                    <p className={`text-xs leading-tight ${dm.subText}`}>{t.navSub[i]}</p>
                  </div>
                )}
                {sidebarOpen && active && <ChevronRight size={14} className="text-orange-400" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Controls */}
        <div className="px-2 pb-4 space-y-2">
          <button onClick={() => setLang(LANG_CYCLE[lang])}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${dm.btn}`}>
            <Globe size={16} className="flex-shrink-0" />
            {sidebarOpen && <span>{t.lang}</span>}
          </button>
          <button onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${dm.btn}`}>
            {darkMode ? <Sun size={16} className="flex-shrink-0" /> : <Moon size={16} className="flex-shrink-0" />}
            {sidebarOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-full flex items-center justify-center px-3 py-2 rounded-xl transition-all ${dm.btn}`}>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm ${dm.header}`}>
          <div>
            <h1 className="text-lg font-bold">{t.nav[activePage]}</h1>
            <p className={`text-xs ${dm.subText}`}>{t.navSub[activePage]}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)}
                className={`relative p-2 rounded-xl transition-all ${dm.btn}`}>
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Panel */}
              {showNotif && (
                <div className={`absolute right-0 top-12 w-80 border rounded-2xl shadow-2xl overflow-hidden z-50 ${dm.notifPanel}`}>
                  <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <p className="font-semibold text-sm">{t.notifications}</p>
                  </div>
                  {NOTIFICATIONS.length === 0 ? (
                    <p className={`text-sm text-center py-6 ${dm.subText}`}>{t.noNotif}</p>
                  ) : (
                    NOTIFICATIONS.map(n => (
                      <div key={n.id} className={`px-4 py-3 border-b flex items-start gap-3 cursor-pointer transition-colors ${dm.notifItem}`}>
                        {n.unread && <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />}
                        {!n.unread && <div className="w-2 h-2 mt-1.5 flex-shrink-0" />}
                        <div>
                          <p className="text-xs leading-relaxed">{n.text}</p>
                          <p className={`text-xs mt-1 ${dm.subText}`}>{n.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Page dots */}
            {[0, 1, 2].map(i => (
              <button key={i} onClick={() => setActivePage(i)}
                className={`h-2 rounded-full transition-all ${activePage === i ? "bg-orange-400 w-5" : "bg-gray-500 w-2 hover:bg-gray-400"}`} />
            ))}
          </div>
        </header>

        {/* Page */}
        <div className="flex-1 overflow-y-auto" onClick={() => showNotif && setShowNotif(false)}>
          {pages[activePage]}
        </div>

        {/* Footer */}
        <footer className={`px-6 py-2 border-t text-center text-xs ${dm.footer}`}>
          {t.footer}
        </footer>
      </main>
    </div>
  );
}

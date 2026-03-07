// ============================================================
// CivicSetu v2 - Module 2: Ward Transparency Dashboard
// File: src/WardDashboard.jsx
// ============================================================

import { useState } from "react";
import {
  HardHat, BookUser, BellRing, CheckCircle2, Clock,
  Wrench, Phone, MapPin, Building2, AlertTriangle,
  Info, CloudRain, ChevronDown, ChevronUp, IndianRupee,
  CalendarCheck, RefreshCw
} from "lucide-react";

// ── ✏️ PASTE YOUR WARD'S PUBLIC WORKS DATA HERE ──────────────
const PUBLIC_WORKS = [
  { id: 1, title: "Road Resurfacing – Sector 12 Main Road", contractor: "XYZ Infra Pvt. Ltd.", budget: 4500000, spent: 2800000, department: "PWD", startDate: "Jan 2026", endDate: "Apr 2026", progress: 62, status: "ongoing", lastUpdated: "2 Mar 2026" },
  { id: 2, title: "New Sewage Pipeline – Ward 5 Extension", contractor: "ABC Civil Works", budget: 2800000, spent: 2800000, department: "Municipal Corporation", startDate: "Nov 2025", endDate: "Feb 2026", progress: 100, status: "completed", lastUpdated: "28 Feb 2026" },
  { id: 3, title: "Street Light Installation – Park Colony", contractor: "PowerGrid Local", budget: 1200000, spent: 120000, department: "Electricity Board", startDate: "Mar 2026", endDate: "May 2026", progress: 10, status: "ongoing", lastUpdated: "1 Mar 2026" },
  { id: 4, title: "Community Center Renovation", contractor: "TBD", budget: 8000000, spent: 0, department: "Urban Development", startDate: "Jun 2026", endDate: "Dec 2026", progress: 0, status: "planned", lastUpdated: "1 Jan 2026" },
];

// ── ✏️ PASTE YOUR LOCAL GOVERNANCE DIRECTORY HERE ────────────
const DIRECTORY = [
  { id: 1, role: "Ward Councillor", roleHi: "पार्षद", rolePa: "ਪਾਰਸ਼ਦ", name: "Smt. Rekha Sharma", phone: "+91 98765 43210", address: "Ward Office, Block A, Sector 5", type: "elected" },
  { id: 2, role: "MLA", roleHi: "विधायक", rolePa: "ਵਿਧਾਇਕ", name: "Sh. Rajiv Kumar", phone: "+91 98100 00001", address: "MLA Office, Civil Lines", type: "elected" },
  { id: 3, role: "Mohalla Clinic", roleHi: "मोहल्ला क्लीनिक", rolePa: "ਮੁਹੱਲਾ ਕਲੀਨਿਕ", name: "Sector 7 Aam Aadmi Clinic", phone: "+91 11-2345-6789", address: "Near Bus Stand, Sector 7", type: "health" },
  { id: 4, role: "Police Station", roleHi: "थाना", rolePa: "ਥਾਣਾ", name: "Sector 4 Police Station", phone: "100 / +91 11-2233-4455", address: "Main Road, Sector 4", type: "emergency" },
  { id: 5, role: "Waste Collection", roleHi: "कचरा संग्रहण", rolePa: "ਕਚਰਾ ਇਕੱਠਾ", name: "Municipal Waste Dept.", phone: "+91 98888 77766", address: "Dump Site, Industrial Area", type: "sanitation" },
];

// ── ✏️ PASTE YOUR AREA ALERTS HERE ───────────────────────────
const ALERTS = [
  { id: 1, type: "construction", title: "Road Block – Sector 12", titleHi: "सड़क बंद – सेक्टर 12", titlePa: "ਸੜਕ ਬੰਦ – ਸੈਕਟਰ 12", detail: "Road resurfacing work in progress. Expect delays 8AM–6PM on weekdays.", detailHi: "सड़क की मरम्मत का काम जारी है। कार्यदिवसों पर सुबह 8 से शाम 6 बजे तक देरी की उम्मीद है।", detailPa: "ਸੜਕ ਮੁਰੰਮਤ ਦਾ ਕੰਮ ਚੱਲ ਰਿਹਾ ਹੈ।", date: "Until Apr 2026" },
  { id: 2, type: "water", title: "Water Supply Disruption", titleHi: "जल आपूर्ति बाधित", titlePa: "ਪਾਣੀ ਸਪਲਾਈ ਵਿੱਘਨ", detail: "No supply in Blocks C & D on 6 March due to pipeline maintenance.", detailHi: "6 मार्च को ब्लॉक C और D में पानी की आपूर्ति बंद रहेगी।", detailPa: "6 ਮਾਰਚ ਨੂੰ ਬਲਾਕ C ਅਤੇ D ਵਿੱਚ ਪਾਣੀ ਦੀ ਸਪਲਾਈ ਨਹੀਂ ਹੋਵੇਗੀ।", date: "6 Mar 2026" },
  { id: 3, type: "weather", title: "Weather Advisory", titleHi: "मौसम चेतावनी", titlePa: "ਮੌਸਮ ਚੇਤਾਵਨੀ", detail: "Heavy rainfall expected this weekend. Avoid low-lying areas.", detailHi: "इस सप्ताहांत भारी बारिश की संभावना है।", detailPa: "ਇਸ ਵੀਕਐਂਡ ਭਾਰੀ ਬਾਰਿਸ਼ ਦੀ ਸੰਭਾਵਨਾ ਹੈ।", date: "8–9 Mar 2026" },
  { id: 4, type: "info", title: "New Bus Route 47A", titleHi: "नई बस रूट 47A", titlePa: "ਨਵੀਂ ਬੱਸ ਰੂਟ 47A", detail: "Route 47A now connects Sector 5 to the metro station directly.", detailHi: "रूट 47A अब सेक्टर 5 को मेट्रो स्टेशन से सीधे जोड़ता है।", detailPa: "ਰੂਟ 47A ਹੁਣ ਸੈਕਟਰ 5 ਨੂੰ ਮੈਟਰੋ ਸਟੇਸ਼ਨ ਨਾਲ ਸਿੱਧਾ ਜੋੜਦਾ ਹੈ।", date: "From 1 Mar 2026" },
];

const ALERT_STYLES = {
  construction: { icon: HardHat, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  water: { icon: Wrench, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
  weather: { icon: CloudRain, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/30" },
  info: { icon: Info, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
};

const DIR_TYPE_COLORS = {
  elected: "bg-orange-500/20 text-orange-400",
  health: "bg-green-500/20 text-green-400",
  emergency: "bg-red-500/20 text-red-400",
  sanitation: "bg-gray-500/20 text-gray-400",
};

const STATUS_CONFIG = {
  completed: { label: "Completed", labelHi: "पूर्ण", labelPa: "ਪੂਰਾ", color: "text-green-400", icon: CheckCircle2 },
  ongoing: { label: "Ongoing", labelHi: "जारी", labelPa: "ਜਾਰੀ", color: "text-orange-400", icon: Clock },
  planned: { label: "Planned", labelHi: "नियोजित", labelPa: "ਯੋਜਨਾਬੱਧ", color: "text-blue-400", icon: AlertTriangle },
};

const LANG = {
  en: {
    tabs: ["Public Works", "Directory", "Alerts"],
    contractor: "Contractor", budget: "Budget", dept: "Department",
    timeline: "Timeline", progress: "Progress", call: "Call",
    spent: "Spent", remaining: "Remaining", totalBudget: "Total Ward Budget",
    lastUpdated: "Updated", wardSummary: "Ward Budget Overview",
  },
  hi: {
    tabs: ["सार्वजनिक कार्य", "निर्देशिका", "अलर्ट"],
    contractor: "ठेकेदार", budget: "बजट", dept: "विभाग",
    timeline: "समयसीमा", progress: "प्रगति", call: "कॉल",
    spent: "खर्च", remaining: "शेष", totalBudget: "कुल वार्ड बजट",
    lastUpdated: "अपडेट", wardSummary: "वार्ड बजट सारांश",
  },
  pa: {
    tabs: ["ਜਨਤਕ ਕੰਮ", "ਨਿਰਦੇਸ਼ਿਕਾ", "ਅਲਰਟ"],
    contractor: "ਠੇਕੇਦਾਰ", budget: "ਬਜਟ", dept: "ਵਿਭਾਗ",
    timeline: "ਸਮਾਂਸੀਮਾ", progress: "ਪ੍ਰਗਤੀ", call: "ਕਾਲ",
    spent: "ਖਰਚ", remaining: "ਬਾਕੀ", totalBudget: "ਕੁੱਲ ਵਾਰਡ ਬਜਟ",
    lastUpdated: "ਅੱਪਡੇਟ", wardSummary: "ਵਾਰਡ ਬਜਟ ਸਾਰ",
  },
};

function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function WorkCard({ work, lang, darkMode }) {
  const [expanded, setExpanded] = useState(false);
  const t = LANG[lang];
  const sc = STATUS_CONFIG[work.status];
  const Icon = sc.icon;
  const statusLabel = lang === "hi" ? sc.labelHi : lang === "pa" ? sc.labelPa : sc.label;
  const progressColor = work.progress === 100 ? "bg-green-500" : work.progress > 50 ? "bg-orange-500" : "bg-blue-500";
  const card = darkMode ? "bg-gray-800/50 border-gray-700 hover:border-gray-600" : "bg-white border-gray-200 hover:border-gray-300";
  const spentPct = work.budget > 0 ? Math.round((work.spent / work.budget) * 100) : 0;

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${card}`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-semibold leading-snug">{work.title}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Icon size={12} className={sc.color} />
              <span className={`text-xs font-medium ${sc.color}`}>{statusLabel}</span>
              <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{work.department}</span>
              <span className={`text-xs flex items-center gap-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                <RefreshCw size={10} />{work.lastUpdated}
              </span>
            </div>
          </div>
          <button onClick={() => setExpanded(!expanded)} className={`${darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className={`flex justify-between text-xs mb-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            <span>{t.progress}</span>
            <span className="font-medium">{work.progress}%</span>
          </div>
          <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <div className={`h-full rounded-full transition-all duration-700 ${progressColor}`} style={{ width: `${work.progress}%` }} />
          </div>
        </div>

        {expanded && (
          <div className={`mt-3 pt-3 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
            <div className="grid grid-cols-2 gap-y-2 text-xs mb-3">
              <div>
                <p className={darkMode ? "text-gray-500" : "text-gray-400"}>{t.contractor}</p>
                <p>{work.contractor}</p>
              </div>
              <div>
                <p className={darkMode ? "text-gray-500" : "text-gray-400"}>{t.timeline}</p>
                <p>{work.startDate} → {work.endDate}</p>
              </div>
            </div>
            {/* Budget breakdown */}
            <div className={`rounded-xl p-3 ${darkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
              <div className="flex justify-between text-xs mb-2">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>{t.budget}: <strong>{formatINR(work.budget)}</strong></span>
                <span className="text-orange-400">{t.spent}: {formatINR(work.spent)} ({spentPct}%)</span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${spentPct}%` }} />
              </div>
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>{t.remaining}: {formatINR(work.budget - work.spent)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DirectoryCard({ entry, lang, darkMode }) {
  const t = LANG[lang];
  const role = lang === "hi" ? entry.roleHi : lang === "pa" ? entry.rolePa : entry.role;
  const card = darkMode ? "bg-gray-800/50 border-gray-700 hover:border-gray-600" : "bg-white border-gray-200 hover:border-gray-300";

  return (
    <div className={`border rounded-2xl p-4 flex items-start gap-3 transition-all ${card}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
        <Building2 size={16} className={darkMode ? "text-gray-300" : "text-gray-500"} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold">{entry.name}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${DIR_TYPE_COLORS[entry.type]}`}>{role}</span>
        </div>
        <div className={`flex items-center gap-1.5 mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <MapPin size={11} /><span className="truncate">{entry.address}</span>
        </div>
      </div>
      <a href={`tel:${entry.phone}`}
        className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all flex-shrink-0 ${darkMode ? "bg-gray-700 hover:bg-orange-500/20 hover:text-orange-400 text-gray-300" : "bg-gray-100 hover:bg-orange-50 hover:text-orange-500 text-gray-600"}`}>
        <Phone size={11} />{t.call}
      </a>
    </div>
  );
}

export default function WardDashboard({ lang, darkMode, city, ward }) {
  const t = LANG[lang];
  const [tab, setTab] = useState(0);
  const tabIcons = [HardHat, BookUser, BellRing];

  const totalBudget = PUBLIC_WORKS.reduce((s, w) => s + w.budget, 0);
  const totalSpent = PUBLIC_WORKS.reduce((s, w) => s + w.spent, 0);
  const spentPct = Math.round((totalSpent / totalBudget) * 100);

  const dm = {
    card: darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200",
    tabBar: darkMode ? "bg-gray-800/50" : "bg-gray-100",
    subText: darkMode ? "text-gray-400" : "text-gray-500",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Ward Budget Summary */}
      <div className={`border rounded-2xl p-4 mb-5 ${dm.card}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5 ${dm.subText}`}>
          <IndianRupee size={12} />{t.wardSummary} — {city}, {ward}
        </p>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <p className={`text-xs ${dm.subText}`}>{t.totalBudget}</p>
            <p className="text-base font-bold text-orange-400">{formatINR(totalBudget)}</p>
          </div>
          <div>
            <p className={`text-xs ${dm.subText}`}>{t.spent}</p>
            <p className="text-base font-bold text-green-400">{formatINR(totalSpent)}</p>
          </div>
          <div>
            <p className={`text-xs ${dm.subText}`}>{t.remaining}</p>
            <p className="text-base font-bold text-blue-400">{formatINR(totalBudget - totalSpent)}</p>
          </div>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" style={{ width: `${spentPct}%` }} />
        </div>
        <p className={`text-xs mt-1 ${dm.subText}`}>{spentPct}% of total budget utilized</p>
      </div>

      {/* Tabs */}
      <div className={`flex gap-1 mb-5 p-1 rounded-xl ${dm.tabBar}`}>
        {t.tabs.map((label, i) => {
          const Icon = tabIcons[i];
          return (
            <button key={i} onClick={() => setTab(i)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === i ? "bg-orange-500 text-white shadow" : `${dm.subText} hover:text-gray-200`}`}>
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Public Works */}
      {tab === 0 && (
        <div className="space-y-3">
          {PUBLIC_WORKS.map(w => <WorkCard key={w.id} work={w} lang={lang} darkMode={darkMode} />)}
        </div>
      )}

      {/* Directory */}
      {tab === 1 && (
        <div className="space-y-3">
          {DIRECTORY.map(e => <DirectoryCard key={e.id} entry={e} lang={lang} darkMode={darkMode} />)}
        </div>
      )}

      {/* Alerts */}
      {tab === 2 && (
        <div className="space-y-3">
          {ALERTS.map(a => {
            const cfg = ALERT_STYLES[a.type];
            const Icon = cfg.icon;
            const title = lang === "hi" ? a.titleHi : lang === "pa" ? a.titlePa : a.title;
            const detail = lang === "hi" ? a.detailHi : lang === "pa" ? a.detailPa : a.detail;
            return (
              <div key={a.id} className={`border rounded-xl p-4 flex items-start gap-3 ${cfg.bg}`}>
                <Icon size={16} className={`${cfg.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className={`text-xs mt-0.5 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{detail}</p>
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{a.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

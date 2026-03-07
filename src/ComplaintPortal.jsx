// ============================================================
// CivicSetu v2 - Module 3: Unified Complaint Portal
// File: src/ComplaintPortal.jsx
// ============================================================

import { useState } from "react";
import {
  Lightbulb, Droplets, Trash2, Construction,
  Flower2, ShieldAlert, CheckCircle2, Send,
  Upload, MapPin, AlignLeft, User, Phone,
  Copy, RefreshCw, Search, Clock, AlertCircle
} from "lucide-react";

// ── ✏️ UPDATE DEPARTMENT NAMES TO MATCH YOUR MUNICIPAL BODY ──
const CATEGORY_DEPT_MAP = {
  streetlight: { dept: "PSPCL / Electricity Board", deptHi: "बिजली बोर्ड", deptPa: "ਬਿਜਲੀ ਬੋਰਡ" },
  pothole: { dept: "PWD / Roads Dept.", deptHi: "सड़क विभाग", deptPa: "ਸੜਕ ਵਿਭਾਗ" },
  sewage: { dept: "Municipal Sanitation", deptHi: "नगरपालिका स्वच्छता", deptPa: "ਨਗਰਪਾਲਿਕਾ ਸਫ਼ਾਈ" },
  garbage: { dept: "Waste Management Cell", deptHi: "कचरा प्रबंधन", deptPa: "ਕਚਰਾ ਪ੍ਰਬੰਧਨ" },
  tree: { dept: "Horticulture Dept.", deptHi: "बागवानी विभाग", deptPa: "ਬਾਗਬਾਨੀ ਵਿਭਾਗ" },
  safety: { dept: "Local Police / Ward Office", deptHi: "पुलिस थाना", deptPa: "ਪੁਲਿਸ ਥਾਣਾ" },
};

const CATEGORIES = [
  { value: "streetlight", label: "Streetlight", labelHi: "स्ट्रीट लाइट", labelPa: "ਸਟ੍ਰੀਟ ਲਾਈਟ", icon: Lightbulb },
  { value: "pothole", label: "Pothole / Road", labelHi: "गड्ढा / सड़क", labelPa: "ਟੋਆ / ਸੜਕ", icon: Construction },
  { value: "sewage", label: "Sewage / Water", labelHi: "सीवेज / पानी", labelPa: "ਸੀਵਰੇਜ / ਪਾਣੀ", icon: Droplets },
  { value: "garbage", label: "Garbage", labelHi: "कचरा", labelPa: "ਕਚਰਾ", icon: Trash2 },
  { value: "tree", label: "Tree / Park", labelHi: "पेड़ / पार्क", labelPa: "ਰੁੱਖ / ਪਾਰਕ", icon: Flower2 },
  { value: "safety", label: "Safety Issue", labelHi: "सुरक्षा समस्या", labelPa: "ਸੁਰੱਖਿਆ ਸਮੱਸਿਆ", icon: ShieldAlert },
];

// Simulated complaint status tracker
// ✏️ Replace with real Firebase lookups
const MOCK_COMPLAINTS = {
  "CS-A1B2C3D4": { status: "resolved", dept: "PWD / Roads Dept.", date: "28 Feb 2026", category: "pothole", location: "Sector 12, Near Park" },
  "CS-X9Y8Z7W6": { status: "in-progress", dept: "PSPCL / Electricity Board", date: "1 Mar 2026", category: "streetlight", location: "Block C, Street 4" },
  "CS-P5Q4R3S2": { status: "open", dept: "Waste Management Cell", date: "3 Mar 2026", category: "garbage", location: "Market Area, Ward 5" },
};

const STATUS_STYLE = {
  open: { label: "Open", labelHi: "खुला", labelPa: "ਖੁੱਲ੍ਹਾ", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30", icon: AlertCircle },
  "in-progress": { label: "In Progress", labelHi: "प्रक्रिया में", labelPa: "ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30", icon: Clock },
  resolved: { label: "Resolved ✓", labelHi: "हल हो गया ✓", labelPa: "ਹੱਲ ਹੋ ਗਿਆ ✓", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30", icon: CheckCircle2 },
};

const LANG = {
  en: {
    heading: "File a Civic Complaint",
    sub: "Your complaint will be automatically routed to the correct department.",
    trackHeading: "Track Your Complaint",
    trackSub: "Enter your reference number to check the status.",
    trackBtn: "Track", trackPlaceholder: "e.g. CS-A1B2C3D4",
    notFound: "No complaint found with this reference number.",
    step1: "Select Issue Type", step2: "Complaint Details",
    name: "Your Name", phone: "Phone Number",
    location: "Location / Address", description: "Describe the Issue",
    descPlaceholder: "Street name, landmark, how long the issue has existed...",
    dept: "Will be sent to", submit: "Submit Complaint",
    successTitle: "Complaint Submitted!", successSub: "Forwarded to the responsible department.",
    refLabel: "Reference Number", copy: "Copy", copied: "Copied!",
    newComplaint: "File Another", uploading: "Attach Photo (optional)",
    required: "Required", namePH: "Full name", phonePH: "10-digit mobile",
    locationPH: "Street, sector, landmark...", whatsapp: "Share on WhatsApp",
    tabs: ["File Complaint", "Track Status"],
  },
  hi: {
    heading: "नागरिक शिकायत दर्ज करें",
    sub: "आपकी शिकायत स्वचालित रूप से सही विभाग को भेजी जाएगी।",
    trackHeading: "अपनी शिकायत ट्रैक करें",
    trackSub: "स्थिति जांचने के लिए संदर्भ संख्या दर्ज करें।",
    trackBtn: "ट्रैक करें", trackPlaceholder: "जैसे CS-A1B2C3D4",
    notFound: "इस संदर्भ संख्या से कोई शिकायत नहीं मिली।",
    step1: "समस्या का प्रकार", step2: "शिकायत विवरण",
    name: "आपका नाम", phone: "फ़ोन नंबर",
    location: "स्थान / पता", description: "समस्या का विवरण",
    descPlaceholder: "गली का नाम, लैंडमार्क, समस्या कितने समय से है...",
    dept: "यह भेजा जाएगा", submit: "शिकायत दर्ज करें",
    successTitle: "शिकायत दर्ज!", successSub: "जिम्मेदार विभाग को अग्रेषित।",
    refLabel: "संदर्भ संख्या", copy: "कॉपी", copied: "कॉपी हो गया!",
    newComplaint: "और शिकायत", uploading: "फ़ोटो संलग्न करें",
    required: "आवश्यक", namePH: "पूरा नाम", phonePH: "10 अंकों का मोबाइल",
    locationPH: "गली, सेक्टर, लैंडमार्क...", whatsapp: "व्हाट्सएप पर शेयर",
    tabs: ["शिकायत दर्ज", "स्थिति ट्रैक"],
  },
  pa: {
    heading: "ਨਾਗਰਿਕ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ",
    sub: "ਤੁਹਾਡੀ ਸ਼ਿਕਾਇਤ ਆਪਣੇ ਆਪ ਸਹੀ ਵਿਭਾਗ ਨੂੰ ਭੇਜੀ ਜਾਵੇਗੀ।",
    trackHeading: "ਆਪਣੀ ਸ਼ਿਕਾਇਤ ਟ੍ਰੈਕ ਕਰੋ",
    trackSub: "ਸਥਿਤੀ ਜਾਂਚਣ ਲਈ ਹਵਾਲਾ ਨੰਬਰ ਦਰਜ ਕਰੋ।",
    trackBtn: "ਟ੍ਰੈਕ", trackPlaceholder: "ਜਿਵੇਂ CS-A1B2C3D4",
    notFound: "ਇਸ ਨੰਬਰ ਨਾਲ ਕੋਈ ਸ਼ਿਕਾਇਤ ਨਹੀਂ ਮਿਲੀ।",
    step1: "ਸਮੱਸਿਆ ਦੀ ਕਿਸਮ", step2: "ਸ਼ਿਕਾਇਤ ਵੇਰਵਾ",
    name: "ਤੁਹਾਡਾ ਨਾਮ", phone: "ਫ਼ੋਨ ਨੰਬਰ",
    location: "ਸਥਾਨ / ਪਤਾ", description: "ਸਮੱਸਿਆ ਦਾ ਵੇਰਵਾ",
    descPlaceholder: "ਗਲੀ ਦਾ ਨਾਮ, ਲੈਂਡਮਾਰਕ...",
    dept: "ਇਹ ਭੇਜਿਆ ਜਾਵੇਗਾ", submit: "ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ",
    successTitle: "ਸ਼ਿਕਾਇਤ ਦਰਜ!", successSub: "ਜ਼ਿੰਮੇਵਾਰ ਵਿਭਾਗ ਨੂੰ ਭੇਜੀ ਗਈ।",
    refLabel: "ਹਵਾਲਾ ਨੰਬਰ", copy: "ਕਾਪੀ", copied: "ਕਾਪੀ ਹੋ ਗਿਆ!",
    newComplaint: "ਹੋਰ ਸ਼ਿਕਾਇਤ", uploading: "ਫ਼ੋਟੋ ਜੋੜੋ",
    required: "ਲਾਜ਼ਮੀ", namePH: "ਪੂਰਾ ਨਾਮ", phonePH: "10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ",
    locationPH: "ਗਲੀ, ਸੈਕਟਰ, ਲੈਂਡਮਾਰਕ...", whatsapp: "WhatsApp 'ਤੇ ਸ਼ੇਅਰ",
    tabs: ["ਸ਼ਿਕਾਇਤ ਦਰਜ", "ਸਥਿਤੀ ਟ੍ਰੈਕ"],
  },
};

function generateRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return "CS-" + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function ComplaintPortal({ lang, darkMode, city, ward }) {
  const t = LANG[lang];
  const [activeTab, setActiveTab] = useState(0);
  const [category, setCategory] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", location: "", description: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackRef, setTrackRef] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackNotFound, setTrackNotFound] = useState(false);

  const dept = category ? CATEGORY_DEPT_MAP[category] : null;
  const deptName = dept ? (lang === "hi" ? dept.deptHi : lang === "pa" ? dept.deptPa : dept.dept) : "";

  const dm = {
    card: darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200",
    input: darkMode ? "bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-orange-500" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-500",
    label: darkMode ? "text-gray-400" : "text-gray-500",
    tabBar: darkMode ? "bg-gray-800/50" : "bg-gray-100",
    btn: darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-600",
  };

  const validate = () => {
    const e = {};
    if (!category) e.category = true;
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = true;
    if (!form.location.trim()) e.location = true;
    if (!form.description.trim()) e.description = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    // ── ✏️ CONNECT YOUR FIREBASE BACKEND HERE ────────────────
    // import { db } from "./firebase";
    // import { collection, addDoc } from "firebase/firestore";
    // const ref = await addDoc(collection(db, "complaints"), {
    //   category, department: dept?.dept, ward, city,
    //   name: form.name, phone: form.phone,
    //   location: form.location, description: form.description,
    //   submittedAt: new Date().toISOString(), status: "open"
    // });
    // setRefNo("CS-" + ref.id.slice(-8).toUpperCase());
    // ─────────────────────────────────────────────────────────
    setTimeout(() => {
      setRefNo(generateRef());
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`My CivicSetu complaint reference: ${refNo}\nCategory: ${category}\nLocation: ${form.location}\nStatus: Open`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const handleTrack = () => {
    const result = MOCK_COMPLAINTS[trackRef.toUpperCase().trim()];
    if (result) { setTrackResult(result); setTrackNotFound(false); }
    else { setTrackResult(null); setTrackNotFound(true); }
  };

  const handleReset = () => {
    setSubmitted(false); setCategory("");
    setForm({ name: "", phone: "", location: "", description: "" });
    setErrors({}); setRefNo("");
  };

  const inputClass = `w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors ${dm.input}`;

  // ── SUCCESS STATE ─────────────────────────────────────────
  if (submitted) {
    return (
      <div className="p-6 max-w-md mx-auto flex flex-col items-center justify-center min-h-96 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mb-5">
          <CheckCircle2 size={36} className="text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{t.successTitle}</h2>
        <p className={`text-sm mb-6 ${dm.label}`}>{t.successSub}</p>

        <div className={`border rounded-xl p-4 w-full mb-4 ${dm.card}`}>
          <p className={`text-xs mb-1 ${dm.label}`}>{t.refLabel}</p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-mono font-bold text-orange-400 tracking-widest">{refNo}</p>
            <button onClick={handleCopy} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${dm.btn}`}>
              <Copy size={12} />{copied ? t.copied : t.copy}
            </button>
          </div>
        </div>

        {dept && <p className={`text-xs mb-6 ${dm.label}`}>{t.dept}: <span className="text-orange-400 font-medium">{deptName}</span></p>}

        <div className="flex gap-2 flex-wrap justify-center">
          <button onClick={handleWhatsApp}
            className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl transition-all">
            📱 {t.whatsapp}
          </button>
          <button onClick={handleReset}
            className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl transition-all ${dm.btn}`}>
            <RefreshCw size={14} />{t.newComplaint}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Tabs */}
      <div className={`flex gap-1 mb-6 p-1 rounded-xl ${dm.tabBar}`}>
        {t.tabs.map((label, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === i ? "bg-orange-500 text-white shadow" : `${dm.label} hover:text-gray-200`}`}>
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: File Complaint ──────────────────────────── */}
      {activeTab === 0 && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">{t.heading}</h2>
            <p className={`text-sm ${dm.label}`}>{t.sub} — 📍 {city}, {ward}</p>
          </div>

          {/* Category */}
          <div className="mb-5">
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${dm.label}`}>{t.step1}</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const label = lang === "hi" ? cat.labelHi : lang === "pa" ? cat.labelPa : cat.label;
                const active = category === cat.value;
                return (
                  <button key={cat.value} onClick={() => { setCategory(cat.value); setErrors({ ...errors, category: false }); }}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${active ? "bg-orange-500/20 border-orange-500/60 text-orange-400" : `${darkMode ? "bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-500" : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-400"}`}`}>
                    <Icon size={18} />
                    <span className="text-xs font-medium text-center leading-tight">{label}</span>
                  </button>
                );
              })}
            </div>
            {errors.category && <p className="text-xs text-red-400 mt-1.5">Please select an issue type</p>}
          </div>

          {/* Dept routing */}
          {dept && (
            <div className={`flex items-center gap-2 rounded-xl px-4 py-2.5 mb-5 text-sm ${darkMode ? "bg-orange-500/10 border border-orange-500/20" : "bg-orange-50 border border-orange-200"}`}>
              <Send size={14} className="text-orange-400 flex-shrink-0" />
              <span className={dm.label}>{t.dept}: <span className="text-orange-400 font-semibold">{deptName}</span></span>
            </div>
          )}

          {/* Form */}
          <div className="mb-4">
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${dm.label}`}>{t.step2}</p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs mb-1.5 ${dm.label}`}><User size={11} className="inline mr-1" />{t.name}</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t.namePH}
                    className={`${inputClass} ${errors.name ? "border-red-500" : ""}`} />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{t.required}</p>}
                </div>
                <div>
                  <label className={`block text-xs mb-1.5 ${dm.label}`}><Phone size={11} className="inline mr-1" />{t.phone}</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder={t.phonePH} maxLength={10}
                    className={`${inputClass} ${errors.phone ? "border-red-500" : ""}`} />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{t.required}</p>}
                </div>
              </div>
              <div>
                <label className={`block text-xs mb-1.5 ${dm.label}`}><MapPin size={11} className="inline mr-1" />{t.location}</label>
                <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder={t.locationPH}
                  className={`${inputClass} ${errors.location ? "border-red-500" : ""}`} />
                {errors.location && <p className="text-xs text-red-400 mt-1">{t.required}</p>}
              </div>
              <div>
                <label className={`block text-xs mb-1.5 ${dm.label}`}><AlignLeft size={11} className="inline mr-1" />{t.description}</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder={t.descPlaceholder} rows={4}
                  className={`${inputClass} resize-none ${errors.description ? "border-red-500" : ""}`} />
                {errors.description && <p className="text-xs text-red-400 mt-1">{t.required}</p>}
              </div>
              {/* ✏️ Wire up photo upload to Firebase Storage */}
              <label className={`flex items-center gap-2 w-fit cursor-pointer px-4 py-2.5 rounded-xl text-sm transition-all ${dm.btn}`}>
                <Upload size={14} />{t.uploading}
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={loading}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
            {loading ? <><RefreshCw size={15} className="animate-spin" />Submitting...</> : <><Send size={15} />{t.submit}</>}
          </button>
        </>
      )}

      {/* ── TAB 2: Track Complaint ─────────────────────────── */}
      {activeTab === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-1">{t.trackHeading}</h2>
          <p className={`text-sm mb-6 ${dm.label}`}>{t.trackSub}</p>

          <div className="flex gap-2 mb-6">
            <input value={trackRef} onChange={e => setTrackRef(e.target.value)}
              placeholder={t.trackPlaceholder}
              className={`flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${dm.input}`} />
            <button onClick={handleTrack}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm">
              <Search size={15} />{t.trackBtn}
            </button>
          </div>

          {trackNotFound && (
            <div className={`border rounded-xl p-4 text-sm text-center ${darkMode ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-red-50 border-red-200 text-red-500"}`}>
              {t.notFound}
            </div>
          )}

          {trackResult && (() => {
            const sc = STATUS_STYLE[trackResult.status];
            const Icon = sc.icon;
            const statusLabel = lang === "hi" ? sc.labelHi : lang === "pa" ? sc.labelPa : sc.label;
            return (
              <div className={`border rounded-2xl p-5 ${dm.card}`}>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border mb-4 w-fit ${sc.bg}`}>
                  <Icon size={15} className={sc.color} />
                  <span className={`text-sm font-bold ${sc.color}`}>{statusLabel}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className={`text-xs ${dm.label}`}>Reference</p>
                    <p className="font-mono font-bold text-orange-400">{trackRef.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${dm.label}`}>Filed On</p>
                    <p className="font-medium">{trackResult.date}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${dm.label}`}>Category</p>
                    <p className="font-medium capitalize">{trackResult.category}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${dm.label}`}>Department</p>
                    <p className="font-medium">{trackResult.dept}</p>
                  </div>
                  <div className="col-span-2">
                    <p className={`text-xs ${dm.label}`}>Location</p>
                    <p className="font-medium">{trackResult.location}</p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Demo hint */}
          <div className={`mt-6 border rounded-xl p-4 text-xs ${darkMode ? "bg-gray-800/30 border-gray-700 text-gray-500" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
            <p className="font-semibold mb-1">Demo reference numbers to try:</p>
            <p>CS-A1B2C3D4 (Resolved) · CS-X9Y8Z7W6 (In Progress) · CS-P5Q4R3S2 (Open)</p>
          </div>
        </div>
      )}
    </div>
  );
}

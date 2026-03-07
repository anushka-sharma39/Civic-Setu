// ============================================================
// CivicSetu v2 - Module 1: Welfare Intelligence Engine
// File: src/WelfareEngine.jsx
// ============================================================

import { useState } from "react";
import {
  Search, User, IndianRupee, Briefcase, Star,
  ChevronDown, ChevronUp, ExternalLink, Mic,
  Bookmark, BookmarkCheck, Filter, X, Printer,
  Calendar, Tag
} from "lucide-react";

// ── ✏️ PASTE YOUR SCHEMES DATA HERE ───────────────────────────
// Add as many schemes as you want by copying the pattern below
const SCHEMES_DATA = [
  {
    id: 1, name: "PM Kisan Samman Nidhi", nameHi: "पीएम किसान सम्मान निधि", namePa: "ਪੀਐਮ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ",
    category: "Agriculture",
    description: "₹6,000/year direct income support to small & marginal farmers in 3 installments of ₹2,000 each.",
    descriptionHi: "छोटे और सीमांत किसानों को 3 किश्तों में ₹6,000/वर्ष की प्रत्यक्ष आय सहायता।",
    descriptionPa: "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਨੂੰ 3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ ₹6,000/ਸਾਲ ਦੀ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ।",
    minAge: 18, maxAge: 80, maxIncome: 200000,
    occupations: ["farmer"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹6,000 / year", deadline: "Ongoing",
    link: "https://pmkisan.gov.in",
  },
  {
    id: 2, name: "Ayushman Bharat – PM-JAY", nameHi: "आयुष्मान भारत – पीएम-जेएवाई", namePa: "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ",
    category: "Health",
    description: "Health cover of ₹5 lakh per family per year for secondary and tertiary hospitalization.",
    descriptionHi: "प्रति परिवार ₹5 लाख प्रति वर्ष का स्वास्थ्य कवर।",
    descriptionPa: "ਪ੍ਰਤੀ ਪਰਿਵਾਰ ₹5 ਲੱਖ ਪ੍ਰਤੀ ਸਾਲ ਦਾ ਸਿਹਤ ਕਵਰ।",
    minAge: 0, maxAge: 100, maxIncome: 300000,
    occupations: ["any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹5 lakh health cover", deadline: "Ongoing",
    link: "https://pmjay.gov.in",
  },
  {
    id: 3, name: "PM Awas Yojana (Urban)", nameHi: "प्रधानमंत्री आवास योजना (शहरी)", namePa: "ਪੀਐਮ ਆਵਾਸ ਯੋਜਨਾ (ਸ਼ਹਿਰੀ)",
    category: "Housing",
    description: "Subsidy on home loans for first-time buyers from EWS/LIG/MIG categories.",
    descriptionHi: "पहली बार खरीदारों के लिए होम लोन पर सब्सिडी।",
    descriptionPa: "ਪਹਿਲੀ ਵਾਰ ਖਰੀਦਦਾਰਾਂ ਲਈ ਹੋਮ ਲੋਨ 'ਤੇ ਸਬਸਿਡੀ।",
    minAge: 21, maxAge: 60, maxIncome: 600000,
    occupations: ["any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "Up to ₹2.67 lakh subsidy", deadline: "31 Dec 2026",
    link: "https://pmaymis.gov.in",
  },
  {
    id: 4, name: "National Scholarship – Post Matric", nameHi: "राष्ट्रीय छात्रवृत्ति – पोस्ट मेट्रिक", namePa: "ਰਾਸ਼ਟਰੀ ਵਜ਼ੀਫ਼ਾ – ਪੋਸਟ ਮੈਟ੍ਰਿਕ",
    category: "Education",
    description: "Scholarships for SC/ST/OBC/Minority students pursuing higher education.",
    descriptionHi: "उच्च शिक्षा प्राप्त कर रहे SC/ST/OBC/अल्पसंख्यक छात्रों के लिए छात्रवृत्ति।",
    descriptionPa: "ਉੱਚ ਸਿੱਖਿਆ ਲਈ SC/ST/OBC/ਘੱਟ ਗਿਣਤੀ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਵਜ਼ੀਫ਼ਾ।",
    minAge: 15, maxAge: 30, maxIncome: 250000,
    occupations: ["student"], gender: ["male", "female", "other"],
    castes: ["obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹10,000–₹25,000 / year", deadline: "31 Oct 2026",
    link: "https://scholarships.gov.in",
  },
  {
    id: 5, name: "PM Mudra Yojana", nameHi: "पीएम मुद्रा योजना", namePa: "ਪੀਐਮ ਮੁਦਰਾ ਯੋਜਨਾ",
    category: "Business",
    description: "Collateral-free loans up to ₹10 lakh for micro-entrepreneurs and small businesses.",
    descriptionHi: "सूक्ष्म उद्यमियों के लिए ₹10 लाख तक के बिना जमानत के ऋण।",
    descriptionPa: "ਸੂਖਮ ਉੱਦਮੀਆਂ ਲਈ ₹10 ਲੱਖ ਤੱਕ ਦੇ ਬਿਨਾਂ ਜ਼ਮਾਨਤ ਕਰਜ਼ੇ।",
    minAge: 18, maxAge: 65, maxIncome: 1000000,
    occupations: ["self-employed", "business"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "Loan up to ₹10 lakh", deadline: "Ongoing",
    link: "https://mudra.org.in",
  },
  {
    id: 6, name: "Atal Pension Yojana", nameHi: "अटल पेंशन योजना", namePa: "ਅਟਲ ਪੈਨਸ਼ਨ ਯੋਜਨਾ",
    category: "Social Security",
    description: "Guaranteed monthly pension of ₹1,000–₹5,000 for unorganised sector workers after age 60.",
    descriptionHi: "60 वर्ष के बाद असंगठित क्षेत्र के कामगारों के लिए गारंटीशुदा मासिक पेंशन।",
    descriptionPa: "60 ਸਾਲ ਬਾਅਦ ਅਸੰਗਠਿਤ ਖੇਤਰ ਦੇ ਕਾਮਿਆਂ ਲਈ ਗਾਰੰਟੀਸ਼ੁਦਾ ਮਾਸਿਕ ਪੈਨਸ਼ਨ।",
    minAge: 18, maxAge: 40, maxIncome: 500000,
    occupations: ["any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹1,000–₹5,000 / month pension", deadline: "Ongoing",
    link: "https://npscra.nsdl.co.in",
  },
  {
    id: 7, name: "Sukanya Samriddhi Yojana", nameHi: "सुकन्या समृद्धि योजना", namePa: "ਸੁਕੰਨਿਆ ਸਮ੍ਰਿੱਧੀ ਯੋਜਨਾ",
    category: "Education",
    description: "High-interest savings scheme for girl child education and marriage expenses.",
    descriptionHi: "बालिका की शिक्षा और विवाह के लिए उच्च ब्याज बचत योजना।",
    descriptionPa: "ਕੁੜੀਆਂ ਦੀ ਸਿੱਖਿਆ ਅਤੇ ਵਿਆਹ ਲਈ ਉੱਚ ਵਿਆਜ ਬੱਚਤ ਯੋਜਨਾ।",
    minAge: 0, maxAge: 10, maxIncome: 1000000,
    occupations: ["any"], gender: ["female"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "8.2% interest rate", deadline: "Ongoing",
    link: "https://www.indiapost.gov.in",
  },
  {
    id: 8, name: "PM Vishwakarma Yojana", nameHi: "पीएम विश्वकर्मा योजना", namePa: "ਪੀਐਮ ਵਿਸ਼ਵਕਰਮਾ ਯੋਜਨਾ",
    category: "Business",
    description: "Support for traditional artisans and craftspeople — free training, toolkit, and loans up to ₹3 lakh.",
    descriptionHi: "पारंपरिक कारीगरों के लिए मुफ्त प्रशिक्षण, टूलकिट और ₹3 लाख तक का ऋण।",
    descriptionPa: "ਰਵਾਇਤੀ ਕਾਰੀਗਰਾਂ ਲਈ ਮੁਫ਼ਤ ਸਿਖਲਾਈ, ਟੂਲਕਿੱਟ ਅਤੇ ₹3 ਲੱਖ ਤੱਕ ਕਰਜ਼ਾ।",
    minAge: 18, maxAge: 60, maxIncome: 500000,
    occupations: ["self-employed", "labour"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹15,000 toolkit + ₹3L loan", deadline: "Ongoing",
    link: "https://pmvishwakarma.gov.in",
  },
  {
    id: 9, name: "NREGA / MGNREGS", nameHi: "मनरेगा", namePa: "ਮਨਰੇਗਾ",
    category: "Employment",
    description: "Guaranteed 100 days of wage employment per year to rural households.",
    descriptionHi: "ग्रामीण परिवारों को प्रति वर्ष 100 दिनों की मजदूरी रोजगार की गारंटी।",
    descriptionPa: "ਪੇਂਡੂ ਪਰਿਵਾਰਾਂ ਨੂੰ ਪ੍ਰਤੀ ਸਾਲ 100 ਦਿਨਾਂ ਦੀ ਮਜ਼ਦੂਰੀ ਰੁਜ਼ਗਾਰ ਦੀ ਗਾਰੰਟੀ।",
    minAge: 18, maxAge: 65, maxIncome: 300000,
    occupations: ["labour", "any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "100 days guaranteed work", deadline: "Ongoing",
    link: "https://nrega.nic.in",
  },
  {
    id: 10, name: "PM Ujjwala Yojana", nameHi: "पीएम उज्ज्वला योजना", namePa: "ਪੀਐਮ ਉੱਜਵਲਾ ਯੋਜਨਾ",
    category: "Social Security",
    description: "Free LPG connection to women from BPL households.",
    descriptionHi: "बीपीएल परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन।",
    descriptionPa: "ਬੀਪੀਐਲ ਪਰਿਵਾਰਾਂ ਦੀਆਂ ਔਰਤਾਂ ਨੂੰ ਮੁਫ਼ਤ ਐਲਪੀਜੀ ਕਨੈਕਸ਼ਨ।",
    minAge: 18, maxAge: 60, maxIncome: 200000,
    occupations: ["any"], gender: ["female"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: true, disabilityBonus: false,
    benefit: "Free LPG connection + cylinder", deadline: "Ongoing",
    link: "https://pmuy.gov.in",
  },
  {
    id: 11, name: "Beti Bachao Beti Padhao", nameHi: "बेटी बचाओ बेटी पढ़ाओ", namePa: "ਬੇਟੀ ਬਚਾਓ ਬੇਟੀ ਪੜ੍ਹਾਓ",
    category: "Education",
    description: "Financial support and incentives for education of girl children.",
    descriptionHi: "बालिकाओं की शिक्षा के लिए वित्तीय सहायता।",
    descriptionPa: "ਕੁੜੀਆਂ ਦੀ ਸਿੱਖਿਆ ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ।",
    minAge: 0, maxAge: 18, maxIncome: 300000,
    occupations: ["any"], gender: ["female"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "Education incentives", deadline: "Ongoing",
    link: "https://wcd.nic.in",
  },
  {
    id: 12, name: "SC/ST Scholarship – Pre Matric", nameHi: "SC/ST छात्रवृत्ति – प्री मैट्रिक", namePa: "SC/ST ਵਜ਼ੀਫ਼ਾ – ਪ੍ਰੀ ਮੈਟ੍ਰਿਕ",
    category: "Education",
    description: "Scholarships for SC/ST students studying in classes 9 and 10.",
    descriptionHi: "कक्षा 9 और 10 में पढ़ने वाले SC/ST छात्रों के लिए छात्रवृत्ति।",
    descriptionPa: "ਕਲਾਸ 9 ਅਤੇ 10 ਵਿੱਚ ਪੜ੍ਹਨ ਵਾਲੇ SC/ST ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਵਜ਼ੀਫ਼ਾ।",
    minAge: 14, maxAge: 18, maxIncome: 200000,
    occupations: ["student"], gender: ["male", "female", "other"],
    castes: ["sc", "st"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹3,500 – ₹7,000 / year", deadline: "30 Nov 2026",
    link: "https://scholarships.gov.in",
  },
  {
    id: 13, name: "PMEGP – Self Employment", nameHi: "पीएमईजीपी", namePa: "ਪੀਐਮਈਜੀਪੀ",
    category: "Business",
    description: "Subsidy up to 35% on project cost for setting up micro enterprises in manufacturing or service sector.",
    descriptionHi: "विनिर्माण या सेवा क्षेत्र में सूक्ष्म उद्यम स्थापित करने के लिए परियोजना लागत पर 35% तक सब्सिडी।",
    descriptionPa: "ਨਿਰਮਾਣ ਜਾਂ ਸੇਵਾ ਖੇਤਰ ਵਿੱਚ ਸੂਖਮ ਉੱਦਮ ਸਥਾਪਤ ਕਰਨ ਲਈ 35% ਸਬਸਿਡੀ।",
    minAge: 18, maxAge: 45, maxIncome: 500000,
    occupations: ["self-employed", "business", "any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "Up to 35% project subsidy", deadline: "Ongoing",
    link: "https://kviconline.gov.in",
  },
  {
    id: 14, name: "Disability Pension Scheme", nameHi: "विकलांग पेंशन योजना", namePa: "ਅਪੰਗਤਾ ਪੈਨਸ਼ਨ ਯੋਜਨਾ",
    category: "Social Security",
    description: "Monthly pension for persons with 40% or more disability.",
    descriptionHi: "40% या अधिक विकलांगता वाले व्यक्तियों के लिए मासिक पेंशन।",
    descriptionPa: "40% ਜਾਂ ਵੱਧ ਅਪੰਗਤਾ ਵਾਲੇ ਵਿਅਕਤੀਆਂ ਲਈ ਮਾਸਿਕ ਪੈਨਸ਼ਨ।",
    minAge: 18, maxAge: 79, maxIncome: 200000,
    occupations: ["any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: true,
    benefit: "₹500 – ₹1,500 / month", deadline: "Ongoing",
    link: "https://socialjustice.gov.in",
  },
  {
    id: 15, name: "Stand Up India", nameHi: "स्टैंड अप इंडिया", namePa: "ਸਟੈਂਡ ਅੱਪ ਇੰਡੀਆ",
    category: "Business",
    description: "Bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs.",
    descriptionHi: "SC/ST और महिला उद्यमियों के लिए ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण।",
    descriptionPa: "SC/ST ਅਤੇ ਔਰਤ ਉੱਦਮੀਆਂ ਲਈ ₹10 ਲੱਖ ਤੋਂ ₹1 ਕਰੋੜ ਤੱਕ ਬੈਂਕ ਕਰਜ਼ਾ।",
    minAge: 18, maxAge: 65, maxIncome: 2000000,
    occupations: ["business", "self-employed"], gender: ["female", "male", "other"],
    castes: ["sc", "st"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹10L – ₹1Cr loan", deadline: "Ongoing",
    link: "https://standupmitra.in",
  },
  {
    id: 16, name: "Widow Pension Scheme", nameHi: "विधवा पेंशन योजना", namePa: "ਵਿਧਵਾ ਪੈਨਸ਼ਨ ਯੋਜਨਾ",
    category: "Social Security",
    description: "Monthly pension support for widows from economically weaker sections.",
    descriptionHi: "आर्थिक रूप से कमजोर वर्ग की विधवाओं के लिए मासिक पेंशन।",
    descriptionPa: "ਆਰਥਿਕ ਤੌਰ 'ਤੇ ਕਮਜ਼ੋਰ ਵਿਧਵਾਵਾਂ ਲਈ ਮਾਸਿਕ ਪੈਨਸ਼ਨ।",
    minAge: 18, maxAge: 79, maxIncome: 200000,
    occupations: ["any"], gender: ["female"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹500 – ₹1,500 / month", deadline: "Ongoing",
    link: "https://nsap.nic.in",
  },
  {
    id: 17, name: "OBC Pre-Matric Scholarship", nameHi: "OBC प्री-मैट्रिक छात्रवृत्ति", namePa: "OBC ਪ੍ਰੀ-ਮੈਟ੍ਰਿਕ ਵਜ਼ੀਫ਼ਾ",
    category: "Education",
    description: "Scholarship for OBC students in classes 1–10 to support their education.",
    descriptionHi: "OBC छात्रों के लिए कक्षा 1–10 में शिक्षा हेतु छात्रवृत्ति।",
    descriptionPa: "OBC ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਕਲਾਸ 1–10 ਵਿੱਚ ਵਜ਼ੀਫ਼ਾ।",
    minAge: 6, maxAge: 16, maxIncome: 100000,
    occupations: ["student"], gender: ["male", "female", "other"],
    castes: ["obc"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹500 – ₹1,000 / month", deadline: "31 Oct 2026",
    link: "https://scholarships.gov.in",
  },
  {
    id: 18, name: "PM SVANidhi – Street Vendor Loan", nameHi: "पीएम स्वनिधि", namePa: "ਪੀਐਮ ਸਵਾਨਿਧੀ",
    category: "Business",
    description: "Working capital loans for street vendors — starting ₹10,000 up to ₹50,000.",
    descriptionHi: "रेहड़ी-पटरी वालों के लिए ₹10,000 से ₹50,000 तक का कार्यशील पूंजी ऋण।",
    descriptionPa: "ਰੇਹੜੀ-ਫੜੀ ਵਾਲਿਆਂ ਲਈ ₹10,000 ਤੋਂ ₹50,000 ਤੱਕ ਕਰਜ਼ਾ।",
    minAge: 18, maxAge: 65, maxIncome: 300000,
    occupations: ["self-employed", "labour"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹10,000 – ₹50,000 loan", deadline: "Ongoing",
    link: "https://pmsvanidhi.mohua.gov.in",
  },
  {
    id: 19, name: "Free Ration – PMGKAY", nameHi: "मुफ्त राशन – पीएमजीकेएवाई", namePa: "ਮੁਫ਼ਤ ਰਾਸ਼ਨ – ਪੀਐਮਜੀਕੇਏਵਾਈ",
    category: "Food Security",
    description: "5 kg free food grain per person per month under National Food Security Act.",
    descriptionHi: "राष्ट्रीय खाद्य सुरक्षा अधिनियम के तहत प्रति व्यक्ति प्रति माह 5 किलो मुफ्त अनाज।",
    descriptionPa: "ਰਾਸ਼ਟਰੀ ਖੁਰਾਕ ਸੁਰੱਖਿਆ ਐਕਟ ਅਧੀਨ ਪ੍ਰਤੀ ਵਿਅਕਤੀ ਪ੍ਰਤੀ ਮਹੀਨਾ 5 ਕਿਲੋ ਮੁਫ਼ਤ ਅਨਾਜ।",
    minAge: 0, maxAge: 100, maxIncome: 200000,
    occupations: ["any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: true, disabilityBonus: false,
    benefit: "5 kg free grain/month", deadline: "Ongoing",
    link: "https://dfpd.gov.in",
  },
  {
    id: 20, name: "Kisan Credit Card", nameHi: "किसान क्रेडिट कार्ड", namePa: "ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ",
    category: "Agriculture",
    description: "Flexible credit for farmers at 4% interest for crop cultivation, post-harvest, and allied activities.",
    descriptionHi: "फसल उत्पादन के लिए 4% ब्याज पर किसानों के लिए लचीला क्रेडिट।",
    descriptionPa: "ਫਸਲ ਉਤਪਾਦਨ ਲਈ 4% ਵਿਆਜ 'ਤੇ ਕਿਸਾਨਾਂ ਲਈ ਲਚਕਦਾਰ ਕ੍ਰੈਡਿਟ।",
    minAge: 18, maxAge: 75, maxIncome: 500000,
    occupations: ["farmer"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "Credit at 4% interest", deadline: "Ongoing",
    link: "https://pmkisan.gov.in",
  },
  {
    id: 21, name: "Minority Scholarship – Merit cum Means", nameHi: "अल्पसंख्यक छात्रवृत्ति", namePa: "ਘੱਟ ਗਿਣਤੀ ਵਜ਼ੀਫ਼ਾ",
    category: "Education",
    description: "Scholarship for minority community students pursuing professional and technical courses.",
    descriptionHi: "व्यावसायिक और तकनीकी पाठ्यक्रम कर रहे अल्पसंख्यक छात्रों के लिए छात्रवृत्ति।",
    descriptionPa: "ਘੱਟ ਗਿਣਤੀ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਪੇਸ਼ੇਵਰ ਅਤੇ ਤਕਨੀਕੀ ਕੋਰਸਾਂ ਲਈ ਵਜ਼ੀਫ਼ਾ।",
    minAge: 16, maxAge: 30, maxIncome: 250000,
    occupations: ["student"], gender: ["male", "female", "other"],
    castes: ["minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹20,000 – ₹30,000 / year", deadline: "31 Oct 2026",
    link: "https://minorityaffairs.gov.in",
  },
  {
    id: 22, name: "Pradhan Mantri Jeevan Jyoti Bima", nameHi: "प्रधानमंत्री जीवन ज्योति बीमा", namePa: "ਪੀਐਮ ਜੀਵਨ ਜੋਤੀ ਬੀਮਾ",
    category: "Social Security",
    description: "Life insurance cover of ₹2 lakh at just ₹436/year premium.",
    descriptionHi: "मात्र ₹436/वर्ष के प्रीमियम पर ₹2 लाख का जीवन बीमा।",
    descriptionPa: "ਸਿਰਫ਼ ₹436/ਸਾਲ ਦੇ ਪ੍ਰੀਮੀਅਮ 'ਤੇ ₹2 ਲੱਖ ਦਾ ਜੀਵਨ ਬੀਮਾ।",
    minAge: 18, maxAge: 50, maxIncome: 1000000,
    occupations: ["any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹2 lakh life cover @ ₹436/yr", deadline: "31 May 2026",
    link: "https://jansuraksha.gov.in",
  },
  {
    id: 23, name: "Punjab Ashirwad Scheme", nameHi: "पंजाब आशीर्वाद योजना", namePa: "ਪੰਜਾਬ ਅਸ਼ੀਰਵਾਦ ਸਕੀਮ",
    category: "Social Security",
    description: "One-time financial assistance of ₹51,000 for marriage of daughters from SC/BPL families in Punjab.",
    descriptionHi: "पंजाब में SC/BPL परिवारों की बेटियों के विवाह पर ₹51,000 की एकमुश्त सहायता।",
    descriptionPa: "ਪੰਜਾਬ ਵਿੱਚ SC/BPL ਪਰਿਵਾਰਾਂ ਦੀਆਂ ਧੀਆਂ ਦੇ ਵਿਆਹ 'ਤੇ ₹51,000 ਦੀ ਇੱਕਮੁਸ਼ਤ ਸਹਾਇਤਾ।",
    minAge: 18, maxAge: 45, maxIncome: 200000,
    occupations: ["any"], gender: ["female"],
    castes: ["sc", "st"],
    bplOnly: true, disabilityBonus: false,
    benefit: "₹51,000 one time", deadline: "Ongoing",
    link: "https://punjab.gov.in",
  },
  {
    id: 24, name: "Punjab Ghar Ghar Rozgar", nameHi: "पंजाब घर घर रोजगार", namePa: "ਪੰਜਾਬ ਘਰ ਘਰ ਰੋਜ਼ਗਾਰ",
    category: "Employment",
    description: "Free skill training and job placement support for unemployed youth in Punjab.",
    descriptionHi: "पंजाब में बेरोजगार युवाओं के लिए मुफ्त कौशल प्रशिक्षण और नौकरी प्लेसमेंट।",
    descriptionPa: "ਪੰਜਾਬ ਵਿੱਚ ਬੇਰੋਜ਼ਗਾਰ ਨੌਜਵਾਨਾਂ ਲਈ ਮੁਫ਼ਤ ਹੁਨਰ ਸਿਖਲਾਈ ਅਤੇ ਨੌਕਰੀ ਪਲੇਸਮੈਂਟ।",
    minAge: 18, maxAge: 35, maxIncome: 500000,
    occupations: ["any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "Free training + placement", deadline: "Ongoing",
    link: "https://pgrkam.com",
  },
  {
    id: 25, name: "PM Suraksha Bima Yojana", nameHi: "प्रधानमंत्री सुरक्षा बीमा योजना", namePa: "ਪੀਐਮ ਸੁਰੱਖਿਆ ਬੀਮਾ ਯੋਜਨਾ",
    category: "Social Security",
    description: "Accidental death and disability cover of ₹2 lakh at just ₹20/year.",
    descriptionHi: "मात्र ₹20/वर्ष पर ₹2 लाख का दुर्घटना मृत्यु और विकलांगता बीमा।",
    descriptionPa: "ਸਿਰਫ਼ ₹20/ਸਾਲ 'ਤੇ ₹2 ਲੱਖ ਦਾ ਦੁਰਘਟਨਾ ਮੌਤ ਅਤੇ ਅਪੰਗਤਾ ਬੀਮਾ।",
    minAge: 18, maxAge: 70, maxIncome: 1000000,
    occupations: ["any"], gender: ["male", "female", "other"],
    castes: ["general", "obc", "sc", "st", "minority"],
    bplOnly: false, disabilityBonus: false,
    benefit: "₹2 lakh cover @ ₹20/year", deadline: "31 May 2026",
    link: "https://jansuraksha.gov.in",
  },
];

const OCCUPATION_OPTIONS = ["any", "farmer", "student", "self-employed", "business", "government", "labour"];
const GENDER_OPTIONS = ["any", "male", "female", "other"];
const CASTE_OPTIONS = ["any", "general", "obc", "sc", "st", "minority"];

const CATEGORY_COLORS = {
  Agriculture: "bg-green-500/20 text-green-400 border-green-500/30",
  Health: "bg-red-500/20 text-red-400 border-red-500/30",
  Housing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Education: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Business: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Social Security": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  Employment: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Food Security": "bg-lime-500/20 text-lime-400 border-lime-500/30",
};

const LANG = {
  en: {
    heading: "Find Schemes You Qualify For",
    sub: "Filter by your profile to see all matching government welfare schemes.",
    age: "Age", income: "Annual Income (₹)", occupation: "Occupation",
    gender: "Gender", caste: "Caste Category", bpl: "BPL Card Holder",
    disability: "Person with Disability",
    search: "Find My Benefits", reset: "Reset",
    results: "Matching Schemes", noResults: "No schemes found. Try adjusting filters.",
    benefit: "Benefit", apply: "Apply", deadline: "Deadline",
    bookmarked: "Saved Schemes", showBookmarks: "Show Saved",
    allResults: "All Results", printResults: "Print",
    yes: "Yes", no: "No", any: "Any",
    filterTitle: "Filters",
  },
  hi: {
    heading: "अपनी पात्र योजनाएं खोजें",
    sub: "सभी मिलान सरकारी योजनाएं देखने के लिए अपनी प्रोफ़ाइल फ़िल्टर करें।",
    age: "आयु", income: "वार्षिक आय (₹)", occupation: "पेशा",
    gender: "लिंग", caste: "जाति श्रेणी", bpl: "बीपीएल कार्डधारक",
    disability: "दिव्यांग व्यक्ति",
    search: "मेरे लाभ खोजें", reset: "रीसेट",
    results: "मिलान योजनाएं", noResults: "कोई योजना नहीं मिली। फ़िल्टर बदलें।",
    benefit: "लाभ", apply: "आवेदन करें", deadline: "अंतिम तिथि",
    bookmarked: "सहेजी योजनाएं", showBookmarks: "सहेजी दिखाएं",
    allResults: "सभी परिणाम", printResults: "प्रिंट",
    yes: "हाँ", no: "नहीं", any: "कोई भी",
    filterTitle: "फ़िल्टर",
  },
  pa: {
    heading: "ਆਪਣੀਆਂ ਯੋਗ ਯੋਜਨਾਵਾਂ ਲੱਭੋ",
    sub: "ਸਾਰੀਆਂ ਮੇਲ ਖਾਂਦੀਆਂ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਦੇਖਣ ਲਈ ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਫਿਲਟਰ ਕਰੋ।",
    age: "ਉਮਰ", income: "ਸਾਲਾਨਾ ਆਮਦਨ (₹)", occupation: "ਪੇਸ਼ਾ",
    gender: "ਲਿੰਗ", caste: "ਜਾਤੀ ਸ਼੍ਰੇਣੀ", bpl: "ਬੀਪੀਐਲ ਕਾਰਡਧਾਰਕ",
    disability: "ਅਪੰਗ ਵਿਅਕਤੀ",
    search: "ਮੇਰੇ ਲਾਭ ਲੱਭੋ", reset: "ਰੀਸੈਟ",
    results: "ਮੇਲ ਖਾਂਦੀਆਂ ਯੋਜਨਾਵਾਂ", noResults: "ਕੋਈ ਯੋਜਨਾ ਨਹੀਂ ਮਿਲੀ। ਫਿਲਟਰ ਬਦਲੋ।",
    benefit: "ਲਾਭ", apply: "ਅਰਜ਼ੀ ਦਿਓ", deadline: "ਅੰਤਿਮ ਮਿਤੀ",
    bookmarked: "ਸੁਰੱਖਿਅਤ ਯੋਜਨਾਵਾਂ", showBookmarks: "ਸੁਰੱਖਿਅਤ ਦਿਖਾਓ",
    allResults: "ਸਾਰੇ ਨਤੀਜੇ", printResults: "ਪ੍ਰਿੰਟ",
    yes: "ਹਾਂ", no: "ਨਹੀਂ", any: "ਕੋਈ ਵੀ",
    filterTitle: "ਫਿਲਟਰ",
  },
};

function SchemeCard({ scheme, lang, darkMode, bookmarks, toggleBookmark }) {
  const [expanded, setExpanded] = useState(false);
  const t = LANG[lang];
  const catColor = CATEGORY_COLORS[scheme.category] || "bg-gray-500/20 text-gray-400";
  const isBookmarked = bookmarks.includes(scheme.id);
  const name = lang === "hi" ? scheme.nameHi : lang === "pa" ? scheme.namePa : scheme.name;
  const desc = lang === "hi" ? scheme.descriptionHi : lang === "pa" ? scheme.descriptionPa : scheme.description;

  const card = darkMode ? "bg-gray-800/60 border-gray-700 hover:border-orange-500/40" : "bg-white border-gray-200 hover:border-orange-300";

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${card}`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="font-semibold text-sm leading-snug">{name}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${catColor}`}>{scheme.category}</span>
              <span className="text-xs text-orange-400 font-semibold">{scheme.benefit}</span>
              {scheme.disabilityBonus && <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">PWD</span>}
              {scheme.bplOnly && <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">BPL</span>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => toggleBookmark(scheme.id)} className={`p-1.5 rounded-lg transition-all ${isBookmarked ? "text-orange-400" : "text-gray-500 hover:text-gray-300"}`}>
              {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
            <button onClick={() => setExpanded(!expanded)} className="text-gray-500 hover:text-gray-300 p-1">
              {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-700/50">
            <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{desc}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className={darkMode ? "text-gray-500" : "text-gray-400"}>{t.deadline}: </span>
                <span className="text-orange-400 font-medium">{scheme.deadline}</span>
              </div>
              <div>
                <span className={darkMode ? "text-gray-500" : "text-gray-400"}>Age: </span>
                <span>{scheme.minAge}–{scheme.maxAge}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Max Income: ₹{scheme.maxIncome.toLocaleString("en-IN")}
              </span>
              <a href={scheme.link} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-400 text-white font-semibold px-3 py-1.5 rounded-lg transition-all">
                {t.apply} <ExternalLink size={11} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WelfareEngine({ lang, darkMode }) {
  const t = LANG[lang];
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [occupation, setOccupation] = useState("any");
  const [gender, setGender] = useState("any");
  const [caste, setCaste] = useState("any");
  const [bpl, setBpl] = useState(false);
  const [disability, setDisability] = useState(false);
  const [results, setResults] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const dm = {
    bg: darkMode ? "" : "bg-gray-50",
    card: darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200",
    input: darkMode ? "bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-orange-500" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-500",
    label: darkMode ? "text-gray-400" : "text-gray-500",
    heading: darkMode ? "text-white" : "text-gray-900",
    sub: darkMode ? "text-gray-400" : "text-gray-500",
    toggle: darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const handleSearch = () => {
    const a = parseInt(age, 10);
    const inc = parseInt(income, 10);
    const filtered = SCHEMES_DATA.filter(s => {
      const ageOk = !isNaN(a) ? a >= s.minAge && a <= s.maxAge : true;
      const incOk = !isNaN(inc) ? inc <= s.maxIncome : true;
      const occOk = occupation === "any" || s.occupations.includes("any") || s.occupations.includes(occupation);
      const genOk = gender === "any" || s.gender.includes("any") || s.gender.includes(gender);
      const casteOk = caste === "any" || s.castes.includes("any") || s.castes.includes(caste);
      const bplOk = !bpl || !s.bplOnly || s.bplOnly === bpl;
      const disOk = !disability || s.disabilityBonus || true;
      return ageOk && incOk && occOk && genOk && casteOk && bplOk && disOk;
    });
    filtered.sort((a, b) => {
      const scoreA = (a.occupations.includes(occupation) ? 2 : 0) + (a.castes.includes(caste) ? 2 : 0) + (a.gender.includes(gender) ? 1 : 0);
      const scoreB = (b.occupations.includes(occupation) ? 2 : 0) + (b.castes.includes(caste) ? 2 : 0) + (b.gender.includes(gender) ? 1 : 0);
      return scoreB - scoreA;
    });
    setResults(filtered);
    setShowBookmarks(false);
  };

  const handleReset = () => {
    setAge(""); setIncome(""); setOccupation("any");
    setGender("any"); setCaste("any"); setBpl(false);
    setDisability(false); setResults(null);
  };

  const displayList = showBookmarks
    ? SCHEMES_DATA.filter(s => bookmarks.includes(s.id))
    : results;

  const selectClass = `w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors ${dm.input}`;
  const inputClass = `w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors ${dm.input}`;

  return (
    <div className={`p-6 max-w-3xl mx-auto ${dm.bg}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-1 ${dm.heading}`}>{t.heading}</h2>
        <p className={`text-sm ${dm.sub}`}>{t.sub}</p>
      </div>

      {/* Filter Card */}
      <div className={`border rounded-2xl p-5 mb-6 ${dm.card}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-1.5 ${dm.label}`}>
          <Filter size={12} />{t.filterTitle}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className={`block text-xs mb-1.5 font-medium ${dm.label}`}><User size={10} className="inline mr-1" />{t.age}</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 28" className={inputClass} />
          </div>
          <div>
            <label className={`block text-xs mb-1.5 font-medium ${dm.label}`}><IndianRupee size={10} className="inline mr-1" />{t.income}</label>
            <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 250000" className={inputClass} />
          </div>
          <div>
            <label className={`block text-xs mb-1.5 font-medium ${dm.label}`}><Briefcase size={10} className="inline mr-1" />{t.occupation}</label>
            <select value={occupation} onChange={e => setOccupation(e.target.value)} className={selectClass}>
              {OCCUPATION_OPTIONS.map(o => <option key={o} value={o}>{o === "any" ? t.any : o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className={`block text-xs mb-1.5 font-medium ${dm.label}`}>{t.gender}</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className={selectClass}>
              {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g === "any" ? t.any : g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className={`block text-xs mb-1.5 font-medium ${dm.label}`}>{t.caste}</label>
            <select value={caste} onChange={e => setCaste(e.target.value)} className={selectClass}>
              {CASTE_OPTIONS.map(c => <option key={c} value={c}>{c === "any" ? t.any : c.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2 justify-end pb-0.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={bpl} onChange={e => setBpl(e.target.checked)} className="accent-orange-500 w-4 h-4" />
              <span className={`text-xs font-medium ${dm.label}`}>{t.bpl}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={disability} onChange={e => setDisability(e.target.checked)} className="accent-orange-500 w-4 h-4" />
              <span className={`text-xs font-medium ${dm.label}`}>{t.disability}</span>
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <button onClick={handleSearch} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
            <Search size={15} />{t.search}
          </button>
          <button onClick={handleReset} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm ${dm.toggle}`}>
            <X size={14} />{t.reset}
          </button>
          <button onClick={() => setShowBookmarks(!showBookmarks)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm ${showBookmarks ? "bg-orange-500/20 text-orange-400" : dm.toggle}`}>
            <Bookmark size={14} />{t.showBookmarks} {bookmarks.length > 0 && `(${bookmarks.length})`}
          </button>
          {results && results.length > 0 && (
            <button onClick={() => window.print()} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm ${dm.toggle}`}>
              <Printer size={14} />{t.printResults}
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {displayList !== null && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-semibold text-sm ${dm.heading}`}>
              {showBookmarks ? t.bookmarked : t.results}{" "}
              <span className="text-orange-400 font-bold">({displayList.length})</span>
            </h3>
          </div>
          {displayList.length === 0 ? (
            <div className={`text-center py-10 text-sm border border-dashed rounded-2xl ${darkMode ? "text-gray-500 border-gray-700" : "text-gray-400 border-gray-300"}`}>
              {showBookmarks ? "No bookmarked schemes yet." : t.noResults}
            </div>
          ) : (
            <div className="space-y-3">
              {displayList.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} lang={lang} darkMode={darkMode} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

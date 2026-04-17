import React, { useState, useEffect } from 'react';

// --- ICONS ---
const HomeIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-500 ease-out ${active ? 'text-black' : 'text-black/50 hover:text-black/80'}`}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const GridIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-500 ease-out ${active ? 'text-black' : 'text-black/50 hover:text-black/80'}`}>
    <rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>
  </svg>
);

const BrandsIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-500 ease-out ${active ? 'text-black' : 'text-black/50 hover:text-black/80'}`}>
    <path d="M12 2v20"></path><path d="m17 5-5-3-5 3v14l5 3 5-3Z"></path>
  </svg>
);

const SearchIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-500 ease-out ${active ? 'text-black' : 'text-black/50 hover:text-black/80'}`}>
    <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
  </svg>
);

const CartIcon = ({ active, count }) => (
  <div className="relative">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-500 ease-out ${active ? 'text-black' : 'text-black/50 hover:text-black/80'}`}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
    {count > 0 && (
      <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white/50 shadow-sm animate-in zoom-in duration-300">
        {count}
      </span>
    )}
  </div>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- BRANDS DATA ---
const FEATURED_BRANDS = [
  { name: "GUESS", image: "https://images.unsplash.com/photo-1511130558090-00af810c2111?w=800&q=80" },
  { name: "BALENCIAGA", image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80" },
  { name: "VETEMENTS", image: "https://images.unsplash.com/photo-1509506489701-5e5d338cc01b?w=800&q=80" },
  { name: "NIKE", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" },
];

const ALL_BRANDS_LIST = [
  "1017 ALYX 9SM", "A-COLD-WALL*", "ACNE STUDIOS", "ADIDAS ORIGINALS", "ALEXANDER MCQUEEN", "AMIRI", "A.P.C.", "ASICS", 
  "BALENCIAGA", "BALMAIN", "BOTTEGA VENETA", "BURBERRY", "CARHARTT WIP", "COMME DES GARÇONS", "COMMON PROJECTS", "COPERNI", "CRAIG GREEN",
  "DIOR", "DRKSHDW", "DRIES VAN NOTEN", "FEAR OF GOD", "FENDI", "GIVENCHY", "GUCCI", "GUESS", "HELMUT LANG", "HERON PRESTON", 
  "ISSEY MIYAKE", "JACQUEMUS", "JIL SANDER", "JUNYA WATANABE", "KENZO", "LOEWE", "LOUIS VUITTON", "MAISON MARGIELA", "MARNI", "MARTINE ROSE", "MONCLER", 
  "NEW BALANCE", "NIKE", "OFF-WHITE", "OUR LEGACY", "PALM ANGELS", "PRADA", "PUMA", "RAF SIMONS", "REPRESENT", "RICK OWENS", 
  "SACAI", "SAINT LAURENT", "SALOMON", "STONE ISLAND", "STÜSSY", "THOM BROWNE", "TOM FORD", "UNDERCOVER", "VALENTINO", "VERSACE", "VETEMENTS", "Y-3", "YEEZY", "YOHJI YAMAMOTO"
];

// --- MASSIVE PRODUCTS DATABASE ---
const MOCK_PRODUCTS = [
  {
    id: "g1", brand: "GUESS", title: "Boxy Iconic T-Shirt", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Classic boxy fit iconic t-shirt.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_501,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI73K8HM0-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_501,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI73K8HM0-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_501,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI73K8HM0-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_501,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI73K8HM0-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_501,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI73K8HM0-G011-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_501,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI73K8HM0-G011-ALT5", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_501,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI73K8HM0-G011-ALT6", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_501,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI73K8HM0-G011-ALTGHOST"] }
    ]
  },
  {
    id: "g2", brand: "GUESS", title: "T-Shirt kleines Logo-Dreieck", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Minimalist t-shirt with small triangle logo detail.",
    colors: [
      { name: "Light Brown", hex: "#D2B48C", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G1CA", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G1CA-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G1CA-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G1CA-ALT3"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI0AKCCM1-G011-ALTGHOST"] }
    ]
  },
  {
    id: "g3", brand: "GUESS", title: "Scuba-Poloshirt-Sweatshirt", price: 79.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Modern scuba-fabric polo sweatshirt with a relaxed fit.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RQ05KD122-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RQ05KD122-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RQ05KD122-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RQ05KD122-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RQ05KD122-JBLK-ALTGHOST"] }
    ]
  },
  {
    id: "g4", brand: "GUESS", title: "Langarm-T-Shirt Waffelmuster Mini-Dreieck", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Comfortable waffle-knit long sleeve t-shirt.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-JBLK-ALT3"] },
      { name: "Cream", hex: "#FFFDD0", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-G053", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-G053-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-G053-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-G053-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4BI77KCII1-G053-ALT4"] }
    ]
  },
  {
    id: "g5", brand: "GUESS", title: "Besticktes T-Shirt", price: 55.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Premium embroidered t-shirt.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-JBLK-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GI13K2995-G011-ALTGHOST"] }
    ]
  },
  {
    id: "g6", brand: "GUESS", title: "T-Shirt Print", price: 27.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "Statement print t-shirt.",
    colors: [
      { name: "Cream", hex: "#FFFDD0", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5BI50KA0Q1-G9L9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5BI50KA0Q1-G9L9-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5BI50KA0Q1-G9L9-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5BI50KA0Q1-G9L9-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5BI50KA0Q1-G9L9-ALTGHOST"] }
    ]
  },
  {
    id: "g7", brand: "GUESS", title: "Oversized T-Shirt Mini-Patch", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Oversized fit t-shirt with mini patch.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G011-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-JBLK-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-JBLK-ALT5", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-JBLK-ALTGHOST"] },
      { name: "Olive Green", hex: "#556B2F", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G8EV", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G8EV-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G8EV-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G8EV-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G8EV-ALTGHOST"] },
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G1W7", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G1W7-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G1W7-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G1W7-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI46K8FQ4-G1W7-ALTGHOST"] }
    ]
  },
  {
    id: "g8", brand: "GUESS", title: "Triangel-Logo Stretch-T-Shirt", price: 30.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "Stretch t-shirt with classic triangle logo.",
    colors: [
      { name: "Grey", hex: "#808080", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-LMGY", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-LMGY-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-LMGY-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-LMGY-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-LMGY-ALTGHOST"] },
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G67C", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G67C-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G67C-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G67C-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G67C-ALTGHOST"] },
      { name: "Sky Blue", hex: "#87CEEB", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G7S1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G7S1-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G7S1-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G7S1-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G7S1-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-JBLK-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W2YI45J1314-G011-ALTGHOST"] }
    ]
  },
  {
    id: "g9", brand: "GUESS", title: "Rippstrick-Tanktop", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Essential ribbed knit tank top.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK-ALT5", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK-ALT6", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK-ALT7", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-JBLK-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012-ALT5", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012-ALT6", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012-ALT7", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YR10Z0130-G012-ALTGHOST"] }
    ]
  },
  {
    id: "g10", brand: "GUESS", title: "Cropped Top floraler Print", price: 70.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "Vibrant floral-print crop top perfect for summer evenings.",
    colors: [
      { name: "Multi Brown", hex: "#8B4513", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIC", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIC-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIC-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIC-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIC-ALTGHOST"] },
      { name: "Multi Green", hex: "#228B22", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIE", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIE-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIE-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5GH74WH9Z2-PMIE-ALTGHOST"] }
    ]
  },
  {
    id: "g11", brand: "GUESS", title: "Wildleder-Minirock", price: 99.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Premium suede mini skirt with a flattering fit.",
    colors: [
      { name: "Green", hex: "#008000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G8B6", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G8B6-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G8B6-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G8B6-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G8B6-ALTGHOST"] },
      { name: "Yellow", hex: "#FFD700", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G281", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G281-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G281-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G281-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-G281-ALTGHOST"] },
      { name: "Light Blue", hex: "#ADD8E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A71N", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A71N-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A71N-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A71N-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A71N-ALTGHOST"] },
      { name: "Pink", hex: "#FFC0CB", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A61L", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A61L-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A61L-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A61L-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6PD2CWV110-A61L-ALTGHOST"] }
    ]
  },
  {
    id: "g12", brand: "GUESS", title: "Strick-T-Shirt", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Textured knit t-shirt.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-JBLK-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-G046", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-G046-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-G046-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-G046-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RP14KD461-G046-ALTGHOST"] }
    ]
  },
  {
    id: "g13", brand: "GUESS", title: "Besticktes Logo Tanktop", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Tank top with delicate logo embroidery.",
    colors: [
      { name: "Light Blue", hex: "#ADD8E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G7K2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G7K2-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G7K2-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G7K2-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G7K2-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GPZ8KF641-G011-ALTGHOST"] }
    ]
  },
  {
    id: "g14", brand: "GUESS", title: "Rhinestone Tanktop", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "Elegant tank top embellished with sparkling rhinestones.",
    colors: [
      { name: "Water Green", hex: "#20B2AA", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F7YG", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F7YG-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F7YG-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F7YG-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F7YG-ALTGHOST"] },
      { name: "Olive Green", hex: "#556B2F", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F84O", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F84O-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F84O-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F84O-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F84O-ALTGHOST"] },
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F1CY", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F1CY-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F1CY-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F1CY-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP14K2940-F1CY-ALTGHOST"] }
    ]
  },
  {
    id: "g15", brand: "GUESS", title: "Ärmelloses Pullover-Top", price: 70.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Versatile sleeveless sweater top.",
    colors: [
      { name: "White Multi", hex: "#FDF5E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-A10F", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-A10F-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-A10F-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-A10F-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-A10F-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-JBLK-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GR02Z0723-JBLK-ALTGHOST"] }
    ]
  },
  {
    id: "g16", brand: "GUESS", title: "Gestreifte Wide Leg Hose", price: 65.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "Multicolor pattern striped wide-leg pants for a flowy look.",
    colors: [
      { name: "Multi", hex: "#E5E4E2", images: ["https://img.guess.com/image/upload/q_auto,f_auto/v1/EU/Style/ECOMM/0_EMOZIONALE_0_ENSEMBLE_COORDSGUESS_WW5YB73KK620F11C", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YB73KK620-F11C", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YB73KK620-F11C-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YB73KK620-F11C-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W5YB73KK620-F11C-ALTGHOST"] }
    ]
  },
  {
    id: "g17", brand: "GUESS", title: "Sweatshirt mit gesticktem Logo", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Comfortable sweatshirt featuring classic embroidered front logo.",
    colors: [
      { name: "Light Blue", hex: "#ADD8E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G7HP", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G7HP-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G7HP-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G7HP-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G7HP-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G012", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G012-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G012-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G012-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G012-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ03KD761-G012-ALTGHOST"] }
    ]
  },
  {
    id: "g18", brand: "GUESS", title: "T-Shirt mit Logo-Strasssteinen", price: 40.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "T-shirt featuring sparkling rhinestones logo.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-G011-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI24J1314-JBLK-ALTGHOST"] }
    ]
  },
  {
    id: "g19", brand: "GUESS", title: "Logo T-Shirt", price: 45.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Minimalist t-shirt with subtle branding.",
    colors: [
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKU", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKU-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKU-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKU-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKU-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKW", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKW-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKW-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKW-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GI07K2852-PMKW-ALTGHOST"] }
    ]
  },
  {
    id: "g20", brand: "GUESS", title: "Gestreifte Jeansjacke", price: 139.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Premium striped denim jacket perfect for layering.",
    colors: [
      { name: "Beige multi", hex: "#D2B48C", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GN70D7961-GHCK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GN70D7961-GHCK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GN70D7961-GHCK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GN70D7961-GHCK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GN70D7961-GHCK-ALTGHOST"] }
    ]
  },
  {
    id: "g21", brand: "GUESS", title: "T-Shirt mit aufgedrucktem Logo", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Classic printed logo t-shirt in various colors.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-SCFY", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-SCFY-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-SCFY-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-SCFY-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-SCFY-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-JBLK-ALTGHOST"] },
      { name: "Sky Blue", hex: "#87CEEB", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G8DD", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G8DD-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G8DD-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G8DD-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G8DD-ALTGHOST"] },
      { name: "Dark Blue", hex: "#00008B", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-DPM", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-DPM-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-DPM-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-DPM-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-DPM-ALTGHOST"] },
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G9I0", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G9I0-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G9I0-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G9I0-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z2YI11J1314-G9I0-ALTGHOST"] }
    ]
  },
  {
    id: "g22", brand: "GUESS", title: "Gestreiftes Polo", price: 69.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Classic striped polo shirt.",
    colors: [
      { name: "Green", hex: "#008000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP00KCOT1-SM0V", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP00KCOT1-SM0V-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP00KCOT1-SM0V-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP00KCOT1-SM0V-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP00KCOT1-SM0V-ALTGHOST"] }
    ]
  },
  {
    id: "g23", brand: "GUESS", title: "Sweatshirt mit Logo-Patch", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Comfortable sweatshirt with premium front logo patch.",
    colors: [
      { name: "Dark Blue", hex: "#00008B", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G7V2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G7V2-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G7V2-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G7V2-ALT9"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G291", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G291-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G291-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G291-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-G291-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ08KCN01-JBLK-ALTGHOST"] }
    ]
  },
  {
    id: "g24", brand: "GUESS", title: "Kleines Logo-T-Shirt", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Everyday essential t-shirt with small chest logo.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-JBLK-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-JBLK-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-G291", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-G291-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-G291-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-G291-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RI05KBW41-G291-ALTGHOST"] }
    ]
  },
  {
    id: "g25", brand: "GUESS", title: "Logo Tanktop", price: 55.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Fitted tank top with front logo detail.",
    colors: [
      { name: "Blue", hex: "#0000FF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GP13K3055-G7JX", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GP13K3055-G7JX-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GP13K3055-G7JX-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GP13K3055-G7JX-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6GP13K3055-G7JX-ALTGHOST"] }
    ]
  },
  {
    id: "g27", brand: "GUESS", title: "Gestreiftes T-Shirt", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Multicolor striped t-shirt.",
    colors: [
      { name: "Multi White", hex: "#FDF5E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM1L", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM1L-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM1L-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM1L-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM1L-ALTGHOST"] },
      { name: "Multi Blue", hex: "#4682B4", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM2N", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM2N-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM2N-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM2N-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI18K3040-SM2N-ALTGHOST"] }
    ]
  },
  {
    id: "g28", brand: "GUESS", title: "T-Shirt mit Strassstein-Logo", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "T-shirt featuring sparkling rhinestones logo.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G011-ALTGHOST"] },
      { name: "Light Pink", hex: "#FFB6C1", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G66E", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G66E-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G66E-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G66E-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G66E-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-JBLK-ALTGHOST"] },
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G9L9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G9L9-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G9L9-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G9L9-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V3BI11J1314-G9L9-ALTGHOST"] }
    ]
  },
  {
    id: "g29", brand: "GUESS", title: "Bedrucktes Logo-T-Shirt", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Classic printed logo t-shirt in breathable cotton.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G046", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G046-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G046-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G046-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G046-ALTGHOST"] },
      { name: "Blue", hex: "#0000FF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G7JM", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G7JM-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G7JM-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G7JM-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GIB4K8HM0-G7JM-ALTGHOST"] }
    ]
  },
  {
    id: "g30", brand: "GUESS", title: "Sexy straight Jeans", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "Flattering straight-leg jeans in crisp white.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GA15D0705-PLYC", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GA15D0705-PLYC-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GA15D0705-PLYC-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GA15D0705-PLYC-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GA15D0705-PLYC-ALTGHOST"] }
    ]
  },
  {
    id: "g32", brand: "GUESS", title: "T-Shirt mit Dreieckslogo", price: 45.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "T-shirt with classic triangle logo.",
    colors: [
      { name: "Cream", hex: "#FFFDD0", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G012", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G012-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G012-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G012-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G012-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-JBLK-ALTGHOST"] },
      { name: "Light Blue", hex: "#ADD8E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G7AI", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G7AI-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G7AI-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G7AI-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6RI35J1314-G7AI-ALTGHOST"] }
    ]
  },
  {
    id: "g33", brand: "GUESS", title: "Kurz geschnittene Jacke mit durchgehendem Reißverschluss", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "Cropped jacket with full front zip.",
    colors: [
      { name: "Blue", hex: "#0000FF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G7F3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G7F3-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G7F3-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G7F3-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G7F3-ALTGHOST"] },
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G1O3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G1O3-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G1O3-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G1O3-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RQ17KD822-G1O3-ALTGHOST"] }
    ]
  },
  {
    id: "g34", brand: "GUESS", title: "Kapuzenpullover mit aufgedrucktem Logo", price: 79.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Comfortable hooded sweatshirt with printed logo.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-G046", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-G046-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-G046-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-G046-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-G046-ALTGHOST"] },
      { name: "Blue", hex: "#0000FF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-BLN", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-BLN-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-BLN-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-BLN-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6RQ26KCPR1-BLN-ALTGHOST"] }
    ]
  },
  {
    id: "g35", brand: "GUESS", title: "Cargo Shorts", price: 80.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Utilitarian cargo shorts perfect for exploring the city.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-JBLK-ALTGHOST"] },
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-G9I0", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-G9I0-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-G9I0-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-G9I0-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/Z6GD01K2836-G9I0-ALTGHOST"] }
    ]
  },
  {
    id: "g36", brand: "GUESS", title: "T-Shirt mit Frontlogo", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Simple everyday t-shirt with subtle front logo.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G011-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G011-ALTGHOST"] },
      { name: "Blue", hex: "#0000FF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G7F3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G7F3-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G7F3-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/V6RI04K8FQ4-G7F3-ALT9"] }
    ]
  },
  {
    id: "g37", brand: "GUESS", title: "T-Shirt 4G-Logoprint", price: 22.50, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Premium t-shirt featuring the classic 4G logo.",
    colors: [
      { name: "Grey", hex: "#808080", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BI72I3Z14-G969", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BI72I3Z14-G969-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BI72I3Z14-G969-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BI72I3Z14-G969-ALT9"] }
    ]
  },
  {
    id: "g38", brand: "GUESS", title: "Oversized American Tradition T-Shirt", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Vintage inspired graphic t-shirt.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-JBLK-ALTGHOST"] },
      { name: "Cream", hex: "#FFFDD0", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G6R4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G6R4-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G6R4-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G6R4-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G6R4-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4YI08K8HM0-G011-ALTGHOST"] }
    ]
  },
  {
    id: "g39", brand: "GUESS", title: "Owen relaxed Jeans", price: 120.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Comfortable relaxed fit jeans.",
    colors: [
      { name: "Cream", hex: "#FFFDD0", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GAT5D1113-ES12", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GAT5D1113-ES12-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GAT5D1113-ES12-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GAT5D1113-ES12-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GAT5D1113-ES12-ALTGHOST"] }
    ]
  },
  {
    id: "g40", brand: "GUESS", title: "Oversized Iconic Sweatshirt", price: 69.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Premium oversized sweatshirt with bold iconic branding.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-G011-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-JBLK-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-JBLK-ALTGHOST"] },
      { name: "Dark Blue", hex: "#00008B", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-A71W", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-A71W-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-A71W-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-A71W-ALT3"] },
      { name: "Grey", hex: "#808080", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-H90Z", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-H90Z-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-H90Z-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-H90Z-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YQ21K9V31-H90Z-ALTGHOST"] }
    ]
  },
  {
    id: "g41", brand: "GUESS", title: "Slim American Tradition Langarm-T-Shirt", price: 39.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Classic slim long-sleeve t-shirt.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-G011-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-JBLK-ALTGHOST"] },
      { name: "Dark Blue", hex: "#00008B", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-A71W", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-A71W-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-A71W-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-A71W-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M4YI54K8HM0-A71W-ALTGHOST"] }
    ]
  },
  {
    id: "g42", brand: "GUESS", title: "Ärmelloses Smocked-Top", price: 60.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Chic sleeveless smocked top.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP40K3256-G1O6", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP40K3256-G1O6-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP40K3256-G1O6-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP40K3256-G1O6-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GP40K3256-G1O6-ALTGHOST"] }
    ]
  },
  {
    id: "g43", brand: "GUESS", title: "Spitzen-Dreieck-Logo T-Shirt", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women",
    description: "Elegant t-shirt with lace triangle logo.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-G011-ALTGHOST"] },
      { name: "Light Blue", hex: "#ADD8E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-A719", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-A719-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-A719-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GI52K5423-A719-ALT3"] }
    ]
  },
  {
    id: "g44", brand: "GUESS", title: "Pack mit 3 Boxershorts", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Comfortable pack of 3 everyday boxers.",
    colors: [
      { name: "Multi", hex: "#E5E4E2", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-F017", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-F017-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-F017-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-F017-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-F017-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-F017-ALTGHOST"] },
      { name: "Multi Blue", hex: "#4682B4", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-HE90", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-HE90-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-HE90-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-HE90-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-HE90-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-HE90-ALT5", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-HE90-ALT6", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-HE90-ALTGHOST"] },
      { name: "Multi Black", hex: "#1C1C1C", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-FQ90", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-FQ90-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-FQ90-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-FQ90-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-FQ90-ALT4", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-FQ90-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-A996", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-A996-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-A996-ALT2"] },
      { name: "Multi White", hex: "#FDF5E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-F54Q", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/U97G01KCD31-F54Q-ALT1"] }
    ]
  },
  {
    id: "g45", brand: "GUESS", title: "Schmal geschnittene Chinohosen", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Classic slim-fit chinos for any occasion.",
    colors: [
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-A90N", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-A90N-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-A90N-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-A90N-ALTGHOST"] },
      { name: "Blue", hex: "#0000FF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-G7DC", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-G7DC-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-G7DC-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-G7DC-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M5BB75WHHO2-G7DC-ALTGHOST"] }
    ]
  },
  {
    id: "g46", brand: "GUESS", title: "Cardigan mit Reißverschluss vorn", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Modern cardigan with front zip closure.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-JBLK-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-G1O6", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-G1O6-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-G1O6-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-G1O6-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/W4BR88Z3BH0-G1O6-ALTGHOST"] }
    ]
  },
  {
    id: "g47", brand: "GUESS", title: "Overshirt aus Baumwollmischung", price: 120.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Versatile cotton-blend overshirt for layering.",
    colors: [
      { name: "Cream", hex: "#FFFDD0", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GH64W1914-G018", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GH64W1914-G018-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GH64W1914-G018-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GH64W1914-G018-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GH64W1914-G018-ALTGHOST"] }
    ]
  },
  {
    id: "g48", brand: "GUESS", title: "Polo-Pullover", price: 90.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Refined knitted polo sweater.",
    colors: [
      { name: "Dark Blue", hex: "#00008B", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G7V2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G7V2-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G7V2-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G7V2-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G7V2-ALTGHOST"] },
      { name: "Beige", hex: "#F5F5DC", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G1FG", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G1FG-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G1FG-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G1FG-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G1FG-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G1FG-ALTGHOST", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GR05Z0558-G1FG-ALTGHOST1"] }
    ]
  },
  {
    id: "g49", brand: "GUESS", title: "Reguläre Passform Badehosen", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Classic swim trunks for summer.",
    colors: [
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-JBLK-ALTGHOST"] },
      { name: "Royal Blue", hex: "#4169E1", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G7M1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G7M1-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G7M1-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G7M1-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G7M1-ALTGHOST"] },
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/F6GT24WG282-G011-ALTGHOST"] }
    ]
  },
  {
    id: "g50", brand: "GUESS", title: "Jersey T-Shirt", price: 60.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men",
    description: "Premium jersey t-shirt with embroidered detail.",
    colors: [
      { name: "Cream", hex: "#FFFDD0", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-G047", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-G047-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-G047-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-G047-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-G047-ALT9", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-G047-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M6GP29K3188-JBLK-ALTGHOST"] }
    ]
  },
  {
    id: "g51", brand: "GUESS", title: "Slim-Fit-Hemd", price: 70.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Elegant slim fit shirt.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-G011-ALTGHOST"] },
      { name: "Black", hex: "#000000", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-JBLK", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-JBLK-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-JBLK-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-JBLK-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M1YH20W7ZK1-JBLK-ALTGHOST"] }
    ]
  },
  {
    id: "g52", brand: "GUESS", title: "Übergroßes Popeline-Hemd", price: 90.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Crisp oversized poplin shirt, a perfect wardrobe staple.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GH54W1979-G011", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GH54W1979-G011-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GH54W1979-G011-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GH54W1979-G011-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/W6GH54W1979-G011-ALTGHOST"] }
    ]
  },
  {
    id: "g53", brand: "GUESS", title: "Socken Logodreieck", price: 12.00, currency: "EUR", isNew: false, type: "accessory", gender: "Unisex",
    description: "Premium comfortable socks with signature triangle logo.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/V2GZ00ZZ00I-G011"] }
    ]
  },
  {
    id: "g54", brand: "GUESS", title: "Marciano Leinenmischung Weste", price: 180.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women",
    description: "Elegant Marciano vest in a premium linen blend.",
    colors: [
      { name: "Brown", hex: "#A52A2A", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/G6GH26W2218-F12W", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/G6GH26W2218-F12W-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/G6GH26W2218-F12W-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/G6GH26W2218-F12W-ALT3"] },
      { name: "Light Blue", hex: "#ADD8E6", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/G6GH26W2218-G7P5", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/G6GH26W2218-G7P5-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/G6GH26W2218-G7P5-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/G6GH26W2218-G7P5-ALT3"] }
    ]
  },
  {
    id: "g55", brand: "GUESS", title: "Häkelhemd", price: 55.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men",
    description: "Trendy crochet shirt, perfect for summer days.",
    colors: [
      { name: "White", hex: "#FFFFFF", images: ["https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M3YH58WFIM0-F0F8", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M3YH58WFIM0-F0F8-ALT1", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M3YH58WFIM0-F0F8-ALT2", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M3YH58WFIM0-F0F8-ALT3", "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_424,ar_2:3,c_fill/v1/EU/Style/ECOMM/M3YH58WFIM0-F0F8-ALTGHOST"] }
    ]
  }
];

const HOMEPAGE_COLLECTIONS = [
  {
    title: "GUESS NEW ARRIVALS",
    banner: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80", 
    products: MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 4) 
  },
  {
    title: "GUESS ESSENTIALS",
    banner: "https://images.unsplash.com/photo-1552346154-21d32810baa3?w=1600&q=80", 
    products: MOCK_PRODUCTS.filter(p => !p.isNew).slice(0, 4) 
  }
];

// --- UI COMPONENTS ---

const GridProductCard = ({ product, onProductClick }) => {
  const defaultImage = product.colors?.[0]?.images?.[0] || product.image;
  const hasMultipleColors = product.colors && product.colors.length > 1;

  return (
    <div className="flex flex-col gap-3 cursor-pointer group" onClick={() => onProductClick(product)}>
      <div className="w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm border border-black/5">
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border border-black/10 rounded-md shadow-sm z-10">
            NEW
          </span>
        )}
        <img 
          src={defaultImage} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" 
        />
      </div>
      
      <div className="flex flex-col px-1">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">{product.brand} • {product.gender}</span>
        
        <h3 className="text-sm font-medium leading-snug text-gray-900 transition-colors duration-300 group-hover:text-gray-600 line-clamp-1">{product.title}</h3>
        
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-sm font-semibold whitespace-nowrap text-black">
            {product.price.toFixed(2)} {product.currency}
          </span>
          
          {hasMultipleColors && (
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map(c => (
                <div key={c.name} className="w-2.5 h-2.5 rounded-full border border-black/10" style={{backgroundColor: c.hex}}></div>
              ))}
              {product.colors.length > 3 && <span className="text-[10px] text-gray-400 ml-0.5">+{product.colors.length - 3}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setShowSizeGuide(false);
      setActiveColorIndex(0);
      setActiveImageIndex(0);
      if (product.type === 'footwear') setSelectedSize('42');
      else if (product.type === 'accessory') setSelectedSize('ONE SIZE');
      else setSelectedSize('M');
    }
  }, [product]);

  if (!product) return null;

  const isFootwear = product.type === 'footwear';
  const isAccessory = product.type === 'accessory';
  const availableSizes = isAccessory ? ['ONE SIZE'] : (isFootwear ? ['40', '41', '42', '43', '44'] : ['S', 'M', 'L', 'XL']);

  const activeColor = product.colors?.[activeColorIndex] || product.colors?.[0];
  const activeImageUrl = activeColor?.images?.[activeImageIndex] || activeColor?.images?.[0];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-500 ease-out" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-[0.98] fade-in duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] max-h-[90vh]">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-gray-100 transition-colors shadow-sm"
        >
          <XIcon />
        </button>

        {showSizeGuide && !isAccessory && (
          <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md flex flex-col p-8 md:p-12 animate-in fade-in duration-500 ease-out">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl md:text-4xl font-medium text-black leading-tight">Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <XIcon />
              </button>
            </div>
            
            <div className="overflow-x-auto flex-1">
              {isFootwear ? (
                <table className="w-full text-left text-sm font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-black/20">
                      <th className="py-4 text-black/60 font-normal">EU</th>
                      <th className="py-4 text-black/60 font-normal">US</th>
                      <th className="py-4 text-black/60 font-normal">UK</th>
                      <th className="py-4 text-black/60 font-normal">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[ { eu: '40', us: '7', uk: '6', cm: '25' }, { eu: '41', us: '8', uk: '7', cm: '26' }, { eu: '42', us: '9', uk: '8', cm: '27' }, { eu: '43', us: '10', uk: '9', cm: '28' }, { eu: '44', us: '11', uk: '10', cm: '29' } ].map((row) => (
                      <tr key={row.eu} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                        <td className="py-4 font-bold">{row.eu}</td>
                        <td className="py-4">{row.us}</td>
                        <td className="py-4">{row.uk}</td>
                        <td className="py-4">{row.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left text-sm font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-black/20">
                      <th className="py-4 text-black/60 font-normal">SIZE</th>
                      <th className="py-4 text-black/60 font-normal">CHEST (CM)</th>
                      <th className="py-4 text-black/60 font-normal">WAIST (CM)</th>
                      <th className="py-4 text-black/60 font-normal">LENGTH (CM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['S', 'M', 'L', 'XL'].map((size, i) => (
                      <tr key={size} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                        <td className="py-4 font-bold">{size}</td>
                        <td className="py-4">{[92, 96, 104, 112][i]} - {[96, 104, 112, 124][i]}</td>
                        <td className="py-4">{[76, 81, 89, 97][i]} - {[80, 89, 97, 109][i]}</td>
                        <td className="py-4">{[70, 72, 74, 76][i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        <div className="w-full md:w-1/2 flex flex-col bg-white border-r border-gray-100 flex-shrink-0">
          <div className="relative w-full h-[40vh] md:h-auto md:flex-1 bg-gray-50 flex-shrink-0 overflow-hidden">
            {activeImageUrl && (
              <img 
                key={activeImageUrl}
                src={activeImageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover animate-in fade-in duration-500 ease-out" 
              />
            )}
          </div>
          
          {activeColor?.images?.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto hide-scrollbar bg-white flex-shrink-0 border-t border-gray-100">
              {activeColor.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`flex-shrink-0 w-16 md:w-20 aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-start md:justify-center overflow-y-auto">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">{product.brand} • {product.gender}</span>
          <h2 className="text-2xl md:text-4xl font-medium text-black leading-tight mb-4">{product.title}</h2>
          <p className="text-xl font-semibold text-black mb-6">{product.price.toFixed(2)} {product.currency}</p>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            {product.description}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
                COLOR: <span className="text-black">{activeColor?.name}</span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((col, idx) => (
                  <button 
                    key={col.name} 
                    onClick={() => { setActiveColorIndex(idx); setActiveImageIndex(0); }}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all duration-300 ${activeColorIndex === idx ? 'border-black scale-110' : 'border-transparent hover:border-gray-300'}`}
                    title={col.name}
                  >
                    <div className="w-full h-full rounded-full shadow-sm border border-black/10" style={{ backgroundColor: col.hex }}></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                {isAccessory ? 'SIZE' : (isFootwear ? 'EU SIZE' : 'SIZE')}
              </p>
              {!isAccessory && (
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-gray-400 underline hover:text-black transition-colors"
                >
                  Size Guide
                </button>
              )}
            </div>
            <div className="flex gap-3 flex-wrap">
              {availableSizes.map(size => (
                <button 
                  key={size} 
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 h-12 border rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-black hover:border-gray-400'} ${isAccessory ? 'w-full' : 'min-w-[3rem]'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onAddToCart({
              ...product, 
              size: selectedSize, 
              colorName: activeColor?.name, 
              colorImage: activeColor?.images?.[0] || activeImageUrl 
            })} 
            className="w-full mt-auto bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-black/80 transition-all duration-500 ease-out shadow-lg shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

// --- СТРАНИЦЫ ---

const HomePage = ({ onNavigate, onProductClick, setActiveBrand }) => (
  <div className="w-full pb-48 pt-6 bg-gray-50/50 animate-in fade-in slide-in-from-bottom-8 duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
    <div className="max-w-[1400px] mx-auto">
      {HOMEPAGE_COLLECTIONS.map((collection, index) => (
        <section key={index} className="w-full mb-20 px-4 sm:px-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black">{collection.title}</h2>
            <button 
              onClick={() => { setActiveBrand('ALL'); onNavigate('catalog'); }} 
              className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors duration-500 ease-out"
            >
              VIEW ALL
            </button>
          </div>
          <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden bg-gray-200 mb-8 relative shadow-sm border border-black/5 group cursor-pointer" onClick={() => { setActiveBrand('ALL'); onNavigate('catalog'); }}>
            <img 
              src={collection.banner} 
              alt={collection.title} 
              className="w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {collection.products.map((product) => (
              <GridProductCard key={product.id} product={product} onProductClick={onProductClick} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

const CatalogPage = ({ onProductClick, activeBrand, setActiveBrand }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeGender, setActiveGender] = useState('ALL');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (activeCategory !== 'ALL' && product.type !== activeCategory.toLowerCase()) return false;
    if (activeGender !== 'ALL' && product.gender !== activeGender && product.gender !== "Unisex") return false;
    if (activeBrand !== 'ALL' && product.brand !== activeBrand) return false;
    return true;
  });

  return (
    <div className="pt-8 pb-48 w-full bg-gray-50/50 animate-in fade-in slide-in-from-bottom-8 duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-black">
            {activeBrand === 'ALL' ? 'SHOP ALL' : activeBrand}
          </h1>
          {activeBrand !== 'ALL' && (
            <button onClick={() => setActiveBrand('ALL')} className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black underline self-start md:self-auto">
              Clear Brand Filter
            </button>
          )}
        </div>
        
        {/* Фильтры: Пол и Категории */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
            {['ALL', 'Men', 'Women'].map((gender) => (
              <button 
                key={gender}
                onClick={() => setActiveGender(gender)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest rounded-xl whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 ${activeGender === gender ? 'bg-black text-white shadow-md' : 'bg-white border border-gray-200 text-black shadow-sm hover:border-gray-300'}`}
              >
                {gender}
              </button>
            ))}
          </div>

          <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar border-t border-black/5 pt-4">
            {['ALL', 'CLOTHING', 'FOOTWEAR', 'ACCESSORY'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest rounded-xl whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 ${activeCategory === cat ? 'bg-gray-200 text-black' : 'text-gray-500 hover:text-black'}`}
              >
                {cat === 'ACCESSORY' ? 'ACCESSORIES' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Сетка товаров */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-in fade-in duration-500">
            {filteredProducts.map((product) => (
              <GridProductCard key={product.id} product={product} onProductClick={onProductClick} />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-gray-400">
            <SearchIcon active={false} />
            <p className="mt-6 font-mono text-sm uppercase tracking-widest text-center max-w-sm leading-relaxed">
              We couldn't find any products matching your selection. <br/> Explore other designers or categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const BrandsPage = ({ onNavigate, setActiveBrand }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBrands = ALL_BRANDS_LIST.filter(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
  const groupedBrands = filteredBrands.reduce((acc, brand) => {
    const letter = brand[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {});
  const sortedLetters = Object.keys(groupedBrands).sort();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="pt-8 pb-48 w-full bg-white animate-in fade-in slide-in-from-bottom-8 duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-black mb-12">DESIGNERS</h1>
        
        <div className="mb-20">
          <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">FEATURED BOUTIQUES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED_BRANDS.map((brand, idx) => (
              <div 
                key={idx} 
                onClick={() => { setActiveBrand(brand.name); onNavigate('catalog'); }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm border border-black/5"
              >
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 filter grayscale-[10%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-lg md:text-xl font-serif text-white uppercase tracking-tighter">{brand.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
            <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">A-Z INDEX</h2>
            <div className="relative w-full md:w-64">
              <SearchIcon active={false} className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search designers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-mono text-xs uppercase tracking-widest pl-8 py-2 placeholder:text-gray-300 focus:ring-0"
              />
            </div>
          </div>

          <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md py-4 mb-8 flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {alphabet.map(letter => (
              <a 
                key={letter} 
                href={`#letter-${letter}`}
                className="text-xs font-mono text-gray-400 hover:text-black hover:font-bold transition-all min-w-[1.5rem] text-center"
              >
                {letter}
              </a>
            ))}
          </div>

          {sortedLetters.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8">
              {sortedLetters.map(letter => (
                <div key={letter} id={`letter-${letter}`} className="break-inside-avoid mb-10 pt-4">
                  <h3 className="text-2xl font-serif text-black mb-4 border-b border-gray-100 pb-2">{letter}</h3>
                  <ul className="flex flex-col gap-3">
                    {groupedBrands[letter].map(brandName => (
                      <li key={brandName}>
                        <button 
                          onClick={() => { setActiveBrand(brandName); onNavigate('catalog'); }}
                          className="text-sm font-mono text-gray-600 hover:text-black uppercase tracking-wider text-left transition-colors"
                        >
                          {brandName}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
             <div className="py-20 text-center text-gray-400 font-mono text-xs uppercase tracking-widest">
               No designers found matching "{searchQuery}"
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

// --- ОСНОВНОЕ ПРИЛОЖЕНИЕ ---
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [activeBrandFilter, setActiveBrandFilter] = useState('ALL');

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === product.size && item.colorName === product.colorName);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.size === product.size && item.colorName === product.colorName) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleAddToCartFromModal = (product) => {
    addToCart(product);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };
  
  const removeFromCart = (id, size, colorName) => setCart(prev => prev.filter(item => !(item.id === id && item.size === size && item.colorName === colorName)));
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111] font-sans antialiased selection:bg-black selection:text-white relative overflow-x-hidden">
      
      {/* ХЕДЕР */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-500">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex-shrink-0 cursor-pointer" onClick={() => { setCurrentRoute('home'); setActiveBrandFilter('ALL'); }}>
            <span className="font-serif text-2xl font-bold uppercase tracking-tighter text-black transition-opacity duration-300 hover:opacity-70">AUREN</span>
          </div>
          <div className="flex-1 flex justify-end">
            <button className="p-2 text-black hover:opacity-60 transition-opacity duration-500 ease-out">
              <SearchIcon active={false} />
            </button>
          </div>
        </div>
      </header>

      {/* МОДАЛЬНОЕ ОКНО ТОВАРА */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCartFromModal} 
      />

      {/* КОРЗИНА */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500 ease-out" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md h-full flex flex-col animate-in slide-in-from-right duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] bg-white shadow-2xl rounded-l-3xl">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="font-bold text-lg text-black">CART ({cartCount})</span>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300 ease-out text-black/50 hover:text-black uppercase text-xs font-semibold">
                CLOSE
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 font-medium uppercase tracking-widest text-sm animate-in fade-in duration-700">YOUR CART IS EMPTY</div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${item.colorName}-${idx}`} className="flex gap-4 animate-in fade-in slide-in-from-right-4 duration-500 ease-out">
                    <div className="w-20 aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden border border-black/5">
                      <img src={item.colorImage || item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{item.brand}</p>
                        <h4 className="font-medium text-sm text-black leading-tight mt-1 line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-gray-500 font-mono mt-1">Size: {item.size} {item.colorName ? `| Color: ${item.colorName}` : ''}</p>
                        <p className="text-black font-semibold text-sm mt-1">{item.price.toFixed(2)} {item.currency}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">QTY: {item.quantity}</span>
                        <button onClick={() => removeFromCart(item.id, item.size, item.colorName)} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors duration-300 ease-out uppercase">REMOVE</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between font-bold text-lg mb-6 text-black">
                  <span className="uppercase text-sm">TOTAL</span><span>{cartTotal.toFixed(2)} EUR</span>
                </div>
                <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-black/80 transition-all duration-500 ease-out shadow-lg shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5 active:translate-y-0">
                  CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* РОУТЕР */}
      <main className="flex-1 w-full">
        {currentRoute === 'home' && <HomePage onNavigate={setCurrentRoute} onProductClick={setSelectedProduct} setActiveBrand={setActiveBrandFilter} />}
        {currentRoute === 'catalog' && <CatalogPage onProductClick={setSelectedProduct} activeBrand={activeBrandFilter} setActiveBrand={setActiveBrandFilter} />}
        {currentRoute === 'brands' && <BrandsPage onNavigate={setCurrentRoute} setActiveBrand={setActiveBrandFilter} />}
      </main>

      {/* НИЖНЕЕ МЕНЮ (Liquid Glass) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="relative flex items-center gap-8 sm:gap-12 px-8 py-3.5 rounded-2xl transition-transform duration-500 ease-out">
          
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)] pointer-events-none"></div>
          
          <button onClick={() => { setCurrentRoute('home'); setActiveBrandFilter('ALL'); }} className="group flex flex-col items-center gap-1 focus:outline-none relative z-10 transition-transform duration-300 active:scale-95">
            <span className={`font-serif text-lg font-bold uppercase tracking-tighter transition-colors duration-500 ease-out ${currentRoute === 'home' ? 'text-black' : 'text-black/50 hover:text-black/80'}`}>
              AUREN
            </span>
            {currentRoute === 'home' && <span className="absolute -bottom-1.5 w-3 h-1 bg-black rounded-full animate-in zoom-in duration-300 ease-out" />}
          </button>

          <button onClick={() => { setCurrentRoute('catalog'); setActiveBrandFilter('ALL'); }} className="group flex flex-col items-center gap-1 focus:outline-none relative z-10 transition-transform duration-300 active:scale-95">
            <GridIcon active={currentRoute === 'catalog'} />
            {currentRoute === 'catalog' && <span className="absolute -bottom-1.5 w-3 h-1 bg-black rounded-full animate-in zoom-in duration-300 ease-out" />}
          </button>

          <button onClick={() => setCurrentRoute('brands')} className="group flex flex-col items-center gap-1 focus:outline-none relative z-10 transition-transform duration-300 active:scale-95">
            <BrandsIcon active={currentRoute === 'brands'} />
            {currentRoute === 'brands' && <span className="absolute -bottom-1.5 w-3 h-1 bg-black rounded-full animate-in zoom-in duration-300 ease-out" />}
          </button>

          <button onClick={() => setIsCartOpen(true)} className="group flex flex-col items-center gap-1 focus:outline-none relative z-10 transition-transform duration-300 active:scale-95">
            <CartIcon active={isCartOpen} count={cartCount} />
          </button>
          
        </nav>
      </div>

    </div>
  );
}
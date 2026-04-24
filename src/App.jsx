import React, { useState, useEffect, useRef } from 'react';

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

const SearchIcon = ({ active, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className={className || `transition-all duration-500 ease-out ${active ? 'text-black' : 'text-black/50 hover:text-black/80'}`}>
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
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- BRANDS DATA ---
const FEATURED_BRANDS = [
  { name: "GUESS", image: "https://images.unsplash.com/photo-1511130558090-00af810c2111?w=800&q=80" },
  { name: "NIKE", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" },
  { name: "BALENCIAGA", image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80" },
  { name: "VETEMENTS", image: "https://images.unsplash.com/photo-1509506489701-5e5d338cc01b?w=800&q=80" },
];

const ALL_BRANDS_LIST = [
  "1017 ALYX 9SM", "A-COLD-WALL*", "ACNE STUDIOS", "ADIDAS ORIGINALS", "ALEXANDER MCQUEEN", "AMIRI", "A.P.C.", "ASICS", 
  "BALENCIAGA", "BALMAIN", "BOTTEGA VENETA", "BURBERRY", "CARHARTT WIP", "COMME DES GARÇONS", "COMMON PROJECTS", "COPERNI", "CRAIG GREEN",
  "DIOR", "DRKSHDW", "DRIES VAN NOTEN", "FEAR OF GOD", "FENDI", "GIVENCHY", "GUCCI", "GUESS", "HELMUT LANG", "HERON PRESTON", 
  "ISSEY MIYAKE", "JACQUEMUS", "JIL SANDER", "JUNYA WATANABE", "KENZO", "LOEWE", "LOUIS VUITTON", "MAISON MARGIELA", "MARNI", "MARTINE ROSE", "MONCLER", 
  "NEW BALANCE", "NIKE", "OFF-WHITE", "OUR LEGACY", "PALM ANGELS", "PRADA", "PUMA", "RAF SIMONS", "REPRESENT", "RICK OWENS", 
  "SACAI", "SAINT LAURENT", "SALOMON", "STONE ISLAND", "STÜSSY", "THOM BROWNE", "TOM FORD", "UNDERCOVER", "VALENTINO", "VERSACE", "VETEMENTS", "Y-3", "YEEZY", "YOHJI YAMAMOTO"
];

// --- URL COMPRESSION ENGINE ---
const n = (ids, t, u='9ddf04c7-2a9a-4d76-add1-d15af8f0263d') => ids.split(',').map(id => `https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_${u},c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/${id}/${t}.png`);
const nby = (ids, t) => ids.split(',').map(id => `https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/${id}/${t}.png`); 
const nr = (ids, path) => ids.split(',').map(id => `https://static.nike.com/a/images/w_960,q_auto,f_auto/${id}/${path}.jpg`);

// АВТОМАТИЧЕСКИЙ ЗАГРУЗЧИК ВСЕХ 5 РАКУРСОВ (0, 1, 2, 3, GHOST) ДЛЯ GUESS
const g = (b, v = '0,1,2,3,GHOST') => v.split(',').map(x => `https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_850,ar_2:3,c_fill/v1/EU/Style/ECOMM/${b}${x==='0'?'':(x==='GHOST'?'-ALTGHOST':'-ALT'+x)}`);

// --- MASSIVE PRODUCTS DATABASE (192 ITEMS) ---
const MOCK_PRODUCTS = [
  // NIKE SNEAKERS
  { id: "n1", brand: "NIKE", title: "Air Max 95 Big Bubble 'OG'", price: 189.99, currency: "EUR", isNew: true, type: "footwear", gender: "Unisex", description: "The classic silhouette updated with the Big Bubble treatment.", colors: [{ name: "Neon", hex: "#808080", images: n('d68f96e7-3ed5-4e9b-92f3-24b882dcf7ff,8e879123-27a1-4655-b4fe-e402f1a9ad91', 'NIKE+AIR+MAX+95+BIG+BUBBLE') }] },
  { id: "n2", brand: "NIKE", title: "Air Max 95 (Blue)", price: 189.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "The classic silhouette.", colors: [{ name: "Blue", hex: "#4682B4", images: n('145b963f-0daa-4ca4-8926-f5490bcd44d0,839f4c37-89c3-4ae1-88fe-72d620015732', 'NIKE+AIR+MAX+95+BIG+BUBBLE') }] },
  { id: "n3", brand: "NIKE", title: "Air Max Plus", price: 189.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "Tuned Air technology meets striking design.", colors: [{ name: "Sunset", hex: "#FF4500", images: n('864e8ab9-fc7c-4338-8548-4405b3f9fae6,13c18a7e-e0ae-4665-ab2e-657baa05aff4', 'NIKE+AIR+MAX+PLUS') }] },
  { id: "n4", brand: "NIKE", title: "Air Max Plus (Black)", price: 189.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "Tuned Air technology meets striking design.", colors: [{ name: "Black", hex: "#000000", images: n('877d30e7-4880-46f8-aa71-6704eb7d944d,d6ad9c1a-9872-4a92-8a03-2297d2ed718c', 'AIR+MAX+PLUS') }] },
  { id: "n5", brand: "NIKE", title: "Air Max 90", price: 149.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "The classic '90s running shoe returns.", colors: [{ name: "White/Black", hex: "#FFFFFF", images: n('51e86060-5beb-4bf3-8a79-c39dff901b71,a8e96bce-b844-4e05-9b70-cd817d1d6f58', 'NIKE+AIR+MAX+90') }] },
  { id: "n6", brand: "NIKE", title: "Air Max 90 (Triple White)", price: 149.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "The classic '90s running shoe returns.", colors: [{ name: "Triple White", hex: "#F5F5DC", images: n('m55is6buar3k4isirw0k,culmdogjo0i7gdgx4l0x', 'AIR+MAX+90') }] },
  { id: "n7", brand: "NIKE", title: "Air Max TL 2.5", price: 179.99, currency: "EUR", isNew: true, type: "footwear", gender: "Unisex", description: "Performance running silhouette updated for the streets.", colors: [{ name: "Black/Volt", hex: "#00FF00", images: n('1c628e20-1ccc-4699-830b-be7dd14ca702,ce002430-3f82-447d-9189-5b266a3f1162', 'AIR+MAX+TL+2.5') }] },
  { id: "n8", brand: "NIKE", title: "Air Max 90 LTR", price: 149.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "Leather updates on the classic 90s silhouette.", colors: [{ name: "White LTR", hex: "#FFFFFF", images: n('7b6ccd0a-2e86-4fac-8f13-a0d11c5f90df,2444723d-eafc-43e1-9a54-3f9d3d829d51', 'AIR+MAX+90+LTR') }] },
  { id: "n9", brand: "NIKE", title: "Air Max 90 By You", price: 169.99, currency: "EUR", isNew: true, type: "footwear", gender: "Unisex", description: "Customized Air Max 90 variations.", colors: [{ name: "Custom 1", hex: "#FFB6C1", images: nby('0bd7e3c7-2680-444b-8ba3-3a6cff7b39ae,6ee73b1b-6306-4612-a154-bac88930c818', 'AIR+MAX+90+NBY') }] },
  { id: "n10", brand: "NIKE", title: "Giannis Immortality 4", price: 89.99, currency: "EUR", isNew: true, type: "footwear", gender: "Men", description: "Channel your inner Freak.", colors: [{ name: "White/Gold", hex: "#FFD700", images: n('66fbd201-52a8-4f79-b934-239a63f53010,2ad22bbe-6325-48b0-a626-d02d827ab994', 'GIANNIS+IMMORTALITY+4') }] },
  { id: "n11", brand: "NIKE", title: "Luka 77", price: 99.99, currency: "EUR", isNew: true, type: "footwear", gender: "Unisex", description: "Designed for #77 himself.", colors: [{ name: "White/Blue", hex: "#FFFFFF", images: n('55966ea1-f940-4331-b9e9-21d8d5912089,8e906965-d415-417f-9d3f-1457709d4b4b', 'JORDAN+LUKA+77', '126ab356-44d8-4a06-89b4-fcdcc8df0245') }] },
  { id: "n12", brand: "NIKE", title: "Air Max Plus x HOMECOMING", price: 189.99, currency: "EUR", isNew: true, type: "footwear", gender: "Unisex", description: "Exclusive Pan African collaboration.", colors: [{ name: "Black/Red", hex: "#000000", images: nr('3dd77758-185b-49f8-91c7-b58e8dbf0ae2,2a8dab5e-f423-45f7-8468-6015ec869da2', 'air-max-plus-x-homecoming-pan-african-black-and-university-red-im4960-001-releasedatum') }] },
  { id: "n13", brand: "NIKE", title: "Air Max Plus VII", price: 189.99, currency: "EUR", isNew: true, type: "footwear", gender: "Men", description: "The evolution of Tuned Air continues.", colors: [{ name: "Grey/Blue", hex: "#808080", images: n('99873a41-7923-40be-b007-d23bdb0b47bf,d4522804-2620-413d-bc46-748ec3755abc', 'NIKE+AIR+MAX+PLUS+VII') }] },
  { id: "n14", brand: "NIKE", title: "Air Max Moto 2K", price: 129.99, currency: "EUR", isNew: true, type: "footwear", gender: "Men", description: "Y2K aesthetics meet modern Air Max comfort.", colors: [{ name: "Silver", hex: "#C0C0C0", images: n('70401754-e771-4e93-b29e-bc19344e1a7d,a6acb734-6df2-4e7b-ab8a-91b5478bf28a', 'NIKE+AIR+MAX+MOTO+2K') }] },
  { id: "n15", brand: "NIKE", title: "Air Max Muse x Veneda", price: 159.99, currency: "EUR", isNew: true, type: "footwear", gender: "Women", description: "Exclusive collaboration drop.", colors: [{ name: "Racer Blue", hex: "#0000FF", images: nr('3c37bd39-56b7-4bb8-9b13-5620a69eaaa2,4b65c376-cf7a-4a7a-b264-f2c58224da61', 'air-max-muse-x-veneda-racer-blue') }] },
  { id: "n16", brand: "NIKE", title: "Air Max Plus BG", price: 144.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "Classic Tuned Air style.", colors: [{ name: "Grey/Blue", hex: "#808080", images: n('efa2fb35-2ace-47e0-985b-4c5a003148ad,ca45b45a-97c8-4d63-ab64-44b316b48ade', 'AIR+MAX+PLUS+BG') }] },
  { id: "n17", brand: "NIKE", title: "Air Max 90 Premium", price: 159.99, currency: "EUR", isNew: false, type: "footwear", gender: "Women", description: "Premium materials.", colors: [{ name: "Multicolor", hex: "#E5E4E2", images: n('64fcfeb6-d406-4906-8696-181050f5ae38,24dcc475-2f58-440b-a9ac-98f84dc74133', 'WMNS+AIR+MAX+90') }] },
  { id: "n18", brand: "NIKE", title: "Air Max Plus (Olive)", price: 189.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "Tuned Air technology.", colors: [{ name: "Olive", hex: "#556B2F", images: n('5ebdcaf2-7fd5-4896-a69d-ea29479ee476,c3433089-f244-4b31-8156-6a34ea55bd3b', 'WMNS+AIR+MAX+PLUS') }] },
  { id: "n19", brand: "NIKE", title: "Air Max Plus (Light Blue)", price: 189.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "Tuned Air technology.", colors: [{ name: "Light Blue", hex: "#ADD8E6", images: n('1fbed67c-5603-4dbf-bd16-4dc38b686cc9,583f732d-0ced-47c3-b0e7-2441664f8f17', 'W+AIR+MAX+PLUS') }] },
  { id: "n20", brand: "NIKE", title: "Air Max 90 (Triple White)", price: 149.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "Classic running shoe.", colors: [{ name: "Triple White", hex: "#F5F5DC", images: n('m55is6buar3k4isirw0k,culmdogjo0i7gdgx4l0x', 'AIR+MAX+90') }] },
  { id: "n21", brand: "NIKE", title: "Air Max 90 (Cream/Tan)", price: 149.99, currency: "EUR", isNew: false, type: "footwear", gender: "Unisex", description: "Classic running shoe.", colors: [{ name: "Cream/Tan", hex: "#D2B48C", images: n('4c04cc33-aa3d-4e82-a39e-dc6ce37974ce,d6fee385-8e66-45a0-b13f-c3a64088f78c', 'NIKE+AIR+MAX+90+PRM') }] },
  { id: "n22", brand: "NIKE", title: "Giannis Immortality 4 (Grey)", price: 89.99, currency: "EUR", isNew: true, type: "footwear", gender: "Men", description: "Channel your inner Freak.", colors: [{ name: "Grey/Blue", hex: "#808080", images: n('625b5e77-31b9-4dbd-8286-f31e425ca5ab,b2879d67-1389-4dc2-ba24-995c1951607f', 'GIANNIS+IMMORTALITY+4') }] },
  { id: "n23", brand: "NIKE", title: "Luka 77 (Grey/Green)", price: 99.99, currency: "EUR", isNew: true, type: "footwear", gender: "Unisex", description: "Designed for #77 himself.", colors: [{ name: "Grey/Green", hex: "#808080", images: n('7c50f920-f17f-4025-911e-a883011ecd04,7ab3642f-6c2e-40d2-9668-ee03e2a92e38', 'JORDAN+LUKA+77', '126ab356-44d8-4a06-89b4-fcdcc8df0245') }] },

  // GUESS APPAREL (Now fetching up to 5 images per color variation automatically)
  { id: "g1", brand: "GUESS", title: "Boxy Iconic T-Shirt", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Classic boxy fit.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W4YI73K8HM0-G011') }] },
  { id: "g2", brand: "GUESS", title: "T-Shirt kleines Logo-Dreieck", price: 30.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Minimalist t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('M2YI36I3Z14-JBLK') }, { name: "White", hex: "#FFFFFF", images: g('M2YI36I3Z14-G011') }] },
  { id: "g3", brand: "GUESS", title: "Scuba-Poloshirt-Sweatshirt", price: 79.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Modern scuba-fabric polo.", colors: [{ name: "Black", hex: "#000000", images: g('W6RQ05KD122-JBLK') }] },
  { id: "g4", brand: "GUESS", title: "Langarm-T-Shirt Waffelmuster", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Comfortable waffle-knit long sleeve.", colors: [{ name: "Black", hex: "#000000", images: g('M4BI77KCII1-JBLK') }] },
  { id: "g5", brand: "GUESS", title: "Besticktes T-Shirt", price: 55.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium embroidered t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('M6GI13K2995-JBLK') }] },
  { id: "g6", brand: "GUESS", title: "T-Shirt Print", price: 27.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Statement print t-shirt.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('W5BI50KA0Q1-G9L9') }] },
  { id: "g7", brand: "GUESS", title: "Oversized T-Shirt Mini-Patch", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Oversized fit t-shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YI46K8FQ4-G011') }] },
  { id: "g8", brand: "GUESS", title: "Triangel-Logo Stretch-T-Shirt", price: 30.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Stretch t-shirt with classic triangle logo.", colors: [{ name: "Grey", hex: "#808080", images: g('W2YI45J1314-LMGY') }] },
  { id: "g9", brand: "GUESS", title: "Rippstrick-Tanktop", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Essential ribbed knit tank top.", colors: [{ name: "Black", hex: "#000000", images: g('W5YR10Z0130-JBLK') }] },
  { id: "g10", brand: "GUESS", title: "Floral-Print Crop Top", price: 70.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Vibrant floral-print crop top.", colors: [{ name: "Multi Brown", hex: "#8B4513", images: g('W5GH74WH9Z2-PMIC') }] },
  { id: "g11", brand: "GUESS", title: "Wildleder-Minirock", price: 99.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Premium suede mini skirt.", colors: [{ name: "Green", hex: "#008000", images: g('W6PD2CWV110-G8B6') }] },
  { id: "g12", brand: "GUESS", title: "Strick-T-Shirt", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Textured knit t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('M6RP14KD461-JBLK') }] },
  { id: "g13", brand: "GUESS", title: "Besticktes Logo Tanktop", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Tank top with delicate logo embroidery.", colors: [{ name: "Light Blue", hex: "#ADD8E6", images: g('W6GPZ8KF641-G7K2') }] },
  { id: "g14", brand: "GUESS", title: "Rhinestone Tanktop", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Elegant tank top embellished with sparkling rhinestones.", colors: [{ name: "Water Green", hex: "#20B2AA", images: g('W6GP14K2940-F7YG') }] },
  { id: "g15", brand: "GUESS", title: "Ärmelloses Pullover-Top", price: 70.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Versatile sleeveless sweater top.", colors: [{ name: "White Multi", hex: "#FDF5E6", images: g('V6GR02Z0723-A10F') }] },
  { id: "g16", brand: "GUESS", title: "Gestreifte Wide Leg Hose", price: 65.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Multicolor pattern striped wide-leg pants.", colors: [{ name: "Multi", hex: "#E5E4E2", images: g('W5YB73KK620-F11C') }] },
  { id: "g17", brand: "GUESS", title: "Sweatshirt mit gesticktem Logo", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Comfortable sweatshirt featuring classic embroidered front logo.", colors: [{ name: "Light Blue", hex: "#ADD8E6", images: g('V6RQ03KD761-G7HP') }] },
  { id: "g18", brand: "GUESS", title: "T-Shirt mit Logo-Strasssteinen", price: 40.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "T-shirt featuring sparkling rhinestones logo.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6RI24J1314-G011') }] },
  { id: "g19", brand: "GUESS", title: "Logo T-Shirt", price: 45.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Minimalist t-shirt with subtle branding.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('Z6GI07K2852-PMKU') }] },
  { id: "g20", brand: "GUESS", title: "Gestreifte Jeansjacke", price: 139.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Premium striped denim jacket perfect for layering.", colors: [{ name: "Beige multi", hex: "#D2B48C", images: g('M6GN70D7961-GHCK') }] },
  { id: "g21", brand: "GUESS", title: "T-Shirt mit aufgedrucktem Logo", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Classic printed logo t-shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('Z2YI11J1314-SCFY') }] },
  { id: "g22", brand: "GUESS", title: "Gestreiftes Polo", price: 69.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic striped polo shirt.", colors: [{ name: "Green", hex: "#008000", images: g('M6GP00KCOT1-SM0V') }] },
  { id: "g23", brand: "GUESS", title: "Sweatshirt mit Logo-Patch", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable sweatshirt with premium front logo patch.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('M6RQ08KCN01-G7V2') }] },
  { id: "g24", brand: "GUESS", title: "Kleines Logo-T-Shirt", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Everyday essential t-shirt with small chest logo.", colors: [{ name: "Black", hex: "#000000", images: g('M6RI05KBW41-JBLK') }] },
  { id: "g25", brand: "GUESS", title: "Logo Tanktop", price: 55.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Fitted tank top with front logo detail.", colors: [{ name: "Blue", hex: "#0000FF", images: g('V6GP13K3055-G7JX') }] },
  { id: "g26", brand: "GUESS", title: "Gestreiftes T-Shirt", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Multicolor striped t-shirt.", colors: [{ name: "Multi White", hex: "#FDF5E6", images: g('W6GI18K3040-SM1L') }] },
  { id: "g27", brand: "GUESS", title: "T-Shirt mit Strassstein-Logo", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "T-shirt featuring sparkling rhinestones logo.", colors: [{ name: "White", hex: "#FFFFFF", images: g('V3BI11J1314-G011') }] },
  { id: "g28", brand: "GUESS", title: "Bedrucktes Logo-T-Shirt", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Classic printed logo t-shirt in breathable cotton.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M6GIB4K8HM0-G046') }] },
  { id: "g29", brand: "GUESS", title: "Sexy straight Jeans", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Flattering straight-leg jeans in crisp white.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6GA15D0705-PLYC') }] },
  { id: "g30", brand: "GUESS", title: "T-Shirt mit Dreieckslogo", price: 45.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "T-shirt with classic triangle logo.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('W6RI35J1314-G012') }] },
  { id: "g31", brand: "GUESS", title: "Kurz geschnittene Jacke", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Cropped jacket with full front zip.", colors: [{ name: "Blue", hex: "#0000FF", images: g('V6RQ17KD822-G7F3') }] },
  { id: "g32", brand: "GUESS", title: "Kapuzenpullover mit aufgedrucktem Logo", price: 79.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable hooded sweatshirt with printed logo.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M6RQ26KCPR1-G046') }] },
  { id: "g33", brand: "GUESS", title: "Cargo Shorts", price: 80.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Utilitarian cargo shorts perfect for exploring the city.", colors: [{ name: "Black", hex: "#000000", images: g('Z6GD01K2836-JBLK') }] },
  { id: "g34", brand: "GUESS", title: "T-Shirt mit Frontlogo", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Simple everyday t-shirt with subtle front logo.", colors: [{ name: "White", hex: "#FFFFFF", images: g('V6RI04K8FQ4-G011') }] },
  { id: "g35", brand: "GUESS", title: "Oversized American Tradition T-Shirt", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Vintage inspired graphic t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('W4YI08K8HM0-JBLK') }] },
  { id: "g36", brand: "GUESS", title: "Owen relaxed Jeans", price: 120.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Comfortable relaxed fit jeans.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('M6GAT5D1113-ES12') }] },
  { id: "g37", brand: "GUESS", title: "Oversized Iconic Sweatshirt", price: 69.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium oversized sweatshirt with bold iconic branding.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YQ21K9V31-G011') }] },
  { id: "g38", brand: "GUESS", title: "Slim American Tradition Langarm-T-Shirt", price: 39.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic slim long-sleeve t-shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YI54K8HM0-G011') }] },
  { id: "g39", brand: "GUESS", title: "Ärmelloses Smocked-Top", price: 60.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Chic sleeveless smocked top.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6GP40K3256-G1O6') }] },
  { id: "g40", brand: "GUESS", title: "Spitzen-Dreieck-Logo T-Shirt", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Elegant t-shirt with lace triangle logo.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6GI52K5423-G011') }] },
  { id: "g41", brand: "GUESS", title: "Pack mit 3 Boxershorts", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable pack of 3 everyday boxers.", colors: [{ name: "Multi", hex: "#E5E4E2", images: g('U97G01KCD31-F017') }] },
  { id: "g42", brand: "GUESS", title: "Schmal geschnittene Chinohosen", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic slim-fit chinos for any occasion.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('M5BB75WHHO2-A90N') }] },
  { id: "g43", brand: "GUESS", title: "Cardigan mit Reißverschluss vorn", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Modern cardigan with front zip closure.", colors: [{ name: "Black", hex: "#000000", images: g('W4BR88Z3BH0-JBLK') }] },
  { id: "g44", brand: "GUESS", title: "Overshirt aus Baumwollmischung", price: 120.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Versatile cotton-blend overshirt for layering.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('M6GH64W1914-G018') }] },
  { id: "g45", brand: "GUESS", title: "Polo-Pullover", price: 90.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Refined knitted polo sweater.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('M6GR05Z0558-G7V2') }] },
  { id: "g46", brand: "GUESS", title: "Reguläre Passform Badehosen", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic swim trunks for summer.", colors: [{ name: "Black", hex: "#000000", images: g('F6GT24WG282-JBLK') }] },
  { id: "g47", brand: "GUESS", title: "Jersey T-Shirt", price: 60.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium jersey t-shirt with embroidered detail.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('M6GP29K3188-G047') }] },
  { id: "g48", brand: "GUESS", title: "Slim-Fit-Hemd", price: 70.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Elegant slim fit shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M1YH20W7ZK1-G011') }] },
  { id: "g49", brand: "GUESS", title: "Übergroßes Popeline-Hemd", price: 90.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Crisp oversized poplin shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6GH54W1979-G011') }] },
  { id: "g50", brand: "GUESS", title: "Socken Logodreieck", price: 12.00, currency: "EUR", isNew: false, type: "accessory", gender: "Unisex", description: "Premium comfortable socks.", colors: [{ name: "White", hex: "#FFFFFF", images: g('V2GZ00ZZ00I-G011') }] },
  { id: "g51", brand: "GUESS", title: "Marciano Leinenmischung Weste", price: 180.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Elegant Marciano vest in a premium linen blend.", colors: [{ name: "Brown", hex: "#A52A2A", images: g('G6GH26W2218-F12W') }] },
  { id: "g52", brand: "GUESS", title: "Häkelhemd", price: 55.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Trendy crochet shirt, perfect for summer days.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M3YH58WFIM0-F0F8') }] },
  { id: "g53", brand: "GUESS", title: "4G Logo Bikini-Höschen", price: 65.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Classic 4G logo bikini bottom.", colors: [{ name: "Multi Brown", hex: "#8B4513", images: g('E6GO15KCUO2-G1FA') }] },
  { id: "g54", brand: "GUESS", title: "Jewel string Bikini-Höschen", price: 65.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Jewel string bikini bottom.", colors: [{ name: "Black", hex: "#000000", images: g('E6GO10KF590-JBLK') }] },
  { id: "g55", brand: "GUESS", title: "Boxy T-Shirt mit Logo", price: 45.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Boxy t-shirt with classic logo.", colors: [{ name: "Multi Black", hex: "#1C1C1C", images: g('V4YI06I3Z14-FJ8N') }] },
  { id: "g56", brand: "GUESS", title: "1981 Skinny Jeans", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Classic skinny jeans in light blue.", colors: [{ name: "Light Blue", hex: "#ADD8E6", images: g('W2YA46D4Q01-CLH1') }] },
  { id: "g57", brand: "GUESS", title: "Denim-Crop-Top", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Trendy denim crop top.", colors: [{ name: "Light Blue", hex: "#ADD8E6", images: g('W6GHAGD1705-KBLE') }] },
  { id: "g58", brand: "GUESS", title: "Slim Fit Stricktop", price: 60.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Slim fit knit top.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('W6GP09K2931-A11C') }] },
  { id: "g59", brand: "GUESS", title: "Sweatshirt mit Logoband", price: 110.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Sweatshirt with stylish logo band.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('W6GQ03K2656-G7V2') }] },
  { id: "g60", brand: "GUESS", title: "Seamless Leggings mit seitlichem Band", price: 70.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Comfortable seamless leggings.", colors: [{ name: "Black", hex: "#000000", images: g('V6GB07K2998-JBLK') }] },
  { id: "g61", brand: "GUESS", title: "Angels Chino Hosen", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic chino pants.", colors: [{ name: "Braun", hex: "#8B4513", images: g('M6RB16WK38A-G1DY') }] },
  { id: "g62", brand: "GUESS", title: "Marciano geflochtenes Viskose-Top", price: 120.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Premium Marciano viscose top.", colors: [{ name: "Braun", hex: "#8B4513", images: g('G6GR21Z0758-G1EV') }] },
  { id: "g63", brand: "GUESS", title: "Bedruckte Hemdjacke", price: 49.50, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Printed versatile overshirt.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('M5BH39WFKE2-P7US') }] },
  { id: "g64", brand: "GUESS", title: "Relaxed Jeans mit Print", price: 90.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Printed relaxed fit jeans.", colors: [{ name: "Blau", hex: "#0000FF", images: g('M5YA82D0212-D0GR') }] },
  { id: "g65", brand: "GUESS", title: "Regular-Fit T-Shirt", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Essential regular fit t-shirt.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('Z6RI17I3Z14-G7R1') }] },
  { id: "g66", brand: "GUESS", title: "Jacquard Logo T-Shirt", price: 70.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium jacquard logo t-shirt.", colors: [{ name: "Multi Beige", hex: "#F5F5DC", images: g('M6GP34K3200-FMAZ') }] },
  { id: "g67", brand: "GUESS", title: "Mid Waist Baggy Jeans", price: 350.00, currency: "EUR", isNew: false, type: "clothing", gender: "Unisex", description: "Premium baggy denim.", colors: [{ name: "Blau", hex: "#0000FF", images: g('W5GA1HD4S1C-GUBT') }] },
  { id: "g68", brand: "GUESS", title: "Satin-Top", price: 70.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Elegant satin top.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('W6RH55WJ732-F12S') }] },
  { id: "g69", brand: "GUESS", title: "Rippstrick-Top", price: 40.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Comfortable ribbed knit top.", colors: [{ name: "Hellgrün", hex: "#90EE90", images: g('W6RP39KD092-A70M') }] },
  { id: "g70", brand: "GUESS", title: "T-Shirt Logostickerei", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium logo embroidery.", colors: [{ name: "Weiss", hex: "#FFFFFF", images: g('M4YI44K8FQ4-G011') }] },
  { id: "g71", brand: "GUESS", title: "Spitzenpullover", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Elegant lace detailed pullover.", colors: [{ name: "Schwarz", hex: "#000000", images: g('W6GZ01Z0606-JBLK') }] },
  
  // SPECIFIC UNPACKED COLORS 
  { id: "g106", brand: "GUESS", title: "Boxy Iconic T-Shirt (Weiß)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Classic boxy fit iconic t-shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W4YI73K8HM0-G011') }] },
  { id: "g107", brand: "GUESS", title: "T-Shirt kleines Logo-Dreieck (Hellbraun)", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Minimalist t-shirt with small triangle logo detail.", colors: [{ name: "Light Brown", hex: "#D2B48C", images: g('M4YI0AKCCM1-G1CA') }] },
  { id: "g108", brand: "GUESS", title: "T-Shirt kleines Logo-Dreieck (Weiß)", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Minimalist t-shirt with small triangle logo detail.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YI0AKCCM1-G011') }] },
  { id: "g109", brand: "GUESS", title: "Scuba-Poloshirt-Sweatshirt (Schwarz)", price: 79.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Modern scuba-fabric polo sweatshirt.", colors: [{ name: "Black", hex: "#000000", images: g('W6RQ05KD122-JBLK') }] },
  { id: "g110", brand: "GUESS", title: "Langarm-T-Shirt Waffelmuster (Schwarz)", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Comfortable waffle-knit long sleeve t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('M4BI77KCII1-JBLK') }] },
  { id: "g111", brand: "GUESS", title: "Langarm-T-Shirt Waffelmuster (Creme)", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Comfortable waffle-knit long sleeve t-shirt.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('M4BI77KCII1-G053') }] },
  { id: "g112", brand: "GUESS", title: "Besticktes T-Shirt (Schwarz)", price: 55.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium embroidered t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('M6GI13K2995-JBLK') }] },
  { id: "g113", brand: "GUESS", title: "Besticktes T-Shirt (Weiß)", price: 55.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium embroidered t-shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M6GI13K2995-G011') }] },
  { id: "g114", brand: "GUESS", title: "T-Shirt Print (Creme)", price: 27.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Statement print t-shirt.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('W5BI50KA0Q1-G9L9') }] },
  { id: "g115", brand: "GUESS", title: "Oversized T-Shirt Mini-Patch (Weiß)", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Oversized fit t-shirt with mini patch.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YI46K8FQ4-G011') }] },
  { id: "g116", brand: "GUESS", title: "Kurz geschnittene Jacke (Blau)", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Cropped jacket with full front zip.", colors: [{ name: "Blue", hex: "#0000FF", images: g('V6RQ17KD822-G7F3') }] },
  { id: "g117", brand: "GUESS", title: "Kurz geschnittene Jacke (Beige)", price: 99.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Cropped jacket with full front zip.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('V6RQ17KD822-G1O3') }] },
  { id: "g118", brand: "GUESS", title: "Kapuzenpullover mit Logo (Weiß)", price: 79.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable hooded sweatshirt with printed logo.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M6RQ26KCPR1-G046') }] },
  { id: "g119", brand: "GUESS", title: "Kapuzenpullover mit Logo (Blau)", price: 79.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable hooded sweatshirt with printed logo.", colors: [{ name: "Blue", hex: "#0000FF", images: g('M6RQ26KCPR1-BLN') }] },
  { id: "g120", brand: "GUESS", title: "Cargo Shorts (Schwarz)", price: 80.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Utilitarian cargo shorts.", colors: [{ name: "Black", hex: "#000000", images: g('Z6GD01K2836-JBLK') }] },
  { id: "g121", brand: "GUESS", title: "Cargo Shorts (Beige)", price: 80.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Utilitarian cargo shorts.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('Z6GD01K2836-G9I0') }] },
  { id: "g122", brand: "GUESS", title: "T-Shirt mit Frontlogo (Weiß)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Simple everyday t-shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('V6RI04K8FQ4-G011') }] },
  { id: "g123", brand: "GUESS", title: "T-Shirt mit Frontlogo (Blau)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Simple everyday t-shirt.", colors: [{ name: "Blue", hex: "#0000FF", images: g('V6RI04K8FQ4-G7F3') }] },
  { id: "g124", brand: "GUESS", title: "T-Shirt 4G-Logoprint (Grey)", price: 22.50, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Premium t-shirt featuring 4G logo.", colors: [{ name: "Grey", hex: "#808080", images: g('M5BI72I3Z14-G969') }] },
  { id: "g125", brand: "GUESS", title: "Owen relaxed Jeans (Creme)", price: 120.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Comfortable relaxed fit jeans.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('M6GAT5D1113-ES12') }] },
  { id: "g126", brand: "GUESS", title: "Oversized Iconic Sweatshirt (Weiß)", price: 69.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium oversized sweatshirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YQ21K9V31-G011') }] },
  { id: "g127", brand: "GUESS", title: "Oversized Iconic Sweatshirt (Schwarz)", price: 69.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium oversized sweatshirt.", colors: [{ name: "Black", hex: "#000000", images: g('M4YQ21K9V31-JBLK') }] },
  { id: "g128", brand: "GUESS", title: "Oversized Iconic Sweatshirt (Dunkelblau)", price: 69.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium oversized sweatshirt.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('M4YQ21K9V31-A71W') }] },
  { id: "g129", brand: "GUESS", title: "Oversized Iconic Sweatshirt (Grau)", price: 69.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium oversized sweatshirt.", colors: [{ name: "Grey", hex: "#808080", images: g('M4YQ21K9V31-H90Z') }] },
  { id: "g130", brand: "GUESS", title: "Slim American Tradition T-Shirt (Weiß)", price: 39.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic slim long-sleeve t-shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YI54K8HM0-G011') }] },
  { id: "g131", brand: "GUESS", title: "Slim American Tradition T-Shirt (Schwarz)", price: 39.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic slim long-sleeve t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('M4YI54K8HM0-JBLK') }] },
  { id: "g132", brand: "GUESS", title: "Slim American Tradition T-Shirt (Dunkelblau)", price: 39.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic slim long-sleeve t-shirt.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('M4YI54K8HM0-A71W') }] },
  { id: "g133", brand: "GUESS", title: "Ärmelloses Smocked-Top (Weiß)", price: 60.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Chic sleeveless smocked top.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6GP40K3256-G1O6') }] },
  { id: "g134", brand: "GUESS", title: "Spitzen-Dreieck-Logo T-Shirt (Weiß)", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Elegant t-shirt with lace triangle logo.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6GI52K5423-G011') }] },
  { id: "g135", brand: "GUESS", title: "Spitzen-Dreieck-Logo T-Shirt (Hellblau)", price: 45.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Elegant t-shirt with lace triangle logo.", colors: [{ name: "Light Blue", hex: "#ADD8E6", images: g('W6GI52K5423-A719') }] },
  { id: "g136", brand: "GUESS", title: "Rhinestone Tanktop (Olivgrün)", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Tank top embellished with sparkling rhinestones.", colors: [{ name: "Olive Green", hex: "#556B2F", images: g('W6GP14K2940-F84O') }] },
  { id: "g137", brand: "GUESS", title: "Rhinestone Tanktop (Beige)", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Tank top embellished with sparkling rhinestones.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('W6GP14K2940-F1CY') }] },
  { id: "g138", brand: "GUESS", title: "Rhinestone Tanktop (Wassergrün)", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Tank top embellished with sparkling rhinestones.", colors: [{ name: "Water Green", hex: "#20B2AA", images: g('W6GP14K2940-F7YG') }] },
  { id: "g139", brand: "GUESS", title: "Pack mit 3 Boxershorts (Multicolor)", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable pack of 3 everyday boxers.", colors: [{ name: "Multi", hex: "#E5E4E2", images: g('U97G01KCD31-F017') }] },
  { id: "g140", brand: "GUESS", title: "Pack mit 3 Boxershorts (Multi Blue)", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable pack of 3 everyday boxers.", colors: [{ name: "Multi Blue", hex: "#4682B4", images: g('U97G01KCD31-HE90') }] },
  { id: "g141", brand: "GUESS", title: "Pack mit 3 Boxershorts (Multi Black)", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable pack of 3 everyday boxers.", colors: [{ name: "Multi Black", hex: "#1C1C1C", images: g('U97G01KCD31-FQ90') }] },
  { id: "g142", brand: "GUESS", title: "Pack mit 3 Boxershorts (Black)", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable pack of 3 everyday boxers.", colors: [{ name: "Black", hex: "#000000", images: g('U97G01KCD31-A996') }] },
  { id: "g143", brand: "GUESS", title: "Pack mit 3 Boxershorts (Multi White)", price: 40.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Comfortable pack of 3 everyday boxers.", colors: [{ name: "Multi White", hex: "#FDF5E6", images: g('U97G01KCD31-F54Q') }] },
  { id: "g144", brand: "GUESS", title: "Cardigan mit Reißverschluss vorn (Schwarz)", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Modern cardigan with front zip closure.", colors: [{ name: "Black", hex: "#000000", images: g('W4BR88Z3BH0-JBLK') }] },
  { id: "g145", brand: "GUESS", title: "Cardigan mit Reißverschluss vorn (Weiß)", price: 80.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Modern cardigan with front zip closure.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W4BR88Z3BH0-G1O6') }] },
  { id: "g146", brand: "GUESS", title: "Overshirt aus Baumwollmischung (Creme)", price: 120.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Versatile cotton-blend overshirt for layering.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('M6GH64W1914-G018') }] },
  { id: "g147", brand: "GUESS", title: "Polo-Pullover (Dunkelblau)", price: 90.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Refined knitted polo sweater.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('M6GR05Z0558-G7V2') }] },
  { id: "g148", brand: "GUESS", title: "Polo-Pullover (Beige)", price: 90.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Refined knitted polo sweater.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('M6GR05Z0558-G1FG') }] },
  { id: "g149", brand: "GUESS", title: "Reguläre Passform Badehosen (Schwarz)", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic swim trunks for summer.", colors: [{ name: "Black", hex: "#000000", images: g('F6GT24WG282-JBLK') }] },
  { id: "g150", brand: "GUESS", title: "Reguläre Passform Badehosen (Königsblau)", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic swim trunks for summer.", colors: [{ name: "Royal Blue", hex: "#4169E1", images: g('F6GT24WG282-G7M1') }] },
  { id: "g151", brand: "GUESS", title: "Reguläre Passform Badehosen (Weiß)", price: 50.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Classic swim trunks for summer.", colors: [{ name: "White", hex: "#FFFFFF", images: g('F6GT24WG282-G011') }] },
  { id: "g152", brand: "GUESS", title: "Jersey T-Shirt (Creme)", price: 60.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium jersey t-shirt with embroidered detail.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('M6GP29K3188-G047') }] },
  { id: "g153", brand: "GUESS", title: "Jersey T-Shirt (Schwarz)", price: 60.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium jersey t-shirt with embroidered detail.", colors: [{ name: "Black", hex: "#000000", images: g('M6GP29K3188-JBLK') }] },
  { id: "g154", brand: "GUESS", title: "Slim-Fit-Hemd (Weiß)", price: 70.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Elegant slim fit shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M1YH20W7ZK1-G011') }] },
  { id: "g155", brand: "GUESS", title: "Slim-Fit-Hemd (Schwarz)", price: 70.00, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Elegant slim fit shirt.", colors: [{ name: "Black", hex: "#000000", images: g('M1YH20W7ZK1-JBLK') }] },
  { id: "g156", brand: "GUESS", title: "Übergroßes Popeline-Hemd (Weiß)", price: 90.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Crisp oversized poplin shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6GH54W1979-G011') }] },
  { id: "g157", brand: "GUESS", title: "Socken Logodreieck (Weiß)", price: 12.00, currency: "EUR", isNew: false, type: "accessory", gender: "Unisex", description: "Premium comfortable socks.", colors: [{ name: "White", hex: "#FFFFFF", images: g('V2GZ00ZZ00I-G011') }] },
  { id: "g158", brand: "GUESS", title: "T-Shirt 4G-Logoprint (Black)", price: 22.50, currency: "EUR", isNew: false, type: "clothing", gender: "Men", description: "Premium t-shirt featuring the classic 4G logo.", colors: [{ name: "Black", hex: "#000000", images: g('M5BI72I3Z14-JBLK') }] }, 
  { id: "g159", brand: "GUESS", title: "American Tradition T-Shirt (Dunkelblau)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Classic everyday graphic t-shirt.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('M4YI42K8FQ4-A71W') }] },
  { id: "g160", brand: "GUESS", title: "American Tradition T-Shirt (Creme)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Classic everyday graphic t-shirt.", colors: [{ name: "Cream", hex: "#FFFDD0", images: g('M4YI42K8FQ4-G1W7') }] },
  { id: "g161", brand: "GUESS", title: "American Tradition T-Shirt (Grau)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Classic everyday graphic t-shirt.", colors: [{ name: "Grey", hex: "#808080", images: g('M4YI42K8FQ4-H90Z') }] },
  { id: "g162", brand: "GUESS", title: "American Tradition T-Shirt (Schwarz)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Classic everyday graphic t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('M4YI42K8FQ4-JBLK') }] },
  { id: "g163", brand: "GUESS", title: "American Tradition T-Shirt (Weiß)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Classic everyday graphic t-shirt.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YI42K8FQ4-G011') }] },
  { id: "g164", brand: "GUESS", title: "T-Shirt Logostickerei (Weiß)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium logo embroidery.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M4YI44K8FQ4-G011') }] },
  { id: "g165", brand: "GUESS", title: "T-Shirt Logostickerei (Schwarz)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium logo embroidery.", colors: [{ name: "Black", hex: "#000000", images: g('M4YI44K8FQ4-JBLK') }] },
  { id: "g166", brand: "GUESS", title: "T-Shirt Logostickerei (Olivgrün)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium logo embroidery.", colors: [{ name: "Olive Green", hex: "#556B2F", images: g('M4YI44K8FQ4-G8EV') }] },
  { id: "g167", brand: "GUESS", title: "Boxy Logo T-Shirt (Dunkelblau)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Modern boxy fit with statement logo.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('V6GI20K3509-A71W') }] },
  { id: "g168", brand: "GUESS", title: "Boxy Logo T-Shirt (Weiß)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Modern boxy fit with statement logo.", colors: [{ name: "White", hex: "#FFFFFF", images: g('V6GI20K3509-G011') }] },
  { id: "g169", brand: "GUESS", title: "Stretch-T-Shirt mit Triangel-Logo (Schwarz)", price: 30.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Iconic triangle logo on stretch fabric.", colors: [{ name: "Black", hex: "#000000", images: g('W2YI44J1314-JBLK') }] },
  { id: "g170", brand: "GUESS", title: "Stretch-T-Shirt mit Triangel-Logo (Rose)", price: 30.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Iconic triangle logo on stretch fabric.", colors: [{ name: "Rose", hex: "#FFC0CB", images: g('W2YI44J1314-A627') }] },
  { id: "g171", brand: "GUESS", title: "Stretch-T-Shirt mit Triangel-Logo (Himmelblau)", price: 30.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Iconic triangle logo on stretch fabric.", colors: [{ name: "Light Blue", hex: "#ADD8E6", images: g('W2YI44J1314-A72C') }] },
  { id: "g172", brand: "GUESS", title: "Stretch-T-Shirt mit Triangel-Logo (Grau)", price: 30.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Iconic triangle logo on stretch fabric.", colors: [{ name: "Grey", hex: "#808080", images: g('W2YI44J1314-LMGY') }] },
  { id: "g173", brand: "GUESS", title: "Stretch-T-Shirt mit Triangel-Logo (Weiß)", price: 30.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Iconic triangle logo on stretch fabric.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W2YI44J1314-G011') }] },
  { id: "g174", brand: "GUESS", title: "Spitzenpullover (Schwarz)", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Elegant lace detailed pullover.", colors: [{ name: "Black", hex: "#000000", images: g('W6GZ01Z0606-JBLK') }] },
  { id: "g175", brand: "GUESS", title: "Spitzenpullover (Weiß)", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Elegant lace detailed pullover.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W6GZ01Z0606-G011') }] },
  { id: "g176", brand: "GUESS", title: "Satin-Top (Beige)", price: 70.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Elegant satin top.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('W6RH55WJ732-F12S') }] },
  { id: "g177", brand: "GUESS", title: "Satin-Top (Schwarz)", price: 70.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Elegant satin top.", colors: [{ name: "Black", hex: "#000000", images: g('W6RH55WJ732-JBLK') }] },
  { id: "g178", brand: "GUESS", title: "Jacquard Logo T-Shirt (Beige)", price: 70.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium jacquard logo t-shirt.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('M6GP34K3200-FMAZ') }] },
  { id: "g179", brand: "GUESS", title: "Jacquard Logo T-Shirt (Blue)", price: 70.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Premium jacquard logo t-shirt.", colors: [{ name: "Blue", hex: "#4682B4", images: g('M6GP34K3200-FBDB') }] },
  { id: "g180", brand: "GUESS", title: "Regular-Fit T-Shirt (Dunkelblau)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Essential regular fit t-shirt.", colors: [{ name: "Dark Blue", hex: "#00008B", images: g('Z6RI17I3Z14-G7R1') }] },
  { id: "g181", brand: "GUESS", title: "Regular-Fit T-Shirt (Schwarz)", price: 35.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Essential regular fit t-shirt.", colors: [{ name: "Black", hex: "#000000", images: g('Z6RI16I3Z14-JBLK') }] },
  { id: "g182", brand: "GUESS", title: "Wide Leg Hose (Schwarz)", price: 44.50, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Elegant wide-leg pants.", colors: [{ name: "Black", hex: "#000000", images: g('W4BB44WGCV2-JBLK') }] },
  { id: "g183", brand: "GUESS", title: "Wide Leg Hose (Beige)", price: 44.50, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Elegant wide-leg pants.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('W4BB44WGCV2-A117') }] },
  { id: "g184", brand: "GUESS", title: "Hoodie GJ x BVB (Schwarz)", price: 99.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Exclusive collaboration hoodie.", colors: [{ name: "Black", hex: "#000000", images: g('M6RQ26KCPR1-JBLK') }] },
  { id: "g185", brand: "GUESS", title: "Besticktes Logo T-Shirt (Schwarz)", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Subtle embroidered details.", colors: [{ name: "Black", hex: "#000000", images: g('M6GIB7K8HM0-JBLK') }] },
  { id: "g186", brand: "GUESS", title: "Besticktes Logo T-Shirt (Weiß)", price: 29.00, currency: "EUR", isNew: true, type: "clothing", gender: "Men", description: "Subtle embroidered details.", colors: [{ name: "White", hex: "#FFFFFF", images: g('M6GIB7K8HM0-G046') }] },
  { id: "g187", brand: "GUESS", title: "Boxy Logo-T-Shirt (Hellrose)", price: 24.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Everyday boxy fit logo tee.", colors: [{ name: "Light Pink", hex: "#FFB6C1", images: g('W5YI06KCYV2-G6I1') }] },
  { id: "g188", brand: "GUESS", title: "Boxy Logo-T-Shirt (Dunkelbraun)", price: 24.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Everyday boxy fit logo tee.", colors: [{ name: "Brown", hex: "#654321", images: g('W5YI06KCYV2-G1EB') }] },
  { id: "g189", brand: "GUESS", title: "Boxy Logo-T-Shirt (Grün)", price: 24.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Everyday boxy fit logo tee.", colors: [{ name: "Green", hex: "#008000", images: g('W5YI06KCYV2-G8CW') }] },
  { id: "g190", brand: "GUESS", title: "Boxy Logo-T-Shirt (Schwarz)", price: 24.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Everyday boxy fit logo tee.", colors: [{ name: "Black", hex: "#000000", images: g('W5YI06KCYV2-JBLK') }] },
  { id: "g191", brand: "GUESS", title: "Boxy Logo-T-Shirt (Weiß)", price: 24.00, currency: "EUR", isNew: true, type: "clothing", gender: "Women", description: "Everyday boxy fit logo tee.", colors: [{ name: "White", hex: "#FFFFFF", images: g('W5YI06KCYV2-G011') }] },
  { id: "g192", brand: "GUESS", title: "Logo-T-Shirt mit Strasssteinen", price: 35.00, currency: "EUR", isNew: false, type: "clothing", gender: "Women", description: "Soft cotton t-shirt with rhinestone details.", colors: [{ name: "Beige", hex: "#F5F5DC", images: g('W6GI58K6307-G8CJ') }, { name: "White", hex: "#FFFFFF", images: g('W6GI58K6307-G011') }] }
];

const HOMEPAGE_COLLECTIONS = [
  {
    title: "NEW ARRIVALS",
    banner: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80", 
    products: MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 4) 
  },
  {
    title: "ESSENTIALS",
    banner: "https://images.unsplash.com/photo-1552346154-21d32810baa3?w=1600&q=80", 
    products: MOCK_PRODUCTS.filter(p => !p.isNew).slice(0, 4) 
  }
];

// --- FUZZY SEARCH ENGINE ---
// Smart search: exact matches first, then word subsets, then letter sequence
const isFuzzySequence = (query, text) => {
  let i = 0, j = 0;
  while (i < query.length && j < text.length) {
    if (query[i] === text[j]) i++;
    j++;
  }
  return i === query.length;
};

const getSearchResults = (query) => {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const qClean = q.replace(/\s+/g, '');
  
  return MOCK_PRODUCTS.map(product => {
    const searchableText = `${product.brand} ${product.title} ${product.type}`.toLowerCase();
    
    let score = 0;
    if (searchableText.includes(q)) {
      score = 100; // Exact substring
    } else {
      const words = q.split(' ');
      if (words.every(w => searchableText.includes(w))) {
        score = 80; // All words present somewhere
      } else if (isFuzzySequence(qClean, searchableText)) {
        score = 50; // Letters appear in order (e.g., 'shrt' -> 'shirt')
      }
    }
    return { ...product, score };
  })
  .filter(p => p.score > 0)
  .sort((a, b) => b.score - a.score);
};

// --- UI COMPONENTS ---

const SearchOverlay = ({ isOpen, onClose, onProductClick }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = getSearchResults(query);

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl animate-in fade-in duration-500 flex flex-col">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 pt-8 md:pt-16 pb-6 flex items-center relative">
        <input 
          ref={inputRef}
          type="text" 
          placeholder="SEARCH AUREN..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && onClose()}
          className="w-full text-4xl md:text-7xl font-bold uppercase tracking-tighter bg-transparent border-none outline-none text-black placeholder:text-gray-200 focus:ring-0 pl-0"
        />
        <button onClick={onClose} className="absolute right-4 sm:right-8 p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <XIcon />
        </button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-8" />

      <div className="flex-1 overflow-y-auto max-w-[1400px] w-full mx-auto px-4 sm:px-8 pb-32">
        {!query ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
            <SearchIcon active={false} className="w-16 h-16 mb-6" />
            <p className="font-mono text-sm uppercase tracking-widest text-center">Start typing to explore</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-in slide-in-from-bottom-8 duration-500">
            {results.map((product) => (
              <GridProductCard 
                key={product.id} 
                product={product} 
                onProductClick={(p) => {
                  onClose();
                  onProductClick(p);
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <p className="font-mono text-sm uppercase tracking-widest text-center">No matches found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

const GridProductCard = ({ product, onProductClick }) => {
  const defaultImage = product.colors?.[0]?.images?.[0];
  const hasMultipleColors = product.colors && product.colors.length > 1;
  const isFootwear = product.type === 'footwear';

  return (
    <div className="flex flex-col gap-3 cursor-pointer group" onClick={() => onProductClick(product)}>
      <div className="w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm border border-black/5">
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border border-black/10 rounded-md shadow-sm z-10">
            NEW
          </span>
        )}
        {defaultImage && (
          <img 
            src={defaultImage} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511130558090-00af810c2111?w=800&q=80'; }}
          />
        )}
      </div>
      
      <div className="flex flex-col px-1">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">{product.brand} • {product.gender}</span>
        
        <h3 className="text-sm font-medium leading-snug text-gray-900 transition-colors duration-300 group-hover:text-gray-600 line-clamp-1">{product.title}</h3>
        
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-sm font-semibold whitespace-nowrap text-black">
            {product.price.toFixed(2)} {product.currency}
          </span>
          
          {hasMultipleColors && (
            <div className="flex gap-1.5 items-center">
              {isFootwear ? (
                product.colors.slice(0, 3).map((c, idx) => (
                  <div key={idx} className="w-4 h-4 rounded-sm border border-black/10 overflow-hidden bg-white" title={c.name}>
                    <img src={c.images[0]} className="w-full h-full object-cover" alt={c.name} />
                  </div>
                ))
              ) : (
                product.colors.slice(0, 3).map((c, idx) => (
                  <div key={idx} className="w-2.5 h-2.5 rounded-full border border-black/10" style={{backgroundColor: c.hex}} title={c.name}></div>
                ))
              )}
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
            {activeImageUrl ? (
              <img 
                key={activeImageUrl}
                src={activeImageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover animate-in fade-in duration-500 ease-out" 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511130558090-00af810c2111?w=800&q=80'; }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-mono text-sm uppercase tracking-widest">
                Image Not Available
              </div>
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
                  <img 
                    src={img} 
                    className="w-full h-full object-cover" 
                    alt={`Thumbnail ${idx}`} 
                    onError={(e) => { e.target.closest('button').style.display = 'none'; }} 
                  />
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

          {/* COLOR SELECTION */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
                COLOR: <span className="text-black">{activeColor?.name}</span>
              </p>
              
              {isFootwear ? (
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((col, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => { setActiveColorIndex(idx); setActiveImageIndex(0); }}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white ${activeColorIndex === idx ? 'border-black scale-105 shadow-md' : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'}`}
                      title={col.name}
                    >
                      <img src={col.images[0]} alt={col.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((col, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => { setActiveColorIndex(idx); setActiveImageIndex(0); }}
                      className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all duration-300 ${activeColorIndex === idx ? 'border-black scale-110' : 'border-transparent hover:border-gray-300'}`}
                      title={col.name}
                    >
                      <div className="w-full h-full rounded-full shadow-sm border border-black/10" style={{ backgroundColor: col.hex }}></div>
                    </button>
                  ))}
                </div>
              )}
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
        
        {/* Фильтры */}
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-black hover:opacity-60 transition-opacity duration-500 ease-out">
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

      {/* УМНЫЙ ПОИСК (ОВЕРЛЕЙ) */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onProductClick={setSelectedProduct} 
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

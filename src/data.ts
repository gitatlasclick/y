export const IMG = {
  portrait: "https://image.qwenlm.ai/generated-images/b2b43b19-5134-46c6-9955-113c7b04a9a2/_result.png",
  lobby: "https://image.qwenlm.ai/generated-images/b9b55023-450d-4dd7-879f-20a489c576ae/_result.png",
  makeup: "https://image.qwenlm.ai/generated-images/cee96cff-5c25-4425-bd30-ae1a37ec1e6a/_result.png",
  suite: "https://image.qwenlm.ai/generated-images/898f004c-c06b-4b89-a69b-b1eaea1670b3/_result.png",
  serum: "https://image.qwenlm.ai/generated-images/b771bd4d-4208-4f32-ac22-192bfe522757/_result.png",
  surgeons: "https://image.qwenlm.ai/generated-images/04003ec5-189a-45cd-ab38-bbf7eab90a98/_result.png",
  consult: "https://image.qwenlm.ai/generated-images/95988507-6ddd-4841-adc9-2ab7223eecd1/_result.png",
};

export interface Procedure {
  id: string;
  no: string;
  name: string;
  kr: string;
  tag: string;
  tagline: string;
  duration: string;
  anesthesia: string;
  recovery: string;
  price: string;
  desc: string;
  includes: string[];
  zone: { kind: "face"; cx: number; cy: number; r: number } | { kind: "body" };
  img?: string;
}

export const PROCEDURES: Procedure[] = [
  {
    id: "rhinoplasty",
    no: "01",
    name: "Signature Rhinoplasty",
    kr: "코성형",
    tag: "Nose",
    tagline: "Bridge to tip, engineered to your own facial angles",
    duration: "90 min",
    anesthesia: "Sedation",
    recovery: "5–7 days",
    price: "₩4,500,000~",
    desc: "Not a borrowed nose — yours, resolved. 3D angle mapping defines bridge height, tip rotation and alar width against your cheekbones and chin, using autologous cartilage wherever structure allows.",
    includes: ["3D simulation & written plan", "Autologous cartilage preference", "Splint-free techniques where possible", "Complimentary revision within 12 months"],
    zone: { kind: "face", cx: 221, cy: 168, r: 26 },
  },
  {
    id: "vline",
    no: "02",
    name: "V-Line Jaw Contouring",
    kr: "윤곽수술",
    tag: "Contouring",
    tagline: "Mandible angle reduction through an invisible intraoral approach",
    duration: "120 min",
    anesthesia: "General",
    recovery: "7–10 days",
    price: "₩8,800,000~",
    desc: "Square jaw, mandibular angle and chin are re-sculpted as one continuous line — planned on your own CT, cut with nerve-tracking guidance, closed entirely inside the mouth. No visible scar, ever.",
    includes: ["Low-dose 3D CT planning", "Real-time nerve monitoring", "Intraoral incisions only", "Custom chin harmony if indicated"],
    zone: { kind: "face", cx: 191, cy: 268, r: 32 },
  },
  {
    id: "cheekbone",
    no: "03",
    name: "Cheekbone Reduction",
    kr: "광대축소",
    tag: "Contouring",
    tagline: "High cheekbones softened into light-catching planes",
    duration: "90 min",
    anesthesia: "General",
    recovery: "7 days",
    price: "₩7,500,000~",
    desc: "The arch of the zygoma is repositioned inward and upward through a hairline-hidden approach, narrowing facial width while preserving the shadow-line that keeps a face alive in photographs.",
    includes: ["45° oblique-view planning", "Double-endpoint fixation", "Hidden hairline incision", "Lymphatic drainage aftercare"],
    zone: { kind: "face", cx: 199, cy: 144, r: 27 },
  },
  {
    id: "eyes",
    no: "04",
    name: "Eye Reformation",
    kr: "눈성형",
    tag: "Eyes",
    tagline: "Double eyelid and epicanthoplasty, matched to your orbit",
    duration: "60 min",
    anesthesia: "Local",
    recovery: "3–5 days",
    price: "₩2,200,000~",
    desc: "The crease is drawn from your lid anatomy, not a catalogue: partial-incision or suture technique chosen per millimetre of skin, with epicanthoplasty only where the inner fold genuinely asks for it.",
    includes: ["Crease simulation in-mirror", "Partial-incision or suture method", "Optional epicanthoplasty", "Bruise-minimising protocol"],
    zone: { kind: "face", cx: 193, cy: 115, r: 21 },
  },
  {
    id: "facelift",
    no: "05",
    name: "SMAS Facelift",
    kr: "리프팅",
    tag: "Anti-ageing",
    tagline: "A decade returned, an identity preserved",
    duration: "150 min",
    anesthesia: "General",
    recovery: "10–14 days",
    price: "₩12,000,000~",
    desc: "The deeper muscular layer — not just skin — is repositioned along natural tension lines, with fat grafting where volume has left. The goal is a rested decade, never a different person.",
    includes: ["Deep-plane SMAS technique", "Concealed hairline incisions", "Micro fat-grafting included", "12-month contour review"],
    zone: { kind: "face", cx: 186, cy: 236, r: 62 },
  },
  {
    id: "body",
    no: "06",
    name: "Body Contouring",
    kr: "체형성형",
    tag: "Body",
    tagline: "360° liposuction and transfer, sculpted like tailoring",
    duration: "120 min",
    anesthesia: "General",
    recovery: "5–7 days",
    price: "₩6,500,000~",
    desc: "Vaser-assisted liposuction removes with restraint; the harvest is purified and returned where silhouette asks — waist, hips, calves — planned on standing photography, finished under compression protocol.",
    includes: ["Vaser-assisted precision", "Fat purified for reinjection", "Custom compression garment", "Three massage therapy sessions"],
    zone: { kind: "body" },
    img: IMG.suite,
  },
];

export interface Tier {
  id: string;
  name: string;
  kr: string;
  price: string;
  period: string;
  featured?: boolean;
  note: string;
  perks: string[];
}

export const TIERS: Tier[] = [
  {
    id: "care",
    name: "Signature Care",
    kr: "시그니처",
    price: "₩450,000",
    period: "per procedure",
    note: "Peri-operative concierge around every surgery.",
    perks: [
      "Personal interpreter · EN 中文 日本語",
      "Airport pickup & drop-off",
      "24/7 nurse hotline for 2 weeks",
      "Post-operative care kit & medication plan",
      "Complimentary scar-management session",
    ],
  },
  {
    id: "gold",
    name: "Privé Gold",
    kr: "프라이빗 골드",
    price: "₩1,900,000",
    period: "per procedure",
    featured: true,
    note: "Our most chosen surgical program.",
    perks: [
      "Everything in Signature Care",
      "Private recovery suite — 3 nights",
      "Daily surgeon & nurse visits",
      "Chef-prepared recovery meals",
      "Companion suite & itinerary management",
      "12-month revision guarantee",
    ],
  },
  {
    id: "imperial",
    name: "Imperial Council",
    kr: "임페리얼",
    price: "By invitation",
    period: "annual",
    note: "A private surgical council for the few.",
    perks: [
      "Dedicated council of three surgeons",
      "Private floor & NDA privacy protocol",
      "Scheduling around your calendar, not ours",
      "International aftercare — Seoul · Dubai · Paris",
      "Annual maintenance & non-surgical program",
      "Legacy membership for family",
    ],
  },
];

export const SURGEONS = [
  {
    name: "Dr. Han Jae-hyun",
    kr: "한재현",
    role: "Chief of Facial Contouring",
    creds: ["Seoul National University College of Medicine", "KSPRS board-certified · 4,100+ contouring procedures", "Visiting faculty, ISAPS"],
  },
  {
    name: "Dr. Seo Min-ji",
    kr: "서민지",
    role: "Head of Rhinoplasty",
    creds: ["Yonsei University College of Medicine", "19 years · revision rhinoplasty specialist", "Author, 'Nasal Architecture' (2021)"],
  },
  {
    name: "Dr. Park Do-wan",
    kr: "박도완",
    role: "Anti-ageing & Reconstructive",
    creds: ["Asan Medical Center fellowship", "Deep-plane facelift pioneer, Korea", "Full-time, never locum"],
  },
];

export const TESTIMONIALS = [
  {
    quote: "I interviewed surgeons across Seoul for a year. Dr. Seo drew my nose like an architect — angles, light, proportion. Eight weeks later strangers tell me I look rested. Nobody has guessed surgery.",
    name: "Rhinoplasty patient, 34",
    role: "Seoul · name withheld",
  },
  {
    quote: "V-line was the scariest decision of my life. The 3D simulation, the anesthesiologist's briefing, the nurse who called every night for a week — fear became trust, then became my own face.",
    name: "Contouring patient, 29",
    role: "Flew in from Taipei",
  },
  {
    quote: "Two failed rhinoplasties elsewhere. YEON refused to over-promise, showed me exactly what was possible, then exceeded it. This is what medicine is supposed to feel like.",
    name: "Revision patient, 41",
    role: "Los Angeles · Privé Gold",
  },
];

export const PRESS = ["VOGUE KOREA", "W KOREA", "ELLE", "BABS MAGAZINE", "ALLURE", "GANGNAM UNNI"];

export const MARQUEE = [
  "Rhinoplasty", "코성형", "V-Line Contouring", "윤곽수술",
  "Cheekbone Reduction", "광대축소", "Gangnam · Seoul", "Since 2007",
];

export const MARQUEE_VIP = [
  "Privé Surgical Programs", "프라이빗", "Medical Concierge 24/7",
  "By Invitation", "Board-Certified Only", "1:1 Surgeon Responsibility",
];

export interface Social {
  key: string;
  name: string;
  handle: string;
  tag: string;
  href: string;
}

export const SOCIALS: Social[] = [
  { key: "kakao", name: "KakaoTalk", handle: "@yeon.surgery", tag: "Fastest · 예약", href: "https://open.kakao.com/o/yeon-surgery" },
  { key: "naver", name: "Naver Booking", handle: "yeon-surgery", tag: "Instant consult", href: "https://booking.naver.com/yeon-surgery" },
  { key: "instagram", name: "Instagram", handle: "@yeon.plasticsurgery", tag: "Results · DM open", href: "https://instagram.com/yeon.plasticsurgery" },
  { key: "youtube", name: "YouTube", handle: "YEON Surgery Seoul", tag: "Procedure films", href: "https://youtube.com/@yeonsurgery" },
  { key: "whatsapp", name: "WhatsApp", handle: "+82 10 5516 8890", tag: "International patients", href: "https://wa.me/821055168890" },
  { key: "wechat", name: "WeChat 微信", handle: "YEON-Seoul", tag: "中国患者", href: "https://weixin.qq.com/r/yeon-seoul" },
  { key: "line", name: "LINE", handle: "@yeon.seoul", tag: "日本の患者様", href: "https://line.me/R/ti/p/@yeon.seoul" },
  { key: "telegram", name: "Telegram", handle: "@yeon_concierge", tag: "24/7 concierge", href: "https://t.me/yeon_concierge" },
  { key: "email", name: "Email", handle: "prive@yeon-surgery.kr", tag: "Formal enquiries", href: "mailto:prive@yeon-surgery.kr" },
  { key: "phone", name: "Telephone", handle: "+82 2 516 8890", tag: "Voice · 한국어/EN", href: "tel:+8225168890" },
];

export const NAV = [
  { label: "The Standard", href: "#standard" },
  { label: "Procedures", href: "#procedures" },
  { label: "Surgeons", href: "#council" },
  { label: "Privé", href: "#vip" },
  { label: "Reserve", href: "#booking" },
];

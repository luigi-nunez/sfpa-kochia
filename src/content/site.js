// Organisation-level content. Fields set to null are not yet confirmed by SFPA;
// the UI shows a "to be confirmed" marker instead of inventing values.
//
// Sources: SFPA's existing website, retrieved 19 November 2026.
//   Home and footer  https://sudanfpa.org/?lang=en
//   About            https://sudanfpa.org/من-نحن/
//   Contact          https://sudanfpa.org/تواصل-معنا/
//   Statistics       https://sudanfpa.org/الإحصائيات/
// Not imported: the published landline +249-183-000-000 (looks like a placeholder).
// Instagram profile confirmed by Luigi Nuñez on 19 November 2026 (sudanfpa.org links to instagram.com only).
// WhatsApp 249965100301 confirmed as published by SFPA, though not yet on sudanfpa.org.
import { WA_NUMBER, CALL_CENTRE } from '../config.js';

export const SOURCES = {
  home: 'https://sudanfpa.org/?lang=en',
  about: 'https://sudanfpa.org/%d9%85%d9%86-%d9%86%d8%ad%d9%86/?lang=en',
  departments: 'https://sudanfpa.org/%d8%a7%d9%84%d8%a5%d8%af%d8%a7%d8%b1%d8%a7%d8%aa/',
  partners: 'https://sudanfpa.org/%d8%a7%d9%84%d8%b4%d8%b1%d9%83%d8%a7%d8%a1/',
  stats: 'https://sudanfpa.org/%d8%a7%d9%84%d8%a5%d8%ad%d8%b5%d8%a7%d8%a6%d9%8a%d8%a7%d8%aa/',
  contact: 'https://sudanfpa.org/%d8%aa%d9%88%d8%a7%d8%b5%d9%84-%d9%85%d8%b9%d9%86%d8%a7/',
  projects: 'https://sudanfpa.org/projects/',
  branches: 'https://sudanfpa.org/branches/',
  news: 'https://sudanfpa.org/news/',
};

export const SITE = {
  name: { en: 'Sudan Family Planning Association', ar: 'جمعية تنظيم الأسرة السودانية' },
  short: { en: 'SFPA Sudan', ar: 'جمعية تنظيم الأسرة' },
  tagline: {
    en: 'Confidential sexual and reproductive health care, information, and support.',
    ar: 'رعاية ومعلومات ودعم سري في مجال الصحة الجنسية والإنجابية.',
  },
  whatsapp: WA_NUMBER,
  callCentre: CALL_CENTRE, // 1700 is also published on sudanfpa.org
  email: 'info@sudanfpa.org', // published on sudanfpa.org; matches the site's own domain
  address: { en: 'SFPA headquarters, Khartoum, Sudan', ar: 'رئاسة جمعية تنظيم الأسرة السودانية - الخرطوم - السودان' }, // no street address published
  hours: null, // not published on sudanfpa.org
  founded: 1965, // sudanfpa.org About page
  socials: [
    { id: 'Facebook', url: 'https://www.facebook.com/SudanFamilyPlanning' },
    { id: 'YouTube', url: 'https://www.youtube.com/@SFPA-SUDAN' },
    { id: 'Instagram', url: 'https://www.instagram.com/sfpa65/' },
  ],
  donationUrl: null, // payment gateway link once SFPA has one
};

// Institutional figures exactly as SFPA publishes them for 2025. They are shown one by one
// with their year and source and are never added together or mixed with other periods.
// The home hero on sudanfpa.org uses different figures (250K+ beneficiaries, 120+ service
// points, 40+ years); those conflict with this table and with the 1965 founding date, so they
// are not used.
export const STATS_2025 = {
  year: 2025,
  source: SOURCES.stats,
  sourceNote: {
    en: 'Source: SFPA annual reports, 2025.',
    ar: 'المصدر: التقارير السنوية للجمعية، ٢٠٢٥.',
  },
  items: [
    { id: 'branches', value: 15, label: { en: 'Active branches', ar: 'فرع نشط' } },
    { id: 'outlets', value: 26, label: { en: 'Service delivery points', ar: 'منفذ لتقديم الخدمة' } },
    { id: 'sessions', value: 1200, label: { en: 'Awareness sessions', ar: 'جلسة توعية' } },
    { id: 'courses', value: 85, label: { en: 'Training courses', ar: 'دورة تدريبية' } },
    { id: 'partners', value: 25, label: { en: 'Partners and supporters', ar: 'شريك وداعم' } },
    // Hidden in the UI (needsDefinition) until SFPA confirms what it counts: people, visits, or reach.
    { id: 'beneficiaries', value: 13552299, label: { en: 'Total beneficiaries', ar: 'إجمالي المستفيدين' }, needsDefinition: true },
  ],
};

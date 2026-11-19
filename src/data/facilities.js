// SFPA Sudan branch network.
//
// Source: the branch directory on SFPA's existing website, https://sudanfpa.org/branches/
// (each branch has a detail page at https://sudanfpa.org/branches/<slug>/). Retrieved 19 November 2026.
//
// What is and is not verified:
// - Branch names, states, towns, and service-point names are as SFPA publishes them. Operational
//   status is NOT confirmed: the war has affected many of these towns, so every record is shown
//   as "reported", never as an open clinic.
// - lat/lng come from the OpenStreetMap embed on each branch page. They mark the town, not the
//   building, so precision is 'town' and the UI shows them as approximate locations with no
//   turn-by-turn directions.
// - The branch pages list phone numbers +249-000-000-001 to -015 and @sfpa.sd emails. These look
//   like placeholders (sequential, all zeros, different domain from sudanfpa.org). They are kept
//   in `unverified` for SFPA's validation and are never rendered or dialled.
// - Opening hours and street addresses (except Khartoum, Gedaref, and Kassala) are not published.
//
// advisory: true marks branches in areas with active conflict in 2025 to 2026 (Darfur and
// North Kordofan). The UI asks people to call before travelling. SFPA should confirm or change this.

const SVC = {
  integrated: { en: 'Integrated centre', ar: 'مركز متكامل' },
  fp: { en: 'Family planning services', ar: 'خدمات تنظيم الأسرة' },
  rh: { en: 'Reproductive health', ar: 'صحة إنجابية' },
  counselling: { en: 'Family counselling', ar: 'إرشاد أسري' },
};

const SOURCE = 'https://sudanfpa.org/branches/';

function branch({ slug, state, city, address, lat, lng, points, phone, email, advisory = false }) {
  const serviceKeys = [...new Set(points.map((p) => p.svc))];
  return {
    id: slug,
    slug,
    source: `${SOURCE}${slug}/`,
    status: 'reported', // reported on sudanfpa.org; operational status not confirmed
    precision: 'town', // coordinates mark the town, not the building
    advisory,
    state_en: state.en, state_ar: state.ar,
    city_en: city.en, city_ar: city.ar,
    name_en: `${state.en} Branch`,
    name_ar: `فرع ${state.ar}`,
    address_en: address ? address.en : city.en,
    address_ar: address ? address.ar : city.ar,
    addressIsTownOnly: !address,
    hours_en: null, hours_ar: null,
    phone: '', // no verified number; the UI falls back to the national call centre
    lat, lng,
    services_en: serviceKeys.map((k) => SVC[k].en),
    services_ar: serviceKeys.map((k) => SVC[k].ar),
    servicePoints: points.map((p) => ({ name_en: p.en, name_ar: p.ar, type_en: SVC[p.svc].en, type_ar: SVC[p.svc].ar })),
    unverified: { phone, email },
  };
}

export const FACILITIES = [
  branch({
    slug: 'khartoum', state: { en: 'Khartoum State', ar: 'ولاية الخرطوم' }, city: { en: 'Khartoum', ar: 'الخرطوم' },
    address: { en: 'Al Jumhuriya Street, Khartoum', ar: 'الخرطوم - شارع الجمهورية' }, lat: 15.5007, lng: 32.5599,
    points: [
      { en: 'Khartoum State Integrated Centre', ar: 'المركز المتكامل ولاية الخرطوم', svc: 'fp' },
      { en: 'Khartoum State Branch Clinic', ar: 'عيادة فرع ولاية الخرطوم', svc: 'rh' },
    ],
    phone: '+249-000-000-001', email: 'khartoum@sfpa.sd',
  }),
  branch({
    slug: 'gedaref', state: { en: 'Gedaref State', ar: 'ولاية القضارف' }, city: { en: 'Gedaref', ar: 'القضارف' },
    address: { en: 'Eastern District, Gedaref', ar: 'القضارف - الحي الشرقي' }, lat: 14.0333, lng: 35.3833,
    points: [
      { en: 'Gedaref State Branch Integrated Centre', ar: 'المركز المتكامل فرع ولاية القضارف', svc: 'integrated' },
      { en: 'Al Nazir Health Centre, Gedaref State', ar: 'مركز صحي الناظر ولاية القضارف', svc: 'fp' },
    ],
    phone: '+249-000-000-002', email: 'gedaref@sfpa.sd',
  }),
  branch({
    slug: 'kassala', state: { en: 'Kassala State', ar: 'ولاية كسلا' }, city: { en: 'Kassala', ar: 'كسلا' },
    address: { en: 'City centre, Kassala', ar: 'كسلا - وسط المدينة' }, lat: 15.45, lng: 36.4,
    points: [
      { en: 'Kassala State Branch Integrated Centre', ar: 'المركز المتكامل فرع ولاية كسلا', svc: 'integrated' },
      { en: 'Kassala State Health Centre', ar: 'مركز صحي ولاية كسلا', svc: 'fp' },
    ],
    phone: '+249-000-000-003', email: 'kassala@sfpa.sd',
  }),
  branch({
    slug: 'red-sea', state: { en: 'Red Sea State', ar: 'ولاية البحر الأحمر' }, city: { en: 'Port Sudan', ar: 'بورتسودان' },
    lat: 19.6158, lng: 37.2164,
    points: [
      { en: 'Integrated Centre, Deim Madina, Red Sea State', ar: 'المركز المتكامل - ديم مدينة ولاية البحر الأحمر', svc: 'integrated' },
      { en: 'Hay Al Matar Centre, Red Sea State', ar: 'مركز حي المطار ولاية البحر الأحمر', svc: 'fp' },
    ],
    phone: '+249-000-000-004', email: 'redsea@sfpa.sd',
  }),
  branch({
    slug: 'sennar', state: { en: 'Sennar State', ar: 'ولاية سنار' }, city: { en: 'Singa', ar: 'سنجة' },
    lat: 13.15, lng: 33.9333,
    points: [
      { en: 'Sennar State Integrated Centre', ar: 'المركز المتكامل ولاية سنار', svc: 'integrated' },
      { en: 'Singa Clinic, Sennar State Branch', ar: 'عيادة سنجة فرع ولاية سنار', svc: 'rh' },
    ],
    phone: '+249-000-000-005', email: 'sennar@sfpa.sd',
  }),
  branch({
    slug: 'white-nile', state: { en: 'White Nile State', ar: 'ولاية النيل الأبيض' }, city: { en: 'Rabak', ar: 'ربك' },
    lat: 13.1833, lng: 32.7333,
    points: [
      { en: 'White Nile State Integrated Centre', ar: 'المركز المتكامل ولاية النيل الأبيض', svc: 'fp' },
      { en: 'White Nile State Branch Clinic', ar: 'عيادة فرع ولاية النيل الأبيض', svc: 'rh' },
    ],
    phone: '+249-000-000-006', email: 'wnile@sfpa.sd',
  }),
  branch({
    slug: 'blue-nile', state: { en: 'Blue Nile State', ar: 'ولاية النيل الأزرق' }, city: { en: 'Ad Damazin', ar: 'الدمازين' },
    lat: 11.7833, lng: 34.35,
    points: [
      { en: 'Blue Nile State Branch Integrated Centre', ar: 'المركز المتكامل فرع ولاية النيل الأزرق', svc: 'rh' },
      // Published as "مركز ولاية النيل الأزرق_قنيص"; the underscore is tidied here. Spelling to confirm.
      { en: 'Blue Nile State Centre, Qunays', ar: 'مركز ولاية النيل الأزرق - قنيص', svc: 'fp' },
    ],
    phone: '+249-000-000-007', email: 'bnile@sfpa.sd',
  }),
  branch({
    slug: 'north-darfur', state: { en: 'North Darfur State', ar: 'ولاية شمال دارفور' }, city: { en: 'El Fasher', ar: 'الفاشر' },
    lat: 13.6289, lng: 25.3493, advisory: true,
    points: [
      { en: 'North Darfur State Branch Integrated Centre', ar: 'المركز المتكامل فرع ولاية شمال دارفور', svc: 'integrated' },
      { en: 'Abu Shouk Centre, North Darfur State', ar: 'مركز أبو شوك - ولاية شمال دارفور', svc: 'integrated' },
    ],
    phone: '+249-000-000-008', email: 'ndarfur@sfpa.sd',
  }),
  branch({
    slug: 'south-darfur', state: { en: 'South Darfur State', ar: 'ولاية جنوب دارفور' }, city: { en: 'Nyala', ar: 'نيالا' },
    lat: 12.05, lng: 24.8833, advisory: true,
    points: [
      { en: 'South Darfur State Branch Integrated Centre', ar: 'المركز المتكامل فرع ولاية جنوب دارفور', svc: 'integrated' },
      { en: 'Bulbul Centre, South Darfur State', ar: 'مركز بلبل - ولاية جنوب دارفور', svc: 'integrated' },
    ],
    phone: '+249-000-000-009', email: 'sdarfur@sfpa.sd',
  }),
  branch({
    slug: 'west-darfur', state: { en: 'West Darfur State', ar: 'ولاية غرب دارفور' }, city: { en: 'El Geneina', ar: 'الجنينة' },
    lat: 13.45, lng: 22.45, advisory: true,
    points: [
      { en: 'West Darfur State Branch Integrated Centre', ar: 'المركز المتكامل فرع ولاية غرب دارفور', svc: 'integrated' },
      { en: 'West Darfur State Centre', ar: 'مركز ولاية غرب دارفور', svc: 'fp' },
    ],
    phone: '+249-000-000-010', email: 'wdarfur@sfpa.sd',
  }),
  branch({
    slug: 'nkordofan-obeid', state: { en: 'North Kordofan State', ar: 'ولاية شمال كردفان' }, city: { en: 'El Obeid', ar: 'الأبيض' },
    lat: 13.1833, lng: 30.2167, advisory: true,
    points: [
      { en: 'North Kordofan State Branch Clinic, El Obeid', ar: 'عيادة فرع ولاية شمال كردفان - الأبيض', svc: 'rh' },
      { en: 'North Kordofan State Counselling Centre', ar: 'مركز إرشاد ولاية شمال كردفان', svc: 'counselling' },
    ],
    phone: '+249-000-000-011', email: 'obeid@sfpa.sd',
  }),
  branch({
    slug: 'nkordofan-umrwaba', state: { en: 'North Kordofan State', ar: 'ولاية شمال كردفان' }, city: { en: 'Umm Ruwaba', ar: 'أم روابة' },
    lat: 12.9167, lng: 31.2167, advisory: true,
    points: [
      { en: 'North Kordofan State Branch Clinic, Umm Ruwaba', ar: 'عيادة فرع ولاية شمال كردفان - أم روابة', svc: 'rh' },
      { en: 'North Kordofan State Counselling Centre, Umm Ruwaba', ar: 'مركز إرشاد ولاية شمال كردفان - أم روابة', svc: 'counselling' },
    ],
    phone: '+249-000-000-012', email: 'umrwaba@sfpa.sd',
  }),
  branch({
    slug: 'northern', state: { en: 'Northern State', ar: 'الولاية الشمالية' }, city: { en: 'Dongola', ar: 'دنقلا' },
    lat: 19.1667, lng: 30.4833,
    points: [
      { en: 'Northern State Branch Clinic', ar: 'عيادة فرع الولاية الشمالية', svc: 'rh' },
      { en: 'Northern State Counselling Centre', ar: 'مركز إرشاد الولاية الشمالية', svc: 'counselling' },
    ],
    phone: '+249-000-000-013', email: 'northern@sfpa.sd',
  }),
  branch({
    slug: 'river-nile', state: { en: 'River Nile State', ar: 'ولاية نهر النيل' }, city: { en: 'Ad Damer', ar: 'الدامر' },
    lat: 17.5892, lng: 33.9672,
    points: [
      { en: 'River Nile State Branch Clinic', ar: 'عيادة فرع ولاية نهر النيل', svc: 'rh' },
      { en: 'River Nile State Counselling Centre', ar: 'مركز إرشاد ولاية نهر النيل', svc: 'counselling' },
    ],
    phone: '+249-000-000-014', email: 'rnile@sfpa.sd',
  }),
  branch({
    slug: 'gezira', state: { en: 'Gezira State', ar: 'ولاية الجزيرة' }, city: { en: 'Wad Madani', ar: 'ود مدني' },
    lat: 14.4012, lng: 33.5199,
    points: [
      { en: 'Gezira State Integrated Centre', ar: 'المركز المتكامل ولاية الجزيرة', svc: 'integrated' },
      { en: 'Gezira State Branch Clinic', ar: 'عيادة فرع ولاية الجزيرة', svc: 'rh' },
    ],
    phone: '+249-000-000-015', email: 'gezira@sfpa.sd',
  }),
];

// North Kordofan has two branches (El Obeid and Umm Ruwaba), so 15 branches cover 14 states.
export const STATES = [...new Set(FACILITIES.map((f) => f.state_en))];

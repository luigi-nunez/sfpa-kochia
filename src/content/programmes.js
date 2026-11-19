// Programmes. The six SFPA programme areas come from https://sudanfpa.org/projects/ (retrieved
// 19 November 2026), where each is marked "in progress" (قيد التنفيذ). Descriptions follow SFPA's
// own summaries. Focus areas are listed only where SFPA names them; nothing is added.
// SFPA's pages give no objectives, locations, dates, partners, or results, so detailsPending
// shows a "details to be added" marker until SFPA supplies them.
// Kochia is this platform's own programme entry and is not on sudanfpa.org.
// CMS note: maps to a "programme" type with status, summary, focus areas, CTA, and source URL.
const SRC = 'https://sudanfpa.org/projects/';

export const PROGRAMMES = [
  {
    id: 'reproductive-health',
    icon: 'heart',
    featured: true,
    status: 'active',
    detailsPending: true,
    source: `${SRC}reproductive-health/`,
    tag: { en: 'Health services', ar: 'الخدمات الصحية' },
    title: { en: 'Reproductive health', ar: 'الصحة الإنجابية' },
    desc: {
      en: 'Awareness and reproductive health services for target groups in several states, delivered through SFPA’s branches.',
      ar: 'التوعية وتقديم خدمات الصحة الإنجابية للفئات المستهدفة في عدد من الولايات عبر فروع الجمعية.',
    },
    pillars: { en: [], ar: [] },
    cta: { type: 'link', to: '/services', label: { en: 'See our services', ar: 'اطلع على خدماتنا' } },
  },
  {
    id: 'youth',
    icon: 'users',
    status: 'active',
    detailsPending: true,
    source: `${SRC}youth-empowerment/`,
    tag: { en: 'Youth', ar: 'الشباب' },
    title: { en: 'Youth empowerment', ar: 'تمكين الشباب' },
    desc: {
      en: 'Training programmes that build young people’s skills in reproductive health, rights, and community participation.',
      ar: 'برامج تدريبية لبناء قدرات الشباب في الصحة الإنجابية والحقوق والمشاركة المجتمعية.',
    },
    pillars: {
      en: ['Reproductive health', 'Rights', 'Community participation'],
      ar: ['الصحة الإنجابية', 'الحقوق', 'المشاركة المجتمعية'],
    },
    cta: { type: 'link', to: '/services/youth-services', label: { en: 'Youth services', ar: 'خدمات الشباب' } },
  },
  {
    id: 'women',
    icon: 'female',
    status: 'active',
    detailsPending: true,
    source: `${SRC}women-support/`,
    tag: { en: 'Women', ar: 'المرأة' },
    title: { en: 'Women’s support', ar: 'دعم المرأة' },
    desc: {
      en: 'Health and awareness services for Sudanese women across SFPA’s fifteen branches.',
      ar: 'خدمات صحية وتوعوية للمرأة السودانية عبر فروع الجمعية الخمسة عشر.',
    },
    pillars: { en: ['Health services', 'Awareness'], ar: ['الخدمات الصحية', 'التوعية'] },
    cta: { type: 'link', to: '/services#womens-health', label: { en: 'Women’s health services', ar: 'خدمات صحة المرأة' } },
  },
  {
    id: 'outreach',
    icon: 'chat',
    status: 'active',
    detailsPending: true,
    source: `${SRC}community-outreach/`,
    tag: { en: 'Community', ar: 'المجتمع' },
    title: { en: 'Community outreach', ar: 'التوعية المجتمعية' },
    desc: {
      en: 'Field awareness campaigns on family planning and reproductive health in villages and neighbourhoods.',
      ar: 'حملات توعية ميدانية حول تنظيم الأسرة والصحة الإنجابية في القرى والأحياء.',
    },
    pillars: { en: [], ar: [] },
    cta: { type: 'whatsapp', label: { en: 'Request an awareness session', ar: 'اطلب جلسة توعية' }, msg: { en: 'Hello, I would like to ask about an SFPA awareness session for our community.', ar: 'مرحباً، أود الاستفسار عن جلسة توعية من الجمعية لمجتمعنا.' } },
  },
  {
    id: 'gbv',
    icon: 'hands',
    status: 'active',
    detailsPending: true,
    source: `${SRC}gbv-response/`,
    tag: { en: 'Protection', ar: 'الحماية' },
    title: { en: 'Response to gender-based violence', ar: 'الاستجابة للعنف القائم على النوع' },
    desc: {
      en: 'Psychological, health, and legal support services for survivors of gender-based violence.',
      ar: 'خدمات دعم نفسي وصحي وقانوني للناجين من العنف القائم على النوع الاجتماعي.',
    },
    pillars: {
      en: ['Psychological support', 'Health care', 'Legal support'],
      ar: ['الدعم النفسي', 'الرعاية الصحية', 'الدعم القانوني'],
    },
    cta: { type: 'link', to: '/services/gbv-support', label: { en: 'How to get support', ar: 'كيف تحصل على الدعم' } },
  },
  {
    id: 'humanitarian',
    icon: 'tent',
    featured: true,
    status: 'active',
    detailsPending: true,
    source: `${SRC}emergency-response/`,
    tag: { en: 'Emergency response', ar: 'الاستجابة للطوارئ' },
    title: { en: 'Humanitarian response', ar: 'الاستجابة الإنسانية' },
    desc: {
      en: 'Reproductive health services in displacement areas and emergency settings.',
      ar: 'تقديم خدمات الصحة الإنجابية في مناطق النزوح وحالات الطوارئ.',
    },
    pillars: { en: [], ar: [] },
    cta: { type: 'link', to: '/donate', label: { en: 'Support this work', ar: 'ادعم هذا العمل' } },
  },
  {
    id: 'kochia',
    icon: 'phone',
    featured: true,
    status: 'pilot',
    detailsPending: false,
    source: null,
    tag: { en: 'Digital health', ar: 'الصحة الرقمية' },
    title: { en: 'Kochia', ar: 'كوشيا' },
    desc: {
      en: 'Confidential health information, self-care tools, and service access on your phone, in Arabic and English. Works offline once installed.',
      ar: 'معلومات صحية سرية وأدوات للرعاية الذاتية والوصول إلى الخدمات على هاتفك، بالعربية والإنجليزية. يعمل بدون إنترنت بعد التثبيت.',
    },
    pillars: {
      en: ['Health articles and videos', 'Interactive decision aids', 'Read-aloud for every article'],
      ar: ['مقالات وفيديوهات صحية', 'أدوات تفاعلية لاتخاذ القرار', 'قراءة صوتية لكل مقال'],
    },
    cta: { type: 'link', to: '/learn', label: { en: 'Explore Kochia', ar: 'استكشف كوشيا' } },
  },
];

export const FEATURED_PROGRAMMES = PROGRAMMES.filter((p) => p.featured);

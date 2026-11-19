// Institutional content imported from SFPA's existing website (sudanfpa.org), retrieved 19 November 2026.
// English follows the site's English version where one exists. Where the site only has Arabic
// (departments, partner roles), English is our translation. The Arabic for mission, vision, and
// goals is rendered from the published wording and should be checked against SFPA's official text.
import { SOURCES } from './site.js';

export const ABOUT = {
  source: SOURCES.about,
  history: {
    en: 'SFPA was founded in 1965 by pioneers in obstetrics and gynaecology, in response to high maternal and infant mortality in Sudan. For decades it has worked as a national non-profit organisation to advance reproductive health and family planning across the country.',
    ar: 'تأسست الجمعية عام ١٩٦٥ على يد رواد في طب النساء والتوليد، استجابةً لارتفاع معدلات وفيات الأمهات والأطفال الرضع في السودان. وتعمل منذ عقود كمنظمة وطنية غير ربحية لتعزيز الصحة الإنجابية وتنظيم الأسرة في أنحاء البلاد.',
  },
  ippf: {
    en: 'SFPA is a member association of the International Planned Parenthood Federation (IPPF) and one of the founders of IPPF’s Arab World Region (IPPF/AWR).',
    ar: 'الجمعية عضو في الاتحاد الدولي لتنظيم الأسرة (IPPF)، ومن مؤسسي إقليم العالم العربي في الاتحاد (IPPF/AWR).',
  },
  vision: {
    en: 'A society in which everyone enjoys reproductive health with dignity and equality.',
    ar: 'مجتمع يتمتع فيه الجميع بالصحة الإنجابية بكرامة ومساواة.',
  },
  mission: {
    en: 'To enable access to high-quality reproductive health and family planning services, while respecting local culture and the values of society.',
    ar: 'تمكين الوصول إلى خدمات صحة إنجابية وتنظيم أسرة عالية الجودة، مع احترام الثقافة المحلية وقيم المجتمع.',
  },
  goals: [
    { en: 'Provide reproductive health services to target groups.', ar: 'تقديم خدمات الصحة الإنجابية للفئات المستهدفة.' },
    { en: 'Raise community awareness of family planning and reproductive health.', ar: 'رفع الوعي المجتمعي بقضايا تنظيم الأسرة والصحة الإنجابية.' },
    { en: 'Build the capacity of health workers and volunteers.', ar: 'بناء قدرات الكوادر الصحية والمتطوعين.' },
    { en: 'Influence health policies for the benefit of society.', ar: 'التأثير في السياسات الصحية لصالح المجتمع.' },
  ],
};

// Departments and units, from https://sudanfpa.org/الإدارات/. desc: null where the site gives none.
export const DEPARTMENTS = {
  source: SOURCES.departments,
  items: [
    { id: 'executive', icon: 'users', name: { en: 'Executive Management', ar: 'الإدارة التنفيذية العليا' },
      desc: { en: 'Oversees implementation of the association’s policies and strategic plans.', ar: 'تشرف على تنفيذ سياسات الجمعية وخططها الاستراتيجية.' } },
    { id: 'operations', icon: 'pin', name: { en: 'Operations', ar: 'إدارة العمليات' },
      desc: { en: 'Plans and follows up on projects in the branches.', ar: 'تخطط لمشاريع الفروع وتتابع تنفيذها.' } },
    { id: 'finance', icon: 'book', name: { en: 'Finance and Administration', ar: 'إدارة الشؤون المالية والإدارية' },
      desc: { en: 'Manages financial resources and procurement in line with governance standards.', ar: 'تدير الموارد المالية والمشتريات وفق معايير الحوكمة.' } },
    { id: 'health-digital', icon: 'stethoscope', name: { en: 'Health Services and Digital Interventions', ar: 'إدارة الخدمات الصحية والتدخلات الرقمية' }, desc: null },
    { id: 'hr', icon: 'hands', name: { en: 'Human Resources', ar: 'إدارة الموارد البشرية' },
      desc: { en: 'Develops the skills of staff and volunteers.', ar: 'تطوّر قدرات العاملين والمتطوعين.' } },
    { id: 'mel', icon: 'shield', name: { en: 'Monitoring, Evaluation, and Learning', ar: 'إدارة المتابعة والتقييم والتعلم' },
      desc: { en: 'Measures programme impact and safeguards service quality.', ar: 'تقيس أثر البرامج وتضمن جودة الخدمات.' } },
    { id: 'partnerships', icon: 'globe', name: { en: 'Partnerships and External Relations', ar: 'إدارة الشراكات والعلاقات الخارجية' },
      desc: { en: 'Builds local and international partnerships and manages institutional communication.', ar: 'تبني الشراكات المحلية والدولية وتدير التواصل المؤسسي.' } },
    { id: 'media', icon: 'chat', name: { en: 'Media and Behaviour Change', ar: 'إدارة الإعلام وتغيير السلوك' }, desc: null },
    { id: 'humanitarian', icon: 'tent', name: { en: 'Humanitarian Interventions', ar: 'إدارة التدخلات الإنسانية' }, desc: null },
  ],
};

// Partners, from https://sudanfpa.org/الشركاء/. The site lists six of the 25 partners
// and supporters counted in its 2025 statistics. No partner links or logos are imported.
export const PARTNERS = {
  source: SOURCES.partners,
  items: [
    { id: 'unfpa', name: { en: 'United Nations Population Fund (UNFPA)', ar: 'صندوق الأمم المتحدة للسكان UNFPA' }, type: { en: 'Strategic', ar: 'استراتيجي' },
      role: { en: 'Key strategic partner in reproductive health programmes.', ar: 'شريك استراتيجي رئيسي في برامج الصحة الإنجابية.' } },
    { id: 'ippf', name: { en: 'International Planned Parenthood Federation (IPPF)', ar: 'الاتحاد الدولي لتنظيم الأسرة IPPF' }, type: { en: 'Strategic', ar: 'استراتيجي' },
      role: { en: 'Membership, technical, and knowledge support.', ar: 'العضوية والدعم الفني والمعرفي.' } },
    { id: 'fmoh', name: { en: 'Federal Ministry of Health', ar: 'وزارة الصحة الاتحادية' }, type: { en: 'Government', ar: 'حكومي' },
      role: { en: 'Coordination partner in delivering health services.', ar: 'شريك تنسيق في تقديم الخدمات الصحية.' } },
    { id: 'who', name: { en: 'World Health Organization (WHO)', ar: 'منظمة الصحة العالمية WHO' }, type: { en: 'International', ar: 'دولي' },
      role: { en: 'Partner in public health programmes.', ar: 'شريك في برامج الصحة العامة.' } },
    { id: 'unicef', name: { en: 'UNICEF', ar: 'اليونيسف UNICEF' }, type: { en: 'International', ar: 'دولي' },
      role: { en: 'Partner in maternal and child health programmes.', ar: 'شريك في برامج صحة الأم والطفل.' } },
    { id: 'unhcr', name: { en: 'UN Refugee Agency (UNHCR)', ar: 'المفوضية السامية للأمم المتحدة لشؤون اللاجئين UNHCR' }, type: { en: 'International', ar: 'دولي' },
      role: { en: 'Partner in services for displaced people and refugees.', ar: 'شريك في الخدمات المقدمة للنازحين واللاجئين.' } },
  ],
};

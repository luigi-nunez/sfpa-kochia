// Programmes. Entries marked placeholder: true carry draft wording that SFPA must replace.
export const PROGRAMMES = [
  {
    id: 'youth',
    icon: 'users',
    placeholder: true,
    tag: { en: 'Youth and leadership', ar: 'الشباب والقيادة' },
    title: { en: 'Youth programme', ar: 'برنامج الشباب' },
    desc: {
      en: 'Placeholder: describe SFPA youth volunteering, peer education, and youth-friendly clinic work here.',
      ar: 'نص مؤقت: يُضاف هنا وصف عمل الجمعية في تطوع الشباب والتثقيف بالأقران والعيادات الصديقة للشباب.',
    },
    pillars: {
      en: ['Peer education and volunteering', 'Talks in schools and communities', 'Free youth-friendly consultations'],
      ar: ['التثقيف بالأقران والتطوع', 'محاضرات في المدارس والمجتمعات', 'استشارات مجانية صديقة للشباب'],
    },
    cta: { type: 'whatsapp', label: { en: 'Request a talk', ar: 'اطلب محاضرة' }, msg: { en: 'Hello, I would like to request a youth SRH talk.', ar: 'مرحباً، أرغب في طلب محاضرة توعوية للشباب.' } },
  },
  {
    id: 'humanitarian',
    icon: 'tent',
    placeholder: true,
    tag: { en: 'Emergency response', ar: 'الاستجابة للطوارئ' },
    title: { en: 'Humanitarian response', ar: 'الاستجابة الإنسانية' },
    desc: {
      en: 'Placeholder: describe how SFPA delivers sexual and reproductive health care to displaced and crisis-affected communities.',
      ar: 'نص مؤقت: يُضاف هنا وصف عمل الجمعية في تقديم خدمات الصحة الجنسية والإنجابية للنازحين والمجتمعات المتأثرة بالأزمة.',
    },
    pillars: {
      en: ['Mobile outreach to displaced communities', 'Safe motherhood and emergency obstetric referral', 'Care for survivors of violence'],
      ar: ['فرق متنقلة للوصول إلى النازحين', 'الأمومة الآمنة والإحالة للطوارئ التوليدية', 'رعاية الناجيات من العنف'],
    },
    cta: { type: 'link', to: '/donate', label: { en: 'Support this work', ar: 'ادعم هذا العمل' } },
  },
  {
    id: 'kochia',
    icon: 'phone',
    placeholder: false,
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

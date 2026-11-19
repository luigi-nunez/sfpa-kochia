// News imported from https://sudanfpa.org/news/ (retrieved 19 November 2026). That page lists
// two stories, both dated 8 July 2026. Titles follow SFPA's Arabic; bodies are short summaries of
// what each story says, with nothing added. Each item keeps its original date and source URL.
// SFPA's Arabic title spells قرى as قري; corrected here. SFPA's site gives no category, author, or photo credit; categories here are ours.
// CMS note: maps to a "post" type with category, date, excerpt, body blocks, and source.
export const NEWS = [
  {
    slug: 'women-health-workshop-khartoum',
    date: '2026-07-08',
    source: 'https://sudanfpa.org/news/women-health-workshop-khartoum/',
    cat: { en: 'Awareness', ar: 'التوعية' },
    title: { en: 'Health awareness workshops for women in Khartoum State', ar: 'ورشة توعية صحية للنساء في ولاية الخرطوم' },
    excerpt: {
      en: 'SFPA launched a series of awareness workshops on reproductive health and family planning, aiming to reach more than 500 women.',
      ar: 'أطلقت الجمعية سلسلة ورش توعية تستهدف أكثر من ٥٠٠ امرأة حول الصحة الإنجابية وتنظيم الأسرة.',
    },
    body: {
      en: ['SFPA has launched a series of awareness workshops for women in Khartoum State. The workshops cover reproductive health and family planning and aim to reach more than 500 women.', 'The photo published with the story shows an awareness session at one of SFPA’s branches.'],
      ar: ['أطلقت جمعية تنظيم الأسرة السودانية سلسلة ورش توعية للنساء في ولاية الخرطوم، تتناول الصحة الإنجابية وتنظيم الأسرة وتستهدف أكثر من ٥٠٠ امرأة.', 'وتُظهر الصورة المنشورة مع الخبر جلسة توعية في أحد فروع الجمعية.'],
    },
  },
  {
    slug: 'mobile-clinic-kordofan',
    date: '2026-07-08',
    source: 'https://sudanfpa.org/news/mobile-clinic-kordofan/',
    cat: { en: 'Outreach', ar: 'الوصول المجتمعي' },
    title: { en: 'Mobile clinic launched in remote villages of North Kordofan', ar: 'انطلاق العيادة المتنقلة في قرى نائية بشمال كردفان' },
    excerpt: {
      en: 'SFPA’s mobile clinic now travels to remote villages in North Kordofan, offering free health services to families.',
      ar: 'العيادة المتنقلة تصل إلى القرى النائية وتقدم خدمات صحية مجانية للأسر السودانية.',
    },
    body: {
      en: ['SFPA has started running a mobile clinic in remote villages of North Kordofan. The clinic travels to the villages and provides free health services to Sudanese families.'],
      ar: ['بدأت الجمعية تشغيل عيادة متنقلة في القرى النائية بولاية شمال كردفان، تصل إلى القرى وتقدم خدمات صحية مجانية للأسر السودانية.'],
    },
  },
];

export const getNews = (slug) => NEWS.find((n) => n.slug === slug);

// News. All items are SAMPLE content that demonstrates the layout; replace with SFPA stories.
// CMS note: maps to a "post" type with category, date, excerpt, and body blocks.
export const NEWS = [
  {
    slug: 'sample-clinic-hours',
    sample: true,
    date: '2026-11-10',
    cat: { en: 'Announcement', ar: 'إعلان' },
    title: { en: 'Sample: updated clinic opening hours', ar: 'نموذج: تحديث ساعات عمل العيادات' },
    excerpt: { en: 'This is a sample announcement showing how service updates will appear. Replace it with a real SFPA notice.', ar: 'هذا إعلان نموذجي يوضح طريقة عرض تحديثات الخدمات. يُستبدل بإعلان حقيقي من الجمعية.' },
    body: {
      en: ['This sample shows how an announcement reads on its own page. Each paragraph is a separate block, so content from a future CMS can drop in without layout changes.', 'Clinic hours, closures, and new services are typical announcements.'],
      ar: ['يوضح هذا النموذج طريقة عرض الإعلان في صفحته الخاصة. كل فقرة كتلة مستقلة، لذا يمكن إضافة المحتوى من نظام إدارة محتوى مستقبلاً دون تغيير التصميم.', 'من الإعلانات المعتادة: ساعات العمل والإغلاقات والخدمات الجديدة.'],
    },
  },
  {
    slug: 'sample-youth-campaign',
    sample: true,
    date: '2026-10-28',
    cat: { en: 'Youth', ar: 'الشباب' },
    title: { en: 'Sample: youth awareness campaign', ar: 'نموذج: حملة توعية للشباب' },
    excerpt: { en: 'A sample story about a youth outreach activity. Replace with a real campaign report and photo.', ar: 'قصة نموذجية عن نشاط توعوي للشباب. تُستبدل بتقرير وصورة حملة حقيقية.' },
    body: {
      en: ['Campaign stories can include a photo, a short summary of what happened, and a call to action such as requesting a talk.'],
      ar: ['يمكن أن تتضمن قصص الحملات صورة وملخصاً لما حدث ودعوة لاتخاذ إجراء مثل طلب محاضرة.'],
    },
  },
  {
    slug: 'sample-outreach',
    sample: true,
    date: '2026-10-05',
    cat: { en: 'Outreach', ar: 'الوصول المجتمعي' },
    title: { en: 'Sample: mobile outreach visit', ar: 'نموذج: زيارة فريق متنقل' },
    excerpt: { en: 'A sample report on a mobile clinic visit. Replace with real outreach updates.', ar: 'تقرير نموذجي عن زيارة عيادة متنقلة. يُستبدل بتحديثات حقيقية.' },
    body: {
      en: ['Outreach reports help partners and donors see where services reach. Avoid publishing details that could identify clients or put teams at risk.'],
      ar: ['تساعد تقارير الوصول المجتمعي الشركاء والمانحين على معرفة أماكن وصول الخدمات. تجنب نشر تفاصيل قد تكشف هوية المستفيدين أو تعرض الفرق للخطر.'],
    },
  },
];

export const getNews = (slug) => NEWS.find((n) => n.slug === slug);

// Service catalogue, modelled on CEMOPLAF's four-group structure.
// Each entry links to priced items in src/data/services.js (SFPA Medical Services Registry) via priceIds.
// Descriptions are general SRH information drafted for review; SFPA clinical staff should confirm
// that each service is offered and that the wording matches local practice before go-live.
// CMS note: this array maps directly to a "service" content type with a "group" taxonomy.

export const GROUPS = [
  {
    id: 'womens-health',
    icon: 'female',
    title: { en: "Women's health", ar: 'صحة المرأة' },
    desc: { en: 'Gynaecology, pregnancy care, and screening for every stage of life.', ar: 'أمراض النساء ورعاية الحمل والفحوصات في كل مراحل الحياة.' },
  },
  {
    id: 'family-planning',
    icon: 'calendar',
    title: { en: 'Family planning', ar: 'تنظيم الأسرة' },
    desc: { en: 'Counselling and a full range of contraceptive methods, chosen by you.', ar: 'مشورة ومجموعة كاملة من وسائل منع الحمل، والاختيار لك.' },
  },
  {
    id: 'prevention-diagnosis',
    icon: 'microscope',
    title: { en: 'Prevention and diagnosis', ar: 'الوقاية والتشخيص' },
    desc: { en: 'Confidential testing and laboratory services.', ar: 'فحوصات سرية وخدمات مختبرية.' },
  },
  {
    id: 'general-support',
    icon: 'heart',
    title: { en: 'General care and support', ar: 'الرعاية العامة والدعم' },
    desc: { en: 'General medicine, youth services, and psychosocial support.', ar: 'الطب العام وخدمات الشباب والدعم النفسي والاجتماعي.' },
  },
];

export const SPECIALTIES = [
  // Women's health
  {
    slug: 'gynaecology', group: 'womens-health', icon: 'female', featured: true, bookable: true,
    title: { en: 'Gynaecology', ar: 'أمراض النساء' },
    summary: { en: 'Check-ups, diagnosis, and treatment for gynaecological concerns with a qualified clinician.', ar: 'فحوصات وتشخيص وعلاج لمشكلات أمراض النساء مع طبيب مؤهل.' },
    bullets: {
      en: ['Routine gynaecological check-up', 'Assessment and treatment of infections', 'Menstrual and menopause concerns', 'Pelvic examination when needed'],
      ar: ['فحص نسائي دوري', 'تقييم الالتهابات وعلاجها', 'مشكلات الدورة الشهرية وانقطاعها', 'فحص الحوض عند الحاجة'],
    },
    priceIds: ['s03', 's40'],
  },
  {
    slug: 'antenatal-care', group: 'womens-health', icon: 'baby', featured: true, bookable: true,
    title: { en: 'Antenatal care', ar: 'رعاية الحمل' },
    summary: { en: 'Regular check-ups to keep you and your baby healthy throughout pregnancy.', ar: 'متابعة منتظمة للحفاظ على صحتك وصحة طفلك طوال فترة الحمل.' },
    bullets: {
      en: ['First antenatal assessment', 'Follow-up visits', 'Advice on nutrition and danger signs', 'Referral for delivery planning'],
      ar: ['تقييم الزيارة الأولى للحمل', 'زيارات المتابعة', 'نصائح غذائية وعلامات الخطر', 'إحالة للتخطيط للولادة'],
    },
    priceIds: ['s35', 's36'],
  },
  {
    slug: 'ultrasound', group: 'womens-health', icon: 'scan', bookable: true,
    title: { en: 'Obstetric ultrasound', ar: 'الموجات فوق الصوتية للحمل' },
    summary: { en: 'Ultrasound scans to check on your pregnancy.', ar: 'فحص بالموجات فوق الصوتية لمتابعة الحمل.' },
    bullets: {
      en: ['Confirm and date a pregnancy', 'Check growth and position', 'Results explained by a clinician'],
      ar: ['تأكيد الحمل وتحديد عمره', 'متابعة النمو والوضعية', 'شرح النتائج من قبل الطبيب'],
    },
    priceIds: ['s37'],
  },
  {
    slug: 'cervical-screening', group: 'womens-health', icon: 'shield', featured: true, bookable: true,
    title: { en: 'Cervical cancer screening', ar: 'الكشف المبكر عن سرطان عنق الرحم' },
    summary: { en: 'Screening and early treatment to prevent cervical cancer.', ar: 'فحص وعلاج مبكر للوقاية من سرطان عنق الرحم.' },
    bullets: {
      en: ['Pap smear', 'Colposcopy', 'Cryotherapy for early lesions'],
      ar: ['مسحة عنق الرحم (باب سمير)', 'منظار عنق الرحم', 'العلاج بالتبريد للآفات المبكرة'],
    },
    priceIds: ['s30', 's41', 's42'],
  },

  // Family planning
  {
    slug: 'contraceptive-counselling', group: 'family-planning', icon: 'chat', featured: true, bookable: true,
    title: { en: 'Contraceptive counselling', ar: 'مشورة وسائل منع الحمل' },
    summary: { en: 'A private conversation to find the method that suits your life. Free of charge.', ar: 'حديث خاص لاختيار الوسيلة التي تناسب حياتك. مجاناً.' },
    bullets: {
      en: ['Compare every available method', 'Discuss side effects and concerns', 'Switch or stop a method safely'],
      ar: ['مقارنة جميع الوسائل المتاحة', 'مناقشة الآثار الجانبية والمخاوف', 'تغيير الوسيلة أو إيقافها بأمان'],
    },
    priceIds: ['s04'],
  },
  {
    slug: 'short-acting-methods', group: 'family-planning', icon: 'pill', bookable: true,
    title: { en: 'Pills, injectables, and condoms', ar: 'الحبوب والحقن والواقي' },
    summary: { en: 'Short-acting methods you can start today, including emergency contraception.', ar: 'وسائل قصيرة المدى يمكنك البدء بها اليوم، بما فيها وسائل الطوارئ.' },
    bullets: {
      en: ['Combined and progestogen-only pills', 'Injectable contraception (DMPA)', 'Emergency contraception', 'Male and female condoms'],
      ar: ['الحبوب المركبة وحبوب البروجستيرون', 'الحقن المانعة للحمل (ديبو)', 'وسائل منع الحمل الطارئة', 'الواقي الذكري والأنثوي'],
    },
    priceIds: ['s10', 's11', 's12', 's17', 's18', 's19'],
  },
  {
    slug: 'long-acting-methods', group: 'family-planning', icon: 'clock', bookable: true,
    title: { en: 'IUDs and implants', ar: 'اللولب والكبسولة' },
    summary: { en: 'Long-acting, reversible methods that last for years.', ar: 'وسائل طويلة المفعول وقابلة للإرجاع تدوم لسنوات.' },
    bullets: {
      en: ['IUD insertion and removal', 'Implant insertion and removal', 'Follow-up check after insertion'],
      ar: ['تركيب اللولب وإزالته', 'تركيب الكبسولة وإزالتها', 'متابعة بعد التركيب'],
    },
    priceIds: ['s13', 's14', 's15', 's16'],
  },

  // Prevention and diagnosis
  {
    slug: 'sti-hiv-testing', group: 'prevention-diagnosis', icon: 'shield', featured: true, bookable: true,
    title: { en: 'STI and HIV testing', ar: 'فحص الأمراض المنقولة جنسياً والإيدز' },
    summary: { en: 'Confidential testing and treatment. HIV rapid testing is free.', ar: 'فحص وعلاج بسرية تامة. فحص الإيدز السريع مجاني.' },
    bullets: {
      en: ['HIV rapid test', 'Syphilis, gonorrhoea, and chlamydia tests', 'Hepatitis B and C tests', 'Treatment where possible'],
      ar: ['فحص الإيدز السريع', 'فحص الزهري والسيلان والكلاميديا', 'فحص الالتهاب الكبدي B و C', 'العلاج عند الإمكان'],
    },
    priceIds: ['s22', 's25', 's26', 's27', 's23', 's24', 's53'],
  },
  {
    slug: 'laboratory', group: 'prevention-diagnosis', icon: 'microscope', bookable: true,
    title: { en: 'Laboratory', ar: 'المختبر' },
    summary: { en: 'Routine laboratory tests with results discussed by your clinician.', ar: 'فحوصات مختبرية روتينية يناقش طبيبك نتائجها معك.' },
    bullets: {
      en: ['Complete blood count', 'Blood glucose and urine analysis', 'Pregnancy test'],
      ar: ['صورة الدم الكاملة', 'سكر الدم وتحليل البول', 'فحص الحمل'],
    },
    priceIds: ['s20', 's21', 's28', 's29'],
  },
  {
    slug: 'abortion-care', group: 'prevention-diagnosis', icon: 'heart', bookable: false,
    title: { en: 'Post-abortion care', ar: 'الرعاية بعد الإجهاض' },
    summary: { en: 'Free, confidential care after a miscarriage or abortion, and safe abortion services within the limits of Sudanese law.', ar: 'رعاية مجانية وسرية بعد الإجهاض التلقائي أو الإجهاض، وخدمات الإجهاض الآمن في حدود القانون السوداني.' },
    bullets: {
      en: ['Treatment of complications', 'Counselling and contraception afterwards', 'Contact us privately on WhatsApp first'],
      ar: ['علاج المضاعفات', 'المشورة ووسائل منع الحمل بعدها', 'تواصل معنا بسرية عبر واتساب أولاً'],
    },
    priceIds: ['s51', 's50'],
  },

  // General care and support
  {
    slug: 'general-medicine', group: 'general-support', icon: 'stethoscope', featured: true, bookable: true,
    title: { en: 'General medicine', ar: 'الطب العام' },
    summary: { en: 'Consultations with general practitioners and specialists.', ar: 'استشارات مع أطباء عموميين ومتخصصين.' },
    bullets: {
      en: ['General practitioner consultation', 'Specialist consultation', 'Referral letters and coordination'],
      ar: ['استشارة طبيب عام', 'استشارة طبيب متخصص', 'خطابات الإحالة والتنسيق'],
    },
    priceIds: ['s01', 's02', 's57'],
  },
  {
    slug: 'youth-services', group: 'general-support', icon: 'users', bookable: true,
    title: { en: 'Youth-friendly services', ar: 'خدمات صديقة للشباب' },
    summary: { en: 'Free, non-judgemental care and information for young people.', ar: 'رعاية ومعلومات مجانية بدون أحكام للشباب.' },
    bullets: {
      en: ['Youth-friendly consultation', 'Education sessions for adolescents', 'Privacy respected at every visit'],
      ar: ['استشارة صديقة للشباب', 'جلسات تثقيفية للمراهقين', 'احترام الخصوصية في كل زيارة'],
    },
    priceIds: ['s05', 's56'],
  },
  {
    slug: 'gbv-support', group: 'general-support', icon: 'hands', bookable: false,
    title: { en: 'Support for survivors of violence', ar: 'دعم الناجيات من العنف' },
    summary: { en: 'Free, confidential medical care, counselling, and referral for survivors of gender-based violence.', ar: 'رعاية طبية ومشورة وإحالة مجانية وسرية للناجيات من العنف القائم على النوع الاجتماعي.' },
    bullets: {
      en: ['Medical care and counselling', 'Referral to specialised services', 'You decide what happens next'],
      ar: ['رعاية طبية ومشورة', 'إحالة لخدمات متخصصة', 'القرار لكِ في الخطوة التالية'],
    },
    priceIds: ['s52'],
  },
  {
    slug: 'mental-health', group: 'general-support', icon: 'brain', bookable: true,
    title: { en: 'Mental health and nutrition', ar: 'الصحة النفسية والتغذية' },
    summary: { en: 'Free mental health first aid and nutritional counselling.', ar: 'إسعافات أولية نفسية وإرشاد غذائي مجاناً.' },
    bullets: {
      en: ['Mental health first aid', 'Nutritional counselling', 'Referral for further support'],
      ar: ['الإسعافات الأولية للصحة النفسية', 'الإرشاد الغذائي', 'الإحالة لمزيد من الدعم'],
    },
    priceIds: ['s55', 's54'],
  },
];

export const getSpecialty = (slug) => SPECIALTIES.find((s) => s.slug === slug);

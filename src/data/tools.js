// Interactive decision-aid tools.
// Each tool has a list of steps. Each step has a question and options.
// Each option may either move to the next step (next: 'step_id') or resolve to a result (result: 'result_id').
// Results are defined in the results map.

export const TOOLS = [
  {
    id: 't01',
    icon: '🛡️',
    title_en: 'Which contraceptive method suits me?',
    title_ar: 'أي وسيلة منع حمل تناسبني؟',
    desc_en: 'Answer a few questions to explore contraceptive options that may fit your situation.',
    desc_ar: 'أجب على بعض الأسئلة لاستكشاف خيارات منع الحمل التي قد تناسب وضعك.',
    steps: [
      {
        id: 'q1',
        q_en: 'Are you hoping to become pregnant in the next year?',
        q_ar: 'هل تخططين للحمل خلال السنة القادمة؟',
        opts: [
          { label_en: 'Yes', label_ar: 'نعم', next: 'q_soon' },
          { label_en: 'No — not within the next year', label_ar: 'لا — ليس خلال السنة القادمة', next: 'q2' },
          { label_en: "I don't want to become pregnant at all", label_ar: 'لا أريد الحمل نهائياً', next: 'q_never' },
        ],
      },
      {
        id: 'q_soon',
        q_en: 'Since pregnancy is planned soon, what are you most concerned about right now?',
        q_ar: 'بما أن الحمل قريب، ما الذي يشغل تفكيرك الآن؟',
        opts: [
          { label_en: 'Getting pregnant as soon as possible', label_ar: 'الحمل في أقرب وقت ممكن', result: 'r_no_method' },
          { label_en: 'Protection until I am ready', label_ar: 'الحماية حتى أكون مستعدة', result: 'r_short_act' },
        ],
      },
      {
        id: 'q_never',
        q_en: 'Are you certain you never want a pregnancy?',
        q_ar: 'هل أنتِ متأكدة أنك لا تريدين الحمل أبداً؟',
        opts: [
          { label_en: 'Yes — I want a permanent option', label_ar: 'نعم — أريد خياراً دائماً', result: 'r_permanent' },
          { label_en: "Not 100% sure — I'd like a long-acting reversible option", label_ar: 'لستُ متأكدة 100% — أريد خياراً طويل المدى قابلاً للعكس', result: 'r_larc' },
        ],
      },
      {
        id: 'q2',
        q_en: 'How important is it that you can stop the method and return to fertility quickly?',
        q_ar: 'ما مدى أهمية إمكانية إيقاف الوسيلة والعودة للخصوبة بسرعة؟',
        opts: [
          { label_en: 'Very important — I may want to get pregnant within 1–2 years', label_ar: 'مهم جداً — قد أرغب في الحمل خلال 1–2 سنة', result: 'r_short_act' },
          { label_en: 'Not urgent — I want something that lasts several years', label_ar: 'ليس عاجلاً — أريد شيئاً يدوم عدة سنوات', next: 'q3' },
        ],
      },
      {
        id: 'q3',
        q_en: 'Do you prefer to avoid taking a pill every day?',
        q_ar: 'هل تفضلين تجنّب تناول حبة يومياً؟',
        opts: [
          { label_en: "Yes — I'd prefer 'set and forget'", label_ar: 'نعم — أفضّل ما لا يحتاج تذكّراً يومياً', result: 'r_larc' },
          { label_en: 'No — I am comfortable with a daily routine', label_ar: 'لا — مرتاحة للروتين اليومي', result: 'r_pills' },
        ],
      },
    ],
    results: {
      r_no_method: {
        title_en: "No contraception needed right now",
        title_ar: 'لا تحتاجين لوسيلة الآن',
        body_en: 'Since you are planning pregnancy soon, you may not need contraception. Speak with a health provider about preparing for a healthy pregnancy, including folic acid supplementation and antenatal care.',
        body_ar: 'بما أنك تخططين للحمل قريباً، قد لا تحتاجين لوسيلة منع حمل. تحدثي مع مختص حول الاستعداد لحمل صحي، بما يشمل حمض الفوليك ورعاية ما قبل الولادة.',
        wa_en: 'Hello, I would like advice on planning a healthy pregnancy.',
        wa_ar: 'مرحباً، أريد نصيحة حول التخطيط لحمل صحي.',
      },
      r_short_act: {
        title_en: 'Short-acting methods may suit you',
        title_ar: 'الطرق قصيرة المدى قد تناسبك',
        body_en: 'Methods like combined oral contraceptive pills, progestogen-only pills, or injectable contraceptives (DMPA) offer effective protection and fertility returns quickly after stopping. Condoms also protect against STIs. A counsellor can help you choose the best fit.',
        body_ar: 'تقدم الطرق مثل حبوب منع الحمل المركبة أو حبوب البروجستيرون أو الحقن حماية فعّالة، وتعود الخصوبة بسرعة بعد الإيقاف. الواقيات توفر أيضاً حماية من الأمراض. مستشار يمكنه مساعدتك في الاختيار.',
        wa_en: 'Hello, I would like advice on short-acting contraceptive methods.',
        wa_ar: 'مرحباً، أريد نصيحة حول وسائل منع الحمل قصيرة المدى.',
      },
      r_larc: {
        title_en: 'Long-acting reversible contraception (LARC)',
        title_ar: 'وسائل منع الحمل طويلة المدى القابلة للعكس',
        body_en: 'LARCs such as the IUD (copper or hormonal) or sub-dermal implant are more than 99% effective, last several years, and fertility returns quickly once removed. They are a good fit if you want reliable, long-term protection without thinking about it daily. Ask an SFPA counsellor for more information.',
        body_ar: 'تُعدّ اللولب الرحمي (نحاسي أو هرموني) والكبسولات تحت الجلد من أكثر من 99% فعالية، وتدوم سنوات، وتعود الخصوبة بسرعة عند الإزالة. مناسبة إذا أردتِ حماية موثوقة دون تفكير يومي. تحدثي مع مستشار الجمعية.',
        wa_en: 'Hello, I would like information about long-acting reversible contraception (IUD or implant).',
        wa_ar: 'مرحباً، أريد معلومات حول وسائل منع الحمل طويلة المدى (اللولب أو الكبسولة).',
      },
      r_pills: {
        title_en: 'Combined oral contraceptive pills',
        title_ar: 'حبوب منع الحمل المركبة',
        body_en: 'The combined pill is taken daily and is over 99% effective with perfect use. It can also help with period pain and regularity. It is available at SFPA clinics. A counsellor will check your health history to make sure it is right for you.',
        body_ar: 'تؤخذ الحبوب المركبة يومياً وفعاليتها أكثر من 99% مع الاستخدام المثالي. يمكنها أيضاً المساعدة في ألم الدورة وانتظامها. تتوفر في عيادات الجمعية. سيتحقق المستشار من تاريخك الصحي للتأكد من ملاءمتها.',
        wa_en: 'Hello, I would like information about oral contraceptive pills.',
        wa_ar: 'مرحباً، أريد معلومات حول حبوب منع الحمل.',
      },
      r_permanent: {
        title_en: 'Speak with a specialist',
        title_ar: 'تحدثي مع مختص',
        body_en: 'Permanent contraception (such as tubal ligation) is available but requires counselling and careful consideration. Please speak with a specialist at an SFPA clinic to explore your options and ensure an informed decision.',
        body_ar: 'يتوفر منع الحمل الدائم (كربط قناتَي فالوب) لكنه يتطلب استشارة ومراعاة دقيقة. تحدثي مع مختص في عيادات الجمعية لاستكشاف خياراتك وضمان اتخاذ قرار مستنير.',
        wa_en: 'Hello, I would like to speak with a specialist about permanent contraception options.',
        wa_ar: 'مرحباً، أريد التحدث مع مختص حول خيارات منع الحمل الدائم.',
      },
    },
  },

  {
    id: 't02',
    icon: '🔬',
    title_en: 'Should I get an STI test?',
    title_ar: 'هل ينبغي لي إجراء فحص الأمراض المنقولة جنسياً؟',
    desc_en: 'A quick self-assessment to help you decide whether STI testing is recommended for you.',
    desc_ar: 'تقييم ذاتي سريع لمساعدتك في تحديد ما إذا كان فحص الأمراض المنقولة جنسياً موصى به.',
    steps: [
      {
        id: 'q1',
        q_en: 'Have you had unprotected sex (without a condom) in the past 12 months?',
        q_ar: 'هل مارستَ جنساً غير محمي (بدون واقٍ) خلال الـ12 شهراً الماضية؟',
        opts: [
          { label_en: 'Yes', label_ar: 'نعم', next: 'q2' },
          { label_en: 'No', label_ar: 'لا', next: 'q_no_unprot' },
        ],
      },
      {
        id: 'q_no_unprot',
        q_en: 'Do you have any current symptoms such as unusual discharge, sores, burning when urinating, or pelvic pain?',
        q_ar: 'هل لديك أعراض حالية مثل إفراز غير طبيعي، أو قروح، أو حرقة عند التبول، أو ألم في الحوض؟',
        opts: [
          { label_en: 'Yes', label_ar: 'نعم', result: 'r_test_symptoms' },
          { label_en: 'No', label_ar: 'لا', result: 'r_low_risk' },
        ],
      },
      {
        id: 'q2',
        q_en: 'Did you have more than one partner, or a new partner, in the past 12 months?',
        q_ar: 'هل كان لديك أكثر من شريك، أو شريك جديد، خلال الـ12 شهراً الماضية؟',
        opts: [
          { label_en: 'Yes', label_ar: 'نعم', result: 'r_test_recommended' },
          { label_en: 'No — one long-term partner', label_ar: 'لا — شريك واحد طويل الأمد', next: 'q3' },
        ],
      },
      {
        id: 'q3',
        q_en: 'Do you have any symptoms such as unusual discharge, sores, burning when urinating, or pelvic pain?',
        q_ar: 'هل لديك أعراض مثل إفراز غير طبيعي، أو قروح، أو حرقة عند التبول، أو ألم في الحوض؟',
        opts: [
          { label_en: 'Yes', label_ar: 'نعم', result: 'r_test_symptoms' },
          { label_en: 'No', label_ar: 'لا', result: 'r_test_regular' },
        ],
      },
    ],
    results: {
      r_test_recommended: {
        title_en: 'Testing is recommended',
        title_ar: 'الفحص موصى به',
        body_en: 'Based on your answers, getting tested for STIs is a good idea. Many STIs have no symptoms but can affect your health if untreated. SFPA clinics offer confidential, affordable (and some free) STI testing. Early detection means effective treatment.',
        body_ar: 'بناءً على إجاباتك، إجراء فحص الأمراض المنقولة جنسياً فكرة جيدة. كثير منها لا تُسبب أعراضاً لكن قد تؤثر على صحتك إذا لم تُعالج. تقدم عيادات الجمعية فحصاً سرياً وبأسعار معقولة (وبعضها مجاني). الكشف المبكر يعني علاجاً فعّالاً.',
        wa_en: 'Hello, I would like information about STI testing at an SFPA clinic.',
        wa_ar: 'مرحباً، أريد معلومات حول فحص الأمراض المنقولة جنسياً في عيادات الجمعية.',
      },
      r_test_symptoms: {
        title_en: 'Please seek care soon',
        title_ar: 'يرجى طلب الرعاية قريباً',
        body_en: 'You have symptoms that should be checked by a health professional. Please visit an SFPA clinic or contact a counsellor as soon as possible. Many STIs are easily treated when caught early.',
        body_ar: 'لديك أعراض ينبغي أن يفحصها مختص صحي. يرجى زيارة عيادة الجمعية أو التواصل مع مستشار في أقرب وقت ممكن. كثير من الأمراض المنقولة جنسياً تُعالج بسهولة إذا اكتُشفت مبكراً.',
        wa_en: 'Hello, I have some symptoms I am concerned about and would like advice.',
        wa_ar: 'مرحباً، لديّ بعض الأعراض المقلقة وأريد المشورة.',
      },
      r_test_regular: {
        title_en: 'Regular testing is a good practice',
        title_ar: 'الفحص الدوري ممارسة جيدة',
        body_en: 'Your risk appears lower, but regular STI testing (at least once a year if you are sexually active) is a healthy habit. You can book a confidential test at any SFPA clinic.',
        body_ar: 'يبدو خطرك منخفضاً، لكن الفحص الدوري للأمراض المنقولة جنسياً (مرة على الأقل سنوياً إذا كنتَ نشطاً جنسياً) عادة صحية جيدة. يمكنك حجز فحص سري في أي عيادة من عيادات الجمعية.',
        wa_en: 'Hello, I would like to book a confidential STI test.',
        wa_ar: 'مرحباً، أريد حجز فحص سري للأمراض المنقولة جنسياً.',
      },
      r_low_risk: {
        title_en: 'Your risk appears low',
        title_ar: 'يبدو خطرك منخفضاً',
        body_en: 'Based on your answers, your risk of an STI appears to be low right now. However, regular testing is still a healthy habit if you are sexually active. If you develop any symptoms, seek care promptly.',
        body_ar: 'بناءً على إجاباتك، يبدو خطر إصابتك بأمراض منقولة جنسياً منخفضاً حالياً. لكن الفحص الدوري لا يزال عادة صحية جيدة إذا كنتَ نشطاً جنسياً. إذا ظهرت عليك أعراض، اطلب الرعاية فوراً.',
        wa_en: 'Hello, I have some questions about STI prevention.',
        wa_ar: 'مرحباً، لديّ أسئلة حول الوقاية من الأمراض المنقولة جنسياً.',
      },
    },
  },
];

// Each tool has: id, icon, title, desc, steps[]
// Each step has: q, opts[]
// Each opt has: label, next (step index or "result"), result? {title, body, type, showWA}

export const tools = {
  en: [
    {
      id: "fp-chooser",
      icon: "🌿",
      title: "Find Your Contraceptive Method",
      desc: "Answer 3 quick questions to get a personalised recommendation.",
      steps: [
        {
          q: "Are you currently breastfeeding?",
          opts: [
            { label: "Yes, exclusively breastfeeding", next: 1 },
            { label: "No / Not applicable", next: 2 },
          ],
        },
        {
          q: "How long has your baby been under 6 months old?",
          opts: [
            {
              label: "Under 6 months — baby fully breastfed",
              next: "result",
              result: {
                title: "LAM may be suitable for you",
                body: "The Lactational Amenorrhoea Method (LAM) is over 98% effective if you are exclusively breastfeeding a baby under 6 months who has not restarted your periods. Combine with condoms for extra protection. Visit an SFPA branch to confirm your eligibility and discuss backup options.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "Baby is over 6 months or partially breastfed",
              next: 2,
            },
          ],
        },
        {
          q: "Do you want a method that lasts more than 1 year without thinking about it daily?",
          opts: [
            {
              label: "Yes — I prefer something long-term",
              next: "result",
              result: {
                title: "Long-Acting Methods Are Best for You",
                body: "Consider an IUD (copper or hormonal, 3–10 years) or implant (3 years). These are the most effective methods available (>99%) and require no daily effort. All are reversible — fertility returns quickly after removal. Visit any SFPA branch for a free consultation and insertion.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "No — I prefer short-term or on-demand options",
              next: 3,
            },
          ],
        },
        {
          q: "Do you also want protection against STIs?",
          opts: [
            {
              label: "Yes — dual protection is important to me",
              next: "result",
              result: {
                title: "Condoms + Hormonal Method",
                body: "No hormonal method protects against STIs. The best approach is to use condoms consistently (male or female) and add a hormonal method like the pill or injectable for pregnancy prevention. SFPA provides condoms, pills, and injectables free of charge.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "No — just pregnancy prevention",
              next: "result",
              result: {
                title: "Daily Pill or Monthly/Quarterly Injectable",
                body: "Combined oral contraceptive pills (taken daily) or injectable contraceptives (every 1–3 months) are reliable and reversible options. Both are over 99% effective with correct use. Speak to an SFPA counsellor to find which suits your routine best.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
      ],
    },

    {
      id: "sti-check",
      icon: "🔎",
      title: "Should I Get Tested for STIs?",
      desc: "A short self-check to help you decide if STI testing is right for you now.",
      steps: [
        {
          q: "Have you had unprotected sex (without a condom) in the last 3 months?",
          opts: [
            { label: "Yes", next: 1 },
            { label: "No", next: 2 },
          ],
        },
        {
          q: "Have you had a new partner or multiple partners in the last year?",
          opts: [
            {
              label: "Yes",
              next: "result",
              result: {
                title: "Testing Is Recommended",
                body: "Based on your answers, STI testing is recommended. Many STIs have no symptoms and can be passed on unknowingly. SFPA offers free, confidential testing and treatment. Visit any branch — no appointment needed.",
                type: "warning",
                showWA: true,
              },
            },
            {
              label: "No",
              next: "result",
              result: {
                title: "Consider Getting Tested as a Precaution",
                body: "Even with lower risk, getting tested gives you peace of mind and protects your health. SFPA recommends annual STI screening for all sexually active people. Testing is free and confidential at all branches.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
        {
          q: "Do you have any of these symptoms: unusual discharge, sores, pain during sex, or burning when urinating?",
          opts: [
            {
              label: "Yes, I have one or more of these",
              next: "result",
              result: {
                title: "Please Seek Care Now",
                body: "Your symptoms may indicate an STI or other reproductive health condition requiring treatment. Please visit an SFPA branch as soon as possible. Untreated STIs can cause serious complications. Testing and treatment are free and confidential.",
                type: "warning",
                showWA: true,
              },
            },
            {
              label: "No symptoms",
              next: "result",
              result: {
                title: "Regular Screening Is Still Advised",
                body: "Many STIs have no symptoms at all. SFPA recommends annual testing for anyone who is sexually active. Testing is fast, free, and confidential at all our branches.",
                type: "info",
                showWA: false,
              },
            },
          ],
        },
      ],
    },

    {
      id: "pregnancy-check",
      icon: "🤰",
      title: "Am I Pregnant? What Next?",
      desc: "Guidance on pregnancy signs, testing, and your care options.",
      steps: [
        {
          q: "Have you missed a period or experienced unusual symptoms such as nausea or breast tenderness?",
          opts: [
            { label: "Yes — I think I might be pregnant", next: 1 },
            {
              label: "No — just want general information",
              next: "result",
              result: {
                title: "Pregnancy Test Available at SFPA",
                body: "If you want to know whether you could become pregnant or want to plan ahead, SFPA offers free counselling on contraception and fertility. Lab-based pregnancy tests are also available at our branches.",
                type: "info",
                showWA: false,
              },
            },
          ],
        },
        {
          q: "Have you taken a home pregnancy test?",
          opts: [
            {
              label: "Yes — it was positive",
              next: "result",
              result: {
                title: "Confirm Your Pregnancy at an SFPA Clinic",
                body: "A positive home test is usually reliable. Your next step is to visit an SFPA branch to confirm the pregnancy with a clinical test, get your due date, and start antenatal care. The earlier you begin antenatal care, the better for you and your baby.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "Yes — it was negative but I still have symptoms",
              next: "result",
              result: {
                title: "Visit a Clinic for a Clinical Pregnancy Test",
                body: "Home tests can sometimes give false negatives, especially if taken too early. Visit an SFPA branch for a reliable lab-based pregnancy test and to discuss your symptoms with a health provider.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "No — I have not tested yet",
              next: "result",
              result: {
                title: "Get a Pregnancy Test at SFPA",
                body: "SFPA provides free pregnancy tests at all branches. If your period is late by more than a week and you have been sexually active, it is a good idea to get tested. Confirming early gives you more options.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
      ],
    },

    {
      id: "gbv-support",
      icon: "🤝",
      title: "GBV Support Finder",
      desc: "If you or someone you know has experienced violence, find the right support here.",
      steps: [
        {
          q: "Are you seeking support for yourself or for someone else?",
          opts: [
            { label: "For myself", next: 1 },
            { label: "For someone I know", next: 2 },
          ],
        },
        {
          q: "How can SFPA best help you right now?",
          opts: [
            {
              label: "I need medical care (injury, assault, rape)",
              next: "result",
              result: {
                title: "Emergency Medical Support Available",
                body: "SFPA can provide immediate medical care including post-rape treatment kits (emergency contraception, STI prevention). Please visit the nearest SFPA branch or call us now. If you are in immediate danger, contact emergency services. Everything is completely confidential.",
                type: "warning",
                showWA: true,
              },
            },
            {
              label: "I need someone to talk to (counselling)",
              next: "result",
              result: {
                title: "Confidential Counselling Available",
                body: "SFPA has trained GBV counsellors at all branches. Sessions are free, private, and completely confidential. You can also reach a counsellor via WhatsApp or our call centre. You do not have to go through this alone.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "I need help with safety planning or referrals",
              next: "result",
              result: {
                title: "Safety Planning and Referral Support",
                body: "SFPA counsellors can help you create a safety plan and connect you with legal aid, safe shelter, and community support. These services are free and confidential. Contact us at any time via WhatsApp or visit a branch.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
        {
          q: "What does this person most need right now?",
          opts: [
            {
              label: "Immediate medical attention",
              next: "result",
              result: {
                title: "Encourage Them to Seek Care Now",
                body: "If the person has been physically or sexually assaulted, they should receive medical care as soon as possible — ideally within 72 hours. You can accompany them to the nearest SFPA branch or help them contact us via WhatsApp. Do not pressure them, but let them know support is available.",
                type: "warning",
                showWA: true,
              },
            },
            {
              label: "Emotional support and counselling",
              next: "result",
              result: {
                title: "SFPA Counsellors Can Help",
                body: "Encourage them to speak with an SFPA counsellor. Sessions are confidential, free, and non-judgmental. You can contact SFPA on their behalf to find out what support is available, or share the WhatsApp number so they can reach out when they are ready.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
      ],
    },
  ],

  ar: [
    {
      id: "fp-chooser",
      icon: "🌿",
      title: "ابحث عن وسيلة منع الحمل المناسبة لك",
      desc: "أجب على ٣ أسئلة سريعة للحصول على توصية شخصية.",
      steps: [
        {
          q: "هل أنتِ في فترة الرضاعة الطبيعية حاليًا؟",
          opts: [
            { label: "نعم، أرضع رضاعة طبيعية كاملة", next: 1 },
            { label: "لا / لا ينطبق", next: 2 },
          ],
        },
        {
          q: "كم عمر طفلك؟",
          opts: [
            {
              label: "أقل من ٦ أشهر — يُرضَع رضاعة كاملة",
              next: "result",
              result: {
                title: "طريقة LAM قد تناسبك",
                body: "طريقة انقطاع الطمث الناتج عن الإرضاع (LAM) فاعليتها أكثر من ٩٨٪ إذا كنتِ ترضعين رضاعة كاملة طفلًا دون ٦ أشهر ولم تعد الدورة الشهرية. استخدمي الواقيات لحماية إضافية. قومي بزيارة فرع الجمعية للتأكد من أهليتك ومناقشة الخيارات الاحتياطية.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "طفلي أكبر من ٦ أشهر أو أرضعه جزئيًا",
              next: 2,
            },
          ],
        },
        {
          q: "هل تفضلين وسيلة تدوم أكثر من سنة دون الحاجة إلى التفكير فيها يوميًا؟",
          opts: [
            {
              label: "نعم — أفضل شيئًا طويل الأمد",
              next: "result",
              result: {
                title: "الوسائل طويلة الأمد هي الأنسب لكِ",
                body: "فكري في اللولب (نحاسي أو هرموني، ٣–١٠ سنوات) أو الغرسة (٣ سنوات). هذه الوسائل الأكثر فاعلية المتاحة (أكثر من ٩٩٪) ولا تتطلب جهدًا يوميًا. جميعها قابلة للعكس — تعود الخصوبة بسرعة بعد الإزالة. قومي بزيارة أي فرع من فروع الجمعية للحصول على استشارة وتركيب مجاني.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "لا — أفضل خيارات قصيرة الأمد أو عند الطلب",
              next: 3,
            },
          ],
        },
        {
          q: "هل تريدين أيضًا الحماية من الأمراض المنقولة جنسيًا؟",
          opts: [
            {
              label: "نعم — الحماية المزدوجة مهمة لي",
              next: "result",
              result: {
                title: "الواقيات + الوسيلة الهرمونية",
                body: "لا توفر أي وسيلة هرمونية حماية من الأمراض المنقولة جنسيًا. أفضل نهج هو استخدام الواقيات باستمرار (ذكرية أو أنثوية) وإضافة وسيلة هرمونية مثل الحبوب أو الحقن لمنع الحمل. تقدم الجمعية الواقيات والحبوب والحقن مجانًا.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "لا — فقط منع الحمل",
              next: "result",
              result: {
                title: "الحبوب اليومية أو الحقن الشهرية/الفصلية",
                body: "حبوب منع الحمل المركبة (تُؤخذ يوميًا) أو الحقن (كل ١–٣ أشهر) خيارات موثوقة وقابلة للعكس. كلاهما أكثر من ٩٩٪ فاعلية عند الاستخدام الصحيح. تحدثي مع مستشار الجمعية لمعرفة أيهما يناسب روتينك.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
      ],
    },

    {
      id: "sti-check",
      icon: "🔎",
      title: "هل يجب أن أُجري فحصًا للأمراض المنقولة جنسيًا؟",
      desc: "فحص ذاتي سريع يساعدك في تحديد ما إذا كان الفحص مناسبًا لك الآن.",
      steps: [
        {
          q: "هل مارستِ الجنس غير المحمي (بدون واقٍ) في الأشهر الثلاثة الماضية؟",
          opts: [
            { label: "نعم", next: 1 },
            { label: "لا", next: 2 },
          ],
        },
        {
          q: "هل كان لديك شريك جديد أو شركاء متعددون خلال العام الماضي؟",
          opts: [
            {
              label: "نعم",
              next: "result",
              result: {
                title: "يُنصح بإجراء الفحص",
                body: "بناءً على إجاباتك، يُنصح بإجراء فحص للأمراض المنقولة جنسيًا. كثير منها لا تسبب أعراضًا ويمكن نقلها دون علم. تقدم الجمعية فحوصات وعلاجات مجانية وسرية. قومي بزيارة أي فرع — لا حاجة لموعد مسبق.",
                type: "warning",
                showWA: true,
              },
            },
            {
              label: "لا",
              next: "result",
              result: {
                title: "فكري في إجراء الفحص احترازيًا",
                body: "حتى مع انخفاض المخاطر، يمنحك الفحص راحة البال ويحمي صحتك. توصي الجمعية بالفحص السنوي للأمراض المنقولة جنسيًا لجميع الأشخاص النشطين جنسيًا. الفحص مجاني وسري في جميع الفروع.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
        {
          q: "هل تعانين من أي من هذه الأعراض: إفرازات غير عادية، قروح، ألم أثناء الجماع، أو حرقة عند التبول؟",
          opts: [
            {
              label: "نعم، أعاني من عرض أو أكثر",
              next: "result",
              result: {
                title: "يُرجى طلب الرعاية الآن",
                body: "قد تشير أعراضك إلى مرض منقول جنسيًا أو حالة صحية تناسلية تستدعي العلاج. يُرجى زيارة فرع الجمعية في أقرب وقت ممكن. الأمراض غير المعالجة يمكن أن تسبب مضاعفات خطيرة. الفحص والعلاج مجانيان وسريان.",
                type: "warning",
                showWA: true,
              },
            },
            {
              label: "لا توجد أعراض",
              next: "result",
              result: {
                title: "لا تزال الفحوصات الدورية مُستحسنة",
                body: "كثير من الأمراض المنقولة جنسيًا لا تسبب أعراضًا على الإطلاق. توصي الجمعية بالفحص السنوي لكل شخص نشط جنسيًا. الفحص سريع ومجاني وسري في جميع فروعنا.",
                type: "info",
                showWA: false,
              },
            },
          ],
        },
      ],
    },

    {
      id: "pregnancy-check",
      icon: "🤰",
      title: "هل أنا حامل؟ ما الخطوة التالية؟",
      desc: "إرشادات حول علامات الحمل والفحص وخيارات الرعاية.",
      steps: [
        {
          q: "هل فاتتكِ دورتك الشهرية أو عانيتِ من أعراض غير عادية مثل الغثيان أو ألم الثدي؟",
          opts: [
            { label: "نعم — أعتقد أنني قد أكون حاملًا", next: 1 },
            {
              label: "لا — أريد فقط معلومات عامة",
              next: "result",
              result: {
                title: "فحص الحمل متاح في الجمعية",
                body: "إذا كنتِ تريدين معرفة ما إذا كان بإمكانك الحمل أو تريدين التخطيط مسبقًا، تقدم الجمعية استشارات مجانية حول منع الحمل والخصوبة. فحوصات الحمل المختبرية متاحة أيضًا في فروعنا.",
                type: "info",
                showWA: false,
              },
            },
          ],
        },
        {
          q: "هل أجريتِ اختبار حمل منزليًا؟",
          opts: [
            {
              label: "نعم — كانت النتيجة إيجابية",
              next: "result",
              result: {
                title: "تأكدي من حملك في عيادة الجمعية",
                body: "اختبار الحمل المنزلي الإيجابي عادةً ما يكون موثوقًا. خطوتك التالية هي زيارة فرع الجمعية لتأكيد الحمل بفحص سريري وتحديد موعد الولادة وبدء رعاية ما قبل الولادة. كلما بدأتِ الرعاية مبكرًا، كان ذلك أفضل لكِ ولطفلك.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "نعم — كانت سلبية لكن لا تزال الأعراض موجودة",
              next: "result",
              result: {
                title: "قومي بزيارة عيادة لإجراء فحص حمل سريري",
                body: "يمكن أن تعطي الاختبارات المنزلية أحيانًا نتائج سلبية كاذبة، خاصةً إذا أُجريت في وقت مبكر جدًا. قومي بزيارة فرع الجمعية لإجراء فحص حمل مختبري موثوق ومناقشة أعراضك مع مقدم الرعاية الصحية.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "لا — لم أُجرِ اختبارًا بعد",
              next: "result",
              result: {
                title: "أجري اختبار حمل في الجمعية",
                body: "تقدم الجمعية فحوصات حمل مجانية في جميع الفروع. إذا تأخرت دورتك أكثر من أسبوع وكنتِ نشطة جنسيًا، فمن الجيد إجراء الفحص. التأكيد المبكر يمنحك المزيد من الخيارات.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
      ],
    },

    {
      id: "gbv-support",
      icon: "🤝",
      title: "مكتشف دعم العنف القائم على النوع الاجتماعي",
      desc: "إذا تعرضتِ أنتِ أو شخص تعرفينه للعنف، ابحثي هنا عن الدعم المناسب.",
      steps: [
        {
          q: "هل تبحثين عن الدعم لنفسك أم لشخص آخر؟",
          opts: [
            { label: "لنفسي", next: 1 },
            { label: "لشخص أعرفه", next: 2 },
          ],
        },
        {
          q: "كيف يمكن للجمعية مساعدتك الآن بشكل أفضل؟",
          opts: [
            {
              label: "أحتاج إلى رعاية طبية (إصابة، اعتداء، اغتصاب)",
              next: "result",
              result: {
                title: "الدعم الطبي الطارئ متاح",
                body: "يمكن للجمعية تقديم رعاية طبية فورية بما في ذلك أطقم علاج ما بعد الاغتصاب (منع الحمل الطارئ، الوقاية من الأمراض المنقولة جنسيًا). يُرجى زيارة أقرب فرع أو الاتصال بنا الآن. إذا كنتِ في خطر فوري، اتصلي بخدمات الطوارئ. كل شيء سري تمامًا.",
                type: "warning",
                showWA: true,
              },
            },
            {
              label: "أحتاج إلى من يستمع إليّ (استشارة)",
              next: "result",
              result: {
                title: "استشارة سرية متاحة",
                body: "لدى الجمعية مستشارون متدربون في مجال العنف القائم على النوع الاجتماعي في جميع الفروع. الجلسات مجانية وخاصة وسرية تمامًا. يمكنك أيضًا التواصل مع مستشار عبر واتساب أو مركز الاتصال. لستِ مضطرة للمرور بهذا وحدك.",
                type: "info",
                showWA: true,
              },
            },
            {
              label: "أحتاج مساعدة في التخطيط للسلامة أو الإحالات",
              next: "result",
              result: {
                title: "دعم التخطيط للسلامة والإحالة",
                body: "يمكن لمستشاري الجمعية مساعدتك في إنشاء خطة سلامة وربطك بالمساعدة القانونية والملاجئ الآمنة ودعم المجتمع. هذه الخدمات مجانية وسرية. تواصلي معنا في أي وقت عبر واتساب أو قومي بزيارة أحد الفروع.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
        {
          q: "ما الذي يحتاجه هذا الشخص أكثر الآن؟",
          opts: [
            {
              label: "عناية طبية فورية",
              next: "result",
              result: {
                title: "شجّعيه/ها على طلب الرعاية الآن",
                body: "إذا تعرض الشخص للاعتداء الجسدي أو الجنسي، يجب أن يتلقى رعاية طبية في أقرب وقت ممكن — ويفضل خلال ٧٢ ساعة. يمكنك مرافقته إلى أقرب فرع للجمعية أو مساعدته في التواصل معنا عبر واتساب. لا تضغط عليه، لكن أعلمه بأن الدعم متاح.",
                type: "warning",
                showWA: true,
              },
            },
            {
              label: "الدعم العاطفي والاستشارة",
              next: "result",
              result: {
                title: "مستشارو الجمعية يمكنهم المساعدة",
                body: "شجّعيه/ها على التحدث مع مستشار الجمعية. الجلسات سرية ومجانية وغير محكومة بالأحكام المسبقة. يمكنك التواصل مع الجمعية نيابةً عنه/ها لمعرفة الدعم المتاح، أو مشاركة رقم واتساب حتى يتواصل عندما يكون مستعدًا.",
                type: "info",
                showWA: true,
              },
            },
          ],
        },
      ],
    },
  ],
};

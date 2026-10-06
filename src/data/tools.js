// All decision logic is prototype content requiring SFPA clinical validation before launch.
export const TOOLS = {
  en: [
    {
      id: "fp", icon: "🌿", title: "Find Your Contraceptive Method",
      desc: "Answer a few questions for general guidance on contraceptive options.",
      steps: [
        {
          q: "Are you currently breastfeeding exclusively (baby under 6 months, no period return)?",
          opts: [
            { label: "Yes — exclusively", next: "result", result: { title: "LAM May Be an Option", body: "The Lactational Amenorrhoea Method (LAM) can be effective when exclusive breastfeeding conditions are fully met. Visit an SFPA clinic to discuss whether it suits your situation and what additional protection may be recommended.", type: "info", showSupport: true } },
            { label: "No / not applicable", next: 1 },
          ],
        },
        {
          q: "Do you prefer a method that works for 1 or more years without daily attention?",
          opts: [
            { label: "Yes — long-term", next: "result", result: { title: "Long-Acting Methods (LARCs)", body: "IUDs (3–10 years) and implants (3 years) are long-acting, reversible options. An SFPA counsellor can explain how they work, what insertion involves, and whether they are available for you.", type: "info", showSupport: true } },
            { label: "No — shorter-term", next: 2 },
          ],
        },
        {
          q: "Do you also want protection against STIs?",
          opts: [
            { label: "Yes — dual protection", next: "result", result: { title: "Condoms Plus a Hormonal Method", body: "Condoms are the only contraceptive method that also reduces STI risk. Many people combine condoms with a hormonal method for more complete protection. Speak with an SFPA counsellor about your options.", type: "info", showSupport: true } },
            { label: "No — pregnancy prevention only", next: "result", result: { title: "Short-Acting Hormonal Methods", body: "Pills (taken daily) or injectables (every 1–3 months) are reliable, reversible options. An SFPA counsellor can help you understand which may be appropriate for you.", type: "info", showSupport: true } },
          ],
        },
      ],
    },
    {
      id: "sti", icon: "🔎", title: "Should I Get Tested for STIs?",
      desc: "A short self-check to help you think through whether STI testing might be useful.",
      steps: [
        {
          q: "Have you had unprotected sex in the last 3 months?",
          opts: [
            { label: "Yes", next: 1 },
            { label: "No", next: 2 },
          ],
        },
        {
          q: "Have you had a new or multiple partners in the last year?",
          opts: [
            { label: "Yes", next: "result", result: { title: "Testing May Be Worth Considering", body: "Many STIs have no symptoms and can be passed on without knowing. Speaking with an SFPA counsellor about testing is a good step. They can advise on what tests may be available.", type: "warning", showSupport: true } },
            { label: "No", next: "result", result: { title: "Consider Periodic Screening", body: "Regular STI screening can be a good health habit for anyone who is sexually active, even with lower-risk circumstances. Speak with an SFPA counsellor to learn more.", type: "info", showSupport: true } },
          ],
        },
        {
          q: "Do you have symptoms such as unusual discharge, sores, pain during sex, or burning urination?",
          opts: [
            { label: "Yes — one or more", next: "result", result: { title: "Please Seek Care", body: "These symptoms may need medical attention. Please speak with an SFPA health provider or another healthcare professional. Do not delay seeking care if symptoms are significant.", type: "warning", showSupport: true } },
            { label: "No symptoms", next: "result", result: { title: "Periodic Screening Is a Good Habit", body: "Even without symptoms, periodic STI screening is worth discussing with an SFPA counsellor, particularly if you have been sexually active.", type: "info", showSupport: false } },
          ],
        },
      ],
    },
    {
      id: "preg", icon: "🤰", title: "Am I Pregnant? What Next?",
      desc: "General guidance on pregnancy signs, testing, and next steps.",
      steps: [
        {
          q: "Have you missed a period or noticed possible early pregnancy symptoms?",
          opts: [
            { label: "Yes — I may be pregnant", next: 1 },
            { label: "No — just want general information", next: "result", result: { title: "Pregnancy Information at SFPA", body: "SFPA can provide information on contraception, fertility, and pregnancy. Contact your nearest clinic to find out what services are available.", type: "info", showSupport: false } },
          ],
        },
        {
          q: "Have you taken a home pregnancy test?",
          opts: [
            { label: "Yes — positive result", next: "result", result: { title: "Consider Confirming at a Clinic", body: "A positive home test is usually reliable. Confirming the pregnancy and starting antenatal care early gives you more options and better health outcomes. Contact SFPA to ask about available services.", type: "info", showSupport: true } },
            { label: "Yes — negative but symptoms continue", next: "result", result: { title: "Consider a Clinical Test", body: "Home tests can occasionally give false negatives if taken very early. A health provider can carry out a more reliable test and discuss your symptoms.", type: "info", showSupport: true } },
            { label: "Not yet tested", next: "result", result: { title: "Consider Getting Tested", body: "If your period is late and you have been sexually active, a pregnancy test is a good first step. Ask SFPA about testing services available at your nearest clinic.", type: "info", showSupport: true } },
          ],
        },
      ],
    },
    {
      id: "gbv", icon: "🤝", title: "GBV Support Finder",
      desc: "If you or someone you know has experienced violence, this can help you find the right support.",
      steps: [
        {
          q: "Are you seeking support for yourself or for someone else?",
          opts: [
            { label: "For myself", next: 1 },
            { label: "For someone I know", next: 2 },
          ],
        },
        {
          q: "What kind of support are you looking for?",
          opts: [
            { label: "Medical care", next: "result", result: { title: "Medical Support", body: "SFPA may be able to provide or refer you for medical care. Please visit an SFPA clinic or contact SFPA directly. Everything is confidential.\n\nIf you are in immediate danger, please contact emergency services first.", type: "warning", showSupport: true, showClinic: true } },
            { label: "Counselling and emotional support", next: "result", result: { title: "Counselling at SFPA", body: "SFPA has counsellors trained to provide a safe, confidential, non-judgmental space. You can reach SFPA by phone or visit a clinic. All conversations are confidential.", type: "info", showSupport: true } },
            { label: "Safety planning or referrals", next: "result", result: { title: "Safety and Referral Support", body: "An SFPA counsellor can help you think through your safety options and, where available, connect you with legal services, safe shelter, or community support. All conversations are confidential.", type: "info", showSupport: true } },
          ],
        },
        {
          q: "What does this person most need right now?",
          opts: [
            { label: "Medical care", next: "result", result: { title: "Encouraging Someone to Seek Care", body: "Medical care after an assault can be important and is often time-sensitive. You can help by offering to accompany them or assisting them to contact SFPA when they feel ready. Everything will be confidential.\n\nIf they are in immediate danger, please contact emergency services.", type: "warning", showSupport: true, showClinic: true } },
            { label: "Emotional support and counselling", next: "result", result: { title: "SFPA Counselling", body: "Encouraging someone to speak with a trained counsellor can be very helpful. SFPA counsellors are confidential and non-judgmental. You may also contact SFPA on their behalf if they agree.", type: "info", showSupport: true } },
          ],
        },
      ],
    },
  ],
  ar: [
    {
      id: "fp", icon: "🌿", title: "ابحثي عن وسيلة منع الحمل المناسبة",
      desc: "أجيبي على بعض الأسئلة للحصول على إرشادات عامة حول خيارات منع الحمل.",
      steps: [
        {
          q: "هل أنتِ في فترة رضاعة طبيعية كاملة (طفل دون ٦ أشهر، دون عودة الدورة)؟",
          opts: [
            { label: "نعم — رضاعة كاملة", next: "result", result: { title: "طريقة LAM قد تكون خيارًا", body: "يمكن أن تكون طريقة انقطاع الطمث الناتج عن الإرضاع فعّالة عند استيفاء شروط الرضاعة الكاملة. قومي بزيارة عيادة الجمعية لمناقشة ما إذا كانت تناسب وضعك وما الحماية الإضافية التي قد تُوصى بها.", type: "info", showSupport: true } },
            { label: "لا / لا ينطبق", next: 1 },
          ],
        },
        {
          q: "هل تفضلين وسيلة تعمل لمدة عام أو أكثر دون اهتمام يومي؟",
          opts: [
            { label: "نعم — طويلة الأمد", next: "result", result: { title: "الوسائل طويلة الأمد (LARCs)", body: "اللوالب (٣–١٠ سنوات) والغرسات (٣ سنوات) خيارات طويلة الأمد وقابلة للعكس. يمكن لمستشار الجمعية شرح آلية عملها وما يتضمنه التركيب وما إذا كانت متاحة لك.", type: "info", showSupport: true } },
            { label: "لا — أفضل خيارات أقصر أمدًا", next: 2 },
          ],
        },
        {
          q: "هل تريدين أيضًا الحماية من الأمراض المنقولة جنسيًا؟",
          opts: [
            { label: "نعم — حماية مزدوجة", next: "result", result: { title: "الواقيات بالإضافة إلى وسيلة هرمونية", body: "الواقيات هي الوسيلة الوحيدة التي تُقلل أيضًا من خطر الأمراض الجنسية. يجمع كثيرون بين الواقيات ووسيلة هرمونية لحماية أكثر اكتمالًا. تحدثي مع مستشار الجمعية حول خياراتك.", type: "info", showSupport: true } },
            { label: "لا — لمنع الحمل فقط", next: "result", result: { title: "الوسائل الهرمونية قصيرة الأمد", body: "الحبوب (تُؤخذ يوميًا) أو الحقن (كل ١–٣ أشهر) خيارات موثوقة وقابلة للعكس. يمكن لمستشار الجمعية مساعدتك على فهم أيها قد يكون مناسبًا لك.", type: "info", showSupport: true } },
          ],
        },
      ],
    },
    {
      id: "sti", icon: "🔎", title: "هل يجب أن أُجري فحصًا للأمراض الجنسية؟",
      desc: "فحص ذاتي سريع يساعدك على التفكير فيما إذا كان الفحص مفيدًا.",
      steps: [
        {
          q: "هل مارستِ الجنس غير المحمي في الأشهر الثلاثة الماضية؟",
          opts: [
            { label: "نعم", next: 1 },
            { label: "لا", next: 2 },
          ],
        },
        {
          q: "هل كان لديك شريك جديد أو شركاء متعددون خلال العام الماضي؟",
          opts: [
            { label: "نعم", next: "result", result: { title: "قد يكون الفحص جديرًا بالاعتبار", body: "كثير من الأمراض لا تسبب أعراضًا ويمكن انتقالها دون علم. التحدث مع مستشار الجمعية حول الفحص خطوة جيدة. يمكنهم إرشادك حول الفحوصات المتاحة.", type: "warning", showSupport: true } },
            { label: "لا", next: "result", result: { title: "فكري في الفحص الدوري", body: "يمكن أن يكون الفحص الدوري للأمراض الجنسية عادة صحية جيدة لكل من هو نشط جنسيًا. تحدثي مع مستشار الجمعية لمعرفة المزيد.", type: "info", showSupport: true } },
          ],
        },
        {
          q: "هل تعانين من أعراض مثل: إفرازات غير عادية، قروح، ألم أثناء الجماع، أو حرقة؟",
          opts: [
            { label: "نعم، عرض أو أكثر", next: "result", result: { title: "يُرجى طلب الرعاية", body: "قد تستدعي هذه الأعراض الاهتمام الطبي. يُرجى التحدث مع مقدم رعاية صحية. لا تتأخري في طلب الرعاية إذا كانت الأعراض ملحوظة.", type: "warning", showSupport: true } },
            { label: "لا توجد أعراض", next: "result", result: { title: "الفحص الدوري عادة جيدة", body: "حتى بدون أعراض، يستحق الفحص الدوري للأمراض الجنسية النقاش مع مستشار الجمعية، خاصةً إذا كنتِ نشطة جنسيًا.", type: "info", showSupport: false } },
          ],
        },
      ],
    },
    {
      id: "preg", icon: "🤰", title: "هل أنا حامل؟ ما الخطوة التالية؟",
      desc: "إرشادات عامة حول علامات الحمل والفحص والخطوات التالية.",
      steps: [
        {
          q: "هل فاتتكِ دورتك أو لاحظتِ أعراضًا مبكرة محتملة للحمل؟",
          opts: [
            { label: "نعم — قد أكون حاملًا", next: 1 },
            { label: "لا — أريد فقط معلومات عامة", next: "result", result: { title: "معلومات الحمل في الجمعية", body: "تستطيع الجمعية تقديم معلومات حول منع الحمل والخصوبة والحمل. تواصلي مع أقرب عيادة لمعرفة الخدمات المتاحة.", type: "info", showSupport: false } },
          ],
        },
        {
          q: "هل أجريتِ اختبار حمل منزليًا؟",
          opts: [
            { label: "نعم — نتيجة إيجابية", next: "result", result: { title: "فكري في تأكيد النتيجة في عيادة", body: "الاختبار المنزلي الإيجابي عادةً موثوق. تأكيد الحمل والبدء في رعاية ما قبل الولادة مبكرًا يمنحانك مزيدًا من الخيارات ونتائج صحية أفضل. تواصلي مع الجمعية للاستفسار عن الخدمات المتاحة.", type: "info", showSupport: true } },
            { label: "نعم — سلبية لكن الأعراض لا تزال موجودة", next: "result", result: { title: "فكري في إجراء فحص سريري", body: "يمكن أن تعطي الاختبارات المنزلية أحيانًا نتائج سلبية كاذبة إذا أُجريت مبكرًا. يمكن لمقدم الرعاية الصحية إجراء فحص أكثر موثوقية ومناقشة أعراضك.", type: "info", showSupport: true } },
            { label: "لم أُجرِ اختبارًا بعد", next: "result", result: { title: "فكري في إجراء الاختبار", body: "إذا تأخرت دورتك وكنتِ نشطة جنسيًا، فإن اختبار الحمل خطوة أولى جيدة. استفسري من الجمعية عن خدمات الفحص المتاحة في أقرب عيادة.", type: "info", showSupport: true } },
          ],
        },
      ],
    },
    {
      id: "gbv", icon: "🤝", title: "مكتشف دعم العنف",
      desc: "إذا تعرضتِ أنتِ أو شخص تعرفينه للعنف، يمكن أن يساعدك هذا في إيجاد الدعم المناسب.",
      steps: [
        {
          q: "هل تبحثين عن الدعم لنفسك أم لشخص آخر؟",
          opts: [
            { label: "لنفسي", next: 1 },
            { label: "لشخص أعرفه", next: 2 },
          ],
        },
        {
          q: "ما نوع الدعم الذي تبحثين عنه؟",
          opts: [
            { label: "رعاية طبية", next: "result", result: { title: "الدعم الطبي", body: "قد تتمكن الجمعية من تقديم رعاية طبية أو الإحالة إليها. يُرجى زيارة عيادة الجمعية أو التواصل مع الجمعية مباشرة. كل شيء سري.\n\nإذا كنتِ في خطر فوري، يُرجى الاتصال بخدمات الطوارئ أولًا.", type: "warning", showSupport: true, showClinic: true } },
            { label: "الاستشارة والدعم العاطفي", next: "result", result: { title: "الاستشارة في الجمعية", body: "لدى الجمعية مستشارون متدربون لتوفير مساحة آمنة وسرية وغير منحازة. يمكنك التواصل مع الجمعية هاتفيًا أو زيارة العيادة. جميع المحادثات سرية.", type: "info", showSupport: true } },
            { label: "التخطيط للسلامة أو الإحالات", next: "result", result: { title: "دعم التخطيط للسلامة", body: "يمكن لمستشار الجمعية مساعدتك في التفكير في خيارات السلامة الخاصة بك وربطك، حيثما توفر، بالخدمات القانونية أو الملاجئ الآمنة أو الدعم المجتمعي. جميع المحادثات سرية.", type: "info", showSupport: true } },
          ],
        },
        {
          q: "ما الذي يحتاجه هذا الشخص أكثر الآن؟",
          opts: [
            { label: "رعاية طبية", next: "result", result: { title: "تشجيع شخص على طلب الرعاية", body: "يمكن أن تكون الرعاية الطبية بعد الاعتداء مهمة وحساسة من حيث الوقت. يمكنك المساعدة بمرافقته أو مساعدته على التواصل مع الجمعية عندما يكون مستعدًا. سيكون كل شيء سريًا.\n\nإذا كان في خطر فوري، يُرجى الاتصال بخدمات الطوارئ.", type: "warning", showSupport: true, showClinic: true } },
            { label: "الدعم العاطفي والاستشارة", next: "result", result: { title: "استشارة الجمعية", body: "تشجيع شخص ما على التحدث مع مستشار متدرب يمكن أن يكون مفيدًا جدًا. مستشارو الجمعية سريون وغير منحازين. يمكنك أيضًا التواصل مع الجمعية نيابةً عنه إذا وافق على ذلك.", type: "info", showSupport: true } },
          ],
        },
      ],
    },
  ],
};

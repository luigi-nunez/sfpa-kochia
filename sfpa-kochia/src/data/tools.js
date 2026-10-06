const TOOLS = {
  en: [
    {
      id: "fp", icon: "💊", name: "Family Planning Advisor",
      desc: "Find the contraceptive method that best fits your health situation and preferences.",
      steps: [
        { q: "Have you given birth before?",                          opts: ["Yes, within the last 6 months", "Yes, more than 6 months ago", "No, never"] },
        { q: "Are you currently breastfeeding?",                      opts: ["Yes", "No", "Not applicable"] },
        { q: "Do you have any of these conditions?",                  opts: ["High blood pressure", "Migraines with aura", "Blood clotting disorder", "None of the above"] },
        { q: "How important is a hormone-free method to you?",        opts: ["Very important", "Somewhat important", "Not important"] },
      ],
      results: {
        default: { title: "Recommended options for you", body: "Based on your answers, short-acting hormonal methods (pills, injectables) or long-acting options like an IUD or implant may suit you well. A copper IUD is a hormone-free choice effective for up to 10 years.\n\nVisit an SFPA clinic or reach us via WhatsApp for a personalised consultation." },
        bf:      { title: "Breastfeeding-safe options",   body: "Since you are breastfeeding, progestin-only methods — the mini-pill, progestin injection, implant, or hormonal IUD — are recommended. The combined pill is not recommended in the first 6 months of breastfeeding.\n\nA copper IUD is an excellent hormone-free option." },
      },
    },
    {
      id: "anc", icon: "🤱", name: "ANC Checklist",
      desc: "Check whether you have completed the essential antenatal care contacts for your stage of pregnancy.",
      steps: [
        { q: "How many weeks pregnant are you?",                      opts: ["Less than 12 weeks", "12–20 weeks", "20–28 weeks", "28–36 weeks", "More than 36 weeks"] },
        { q: "Have you had a blood test for anaemia and blood type?", opts: ["Yes", "No", "I don't know"] },
        { q: "Are you taking iron and folic acid supplements?",        opts: ["Yes, regularly", "Yes, not consistently", "No"] },
        { q: "Have you had an ultrasound scan this pregnancy?",        opts: ["Yes, more than once", "Yes, once", "No"] },
      ],
      results: {
        default: { title: "Your ANC checklist summary", body: "There may be recommended care steps you have not yet completed.\n\nKey actions:\n• Schedule an ultrasound if you have not had one.\n• Take iron and folic acid daily.\n• Watch for danger signs: severe headache, swelling, reduced fetal movement.\n\nVisit an SFPA clinic for a full antenatal assessment." },
      },
    },
    {
      id: "cse", icon: "📚", name: "Sexuality Education Quiz",
      desc: "Test your knowledge of sexual and reproductive health — and learn something new.",
      steps: [
        { q: "Which method reliably prevents both pregnancy AND STIs?",                          opts: ["The pill", "The male condom", "The IUD", "Withdrawal"] },
        { q: "At what age is the HPV vaccine most effective?",                                   opts: ["9–14 years", "18–25 years", "Only after first sexual contact", "Any age"] },
        { q: "True or false: a person on ART with an undetectable viral load can transmit HIV.", opts: ["True", "False — U=U means Undetectable = Untransmittable", "Depends on contact type"] },
        { q: "FGM (female genital mutilation) is:",                                              opts: ["A harmless cultural tradition", "A human rights violation with no medical benefits", "Required by any major religion", "Beneficial for reproductive health"] },
      ],
      results: {
        default: { title: "Quiz complete — here are the answers", body: "1. The male condom — the only method protecting against both pregnancy and STIs.\n2. Ages 9–14 — vaccination before first sexual contact gives the best immune response.\n3. False — U=U is scientifically established.\n4. FGM is a human rights violation. It has no medical benefits and causes lasting harm.\n\nExplore the Information section or speak with an SFPA counsellor for more." },
      },
    },
    {
      id: "mental", icon: "🧠", name: "Mental Health Screen",
      desc: "A brief check for common signs of postpartum or general mental health concerns.",
      steps: [
        { q: "Over the past 2 weeks, how often have you felt down, hopeless, or unable to enjoy things?", opts: ["Not at all", "A few days", "More than half the days", "Nearly every day"] },
        { q: "Have you had significant sleep difficulties beyond what a newborn requires?",                opts: ["No", "Yes, mild", "Yes, significantly"] },
        { q: "Have you had thoughts of harming yourself or not wanting to be here?",                      opts: ["No", "Rarely, passing thoughts only", "Yes, frequently"] },
        { q: "Do you feel supported by people around you?",                                               opts: ["Yes, well supported", "Somewhat supported", "Mostly not supported", "Not at all"] },
      ],
      results: {
        default: { title: "Thank you for sharing", body: "Your answers suggest you may be experiencing some emotional challenges. This is more common than most people realise.\n\nSteps to consider:\n• Talk to someone you trust.\n• Contact an SFPA counsellor via WhatsApp or by visiting a clinic.\n• If you are in immediate distress, please reach out to a trusted person right away.\n\nYou are not alone.", showWA: true },
        low:     { title: "Your responses look positive", body: "Your answers suggest you are managing well at the moment. Continue to check in with yourself regularly.\n\nIf anything changes, SFPA counsellors are available via WhatsApp or at any clinic.", showWA: false },
      },
    },
  ],
  ar: [
    {
      id: "fp", icon: "💊", name: "مستشار تنظيم الأسرة",
      desc: "ابحثي عن طريقة منع الحمل التي تناسب حالتك الصحية وتفضيلاتك.",
      steps: [
        { q: "هل سبق أن أنجبتِ من قبل؟",                                           opts: ["نعم، خلال الأشهر الستة الماضية", "نعم، منذ أكثر من ستة أشهر", "لا، لم أنجب"] },
        { q: "هل ترضعين الثدي حالياً؟",                                             opts: ["نعم", "لا", "غير قابل للتطبيق"] },
        { q: "هل لديكِ أي من هذه الحالات؟",                                         opts: ["ضغط دم مرتفع", "صداع نصفي مع هالة", "اضطراب تخثر الدم", "لا شيء مما ذكر"] },
        { q: "ما مدى أهمية أن تكون الطريقة خالية من الهرمونات؟",                    opts: ["مهم جداً", "مهم إلى حد ما", "غير مهم"] },
      ],
      results: {
        default: { title: "الخيارات الموصى بها لك", body: "بناءً على إجاباتك، قد تناسبكِ طرق هرمونية قصيرة المفعول أو خيارات طويلة الأمد مثل اللولب أو الغرسة. اللولب النحاسي خيار خالٍ من الهرمونات وفعال لمدة تصل إلى 10 سنوات.\n\nزوري عيادة الجمعية أو تواصلي معنا عبر واتساب للحصول على استشارة شخصية." },
        bf:      { title: "خيارات آمنة أثناء الرضاعة", body: "بما أنك ترضعين، يوصى بطرق البروجستين فقط — الحبوب الصغيرة، حقن البروجستين، الغرسة، أو اللولب الهرموني. لا يُوصى بالحبوب المركبة خلال أول 6 أشهر من الرضاعة.\n\nاللولب النحاسي خيار ممتاز خالٍ من الهرمونات." },
      },
    },
    {
      id: "anc", icon: "🤱", name: "قائمة مراجعة رعاية ما قبل الولادة",
      desc: "تحققي من استكمالك لجلسات الرعاية قبل الولادة الأساسية.",
      steps: [
        { q: "كم أسبوعاً مضى على حملك؟",                                            opts: ["أقل من 12 أسبوعاً", "12–20 أسبوعاً", "20–28 أسبوعاً", "28–36 أسبوعاً", "أكثر من 36 أسبوعاً"] },
        { q: "هل أجريتِ فحص دم للكشف عن فقر الدم وفصيلة الدم؟",                    opts: ["نعم", "لا", "لا أعرف"] },
        { q: "هل تتناولين مكملات الحديد وحمض الفوليك؟",                              opts: ["نعم، بانتظام", "نعم، بشكل غير منتظم", "لا"] },
        { q: "هل أجريتِ فحصاً بالموجات فوق الصوتية خلال هذا الحمل؟",                opts: ["نعم، أكثر من مرة", "نعم، مرة واحدة", "لا"] },
      ],
      results: {
        default: { title: "ملخص قائمة مراجعتك", body: "قد تكون هناك خطوات رعاية موصى بها لم تستكمليها بعد.\n\nالإجراءات الرئيسية:\n• حددي موعداً للموجات فوق الصوتية إن لم تكوني أجريتها.\n• تأكدي من تناول الحديد وحمض الفوليك يومياً.\n• تابعي علامات الخطر.\n\nزوري عيادة الجمعية للتقييم الكامل." },
      },
    },
    {
      id: "cse", icon: "📚", name: "اختبار التثقيف الجنسي",
      desc: "اختبري معرفتك بالصحة الجنسية والإنجابية.",
      steps: [
        { q: "أيٌّ مما يلي يقي من الحمل والأمراض المنقولة جنسياً معاً؟",            opts: ["حبوب منع الحمل", "الواقي الذكري", "اللولب", "العزل"] },
        { q: "في أي عمر يكون لقاح HPV أكثر فاعلية؟",                               opts: ["9–14 سنة", "18–25 سنة", "فقط بعد أول اتصال جنسي", "أي عمر"] },
        { q: "صح أم خطأ: من يتلقى العلاج ولديه حمل فيروسي غير قابل للكشف يمكنه نقل الإيدز.", opts: ["صح", "خطأ — U=U تعني غير قابل للكشف = غير قابل للانتقال", "يعتمد على نوع الاتصال"] },
        { q: "ختان الإناث هو:",                                                      opts: ["تقليد ثقافي غير ضار", "انتهاك لحقوق الإنسان بلا فوائد طبية", "مطلوب من قِبَل دين رئيسي", "مفيد للصحة الإنجابية"] },
      ],
      results: {
        default: { title: "شكراً لإتمامك الاختبار — الإجابات الصحيحة", body: "١. الواقي الذكري — هو الطريقة الوحيدة التي تحمي من الحمل والأمراض معاً.\n٢. الأعمار 9–14 — التطعيم قبل أول اتصال جنسي يوفر أفضل استجابة مناعية.\n٣. خطأ — U=U راسخة علمياً.\n٤. ختان الإناث انتهاك لحقوق الإنسان ويسبب ضرراً دائماً." },
      },
    },
    {
      id: "mental", icon: "🧠", name: "فحص الصحة النفسية",
      desc: "فحص سريع للعلامات الشائعة لمخاوف الصحة النفسية.",
      steps: [
        { q: "خلال الأسبوعين الماضيين، كم مرة شعرتِ بالإحباط أو اليأس؟",           opts: ["لا على الإطلاق", "بعض الأيام", "أكثر من نصف الأيام", "كل يوم تقريباً"] },
        { q: "هل واجهتِ صعوبة ملحوظة في النوم؟",                                    opts: ["لا", "نعم، بشكل خفيف", "نعم، بشكل ملحوظ"] },
        { q: "هل راودتكِ أفكار بإيذاء نفسك؟",                                       opts: ["لا", "نادراً، أفكار عابرة فقط", "نعم، بشكل متكرر"] },
        { q: "هل تشعرين بدعم من حولكِ؟",                                             opts: ["نعم، مدعومة جيداً", "مدعومة إلى حد ما", "غالباً غير مدعومة", "لا على الإطلاق"] },
      ],
      results: {
        default: { title: "شكراً لمشاركتك", body: "تشير إجاباتك إلى أنك قد تواجهين بعض التحديات العاطفية.\n\nخطوات للنظر فيها:\n• تحدثي مع شخص تثقين به.\n• تواصلي مع مستشارة الجمعية عبر واتساب أو بزيارة عيادة.\n• إذا كنتِ في ضائقة فورية، يرجى التواصل فوراً.\n\nلستِ وحدكِ.", showWA: true },
        low:     { title: "ردودك تبدو إيجابية", body: "تشير إجاباتك إلى أنك تتعاملين بشكل جيد في الوقت الحالي.\n\nإذا تغير أي شيء، فإن مستشارات الجمعية متاحات عبر واتساب أو في أي عيادة.", showWA: false },
      },
    },
  ],
};

export default TOOLS;

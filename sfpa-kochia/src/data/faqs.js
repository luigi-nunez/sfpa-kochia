const FAQS = {
  en: [
    { id: "f1", cat: "fp",     q: "Can I get pregnant while breastfeeding?",                  a: "Yes — breastfeeding is not a reliable contraceptive method. The Lactational Amenorrhoea Method (LAM) requires exclusive breastfeeding, no period, and a baby under 6 months. If any condition is not met, use another contraceptive method." },
    { id: "f2", cat: "fp",     q: "How soon can I become pregnant after stopping the pill?",  a: "Fertility typically returns within 1–3 months after stopping combined oral contraceptives, though some women conceive immediately. The pill does not affect long-term fertility. If you do not want to become pregnant, start another method right away." },
    { id: "f3", cat: "anc",    q: "How many antenatal visits are recommended?",               a: "WHO recommends a minimum of 8 antenatal care contacts — ideally at weeks 12, 20, 26, 30, 34, 36, 38, and 40. More visits may be needed if complications arise. SFPA clinics provide full ANC services." },
    { id: "f4", cat: "sti",    q: "Can I have an STI without any symptoms?",                  a: "Yes. Many STIs — including chlamydia, gonorrhoea, herpes, and HIV — can be completely asymptomatic. Regular testing is important, especially after unprotected sex. SFPA clinics offer confidential, free STI testing." },
    { id: "f5", cat: "gbv",    q: "What should I do immediately after a sexual assault?",     a: "Go to the nearest health facility or SFPA clinic as quickly as possible. Emergency contraception (within 72 hours), post-exposure prophylaxis for HIV (within 72 hours), injury treatment, and psychosocial support are all available. You are not required to report to police to receive medical care." },
    { id: "f6", cat: "cancer", q: "When should I start cervical cancer screening?",           a: "WHO recommends starting cervical screening at age 25, every 3–5 years for women with no abnormal results. Visit an SFPA clinic to find out what is right for you." },
    { id: "f7", cat: "mental", q: "Is anxiety during pregnancy normal?",                      a: "Mild worry is normal, but persistent anxiety or panic attacks that interfere with daily life are worth discussing with a provider. SFPA counsellors can provide support or refer you to a specialist." },
    { id: "f8", cat: "fp",     q: "Does the emergency contraceptive pill cause an abortion?", a: "No. Emergency contraception prevents pregnancy by delaying or stopping ovulation. If fertilisation has already occurred, it will not terminate the pregnancy. It must be taken as early as possible — ideally within 72 hours." },
  ],
  ar: [
    { id: "f1", cat: "fp",     q: "هل يمكنني الحمل أثناء الرضاعة الطبيعية؟",                     a: "نعم — الرضاعة الطبيعية ليست طريقة موثوقة لمنع الحمل. طريقة رضاعة الثدي واللاطمث تتطلب الرضاعة الحصرية وعدم وجود دورة شهرية وطفل عمره أقل من 6 أشهر. إذا لم تتحقق أي شرط، استخدمي طريقة أخرى." },
    { id: "f2", cat: "fp",     q: "كم من الوقت يستغرق عودة الخصوبة بعد إيقاف الحبوب؟",          a: "تعود الخصوبة عادةً خلال 1–3 أشهر. الحبوب لا تؤثر على الخصوبة طويلة المدى. إذا لم ترغبي في الحمل، ابدئي باستخدام طريقة أخرى فوراً." },
    { id: "f3", cat: "anc",    q: "كم عدد جلسات رعاية ما قبل الولادة الموصى بها؟",              a: "توصي منظمة الصحة العالمية بحد أدنى 8 جلسات. قد تكون هناك حاجة لزيارات إضافية في حالة حدوث مضاعفات. تقدم عيادات الجمعية خدمات رعاية كاملة." },
    { id: "f4", cat: "sti",    q: "هل يمكنني الإصابة بمرض منقول جنسياً دون أي أعراض؟",         a: "نعم. العديد من الأمراض المنقولة جنسياً يمكن أن تكون بلا أعراض. الاختبار المنتظم مهم. تقدم عيادات الجمعية اختبارات سرية ومجانية." },
    { id: "f5", cat: "gbv",    q: "ماذا يجب أن أفعل فوراً بعد الاعتداء الجنسي؟",               a: "اذهبي إلى أقرب منشأة صحية في أسرع وقت. منع الحمل الطارئ والعلاج الوقائي للإيدز وعلاج الإصابات والدعم النفسي — كلها متاحة. لستِ مضطرة للإبلاغ للشرطة لتلقي الرعاية." },
    { id: "f6", cat: "cancer", q: "متى يجب أن أبدأ فحص سرطان عنق الرحم؟",                     a: "توصي منظمة الصحة العالمية ببدء الفحص في سن 25، كل 3–5 سنوات. زوري عيادة الجمعية لمعرفة ما يناسبك." },
    { id: "f7", cat: "mental", q: "هل القلق أثناء الحمل طبيعي؟",                               a: "القلق الخفيف طبيعي، لكن القلق المستمر أو نوبات الهلع تستحق المناقشة مع مقدم رعاية صحية. مستشارو الجمعية يمكنهم تقديم الدعم أو الإحالة لمتخصص." },
    { id: "f8", cat: "fp",     q: "هل تسبب حبوب منع الحمل الطارئة إجهاضاً؟",                  a: "لا. تمنع حبوب منع الحمل الطارئة الحمل عن طريق تأخير الإباضة. إذا كان الإخصاب قد حدث فلن تنهي الحمل. يجب تناولها في أقرب وقت — مثالياً خلال 72 ساعة." },
  ],
};

export default FAQS;

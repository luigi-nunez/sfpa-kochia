// Medical services from SFPA_Medical_Services_Registry.docx
// price: null = free service
export const SERVICES = [
  // Consultations
  { id: 's01', en: 'General Practitioner Consultation', ar: 'استشارة طبيب عام', price: 3000, cat_en: 'Consultations', cat_ar: 'الاستشارات' },
  { id: 's02', en: 'Specialist Consultation', ar: 'استشارة طبيب متخصص', price: 5000, cat_en: 'Consultations', cat_ar: 'الاستشارات' },
  { id: 's03', en: 'Gynaecology Consultation', ar: 'استشارة أمراض النساء', price: 5000, cat_en: 'Consultations', cat_ar: 'الاستشارات' },
  { id: 's04', en: 'Family Planning Consultation', ar: 'استشارة تنظيم الأسرة', price: null, cat_en: 'Consultations', cat_ar: 'الاستشارات' },
  { id: 's05', en: 'Youth-Friendly Health Consultation', ar: 'استشارة صحة الشباب', price: null, cat_en: 'Consultations', cat_ar: 'الاستشارات' },

  // Contraception
  { id: 's10', en: 'Combined Oral Contraceptive Pills (cycle)', ar: 'حبوب منع الحمل المركبة (دورة)', price: 1500, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's11', en: 'Progestogen-Only Pills (cycle)', ar: 'حبوب البروجستيرون فقط (دورة)', price: 1200, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's12', en: 'Injectable Contraceptive (DMPA)', ar: 'الحقن المانعة للحمل (ديبو)', price: 2000, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's13', en: 'Intrauterine Device (IUD) Insertion', ar: 'تركيب اللولب الرحمي', price: 8000, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's14', en: 'Intrauterine Device (IUD) Removal', ar: 'إزالة اللولب الرحمي', price: 4000, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's15', en: 'Implant Insertion (Implanon)', ar: 'تركيب كبسولة (إمبلانون)', price: 12000, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's16', en: 'Implant Removal', ar: 'إزالة الكبسولة', price: 6000, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's17', en: 'Emergency Contraception (morning-after pill)', ar: 'حبوب منع الحمل الطارئة', price: 2500, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's18', en: 'Male Condoms (pack of 12)', ar: 'الواقي الذكري (علبة 12)', price: 1000, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },
  { id: 's19', en: 'Female Condoms (pack of 3)', ar: 'الواقي الأنثوي (3 قطع)', price: 1500, cat_en: 'Contraception', cat_ar: 'تنظيم الأسرة' },

  // Laboratory
  { id: 's20', en: 'Complete Blood Count (CBC)', ar: 'صورة الدم الكاملة', price: 3500, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's21', en: 'Blood Glucose Test', ar: 'فحص سكر الدم', price: 2000, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's22', en: 'HIV Rapid Test', ar: 'فحص الإيدز السريع', price: null, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's23', en: 'Hepatitis B Surface Antigen Test', ar: 'فحص الالتهاب الكبدي B', price: 3000, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's24', en: 'Hepatitis C Antibody Test', ar: 'فحص الالتهاب الكبدي C', price: 3000, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's25', en: 'Syphilis (RPR) Test', ar: 'فحص الزهري', price: 2500, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's26', en: 'Gonorrhoea Culture & Sensitivity', ar: 'زراعة السيلان وحساسيته', price: 4500, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's27', en: 'Chlamydia Test', ar: 'فحص الكلاميديا', price: 5000, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's28', en: 'Urine Analysis', ar: 'تحليل البول', price: 1500, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's29', en: 'Pregnancy Test (urine)', ar: 'فحص الحمل (بول)', price: 1500, cat_en: 'Laboratory', cat_ar: 'المختبر' },
  { id: 's30', en: 'Pap Smear (Cervical Cytology)', ar: 'فحص عنق الرحم (باب سمير)', price: 6000, cat_en: 'Laboratory', cat_ar: 'المختبر' },

  // Prenatal Care
  { id: 's35', en: 'First Antenatal Visit & Assessment', ar: 'الزيارة الأولى لرعاية الحمل', price: 5000, cat_en: 'Prenatal Care', cat_ar: 'رعاية الحمل' },
  { id: 's36', en: 'Follow-up Antenatal Visit', ar: 'زيارة متابعة الحمل', price: 3000, cat_en: 'Prenatal Care', cat_ar: 'رعاية الحمل' },
  { id: 's37', en: 'Obstetric Ultrasound', ar: 'الموجات فوق الصوتية للحمل', price: 7000, cat_en: 'Prenatal Care', cat_ar: 'رعاية الحمل' },

  // Procedures
  { id: 's40', en: 'Pelvic Examination', ar: 'فحص الحوض', price: 3000, cat_en: 'Procedures', cat_ar: 'الإجراءات' },
  { id: 's41', en: 'Colposcopy', ar: 'منظار عنق الرحم', price: 10000, cat_en: 'Procedures', cat_ar: 'الإجراءات' },
  { id: 's42', en: 'Cryotherapy (cervical lesions)', ar: 'العلاج بالتبريد (آفات عنق الرحم)', price: 15000, cat_en: 'Procedures', cat_ar: 'الإجراءات' },

  // Free Services
  { id: 's50', en: 'Safe Abortion Services', ar: 'خدمات الإجهاض الآمن', price: null, cat_en: 'Free Services', cat_ar: 'الخدمات المجانية' },
  { id: 's51', en: 'Post-Abortion Care', ar: 'الرعاية بعد الإجهاض', price: null, cat_en: 'Free Services', cat_ar: 'الخدمات المجانية' },
  { id: 's52', en: 'GBV Survivor Support & Counselling', ar: 'دعم ومشورة ناجيات العنف', price: null, cat_en: 'Free Services', cat_ar: 'الخدمات المجانية' },
  { id: 's53', en: 'STI Treatment (where possible)', ar: 'علاج الأمراض المنقولة جنسياً', price: null, cat_en: 'Free Services', cat_ar: 'الخدمات المجانية' },
  { id: 's54', en: 'Nutritional Counselling', ar: 'الإرشاد الغذائي', price: null, cat_en: 'Free Services', cat_ar: 'الخدمات المجانية' },
  { id: 's55', en: 'Mental Health First Aid', ar: 'الإسعافات الأولية للصحة النفسية', price: null, cat_en: 'Free Services', cat_ar: 'الخدمات المجانية' },
  { id: 's56', en: 'Adolescent SRH Education Session', ar: 'جلسة تثقيف صحي للمراهقين', price: null, cat_en: 'Free Services', cat_ar: 'الخدمات المجانية' },
  { id: 's57', en: 'Referral Letter / Coordination', ar: 'خطاب إحالة / تنسيق', price: null, cat_en: 'Free Services', cat_ar: 'الخدمات المجانية' },
];

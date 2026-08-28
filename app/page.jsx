"use client";

import SiteFooter from "../components/site-footer";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const productImages = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNNW-qt641lxcDQwuK4twrx7Zy_D-gfwtOt-Cfxa0m5Lo4KzLdeUGoDTPjIbI415OB2s1l61pCJAPHttwLB1OuK2nfh08W3lAB4Piqd6JC5HqKURD1HbKSN4oMa7meK-W82bFXRyrGcIIxn8rbuiRVCZQA4GgubEK3KTKNXrpcOtBQ8878C9T039VM35rAoGzXGFBPOuH5xR9LMCZPfptg_y_H-RV4uwhuEpy4sFrzS0ZSBhORsZA"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQktmOa5jEGjnqt9na3rkiTrBg94heT88BMLhktCN6aPSUTzie3CuJWMYYJ5eqzu5Ews-kOId142ZQ2HiSiYPfPd93FdNduewx2WqwnlzzJCMVBGw-xep2-Nfb5JPp0JMHuMTFWPUm1x8fejCBUiKGQt5yoDbzigHr0HENcE1JnLe8sp6mJStBa-0h8ptEj3T379PitoPCRP4VBokQPSvFmxvAsUoWyXUKhhmAB5b1RdYVruJqzaI"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZSBuQEkUgPA6ZO3jWPc2neJAhO2Tly-oavh6GeqrFZZcfgfI4kxn_RpbTlFl3RexauQRLSehqWPlJBOv8id24GTot85NAS32RYDKQj6KPSp2_4i2_sqmjbdJU36PNOvNEDjmPctZQDcXDRXaYLz5S66K4HyGY_BYy4mCZnP_rTEENl42Ot5gzbJuYw7mOvVujhgJzfJ3r_Lwk2E4VbMQM075CgEKD_rOYX5D_VRBTmRS-pELh5Gw"
  }
];

const heroImage = "/clairsonhero.png";
const brandVideo = "/clairson-care.mp4";
const centerVideo = "/inside_Clairson_center.mp4";
const ctaImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDS09zIcFp4Mj6Z5VL2_UP86vlJYsPPN2A8FFZpFq89m8xnn9kfD5toPsxb68r_R0rqAE5p8zgOvXoGgClPaU8K_vn8wB9pNHVkNgN7Gx-sACKz3ZEtxC36G-y0-ktgzK59HsuoOXf27D_wh3GTL6tUCMrgxXM9TTAQ8q0ZUYz23wUw6YwR4sgQ_92gwoBf1SXjHWxAkwY4K_aGMoQGZPJpglXx4vbSTAbY1gPPLbgVMn-ksS2tAEU";

const links = {
  appointment: "/nous-trouver",
  centers: "/nous-trouver",
  hearingTest: "/test-auditif"
};

const languageOptions = [
  ["fr", "FR"],
  ["ar", "العربية"],
  ["darija", "الدارجة"]
];

const translations = {
  fr: {
    top: { appointment: "Prendre rendez-vous", appointmentShort: "RDV", centers: "Trouver un centre", centersShort: "Centre", test: "Test auditif en ligne" },
    nav: ["Accueil", "Appareils", "Services", "Trouver un centre", "Bilan auditif"],
    appointment: "Prendre rendez-vous",
    test: "Tester mon audition",
    discover: "Découvrir",
    readMore: "Lire la suite",
    selected: "Sélectionné",
    close: "Fermer",
    heroEyebrow: "CLAIRSON, À VOTRE ÉCOUTE",
    heroTitle: "Faites vraiment partie de la conversation",
    heroText: "Découvrez notre gamme de solutions auditives personnalisées.",
    videoEyebrow: "UNE ÉCOUTE PLUS NATURELLE",
    videoTitle: "Retrouvez les moments qui comptent",
    videoText: "Des solutions pensées pour rendre les échanges plus fluides, plus proches et plus confortables au quotidien.",
    productsEyebrow: "NOS SOLUTIONS AUDITIVES",
    productsTitle: "Des appareils auditifs pour chaque besoin",
    products: [
      ["Discrets", "Des solutions quasi invisibles qui s'adaptent parfaitement à votre conduit auditif."],
      ["Rechargeables", "Oubliez les piles. Profitez d'une autonomie d'une journée complète avec une seule charge."],
      ["Connectés", "Connectez-vous directement à votre smartphone et à vos appareils multimédias."]
    ],
    testEyebrow: "TEST INTERACTIF",
    testTitle: "Évaluez votre confort auditif",
    testText: "Répondez à quelques questions simples pour obtenir une première orientation avant un bilan professionnel.",
    questions: [
      "Vous augmentez souvent le volume de la télévision ?",
      "Vous demandez parfois aux proches de répéter ?",
      "Les conversations dans les lieux animés deviennent difficiles ?",
      "Vous entendez moins bien au téléphone ?"
    ],
    score: "Score",
    results: [
      "Risque faible, restez attentif aux changements.",
      "Un bilan préventif serait utile pour clarifier la situation.",
      "Un rendez-vous est recommandé pour un contrôle complet."
    ],
    whyTitle: "Pourquoi choisir CLAIRSON ?",
    whyText: "L'excellence au service de votre santé auditive, alliant précision clinique et accompagnement humain.",
    benefits: [
      ["verified", "Expertise clinique", "Des professionnels hautement qualifiés pour un diagnostic précis."],
      ["settings_accessibility", "Solutions personnalisées", "Des réglages sur-mesure adaptés à votre style de vie."],
      ["hearing", "Technologies de pointe", "Les derniers appareils des plus grandes marques mondiales."],
      ["favorite", "Suivi continu", "Un accompagnement sur le long terme pour garantir votre confort."]
    ],
    centerEyebrow: "DANS LE CENTRE",
    centerTitle: "Un accueil calme, humain et professionnel",
    centerText: "Découvrez l'environnement CLAIRSON : un espace pensé pour écouter, conseiller et accompagner chaque génération.",
    testimonialsTitle: "Ils nous font confiance",
    testimonials: [
      ["child_care", "Yanis, 8 ans", "L'équipe a pris le temps de tout expliquer simplement. Le test s'est passé sans stress."],
      ["woman", "Sara, 29 ans", "J'ai trouvé des conseils clairs et une solution discrète adaptée à mon quotidien."],
      ["elderly", "Ahmed, 72 ans", "Je comprends mieux les conversations avec ma famille. Le suivi m'a beaucoup rassuré."],
      ["school", "Imane, maman de Lina", "Ma fille a été accueillie avec douceur. L'équipe a su la mettre en confiance dès les premières minutes."],
      ["work", "Nadia, 41 ans", "Au travail, les réunions sont redevenues plus simples. Les réglages ont vraiment changé mon confort."],
      ["groups", "Mohamed, 64 ans", "J'avais peur de porter un appareil visible. On m'a proposé une solution discrète et facile à utiliser."]
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      ["Combien dure un bilan auditif ?", "En général, entre 30 et 45 minutes avec un échange, des mesures et des conseils personnalisés."],
      ["Les appareils sont-ils visibles ?", "Il existe des modèles très discrets, y compris intra-auriculaires, selon votre profil auditif."],
      ["Puis-je tester avant de choisir ?", "Oui, l'accompagnement CLAIRSON peut inclure une période d'essai et des réglages progressifs."]
    ],
    ctaTitle: "Prenez soin de votre audition dès aujourd'hui",
    ctaText: "N'attendez plus pour retrouver le confort d'une écoute naturelle. Prenez rendez-vous pour un bilan gratuit dans l'un de nos centres.",
    footerText: "Votre partenaire de confiance pour une meilleure audition au quotidien.",
    quickLinks: "Liens rapides",
    info: "Informations",
    help: "Besoin d'aide ?",
    helpText: "Contactez notre service client pour toute question.",
    legal: ["Mentions légales", "Confidentialité", "Cookies"],
    infoLinks: ["Conditions générales", "Recrutement", "Contact"],
    copyright: "© 2024 CLAIRSON Hearing Care. Tous droits réservés.",
    modalTitle: "Prendre rendez-vous",
    modalText: "Un conseiller vous rappellera pour confirmer le créneau.",
    sentTitle: "Demande enregistrée",
    sentText: "Simulation réussie. Le formulaire pourra ensuite être relié à un email, CRM ou base de données.",
    form: { name: "Nom complet", phone: "Téléphone", center: "Centre souhaité", submit: "Envoyer la demande" }
  },
  ar: {
    top: { appointment: "احجز موعداً", appointmentShort: "موعد", centers: "ابحث عن مركز", centersShort: "مركز", test: "اختبار السمع عبر الإنترنت" },
    nav: ["الرئيسية", "الأجهزة", "الخدمات", "ابحث عن مركز", "اختبار السمع"],
    appointment: "احجز موعداً",
    test: "اختبر سمعي",
    discover: "اكتشف",
    readMore: "اقرأ المزيد",
    selected: "مختار",
    close: "إغلاق",
    heroEyebrow: "كليرسون، نصغي إليك",
    heroTitle: "لَمّة العائلة تَحلو حين تسمع كل كلمة.",
    heroText: "اكتشف مجموعتنا من الحلول السمعية المخصصة.",
    videoEyebrow: "استماع أكثر طبيعية",
    videoTitle: "استعد اللحظات التي تهمك",
    videoText: "حلول مصممة لجعل الحوار اليومي أكثر وضوحاً وقرباً وراحة.",
    productsEyebrow: "حلولنا السمعية",
    productsTitle: "أجهزة سمعية لكل احتياج",
    products: [
      ["خفيفة وغير ظاهرة", "حلول شبه غير مرئية تتكيف مع قناة الأذن براحة."],
      ["قابلة للشحن", "استغن عن البطاريات واستمتع باستقلالية تدوم طوال اليوم."],
      ["متصلة", "اتصل مباشرة بهاتفك الذكي وأجهزتك المتعددة الوسائط."]
    ],
    testEyebrow: "اختبار تفاعلي",
    testTitle: "قيّم راحتك السمعية",
    testText: "أجب عن أسئلة بسيطة للحصول على توجيه أولي قبل الفحص المهني.",
    questions: ["هل ترفع صوت التلفاز كثيراً؟", "هل تطلب من الآخرين تكرار الكلام؟", "هل تصبح المحادثات صعبة في الأماكن المزدحمة؟", "هل تسمع بصعوبة أثناء المكالمات الهاتفية؟"],
    score: "النتيجة",
    results: ["المؤشر منخفض، تابع ملاحظة أي تغير.", "فحص وقائي قد يساعد على توضيح الوضع.", "يُنصح بحجز موعد لفحص كامل."],
    whyTitle: "لماذا تختار كليرسون؟",
    whyText: "خبرة في خدمة صحتك السمعية، تجمع بين الدقة السريرية والمرافقة الإنسانية.",
    benefits: [
      ["verified", "خبرة سريرية", "مختصون مؤهلون لتشخيص دقيق."],
      ["settings_accessibility", "حلول مخصصة", "إعدادات مصممة حسب نمط حياتك."],
      ["hearing", "تقنيات متقدمة", "أحدث الأجهزة من علامات عالمية موثوقة."],
      ["favorite", "متابعة مستمرة", "مرافقة طويلة المدى لضمان راحتك."]
    ],
    centerEyebrow: "داخل المركز",
    centerTitle: "استقبال هادئ، إنساني ومهني",
    centerText: "اكتشف فضاء كليرسون: مكان مصمم للاستماع، التوجيه ومرافقة كل الأجيال.",
    testimonialsTitle: "زبناؤنا يثقون بنا",
    testimonials: [
      ["child_care", "يانيس، 8 سنوات", "الفريق أخذ الوقت الكافي لشرح كل شيء بطريقة بسيطة. مرّ الاختبار دون توتر."],
      ["woman", "سارة، 29 سنة", "وجدت نصائح واضحة وحلاً غير ظاهر يناسب يومي."],
      ["elderly", "أحمد، 72 سنة", "أصبحت أفهم المحادثات مع عائلتي بشكل أفضل، والمتابعة منحتني اطمئناناً كبيراً."],
      ["school", "إيمان، والدة لينا", "استقبلوا ابنتي بلطف كبير، واستطاع الفريق أن يجعلها مرتاحة منذ الدقائق الأولى."],
      ["work", "نادية، 41 سنة", "أصبحت الاجتماعات في العمل أسهل بكثير. التعديلات حسّنت راحتي السمعية فعلاً."],
      ["groups", "محمد، 64 سنة", "كنت أخاف من جهاز ظاهر، لكنهم اقترحوا عليّ حلاً غير ملحوظ وسهل الاستعمال."]
    ],
    faqTitle: "أسئلة شائعة",
    faqs: [["كم يستغرق فحص السمع؟", "عادة بين 30 و45 دقيقة، مع حوار وقياسات ونصائح مخصصة."], ["هل الأجهزة ظاهرة؟", "توجد نماذج صغيرة جداً وغير ظاهرة حسب حالتك السمعية."], ["هل يمكنني التجربة قبل الاختيار؟", "نعم، يمكن أن تشمل المرافقة فترة تجربة وتعديلات تدريجية."]],
    ctaTitle: "اعتنِ بسمعك ابتداءً من اليوم",
    ctaText: "لا تنتظر لاستعادة راحة السمع الطبيعي. احجز موعداً لفحص مجاني في أحد مراكزنا.",
    footerText: "شريكك الموثوق لسمع أفضل كل يوم.",
    quickLinks: "روابط سريعة",
    info: "معلومات",
    help: "هل تحتاج مساعدة؟",
    helpText: "تواصل مع خدمة العملاء لأي سؤال.",
    legal: ["الإشعارات القانونية", "الخصوصية", "ملفات تعريف الارتباط"],
    infoLinks: ["الشروط العامة", "التوظيف", "اتصل بنا"],
    copyright: "© 2024 كليرسون للعناية السمعية. جميع الحقوق محفوظة.",
    modalTitle: "احجز موعداً",
    modalText: "سيتصل بك مستشار لتأكيد الموعد.",
    sentTitle: "تم تسجيل الطلب",
    sentText: "تمت المحاكاة بنجاح. يمكن ربط النموذج لاحقاً بالبريد الإلكتروني أو CRM أو قاعدة بيانات.",
    form: { name: "الاسم الكامل", phone: "الهاتف", center: "المركز المطلوب", submit: "إرسال الطلب" }
  },
  darija: {
    top: { appointment: "خد موعد", appointmentShort: "موعد", centers: "لقا مركز", centersShort: "مركز", test: "تيست السمع أونلاين" },
    nav: ["الرئيسية", "الأجهزة", "الخدمات", "لقا مركز", "تيست السمع"],
    appointment: "خد موعد",
    test: "جرّب السمع ديالي",
    discover: "شوف أكثر",
    readMore: "قرا أكثر",
    selected: "مختار",
    close: "سد",
    heroEyebrow: "كليرسون، حنا كنسمعو ليك",
    heroTitle: "اللّمّة كتكون أحلى ملي كتسمع كلشي",
    heroText: "اكتاشف حلول سمعية مفصلة على القياس ديالك.",
    videoEyebrow: "سمع طبيعي أكثر",
    videoTitle: "رجع للحظات اللي كتعنيك",
    videoText: "حلول كتعاون الهضرة اليومية تولي أوضح، أقرب، ومريحة أكثر.",
    productsEyebrow: "الحلول السمعية ديالنا",
    productsTitle: "أجهزة سمع لكل احتياج",
    products: [
      ["ما كيبانوش بزاف", "حلول خفيفة ومخبية كتوافق الأذن ديالك براحة."],
      ["كيتشارجاو", "نسى البطاريات واستافد من نهار كامل بشحنة وحدة."],
      ["مرتبطين", "وصل الجهاز مباشرة بالتلفون وبالأجهزة ديالك."]
    ],
    testEyebrow: "تيست تفاعلي",
    testTitle: "قيّم الراحة ديال السمع ديالك",
    testText: "جاوب على شوية أسئلة باش تاخد فكرة أولية قبل الفحص عند المختص.",
    questions: ["كتطلع صوت التلفاز بزاف؟", "كتطلب من الناس يعاودو الهضرة؟", "كتصعاب عليك الهضرة فالأماكن لعامرين؟", "كتسمع بصعوبة فالتلفون؟"],
    score: "النقطة",
    results: ["الخطر قليل، بقا غير متبع التغييرات.", "مزيان تدير فحص وقائي باش توضح الحالة.", "من الأفضل تاخد موعد لفحص كامل."],
    whyTitle: "علاش تختار كليرسون؟",
    whyText: "خبرة فخدمة السمع ديالك، بدقة مهنية ومرافقة إنسانية.",
    benefits: [
      ["verified", "خبرة مهنية", "مختصين مؤهلين لتشخيص مضبوط."],
      ["settings_accessibility", "حلول على القياس", "إعدادات مناسبة لطريقة العيش ديالك."],
      ["hearing", "تقنيات حديثة", "آخر الأجهزة من ماركات عالمية."],
      ["favorite", "تتبع مستمر", "مرافقة على المدى الطويل باش تبقى مرتاح."]
    ],
    centerEyebrow: "داخل المركز",
    centerTitle: "استقبال هادئ، إنساني ومهني",
    centerText: "شوف فضاء كليرسون: بلاصة مهيأة باش نسمعو ليك، نشرحو ليك، ونرافقو كل الأعمار.",
    testimonialsTitle: "الزبناء ديالنا واثقين فينا",
    testimonials: [
      ["child_care", "يانيس، 8 سنين", "الفريق شرح لينا كلشي بطريقة بسيطة، والتيست داز بلا خوف."],
      ["woman", "سارة، 29 عام", "لقيت نصائح واضحة وحل مخبي ومناسب للحياة اليومية ديالي."],
      ["elderly", "أحمد، 72 عام", "وليت كنسمع الهضرة مع العائلة أحسن، والتتبع عطاني راحة كبيرة."],
      ["school", "إيمان، أم لينا", "بنتي استقبلوها بلطف، والفريق خلاها ترتاح من اللول."],
      ["work", "نادية، 41 عام", "فالخدمة ولات الاجتماعات أسهل بزاف. الضبط اللي دارو فرق معايا."],
      ["groups", "محمد، 64 عام", "كنت خايف من جهاز يبان، ولكن عطاوني حل مخبي وساهل فالاستعمال."]
    ],
    faqTitle: "أسئلة كتعاود",
    faqs: [["شحال كيدوز فحص السمع؟", "غالباً بين 30 و45 دقيقة، فيه نقاش وقياسات ونصائح خاصة بيك."], ["واش الأجهزة كتبان؟", "كاينين موديلات صغار بزاف وما كيبانوش حسب الحالة ديالك."], ["نقدر نجرب قبل ما نختار؟", "إيه، ممكن تكون فترة تجربة وتعديلات بشوية بشوية."]],
    ctaTitle: "رد البال للسمع ديالك من اليوم",
    ctaText: "ما تسناش باش ترجع لراحة السمع الطبيعي. خد موعد لفحص مجاني فواحد من المراكز ديالنا.",
    footerText: "الشريك ديالك لسمع أحسن كل نهار.",
    quickLinks: "روابط سريعة",
    info: "معلومات",
    help: "محتاج مساعدة؟",
    helpText: "تاصل بخدمة الزبناء لأي سؤال.",
    legal: ["المعلومات القانونية", "الخصوصية", "الكوكيز"],
    infoLinks: ["الشروط العامة", "التوظيف", "اتصل بنا"],
    copyright: "© 2024 كليرسون. جميع الحقوق محفوظة.",
    modalTitle: "خد موعد",
    modalText: "غادي يتاصل بك مستشار باش يأكد الموعد.",
    sentTitle: "تسجل الطلب",
    sentText: "المحاكاة دازت مزيان. نقدر نربطو الفورم من بعد بالإيميل أو CRM أو قاعدة بيانات.",
    form: { name: "الاسم الكامل", phone: "التلفون", center: "المركز اللي بغيتي", submit: "صيفط الطلب" }
  }
};

function Icon({ children, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>;
}

function Reveal({ children, className = "", id, delay = 0 }) {
  return (
    <motion.section
      className={className}
      id={id}
      initial={{ opacity: 0, y: 34, scale: 0.985, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -90px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function PrimaryButton({ children, href, onClick, className = "" }) {
  const baseClassName = `bg-primary text-on-primary px-8 py-3 rounded-full hover:bg-secondary transition-colors h-[56px] flex items-center justify-center font-bold ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a className={baseClassName} href={href} rel={isExternal ? "noreferrer" : undefined} target={isExternal ? "_blank" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClassName} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function SecondaryButton({ children, href, onClick, className = "" }) {
  const baseClassName = `border border-secondary text-secondary bg-transparent px-8 py-3 rounded-full hover:bg-secondary hover:text-on-primary transition-colors h-[56px] flex items-center justify-center font-bold ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a className={baseClassName} href={href} rel={isExternal ? "noreferrer" : undefined} target={isExternal ? "_blank" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClassName} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function AppointmentModal({ open, onClose, t }) {
  const [sent, setSent] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] bg-black/40 px-4 py-8 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-lg rounded-[24px] bg-surface-container-lowest p-6 sm:p-8 shadow-soft" initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }}>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-h3-desktop text-h3-desktop text-on-surface">{t.modalTitle}</h2>
                <p className="text-on-surface-variant text-base">{t.modalText}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary" onClick={onClose} type="button" aria-label={t.close}>
                <Icon>close</Icon>
              </button>
            </div>
            {sent ? (
              <div className="rounded-[16px] bg-surface p-5 text-primary">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <Icon>check_circle</Icon> {t.sentTitle}
                </div>
                <p className="text-on-surface-variant">{t.sentText}</p>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
                <input className="rounded-[12px] border-outline-variant" placeholder={t.form.name} required />
                <input className="rounded-[12px] border-outline-variant" placeholder={t.form.phone} required type="tel" />
                <select className="rounded-[12px] border-outline-variant" defaultValue="">
                  <option value="" disabled>{t.form.center}</option>
                  <option>Casablanca</option>
                  <option>Rabat</option>
                  <option>Marrakech</option>
                </select>
                <PrimaryButton>{t.form.submit}</PrimaryButton>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HearingTest({ t }) {
  const [answers, setAnswers] = useState(Array(t.questions.length).fill(false));
  const score = answers.filter(Boolean).length;
  const result = useMemo(() => {
    if (score <= 1) return t.results[0];
    if (score <= 3) return t.results[1];
    return t.results[2];
  }, [score, t]);

  return (
    <Reveal className="max-w-container-max mx-auto px-gutter mb-section-v-desktop" id="bilan-auditif">
      <div className="grid gap-8 rounded-[28px] border border-outline-variant bg-surface-container-lowest p-6 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:p-8">
        <div>
          <span className="inline-block bg-surface text-secondary px-4 py-2 rounded-full font-label-caps text-label-caps mb-4 ring-1 ring-outline-variant">{t.testEyebrow}</span>
          <h2 className="font-h2-desktop text-h2-desktop text-on-surface mb-4">{t.testTitle}</h2>
          <p className="text-on-surface-variant">{t.testText}</p>
          <div className="mt-6 flex gap-2">
            <span className="h-2 w-12 rounded-full bg-primary" />
            <span className="h-2 w-12 rounded-full bg-secondary" />
            <span className="h-2 w-12 rounded-full bg-accent" />
            <span className="h-2 w-12 rounded-full bg-success" />
          </div>
        </div>
        <div className="bg-surface rounded-[20px] border border-outline-variant p-6 sm:p-8">
          <div className="grid gap-4">
            {t.questions.map((question, index) => (
              <label className="flex items-center justify-between gap-4 rounded-[14px] border border-outline-variant p-4 cursor-pointer hover:border-primary" key={question}>
                <span className="text-base text-on-surface">{question}</span>
                <input checked={answers[index]} className="h-5 w-5 text-primary" onChange={() => setAnswers((current) => current.map((value, itemIndex) => (itemIndex === index ? !value : value)))} type="checkbox" />
              </label>
            ))}
          </div>
          <div className="mt-6 rounded-[16px] border border-outline-variant bg-surface-container-low p-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="font-bold text-primary">{t.score}</span>
              <span className="font-bold text-on-surface">{score}/{t.questions.length}</span>
            </div>
            <div className="h-2 rounded-full bg-outline-variant overflow-hidden mb-3">
              <motion.div className="h-full bg-success" animate={{ width: `${(score / t.questions.length) * 100}%` }} />
            </div>
            <p className="text-on-surface-variant">{result}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const [language, setLanguage] = useState("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("#accueil");
  const testimonialsRef = useRef(null);
  const t = translations[language];
  const isRtl = language !== "fr";
  const logoSrc = isRtl ? "/clairson-logoar.svg" : "/clairson-logo.svg";
  const hearingTestHref = `${links.hearingTest}?lang=${language}`;
  const centersHref = `${links.centers}?lang=${language}`;
  const devicesHref = `/appareils?lang=${language}`;
  const directionClass = isRtl ? "text-right" : "text-left";
  const navItems = [
    [t.nav[0], "#accueil"],
    [t.nav[1], devicesHref],
    [t.nav[2], "#services"],
    [t.nav[3], centersHref],
    [t.nav[4], hearingTestHref]
  ];
  const products = t.products.map(([title, description], index) => ({
    title,
    description,
    image: productImages[index].image
  }));

  useEffect(() => {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    if (urlLanguage && translations[urlLanguage]) {
      setLanguage(urlLanguage);
    }
  }, []);

  const scrollTestimonials = (direction) => {
    testimonialsRef.current?.scrollBy({
      left: direction * 340,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const trackedSections = ["accueil", "appareils", "services", "bilan-auditif"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const currentSection = trackedSections
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          return { id, top: Math.abs(element.getBoundingClientRect().top - 150) };
        })
        .filter(Boolean)
        .sort((first, second) => first.top - second.top)[0];

      if (currentSection) {
        setActiveNav(`#${currentSection.id}`);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className={isRtl ? "font-arabic" : ""} dir={isRtl ? "rtl" : "ltr"} lang={language === "fr" ? "fr" : "ar"}>
      <div className="fixed top-0 z-50 w-full shadow-sm">
        <motion.div
          className="overflow-hidden bg-night text-on-secondary"
          animate={{ height: isScrolled ? 0 : 40, opacity: isScrolled ? 0 : 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="flex h-full max-w-container-max items-center justify-end gap-2 px-gutter mx-auto text-[12px] font-semibold">
            <div className="flex h-full min-w-0 items-center justify-end gap-1 sm:gap-2">
              <a className="flex h-full items-center gap-1.5 whitespace-nowrap px-2 text-on-secondary transition-colors hover:bg-surface-container-lowest/10 sm:px-3" href={centersHref}>
                <Icon className="text-[17px] text-accent">calendar_month</Icon>
                <span className="hidden sm:inline">{t.top.appointment}</span>
                <span className="sm:hidden">{t.top.appointmentShort}</span>
              </a>
              <a className="flex h-full items-center gap-1.5 whitespace-nowrap px-2 text-on-secondary transition-colors hover:bg-surface-container-lowest/10 sm:px-3" href={centersHref}>
                <Icon className="text-[17px] text-accent">location_on</Icon>
                <span className="hidden sm:inline">{t.top.centers}</span>
                <span className="sm:hidden">{t.top.centersShort}</span>
              </a>
              <a className="hidden h-full items-center gap-1.5 whitespace-nowrap px-3 text-on-secondary transition-colors hover:bg-surface-container-lowest/10 md:flex" href={hearingTestHref}>
                <Icon className="text-[17px] text-accent">hearing</Icon>
                <span>{t.top.test}</span>
              </a>
            </div>
          </div>
        </motion.div>

        <header className="bg-surface-container-lowest border-b border-outline-variant font-body-md text-body-md text-primary">
          <div className="flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto">
            <a className="flex h-16 items-center" href="#accueil" aria-label="CLAIRSON accueil">
              <img className="h-16 w-auto object-contain" src={logoSrc} alt="CLAIRSON" />
            </a>
            <nav className="hidden md:flex gap-6">
              {navItems.map(([item, href]) => {
                const isActive = href.startsWith("#") && activeNav === href;

                return (
                  <a
                    className={isActive ? "text-primary font-extrabold border-b-2 border-primary pb-1" : "font-bold text-on-surface-variant hover:text-primary transition-colors"}
                    href={href}
                    key={item}
                    onClick={() => {
                      if (href.startsWith("#")) setActiveNav(href);
                    }}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    target={href.startsWith("http") ? "_blank" : undefined}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center rounded-full border border-outline-variant bg-surface p-1">
                {languageOptions.map(([value, label]) => (
                  <button
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${language === value ? "bg-secondary text-on-primary" : "text-on-surface-variant hover:text-secondary"}`}
                    key={value}
                    onClick={() => setLanguage(value)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <PrimaryButton href={centersHref}>{t.appointment}</PrimaryButton>
            </div>
            <button className="md:hidden w-11 h-11 rounded-full bg-surface-container text-night flex items-center justify-center" onClick={() => setMenuOpen((value) => !value)} type="button" aria-label="Menu">
              <Icon>{menuOpen ? "close" : "menu"}</Icon>
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.nav className="md:hidden bg-surface-container-lowest border-t border-outline-variant px-gutter py-4 grid gap-3" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                {navItems.map(([item, href]) => {
                  const isActive = href.startsWith("#") && activeNav === href;

                  return (
                    <a
                      className={isActive ? "rounded-full bg-primary px-4 py-2 font-extrabold text-on-primary" : "font-bold text-on-surface-variant py-2"}
                      href={href}
                      key={item}
                      onClick={() => {
                        if (href.startsWith("#")) setActiveNav(href);
                        setMenuOpen(false);
                      }}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      target={href.startsWith("http") ? "_blank" : undefined}
                    >
                      {item}
                    </a>
                  );
                })}
                <div className="flex w-fit items-center rounded-full border border-outline-variant bg-surface p-1">
                  {languageOptions.map(([value, label]) => (
                    <button
                      className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${language === value ? "bg-secondary text-on-primary" : "text-on-surface-variant"}`}
                      key={value}
                      onClick={() => setLanguage(value)}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <PrimaryButton href={centersHref}>{t.appointment}</PrimaryButton>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      </div>

      <main className="pt-[120px]" id="accueil">
        <section className="relative w-full mb-section-v-desktop">
          <motion.div className="relative flex min-h-[640px] w-full items-center overflow-hidden p-4 sm:p-8 lg:p-10" initial={{ opacity: 0.9 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div
              className={`absolute inset-0 bg-cover bg-center ${isRtl ? "scale-x-[-1]" : "scale-x-100"}`}
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            <div className={`absolute inset-0 ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-surface-container-lowest/45 via-surface/18 to-transparent`} />
            <motion.div className={`relative z-10 w-full max-w-lg bg-[rgba(252,254,254,0.75)] backdrop-blur-[1px] p-5 sm:p-8 rounded-[20px] shadow-soft border-2 border-secondary/80 ${directionClass}`} initial={{ opacity: 0, x: isRtl ? 28 : -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
              <div className="mb-4 flex gap-2">
                <span className="h-1.5 w-8 rounded-full bg-primary" />
                <span className="h-1.5 w-8 rounded-full bg-secondary" />
                <span className="h-1.5 w-8 rounded-full bg-accent" />
              </div>
              <span className="text-secondary font-label-caps text-[11px] uppercase tracking-wider mb-3 block">{t.heroEyebrow}</span>
              <h1 className="font-h1-desktop text-[26px] leading-tight md:text-[34px] text-on-surface mb-4">{t.heroTitle}</h1>
              <p className="font-body-lg text-[15px] leading-7 md:text-base text-on-surface-variant mb-6">{t.heroText}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <PrimaryButton className="h-12 px-6 text-sm" href={centersHref}>{t.appointment}</PrimaryButton>
                <SecondaryButton className="h-12 px-6 text-sm" href={hearingTestHref}>{t.test}</SecondaryButton>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <Reveal className="max-w-container-max mx-auto px-gutter mb-section-v-desktop">
          <div className="grid items-center gap-8 rounded-[28px] border border-outline-variant bg-surface-container-lowest p-6 shadow-soft lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
            <div className={directionClass}>
              <span className="inline-block bg-surface text-secondary px-4 py-2 rounded-full font-label-caps text-label-caps mb-4 ring-1 ring-outline-variant">{t.videoEyebrow}</span>
              <h2 className="font-h2-desktop text-h2-desktop text-on-surface mb-4">{t.videoTitle}</h2>
              <p className="text-on-surface-variant text-lg leading-8 max-w-2xl">{t.videoText}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <PrimaryButton href={centersHref}>{t.appointment}</PrimaryButton>
                <SecondaryButton href={hearingTestHref}>{t.test}</SecondaryButton>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[24px] border border-outline-variant bg-night shadow-soft">
              <div className="absolute inset-x-0 top-0 z-10 h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
              <video
                aria-label={t.videoTitle}
                autoPlay
                className="aspect-video w-full object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                src={brandVideo}
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="text-center max-w-container-max mx-auto px-gutter mb-section-v-desktop" id="appareils">
          <span className="inline-block bg-surface text-secondary px-4 py-2 rounded-full font-label-caps text-label-caps mb-4">{t.productsEyebrow}</span>
          <h2 className="font-h2-desktop text-h2-desktop text-on-surface">{t.productsTitle}</h2>
        </Reveal>

        <section className="max-w-container-max mx-auto px-gutter mb-section-v-desktop grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.a
              className={`${isRtl ? "items-end text-right" : "items-start text-left"} bg-surface-container-lowest rounded-[20px] border p-8 shadow-soft flex flex-col group transition-colors ${activeProduct === index ? "border-secondary bg-surface" : "border-outline-variant hover:border-secondary"}`}
              href={devicesHref}
              initial={{ opacity: 0, y: 26 }}
              key={product.title}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <img className="w-full h-48 object-cover rounded-[16px] mb-6" alt={`Solution auditive ${product.title}`} src={product.image} />
              <h3 className="font-h3-desktop text-h3-desktop text-on-surface mb-2">{product.title}</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">{product.description}</p>
              <span className="font-semibold flex items-center gap-2 text-primary transition-all group-hover:gap-3">{t.discover} <Icon>{isRtl ? "arrow_back" : "arrow_forward"}</Icon></span>
            </motion.a>
          ))}
        </section>

        <HearingTest t={t} />

        <Reveal className="bg-night text-on-primary py-section-v-desktop mb-section-v-desktop relative overflow-hidden" id="services">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="max-w-container-max mx-auto px-gutter relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3">
              <h2 className="font-h2-desktop text-h2-desktop mb-6 text-on-primary">{t.whyTitle}</h2>
              <p className="font-body-lg text-body-lg text-on-primary/80">{t.whyText}</p>
            </div>
            <div className="lg:w-2/3 bg-surface-container-lowest text-on-surface rounded-[24px] p-8 sm:p-10 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.benefits.map(([icon, title, description], index) => (
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 22 }}
                  key={title}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${["bg-primary text-on-primary", "bg-secondary text-on-primary", "bg-accent text-on-primary", "bg-success text-on-primary"][index]}`}><Icon className="text-[24px]">{icon}</Icon></div>
                  <div><h4 className="font-bold text-lg mb-2">{title}</h4><p className="text-on-surface-variant text-sm">{description}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="max-w-container-max mx-auto px-gutter mb-section-v-desktop">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[24px] border border-outline-variant bg-night shadow-soft">
              <div className="absolute inset-x-0 top-0 z-10 h-2 bg-gradient-to-r from-success via-secondary to-primary" />
              <video
                aria-label={t.centerTitle}
                autoPlay
                className="aspect-video w-full object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                src={centerVideo}
              />
            </div>
            <div className={directionClass}>
              <span className="inline-block bg-surface-container-lowest text-secondary px-4 py-2 rounded-full font-label-caps text-label-caps mb-4 ring-1 ring-outline-variant">{t.centerEyebrow}</span>
              <h2 className="font-h2-desktop text-h2-desktop text-on-surface mb-4">{t.centerTitle}</h2>
              <p className="text-on-surface-variant text-lg leading-8">{t.centerText}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mb-section-v-desktop overflow-hidden border-y border-outline-variant bg-surface py-section-v-mobile">
          <div className="mx-auto grid max-w-container-max gap-8 px-gutter lg:grid-cols-[300px_1fr] lg:items-center">
            <div className={directionClass}>
              <h2 className="font-h2-desktop text-h2-desktop text-night mb-5">{t.testimonialsTitle}</h2>
              <p className="text-lg leading-8 text-on-surface-variant">{t.centerText}</p>
              <div className="mt-6 flex gap-2">
                <span className="h-2 w-10 rounded-full bg-accent" />
                <span className="h-2 w-10 rounded-full bg-success" />
                <span className="h-2 w-10 rounded-full bg-secondary" />
              </div>
            </div>
            <div className="relative min-w-0">
              <div ref={testimonialsRef} className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {t.testimonials.map(([icon, name, quote], index) => (
                  <motion.article
                    className="min-w-[286px] snap-start overflow-hidden rounded-[20px] border border-outline-variant bg-surface-container-lowest shadow-soft sm:min-w-[320px]"
                    initial={{ opacity: 0, x: isRtl ? -24 : 24 }}
                    key={name}
                    transition={{ duration: 0.55, delay: Math.min(index, 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <div className={`h-2 ${["bg-primary", "bg-secondary", "bg-success", "bg-accent", "bg-night", "bg-primary"][index]}`} />
                    <div className="p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-outline-variant ${index % 3 === 0 ? "bg-surface text-primary" : index % 3 === 1 ? "bg-surface-container text-night" : "bg-success text-on-primary"}`}>
                        <Icon className="text-[30px]">{icon}</Icon>
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-night">{name}</h3>
                        <div className="mt-2 flex gap-1 text-accent" aria-label="5 étoiles">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Icon className="text-[22px]" key={index}>star</Icon>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="min-h-[104px] leading-7 text-on-surface-variant">{quote}</p>
                    <a className="mt-5 inline-flex items-center gap-2 font-extrabold text-primary underline-offset-4 hover:text-secondary hover:underline" href={centersHref}>
                      {t.readMore}
                      <Icon>{isRtl ? "arrow_back" : "arrow_forward"}</Icon>
                    </a>
                    </div>
                  </motion.article>
                ))}
              </div>
              <button
                aria-label={t.discover}
                className={`absolute top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-soft ring-1 ring-outline-variant transition-colors hover:bg-surface md:flex ${isRtl ? "left-2" : "right-2"}`}
                onClick={() => scrollTestimonials(isRtl ? -1 : 1)}
                type="button"
              >
                <Icon className="text-[30px]">{isRtl ? "chevron_left" : "chevron_right"}</Icon>
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="max-w-container-max mx-auto px-gutter mb-section-v-desktop">
          <h2 className="font-h2-desktop text-h2-desktop text-on-surface mb-6">{t.faqTitle}</h2>
          <div className="grid gap-4">
            {t.faqs.map(([question, answer], index) => (
              <motion.div
                className="bg-surface-container-lowest rounded-[16px] border border-outline-variant overflow-hidden"
                initial={{ opacity: 0, y: 18 }}
                key={question}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.35 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <button className={`w-full p-5 flex items-center justify-between gap-4 font-bold ${isRtl ? "text-right" : "text-left"}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} type="button">
                  {question}<Icon>{openFaq === index ? "expand_less" : "expand_more"}</Icon>
                </button>
                <AnimatePresence>
                  {openFaq === index && <motion.p className="px-5 pb-5 text-on-surface-variant" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{answer}</motion.p>}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <section className="max-w-container-max mx-auto px-gutter mb-section-v-desktop">
          <div className="relative rounded-[32px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('${ctaImage}')` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-night/45 via-primary/20 to-accent/35 backdrop-blur-sm" />
            <div className="relative py-24 px-6 sm:px-10 flex flex-col items-center text-center">
              <div className="bg-surface-container-lowest/95 backdrop-blur p-8 sm:p-12 rounded-[24px] max-w-2xl shadow-soft border border-outline-variant">
                <div className="mx-auto mb-5 flex w-fit gap-2">
                  <span className="h-2 w-12 rounded-full bg-primary" />
                  <span className="h-2 w-12 rounded-full bg-accent" />
                  <span className="h-2 w-12 rounded-full bg-success" />
                </div>
                <h2 className="font-h2-desktop text-h2-desktop text-on-surface mb-4">{t.ctaTitle}</h2>
                <p className="text-on-surface-variant mb-8 text-lg">{t.ctaText}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <PrimaryButton href={centersHref}>{t.appointment}</PrimaryButton>
                  <SecondaryButton href={hearingTestHref}>{t.test}</SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter language={language} />

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} t={t} />
    </div>
    </MotionConfig>
  );
}

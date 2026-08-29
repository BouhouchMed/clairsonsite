"use client";

import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import { withBasePath } from "../../components/site-paths";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const modelImages = [
  "https://www.starkey.fr/-/media/ConsumerSites/Images/Renderings/ItemSource/StylesBox/Starkey/product-bte.png?h=400&w=240&la=fr-FR&hash=FABE761F8A793D8A005891D0EB2C2DBB84845448",
  "https://www.starkey.fr/-/media/ConsumerSites/Images/Renderings/ItemSource/StylesBox/Starkey/product-ric-omega.png?h=400&w=240&la=fr-FR&hash=4176A281633939918941B2DF7942B7130D5524CE",
  "https://www.starkey.fr/-/media/ConsumerSites/Images/Renderings/ItemSource/StylesBox/Starkey/product-utica-ite.png?h=400&w=240&la=fr-FR&hash=6BE248DAB995A27688AF4DE552111C959D769ED0",
  "https://www.starkey.fr/-/media/ConsumerSites/Images/Renderings/ItemSource/StylesBox/Starkey/product-utica-itc.png?h=400&w=240&la=fr-FR&hash=4C8EC1E477F4475857BD1F850E3C57C7AC61D4E3",
  "https://www.starkey.fr/-/media/ConsumerSites/Images/Renderings/ItemSource/StylesBox/Starkey/product-cic-nw-genesis.png?h=400&w=240&la=fr-FR&hash=24A83C4ACB4B9EF27DC77EDCF198CEC45152AD53",
  "https://www.starkey.fr/-/media/ConsumerSites/Images/Renderings/ItemSource/StylesBox/Starkey/product-iic-nw-genesis.png?h=400&w=240&la=fr-FR&hash=D58B8F4DE3CE2B6218173A274405E3EBC6C9FB88"
];

const detailImages = [
  modelImages[0],
  "https://www.starkey.fr/Sites/Starkey2015/branded-sites/shared/img/360s/receiver-in-canal/mric-r-led/White/0_10.png",
  modelImages[2],
  "https://www.starkey.fr/Sites/Starkey2015/branded-sites/shared/img/360s/utica/in-the-canal/Pink/0_10.png",
  "https://www.starkey.fr/Sites/Starkey2015/branded-sites/shared/img/360s/utica/completely-in-canal/Pink/0_10.png",
  modelImages[5]
];

const wearingImages = [
  "/imgs/bte.jpg",
  "/imgs/ric.jpg",
  "/imgs/ite.jpg",
  "/imgs/itc.jpg",
  "/imgs/cic.jpg",
  "/imgs/iic.jpg"
];
const colorSwatches = ["#ffffff", "#0072b1", "#222222", "#9aa0a6", "#d6d2ca", "#815332", "#b8a08c", "#d8d1c8"];

const translations = {
  fr: {
    home: "Accueil",
    devices: "Appareils",
    centers: "Trouver un centre",
    hearingTest: "Test auditif",
    appointment: "Prendre rendez-vous",
    heroEyebrow: "Solutions auditives CLAIRSON",
    heroTitle: "Des appareils auditifs adaptés à chaque oreille",
    heroText: "Découvrez les principaux modèles d'aides auditives, leurs avantages et les critères qui aident à choisir la solution la plus confortable.",
    explore: "Explorer les modèles",
    advice: "Conseil personnalisé",
    modelsTitle: "Modèles d'aides auditives",
    modelsText: "Nous vous proposons six familles d'appareils auditifs. Sélectionnez un modèle pour voir ses points forts.",
    selected: "Sélectionné",
    ricTitle: "Micro contour à écouteur déporté (RIC)",
    ricText: "Petit, discret et rapide à poser. Il convient souvent aux primo-utilisateurs et offre un son naturel avec une option rechargeable sur certains modèles.",
    itcText: "Aide auditive sur mesure qui se loge dans le conduit auditif. La partie la plus petite est visible dans l'oreille externe.",
    cicText: "Seul le minuscule fil d'extraction de l'aide auditive dépasse du conduit auditif.",
    benefits: "Les avantages de ce modèle",
    considerations: "À considérer selon votre perte auditive",
    benefitList: ["Plus petit et discret qu'un contour d'oreille", "Qualité sonore plus naturelle de la voix en position ouverte", "Étanche, fiable, avec davantage de fonctionnalités selon le modèle"],
    considerationList: ["Adaptation rapide, souvent possible le jour même", "Plus discret que le BTE", "Le haut-parleur demande un entretien régulier contre le cérumen et la transpiration"],
    itcBenefitList: ["Adaptée à votre oreille", "Moins visible que les modèles sur mesure plus grands", "Peut intégrer les commandes manuelles de volume et de programmes"],
    itcConsiderationList: ["Deuxième plus grand modèle sur mesure", "Les aides plus petites peuvent poser problème aux personnes ayant des soucis de dextérité", "Les petites piles nécessitent d'être changées plus régulièrement"],
    cicBenefitList: ["Réalisé sur-mesure", "Quasiment invisible", "Moins visible que les modèles sur mesure plus grands"],
    cicConsiderationList: ["Pour les pertes auditives légères et moyennes", "L'autonomie des appareils est de 3 à 5 jours", "Peut intégrer les commandes manuelles de volume et de programmes"],
    fitTitle: "Les aides auditives intra-conduits vous conviennent-elles ?",
    fitText: "Le choix de l'aide auditive qui convient dépend de nombreux facteurs, notamment l'anatomie de votre oreille, les besoins spécifiques du mode de vie, votre budget, l'attrait esthétique, les caractéristiques et fonctionnalités souhaitées et plus encore. Les aides auditives intra-auriculaires, par exemple, sont un choix à sérieusement considérer car elles sont faciles à manipuler.",
    productsTitle: "Voir nos intra-conduits (ITC)",
    productsText: "Découvrez des aides auditives adaptées aux formats intra-conduits.",
    ctaTitle: "Besoin d'un avis professionnel ?",
    ctaText: "Un audioprothésiste CLAIRSON peut vous aider à comparer les modèles et à choisir une solution vraiment adaptée.",
    footerText: "Votre partenaire de confiance pour une meilleure audition au quotidien.",
    models: [
      ["Contour (BTE)", "Puissant et fiable", "Placés derrière l'oreille, ces modèles sont robustes et conviennent à de nombreux profils auditifs."],
      ["microRIC (RIC)", "Discret et naturel", "Le haut-parleur est déporté dans le conduit auditif pour un rendu sonore clair et confortable."],
      ["ITE intra-conque", "Sur mesure", "Fabriqué pour épouser l'oreille, il reste simple à manipuler et agréable à porter."],
      ["Intra-conduit (ITC)", "Compact", "Plus petit qu'un intra-conque, il combine discrétion et accès pratique aux réglages."],
      ["Semi-profond (CIC)", "Très discret", "Logé plus profondément dans le conduit, il convient aux personnes qui veulent un appareil peu visible."],
      ["Intra-profond (IIC)", "Quasi invisible", "Positionné en profondeur pour une discrétion maximale selon la forme de l'oreille."]
    ],
    products: [
      ["Omega AI", "Entendez avec clarté, échangez avec confiance et avancez sans frein grâce à une technologie auditive avancée."],
      ["Genesis AI", "Des aides auditives performantes au son pur et clair pour ne pas manquer les moments importants."]
    ]
  },
  ar: {
    home: "الرئيسية",
    devices: "الأجهزة",
    centers: "ابحث عن مركز",
    hearingTest: "اختبار السمع",
    appointment: "احجز موعداً",
    heroEyebrow: "حلول كليرسون السمعية",
    heroTitle: "أجهزة سمعية تناسب كل أذن",
    heroText: "تعرّف على أهم نماذج أجهزة السمع، مزاياها، والمعايير التي تساعد على اختيار الحل الأكثر راحة لك.",
    explore: "استكشف النماذج",
    advice: "استشارة مخصصة",
    modelsTitle: "نماذج أجهزة السمع",
    modelsText: "نقترح ست عائلات من الأجهزة السمعية. اختر نموذجاً للاطلاع على نقاط قوته.",
    selected: "مختار",
    ricTitle: "جهاز صغير خلف الأذن بسماعة داخلية RIC",
    ricText: "صغير وغير بارز وسريع التركيب. يناسب غالباً المستخدمين الجدد ويوفر صوتاً طبيعياً مع خيار الشحن في بعض النماذج.",
    itcText: "جهاز سمعي مصمم على القياس يوضع داخل قناة الأذن، ولا يظهر منه إلا الجزء الصغير في الأذن الخارجية.",
    cicText: "لا يظهر من الجهاز إلا خيط صغير جداً يساعد على إخراجه من قناة الأذن.",
    benefits: "مزايا هذا النموذج",
    considerations: "نقاط يجب أخذها بعين الاعتبار",
    benefitList: ["أصغر وأكثر خفة من الجهاز الخلفي التقليدي", "جودة صوت طبيعية أكثر للكلام", "موثوق ومقاوم، مع وظائف إضافية حسب النموذج"],
    considerationList: ["تكيّف سريع وقد يكون ممكناً في اليوم نفسه", "أكثر خفاءً من BTE", "السماعة تحتاج تنظيفاً منتظماً من الشمع والرطوبة"],
    itcBenefitList: ["مصمم ليناسب أذنك", "أقل ظهوراً من النماذج الداخلية الأكبر", "يمكن أن يتضمن أزراراً يدوية للصوت والبرامج"],
    itcConsiderationList: ["ثاني أكبر نموذج من الأجهزة المصممة على القياس", "الأجهزة الأصغر قد تكون صعبة لمن لديهم ضعف في dexterity", "البطاريات الصغيرة تحتاج تغييراً أكثر انتظاماً"],
    cicBenefitList: ["مصمم على القياس", "شبه غير مرئي", "أقل ظهوراً من النماذج الداخلية الأكبر"],
    cicConsiderationList: ["مناسب غالباً لفقدان السمع الخفيف والمتوسط", "استقلالية الجهاز بين 3 و5 أيام", "يمكن أن يتضمن أزراراً يدوية للصوت والبرامج"],
    fitTitle: "هل تناسبك أجهزة السمع داخل القناة؟",
    fitText: "يعتمد اختيار الجهاز السمعي المناسب على عدة عوامل، منها شكل الأذن، نمط الحياة، الميزانية، درجة الخفاء المطلوبة والخصائص المرغوبة. الأجهزة داخل القناة خيار مهم لأنها سهلة الاستعمال.",
    productsTitle: "شاهد أجهزة intra-conduits (ITC)",
    productsText: "اكتشف أجهزة سمعية مناسبة لتصميم داخل القناة.",
    ctaTitle: "هل تحتاج رأي مختص؟",
    ctaText: "يمكن لأخصائي كليرسون مساعدتك في مقارنة النماذج واختيار حل مناسب فعلاً.",
    footerText: "شريكك الموثوق لسمع أفضل كل يوم.",
    models: [
      ["خلف الأذن BTE", "قوي وموثوق", "يوضع خلف الأذن، وهو متين ويناسب عدداً كبيراً من الحالات السمعية."],
      ["microRIC", "خفيف وصوت طبيعي", "توجد السماعة داخل قناة الأذن للحصول على صوت واضح ومريح."],
      ["داخل صيوان الأذن ITE", "مصمم على القياس", "يصمم حسب شكل الأذن، ويسهل التحكم فيه وارتداؤه."],
      ["داخل القناة ITC", "مدمج", "أصغر من ITE ويجمع بين الخفاء وسهولة الوصول إلى الإعدادات."],
      ["شبه عميق CIC", "غير ظاهر تقريباً", "يوضع بعمق أكبر داخل القناة ويناسب من يبحث عن جهاز قليل الظهور."],
      ["عميق جداً IIC", "شبه غير مرئي", "يوضع في عمق القناة للحصول على أقصى درجة من الخفاء حسب شكل الأذن."]
    ],
    products: [
      ["Omega AI", "وضوح أفضل في السمع وحوار بثقة بفضل تقنية سمعية متقدمة."],
      ["Genesis AI", "أجهزة قوية بصوت نقي وواضح حتى لا تفوت اللحظات المهمة."]
    ]
  },
  darija: {
    home: "الرئيسية",
    devices: "الأجهزة",
    centers: "لقا مركز",
    hearingTest: "تيست السمع",
    appointment: "خد موعد",
    heroEyebrow: "الحلول السمعية ديال كليرسون",
    heroTitle: "أجهزة سمع مناسبة لكل أذن",
    heroText: "تعرف على الموديلات الأساسية ديال أجهزة السمع، المزايا ديالها، وكيفاش تختار الحل اللي يريحك.",
    explore: "شوف الموديلات",
    advice: "نصيحة على القياس",
    modelsTitle: "موديلات أجهزة السمع",
    modelsText: "كنقترحو ستة أنواع ديال الأجهزة. اختار واحد باش تشوف المزايا ديالو.",
    selected: "مختار",
    ricTitle: "جهاز صغير مور الأذن بسماعة داخلية RIC",
    ricText: "صغير، خفيف وسريع فالتركيب. كيناسب بزاف الناس اللي غادي يستعملو الجهاز أول مرة، وكاين منه اللي كيتشارجا.",
    itcText: "جهاز سمع مفصل على القياس كيدخل فقناة الأذن، وكيبقى غير جزء صغير باين فالأذن الخارجية.",
    cicText: "ما كيبان من الجهاز غير خيط صغير بزاف باش يتخرج من قناة الأذن.",
    benefits: "المزايا ديال هاد الموديل",
    considerations: "حوايج خاص تاخدها بعين الاعتبار",
    benefitList: ["صغير وما كيبانش بزاف مقارنة مع BTE", "صوت طبيعي أكثر فالهضرة", "موثوق وفيه خصائص كثيرة حسب الموديل"],
    considerationList: ["التأقلم كيكون سريع وغالباً ممكن من نهار الفحص", "مخبي أكثر من BTE", "السماعة خاصها تنظيف منتظم من الشمع والرطوبة"],
    itcBenefitList: ["مناسب للأذن ديالك", "أقل ظهور من الموديلات الداخلية الكبار", "يمكن يكون فيه تحكم يدوي فالصوت والبرامج"],
    itcConsiderationList: ["ثاني أكبر موديل مفصل على القياس", "الأجهزة الصغار بزاف يقدرو يصعبو على اللي عندو مشكل فاستعمال اليدين", "البطاريات الصغار خاصهم يتبدلو بانتظام أكثر"],
    cicBenefitList: ["كيصاوب على القياس", "تقريباً ما كيبانش", "أقل ظهور من الموديلات الداخلية الكبار"],
    cicConsiderationList: ["مناسب غالباً لضعف السمع الخفيف والمتوسط", "البطارية كتدوم تقريباً من 3 حتى 5 أيام", "يمكن يكون فيه تحكم يدوي فالصوت والبرامج"],
    fitTitle: "واش أجهزة داخل القناة مناسبة ليك؟",
    fitText: "اختيار الجهاز المناسب كيتعلق بشكل الأذن، طريقة العيش، الميزانية، واش بغيتيه مخبي، والخصائص اللي محتاج. أجهزة داخل القناة خيار مهم حيث ساهلة فالاستعمال.",
    productsTitle: "شوف أجهزة intra-conduits (ITC)",
    productsText: "اكتاشف أجهزة سمع مناسبة للتصميم داخل القناة.",
    ctaTitle: "محتاج رأي مختص؟",
    ctaText: "مختص كليرسون يقدر يعاونك تقارن بين الموديلات وتختار الحل المناسب ليك.",
    footerText: "الشريك ديالك لسمع أحسن كل نهار.",
    models: [
      ["مور الأذن BTE", "قوي وموثوق", "كيتحط مور الأذن، قوي وكيناسب حالات كثيرة ديال السمع."],
      ["microRIC", "خفيف وصوت طبيعي", "السماعة كتكون داخل قناة الأذن باش يعطي صوت واضح ومريح."],
      ["داخل الأذن ITE", "على القياس", "كيصاوب حسب شكل الأذن، وساهل فالاستعمال واللبس."],
      ["داخل القناة ITC", "صغير", "أصغر من ITE وكيجمع بين الخفاء وسهولة التحكم."],
      ["شبه عميق CIC", "ما كيبانش بزاف", "كيتحط داخل القناة بعمق أكثر للناس اللي بغاوه قليل الظهور."],
      ["عميق IIC", "تقريباً ما كيبانش", "كيتحط فعمق القناة باش يعطي خفاء كبير حسب شكل الأذن."]
    ],
    products: [
      ["Omega AI", "سمع أوضح وهضرة بثقة بفضل تقنية سمعية متقدمة."],
      ["Genesis AI", "أجهزة قوية بصوت نقي وواضح باش ما يفوتك حتى لحظة مهمة."]
    ]
  }
};

function Icon({ children, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>;
}

function fullImage(path) {
  return withBasePath(path);
}

function DevicesPage() {
  const [language, setLanguageState] = useState("fr");
  const [activeModel, setActiveModel] = useState(3);
  const isRtl = language !== "fr";
  const copy = translations[language];
  const models = useMemo(
    () =>
      copy.models.map(([name, tag, description], index) => ({
        name,
        tag,
        description,
        image: fullImage(modelImages[index])
      })),
    [copy.models]
  );

  const selectedModel = models[activeModel] || models[1];
  const selectedBenefits = activeModel === 1
    ? copy.benefitList
    : activeModel === 3
      ? copy.itcBenefitList
    : activeModel === 4
      ? copy.cicBenefitList
    : [selectedModel.tag, selectedModel.description, copy.benefitList[2]];
  const selectedConsiderations = activeModel === 1
    ? copy.considerationList
    : activeModel === 3
      ? copy.itcConsiderationList
    : activeModel === 4
      ? copy.cicConsiderationList
    : [copy.fitText, copy.modelsText, copy.ctaText];
  const selectedDescription = activeModel === 3 ? copy.itcText : activeModel === 4 ? copy.cicText : selectedModel.description;
  const selectedImage = fullImage(detailImages[activeModel] || modelImages[activeModel]);
  const selectedWearingImage = fullImage(wearingImages[activeModel] || modelImages[activeModel]);

  useEffect(() => {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    if (urlLanguage && translations[urlLanguage]) {
      setLanguageState(urlLanguage);
    }
  }, []);

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState(null, "", url.toString());
  };

  const centersHref = withBasePath(`/nous-trouver?lang=${language}`);
  const testHref = withBasePath(`/test-auditif?lang=${language}`);

  return (
    <main className={`min-h-screen bg-surface text-on-surface ${isRtl ? "font-arabic" : ""}`} dir={isRtl ? "rtl" : "ltr"} lang={language === "fr" ? "fr" : "ar"}>
      <SiteHeader activePath="/appareils" language={language} setLanguage={setLanguage} />

      <section className="border-b border-outline-variant bg-surface-container-lowest pt-[120px]">
        <div className="mx-auto max-w-[1120px] px-gutter pt-6">
          <div className="flex gap-4 overflow-x-auto pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-6 md:overflow-visible">
            {models.map((model, index) => (
              <button
                className={`group min-w-[118px] border-b-4 px-2 pb-3 pt-2 text-center transition-colors ${activeModel === index ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:border-outline-variant hover:text-primary"}`}
                key={model.name}
                onClick={() => setActiveModel(index)}
                type="button"
              >
                <img className="mx-auto h-20 w-full object-contain transition-transform group-hover:scale-105 sm:h-24" src={model.image} alt={model.name} />
                <span className="mt-1 block text-[11px] font-extrabold leading-tight">{model.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-10 px-gutter py-10 sm:py-14 lg:grid-cols-[1fr_0.95fr] lg:items-center" id="modeles">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className={isRtl ? "text-right" : "text-left"}>
          <span className="mb-3 inline-flex rounded-full bg-surface px-4 py-2 text-xs font-extrabold text-secondary ring-1 ring-outline-variant">{selectedModel.tag}</span>
          <h1 className="max-w-xl text-[26px] font-semibold leading-tight text-primary md:text-[34px]">{selectedModel.name}</h1>
          <p className="mt-3 max-w-md text-sm font-semibold leading-7 text-night">{selectedDescription}</p>
          <div className="mt-6 grid gap-6 text-sm leading-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-extrabold text-primary">{copy.benefits}</h3>
              <ul className="grid gap-2 text-on-surface-variant">
                {selectedBenefits.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-extrabold text-primary">{copy.considerations}</h3>
              <ul className="grid gap-2 text-on-surface-variant">
                {selectedConsiderations.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center">
          <img className="h-[300px] w-full object-contain sm:h-[360px]" src={selectedImage} alt={selectedModel.name} />
          <p className="mt-2 text-xs font-extrabold text-night">{language === "fr" ? "Faire pivoter de 360°" : "عرض 360 درجة"}</p>
          <div className="mt-4 flex items-center gap-2 border-t border-outline-variant px-4 pt-3">
            {colorSwatches.map((color, index) => (
              <span
                className={`h-5 w-5 rounded-full border ${index === 1 ? "border-primary ring-2 ring-primary/30" : "border-outline"}`}
                key={color}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-t border-outline-variant bg-surface-container-lowest">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-gutter py-10 sm:py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="overflow-hidden">
            <img className="mx-auto h-[420px] w-full object-contain object-bottom sm:h-[520px]" src={selectedWearingImage} alt={`${copy.fitTitle} - ${selectedModel.name}`} />
            <div className="mx-auto mt-2 h-1 max-w-sm rounded-full bg-outline-variant">
              <div className="h-1 w-2/3 rounded-full bg-primary" />
            </div>
          </div>
          <div className={isRtl ? "text-right" : "text-left"}>
            <h2 className="text-[26px] font-semibold leading-tight text-primary md:text-[34px]">{copy.fitTitle}</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-on-surface-variant">{copy.fitText}</p>
            <p className="mt-5 text-xs text-on-surface-variant">{language === "fr" ? `${selectedModel.name} en situation d'usage.` : `صورة توضيحية لجهاز ${selectedModel.name}.`}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 font-extrabold text-on-primary transition-colors hover:bg-secondary" href={centersHref}>
                {copy.appointment}
              </a>
              <a className="inline-flex h-12 items-center justify-center rounded-full border border-primary px-6 font-extrabold text-primary transition-colors hover:bg-primary hover:text-on-primary" href={testHref}>
                {copy.hearingTest}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-night px-gutter py-12 text-on-primary sm:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-3xl text-[30px] font-extrabold leading-tight md:text-[42px]">{copy.ctaTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-on-primary/80">{copy.ctaText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 font-extrabold text-on-primary transition-colors hover:bg-secondary" href={centersHref}>
              {copy.appointment}
            </a>
            <a className="inline-flex h-12 items-center justify-center rounded-full border border-on-primary/40 px-6 font-extrabold text-on-primary transition-colors hover:bg-on-primary hover:text-night" href={centersHref}>
              {copy.centers}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter language={language} />
    </main>
  );
}

function InfoList({ title, items, color }) {
  const colorClasses = color === "success" ? "bg-success text-on-primary" : "bg-accent text-on-primary";

  return (
    <div className="rounded-[20px] border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClasses}`}>
          <Icon className="text-[22px]">{color === "success" ? "check" : "info"}</Icon>
        </span>
        <h3 className="text-lg font-extrabold text-night">{title}</h3>
      </div>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li className="flex gap-2 leading-7 text-on-surface-variant" key={item}>
            <Icon className={`mt-0.5 text-[20px] ${color === "success" ? "text-success" : "text-accent"}`}>done</Icon>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DevicesPage;

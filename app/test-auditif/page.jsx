"use client";

import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import { withBasePath } from "../../components/site-paths";
import { useEffect, useMemo, useState } from "react";

const frequencies = [500, 1000, 2000, 4000];
const volumeLevels = [30, 20, 10, 5];
const ears = [
  { key: "right", label: "الأذن اليمنى", pan: 1 },
  { key: "left", label: "الأذن اليسرى", pan: -1 }
];

const totalSteps = frequencies.length * ears.length * volumeLevels.length;
const phaseOrder = ["intro", "prep", "form", "test", "results"];

const navCopy = {
  fr: {
    home: "Accueil",
    appointment: "Prendre rendez-vous",
    centers: "Trouver un centre",
    title: "Test auditif en ligne",
    back: "Retour",
    phaseLabels: {
      intro: "Début",
      prep: "Préparation",
      form: "Coordonnées",
      test: "Test",
      results: "Résultats"
    }
  },
  ar: {
    home: "الرئيسية",
    appointment: "احجز موعداً",
    centers: "ابحث عن مركز",
    title: "فحص السمع الإلكتروني",
    back: "رجوع",
    phaseLabels: {
      intro: "البداية",
      prep: "التحضير",
      form: "البيانات",
      test: "الاختبار",
      results: "النتائج"
    }
  },
  darija: {
    home: "الرئيسية",
    appointment: "خد موعد",
    centers: "لقا مركز",
    title: "تيست السمع أونلاين",
    back: "رجوع",
    phaseLabels: {
      intro: "البداية",
      prep: "التحضير",
      form: "المعلومات",
      test: "التيست",
      results: "النتيجة"
    }
  }
};

function Icon({ children, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>;
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-primary text-on-primary hover:bg-secondary",
    secondary: "border border-primary text-primary bg-transparent hover:bg-primary hover:text-on-primary",
    success: "bg-success text-white hover:bg-success/90",
    danger: "bg-error text-white hover:bg-error/90"
  }[variant];

  return (
    <button className={`${styles} h-12 rounded-full px-6 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[20px] border border-outline-variant bg-surface-container-lowest p-6 shadow-soft ${className}`}>{children}</div>;
}

function FlowHeader({ copy, phase, progress, onBack }) {
  return (
    <header className="sticky top-20 z-40 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur">
      <div className="mx-auto max-w-[1440px] px-gutter py-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-secondary">{copy.title}</p>
            <h1 className="text-xl font-extrabold text-night">{copy.phaseLabels[phase]}</h1>
          </div>
          <div className="flex gap-2">
            {phase !== "prep" && phase !== "intro" && phase !== "results" && (
              <Button variant="secondary" onClick={onBack}>{copy.back}</Button>
            )}
            <a className="flex h-12 items-center rounded-full border border-outline-variant px-5 font-bold text-primary" href={withBasePath("/")}>{copy.home}</a>
          </div>
        </div>
        <div className="mb-3 h-2 overflow-hidden rounded-full bg-outline-variant">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 text-sm font-extrabold text-on-surface-variant [scrollbar-width:none] sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0 sm:text-center [&::-webkit-scrollbar]:hidden">
          {phaseOrder.map((item) => (
            <span
              className={`min-w-fit rounded-full border px-3 py-2 leading-none sm:min-w-0 ${
                phaseOrder.indexOf(item) <= phaseOrder.indexOf(phase)
                  ? "border-primary bg-primary text-on-primary"
                  : "border-outline-variant bg-surface text-on-surface-variant"
              }`}
              key={item}
            >
              {copy.phaseLabels[item]}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

function scoreLabel(score, language) {
  if (language === "fr") {
    if (score >= 85) return "Indice excellent";
    if (score >= 65) return "Indice léger";
    if (score >= 40) return "Indice moyen";
    return "Suivi conseillé rapidement";
  }

  if (language === "darija") {
    if (score >= 85) return "مؤشر مزيان بزاف";
    if (score >= 65) return "مؤشر خفيف";
    if (score >= 40) return "مؤشر متوسط";
    return "خاص متابعة بسرعة";
  }

  if (score >= 85) return "مؤشر ممتاز";
  if (score >= 65) return "مؤشر خفيف";
  if (score >= 40) return "مؤشر متوسط";
  return "مؤشر يحتاج متابعة عاجلة";
}

function scoreText(score, language) {
  if (language === "fr") {
    if (score >= 85) return "Vos réponses indiquent un bon confort auditif dans ce test initial.";
    if (score >= 65) return "Une légère difficulté peut apparaître sur certaines fréquences. Un bilan professionnel peut vous rassurer.";
    if (score >= 40) return "Certains signaux méritent un contrôle spécialisé auprès d'un audioprothésiste.";
    return "Nous vous conseillons de réserver un vrai bilan auditif dès que possible.";
  }

  if (language === "darija") {
    if (score >= 85) return "الجوابات ديالك كيبانو مزيانين فهاد التيست الأولي.";
    if (score >= 65) return "يمكن كاين نقص خفيف فشي ترددات. فحص عند المختص يقدر يطمنك.";
    if (score >= 40) return "كاينين مؤشرات خاصها فحص عند أخصائي السمع.";
    return "كننصحوك تاخذ موعد لفحص سمع حقيقي فالقريب.";
  }

  if (score >= 85) return "إجاباتك تشير إلى راحة سمعية جيدة في هذا الاختبار الأولي.";
  if (score >= 65) return "قد تكون هناك صعوبة خفيفة في بعض الترددات. فحص مهني قد يساعدك على الاطمئنان.";
  if (score >= 40) return "هناك مؤشرات تستحق فحصاً متخصصاً لدى أخصائي سمعيات.";
  return "ننصحك بحجز موعد لفحص سمع حقيقي في أقرب وقت.";
}

function volumeToGain(volume, calibration = 1) {
  const baseGain = {
    30: 0.28,
    20: 0.12,
    10: 0.035,
    5: 0.018
  }[volume] || 0.12;

  return Math.min(0.4, Math.max(0.005, baseGain * calibration));
}

function buildThresholds(answers) {
  const thresholds = {};

  ears.forEach((ear) => {
    thresholds[ear.key] = {};
    frequencies.forEach((frequency) => {
      const results = answers.filter((answer) => answer.ear === ear.key && answer.frequency === frequency);
      const heardLevels = results.filter((answer) => answer.heard).map((answer) => answer.volume);
      thresholds[ear.key][frequency] = {
        threshold: heardLevels.length ? Math.min(...heardLevels) : null,
        results: volumeLevels.map((volume) => ({
          vol: volume,
          heard: results.find((answer) => answer.volume === volume)?.heard ?? null
        }))
      };
    });
  });

  return thresholds;
}

function thresholdScore(threshold) {
  if (threshold === 5) return 100;
  if (threshold === 10) return 90;
  if (threshold === 20) return 70;
  if (threshold === 30) return 50;
  return 20;
}

function playTone(frequency, panValue, volume = 20, calibration = 1) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const panner = audioContext.createStereoPanner ? audioContext.createStereoPanner() : null;

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  const targetGain = volumeToGain(volume, calibration);

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(targetGain, audioContext.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.45);

  if (panner) {
    panner.pan.value = panValue;
    oscillator.connect(gain).connect(panner).connect(audioContext.destination);
  } else {
    oscillator.connect(gain).connect(audioContext.destination);
  }

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.5);
  oscillator.onended = () => audioContext.close();
}

export default function HearingTestPage() {
  const [language, setLanguageState] = useState("ar");
  const [phase, setPhase] = useState("intro");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", privacy: false, marketing: false });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [calibration, setCalibration] = useState(0.5);
  const [emailSent, setEmailSent] = useState(false);
  const [hasPlayedTone, setHasPlayedTone] = useState(false);
  const [isPlayingTone, setIsPlayingTone] = useState(false);
  const [headphonesChecked, setHeadphonesChecked] = useState(false);
  const isRtl = language !== "fr";
  const copy = navCopy[language];
  const text = (ar, fr, darija = ar) => {
    if (language === "fr") return fr;
    if (language === "darija") return darija;
    return ar;
  };
  const earLabel = (ear) => {
    if (language === "fr") return ear.key === "right" ? "Oreille droite" : "Oreille gauche";
    if (language === "darija") return ear.key === "right" ? "الودن اليمنى" : "الودن اليسرى";
    return ear.label;
  };

  const currentEar = ears[Math.floor(step / (frequencies.length * volumeLevels.length))] || ears[0];
  const currentFrequency = frequencies[Math.floor((step % (frequencies.length * volumeLevels.length)) / volumeLevels.length)] || frequencies[0];
  const currentVolume = volumeLevels[step % volumeLevels.length] || volumeLevels[0];
  const currentVolumeIndex = step % volumeLevels.length;
  const currentFrequencyStep = Math.floor((step % (frequencies.length * volumeLevels.length)) / volumeLevels.length) + 1;
  const currentEarStep = Math.floor(step / (frequencies.length * volumeLevels.length)) + 1;
  const currentGainPercent = Math.round(volumeToGain(currentVolume, calibration) * 100);
  const progress = phase === "test" ? Math.round((step / totalSteps) * 100) : phase === "results" ? 100 : phase === "form" ? 35 : phase === "prep" ? 18 : 5;
  const canStart = form.firstName && form.lastName && form.email && form.phone && form.privacy;
  const centersHref = withBasePath(`/nous-trouver?lang=${language}`);

  const thresholds = useMemo(() => buildThresholds(answers), [answers]);
  const scores = useMemo(() => {
    return Object.fromEntries(
      ears.map((ear) => {
        const total = frequencies.reduce((sum, frequency) => sum + thresholdScore(thresholds[ear.key]?.[frequency]?.threshold), 0);
        return [ear.key, Math.round(total / frequencies.length)];
      })
    );
  }, [thresholds]);

  useEffect(() => {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    if (urlLanguage && navCopy[urlLanguage]) {
      setLanguageState(urlLanguage);
    }

    const saved = window.localStorage.getItem("clairson-hearing-test");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPhase(parsed.phase || "intro");
        setForm(parsed.form || form);
        setStep(parsed.step || 0);
        setAnswers(parsed.answers || []);
        setCalibration(parsed.calibration || 0.5);
        setHeadphonesChecked(parsed.headphonesChecked || false);
      } catch {
        window.localStorage.removeItem("clairson-hearing-test");
      }
    }
  }, []);

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState(null, "", url.toString());
  };

  useEffect(() => {
    window.localStorage.setItem("clairson-hearing-test", JSON.stringify({ phase, form, step, answers, calibration, headphonesChecked }));
  }, [phase, form, step, answers, calibration, headphonesChecked]);

  useEffect(() => {
    setHasPlayedTone(false);
    setIsPlayingTone(false);
  }, [step, phase]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  const track = (eventName) => {
    const events = JSON.parse(window.localStorage.getItem("clairson-test-analytics") || "[]");
    events.push({ eventName, step, at: new Date().toISOString() });
    window.localStorage.setItem("clairson-test-analytics", JSON.stringify(events.slice(-50)));
  };

  const recordAnswer = (heard) => {
    if (!hasPlayedTone) return;

    const nextAnswers = [...answers, { ear: currentEar.key, frequency: currentFrequency, volume: currentVolume, heard }];
    setAnswers(nextAnswers);
    track(heard ? "tone_heard" : "tone_not_heard");

    if (step + 1 >= totalSteps) {
      setPhase("results");
      track("test_completed");
    } else {
      setStep(step + 1);
    }
  };

  const playCurrentTone = () => {
    setIsPlayingTone(true);
    setHasPlayedTone(false);
    playTone(currentFrequency, currentEar.pan, currentVolume, calibration);
    window.setTimeout(() => {
      setIsPlayingTone(false);
      setHasPlayedTone(true);
    }, 1550);
  };

  const goBack = () => {
    if (phase === "form") setPhase("prep");
    if (phase === "test") setPhase("form");
  };

  const resetTest = () => {
    setPhase("intro");
    setStep(0);
    setAnswers([]);
    setEmailSent(false);
    setHeadphonesChecked(false);
    window.localStorage.removeItem("clairson-hearing-test");
  };

  return (
    <main className={isRtl ? "font-arabic bg-surface text-on-surface" : "bg-surface text-on-surface"} dir={isRtl ? "rtl" : "ltr"} lang={language === "fr" ? "fr" : "ar"}>
      <SiteHeader activePath="/test-auditif" language={language} setLanguage={setLanguage} />
      <div className="pt-[120px]">
      {phase !== "intro" && <FlowHeader copy={copy} phase={phase} progress={progress} onBack={goBack} />}

      {phase === "intro" && <section className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="mx-auto flex min-h-[460px] w-full max-w-[1440px] flex-col justify-center gap-8 px-gutter py-16 lg:grid lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-surface px-4 py-2 text-label-caps font-bold text-secondary">{copy.title}</span>
            <h1 className="mb-5 max-w-2xl text-[34px] font-extrabold leading-tight text-night md:text-[48px]">{text("اكتشف مؤشر سمعك في 3 دقائق فقط", "Découvrez votre indice auditif en 3 minutes", "اكتاشف مؤشر السمع ديالك فـ 3 دقايق")}</h1>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-on-surface-variant">
              {text("اختبار أولي يساعدك على ملاحظة مؤشرات الراحة السمعية لديك، ثم يرشدك للخطوة المناسبة لحجز فحص حقيقي عند المختص.", "Un test initial pour mieux comprendre votre confort auditif et vous orienter vers un vrai bilan chez un spécialiste.", "تيست أولي كيساعدك تفهم الراحة ديال السمع ديالك ويوجهك للخطوة المناسبة عند المختص.")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => { setPhase("prep"); track("start_clicked"); }}>{text("ابدأ الاختبار الآن", "Commencer le test", "بدا التيست دابا")}</Button>
              <Button variant="secondary" onClick={() => setShowDisclaimer((value) => !value)}>{text("اقرأ المزيد", "Lire plus", "قرا أكثر")}</Button>
            </div>
            <div className="mt-5 rounded-[16px] border border-outline-variant bg-surface p-4 text-sm leading-7 text-on-surface-variant">
              {text("هذا الاختبار غير تشخيصي ولا يغني أبداً عن فحص طبي متخصص.", "Ce test n'est pas diagnostique et ne remplace jamais un examen médical spécialisé.", "هاد التيست ماشي تشخيص طبي وما كيعوضش الفحص عند المختص.")}
              {showDisclaimer && (
                <p className="mt-2">
                  {text("النتائج المعروضة هي مؤشر أولي فقط، ولا يمكن اعتمادها كتشخيص رسمي لفقدان السمع أو أي حالة طبية. في حال وجود ألم، طنين، دوخة، أو ضعف مفاجئ في السمع، يجب استشارة طبيب أنف وأذن وحنجرة.", "Les résultats sont uniquement indicatifs. En cas de douleur, acouphènes, vertige ou baisse soudaine de l'audition, consultez un ORL.", "النتيجة غير مؤشر أولي. إلا كان ألم، صفير، دوخة، أو نقص مفاجئ فالسمع، خاص تشوف طبيب الأنف والأذن.")}
                </p>
              )}
            </div>
          </div>
          <Card className="bg-gradient-to-br from-surface-container-lowest to-surface">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-secondary">{text("قبل أن تبدأ", "Avant de commencer", "قبل ما تبدا")}</p>
                <h2 className="text-2xl font-extrabold text-night">{text("تجربة أفضل في 3 خطوات", "Une meilleure expérience en 3 étapes", "تجربة أحسن فـ 3 خطوات")}</h2>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary">
                <Icon className="text-[34px]">headphones</Icon>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                ["headphones", text("استعمل سماعات رأس", "Utilisez un casque", "استعمل الكاسك")],
                ["volume_up", text("اضبط الصوت على مستوى مريح", "Réglez le volume confortablement", "ضبط الصوت مزيان")],
                ["quiet_time", text("اختر مكاناً هادئاً", "Choisissez un endroit calme", "اختار بلاصة هادئة")]
              ].map(([icon, text]) => (
                <div className="flex items-center gap-3 rounded-[14px] bg-surface p-3 font-bold text-on-surface-variant" key={text}>
                  <Icon className="text-primary">{icon}</Icon>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-[14px] bg-error-container p-3 text-sm font-bold leading-7 text-on-error-container">
              {text("تذكير: النتيجة مؤشر أولي فقط وليست تشخيصاً طبياً.", "Rappel : le résultat est indicatif et non médical.", "تذكير: النتيجة غير مؤشر أولي وماشي تشخيص طبي.")}
            </p>
          </Card>
        </div>
      </section>}

      {phase !== "intro" && <section className="mx-auto max-w-[1440px] px-gutter py-10 sm:py-14">
        {phase === "prep" && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <h2 className="mb-2 text-3xl font-extrabold text-night">{text("قبل أن نبدأ", "Avant de commencer", "قبل ما نبداو")}</h2>
              <p className="max-w-3xl leading-8 text-on-surface-variant">{text("جهّز سماعات الرأس، اختر مكاناً هادئاً، واضبط الصوت إلى مستوى مريح. كلما كانت البيئة أهدأ كانت التجربة أوضح.", "Préparez un casque, choisissez un endroit calme et réglez le volume à un niveau confortable.", "وجد الكاسك، اختار بلاصة هادئة، وضبط الصوت باش يكون مريح.")}</p>
            </div>
            {[
              ["volume_up", text("اضبط مستوى الصوت", "Réglez le volume", "ضبط الصوت"), text("شغّل مقطعاً مرجعياً قصيراً واضبط مستوى الصوت إلى درجة مريحة قبل الاختبار.", "Lancez un son de référence et ajustez le volume avant le test.", "شغل صوت تجريبي وضبط الفوليوم قبل التيست.")],
              ["badge", text("أدخل بياناتك", "Renseignez vos coordonnées", "دخل المعلومات ديالك"), text("املأ نموذجاً قصيراً حتى نستطيع إرسال النتائج والتواصل معك عند الحاجة.", "Remplissez un court formulaire pour recevoir vos résultats.", "عمر فورم صغير باش توصلك النتيجة.")],
              ["hearing", text("ابدأ الاختبار", "Commencez le test", "بدا التيست"), text("تقييم السمع عند 4 ترددات و4 مستويات صوت لكل أذن.", "Évaluation sur 4 fréquences et 4 niveaux pour chaque oreille.", "تقييم فـ 4 ترددات و4 مستويات لكل ودن.")]
            ].map(([icon, title, text]) => (
              <Card key={title}>
                <Icon className="mb-5 text-[42px] text-primary">{icon}</Icon>
                <h2 className="mb-3 text-xl font-extrabold text-night">{title}</h2>
                <p className="leading-7 text-on-surface-variant">{text}</p>
              </Card>
            ))}
            <Card className="lg:col-span-3">
              <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
                <div>
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-on-primary">1</div>
                  <h2 className="mb-2 text-xl font-extrabold text-night">{text("اضبط مستوى الصوت", "Réglez le volume", "ضبط الفوليوم")}</h2>
                  <p className="text-on-surface-variant">{text("ابدأ من 50%. إذا كان الصوت مزعجاً، اخفضه. إذا كان ضعيفاً جداً، ارفعه قليلاً.", "Commencez à 50 %. Si le son est trop fort, baissez-le. S'il est trop faible, augmentez légèrement.", "بدا من 50%. إلا كان الصوت قوي نقصو، وإلا كان ضعيف زيد شوية.")}</p>
                </div>
                <div className="rounded-[18px] bg-surface p-4">
                  <label className="mb-4 grid gap-2 text-sm font-bold text-on-surface-variant">
                    <span className="flex items-center justify-between"><span>{text("شدة الصوت", "Intensité", "قوة الصوت")}</span><span className="text-primary">{Math.round(calibration * 100)}%</span></span>
                    <input className="w-full accent-primary" max="1" min="0.3" onChange={(event) => setCalibration(Number(event.target.value))} step="0.1" type="range" value={calibration} />
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="flex-1" variant="secondary" onClick={() => playTone(750, 0, 20, calibration)}>{text("تشغيل الصوت المرجعي", "Jouer le son de référence", "شغل الصوت التجريبي")}</Button>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="lg:col-span-3">
              <div className="grid gap-6 lg:grid-cols-[1fr_460px] lg:items-center">
                <div>
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-on-primary">2</div>
                  <h2 className="mb-2 text-xl font-extrabold text-night">{text("اختبار اتجاه السماعات", "Vérifier le sens du casque", "جرب اليمين واليسار")}</h2>
                  <p className="leading-7 text-on-surface-variant">
                    {text("شغّل نغمة اليمين ثم اليسار. إذا سمعت كل نغمة في الأذن الصحيحة، فعّل التأكيد للمتابعة. هذه الخطوة تقلل أخطاء النتيجة.", "Jouez le son à droite puis à gauche. Confirmez si chaque son arrive dans la bonne oreille.", "شغل نغمة اليمين ومن بعد اليسار. إلا كل وحدة تسمعات فبلاصتها، أكد باش تكمل.")}
                  </p>
                </div>
                <div className="rounded-[18px] bg-surface p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button variant="secondary" onClick={() => playTone(1000, 1, 20, calibration)}>
                      <span className="inline-flex items-center gap-2"><Icon>east</Icon> {text("نغمة اليمين", "Son à droite", "نغمة اليمين")}</span>
                    </Button>
                    <Button variant="secondary" onClick={() => playTone(1000, -1, 20, calibration)}>
                      <span className="inline-flex items-center gap-2"><Icon>west</Icon> {text("نغمة اليسار", "Son à gauche", "نغمة اليسار")}</span>
                    </Button>
                  </div>
                  <label className="mt-4 flex items-start gap-3 rounded-[14px] bg-surface-container-lowest p-4 text-sm font-bold leading-7 text-on-surface-variant">
                    <input checked={headphonesChecked} className="mt-1 h-5 w-5 text-primary" onChange={(event) => setHeadphonesChecked(event.target.checked)} type="checkbox" />
                    <span>{text("تأكدت أن نغمة اليمين تُسمع في الأذن اليمنى، ونغمة اليسار تُسمع في الأذن اليسرى.", "Je confirme que le son droit est entendu à droite et le son gauche à gauche.", "تأكدت بلي اليمين فاليمين واليسار فاليسار.")}</span>
                  </label>
                  {!headphonesChecked && <p className="mt-3 text-sm font-bold text-secondary">{text("يجب تأكيد اتجاه السماعات قبل المتابعة.", "Confirmez le sens du casque avant de continuer.", "أكد اتجاه الكاسك قبل ما تكمل.")}</p>}
                </div>
              </div>
            </Card>
            <Card className="lg:col-span-3">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-on-primary">3</div>
                  <h2 className="mb-1 text-xl font-extrabold text-night">{text("جاهز للبدء", "Prêt à commencer", "واجد تبدا")}</h2>
                  <p className="text-on-surface-variant">{text("بعد ضبط الصوت والتأكد من اتجاه السماعات، انتقل لإدخال البيانات ثم يبدأ الاختبار.", "Après le réglage audio, passez aux coordonnées puis au test.", "من بعد ضبط الصوت، دخل المعلومات ومن بعد بدا التيست.")}</p>
                </div>
                <Button className="w-full md:w-auto" disabled={!headphonesChecked} onClick={() => { setPhase("form"); track("prep_completed"); }}>{text("متابعة إلى البيانات", "Continuer", "كمل للمعلومات")}</Button>
              </div>
            </Card>
          </div>
        )}

        {phase === "form" && (
          <Card className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-extrabold text-night">{text("أدخل بياناتك قبل الاختبار", "Renseignez vos coordonnées avant le test", "دخل المعلومات ديالك قبل التيست")}</h2>
            <p className="mb-6 text-on-surface-variant">{text("نحتاج موافقتك الصريحة قبل جمع أي بيانات شخصية. يمكنك رفض التواصل التسويقي.", "Nous avons besoin de votre consentement avant de collecter vos données. La communication marketing reste optionnelle.", "خاصنا الموافقة ديالك قبل نجمعو أي معلومات شخصية. التسويق اختياري.")}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-[12px] border-outline-variant" placeholder={text("الاسم الأول *", "Prénom *", "السمية *")} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              <input className="rounded-[12px] border-outline-variant" placeholder={text("اسم العائلة *", "Nom *", "النسب *")} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              <input className="rounded-[12px] border-outline-variant" placeholder={text("البريد الإلكتروني *", "E-mail *", "الإيميل *")} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="rounded-[12px] border-outline-variant" placeholder={text("رقم الهاتف *", "Téléphone *", "النمرة *")} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <label className="mt-5 flex gap-3 rounded-[14px] bg-surface p-4 text-sm leading-7">
              <input checked={form.privacy} className="mt-1 h-5 w-5 text-primary" onChange={(e) => setForm({ ...form, privacy: e.target.checked })} type="checkbox" />
              <span>{text("أوافق على سياسة الخصوصية ومعالجة بياناتي لغرض إرسال النتيجة والتواصل بخصوص فحص السمع. *", "J'accepte la politique de confidentialité et le traitement de mes données pour recevoir le résultat et être recontacté au sujet du bilan auditif. *", "موافق على سياسة الخصوصية ومعالجة المعلومات ديالي باش توصلني النتيجة ويتواصلو معايا بخصوص فحص السمع. *")}</span>
            </label>
            <label className="mt-3 flex gap-3 rounded-[14px] bg-surface p-4 text-sm leading-7">
              <input checked={form.marketing} className="mt-1 h-5 w-5 text-primary" onChange={(e) => setForm({ ...form, marketing: e.target.checked })} type="checkbox" />
              <span>{text("أوافق اختيارياً على تلقي عروض ونصائح صحية من CLAIRSON.", "J'accepte optionnellement de recevoir des offres et conseils santé de CLAIRSON.", "موافق اختيارياً توصلني عروض ونصائح صحية من CLAIRSON.")}</span>
            </label>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button variant="secondary" onClick={() => setPhase("prep")}>{text("رجوع للتحضير", "Retour à la préparation", "رجوع للتحضير")}</Button>
              <Button className={!canStart ? "opacity-50" : ""} disabled={!canStart} onClick={() => { setPhase("test"); track("form_completed"); }}>{text("ابدأ الاختبار", "Commencer le test", "بدا التيست")}</Button>
            </div>
          </Card>
        )}

        {phase === "test" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <Card>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-secondary">{text(`النغمة ${step + 1} من ${totalSteps}`, `Son ${step + 1} sur ${totalSteps}`, `النغمة ${step + 1} من ${totalSteps}`)}</p>
                  <h2 className="text-2xl font-extrabold text-night">{earLabel(currentEar)} - {currentFrequency}Hz</h2>
                  <p className="mt-1 text-sm font-bold text-on-surface-variant">{text(`الأذن ${currentEarStep} من 2 · التردد ${currentFrequencyStep} من 4 · المستوى ${currentVolumeIndex + 1} من ${volumeLevels.length}`, `Oreille ${currentEarStep} sur 2 · fréquence ${currentFrequencyStep} sur 4 · niveau ${currentVolumeIndex + 1} sur ${volumeLevels.length}`, `الودن ${currentEarStep} من 2 · التردد ${currentFrequencyStep} من 4 · المستوى ${currentVolumeIndex + 1} من ${volumeLevels.length}`)}</p>
                </div>
                <div className="rounded-full bg-surface px-4 py-2 font-bold text-primary">{Math.round((step / totalSteps) * 100)}%</div>
              </div>
              <div className="mb-8 h-3 overflow-hidden rounded-full bg-outline-variant">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(step / totalSteps) * 100}%` }} />
              </div>
              <div className="rounded-[20px] bg-surface p-6 text-center sm:p-8">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-lowest text-primary">
                  <Icon className="text-[58px]">{isPlayingTone ? "graphic_eq" : "hearing"}</Icon>
                </div>
                <p className="mb-6 text-on-surface-variant">{text("سيتم اختبار كل تردد بأربعة مستويات: 30 ثم 20 ثم 10 ثم 5. آخر مستوى تسمعه يُحسب كعتبة سمعية لذلك التردد.", "Chaque fréquence est testée sur quatre niveaux : 30, 20, 10 puis 5. Le dernier niveau entendu sert d'indicateur de seuil.", "كل تردد غادي نجربوه بأربعة مستويات: 30، 20، 10، ومن بعد 5. آخر مستوى كتسمعو كيتحسب كمؤشر.")}</p>
                <div className="mx-auto mb-5 max-w-md rounded-[16px] border border-outline-variant bg-surface-container-lowest p-4 text-sm font-bold text-on-surface-variant">
                  {isPlayingTone ? text("استمع الآن...", "Écoutez maintenant...", "سمع دابا...") : hasPlayedTone ? text("اختر الإجابة التي تناسب ما سمعته.", "Choisissez la réponse qui correspond à ce que vous avez entendu.", "اختار الجواب المناسب للي سمعتي.") : text("اضغط تشغيل النغمة أولاً، ثم أجب.", "Lancez d'abord le son, puis répondez.", "كليكي على تشغيل النغمة عاد جاوب.")}
                </div>
                <div className="mx-auto mb-5 max-w-sm rounded-[18px] bg-surface-container-lowest p-5">
                  <p className="mb-1 text-sm font-bold text-on-surface-variant">{text("التردد الذي يتم اختباره الآن", "Fréquence testée maintenant", "التردد اللي كنجربو دابا")}</p>
                  <p className="text-4xl font-extrabold text-primary">{currentFrequency}Hz</p>
                </div>
                <div className="mx-auto mb-5 flex max-w-md justify-center gap-2">
                  {volumeLevels.map((level, index) => (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-extrabold ${index === currentVolumeIndex ? "bg-primary text-on-primary" : index < currentVolumeIndex ? "bg-success text-white" : "bg-surface-container-lowest text-on-surface-variant"}`}
                      key={level}
                    >
                      {level}
                    </span>
                  ))}
                </div>
                <p className="mb-4 text-xs font-bold text-secondary">{text(`الشدة الفعلية الحالية: ${currentGainPercent}% حسب المعايرة`, `Intensité actuelle : ${currentGainPercent}% selon le calibrage`, `القوة الحالية: ${currentGainPercent}% حسب الضبط`)}</p>
                <div className="grid justify-center gap-3 sm:grid-cols-3">
                  <Button className="sm:col-span-3" variant="secondary" disabled={isPlayingTone} onClick={playCurrentTone}>{isPlayingTone ? text("جاري التشغيل...", "Lecture...", "خدام...") : text("تشغيل النغمة", "Jouer le son", "شغل النغمة")}</Button>
                  <Button disabled={!hasPlayedTone || isPlayingTone} variant="success" onClick={() => recordAnswer(true)}>{text("سمعت الصوت", "J'ai entendu", "سمعت الصوت")}</Button>
                  <Button className="sm:col-span-2" disabled={!hasPlayedTone || isPlayingTone} variant="danger" onClick={() => recordAnswer(false)}>{text("لم أسمع شيئاً", "Je n'ai rien entendu", "ما سمعت والو")}</Button>
                </div>
              </div>
            </Card>
            <Card>
              <h3 className="mb-4 text-xl font-extrabold text-night">{text("مشكلة في الصوت؟", "Un problème de son ?", "كاين مشكل فالصوت؟")}</h3>
              <ul className="space-y-3 text-sm leading-7 text-on-surface-variant">
                <li>{text("تأكد من عدم كتم الصوت في الجهاز.", "Vérifiez que le son de l'appareil n'est pas coupé.", "تأكد بلي الصوت ماشي مطفي فالجهاز.")}</li>
                <li>{text("استعمل سماعات رأس، ويفضل اختبار كل أذن بهدوء.", "Utilisez un casque et testez chaque oreille au calme.", "استعمل الكاسك وجرب كل ودن بهدوء.")}</li>
                <li>{text("أعد تحميل الصفحة إذا لم تعمل النغمة.", "Rechargez la page si le son ne fonctionne pas.", "عاود حمل الصفحة إلا ما خداماش النغمة.")}</li>
                <li>{text("تجنب الأماكن المزدحمة أو الضوضاء.", "Évitez les lieux bruyants.", "بعد من الضجيج والبلايص العامرين.")}</li>
              </ul>
              <Button className="mt-6 w-full" variant="secondary" onClick={resetTest}>{text("إعادة الاختبار", "Recommencer le test", "عاود التيست")}</Button>
            </Card>
          </div>
        )}

        {phase === "results" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <Card>
              <h2 className="mb-2 text-3xl font-extrabold text-night">{text("نتيجتك الأولية", "Votre résultat initial", "النتيجة الأولية ديالك")}</h2>
              <p className="mb-6 text-on-surface-variant">{text("هذه النتيجة مؤشر أولي فقط وليست تشخيصاً طبياً.", "Ce résultat est indicatif et ne constitue pas un diagnostic médical.", "هاد النتيجة غير مؤشر أولي وماشي تشخيص طبي.")}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {ears.map((ear) => (
                  <div className="rounded-[18px] bg-surface p-5" key={ear.key}>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-extrabold text-night">{earLabel(ear)}</h3>
                      <span className="text-3xl font-extrabold text-primary">{scores[ear.key]}</span>
                    </div>
                    <p className="mb-2 font-bold text-secondary">{scoreLabel(scores[ear.key], language)}</p>
                    <p className="text-sm leading-7 text-on-surface-variant">{scoreText(scores[ear.key], language)}</p>
                  </div>
                ))}
              </div>
              <details className="mt-6 rounded-[18px] border border-outline-variant bg-surface-container-lowest">
                <summary className="cursor-pointer p-4 font-bold text-primary">{text("عرض تفاصيل الترددات والعتبات", "Voir le détail des fréquences et seuils", "شوف تفاصيل الترددات والعتبات")}</summary>
                <div className="overflow-x-auto border-t border-outline-variant">
                  <table className="w-full min-w-[700px] text-sm">
                    <thead className="bg-surface text-night">
                      <tr>
                        <th className={isRtl ? "p-3 text-right" : "p-3 text-left"}>{text("الأذن", "Oreille", "الودن")}</th>
                        <th className={isRtl ? "p-3 text-right" : "p-3 text-left"}>{text("التردد", "Fréquence", "التردد")}</th>
                        <th className="p-3 text-right">30</th>
                      <th className="p-3 text-right">20</th>
                      <th className="p-3 text-right">10</th>
                      <th className="p-3 text-right">5</th>
                      <th className={isRtl ? "p-3 text-right" : "p-3 text-left"}>{text("العتبة", "Seuil", "العتبة")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ears.flatMap((ear) =>
                        frequencies.map((frequency) => {
                          const item = thresholds[ear.key]?.[frequency];
                          return (
                            <tr className="border-t border-outline-variant" key={`${ear.key}-${frequency}`}>
                              <td className="p-3 font-bold text-night">{earLabel(ear)}</td>
                              <td className="p-3">{frequency}Hz</td>
                              {volumeLevels.map((volume) => (
                                <td className="p-3" key={volume}>{item?.results.find((result) => result.vol === volume)?.heard ? text("نعم", "Oui", "نعم") : text("لا", "Non", "لا")}</td>
                              ))}
                              <td className="p-3 font-bold text-primary">{item?.threshold ?? text("غير مسموع", "Non entendu", "ما تسمعش")}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </details>
              <div className="mt-6 rounded-[16px] border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-7 text-on-surface-variant">
                {text("لا تعتمد هذه النتيجة لاتخاذ قرار طبي. الفحص السريري لدى أخصائي سمعيات أو طبيب مختص هو المرجع الحقيقي.", "Ne prenez aucune décision médicale à partir de ce résultat. Le bilan clinique réalisé par un spécialiste reste la référence.", "ما تعتمدش على هاد النتيجة باش تاخذ قرار طبي. الفحص عند المختص هو المرجع الحقيقي.")}
              </div>
            </Card>
            <Card>
              <h3 className="mb-3 text-xl font-extrabold text-night">{text("الخطوة التالية", "La prochaine étape", "الخطوة الجاية")}</h3>
              <p className="mb-5 text-on-surface-variant">{text("يمكنك إرسال النتيجة إلى بريدك وحجز موعد لفحص دقيق في أحد مراكز CLAIRSON.", "Vous pouvez recevoir le résultat par e-mail et réserver un bilan précis dans un centre CLAIRSON.", "تقدر توصل النتيجة فالإيميل وتاخذ موعد لفحص دقيق فشي مركز CLAIRSON.")}</p>
              <div className="grid gap-3">
                <Button onClick={() => { setEmailSent(true); track("result_email_requested"); }}>{emailSent ? text("تمت محاكاة إرسال النتيجة", "Envoi simulé du résultat", "تحاكا إرسال النتيجة") : text("إرسال النتائج بالبريد الإلكتروني", "Envoyer les résultats par e-mail", "صيفط النتيجة بالإيميل")}</Button>
                <a className="flex h-12 items-center justify-center rounded-full bg-accent px-6 font-bold text-white transition-colors hover:bg-tertiary" href={centersHref}>{text("احجز موعد فحص حقيقي", "Réserver un vrai bilan", "خد موعد لفحص حقيقي")}</a>
                <Button variant="secondary" onClick={resetTest}>{text("إعادة الاختبار", "Recommencer le test", "عاود التيست")}</Button>
              </div>
            </Card>
          </div>
        )}
      </section>}

      {phase !== "intro" && <section className="bg-surface-container-lowest px-gutter py-10">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-2">
          {[
            [text("لماذا تهم صحة السمع؟", "Pourquoi la santé auditive compte ?", "علاش صحة السمع مهمة؟"), text("السمع الجيد يساعد على التواصل، تقليل التوتر، ومقاومة العزلة الاجتماعية. ملاحظة التغير مبكراً تجعل التدخل أسهل.", "Une bonne audition facilite la communication, réduit la fatigue et aide à rester connecté aux autres.", "السمع المزيان كيساعد على التواصل وكيقلل التعب وكيعاونك تبقى قريب من الناس.")],
            [text("كيف تُقرأ النتيجة؟", "Comment lire le résultat ?", "كيفاش نقراو النتيجة؟"), text("المقياس من 0 إلى 100 حسب العتبة السمعية المحسوبة لكل تردد. سماع مستوى 5 أو 10 يعطي مؤشراً أعلى، ومستوى 30 أو عدم السماع يعطي مؤشراً أقل.", "L'indice va de 0 à 100 selon le seuil estimé pour chaque fréquence. Les niveaux 5 ou 10 donnent un indice plus élevé.", "المؤشر من 0 حتى 100 حسب العتبة فكل تردد. إلا سمعت 5 ولا 10 كيطلع المؤشر.")],
            [text("حدود الاختبار الإلكتروني", "Les limites du test en ligne", "حدود التيست أونلاين"), text("الاختبار يتأثر بجودة السماعات، الضوضاء، وإعدادات الجهاز. لذلك لا يمكن اعتباره تشخيصاً طبياً.", "Le test dépend du casque, du bruit ambiant et des réglages de l'appareil. Il ne remplace pas un diagnostic.", "التيست كيتأثر بالكاسك والضجيج وإعدادات الجهاز، وما كيعوضش التشخيص.")],
            [text("بعد الاختبار", "Après le test", "من بعد التيست"), text("إذا لاحظت صعوبة في السمع أو حصلت على مؤشر منخفض، احجز فحصاً سريرياً لدى مختص.", "Si vous remarquez une difficulté ou un indice bas, réservez un bilan clinique auprès d'un spécialiste.", "إلا بان لك نقص فالسمع ولا خرج مؤشر ناقص، خد موعد عند المختص.")]
          ].map(([title, text]) => (
            <Card key={title}>
              <h2 className="mb-3 text-xl font-extrabold text-night">{title}</h2>
              <p className="leading-7 text-on-surface-variant">{text}</p>
            </Card>
          ))}
        </div>
      </section>}

      {phase !== "intro" && <section className="mx-auto max-w-[1440px] px-gutter py-10">
        <h2 className="mb-6 text-3xl font-extrabold text-night">{text("أسئلة شائعة", "Questions fréquentes", "أسئلة كتعاود")}</h2>
        <div className="grid gap-4">
          {[
            [text("هل يعمل الاختبار على الجوال؟", "Le test fonctionne-t-il sur mobile ?", "واش التيست خدام فالتليفون؟"), text("نعم، يعمل على الجوال والحاسوب، لكن استعمال سماعات رأس يعطي تجربة أدق.", "Oui, sur mobile et ordinateur. Un casque améliore la précision de l'expérience.", "نعم، خدام فالتليفون والحاسوب، والكاسك كيعطي تجربة أدق.")],
            [text("هل يمكن إجراؤه في المنزل؟", "Peut-on le faire à la maison ?", "واش نقدر نديرو فالدار؟"), text("نعم، بشرط اختيار مكان هادئ وضبط مستوى الصوت قبل البدء.", "Oui, dans un endroit calme et après avoir réglé le volume.", "نعم، غير اختار بلاصة هادئة وضبط الصوت قبل ما تبدا.")],
            [text("كيف تُحلل النتائج؟", "Comment les résultats sont-ils analysés ?", "كيفاش كتتحلل النتيجة؟"), text("يتم تسجيل أدنى مستوى صوت سمعته في كل تردد، ثم تُحوّل العتبات إلى مؤشر مبسط لكل أذن.", "Le plus faible niveau entendu pour chaque fréquence est utilisé pour produire un indice par oreille.", "كنسجلو أضعف مستوى سمعتيه فكل تردد وكنخرجو مؤشر لكل ودن.")],
            [text("هل يؤثر طنين الأذن على النتيجة؟", "Les acouphènes influencent-ils le résultat ?", "واش الصفير كيأثر على النتيجة؟"), text("قد يؤثر الطنين أو الضوضاء على إدراك النغمات، لذلك ننصح بفحص مهني عند وجود طنين مستمر.", "Les acouphènes ou le bruit peuvent influencer la perception des sons. Consultez en cas d'acouphènes persistants.", "الصفير ولا الضجيج يقدرو يأثرو على السمع ديال النغمات، ومن الأفضل فحص مهني إلا كان الصفير دائم.")]
          ].map(([question, answer]) => (
            <details className="rounded-[16px] border border-outline-variant bg-surface-container-lowest p-5" key={question}>
              <summary className="cursor-pointer font-bold text-night">{question}</summary>
              <p className="mt-3 leading-7 text-on-surface-variant">{answer}</p>
            </details>
          ))}
        </div>
      </section>}
      </div>
      <SiteFooter language={language} />
    </main>
  );
}

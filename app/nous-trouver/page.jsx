"use client";

import SiteHeader from "../../components/site-header";
import { useEffect, useState } from "react";

const centers = [
  {
    name: "Clairson Taroudant",
    nameAr: "كليرسون تارودانت",
    distance: "Taroudant",
    address: "Taroudant Lamhayta Jnan Tasrif n°2, 1er étage",
    addressAr: "تارودانت لمحايطة جنان تصريف رقم 2 الطابق الأول",
    whatsapp: "+212 667357626",
    email: "taroudant@clairson.ma",
    open: true,
    pin: { left: "38%", top: "48%" },
    mapTitle: "Carte Clairson Taroudant",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438.3825174483513!2d-8.862311000000012!3d30.478288099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb1730023a38d81%3A0xfbe665e92c80f8c8!2sCLAIRSON!5e0!3m2!1sfr!2sma!4v1787087601132!5m2!1sfr!2sma"
  },
  {
    name: "Clairson Tiznit",
    nameAr: "كليرسون تزنيت",
    distance: "Tiznit",
    address: "Tiznit - Immeuble choukri, 1er étage, bureau n°5 au-dessus du Café Opéra, sur la route principale d'Aglou",
    addressAr: "تزنيت - عمارة شكري الطابق الأول، المكتب رقم 5 فوق مقهى أوبيرا على طريق أكلو الرئيسية",
    whatsapp: "+212 667-860489",
    email: "tiznit@clairson.ma",
    open: true,
    pin: { left: "56%", top: "60%" },
    mapTitle: "Carte Clairson Tiznit",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d866.3713121560985!2d-9.7402827304841!3d29.7057001633036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDQyJzIwLjUiTiA5wrA0NCcyMi43Ilc!5e0!3m2!1sfr!2sma!4v1787089483643!5m2!1sfr!2sma"
  },
  {
    name: "Clairson Inezgane",
    nameAr: "كليرسون إنزكان",
    distance: "Inezgane",
    address: "INZGANE - LOTISSEMENT NAJAH 16, 3eme etage, numero 9, A cote de MARJANE INZGANE",
    addressAr: "إنزكان - تجزئة النجاح 16، الطابق الثالث رقم 9 قرب مرجان إنزكان",
    whatsapp: "+212 618450972",
    email: "inezgane@clairson.ma",
    open: true,
    pin: { left: "46%", top: "42%" },
    mapTitle: "Carte Clairson Inezgane",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11062.077721124904!2d-9.552745699527513!3d30.356329914182623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c7dc560ea42d%3A0xbd9dec76dd67bfaa!2sInezgane%2080000!5e0!3m2!1sfr!2sma!4v1787451485950!5m2!1sfr!2sma"
  }
];

const mapImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCXdGE8NihvmJxw_FFuKdOAhAE4SWGyJTukQpw8GMMh0dVg1iQUn7LH9mbR1X6Wp2YsbeAkeD_5Ln8GzhOvHDAl8Rqe0eYKVR02Zpi4J7dQy4GuQl5hyJhlBExH4K9tdVjf9OrGVOsfYtmi_7cHxY4UMYe07AxpAAFbkJnXIwQDaV9P69Novg2gCLDlskbt52LlNRTK3Lu8QnRIo-FrI55gnMltiFB_x6JhTuTv5H4SOCObLQCGd5vQmg";

const translations = {
  fr: {
    home: "Accueil",
    centers: "Nos centres",
    hearingTest: "Test auditif",
    appointment: "Prendre rendez-vous",
    eyebrow: "CLAIRSON près de chez vous",
    title: "Trouvez votre centre Clairson",
    subtitle: "Retrouvez nos centres à Taroudant, Tiznit et Inezgane. Sélectionnez un centre pour afficher son adresse directement sur la carte.",
    chooseCenter: "Choisissez le centre le plus proche",
    choosePlaceholder: "Sélectionner un centre",
    results: "Centres Clairson",
    selectHint: "Sélectionnez un centre pour afficher les détails",
    selectedBadge: "Sélectionné",
    whatsapp: "WhatsApp",
    contactWhatsApp: "Contactez-nous sur WhatsApp",
    footerText: "L'excellence de l'audition pour tous. Retrouvez le plaisir d'entendre grâce à nos experts.",
    discover: "Découvrir"
  },
  ar: {
    home: "الرئيسية",
    centers: "مراكزنا",
    hearingTest: "اختبار السمع",
    appointment: "احجز موعداً",
    eyebrow: "كليرسون بالقرب منك",
    title: "اعثر على مركز كليرسون",
    subtitle: "تجدون مراكزنا في تارودانت وتزنيت وإنزكان. اختر مركزاً لعرض عنوانه مباشرة على الخريطة.",
    chooseCenter: "اختر المركز القريب منك",
    choosePlaceholder: "اختر مركزاً",
    results: "مراكز كليرسون",
    selectHint: "اختر مركزاً لعرض التفاصيل",
    selectedBadge: "مختار",
    whatsapp: "واتساب",
    contactWhatsApp: "تواصل معنا عبر واتساب",
    footerText: "التميز في السمع للجميع. استعد متعة السمع بمرافقة خبرائنا.",
    discover: "اكتشف"
  },
  darija: {
    home: "الرئيسية",
    centers: "المراكز ديالنا",
    hearingTest: "تيست السمع",
    appointment: "خد موعد",
    eyebrow: "كليرسون قريبة منك",
    title: "لقا مركز كليرسون",
    subtitle: "كاينين المراكز ديالنا فتارودانت وتزنيت وإنزكان. اختار مركز باش يبان العنوان ديالو فالخريطة.",
    chooseCenter: "اختار المركز القريب منك",
    choosePlaceholder: "اختار مركز",
    results: "مراكز كليرسون",
    selectHint: "اختار مركز باش تبان التفاصيل",
    selectedBadge: "مختار",
    whatsapp: "واتساب",
    contactWhatsApp: "تاصل بنا فالواتساب",
    footerText: "التميز فالسمع للجميع. رجع متعة السمع مع الخبراء ديالنا.",
    discover: "اكتاشف"
  }
};

function Icon({ children, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>;
}

function WhatsAppIcon({ className = "" }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16.04 3.2A12.72 12.72 0 0 0 5.2 22.6L3.6 28.8l6.36-1.56A12.73 12.73 0 1 0 16.04 3.2Zm0 22.9a10.1 10.1 0 0 1-5.16-1.4l-.37-.22-3.78.93 1.01-3.66-.24-.38a10.08 10.08 0 1 1 8.54 4.73Zm5.54-7.55c-.3-.15-1.8-.89-2.08-.99-.28-.1-.49-.15-.7.15-.2.3-.8.98-.98 1.18-.18.2-.36.22-.66.07-.3-.15-1.29-.47-2.45-1.51-.91-.8-1.52-1.8-1.7-2.1-.18-.3-.02-.47.13-.62.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.7-1.68-.95-2.3-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.52.07-.8.37-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.8-.73 2.05-1.44.25-.7.25-1.31.18-1.44-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

function whatsappHref(number) {
  return `https://wa.me/${number.replace(/[^\d]/g, "")}`;
}

function centerDisplayName(center, language) {
  return language === "fr" ? center.name : center.nameAr;
}

function centerAddress(center, language) {
  return language === "fr" ? center.address : center.addressAr;
}

function CenterCard({ center, copy, language, isRtl, isActive, onSelect }) {
  return (
    <article
      className={`group cursor-pointer rounded-[18px] border bg-surface-container-lowest p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-soft ${isActive ? "border-secondary ring-2 ring-secondary/20" : "border-outline-variant"}`}
      onClick={onSelect}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <button className={`${isRtl ? "text-right" : "text-left"} text-xl font-extrabold text-night transition-colors group-hover:text-primary`} type="button">
          {centerDisplayName(center, language)}
        </button>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${isActive ? "bg-secondary text-on-primary ring-secondary" : "bg-surface text-secondary ring-outline-variant"}`}>
          {isActive ? copy.selectedBadge : center.distance}
        </span>
      </div>
      {!isActive && (
        <p className="flex items-center gap-2 text-sm font-bold text-on-surface-variant">
          <Icon className="text-[18px] text-secondary">touch_app</Icon>
          {copy.selectHint}
        </p>
      )}
      {isActive && (
        <div className="mb-4 rounded-[16px] border border-outline-variant bg-surface p-4">
          <div className="mb-3 flex items-start gap-2 text-on-surface-variant">
            <Icon className="mt-0.5 text-[21px] text-primary">location_on</Icon>
            <p className="whitespace-pre-line leading-7">{centerAddress(center, language)}</p>
          </div>
          <div className="mb-3 flex items-center gap-2 text-on-surface-variant">
            <Icon className="text-[21px] text-success">chat</Icon>
            <a className="font-bold [unicode-bidi:isolate] hover:text-success" dir="ltr" href={whatsappHref(center.whatsapp)} rel="noreferrer" target="_blank">{center.whatsapp}</a>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <Icon className="text-[21px] text-secondary">mail</Icon>
            <a className="font-bold [unicode-bidi:isolate] hover:text-secondary" dir="ltr" href={`mailto:${center.email}`}>{center.email}</a>
          </div>
        </div>
      )}
      {isActive && (
        <div className="grid gap-3">
          <a className="flex h-11 items-center justify-center gap-2 rounded-full bg-success px-4 text-sm font-extrabold text-on-primary shadow-sm transition-colors hover:bg-[#248463]" href={whatsappHref(center.whatsapp)} onClick={(event) => event.stopPropagation()} rel="noreferrer" target="_blank">
            <WhatsAppIcon className="h-5 w-5" />
            {copy.whatsapp}
          </a>
        </div>
      )}
    </article>
  );
}

export default function FindCenterPage() {
  const [language, setLanguageState] = useState("fr");
  const [selectedCenterName, setSelectedCenterName] = useState("");
  const isRtl = language !== "fr";
  const copy = translations[language];
  const centersHref = `/nous-trouver?lang=${language}`;
  const selectedCenter = centers.find((center) => center.name === selectedCenterName) || null;

  useEffect(() => {
    if (selectedCenterName && !centers.some((center) => center.name === selectedCenterName)) {
      setSelectedCenterName("");
    }
  }, [selectedCenterName]);

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

  const selectCenter = (centerName) => {
    setSelectedCenterName(centerName);

    if (window.innerWidth < 1024) {
      window.setTimeout(() => {
        document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  return (
    <main className={`min-h-screen bg-surface text-on-surface ${isRtl ? "font-arabic" : ""}`} dir={isRtl ? "rtl" : "ltr"} lang={language === "fr" ? "fr" : "ar"}>
      <SiteHeader activePath="/nous-trouver" language={language} setLanguage={setLanguage} showAppointment={false} />

      <section className="border-b border-outline-variant bg-surface-container-low px-gutter pb-12 pt-[168px] sm:pb-16 sm:pt-[184px]">
        <div className="mx-auto max-w-[960px] text-center">
          <span className="mb-4 inline-flex rounded-full bg-surface-container-lowest px-4 py-2 text-sm font-extrabold text-secondary ring-1 ring-outline-variant">{copy.eyebrow}</span>
          <h1 className="mb-4 text-[34px] font-extrabold leading-tight text-night md:text-[48px]">{copy.title}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-on-surface-variant">
            {copy.subtitle}
          </p>
          <label className="mx-auto block max-w-xl rounded-[20px] border border-outline-variant bg-surface-container-lowest p-3 text-start shadow-soft">
            <span className="mb-2 block px-2 text-sm font-extrabold text-secondary">{copy.chooseCenter}</span>
            <div className="flex items-center gap-2 rounded-[14px] bg-surface px-3">
              <Icon className="text-primary">location_on</Icon>
              <select
                className="h-12 w-full border-none bg-transparent font-extrabold text-night focus:ring-0"
                onChange={(event) => selectCenter(event.target.value)}
                value={selectedCenterName}
              >
                <option value="" disabled>
                  {copy.choosePlaceholder}
                </option>
                {centers.map((center) => (
                  <option key={center.name} value={center.name}>
                    {centerDisplayName(center, language)}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
      </section>

      <section className="grid min-h-[680px] lg:grid-cols-[420px_1fr] xl:grid-cols-[500px_1fr]">
        <aside className="hidden border-r border-outline-variant bg-surface-container-lowest lg:block">
          <div className="sticky top-20 z-10 border-b border-outline-variant bg-surface-container-lowest/95 px-gutter py-5 backdrop-blur">
            <div>
              <h2 className="text-2xl font-extrabold text-night">{copy.results}</h2>
              <p className="mt-1 text-sm font-bold text-on-surface-variant">{copy.selectHint}</p>
            </div>
          </div>
          <div className="grid gap-4 p-gutter">
            {centers.map((center) => (
              <CenterCard
                center={center}
                copy={copy}
                language={language}
                isRtl={isRtl}
                isActive={selectedCenter?.name === center.name}
                key={center.name}
                onSelect={() => selectCenter(center.name)}
              />
            ))}
          </div>
        </aside>

        <section className="flex min-h-[520px] flex-col bg-surface-variant" id="map">
          {selectedCenter && (
            <div className="border-b border-outline-variant bg-surface-container-lowest px-gutter py-4 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-extrabold text-secondary">{copy.selectedBadge}</p>
                  <h3 className="text-2xl font-extrabold text-night">{centerDisplayName(selectedCenter, language)}</h3>
                  <p className="mt-1 flex gap-2 leading-7 text-on-surface-variant">
                    <Icon className="mt-0.5 text-primary">location_on</Icon>
                    <span>{centerAddress(selectedCenter, language)}</span>
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 text-sm font-bold text-on-surface-variant">
                  <a className="flex items-center gap-2 hover:text-secondary" href={`mailto:${selectedCenter.email}`}>
                    <Icon className="text-secondary">mail</Icon>
                    <span className="[unicode-bidi:isolate]" dir="ltr">{selectedCenter.email}</span>
                  </a>
                  <a className="flex h-11 items-center justify-center gap-2 rounded-full bg-success px-4 text-sm font-extrabold text-on-primary shadow-sm transition-colors hover:bg-[#248463]" href={whatsappHref(selectedCenter.whatsapp)} rel="noreferrer" target="_blank">
                    <WhatsAppIcon className="h-5 w-5" />
                    <span className="[unicode-bidi:isolate]" dir="ltr">{selectedCenter.whatsapp}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="relative min-h-[460px] flex-1 overflow-hidden">
            {selectedCenter?.mapSrc ? (
              <iframe
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={selectedCenter.mapSrc}
                title={selectedCenter.mapTitle}
              />
            ) : (
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${mapImage}')` }} />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface-container-lowest/25 via-transparent to-transparent" />
            {!selectedCenter && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface-container-lowest/75 p-gutter backdrop-blur-[2px]">
                <div className="max-w-md rounded-[20px] border border-outline-variant bg-surface-container-lowest p-6 text-center shadow-soft">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-on-primary">
                    <Icon className="text-[30px]">location_on</Icon>
                  </div>
                  <h3 className="text-2xl font-extrabold text-night">{copy.chooseCenter}</h3>
                  <p className="mt-3 leading-7 text-on-surface-variant">{copy.selectHint}</p>
                </div>
              </div>
            )}
            {selectedCenter && !selectedCenter.mapSrc && centers.map((center) => {
              const isActive = selectedCenter.name === center.name;

              return (
                <button
                  className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-3 py-2 text-sm font-extrabold shadow-soft ring-1 transition-all ${
                    isActive
                      ? "z-20 scale-110 bg-primary text-on-primary ring-primary"
                      : "bg-surface-container-lowest text-primary ring-outline-variant hover:bg-surface"
                  }`}
                  key={center.name}
                  onClick={() => setSelectedCenterName(center.name)}
                  style={{ left: center.pin.left, top: center.pin.top }}
                  type="button"
                >
                  <Icon className={isActive ? "text-on-primary" : "text-secondary"}>location_on</Icon>
                  {centerDisplayName(center, language)}
                </button>
              );
            })}
            {selectedCenter && !selectedCenter.mapSrc && <div className="absolute bottom-6 right-6 grid gap-2">
              <button className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-surface-container-lowest text-primary shadow-soft ring-1 ring-outline-variant" type="button">
                <Icon>add</Icon>
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-surface-container-lowest text-primary shadow-soft ring-1 ring-outline-variant" type="button">
                <Icon>remove</Icon>
              </button>
            </div>}
          </div>
        </section>
      </section>

    </main>
  );
}

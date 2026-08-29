"use client";

import { withBasePath } from "./site-paths";

const footerCopy = {
  fr: {
    footerText: "Votre partenaire de confiance pour une meilleure audition au quotidien.",
    quickLinks: "Liens rapides",
    info: "Informations",
    help: "Besoin d'aide ?",
    helpText: "Contactez notre service client pour toute question.",
    legal: ["Mentions légales", "Confidentialité", "Cookies"],
    infoLinks: ["Conditions générales", "Recrutement", "Contact"],
    copyright: "© 2024 CLAIRSON Hearing Care. Tous droits réservés."
  },
  ar: {
    footerText: "شريكك الموثوق لسمع أفضل كل يوم.",
    quickLinks: "روابط سريعة",
    info: "معلومات",
    help: "هل تحتاج مساعدة؟",
    helpText: "تواصل مع خدمة العملاء لأي سؤال.",
    legal: ["الإشعارات القانونية", "الخصوصية", "ملفات تعريف الارتباط"],
    infoLinks: ["الشروط العامة", "التوظيف", "اتصل بنا"],
    copyright: "© 2024 كليرسون للعناية السمعية. جميع الحقوق محفوظة."
  },
  darija: {
    footerText: "الشريك ديالك لسمع أحسن كل نهار.",
    quickLinks: "روابط سريعة",
    info: "معلومات",
    help: "محتاج مساعدة؟",
    helpText: "تاصل بخدمة الزبناء لأي سؤال.",
    legal: ["المعلومات القانونية", "الخصوصية", "الكوكيز"],
    infoLinks: ["الشروط العامة", "التوظيف", "اتصل بنا"],
    copyright: "© 2024 كليرسون. جميع الحقوق محفوظة."
  }
};

function Icon({ children, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>;
}

export default function SiteFooter({ language }) {
  const isRtl = language !== "fr";
  const t = footerCopy[language] || footerCopy.fr;
  const footerLogoSrc = withBasePath(isRtl ? "/clairson-logoardark.png" : "/clairson-logodark.png");

  return (
    <footer className="w-full border-t border-outline-variant bg-night pt-section-v-desktop pb-stack-lg font-body-md text-body-md text-on-secondary">
      <div className="mx-auto mb-12 grid max-w-container-max grid-cols-1 gap-gutter px-gutter md:grid-cols-4">
        <div className="flex flex-col gap-stack-md">
          <img className="mb-4 h-24 w-fit object-contain" src={footerLogoSrc} alt="CLAIRSON" />
          <p className="mb-4 text-on-secondary/75">{t.footerText}</p>
        </div>
        <div>
          <h4 className="mb-6 text-lg font-bold text-on-primary">{t.quickLinks}</h4>
          <ul className="flex flex-col gap-3">
            {t.legal.map((item) => (
              <li key={item}>
                <a className="text-on-secondary/75 transition-all hover:text-accent hover:underline" href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-lg font-bold text-on-primary">{t.info}</h4>
          <ul className="flex flex-col gap-3">
            {t.infoLinks.map((item) => (
              <li key={item}>
                <a className="text-on-secondary/75 transition-all hover:text-accent hover:underline" href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-lg font-bold text-on-primary">{t.help}</h4>
          <p className="mb-4 text-on-secondary/75">{t.helpText}</p>
          <p className="flex items-center gap-2 text-xl font-bold text-success">
            <Icon>call</Icon>
            <span className="[unicode-bidi:isolate]" dir="ltr">0800 134 134</span>
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-container-max border-t border-white/15 px-gutter pt-8 text-center text-sm text-on-secondary/70">{t.copyright}</div>
    </footer>
  );
}

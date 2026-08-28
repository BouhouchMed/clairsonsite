"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const languageOptions = [
  ["fr", "FR"],
  ["ar", "العربية"],
  ["darija", "الدارجة"]
];

const copy = {
  fr: {
    top: { appointment: "Prendre rendez-vous", appointmentShort: "RDV", centers: "Trouver un centre", centersShort: "Centre", test: "Test auditif en ligne" },
    nav: ["Accueil", "Appareils", "Services", "Trouver un centre", "Bilan auditif"],
    appointment: "Prendre rendez-vous"
  },
  ar: {
    top: { appointment: "احجز موعداً", appointmentShort: "موعد", centers: "ابحث عن مركز", centersShort: "مركز", test: "اختبار السمع عبر الإنترنت" },
    nav: ["الرئيسية", "الأجهزة", "الخدمات", "ابحث عن مركز", "اختبار السمع"],
    appointment: "احجز موعداً"
  },
  darija: {
    top: { appointment: "خد موعد", appointmentShort: "موعد", centers: "لقا مركز", centersShort: "مركز", test: "تيست السمع أونلاين" },
    nav: ["الرئيسية", "الأجهزة", "الخدمات", "لقا مركز", "تيست السمع"],
    appointment: "خد موعد"
  }
};

function Icon({ children, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>;
}

export default function SiteHeader({ language, setLanguage, activePath = "/", showAppointment = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const isRtl = language !== "fr";
  const t = copy[language] || copy.fr;
  const logoSrc = isRtl ? "/clairson-logoar.svg" : "/clairson-logo.svg";
  const centersHref = `/nous-trouver?lang=${language}`;
  const devicesHref = `/appareils?lang=${language}`;
  const hearingTestHref = `/test-auditif?lang=${language}`;
  const homeHref = `/?lang=${language}#accueil`;
  const servicesHref = `/?lang=${language}#services`;
  const navItems = [
    [t.nav[0], homeHref, "/"],
    [t.nav[1], devicesHref, "/appareils"],
    [t.nav[2], servicesHref, "/#services"],
    [t.nav[3], centersHref, "/nous-trouver"],
    [t.nav[4], hearingTestHref, "/test-auditif"]
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full shadow-sm">
      <motion.div
        className="overflow-hidden bg-night text-on-secondary"
        animate={{ height: isScrolled ? 0 : 40, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="mx-auto flex h-full max-w-container-max items-center justify-end gap-2 px-gutter text-[12px] font-semibold">
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

      <header className="border-b border-outline-variant bg-surface-container-lowest font-body-md text-body-md text-primary">
        <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-gutter">
          <a className="flex h-16 items-center" href={homeHref} aria-label="CLAIRSON accueil">
            <img className="h-16 w-auto object-contain" src={logoSrc} alt="CLAIRSON" />
          </a>
          <nav className="hidden gap-6 md:flex">
            {navItems.map(([item, href, path]) => {
              const isActive = activePath === path || (path === "/" && activePath === "/");

              return (
                <a
                  className={isActive ? "border-b-2 border-primary pb-1 font-extrabold text-primary" : "font-bold text-on-surface-variant transition-colors hover:text-primary"}
                  href={href}
                  key={item}
                >
                  {item}
                </a>
              );
            })}
          </nav>
          <div className="hidden items-center gap-4 sm:flex">
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
            {showAppointment && (
              <a className="flex h-12 items-center justify-center rounded-full bg-primary px-8 py-3 font-bold text-on-primary transition-colors hover:bg-secondary" href={centersHref}>
                {t.appointment}
              </a>
            )}
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-night md:hidden" onClick={() => setMenuOpen((value) => !value)} type="button" aria-label="Menu">
            <Icon>{menuOpen ? "close" : "menu"}</Icon>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav className="grid gap-3 border-t border-outline-variant bg-surface-container-lowest px-gutter py-4 md:hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              {navItems.map(([item, href, path]) => {
                const isActive = activePath === path || (path === "/" && activePath === "/");

                return (
                  <a
                    className={isActive ? "rounded-full bg-primary px-4 py-2 font-extrabold text-on-primary" : "py-2 font-bold text-on-surface-variant"}
                    href={href}
                    key={item}
                    onClick={() => setMenuOpen(false)}
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
              {showAppointment && (
                <a className="flex h-12 items-center justify-center rounded-full bg-primary px-8 py-3 font-bold text-on-primary transition-colors hover:bg-secondary" href={centersHref}>
                  {t.appointment}
                </a>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

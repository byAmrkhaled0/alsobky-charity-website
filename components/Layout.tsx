import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Globe2,
  Phone,
  Mail,
  MapPin,
  Home,
  Info,
  BookOpen,
  Trophy,
  Image,
  HandHeart,
  FileText,
  ShieldCheck,
  MessageCircle,
  CalendarDays,
  Newspaper,
} from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { useScrolled } from '@/hooks/index';

type ThemeMode = 'dark' | 'light';
type Lang = 'ar' | 'en';

const THEME_STORAGE_KEY = 'site_theme';
const LANGUAGE_STORAGE_KEY = 'site_language';

const MAIN_WHATSAPP_NUMBER = '201153637371';
const DEVELOPER_WHATSAPP_NUMBER = '201008454029';

const safeRoutes = ROUTE_PATHS as Record<string, string>;

const routes = {
  home: safeRoutes.HOME || '/',
  about: safeRoutes.ABOUT || '/about',
  services: safeRoutes.SERVICES || '/services',
  competitions: safeRoutes.COMPETITIONS || '/competitions',
  yearNine: safeRoutes.YEAR_NINE || '/year-nine',
  quranNews: safeRoutes.QURAN_NEWS || '/quran-news',
  gallery: safeRoutes.GALLERY || '/gallery',
  donations: safeRoutes.DONATIONS || '/donations',
  contact: safeRoutes.CONTACT || '/contact',
  privacy: safeRoutes.PRIVACY || '/privacy',
  terms: safeRoutes.TERMS || '/terms',
};

const text = {
  ar: {
    dir: 'rtl' as const,
    logoTitle: 'مؤسسة حسن إبراهيم السبكي',
    logoSubtitle: 'للقرآن الكريم وخدمة المجتمع',
    home: 'الرئيسية',
    about: 'عن المؤسسة',
    services: 'خدماتنا',
    competitions: 'المسابقات',
    yearNine: 'العام التاسع',
    quranNews: 'أخبار المسابقة',
    gallery: 'معرض الصور',
    donations: 'الدعم والتبرعات',
    contact: 'تواصل معنا',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
    register: 'التسجيل الرسمي',
    darkMode: 'الوضع الليلي',
    lightMode: 'الوضع النهاري',
    languageSwitch: 'English',
    footerPages: 'صفحات الموقع',
    footerContact: 'تواصل معنا',
    footerText:
      'مؤسسة حسن إبراهيم السبكي الخيرية لخدمة القرآن الكريم والمجتمع من خلال برامج التحفيظ والمسابقات القرآنية والمبادرات الخيرية.',
    phone: '01153637371',
    country: 'مصر',
    whatsapp: 'تواصل واتساب',
    rights: 'جميع الحقوق محفوظة © 2026 مؤسسة حسن إبراهيم السبكي الخيرية',
    developer: 'تم البرمجة بواسطة المهندس عمرو خالد',
    developerContact: 'للتواصل',
    backToTop: 'العودة للأعلى',
    loadingTitle: 'مؤسسة حسن إبراهيم السبكي الخيرية',
    loadingSubtitle: 'للقرآن الكريم وخدمة المجتمع',
    menu: 'القائمة',
    closeMenu: 'إغلاق القائمة',
  },
  en: {
    dir: 'ltr' as const,
    logoTitle: 'Hassan Ibrahim Al Sobky',
    logoSubtitle: 'For Quran & Community Service',
    home: 'Home',
    about: 'About',
    services: 'Services',
    competitions: 'Competitions',
    yearNine: 'Year Nine',
    quranNews: 'Competition News',
    gallery: 'Gallery',
    donations: 'Donations',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    register: 'Official Registration',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    languageSwitch: 'العربية',
    footerPages: 'Website Pages',
    footerContact: 'Contact Us',
    footerText:
      'Hassan Ibrahim Al Sobky Charity Foundation serves the Quran and the community through memorization programs, Quran competitions, and charitable initiatives.',
    phone: '+20 11 53637371',
    country: 'Egypt',
    whatsapp: 'WhatsApp Contact',
    rights: 'All rights reserved © 2026 Hassan Ibrahim Al Sobky Charity Foundation',
    developer: 'Developed by Eng. Amr Khaled',
    developerContact: 'Contact',
    backToTop: 'Back to top',
    loadingTitle: 'Hassan Ibrahim Al Sobky Charity Foundation',
    loadingSubtitle: 'For Quran & Community Service',
    menu: 'Menu',
    closeMenu: 'Close menu',
  },
};

function getSavedTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('theme');
  return saved === 'dark' ? 'dark' : 'light';
}

function getSavedLanguage(): Lang {
  if (typeof window === 'undefined') return 'ar';

  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem('lang');

  if (saved === 'en' || saved === 'ar') return saved;

  return document.documentElement.lang === 'en' ? 'en' : 'ar';
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
  document.body.classList.toggle('dark', theme === 'dark');

  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);

  localStorage.setItem(THEME_STORAGE_KEY, theme);
  localStorage.setItem('theme', theme);
}

function applyLanguage(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';

  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  localStorage.setItem('lang', lang);

  window.dispatchEvent(new Event('site-language-change'));
}

function getWhatsAppLink(number: string, message?: string) {
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${encodedMessage}`;
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.55 0 .23 5.31.23 11.84c0 2.09.55 4.13 1.59 5.93L.13 24l6.38-1.67a11.83 11.83 0 0 0 5.57 1.42h.01c6.53 0 11.85-5.31 11.85-11.84 0-3.16-1.23-6.14-3.42-8.43ZM12.09 21.75h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.79.99 1.01-3.69-.24-.38a9.82 9.82 0 0 1-1.5-5.25C2.19 6.41 6.64 2 12.09 2a9.78 9.78 0 0 1 6.98 2.89 9.82 9.82 0 0 1 2.88 6.99c0 5.44-4.42 9.87-9.86 9.87Zm5.4-7.39c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

type TextContent = (typeof text)[keyof typeof text];

function getHeaderNavItems(t: TextContent): NavItem[] {  return [
    { label: t.home, path: routes.home, icon: Home },
    { label: t.about, path: routes.about, icon: Info },
    { label: t.services, path: routes.services, icon: BookOpen },
    { label: t.competitions, path: routes.competitions, icon: Trophy },
    { label: t.yearNine, path: routes.yearNine, icon: CalendarDays },
    { label: t.contact, path: routes.contact, icon: MessageCircle },
  ];
}

function getAllNavItems(t: TextContent): NavItem[] {  return [
    { label: t.home, path: routes.home, icon: Home },
    { label: t.about, path: routes.about, icon: Info },
    { label: t.services, path: routes.services, icon: BookOpen },
    { label: t.competitions, path: routes.competitions, icon: Trophy },
    { label: t.yearNine, path: routes.yearNine, icon: CalendarDays },
    { label: t.quranNews, path: routes.quranNews, icon: Newspaper },
    { label: t.gallery, path: routes.gallery, icon: Image },
    { label: t.donations, path: routes.donations, icon: HandHeart },
    { label: t.contact, path: routes.contact, icon: MessageCircle },
  ];
}

function getLegalNavItems(t: TextContent): NavItem[] {  return [
    { label: t.privacy, path: routes.privacy, icon: ShieldCheck },
    { label: t.terms, path: routes.terms, icon: FileText },
  ];
}

export function IslamicPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <pattern id="islamicGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <polygon points="25,2 47,14 47,36 25,48 3,36 3,14" stroke="currentColor" strokeWidth="0.6" fill="none" />
          <polygon points="25,10 38,17 38,33 25,40 12,33 12,17" stroke="currentColor" strokeWidth="0.4" fill="none" />
          <circle cx="25" cy="25" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#islamicGrid)" />
    </svg>
  );
}

export function GoldDivider() {
  return (
    <div className="my-4 flex items-center justify-center gap-3">
      <div className="h-px max-w-24 flex-1 bg-gradient-to-l from-accent to-transparent" />
      <div className="select-none text-lg text-accent">✦</div>
      <div className="select-none text-sm text-accent">﷽</div>
      <div className="select-none text-lg text-accent">✦</div>
      <div className="h-px max-w-24 flex-1 bg-gradient-to-r from-accent to-transparent" />
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 text-center sm:mb-12">
      <GoldDivider />

      <h2
        className={`mb-3 mt-4 text-2xl font-black leading-tight sm:text-3xl md:text-4xl ${
          light ? 'text-primary-foreground' : 'text-primary dark:text-white'
        }`}
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mx-auto max-w-2xl text-sm leading-7 sm:text-base md:text-lg ${
            light ? 'text-primary-foreground/80' : 'text-muted-foreground dark:text-white/70'
          }`}
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  const lang = getSavedLanguage();
  const t = text[lang];

  return (
    <Link
      to={routes.home}
      className="group flex min-w-0 items-center gap-2 text-right sm:gap-3"
      aria-label={lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to homepage'}
      dir={t.dir}
    >
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-full bg-[#279782]/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

        <img
          src="/images/logo.jpg"
          alt={lang === 'ar' ? 'لوجو مؤسسة حسن إبراهيم السبكي الخيرية' : 'Hassan Ibrahim Al Sobky Charity Foundation logo'}
          className="relative h-11 w-11 object-contain transition-all duration-300 group-hover:scale-105 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="min-w-0">
        <div
          className={`max-w-[155px] truncate text-xs font-black leading-tight sm:max-w-none sm:text-sm ${
            light ? 'text-white' : 'text-primary dark:text-white'
          }`}
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          {t.logoTitle}
        </div>

        <div className="mt-1 hidden text-[11px] font-bold text-accent sm:block" style={{ fontFamily: "'Cairo', sans-serif" }}>
          {t.logoSubtitle}
        </div>
      </div>
    </Link>
  );
}

export function Header() {
  const scrolled = useScrolled(50);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => getSavedTheme() === 'dark');
  const [language, setLanguage] = useState<Lang>(() => getSavedLanguage());

  const t = text[language];
  const isArabic = language === 'ar';

  const headerNavItems = getHeaderNavItems(t);
  const allNavItems = getAllNavItems(t);

  useEffect(() => {
    const savedTheme = getSavedTheme();
    setDarkMode(savedTheme === 'dark');
    applyTheme(savedTheme);

    const savedLang = getSavedLanguage();
    setLanguage(savedLang);
    applyLanguage(savedLang);
  }, []);

  useEffect(() => {
    applyTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleButtonClass =
    scrolled || mobileOpen
      ? 'border-primary/15 bg-white text-primary hover:bg-primary hover:text-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-primary'
      : 'border-white/25 bg-white/10 text-white hover:bg-white hover:text-primary';

  return (
    <header
      dir={t.dir}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'border-b border-primary/10 bg-white/95 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/92'
          : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-8">
        <div className="flex min-h-[68px] items-center justify-between gap-2 py-2 sm:min-h-[76px] sm:gap-4 lg:min-h-[82px] lg:py-3">
          <Logo light={!scrolled && !mobileOpen} />

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {headerNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-black transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-l from-[#279782] to-[#64c3b2] text-white shadow-md'
                      : scrolled || mobileOpen
                        ? 'text-foreground hover:bg-primary/5 hover:text-primary dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`
                }
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all sm:h-11 sm:w-11 ${toggleButtonClass}`}
              aria-label={darkMode ? t.lightMode : t.darkMode}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={toggleLanguage}
              className={`flex h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-black transition-all sm:h-11 sm:px-4 ${toggleButtonClass}`}
              style={{ fontFamily: "'Cairo', sans-serif" }}
              aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe2 size={16} />
              <span className="hidden xs:inline sm:inline">{t.languageSwitch}</span>
              <span className="sm:hidden">{language === 'ar' ? 'EN' : 'AR'}</span>
              <ChevronDown size={13} />
            </button>

            <a
              href="https://alsobky.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center rounded-full bg-gradient-to-l from-[#f69e12] to-[#ffb84d] px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-[#f69e12]/25 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 lg:flex"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.register}
            </a>

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all xl:hidden ${
                scrolled || mobileOpen
                  ? 'text-primary hover:bg-primary/5 dark:text-white dark:hover:bg-white/10'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={mobileOpen ? t.closeMenu : t.menu}
            >
              {mobileOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-[68px] z-40 xl:hidden sm:top-[76px] lg:top-[82px]"
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={() => setMobileOpen(false)} />

            <motion.div
              initial={{ x: isArabic ? 320 : -320 }}
              animate={{ x: 0 }}
              exit={{ x: isArabic ? 320 : -320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`absolute top-0 h-[calc(100svh-68px)] w-[330px] max-w-[92vw] overflow-y-auto bg-white shadow-2xl dark:bg-slate-950 sm:h-[calc(100svh-76px)] lg:h-[calc(100svh-82px)] ${
                isArabic ? 'right-0 rounded-l-3xl' : 'left-0 rounded-r-3xl'
              }`}
              dir={t.dir}
            >
              <div className="border-b border-border p-4 dark:border-white/10">
                <Logo />
              </div>

              <nav className="flex flex-col gap-2 p-4">
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDarkMode((prev) => !prev)}
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-primary/15 bg-muted px-3 py-3 text-center text-xs font-black text-primary dark:border-white/10 dark:bg-white/10 dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                    {darkMode ? t.lightMode : t.darkMode}
                  </button>

                  <button
                    onClick={toggleLanguage}
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-primary/15 bg-muted px-3 py-3 text-center text-xs font-black text-primary dark:border-white/10 dark:bg-white/10 dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <Globe2 size={17} />
                    {t.languageSwitch}
                  </button>
                </div>

                {allNavItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex min-h-[48px] items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-foreground hover:bg-muted dark:text-white/85 dark:hover:bg-white/10'
                        }`
                      }
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      <Icon size={18} />
                      {item.label}
                    </NavLink>
                  );
                })}

                <div className="mt-3 border-t border-border pt-4 dark:border-white/10">
                  <a
                    href="https://alsobky.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-2xl bg-gradient-to-l from-[#f69e12] to-[#ffb84d] px-4 py-3 text-center text-sm font-black text-white shadow-lg"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {t.register}
                  </a>

                  <a
                    href={getWhatsAppLink(
                      MAIN_WHATSAPP_NUMBER,
                      language === 'ar'
                        ? 'السلام عليكم، أريد التواصل مع مؤسسة حسن إبراهيم السبكي الخيرية'
                        : 'Hello, I would like to contact Hassan Ibrahim Al Sobky Charity Foundation',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-center text-sm font-black text-white shadow-lg transition-all hover:bg-green-600"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <WhatsAppIcon size={17} />
                    {t.whatsapp}
                  </a>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function FooterLink({ item }: { item: NavItem }) {
  const Icon = item.icon;

  return (
    <li>
      <NavLink
        to={item.path}
        className="flex min-h-[38px] items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-primary-foreground/72 transition-all hover:bg-white/10 hover:text-accent"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        <Icon size={15} />
        {item.label}
      </NavLink>
    </li>
  );
}

export function Footer() {
  const [language, setLanguage] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const updateLanguage = () => setLanguage(getSavedLanguage());

    window.addEventListener('site-language-change', updateLanguage);

    return () => window.removeEventListener('site-language-change', updateLanguage);
  }, []);

  const t = text[language];
  const allNavItems = getAllNavItems(t);
  const legalNavItems = getLegalNavItems(t);

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground" dir={t.dir}>
      <div className="absolute inset-0 opacity-[0.035]">
        <IslamicPattern className="h-full w-full text-accent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1.4fr_0.9fr]">
          <div>
            <Logo light />

            <p className="mt-4 max-w-md text-sm leading-7 text-primary-foreground/72" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {t.footerText}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=61589030337086"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-[#1877F2]"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://www.facebook.com/alsobkiquran"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-[#1877F2]"
                aria-label="Facebook Quran"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://www.instagram.com/alsobki_charity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-[#E4405F]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>

              <a
                href={getWhatsAppLink(MAIN_WHATSAPP_NUMBER)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white transition-all hover:-translate-y-1 hover:bg-green-600"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black text-accent" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {t.footerPages}
            </h3>

            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {allNavItems.map((item) => (
                <FooterLink key={item.path} item={item} />
              ))}

              {legalNavItems.map((item) => (
                <FooterLink key={item.path} item={item} />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black text-accent" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {t.footerContact}
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs text-primary-foreground/75" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <Phone size={16} className="shrink-0 text-accent" />
                <a href="tel:+201153637371" className="transition-colors hover:text-accent">
                  {t.phone}
                </a>
              </li>

              <li className="flex items-center gap-2 text-xs text-primary-foreground/75" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <Mail size={16} className="shrink-0 text-accent" />
                <a href="mailto:alsobkycharity@gmail.com" className="break-all transition-colors hover:text-accent">
                  alsobkycharity@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-2 text-xs text-primary-foreground/75" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <MapPin size={16} className="shrink-0 text-accent" />
                <span>{t.country}</span>
              </li>
            </ul>

            <a
              href={getWhatsAppLink(
                MAIN_WHATSAPP_NUMBER,
                language === 'ar'
                  ? 'السلام عليكم، أريد التواصل مع مؤسسة حسن إبراهيم السبكي الخيرية'
                  : 'Hello, I would like to contact Hassan Ibrahim Al Sobky Charity Foundation',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-xs font-black text-white transition-all hover:bg-green-600"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <WhatsAppIcon size={15} />
              {t.whatsapp}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-4">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 px-4 text-center sm:px-6 md:flex-row lg:px-10">
          <p className="text-[11px] leading-6 text-primary-foreground/55" style={{ fontFamily: "'Cairo', sans-serif" }}>
            {t.rights}
          </p>

          <div className="flex flex-col items-center gap-1">
            <a
              href={getWhatsAppLink(DEVELOPER_WHATSAPP_NUMBER)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-black text-white transition-colors hover:text-accent"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.developer}
            </a>

            <a
              href={getWhatsAppLink(DEVELOPER_WHATSAPP_NUMBER)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1 text-[11px] font-bold text-white transition-all hover:bg-green-600"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <WhatsAppIcon size={14} />
              {t.developerContact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const updateLanguage = () => setLanguage(getSavedLanguage());

    window.addEventListener('site-language-change', updateLanguage);

    return () => window.removeEventListener('site-language-change', updateLanguage);
  }, []);

  const t = text[language];

  return (
    <div
      className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300 dark:bg-slate-950 dark:text-white"
      dir={t.dir}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function WhatsAppButton(): JSX.Element {
  const [language, setLanguage] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const updateLanguage = () => setLanguage(getSavedLanguage());

    window.addEventListener('site-language-change', updateLanguage);

    return () => window.removeEventListener('site-language-change', updateLanguage);
  }, []);

  const t = text[language];

  return (
    <a
      href={getWhatsAppLink(
        MAIN_WHATSAPP_NUMBER,
        language === 'ar'
          ? 'السلام عليكم، أريد التواصل مع مؤسسة حسن إبراهيم السبكي الخيرية'
          : 'Hello, I would like to contact Hassan Ibrahim Al Sobky Charity Foundation',
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition-all hover:-translate-y-1 hover:bg-green-600 active:scale-95 sm:h-14 sm:w-14"
      aria-label={t.whatsapp}
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const updateLanguage = () => setLanguage(getSavedLanguage());

    window.addEventListener('site-language-change', updateLanguage);

    return () => window.removeEventListener('site-language-change', updateLanguage);
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const t = text[language];

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={handleClick}
          className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:bg-primary/90 active:scale-95 sm:h-12 sm:w-12"
          aria-label={t.backToTop}
        >
          <ChevronDown size={20} className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [language, setLanguage] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const updateLanguage = () => setLanguage(getSavedLanguage());

    window.addEventListener('site-language-change', updateLanguage);

    return () => window.removeEventListener('site-language-change', updateLanguage);
  }, []);

  useEffect(() => {
    const timer = setTimeout(onDone, 1600);

    return () => clearTimeout(timer);
  }, [onDone]);

  const t = text[language];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary px-4 text-center"
      dir={t.dir}
    >
      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
        <IslamicPattern className="absolute inset-0 text-accent opacity-20" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border-2 border-accent/40 border-t-accent"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/logo.jpg"
            alt={t.loadingTitle}
            className="h-20 w-20 object-contain"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 text-center">
        <p className="text-base font-bold text-primary-foreground sm:text-lg" style={{ fontFamily: "'Cairo', sans-serif" }}>
          {t.loadingTitle}
        </p>

        <p className="mt-1 text-sm text-accent" style={{ fontFamily: "'Cairo', sans-serif" }}>
          {t.loadingSubtitle}
        </p>
      </motion.div>
    </motion.div>
  );
}

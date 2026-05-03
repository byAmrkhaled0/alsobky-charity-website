import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Languages,
  Phone,
  Mail,
  MapPin,
  Home,
  Info,
  BookOpen,
  Trophy,
  Image,
  HandHeart,
  Award,
  FileText,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { useScrolled } from '@/hooks/index';

type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'site_theme';

function getSavedTheme(): ThemeMode {
  const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('theme');
  return saved === 'dark' ? 'dark' : 'light';
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

const HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'الرئيسية', path: ROUTE_PATHS.HOME, icon: Home },
  { label: 'عن المؤسسة', path: ROUTE_PATHS.ABOUT, icon: Info },
  { label: 'خدماتنا', path: ROUTE_PATHS.SERVICES, icon: BookOpen },
  { label: 'المسابقات', path: ROUTE_PATHS.COMPETITIONS, icon: Trophy },
  { label: 'تواصل معنا', path: ROUTE_PATHS.CONTACT, icon: MessageCircle },
];

const ALL_NAV_ITEMS: NavItem[] = [
  { label: 'الرئيسية', path: ROUTE_PATHS.HOME, icon: Home },
  { label: 'عن المؤسسة', path: ROUTE_PATHS.ABOUT, icon: Info },
  { label: 'خدماتنا', path: ROUTE_PATHS.SERVICES, icon: BookOpen },
  { label: 'المسابقات', path: ROUTE_PATHS.COMPETITIONS, icon: Trophy },
  { label: 'معرض الصور', path: ROUTE_PATHS.GALLERY, icon: Image },
  { label: 'الدعم والتبرعات', path: ROUTE_PATHS.DONATIONS, icon: HandHeart },
  { label: 'تواصل معنا', path: ROUTE_PATHS.CONTACT, icon: MessageCircle },
];

const LEGAL_NAV_ITEMS: NavItem[] = [
  { label: 'سياسة الخصوصية', path: ROUTE_PATHS.PRIVACY || '/privacy', icon: ShieldCheck },
  { label: 'الشروط والأحكام', path: ROUTE_PATHS.TERMS || '/terms', icon: FileText },
];

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
    <div className="mb-12 text-center">
      <GoldDivider />
      <h2
        className={`mb-3 mt-4 text-3xl font-bold md:text-4xl ${
          light ? 'text-primary-foreground' : 'text-primary dark:text-white'
        }`}
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mx-auto max-w-2xl text-base leading-relaxed md:text-lg ${
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
  return (
    <Link to={ROUTE_PATHS.HOME} className="group flex items-center gap-3 text-right" aria-label="العودة للصفحة الرئيسية">
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-full bg-[#279782]/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

        <img
          src="/images/logo.jpg"
          alt="لوجو مؤسسة حسن إبراهيم السبكي الخيرية"
          className="relative h-14 w-14 object-contain transition-all duration-300 group-hover:scale-105 sm:h-16 sm:w-16"
        />
      </div>

      <div className="hidden sm:block">
        <div
          className={`text-sm font-black leading-tight ${
            light ? 'text-white' : 'text-primary dark:text-white'
          }`}
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          مؤسسة حسن إبراهيم السبكي
        </div>

        <div className="mt-1 text-xs font-bold text-accent" style={{ fontFamily: "'Cairo', sans-serif" }}>
          للقرآن الكريم وخدمة المجتمع
        </div>
      </div>
    </Link>
  );
}

export function Header() {
  const scrolled = useScrolled(60);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => getSavedTheme() === 'dark');
  const [language, setLanguage] = useState<'ar' | 'en'>(
    document.documentElement.lang === 'en' ? 'en' : 'ar'
  );

  useEffect(() => {
    applyTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = getSavedTheme();
    setDarkMode(savedTheme === 'dark');
    applyTheme(savedTheme);
  }, []);

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
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

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

  const toggleButtonClass =
    scrolled || mobileOpen
      ? 'border-primary/15 bg-white text-primary hover:bg-primary hover:text-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-primary'
      : 'border-white/25 bg-white/10 text-white hover:bg-white hover:text-primary';

  return (
    <header
      dir="rtl"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'border-b border-primary/10 bg-white/92 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90'
          : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[82px] items-center justify-between gap-4 py-3">
          <Logo light={!scrolled && !mobileOpen} />

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {HEADER_NAV_ITEMS.map((item) => (
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

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${toggleButtonClass}`}
              aria-label="تغيير الوضع الليلي والنهاري"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'))}
              className={`flex h-10 items-center gap-1 rounded-full border px-3 text-xs font-black transition-all ${toggleButtonClass}`}
              style={{ fontFamily: "'Cairo', sans-serif" }}
              aria-label="تغيير اللغة"
            >
              <Languages size={16} />
              {language === 'ar' ? 'EN' : 'AR'}
            </button>

            <a
              href="https://alsobky.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center rounded-full bg-gradient-to-l from-[#f69e12] to-[#ffb84d] px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-[#f69e12]/25 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 lg:flex"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              التسجيل الرسمي
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`rounded-xl p-2 transition-all xl:hidden ${
                scrolled || mobileOpen
                  ? 'text-primary hover:bg-primary/5 dark:text-white dark:hover:bg-white/10'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="القائمة"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-[82px] z-40 xl:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />

            <div className="absolute right-0 top-0 h-full w-[360px] max-w-[90vw] overflow-y-auto rounded-l-3xl bg-white shadow-2xl dark:bg-slate-950" dir="rtl">
              <div className="border-b border-border p-5 dark:border-white/10">
                <Logo />
              </div>

              <nav className="flex flex-col gap-2 p-5">
                <div className="mb-3 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDarkMode((prev) => !prev)}
                    className="rounded-2xl border border-primary/15 bg-muted px-4 py-3 text-center font-black text-primary dark:border-white/10 dark:bg-white/10 dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
                  </button>

                  <button
                    onClick={() => setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'))}
                    className="rounded-2xl border border-primary/15 bg-muted px-4 py-3 text-center font-black text-primary dark:border-white/10 dark:bg-white/10 dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {language === 'ar' ? 'English' : 'العربية'}
                  </button>
                </div>

                {ALL_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
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
                    className="block w-full rounded-2xl bg-gradient-to-l from-[#f69e12] to-[#ffb84d] px-4 py-3 text-center font-black text-white shadow-lg"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    التسجيل الرسمي
                  </a>
                </div>
              </nav>
            </div>
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
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-primary-foreground/72 transition-all hover:bg-white/10 hover:text-accent"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        <Icon size={15} />
        {item.label}
      </NavLink>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground" dir="rtl">
      <div className="absolute inset-0 opacity-[0.035]">
        <IslamicPattern className="h-full w-full text-accent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1.4fr_0.9fr]">
          <div>
            <Logo light />

            <p className="mt-4 max-w-md text-sm leading-7 text-primary-foreground/72" style={{ fontFamily: "'Cairo', sans-serif" }}>
              مؤسسة حسن إبراهيم السبكي الخيرية لخدمة القرآن الكريم والمجتمع من خلال
              برامج التحفيظ والمسابقات القرآنية والمبادرات الخيرية.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a href="https://www.facebook.com/profile.php?id=61589030337086" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-[#1877F2]" aria-label="Facebook">
                <FacebookIcon />
              </a>

              <a href="https://www.facebook.com/alsobkiquran" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-[#1877F2]" aria-label="Facebook Quran">
                <FacebookIcon />
              </a>

              <a href="https://www.instagram.com/alsobki_charity" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-[#E4405F]" aria-label="Instagram">
                <InstagramIcon />
              </a>

              <a href="https://wa.me/200502570086" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white transition-all hover:-translate-y-1 hover:bg-green-600" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black text-accent" style={{ fontFamily: "'Cairo', sans-serif" }}>
              صفحات الموقع
            </h3>

            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {ALL_NAV_ITEMS.map((item) => (
                <FooterLink key={item.path} item={item} />
              ))}

              {LEGAL_NAV_ITEMS.map((item) => (
                <FooterLink key={item.path} item={item} />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black text-accent" style={{ fontFamily: "'Cairo', sans-serif" }}>
              تواصل معنا
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs text-primary-foreground/75" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <Phone size={16} className="text-accent" />
                <a href="tel:0502570086" className="transition-colors hover:text-accent">0502570086</a>
              </li>

              <li className="flex items-center gap-2 text-xs text-primary-foreground/75" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <Mail size={16} className="text-accent" />
                <a href="mailto:alsobkycharity@gmail.com" className="transition-colors hover:text-accent">
                  alsobkycharity@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-2 text-xs text-primary-foreground/75" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <MapPin size={16} className="text-accent" />
                <span>مصر</span>
              </li>
            </ul>

            <a
              href="https://wa.me/200502570086"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-xs font-black text-white transition-all hover:bg-green-600"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <WhatsAppIcon size={15} />
              تواصل واتساب
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-4">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 px-4 text-center sm:px-6 md:flex-row lg:px-10">
          <p className="text-[11px] text-primary-foreground/55" style={{ fontFamily: "'Cairo', sans-serif" }}>
            جميع الحقوق محفوظة © 2026 مؤسسة حسن إبراهيم السبكي الخيرية
          </p>

          <div className="flex flex-col items-center gap-1">
            <a
              href="https://wa.me/201008454029"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-black text-white transition-colors hover:text-accent"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              تم البرمجة بواسطة المهندس عمرو خالد
            </a>

            <a
              href="https://wa.me/201008454029"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1 text-[11px] font-bold text-white transition-all hover:bg-green-600"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <WhatsAppIcon size={14} />
              للتواصل
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300 dark:bg-slate-950 dark:text-white" dir="rtl">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
export function WhatsAppButton(): JSX.Element | null {
  return null;
}
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={handleClick}
          className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:bg-primary/90 active:scale-95"
          aria-label="العودة للأعلى"
        >
          <ChevronDown size={20} className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary"
    >
      <div className="relative h-32 w-32">
        <IslamicPattern className="absolute inset-0 text-accent opacity-20" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border-2 border-accent/40 border-t-accent"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/logo.jpg"
            alt="لوجو مؤسسة حسن إبراهيم السبكي الخيرية"
            className="h-20 w-20 object-contain"
          />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 text-center">
        <p className="text-lg font-bold text-primary-foreground" style={{ fontFamily: "'Cairo', sans-serif" }}>
          مؤسسة حسن إبراهيم السبكي الخيرية
        </p>

        <p className="mt-1 text-sm text-accent" style={{ fontFamily: "'Cairo', sans-serif" }}>
          للقرآن الكريم وخدمة المجتمع
        </p>
      </motion.div>
    </motion.div>
  );
}
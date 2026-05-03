import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MessageCircle,
  HeartHandshake,
  BookOpen,
  Trophy,
  Users,
  Handshake,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { Layout, SectionTitle, IslamicPattern, GoldDivider } from '@/components/Layout';
import { PARTNERS } from '@/data/index';
import { ROUTE_PATHS } from '@/lib/index';

type Lang = 'ar' | 'en';
type ThemeMode = 'dark' | 'light';

const WHATSAPP_NUMBER = '201153637371';
const LANGUAGE_STORAGE_KEY = 'site_language';

const THEME_STORAGE_KEYS = [
  'site_theme',
  'theme',
  'themeMode',
  'siteTheme',
  'appearance',
  'selectedTheme',
  'theme_mode',
  'color-theme',
  'colorTheme',
  'site_mode',
  'mode',
];

function normalizeTheme(value: string | null | undefined): ThemeMode | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();

  if (['dark', 'night', 'ليلي', 'dark-mode', 'darkmode', 'true'].includes(normalized)) {
    return 'dark';
  }

  if (['light', 'day', 'نهاري', 'فاتح', 'light-mode', 'lightmode', 'false'].includes(normalized)) {
    return 'light';
  }

  return null;
}

function applyThemeToDocument(nextTheme: ThemeMode) {
  document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  document.documentElement.classList.toggle('light', nextTheme === 'light');
  document.documentElement.setAttribute('data-theme', nextTheme);
  document.documentElement.setAttribute('data-bs-theme', nextTheme);
  document.body?.setAttribute('data-theme', nextTheme);
}

function readCurrentTheme(): ThemeMode {
  if (document.documentElement.classList.contains('dark')) return 'dark';
  if (document.documentElement.classList.contains('light')) return 'light';

  for (const key of THEME_STORAGE_KEYS) {
    const savedTheme = normalizeTheme(window.localStorage.getItem(key));
    if (savedTheme) return savedTheme;
  }

  return 'light';
}

function useSyncedTheme() {
  useEffect(() => {
    const syncTheme = () => {
      applyThemeToDocument(readCurrentTheme());
    };

    syncTheme();

    window.addEventListener('storage', syncTheme);
    window.addEventListener('focus', syncTheme);

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-bs-theme'],
    });

    return () => {
      window.removeEventListener('storage', syncTheme);
      window.removeEventListener('focus', syncTheme);
      observer.disconnect();
    };
  }, []);
}

function getSavedLanguage(): Lang {
  if (typeof window === 'undefined') return 'ar';

  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem('lang');

  if (saved === 'ar' || saved === 'en') return saved;

  return document.documentElement.lang === 'en' ? 'en' : 'ar';
}

function useCurrentLanguage() {
  const [lang, setLang] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const updateLang = () => {
      setLang(getSavedLanguage());
    };

    updateLang();

    const observer = new MutationObserver(() => {
      setLang(document.documentElement.lang === 'en' ? 'en' : 'ar');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    window.addEventListener('site-language-change', updateLang);
    window.addEventListener('storage', updateLang);

    return () => {
      observer.disconnect();
      window.removeEventListener('site-language-change', updateLang);
      window.removeEventListener('storage', updateLang);
    };
  }, []);

  return lang;
}

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function setPropertyMeta(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const content = {
  ar: {
    dir: 'rtl' as const,
    title: 'الدعم والتبرعات | مؤسسة حسن إبراهيم السبكي الخيرية',
    description:
      'ادعم مؤسسة حسن إبراهيم السبكي الخيرية في تحفيظ القرآن الكريم، مسابقات القرآن، تكريم حفظة كتاب الله، المبادرات التعليمية والخيرية وخدمة المجتمع.',
    keywords:
      'الدعم والتبرعات, مؤسسة حسن السبكي, تبرع لتحفيظ القرآن, دعم مسابقات القرآن, دعم حفظة القرآن, مؤسسة خيرية, خدمة المجتمع, مسابقة آل سبكي',
    heroTitle: 'الدعم والتبرعات',
    heroSubtitle:
      'ساهم معنا في دعم حلقات القرآن، وتكريم حفظة كتاب الله، وتنفيذ المبادرات الخيرية والمجتمعية، وبناء شراكات حقيقية تخدم القرآن والمجتمع.',
    supportTitle: 'طرق دعمك',
    supportSub: 'كل تبرع أو شراكة له أثر حقيقي في خدمة القرآن والمجتمع',
    donateTitle: 'كيف تتبرع؟',
    donateText:
      'تواصل معنا مباشرة عبر واتساب أو الهاتف أو البريد الإلكتروني، وسنوضح لك طرق التبرع المتاحة وكيفية وصول تبرعك لمستحقيه بكل شفافية.',
    contact: 'تواصل لمعرفة طرق التبرع',
    impactTitle: 'أثر تبرعك',
    impactSub: 'كيف يُحدث تبرعك فرقًا حقيقيًا',
    partnersTitle: 'الشركاء والداعمون',
    partnersSubtitle: 'نتشرف بكل من يساهم في دعم رسالة المؤسسة وخدمة كتاب الله',
    partnerCtaTitle: 'كن شريكًا معنا',
    partnerCtaText:
      'إذا كنت مؤسسة أو شركة أو هيئة وتود الشراكة مع مؤسسة حسن إبراهيم السبكي الخيرية، تواصل معنا وسنرحب بك.',
    partnerButton: 'تواصل للشراكة',
    email: 'alsobkycharity@gmail.com',
    phone: '+20 11 53637371',
    donateNow: 'تبرع الآن',
    whatsapp: 'تواصل واتساب',
    donationItems: [
      {
        icon: BookOpen,
        title: 'دعم تحفيظ القرآن',
        description:
          'مساهمة لدعم حلقات التحفيظ والمراجعة والأنشطة التعليمية المرتبطة بالقرآن الكريم.',
        amount: 'حسب المتاح',
      },
      {
        icon: Trophy,
        title: 'دعم مسابقات القرآن',
        description:
          'مساهمة في تنظيم الاختبارات والفعاليات وحفل التكريم والجوائز المعتمدة.',
        amount: 'حسب المتاح',
      },
      {
        icon: HeartHandshake,
        title: 'دعم الأسر والمبادرات',
        description:
          'مساهمة في الأنشطة الخيرية والمجتمعية التي تقدم الدعم والمساندة للأسر.',
        amount: 'حسب المتاح',
      },
      {
        icon: GraduationCap,
        title: 'دعم الأنشطة التعليمية',
        description:
          'مساهمة في البرامج التعليمية والتربوية التي تعزز القيم والارتباط بكتاب الله.',
        amount: 'حسب المتاح',
      },
    ],
    impact: [
      {
        icon: BookOpen,
        stat: '50 جنيه / شهر',
        title: 'يدعم طالب قرآن',
        desc: 'توفير المواد التعليمية والدعم لطالب في حلقة تحفيظ.',
      },
      {
        icon: Trophy,
        stat: '200 جنيه',
        title: 'تكريم فائز',
        desc: 'المساهمة في جوائز وتكريم حفظة القرآن الكريم.',
      },
      {
        icon: Users,
        stat: '500 جنيه / شهر',
        title: 'دعم أسرة',
        desc: 'مساعدة الأسر المحتاجة ضمن المبادرات الخيرية.',
      },
    ],
    partnerCards: [
      {
        icon: Building2,
        title: 'شراكات مؤسسية',
        text: 'تعاون مع مؤسسات وجهات داعمة لخدمة القرآن الكريم والمجتمع.',
      },
      {
        icon: HeartHandshake,
        title: 'دعم مجتمعي',
        text: 'مساندة الأنشطة الخيرية والتعليمية التي تحقق أثرًا حقيقيًا.',
      },
      {
        icon: Handshake,
        title: 'تعاون مستدام',
        text: 'بناء علاقات طويلة المدى قائمة على الثقة والشفافية.',
      },
    ],
    whatsappMessage: 'السلام عليكم، أريد معرفة طرق التبرع والدعم لمؤسسة حسن إبراهيم السبكي الخيرية.',
    partnershipMessage: 'السلام عليكم، أريد التواصل بخصوص شراكة أو دعم لمؤسسة حسن إبراهيم السبكي الخيرية.',
  },
  en: {
    dir: 'ltr' as const,
    title: 'Support & Donations | Hassan Ibrahim Al Sobky Charity Foundation',
    description:
      'Support Hassan Ibrahim Al Sobky Charity Foundation in Quran memorization, Quran competitions, honoring Quran memorizers, educational initiatives, charity work, and community service.',
    keywords:
      'support donations, Hassan Al Sobky Charity, Quran memorization donation, Quran competitions support, charity foundation Egypt, community service',
    heroTitle: 'Support & Donations',
    heroSubtitle:
      'Your support helps Quran memorization, honors Quran memorizers, funds charity initiatives, and builds meaningful partnerships.',
    supportTitle: 'Ways to Support',
    supportSub: 'Every donation or partnership creates real impact',
    donateTitle: 'How to Donate?',
    donateText:
      'Contact us directly via WhatsApp, phone, or email to learn about donation methods and how your support reaches those in need.',
    contact: 'Contact for donation details',
    impactTitle: 'Your Impact',
    impactSub: 'How your donation makes a difference',
    partnersTitle: 'Partners & Supporters',
    partnersSubtitle: 'We value everyone who supports the foundation’s mission and service to the Quran',
    partnerCtaTitle: 'Become a Partner',
    partnerCtaText:
      'If you are an organization, company, or entity interested in partnering with Hassan Ibrahim Al Sobky Charity Foundation, contact us and we will be glad to connect.',
    partnerButton: 'Contact for Partnership',
    email: 'alsobkycharity@gmail.com',
    phone: '+20 11 53637371',
    donateNow: 'Donate Now',
    whatsapp: 'WhatsApp Contact',
    donationItems: [
      {
        icon: BookOpen,
        title: 'Quran Memorization Support',
        description: 'Support Quran memorization circles, revision, and educational activities.',
        amount: 'As Available',
      },
      {
        icon: Trophy,
        title: 'Quran Competitions Support',
        description: 'Support tests, events, honoring ceremonies, and approved awards.',
        amount: 'As Available',
      },
      {
        icon: HeartHandshake,
        title: 'Families & Initiatives Support',
        description: 'Support charity and community activities that help families in need.',
        amount: 'As Available',
      },
      {
        icon: GraduationCap,
        title: 'Educational Activities Support',
        description: 'Support educational and moral programs connected to the Quran.',
        amount: 'As Available',
      },
    ],
    impact: [
      {
        icon: BookOpen,
        stat: '50 EGP / month',
        title: 'Support a student',
        desc: 'Help provide Quran education resources.',
      },
      {
        icon: Trophy,
        stat: '200 EGP',
        title: 'Honor a winner',
        desc: 'Support rewards and recognition.',
      },
      {
        icon: Users,
        stat: '500 EGP / month',
        title: 'Support a family',
        desc: 'Help families through charity programs.',
      },
    ],
    partnerCards: [
      {
        icon: Building2,
        title: 'Institutional Partnerships',
        text: 'Collaborating with organizations and supporters to serve the Quran and society.',
      },
      {
        icon: HeartHandshake,
        title: 'Community Support',
        text: 'Supporting charitable and educational activities that create real impact.',
      },
      {
        icon: Handshake,
        title: 'Sustainable Cooperation',
        text: 'Building long-term relationships based on trust and transparency.',
      },
    ],
    whatsappMessage: 'Hello, I would like to know donation and support methods for Hassan Ibrahim Al Sobky Charity Foundation.',
    partnershipMessage: 'Hello, I would like to contact you about partnership or support for Hassan Ibrahim Al Sobky Charity Foundation.',
  },
};

export default function Donations() {
  useSyncedTheme();

  const lang = useCurrentLanguage();
  const t = content[lang];

  useEffect(() => {
    document.title = t.title;
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;

    setMeta('description', t.description);
    setMeta('keywords', t.keywords);
    setMeta('robots', 'index, follow, max-image-preview:large');

    setPropertyMeta('og:title', t.title);
    setPropertyMeta('og:description', t.description);
    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:locale', lang === 'ar' ? 'ar_EG' : 'en_US');
    setPropertyMeta('og:image', `${window.location.origin}/images/logo.jpg`);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', t.title);
    setMeta('twitter:description', t.description);
    setMeta('twitter:image', `${window.location.origin}/images/logo.jpg`);

    window.scrollTo({ top: 0 });
  }, [lang, t.description, t.dir, t.keywords, t.title]);

  return (
    <Layout>
      <section
        className="relative overflow-hidden bg-primary pb-14 pt-28 dark:bg-slate-950 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-40"
        dir={t.dir}
      >
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="absolute -right-24 top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <GoldDivider />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-3xl text-sm leading-7 text-white/75 sm:text-base md:text-lg md:leading-8"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.heroSubtitle}
          </motion.p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={getWhatsAppLink(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-green-600"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <MessageCircle size={18} />
              {t.whatsapp}
            </a>

            <a
              href={`mailto:${t.email}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-black text-white transition-all hover:bg-white hover:text-primary"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Mail size={18} />
              {t.email}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-20 lg:py-24" dir={t.dir}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t.supportTitle} subtitle={t.supportSub} />

          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {t.donationItems.map((don, i) => {
              const Icon = don.icon;

              return (
                <motion.div
                  key={don.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`${t.dir === 'rtl' ? 'text-right' : 'text-left'} rounded-3xl border border-primary/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-white/10 dark:text-[#f69e12]">
                    <Icon size={25} />
                  </div>

                  <h3
                    className="mb-2 text-base font-black text-primary dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {don.title}
                  </h3>

                  <p
                    className="mb-4 text-sm leading-7 text-muted-foreground dark:text-white/70"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {don.description}
                  </p>

                  <div className="flex flex-col gap-3 border-t border-border pt-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                    <span
                      className="text-sm font-bold text-accent"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {don.amount}
                    </span>

                    <a
                      href={getWhatsAppLink(t.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-all hover:bg-primary/90"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      <MessageCircle size={16} />
                      {t.donateNow}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto max-w-3xl rounded-3xl border border-primary/10 bg-white p-6 text-center shadow-md dark:border-white/10 dark:bg-white/10 sm:p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-white/10 dark:text-[#f69e12]">
              <HeartHandshake size={22} />
            </div>

            <h3
              className="mb-2 text-xl font-black text-primary dark:text-white sm:text-2xl"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.donateTitle}
            </h3>

            <p
              className="mb-6 text-sm leading-7 text-muted-foreground dark:text-white/70"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.donateText}
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="tel:+201153637371"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <Phone size={16} />
                {t.phone}
              </a>

              <a
                href={getWhatsAppLink(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-green-600"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <MessageCircle size={16} />
                {t.whatsapp}
              </a>

              <a
                href={`mailto:${t.email}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white dark:border-white/20 dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <Mail size={16} />
                {t.email}
              </a>

              <Link
                to={ROUTE_PATHS.CONTACT}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/20 py-16 dark:bg-slate-900 sm:py-20 lg:py-24" dir={t.dir}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t.impactTitle} subtitle={t.impactSub} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
            {t.impact.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-3xl border border-primary/10 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
                >
                  <Icon className="mx-auto mb-3 text-accent" size={28} />

                  <div className="mb-1 text-sm font-black text-accent">
                    {item.stat}
                  </div>

                  <h3
                    className="mb-1 text-sm font-black text-primary dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-xs leading-6 text-muted-foreground dark:text-white/65"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-20 lg:py-24" dir={t.dir}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t.partnersTitle} subtitle={t.partnersSubtitle} />

          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
            {t.partnerCards.map((card, i) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`${t.dir === 'rtl' ? 'text-right' : 'text-left'} rounded-3xl border border-primary/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10`}
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#279782]/10 text-[#279782] dark:bg-white/10 dark:text-[#f69e12]">
                    <Icon size={24} />
                  </div>

                  <h3
                    className="mb-2 text-base font-black text-primary dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="text-sm leading-7 text-muted-foreground dark:text-white/65"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {card.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {PARTNERS.length > 0 && (
            <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
              {PARTNERS.map((partner, i) => (
                <motion.div
                  key={`${partner.name}-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-3xl border border-primary/10 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name || 'Partner'}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto h-14 w-full object-contain"
                    />
                  ) : (
                    <Building2 className="mx-auto mb-3 text-accent" size={30} />
                  )}

                  {partner.name && (
                    <p
                      className="mt-3 text-xs font-bold text-primary dark:text-white sm:text-sm"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {partner.name}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <div className="mx-auto max-w-xl rounded-3xl border border-primary/10 bg-primary/5 p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-8">
            <h3
              className="mb-2 text-xl font-black text-primary dark:text-white"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.partnerCtaTitle}
            </h3>

            <p
              className="mb-5 text-sm leading-7 text-muted-foreground dark:text-white/70"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.partnerCtaText}
            </p>

            <a
              href={getWhatsAppLink(t.partnershipMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <MessageCircle size={17} />
              {t.partnerButton}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
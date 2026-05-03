import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
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

function useCurrentLanguage() {
  const [lang, setLang] = useState<Lang>(
    document.documentElement.lang === 'en' ? 'en' : 'ar'
  );

  useEffect(() => {
    const updateLang = () => {
      setLang(document.documentElement.lang === 'en' ? 'en' : 'ar');
    };

    updateLang();

    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  return lang;
}

const content = {
  ar: {
    dir: 'rtl' as const,
    title: 'الدعم والتبرعات | مؤسسة حسن إبراهيم السبكي الخيرية',
    heroTitle: 'الدعم والتبرعات',
    heroSubtitle:
      'ساهم معنا في دعم حلقات القرآن، وتكريم حفظة كتاب الله، وتنفيذ المبادرات الخيرية والمجتمعية، وبناء شراكات حقيقية تخدم القرآن والمجتمع.',
    supportTitle: 'طرق دعمك',
    supportSub: 'كل تبرع أو شراكة له أثر حقيقي في خدمة القرآن والمجتمع',
    donateTitle: 'كيف تتبرع؟',
    donateText:
      'تواصل معنا مباشرة وسنوضح لك طرق التبرع المتاحة وكيفية وصول تبرعك لمستحقيه بكل شفافية.',
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
    donateNow: 'تبرع الآن',
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
  },
  en: {
    dir: 'ltr' as const,
    title: 'Support & Donations | Hassan Ibrahim Al Sobky Charity Foundation',
    heroTitle: 'Support & Donations',
    heroSubtitle:
      'Your support helps Quran memorization, honors Quran memorizers, funds charity initiatives, and builds meaningful partnerships.',
    supportTitle: 'Ways to Support',
    supportSub: 'Every donation or partnership creates real impact',
    donateTitle: 'How to Donate?',
    donateText:
      'Contact us directly to learn about donation methods and how your support reaches those in need.',
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
    donateNow: 'Donate Now',
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
  },
};

export default function Donations() {
  useSyncedTheme();

  const lang = useCurrentLanguage();
  const t = content[lang];

  useEffect(() => {
    document.title = t.title;
    window.scrollTo({ top: 0 });
  }, [t.title]);

  return (
    <Layout>
      <section
        className="relative overflow-hidden bg-primary pb-16 pt-32 dark:bg-slate-950 sm:pb-20 sm:pt-44"
        dir={t.dir}
      >
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <GoldDivider />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 mt-4 text-3xl font-black text-white sm:text-5xl md:text-6xl"
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
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-24" dir={t.dir}>
        <div className="mx-auto max-w-7xl px-4">
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
                  className="rounded-2xl border border-primary/10 bg-white p-5 text-right shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-white/10 dark:text-[#f69e12]">
                    <Icon size={25} />
                  </div>

                  <h3
                    className="mb-2 text-base font-bold text-primary dark:text-white"
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

                  <div className="flex items-center justify-between border-t border-border pt-4 dark:border-white/10">
                    <span
                      className="text-sm font-bold text-accent"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {don.amount}
                    </span>

                    <Link
                      to={ROUTE_PATHS.CONTACT}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-all hover:bg-primary/90"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {t.donateNow}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto max-w-2xl rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-md dark:border-white/10 dark:bg-white/10 sm:p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-white/10 dark:text-[#f69e12]">
              <HeartHandshake size={22} />
            </div>

            <h3
              className="mb-2 text-xl font-bold text-primary dark:text-white sm:text-2xl"
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

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="tel:0502570086"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
              >
                <Phone size={16} />
                0502570086
              </a>

              <a
                href={`mailto:${t.email}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white dark:border-white/20 dark:text-white"
              >
                <Mail size={16} />
                {t.email}
              </a>

              <Link
                to={ROUTE_PATHS.CONTACT}
                className="rounded-lg bg-accent px-5 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
              >
                {t.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/20 py-16 dark:bg-slate-900 sm:py-24" dir={t.dir}>
        <div className="mx-auto max-w-7xl px-4">
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
                  className="rounded-2xl border border-primary/10 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
                >
                  <Icon className="mx-auto mb-3 text-accent" size={28} />

                  <div className="mb-1 text-sm font-black text-accent">
                    {item.stat}
                  </div>

                  <h3
                    className="mb-1 text-sm font-bold text-primary dark:text-white"
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

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-24" dir={t.dir}>
        <div className="mx-auto max-w-7xl px-4">
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
                  className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#279782]/10 text-[#279782] dark:bg-white/10 dark:text-[#f69e12]">
                    <Icon size={24} />
                  </div>

                  <h3
                    className="mb-2 text-base font-bold text-primary dark:text-white"
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
                  className="rounded-2xl border border-primary/10 bg-white p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/10"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name || 'Partner'}
                      loading="lazy"
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

          <div className="mx-auto max-w-xl rounded-2xl border border-primary/10 bg-primary/5 p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/10">
            <h3
              className="mb-2 text-xl font-bold text-primary dark:text-white"
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

            <Link
              to={ROUTE_PATHS.CONTACT}
              className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.partnerButton}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
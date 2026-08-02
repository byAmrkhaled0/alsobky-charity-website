import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Trophy,
  Mic2,
  GraduationCap,
  HandHeart,
  Users,
  ShieldCheck,
  Music,
  RefreshCw,
} from 'lucide-react';
import { Layout, SectionTitle, IslamicPattern, GoldDivider } from '@/components/Layout';
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

function readStoredTheme(): ThemeMode {
  for (const key of THEME_STORAGE_KEYS) {
    const savedTheme = normalizeTheme(window.localStorage.getItem(key));
    if (savedTheme) return savedTheme;
  }

  if (document.documentElement.classList.contains('dark')) return 'dark';

  return 'light';
}

function useSyncedTheme() {
  useEffect(() => {
    const syncTheme = () => {
      applyThemeToDocument(readStoredTheme());
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
    title: 'خدماتنا | مؤسسة حسن إبراهيم السبكي الخيرية',
    heroTitle: 'مجالات عمل المؤسسة',
    heroSubtitle: 'نعمل في مجالات متكاملة لخدمة القرآن الكريم والمجتمع',
    badge: 'خدمات قرآنية وخيرية ومجتمعية',
    academyTitle: 'أكاديمية القرآن والعلوم الشرعية',
    academySubtitle: 'بيئة تعليمية متكاملة لتحفيظ القرآن وتعليم علومه للأطفال والشباب',
    academyAboutTitle: 'عن الأكاديمية',
    academyAboutText:
      'أكاديمية متكاملة لتحفيظ القرآن الكريم، وتعليم التجويد، ومراجعة الحفظ، وتقديم العلوم الشرعية بأسلوب مبسط يناسب الأطفال والشباب مع متابعة مستمرة.',
    academyRegister: 'التسجيل في الأكاديمية',
    academyProgramsTitle: 'برامج الأكاديمية',
    academyProgramsSubtitle: 'منهج متكامل يجمع بين الحفظ والتجويد والمتابعة',
    ctaTitle: 'هل تريد التسجيل أو الاستفسار؟',
    ctaText: 'تواصل معنا لمعرفة تفاصيل التحفيظ، المسابقات، التطوع، أو المبادرات الخيرية.',
    contact: 'تواصل معنا للمزيد',
    register: 'التسجيل الرسمي',
    services: [
      {
        icon: BookOpen,
        title: 'تحفيظ القرآن الكريم',
        description:
          'برامج منظمة لتحفيظ القرآن الكريم للأطفال والشباب مع المتابعة والمراجعة والتشجيع المستمر.',
      },
      {
        icon: Trophy,
        title: 'مسابقة آل سبكي للقرآن الكريم',
        description:
          'مسابقة قرآنية سنوية لحفظ القرآن الكريم على مستويات مختلفة، بهدف تشجيع حفظة كتاب الله وتكريم المتميزين.',
      },
      {
        icon: Mic2,
        title: 'مسابقة ورتّل',
        description:
          'مسابقة لاكتشاف المواهب الصوتية في تلاوة القرآن الكريم وصقل الأداء وتحسين جمال الترتيل.',
      },
      {
        icon: GraduationCap,
        title: 'أكاديمية القرآن والعلوم الشرعية',
        description:
          'برامج تعليمية تهتم بالقرآن الكريم، والتجويد، والعلوم الشرعية المناسبة للأطفال والشباب.',
      },
      {
        icon: HandHeart,
        title: 'المبادرات الخيرية',
        description:
          'دعم المبادرات التي تخدم المجتمع وتساعد الأسر والمحتاجين وتعزز قيم الرحمة والتعاون.',
      },
      {
        icon: Users,
        title: 'التطوع وتنظيم الفعاليات',
        description:
          'فتح المجال للمشاركة في تنظيم المسابقات والفعاليات وخدمة المجتمع من خلال العمل التطوعي المنظم.',
      },
      {
        icon: ShieldCheck,
        title: 'تعزيز القيم والأخلاق',
        description:
          'ترسيخ قيم الأمانة، الإخلاص، الاحترام، الانضباط، وحب الخير بجانب التعليم القرآني.',
      },
    ],
    academyPrograms: [
      {
        icon: BookOpen,
        title: 'تحفيظ القرآن للأطفال',
        description: 'برامج متدرجة لتحفيظ القرآن الكريم حتى الختم الكامل.',
      },
      {
        icon: Music,
        title: 'تعليم التجويد',
        description: 'دروس عملية في أحكام التجويد ومخارج الحروف.',
      },
      {
        icon: RefreshCw,
        title: 'مراجعة الحفظ',
        description: 'جلسات مستمرة لتثبيت الحفظ وتحسين التلاوة.',
      },
      {
        icon: GraduationCap,
        title: 'علوم شرعية',
        description: 'تفسير، حديث، فقه بأسلوب مبسط يناسب الأطفال والشباب.',
      },
      {
        icon: Trophy,
        title: 'مسابقات داخلية',
        description: 'مسابقات لتحفيز الطلاب وتكريم المتميزين داخل الأكاديمية.',
      },
      {
        icon: Users,
        title: 'متابعة أولياء الأمور',
        description: 'تقارير دورية عن مستوى الطالب وتطور الحفظ والمراجعة.',
      },
    ],
  },
  en: {
    dir: 'ltr' as const,
    title: 'Services | Hassan Ibrahim Al Sobky Charity Foundation',
    heroTitle: 'Foundation Fields of Work',
    heroSubtitle: 'Integrated services for Quran education and community support',
    badge: 'Quran, charity, and community services',
    academyTitle: 'Quran and Islamic Sciences Academy',
    academySubtitle: 'A complete environment for Quran memorization and Islamic education',
    academyAboutTitle: 'About the Academy',
    academyAboutText:
      'A comprehensive academy for Quran memorization, tajweed learning, revision, and simplified Islamic studies for children and youth with continuous follow-up.',
    academyRegister: 'Register in the Academy',
    academyProgramsTitle: 'Academy Programs',
    academyProgramsSubtitle: 'An integrated system combining memorization, tajweed, and follow-up',
    ctaTitle: 'Want to register or ask a question?',
    ctaText: 'Contact us to learn more about memorization, competitions, volunteering, or charity initiatives.',
    contact: 'Contact Us',
    register: 'Official Registration',
    services: [
      {
        icon: BookOpen,
        title: 'Quran Memorization',
        description:
          'Structured Quran memorization programs for children and youth with continuous follow-up and revision.',
      },
      {
        icon: Trophy,
        title: 'Al Sobky Quran Competition',
        description:
          'An annual Quran competition with different memorization levels to encourage and honor Quran memorizers.',
      },
      {
        icon: Mic2,
        title: 'Wartel Competition',
        description:
          'A competition for discovering distinguished Quran recitation voices and improving recitation performance.',
      },
      {
        icon: GraduationCap,
        title: 'Quran and Islamic Sciences Academy',
        description:
          'Educational programs focused on Quran learning, tajweed, and suitable Islamic sciences for children and youth.',
      },
      {
        icon: HandHeart,
        title: 'Charitable Initiatives',
        description:
          'Supporting initiatives that serve society, help families in need, and promote mercy and cooperation.',
      },
      {
        icon: Users,
        title: 'Volunteering and Events',
        description:
          'Opportunities to participate in organizing competitions, events, and community service activities.',
      },
      {
        icon: ShieldCheck,
        title: 'Values and Ethics',
        description:
          'Promoting honesty, sincerity, respect, discipline, and love of goodness alongside Quran education.',
      },
    ],
    academyPrograms: [
      {
        icon: BookOpen,
        title: 'Quran Memorization for Kids',
        description: 'Structured Quran memorization programs for all levels.',
      },
      {
        icon: Music,
        title: 'Tajweed Learning',
        description: 'Practical tajweed rules and pronunciation training.',
      },
      {
        icon: RefreshCw,
        title: 'Revision Sessions',
        description: 'Continuous revision sessions to strengthen memorization.',
      },
      {
        icon: GraduationCap,
        title: 'Islamic Studies',
        description: 'Tafsir, Hadith, and Fiqh in simple ways.',
      },
      {
        icon: Trophy,
        title: 'Internal Competitions',
        description: 'Competitions to motivate and reward students.',
      },
      {
        icon: Users,
        title: 'Parent Tracking',
        description: 'Regular reports for parents about student progress.',
      },
    ],
  },
};

export default function Services() {
  useSyncedTheme();

  const lang = useCurrentLanguage();
  const t = content[lang];
  const isArabic = lang === 'ar';

  useEffect(() => {
    document.title = t.title;
    window.scrollTo({ top: 0 });
  }, [t.title]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-primary pb-20 pt-44 dark:bg-slate-950" dir={t.dir}>
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
          <GoldDivider />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-accent backdrop-blur"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-black leading-tight text-white md:text-6xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-3xl text-base leading-8 text-white/75 md:text-lg"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-24 dark:bg-slate-950" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.heroTitle} subtitle={t.heroSubtitle} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map((service, i) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`group rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                    isArabic ? 'text-right' : 'text-left'
                  } ${i === 6 ? 'lg:col-start-2' : ''}`}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] transition-all group-hover:bg-[#279782] group-hover:text-white dark:bg-white/10 dark:text-[#f69e12]">
                    <Icon size={29} />
                  </div>

                  <h3
                    className="mb-3 text-xl font-black text-primary dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-sm leading-8 text-muted-foreground dark:text-white/65"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24 dark:bg-slate-900" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.academyTitle} subtitle={t.academySubtitle} />

          <div className="mb-16 grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={isArabic ? 'text-right' : 'text-left'}
            >
              <span
                className="mb-4 inline-flex rounded-full border border-[#f69e12]/25 bg-[#f69e12]/10 px-4 py-2 text-sm font-black text-[#279782] dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.academyTitle}
              </span>

              <h2
                className="mb-4 text-3xl font-black leading-tight text-primary dark:text-white md:text-4xl"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.academyAboutTitle}
              </h2>

              <p
                className="mb-6 text-base leading-9 text-muted-foreground dark:text-white/70"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.academyAboutText}
              </p>

              <Link
                to={ROUTE_PATHS.CONTACT}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-1 hover:brightness-110 dark:bg-[#f69e12]"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.academyRegister}
                <ArrowLeft size={17} className={isArabic ? '' : 'rotate-180'} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isArabic ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl dark:bg-white/10"
            >
              <img
                src="/images/c1.jpg"
                alt={t.academyTitle}
                loading="lazy"
                className="h-[250px] w-full rounded-[1.5rem] object-contain sm:h-[370px]"
              />
            </motion.div>
          </div>

          <SectionTitle title={t.academyProgramsTitle} subtitle={t.academyProgramsSubtitle} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.academyPrograms.map((program, i) => {
              const Icon = program.icon;

              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f69e12]/15 text-[#f69e12]">
                    <Icon size={29} />
                  </div>

                  <h3
                    className="mb-3 text-xl font-black text-primary dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {program.title}
                  </h3>

                  <p
                    className="text-sm leading-8 text-muted-foreground dark:text-white/65"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {program.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-14" dir={t.dir}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <GoldDivider />

          <h2
            className="mb-3 mt-3 text-2xl font-black text-white md:text-3xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.ctaTitle}
          </h2>

          <p
            className="mx-auto mb-6 max-w-2xl text-sm leading-8 text-white/80 md:text-base"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.ctaText}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://alsobky.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#f69e12] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.register}
              <ArrowLeft size={17} className={isArabic ? '' : 'rotate-180'} />
            </a>

            <Link
              to={ROUTE_PATHS.CONTACT}
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-white/90"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
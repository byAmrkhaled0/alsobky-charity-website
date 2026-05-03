import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  BookOpen,
  HeartHandshake,
  Search,
  Sparkles,
  Users,
  CalendarDays,
  Trophy,
  Eye,
  Target,
  Gem,
  HandHeart,
  GraduationCap,
  Mic2,
  Image as ImageIcon,
  MessageCircle,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { Layout, IslamicPattern, SectionTitle, GoldDivider } from '@/components/Layout';
import { ROUTE_PATHS } from '@/lib/index';

type Lang = 'ar' | 'en';

const fadeUp = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const images = [
  '/images/d3.jpg',
  '/images/g1.jpg',
  '/images/s1.jpg',
  '/images/j1.jpg',
  '/images/h1.jpg',
  '/images/t1.jpg',
];

const text = {
  ar: {
    dir: 'rtl' as const,
    title: 'مؤسسة حسن إبراهيم السبكي الخيرية | تحفيظ القرآن وخدمة المجتمع',
    description:
      'مؤسسة حسن إبراهيم السبكي الخيرية تهتم بتحفيظ القرآن الكريم، وتنظيم مسابقات القرآن، ومسابقة ورتل، ودعم المبادرات الخيرية وخدمة المجتمع في مصر.',
    keywords:
      'مؤسسة حسن السبكي, حسن إبراهيم السبكي, تحفيظ القرآن, مسابقة القرآن, مسابقة ورتل, مؤسسة خيرية, القرآن الكريم, خدمة المجتمع, الدقهلية, مصر',
    badge: '9 سنوات من العطاء لخدمة القرآن والمجتمع',
    hero1: 'مؤسسة حسن إبراهيم',
    hero2: 'السبكي الخيرية',
    heroDesc:
      'نرعى أهل القرآن، وننظم المسابقات القرآنية، وندعم المبادرات الخيرية والمجتمعية لبناء أثر حقيقي يبقى في حياة الناس.',
    officialRegister: 'التسجيل الرسمي',
    officialInquiry: 'الاستعلام الرسمي',
    contactUs: 'تواصل معنا',
    features: [
      { icon: BookOpen, title: 'تحفيظ القرآن', text: 'برامج قرآنية منظمة للأطفال والشباب.' },
      { icon: Award, title: 'مسابقات قرآنية', text: 'تكريم وتشجيع حفظة كتاب الله.' },
      { icon: HeartHandshake, title: 'خدمة المجتمع', text: 'مبادرات خيرية ومجتمعية مؤثرة.' },
    ],
    logoSubtitle: 'للقرآن الكريم وخدمة المجتمع',
    logoTitle: 'نرعى أهل القرآن',
    aboutTitle: 'عن مؤسسة حسن إبراهيم السبكي الخيرية',
    aboutSubtitle: 'مؤسسة تهدف إلى خدمة القرآن الكريم وخدمة المجتمع',
    aboutP1:
      'مؤسسة حسن إبراهيم السبكي الخيرية تعمل على خدمة القرآن الكريم وخدمة المجتمع من خلال برامج تعليمية ودينية ومجتمعية تساعد على بناء جيل مرتبط بكتاب الله وقيم الخير والعطاء.',
    aboutP2:
      'تهتم المؤسسة بتنظيم المسابقات القرآنية، وتشجيع الأطفال والشباب على الحفظ والتلاوة، بجانب دعم المبادرات المجتمعية والأنشطة الخيرية لتكون رافدًا حقيقيًا للخير في المجتمع.',
    knowMore: 'اعرف أكثر',
    years: 'سنوات من العطاء',
    visionCards: [
      { icon: Eye, title: 'الرؤية', content: 'نشر الخير وربط الأجيال بكتاب الله.', color: 'from-primary/10 to-primary/5' },
      { icon: Target, title: 'الرسالة', content: 'رعاية حفظة القرآن الكريم ودعم المجتمع ببرامج خيرية وتعليمية منظمة.', color: 'from-[#f69e12]/15 to-[#f69e12]/5' },
      { icon: Gem, title: 'القيم', content: 'الإخلاص، الأمانة، العطاء، الشفافية، خدمة المجتمع.', color: 'from-primary/10 to-primary/5' },
    ],
    statsTitle: 'أرقام تتحدث بنفسها',
    statsSubtitle: 'إنجازات حققناها معًا بفضل الله ثم بدعم أهل الخير',
    stats: [
      { number: '10,000+', label: 'متسابق في آخر عام' },
      { number: '1,800+', label: 'فائز سابق' },
      { number: '22+', label: 'فعالية ومسابقة' },
      { number: '9+', label: 'سنوات من العطاء' },
    ],
    servicesTitle: 'مجالات عمل المؤسسة',
    servicesSubtitle: 'نعمل في مجالات متكاملة لخدمة القرآن الكريم والمجتمع',
    services: [
      { icon: BookOpen, title: 'تحفيظ القرآن الكريم', description: 'برامج تعليمية منظمة لتحفيظ القرآن للأطفال والشباب مع متابعة مستمرة.' },
      { icon: Trophy, title: 'مسابقة آل سبكي للقرآن', description: 'مسابقة قرآنية سنوية لتشجيع وتكريم حفظة كتاب الله.' },
      { icon: Mic2, title: 'مسابقة ورتل', description: 'مسابقة لاكتشاف المواهب الصوتية في تلاوة القرآن الكريم وصقل الأداء.' },
      { icon: GraduationCap, title: 'أكاديمية القرآن والعلوم الشرعية', description: 'برامج لتعليم القرآن وعلومه والتجويد والعلوم الشرعية المناسبة للنشء.' },
      { icon: HandHeart, title: 'المبادرات الخيرية', description: 'دعم أنشطة الخير وخدمة المجتمع ومساندة الأسر والمحتاجين.' },
      { icon: Users, title: 'التطوع وتنظيم الفعاليات', description: 'فتح المجال للمشاركة في تنظيم المسابقات والأنشطة المجتمعية.' },
    ],
    hiddenTitle: 'روابط سريعة لكل خدمات المؤسسة',
    hiddenSubtitle: 'انتقل مباشرة إلى الصفحات المهمة داخل الموقع',
    quickLinks: [
      { icon: Trophy, title: 'المسابقات والفائزون', text: 'تفاصيل مسابقات القرآن وقائمة الفائزين.', to: ROUTE_PATHS.COMPETITIONS },
      { icon: ImageIcon, title: 'معرض الصور', text: 'صور الفعاليات والتكريم والتحفيظ.', to: ROUTE_PATHS.GALLERY },
      { icon: HandHeart, title: 'الدعم والتبرعات', text: 'طرق الدعم والشراكات والمبادرات.', to: ROUTE_PATHS.DONATIONS },
      { icon: MessageCircle, title: 'تواصل والأسئلة الشائعة', text: 'راسل المؤسسة واعرف الإجابات المهمة.', to: ROUTE_PATHS.CONTACT },
      { icon: ShieldCheck, title: 'سياسة الخصوصية', text: 'تعرف على سياسة استخدام البيانات.', to: ROUTE_PATHS.PRIVACY || '/privacy' },
      { icon: FileText, title: 'الشروط والأحكام', text: 'الشروط المنظمة لاستخدام الموقع.', to: ROUTE_PATHS.TERMS || '/terms' },
    ],
    newsTitle: 'آخر الأنشطة والفعاليات',
    newsSubtitle: 'تابع أبرز مجالات نشاط المؤسسة',
    news: [
      { title: 'مسابقة آل سبكي للقرآن الكريم', text: 'مسابقة سنوية لتكريم حفظة القرآن وتشجيع الأطفال والشباب على الحفظ والمراجعة.' },
      { title: 'مسابقة ورتل', text: 'مسابقة تهتم بجمال التلاوة وحسن الأداء واكتشاف الأصوات القرآنية المميزة.' },
      { title: 'أنشطة خدمة المجتمع', text: 'فعاليات ومبادرات خيرية ومجتمعية لخدمة الناس وتعزيز قيم العطاء.' },
    ],
    allEvents: 'عرض تفاصيل المسابقات',
    galleryTitle: 'معرض الصور',
    gallerySubtitle: 'لحظات من رحلة الخير والعطاء',
    allPhotos: 'عرض كل الصور',
    galleryBadge: 'أنشطة المؤسسة',
    galleryItems: ['فعاليات قرآنية', 'تكريم الفائزين', 'مسابقات الأطفال', 'حلقات التحفيظ', 'مبادرات خيرية', 'خدمة المجتمع'],
    ctaTitle: 'انضم إلى رحلة الخير',
    ctaDesc:
      'سواء كنت راغبًا في المشاركة في المسابقات، أو التحفيظ، أو التبرع، أو التطوع، بابنا مفتوح لكل من يريد أن يصنع أثرًا يبقى.',
    competition: 'سجل في المسابقة',
    donate: 'تبرع الآن',
  },
  en: {
    dir: 'ltr' as const,
    title: 'Hassan Ibrahim Al Sobky Charity Foundation | Quran & Community Service',
    description:
      'Hassan Ibrahim Al Sobky Charity Foundation supports Quran memorization, Quran competitions, Wartel recitation competition, charitable initiatives, and community service in Egypt.',
    keywords:
      'Hassan Al Sobky Charity, Quran memorization, Quran competition, Wartel competition, charity foundation, community service, Egypt',
    badge: '9 years of giving for Quran and community service',
    hero1: 'Hassan Ibrahim',
    hero2: 'Al Sobky Charity Foundation',
    heroDesc:
      'We support Quran learners, organize Quran competitions, and empower charitable and community initiatives that create lasting impact.',
    officialRegister: 'Official Registration',
    officialInquiry: 'Official Inquiry',
    contactUs: 'Contact Us',
    features: [
      { icon: BookOpen, title: 'Quran Memorization', text: 'Structured Quran programs for children and youth.' },
      { icon: Award, title: 'Quran Competitions', text: 'Honoring and encouraging Quran memorizers.' },
      { icon: HeartHandshake, title: 'Community Service', text: 'Meaningful charitable and community initiatives.' },
    ],
    logoSubtitle: 'For Quran and Community Service',
    logoTitle: 'Supporting Quran Learners',
    aboutTitle: 'About Hassan Ibrahim Al Sobky Charity Foundation',
    aboutSubtitle: 'A foundation serving the Quran and the community',
    aboutP1:
      'Hassan Ibrahim Al Sobky Charity Foundation serves the Quran and the community through educational, religious, and social programs that help build a generation connected to the Book of Allah and the values of giving.',
    aboutP2:
      'The foundation organizes Quran competitions, encourages children and youth to memorize and recite, and supports charitable and community initiatives that create real positive impact.',
    knowMore: 'Learn More',
    years: 'Years of Giving',
    visionCards: [
      { icon: Eye, title: 'Vision', content: 'Spreading goodness and connecting generations to the Quran.', color: 'from-primary/10 to-primary/5' },
      { icon: Target, title: 'Mission', content: 'Supporting Quran memorizers and serving society through organized charity programs.', color: 'from-[#f69e12]/15 to-[#f69e12]/5' },
      { icon: Gem, title: 'Values', content: 'Sincerity, honesty, giving, transparency, and community service.', color: 'from-primary/10 to-primary/5' },
    ],
    statsTitle: 'Numbers That Speak',
    statsSubtitle: 'Achievements made possible by Allah’s grace and the support of good people',
    stats: [
      { number: '10,000+', label: 'Contestants last year' },
      { number: '1,800+', label: 'Previous winners' },
      { number: '22+', label: 'Events and competitions' },
      { number: '9+', label: 'Years of giving' },
    ],
    servicesTitle: 'Our Fields of Work',
    servicesSubtitle: 'Integrated areas serving the Quran and the community',
    services: [
      { icon: BookOpen, title: 'Quran Memorization', description: 'Structured programs for children and youth with continuous educational follow-up.' },
      { icon: Trophy, title: 'Al Sobky Quran Competition', description: 'An annual Quran competition to encourage and honor memorizers of the Quran.' },
      { icon: Mic2, title: 'Wartel Competition', description: 'A competition focused on beautiful recitation and discovering distinguished Quran voices.' },
      { icon: GraduationCap, title: 'Quran and Islamic Sciences Academy', description: 'Programs for Quran learning, tajweed, and suitable Islamic studies for young learners.' },
      { icon: HandHeart, title: 'Charitable Initiatives', description: 'Supporting charitable activities, community service, families, and people in need.' },
      { icon: Users, title: 'Volunteering and Events', description: 'Opportunities to participate in organizing competitions and community activities.' },
    ],
    hiddenTitle: 'Quick Access to Foundation Pages',
    hiddenSubtitle: 'Go directly to the important pages inside the website',
    quickLinks: [
      { icon: Trophy, title: 'Competitions & Winners', text: 'Quran competitions details and winners list.', to: ROUTE_PATHS.COMPETITIONS },
      { icon: ImageIcon, title: 'Photo Gallery', text: 'Photos of events, honoring, and memorization activities.', to: ROUTE_PATHS.GALLERY },
      { icon: HandHeart, title: 'Support & Donations', text: 'Donation, support, partnership, and charity initiatives.', to: ROUTE_PATHS.DONATIONS },
      { icon: MessageCircle, title: 'Contact & FAQ', text: 'Contact the foundation and find common answers.', to: ROUTE_PATHS.CONTACT },
      { icon: ShieldCheck, title: 'Privacy Policy', text: 'Learn how data is handled on the website.', to: ROUTE_PATHS.PRIVACY || '/privacy' },
      { icon: FileText, title: 'Terms & Conditions', text: 'Read the website usage terms.', to: ROUTE_PATHS.TERMS || '/terms' },
    ],
    newsTitle: 'Latest Activities & Events',
    newsSubtitle: 'Follow the foundation’s main activity areas',
    news: [
      { title: 'Al Sobky Quran Competition', text: 'An annual competition that honors Quran memorizers and encourages children and youth to memorize and review.' },
      { title: 'Wartel Competition', text: 'A competition focused on beautiful Quran recitation and discovering distinguished recitation talents.' },
      { title: 'Community Service Activities', text: 'Charitable and community initiatives that serve people and promote the values of giving.' },
    ],
    allEvents: 'View Competition Details',
    galleryTitle: 'Photo Gallery',
    gallerySubtitle: 'Moments from the journey of giving',
    allPhotos: 'View All Photos',
    galleryBadge: 'Foundation Activities',
    galleryItems: ['Quran Events', 'Winners Honoring', 'Children Competitions', 'Memorization Sessions', 'Charity Initiatives', 'Community Service'],
    ctaTitle: 'Join the Journey of Goodness',
    ctaDesc:
      'Whether you want to join competitions, Quran memorization, donations, or volunteering, our door is open to everyone who wants to create lasting impact.',
    competition: 'Join Competition',
    donate: 'Donate Now',
  },
};

function useCurrentLanguage() {
  const [lang, setLang] = useState<Lang>(document.documentElement.lang === 'en' ? 'en' : 'ar');

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

export default function Home() {
  const lang = useCurrentLanguage();
  const t = text[lang];
  const isArabic = lang === 'ar';

  useEffect(() => {
    document.title = t.title;
    setMeta('description', t.description);
    setMeta('keywords', t.keywords);
    setMeta('robots', 'index, follow');
    setMeta('author', isArabic ? 'مؤسسة حسن إبراهيم السبكي الخيرية' : 'Hassan Ibrahim Al Sobky Charity Foundation');

    setPropertyMeta('og:title', t.title);
    setPropertyMeta('og:description', t.description);
    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:locale', isArabic ? 'ar_EG' : 'en_US');
    setPropertyMeta('og:image', '/images/logo.jpg');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', t.title);
    setMeta('twitter:description', t.description);
    setMeta('twitter:image', '/images/logo.jpg');

    const canonicalHref = window.location.origin + window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', canonicalHref);
  }, [t.title, t.description, t.keywords, isArabic]);

  return (
    <Layout>
      <section className="relative min-h-screen overflow-hidden bg-[#f8f4ea] pt-32 dark:bg-slate-950 sm:pt-40" dir={t.dir}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,158,18,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(39,151,130,0.25),transparent_38%)]" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[#279782]/20 to-transparent" />

        <div className="absolute inset-0 opacity-[0.06]">
          <IslamicPattern className="h-full w-full text-primary" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-130px)] max-w-[1500px] grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10">
          <motion.div {...fadeUp} className={isArabic ? 'text-center lg:text-right' : 'text-center lg:text-left'}>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f69e12]/30 bg-white/75 px-4 py-2 text-sm font-bold text-[#279782] shadow-sm backdrop-blur dark:bg-white/10 dark:text-white"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Sparkles size={16} className="text-[#f69e12]" />
              {t.badge}
            </div>

            <h1
              className="mb-6 text-3xl font-black leading-tight text-[#111827] dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.hero1}
              <br />
              <span className="bg-gradient-to-l from-[#279782] to-[#64c3b2] bg-clip-text text-transparent">
                {t.hero2}
              </span>
            </h1>

            <p
              className="mx-auto mb-8 max-w-3xl text-base leading-8 text-slate-700 dark:text-white/75 sm:text-lg md:text-xl lg:mx-0"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.heroDesc}
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <a
                href="https://alsobky.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f69e12] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#f69e12]/25 transition-all hover:-translate-y-1 hover:brightness-105 active:scale-95 sm:px-8 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.officialRegister}
                <ArrowLeft size={19} className={isArabic ? '' : 'rotate-180'} />
              </a>

              <a
                href="https://alsobky.com/inquiries"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#279782]/25 bg-white px-6 py-4 text-sm font-black text-[#279782] shadow-lg transition-all hover:-translate-y-1 hover:border-[#279782] dark:bg-white/10 dark:text-white sm:px-8 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <Search size={19} />
                {t.officialInquiry}
              </a>

              <Link
                to={ROUTE_PATHS.CONTACT}
                className="inline-flex items-center justify-center rounded-2xl bg-[#111827] px-6 py-4 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#279782] sm:px-8 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.contactUs}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {t.features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.12 }}
                    className={`rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                      isArabic ? 'text-right' : 'text-left'
                    }`}
                  >
                    <Icon className="mb-3 text-[#f69e12]" size={28} />
                    <h3 className="mb-1 text-base font-black text-[#111827] dark:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-600 dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: isArabic ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#f69e12]/20 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-56 w-56 rounded-full bg-[#279782]/25 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:rounded-[2.7rem] sm:p-5">
              <div className="rounded-[1.6rem] bg-white p-6 shadow-inner dark:bg-white/95 sm:rounded-[2.2rem] sm:p-8">
                <img
                  src="/images/logo.jpg"
                  alt={isArabic ? 'لوجو مؤسسة حسن إبراهيم السبكي الخيرية' : 'Hassan Ibrahim Al Sobky Charity Foundation Logo'}
                  className="mx-auto h-auto w-full max-w-[390px] object-contain"
                />
              </div>

              <div className="mt-5 rounded-3xl bg-gradient-to-l from-[#279782] to-[#64c3b2] p-5 text-center text-white">
                <p className="text-sm font-bold opacity-90" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {t.logoSubtitle}
                </p>
                <h2 className="mt-1 text-2xl font-black" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {t.logoTitle}
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20 dark:bg-slate-950 sm:py-24" dir={t.dir} id="about">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.aboutTitle} subtitle={t.aboutSubtitle} />

          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={isArabic ? 'text-right' : 'text-left'}
            >
              <p className="mb-6 text-base leading-9 text-foreground dark:text-white md:text-lg" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {t.aboutP1}
              </p>

              <p className="text-sm leading-8 text-muted-foreground dark:text-white/65 md:text-base" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {t.aboutP2}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to={ROUTE_PATHS.ABOUT}
                  className="rounded-xl bg-primary px-6 py-3 text-center font-bold text-primary-foreground transition-all hover:bg-primary/90"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {t.knowMore}
                </Link>

                <Link
                  to={ROUTE_PATHS.CONTACT}
                  className="rounded-xl border-2 border-primary px-6 py-3 text-center font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-primary"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {t.contactUs}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isArabic ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-video overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="/images/d1.jpg"
                  alt={isArabic ? 'أنشطة مؤسسة حسن إبراهيم السبكي الخيرية' : 'Hassan Ibrahim Al Sobky Charity Foundation activities'}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/65 to-transparent" />
              </div>

              <div className={`absolute -bottom-4 rounded-2xl bg-[#f69e12] px-5 py-3 text-white shadow-lg ${isArabic ? '-left-4' : '-right-4'}`}>
                <p className="text-2xl font-black" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  9+
                </p>
                <p className="text-xs font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {t.years}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.visionCards.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`rounded-3xl border border-border bg-gradient-to-br ${item.color} p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#279782] shadow-sm dark:bg-white/10 dark:text-[#f69e12]">
                    <Icon size={25} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-primary dark:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {item.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 dark:bg-slate-900 sm:py-20" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.statsTitle} subtitle={t.statsSubtitle} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.stats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-primary/10 bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10"
              >
                <p className="text-3xl font-black text-[#f69e12]">{item.number}</p>
                <p className="mt-2 text-sm font-bold text-muted-foreground dark:text-white/70" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 dark:bg-slate-950 sm:py-24" dir={t.dir} id="services">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.servicesTitle} subtitle={t.servicesSubtitle} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map((service, i) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] transition-all group-hover:bg-[#279782] group-hover:text-white">
                    <Icon size={28} />
                  </div>

                  <h3 className="mb-3 text-xl font-black text-primary dark:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {service.title}
                  </h3>

                  <p className="text-sm leading-8 text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 dark:bg-slate-900 sm:py-24" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.hiddenTitle} subtitle={t.hiddenSubtitle} />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.quickLinks.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={item.to}
                    className={`block h-full rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:border-[#f69e12]/50 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                      isArabic ? 'text-right' : 'text-left'
                    }`}
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#f69e12]/15 text-[#f69e12]">
                      <Icon size={27} />
                    </div>

                    <h3 className="mb-2 text-lg font-black text-primary dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-7 text-muted-foreground dark:text-white/65">
                      {item.text}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 dark:bg-slate-950 sm:py-24" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.newsTitle} subtitle={t.newsSubtitle} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.news.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                  isArabic ? 'text-right' : 'text-left'
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f69e12]/15 text-[#f69e12]">
                  <CalendarDays size={24} />
                </div>

                <h3 className="mb-3 text-lg font-black text-primary dark:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {item.title}
                </h3>

                <p className="text-sm leading-8 text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to={ROUTE_PATHS.COMPETITIONS}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-3 font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-primary"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.allEvents}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-20 dark:bg-slate-950 sm:py-24" dir={t.dir}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(39,151,130,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(246,158,18,0.14),transparent_36%)]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.galleryTitle} subtitle={t.gallerySubtitle} />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:grid-rows-2">
            {images.slice(0, 6).map((src, i) => {
              const title = t.galleryItems[i] || t.galleryBadge;
              const isLarge = i === 0 || i === 3;

              return (
                <Link
                  key={`${src}-${i}`}
                  to={ROUTE_PATHS.GALLERY}
                  className={`group relative overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl ${
                    isLarge ? 'min-h-[300px] md:col-span-2 md:row-span-2 md:min-h-[360px]' : 'min-h-[240px] md:min-h-[260px]'
                  }`}
                >
                  <img
                    src={src}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span
                      className="mb-3 inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {t.galleryBadge}
                    </span>

                    <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 rounded-[2rem] border border-primary/10 bg-white/75 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/10 md:grid-cols-3">
            {[
              { icon: Users, value: '10,000+', label: isArabic ? 'متسابق' : 'Contestants' },
              { icon: Trophy, value: '1,800+', label: isArabic ? 'فائز سابق' : 'Previous Winners' },
              { icon: CalendarDays, value: '22+', label: isArabic ? 'فعالية' : 'Events' },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-center justify-center gap-3 rounded-2xl bg-white p-5 shadow-sm dark:bg-white/10">
                  <Icon className="text-[#f69e12]" size={30} />
                  <div className={isArabic ? 'text-right' : 'text-left'}>
                    <p className="text-2xl font-black text-primary dark:text-white">{item.value}</p>
                    <p className="text-sm font-bold text-muted-foreground dark:text-white/65">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to={ROUTE_PATHS.GALLERY}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground transition-all hover:bg-primary/90"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.allPhotos}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-14" dir={t.dir}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <GoldDivider />

          <h2 className="mb-3 mt-3 text-2xl font-black text-white md:text-3xl" style={{ fontFamily: "'Cairo', sans-serif" }}>
            {t.ctaTitle}
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-sm leading-8 text-white/80 md:text-base" style={{ fontFamily: "'Cairo', sans-serif" }}>
            {t.ctaDesc}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to={ROUTE_PATHS.COMPETITIONS}
              className="rounded-xl bg-[#f69e12] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.competition}
            </Link>

            <Link
              to={ROUTE_PATHS.DONATIONS}
              className="rounded-xl border border-white/30 bg-white/15 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/25"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.donate}
            </Link>

            <Link
              to={ROUTE_PATHS.CONTACT}
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-white/90"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
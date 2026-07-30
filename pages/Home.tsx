import { useEffect, useMemo, useState } from 'react';
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

const safeRoutes = ROUTE_PATHS as Record<string, string>;

const routes = {
  about: safeRoutes.ABOUT || '/about',
  competitions: safeRoutes.COMPETITIONS || '/competitions',
  yearNine: safeRoutes.YEAR_NINE || '/year-nine',
  quranNews: safeRoutes.QURAN_NEWS || '/quran-news',
  gallery: safeRoutes.GALLERY || '/gallery',
  donations: safeRoutes.DONATIONS || '/donations',
  contact: safeRoutes.CONTACT || '/contact',
  privacy: safeRoutes.PRIVACY || '/privacy',
  terms: safeRoutes.TERMS || '/terms',
};

const fadeUp = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const galleryImages = [
  { src: '/images/quran-year9-stage.jpg', ar: 'الحفل الختامي للعام التاسع', en: 'Year Nine Closing Ceremony', badgeAr: 'مسابقة القرآن', badgeEn: 'Quran Competition' },
  { src: '/images/quran-year9-winners.jpg', ar: 'تكريم حفظة كتاب الله', en: 'Honoring Quran Memorizers', badgeAr: 'تكريم الفائزين', badgeEn: 'Winners Honoring' },
  { src: '/images/road-batra-04.jpg', ar: 'تطوير ورصف طريق بطرة', en: 'Batra Road Development', badgeAr: 'خدمة المجتمع', badgeEn: 'Community Service' },
  { src: '/images/quran-year9-reciter.jpg', ar: 'تلاوة القارئ محمد القلاچي', en: 'Recitation by Mohamed Al-Qalaji', badgeAr: 'تلاوات قرآنية', badgeEn: 'Quran Recitations' },
  { src: '/images/road-batra-06.jpg', ar: 'أعمال رفع كفاءة الطريق', en: 'Road Improvement Works', badgeAr: 'مبادرات تنموية', badgeEn: 'Development Initiatives' },
  { src: '/images/quran-year9-title.jpg', ar: 'هوية العام التاسع', en: 'Year Nine Visual Identity', badgeAr: 'مسابقة آل سبكي', badgeEn: 'Al Sobky Competition' },
];

function getInitialLanguage(): Lang {
  if (typeof document === 'undefined') return 'ar';
  return document.documentElement.lang === 'en' ? 'en' : 'ar';
}

function useCurrentLanguage() {
  const [lang, setLang] = useState<Lang>(getInitialLanguage);

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

function setJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

const text = {
  ar: {
    dir: 'rtl' as const,
    langCode: 'ar-EG',
    title: 'مؤسسة حسن إبراهيم السبكي الخيرية | تحفيظ القرآن وخدمة المجتمع',
    description:
      'مؤسسة حسن إبراهيم السبكي الخيرية في مصر لخدمة القرآن الكريم، تحفيظ القرآن، تنظيم مسابقات القرآن، مسابقة ورتل، دعم المبادرات الخيرية وخدمة المجتمع.',
    keywords:
      'مؤسسة حسن السبكي, حسن إبراهيم السبكي, مؤسسة حسن إبراهيم السبكي الخيرية, تحفيظ القرآن, مسابقة القرآن, مسابقة ورتل, مؤسسة خيرية, القرآن الكريم, خدمة المجتمع, مسابقات قرآنية, الدقهلية, مصر',
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
      { icon: CalendarDays, title: 'العام التاسع', text: 'قصة الحفل الختامي ومحطات المسابقة وصور التكريم.', to: routes.yearNine },
      { icon: FileText, title: 'أخبار المسابقة', text: 'النتائج والتلاوات وأخبار مسابقة ورتّل.', to: routes.quranNews },
      { icon: Trophy, title: 'المسابقات والفائزون', text: 'تفاصيل مسابقات القرآن وقائمة الفائزين.', to: routes.competitions },
      { icon: ImageIcon, title: 'معرض الصور', text: 'صور الفعاليات والتكريم والتحفيظ.', to: routes.gallery },
      { icon: HandHeart, title: 'الدعم والتبرعات', text: 'طرق الدعم والشراكات والمبادرات.', to: routes.donations },
      { icon: MessageCircle, title: 'تواصل والأسئلة الشائعة', text: 'راسل المؤسسة واعرف الإجابات المهمة.', to: routes.contact },
      { icon: ShieldCheck, title: 'سياسة الخصوصية', text: 'تعرف على سياسة استخدام البيانات.', to: routes.privacy },
      { icon: FileText, title: 'الشروط والأحكام', text: 'الشروط المنظمة لاستخدام الموقع.', to: routes.terms },
    ],
    newsTitle: 'آخر الأنشطة والفعاليات',
    newsSubtitle: 'تابع أبرز مجالات نشاط المؤسسة',
    news: [
      {
        title: 'اكتمال رصف الطريق الرئيسي بقرية بطرة',
        text: 'اختتمت أعمال وضع الطبقة الأسفلتية النهائية للطريق الرئيسي بقرية بطرة، ضمن مبادرات المؤسسة لتطوير الخدمات ورفع كفاءة البنية الأساسية بالقرية.',
        image: '/images/road-batra-01.jpg',
        link: 'https://www.facebook.com/share/r/1YrenjAk9D/',
      },
      {
        title: 'مسابقة آل سبكي للقرآن الكريم',
        text: 'مسابقة سنوية لتكريم حفظة القرآن وتشجيع الأطفال والشباب على الحفظ والمراجعة.',
        image: '/images/quran-year9-winners.jpg',
        link: 'https://www.facebook.com/alsobkiquran/posts/1430543185785605/',
      },
      {
        title: 'مسابقة ورتل',
        text: 'مسابقة تهتم بجمال التلاوة وحسن الأداء واكتشاف الأصوات القرآنية المميزة.',
        image: '/images/quran-year9-reciter.jpg',
        link: 'https://www.facebook.com/alsobkiquran/posts/1423290333177557/',
      },
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
    langCode: 'en-US',
    title: 'Hassan Ibrahim Al Sobky Charity Foundation | Quran & Community Service',
    description:
      'Hassan Ibrahim Al Sobky Charity Foundation supports Quran memorization, Quran competitions, Wartel recitation competition, charitable initiatives, and community service in Egypt.',
    keywords:
      'Hassan Al Sobky Charity, Hassan Ibrahim Al Sobky Charity Foundation, Quran memorization, Quran competition, Wartel competition, charity foundation, community service, Egypt',
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
      { icon: CalendarDays, title: 'Year Nine', text: 'The ceremony, competition journey, and honoring gallery.', to: routes.yearNine },
      { icon: FileText, title: 'Competition News', text: 'Results, recitations, and Wartel competition updates.', to: routes.quranNews },
      { icon: Trophy, title: 'Competitions & Winners', text: 'Quran competitions details and winners list.', to: routes.competitions },
      { icon: ImageIcon, title: 'Photo Gallery', text: 'Photos of events, honoring, and memorization activities.', to: routes.gallery },
      { icon: HandHeart, title: 'Support & Donations', text: 'Donation, support, partnership, and charity initiatives.', to: routes.donations },
      { icon: MessageCircle, title: 'Contact & FAQ', text: 'Contact the foundation and find common answers.', to: routes.contact },
      { icon: ShieldCheck, title: 'Privacy Policy', text: 'Learn how data is handled on the website.', to: routes.privacy },
      { icon: FileText, title: 'Terms & Conditions', text: 'Read the website usage terms.', to: routes.terms },
    ],
    newsTitle: 'Latest Activities & Events',
    newsSubtitle: 'Follow the foundation’s main activity areas',
    news: [
      {
        title: 'Batra Main Road Paving Completed',
        text: 'The final asphalt layer has been completed on Batra village’s main road as part of the foundation’s initiatives to improve local services and infrastructure.',
        image: '/images/road-batra-01.jpg',
        link: 'https://www.facebook.com/share/r/1YrenjAk9D/',
      },
      {
        title: 'Al Sobky Quran Competition',
        text: 'An annual competition that honors Quran memorizers and encourages children and youth to memorize and review.',
        image: '/images/quran-year9-winners.jpg',
        link: 'https://www.facebook.com/alsobkiquran/posts/1430543185785605/',
      },
      {
        title: 'Wartel Competition',
        text: 'A competition focused on beautiful Quran recitation and discovering distinguished recitation talents.',
        image: '/images/quran-year9-reciter.jpg',
        link: 'https://www.facebook.com/alsobkiquran/posts/1423290333177557/',
      },
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

export default function Home() {
  const lang = useCurrentLanguage();
  const t = text[lang];
  const isArabic = lang === 'ar';

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalHref = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';

  const organizationSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'NGO',
      name: isArabic ? 'مؤسسة حسن إبراهيم السبكي الخيرية' : 'Hassan Ibrahim Al Sobky Charity Foundation',
      alternateName: isArabic ? 'مؤسسة حسن السبكي' : 'Hassan Al Sobky Charity',
      url: siteUrl,
      logo: `${siteUrl}/images/logo.jpg`,
      image: `${siteUrl}/images/logo.jpg`,
      description: t.description,
      areaServed: {
        '@type': 'Country',
        name: 'Egypt',
      },
      sameAs: [siteUrl],
      knowsAbout: isArabic
        ? ['تحفيظ القرآن', 'مسابقات القرآن', 'مسابقة ورتل', 'خدمة المجتمع', 'المبادرات الخيرية']
        : ['Quran memorization', 'Quran competitions', 'Wartel competition', 'Community service', 'Charitable initiatives'],
    }),
    [isArabic, siteUrl, t.description],
  );

  useEffect(() => {
    document.title = t.title;
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;

    setMeta('description', t.description);
    setMeta('keywords', t.keywords);
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('author', isArabic ? 'مؤسسة حسن إبراهيم السبكي الخيرية' : 'Hassan Ibrahim Al Sobky Charity Foundation');
    setMeta('theme-color', '#279782');

    setPropertyMeta('og:title', t.title);
    setPropertyMeta('og:description', t.description);
    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:locale', isArabic ? 'ar_EG' : 'en_US');
    setPropertyMeta('og:site_name', isArabic ? 'مؤسسة حسن إبراهيم السبكي الخيرية' : 'Hassan Ibrahim Al Sobky Charity Foundation');
    setPropertyMeta('og:image', `${window.location.origin}/images/logo.jpg`);
    setPropertyMeta('og:url', canonicalHref);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', t.title);
    setMeta('twitter:description', t.description);
    setMeta('twitter:image', `${window.location.origin}/images/logo.jpg`);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', canonicalHref);

    setJsonLd('home-organization-schema', organizationSchema);
  }, [t, lang, isArabic, canonicalHref, organizationSchema]);

  return (
    <Layout>
      <section
        className="relative min-h-[100svh] overflow-hidden bg-[#061b35] pt-24 text-white sm:pt-32 lg:pt-40"
        dir={t.dir}
      >
        <img
          src="/images/quran-year9-stage.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#061b35] via-[#082748]/95 to-[#061b35]/75" />
        <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[#d8aa58]/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[480px] w-[480px] rounded-full bg-[#1686b7]/20 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.06]">
          <IslamicPattern className="h-full w-full text-[#e4bb70]" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-96px)] max-w-[1500px] grid-cols-1 items-center gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10">
          <motion.div {...fadeUp} className={isArabic ? 'text-center lg:text-right' : 'text-center lg:text-left'}>
            <div
              className="mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#e4bb70]/35 bg-[#e4bb70]/10 px-4 py-2 text-xs font-bold text-[#f1cf91] shadow-sm backdrop-blur sm:text-sm"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Sparkles size={16} className="shrink-0 text-[#e4bb70]" />
              <span>{t.badge}</span>
            </div>

            <h1
              className="mb-5 text-3xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.hero1}
              <br />
              <span className="bg-gradient-to-l from-[#e4bb70] to-[#f4dba7] bg-clip-text text-transparent">
                {t.hero2}
              </span>
            </h1>

            <p
              className="mx-auto mb-7 max-w-3xl text-base leading-8 text-white/75 sm:text-lg md:text-xl lg:mx-0"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.heroDesc}
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <a
                href="https://alsobky.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.officialRegister}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#e4bb70] px-6 py-4 text-sm font-black text-[#061b35] shadow-xl shadow-black/20 transition-all hover:-translate-y-1 hover:bg-[#f1cf91] active:scale-95 sm:w-auto sm:px-8 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.officialRegister}
                <ArrowLeft size={19} className={isArabic ? '' : 'rotate-180'} />
              </a>

              <a
                href="https://alsobky.com/inquiries"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.officialInquiry}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-black text-white shadow-lg backdrop-blur transition-all hover:-translate-y-1 hover:bg-white hover:text-[#061b35] sm:w-auto sm:px-8 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <Search size={19} />
                {t.officialInquiry}
              </a>

              <Link
                to={routes.contact}
                aria-label={t.contactUs}
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-[#e4bb70]/45 bg-[#0c3760] px-6 py-4 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#125087] sm:w-auto sm:px-8 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.contactUs}
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-10">
              {t.features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.12 }}
                    className={`rounded-3xl border border-white/15 bg-white/10 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-[#e4bb70]/40 hover:bg-white/15 hover:shadow-xl ${
                      isArabic ? 'text-right' : 'text-left'
                    }`}
                  >
                    <Icon className="mb-3 text-[#e4bb70]" size={28} />
                    <h3 className="mb-1 text-base font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-white/60" style={{ fontFamily: "'Cairo', sans-serif" }}>
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
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#e4bb70]/20 blur-3xl sm:h-48 sm:w-48" />
            <div className="absolute -bottom-8 -left-8 h-44 w-44 rounded-full bg-[#1686b7]/25 blur-3xl sm:h-56 sm:w-56" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:rounded-[2.7rem] sm:p-5">
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.6rem] bg-white shadow-inner sm:rounded-[2.2rem]">
                <img
                  src="/images/quran-year9-title.jpg"
                  alt={isArabic ? 'العام التاسع من مسابقة آل سبكي للقرآن الكريم' : 'Al Sobky Quran Competition Year Nine'}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061b35]/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-right text-white">
                  <span className="rounded-full bg-[#e4bb70] px-3 py-1 text-xs font-black text-[#061b35]">
                    {isArabic ? 'أحدث فعاليات المؤسسة' : 'Latest Foundation Event'}
                  </span>
                  <h2 className="mt-3 text-2xl font-black">{isArabic ? 'العام التاسع' : 'Year Nine'}</h2>
                  <p className="mt-1 text-sm text-white/70">{isArabic ? 'مسابقة آل سبكي للقرآن الكريم' : 'Al Sobky Quran Competition'}</p>
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-gradient-to-l from-[#0c3760] to-[#125087] p-5 text-center text-white">
                <p className="text-sm font-bold opacity-90" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {t.logoSubtitle}
                </p>
                <h2 className="mt-1 text-xl font-black sm:text-2xl" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {t.logoTitle}
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-24" dir={t.dir} id="about">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.aboutTitle} subtitle={t.aboutSubtitle} />

          <div className="mb-14 grid grid-cols-1 items-center gap-10 lg:mb-16 lg:grid-cols-2 lg:gap-12">
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
                  to={routes.about}
                  className="min-h-[48px] rounded-xl bg-primary px-6 py-3 text-center font-bold text-primary-foreground transition-all hover:bg-primary/90"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {t.knowMore}
                </Link>

                <Link
                  to={routes.contact}
                  className="min-h-[48px] rounded-xl border-2 border-primary px-6 py-3 text-center font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-primary"
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl sm:aspect-video">
                <img
                  src="/images/d1.jpg"
                  alt={isArabic ? 'أنشطة مؤسسة حسن إبراهيم السبكي الخيرية في تحفيظ القرآن وخدمة المجتمع' : 'Hassan Ibrahim Al Sobky Charity Foundation Quran and community activities'}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/65 to-transparent" />
              </div>

              <div className={`absolute -bottom-4 rounded-2xl bg-[#f69e12] px-5 py-3 text-white shadow-lg ${isArabic ? '-left-2 sm:-left-4' : '-right-2 sm:-right-4'}`}>
                <p className="text-2xl font-black" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  9+
                </p>
                <p className="text-xs font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {t.years}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {t.visionCards.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`rounded-3xl border border-border bg-gradient-to-br ${item.color} p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 sm:p-7 ${
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

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {t.stats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-primary/10 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 sm:p-7"
              >
                <p className="text-2xl font-black text-[#f69e12] sm:text-3xl">{item.number}</p>
                <p className="mt-2 text-xs font-bold leading-6 text-muted-foreground dark:text-white/70 sm:text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-24" dir={t.dir} id="services">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.servicesTitle} subtitle={t.servicesSubtitle} />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {t.services.map((service, i) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/10 sm:p-7 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] transition-all group-hover:bg-[#279782] group-hover:text-white">
                    <Icon size={28} />
                  </div>

                  <h3 className="mb-3 text-lg font-black text-primary dark:text-white sm:text-xl" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {service.title}
                  </h3>

                  <p className="text-sm leading-8 text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {service.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 dark:bg-slate-900 sm:py-24" dir={t.dir}>
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
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f69e12]/15 text-[#f69e12]">
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

      <section className="relative overflow-hidden bg-[#071d39] py-16 text-white sm:py-24" dir={t.dir}>
        <img
          src="/images/quran-year9-stage.jpg"
          alt={isArabic ? 'الحفل الختامي للعام التاسع' : 'Year nine closing ceremony'}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#071d39] via-[#071d39]/90 to-[#071d39]/55" />
        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
          <div>
            <span className="inline-flex rounded-full border border-[#e5bb6c]/35 bg-[#e5bb6c]/15 px-4 py-2 text-sm font-black text-[#e5bb6c]">
              {isArabic ? 'مسابقة آل سبكي للقرآن الكريم' : 'Al Sobky Quran Competition'}
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.4] sm:text-5xl">
              {isArabic ? 'العام التاسع… ليلة تليق بأهل القرآن' : 'Year Nine — A Night Honoring the People of the Quran'}
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/72">
              {isArabic
                ? 'من التسجيل والاختبارات إلى إعلان النتائج والحفل الختامي؛ رحلة متكاملة لتشجيع حفظة كتاب الله وتكريم الفائزين والمحفظين ومكاتب التحفيظ.'
                : 'From registration and assessments to results and the closing ceremony, a complete journey honoring memorizers, teachers, and Quran centers.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={routes.yearNine} className="rounded-xl bg-[#e5bb6c] px-6 py-3 font-black text-[#071d39] transition hover:bg-[#f1cd8c]">
                {isArabic ? 'استكشف العام التاسع' : 'Explore Year Nine'}
              </Link>
              <Link to={routes.quranNews} className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-black transition hover:bg-white hover:text-[#071d39]">
                {isArabic ? 'أخبار المسابقة' : 'Competition News'}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['1.5M', isArabic ? 'جنيه جوائز' : 'EGP prizes'],
              ['9', isArabic ? 'أعوام من العطاء' : 'years of giving'],
              ['6', isArabic ? 'مستويات للحفظ' : 'memorization levels'],
              ['ورتّل', isArabic ? 'للأداء الصوتي' : 'voice performance'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur">
                <p className="text-2xl font-black text-[#e5bb6c] sm:text-3xl">{value}</p>
                <p className="mt-2 text-xs font-bold text-white/65 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-24" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.newsTitle} subtitle={t.newsSubtitle} />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {t.news.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex h-full flex-col rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 sm:p-7 ${
                  isArabic ? 'text-right' : 'text-left'
                }`}
              >
                {'image' in item && item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="-mx-6 -mt-6 mb-5 h-52 w-[calc(100%+3rem)] rounded-t-3xl object-cover sm:-mx-7 sm:-mt-7 sm:w-[calc(100%+3.5rem)]"
                  />
                ) : null}

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f69e12]/15 text-[#f69e12]">
                  <CalendarDays size={24} />
                </div>

                <h3 className="mb-3 text-lg font-black text-primary dark:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {item.title}
                </h3>

                <p className="text-sm leading-8 text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {item.text}
                </p>

                {'link' in item && item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-5 font-bold text-primary hover:text-[#f69e12] dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {isArabic ? 'شاهد الخبر والصور' : 'View news and photos'}
                    <ArrowLeft size={18} />
                  </a>
                ) : null}
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to={routes.competitions}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-primary px-8 py-3 font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-primary"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.allEvents}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-16 dark:bg-slate-950 sm:py-24" dir={t.dir}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(39,151,130,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(246,158,18,0.14),transparent_36%)]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.galleryTitle} subtitle={t.gallerySubtitle} />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
            {galleryImages.map((item, i) => {
              const title = isArabic ? item.ar : item.en;
              const badge = isArabic ? item.badgeAr : item.badgeEn;
              const isLarge = i === 0 || i === 3;

              return (
                <Link
                  key={item.src}
                  to={routes.gallery}
                  aria-label={`${t.galleryTitle} - ${title}`}
                  className={`group relative overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl ${
                    isLarge ? 'min-h-[260px] sm:min-h-[300px] md:col-span-2 md:row-span-2 md:min-h-[360px]' : 'min-h-[230px] md:min-h-[260px]'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span
                      className="mb-3 inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {badge}
                    </span>

                    <h3 className="text-lg font-black text-white sm:text-xl" style={{ fontFamily: "'Cairo', sans-serif" }}>
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
                  <Icon className="shrink-0 text-[#f69e12]" size={30} />
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
              to={routes.gallery}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground transition-all hover:bg-primary/90"
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
              to={routes.competitions}
              className="min-h-[48px] rounded-xl bg-[#f69e12] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.competition}
            </Link>

            <Link
              to={routes.donations}
              className="min-h-[48px] rounded-xl border border-white/30 bg-white/15 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/25"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.donate}
            </Link>

            <Link
              to={routes.contact}
              className="min-h-[48px] rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-white/90"
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

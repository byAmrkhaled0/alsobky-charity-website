import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon, Search } from 'lucide-react';
import { Layout, IslamicPattern, GoldDivider } from '@/components/Layout';

type Lang = 'ar' | 'en';

type GalleryImage = {
  src: string;
  altAr: string;
  altEn: string;
  categoryAr: string;
  categoryEn: string;
};

type GallerySection = {
  categoryAr: string;
  categoryEn: string;
  images: GalleryImage[];
};

const LANGUAGE_STORAGE_KEY = 'site_language';

function getSavedLanguage(): Lang {
  if (typeof window === 'undefined') return 'ar';

  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem('lang');

  if (saved === 'ar' || saved === 'en') return saved;

  return document.documentElement.lang === 'en' ? 'en' : 'ar';
}

function useCurrentLanguage() {
  const [lang, setLang] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const updateLang = () => setLang(getSavedLanguage());

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

const GALLERY_SECTIONS: GallerySection[] = [
  {
    categoryAr: 'العام التاسع لمسابقة القرآن',
    categoryEn: 'Quran Competition Year Nine',
    images: [
      { src: '/images/quran-year9-stage.jpg', altAr: 'المسرح الرئيسي للحفل الختامي', altEn: 'Year nine closing ceremony stage', categoryAr: 'العام التاسع لمسابقة القرآن', categoryEn: 'Quran Competition Year Nine' },
      { src: '/images/quran-year9-winners.jpg', altAr: 'حفظة القرآن خلال حفل التكريم', altEn: 'Quran memorizers at the honoring ceremony', categoryAr: 'العام التاسع لمسابقة القرآن', categoryEn: 'Quran Competition Year Nine' },
      { src: '/images/quran-year9-reciter.jpg', altAr: 'القارئ محمد القلاچي في افتتاح الحفل', altEn: 'Reciter Mohamed Al-Qalaji opening the ceremony', categoryAr: 'العام التاسع لمسابقة القرآن', categoryEn: 'Quran Competition Year Nine' },
      { src: '/images/quran-year9-guests.jpg', altAr: 'ضيوف الحفل الختامي', altEn: 'Closing ceremony guests', categoryAr: 'العام التاسع لمسابقة القرآن', categoryEn: 'Quran Competition Year Nine' },
      { src: '/images/quran-year9-founder.jpg', altAr: 'كلمة المهندس أيمن السبكي', altEn: 'Ayman Al Sobky speech', categoryAr: 'العام التاسع لمسابقة القرآن', categoryEn: 'Quran Competition Year Nine' },
      { src: '/images/quran-year9-title.jpg', altAr: 'هوية العام التاسع', altEn: 'Year nine visual identity', categoryAr: 'العام التاسع لمسابقة القرآن', categoryEn: 'Quran Competition Year Nine' },
      { src: '/images/quran-year9-book.jpg', altAr: 'مجسم المصحف بالحفل الختامي', altEn: 'Quran installation at the ceremony', categoryAr: 'العام التاسع لمسابقة القرآن', categoryEn: 'Quran Competition Year Nine' },
      { src: '/images/quran-year9-entrance.jpg', altAr: 'مدخل فعاليات العام التاسع', altEn: 'Year nine event entrance', categoryAr: 'العام التاسع لمسابقة القرآن', categoryEn: 'Quran Competition Year Nine' },
    ],
  },
  {
    categoryAr: 'تطوير ورصف طريق بطرة',
    categoryEn: 'Batra Road Development',
    images: [
      { src: '/images/road-batra-01.jpg', altAr: 'أعمال رصف الطريق الرئيسي بقرية بطرة', altEn: 'Batra main road paving works', categoryAr: 'تطوير ورصف طريق بطرة', categoryEn: 'Batra Road Development' },
      { src: '/images/road-batra-02.jpg', altAr: 'فرد الطبقة الأسفلتية بطريق بطرة', altEn: 'Asphalt paving on Batra road', categoryAr: 'تطوير ورصف طريق بطرة', categoryEn: 'Batra Road Development' },
      { src: '/images/road-batra-03.jpg', altAr: 'متابعة أعمال تطوير طريق بطرة', altEn: 'Supervising Batra road development', categoryAr: 'تطوير ورصف طريق بطرة', categoryEn: 'Batra Road Development' },
      { src: '/images/road-batra-04.jpg', altAr: 'عمال رصف الطريق بقرية بطرة', altEn: 'Road paving crew in Batra', categoryAr: 'تطوير ورصف طريق بطرة', categoryEn: 'Batra Road Development' },
      { src: '/images/road-batra-05.jpg', altAr: 'اللمسات النهائية لرصف طريق بطرة', altEn: 'Final paving works on Batra road', categoryAr: 'تطوير ورصف طريق بطرة', categoryEn: 'Batra Road Development' },
      { src: '/images/road-batra-06.jpg', altAr: 'معدات تطوير الطريق الرئيسي ببطرة', altEn: 'Road development machinery in Batra', categoryAr: 'تطوير ورصف طريق بطرة', categoryEn: 'Batra Road Development' },
      { src: '/images/road-batra-07.jpg', altAr: 'لافتة مشروع رصف طريق بطرة', altEn: 'Batra road paving project banner', categoryAr: 'تطوير ورصف طريق بطرة', categoryEn: 'Batra Road Development' },
      { src: '/images/road-batra-08.jpg', altAr: 'معدات فرش الأسفلت بطريق بطرة', altEn: 'Asphalt paving machinery on Batra road', categoryAr: 'تطوير ورصف طريق بطرة', categoryEn: 'Batra Road Development' },
    ],
  },
  {
    categoryAr: 'فعاليات قرآنية',
    categoryEn: 'Quran Events',
    images: [
      { src: '/images/p1.jpg', altAr: 'فعاليات قرآنية', altEn: 'Quran Event', categoryAr: 'فعاليات قرآنية', categoryEn: 'Quran Events' },
      { src: '/images/p2.jpg', altAr: 'فعاليات قرآنية', altEn: 'Quran Event', categoryAr: 'فعاليات قرآنية', categoryEn: 'Quran Events' },
      { src: '/images/p3.jpg', altAr: 'فعاليات قرآنية', altEn: 'Quran Event', categoryAr: 'فعاليات قرآنية', categoryEn: 'Quran Events' },
      { src: '/images/p4.jpg', altAr: 'فعاليات قرآنية', altEn: 'Quran Event', categoryAr: 'فعاليات قرآنية', categoryEn: 'Quran Events' },
      { src: '/images/p5.jpg', altAr: 'فعاليات قرآنية', altEn: 'Quran Event', categoryAr: 'فعاليات قرآنية', categoryEn: 'Quran Events' },
    ],
  },
  {
    categoryAr: 'تكريم الفائزين',
    categoryEn: 'Honoring Winners',
    images: [
      { src: '/images/v1.jpg', altAr: 'تكريم الفائزين', altEn: 'Honoring Winners', categoryAr: 'تكريم الفائزين', categoryEn: 'Honoring Winners' },
      { src: '/images/v2.jpg', altAr: 'تكريم الفائزين', altEn: 'Honoring Winners', categoryAr: 'تكريم الفائزين', categoryEn: 'Honoring Winners' },
      { src: '/images/v3.jpg', altAr: 'تكريم الفائزين', altEn: 'Honoring Winners', categoryAr: 'تكريم الفائزين', categoryEn: 'Honoring Winners' },
      { src: '/images/v4.jpg', altAr: 'تكريم الفائزين', altEn: 'Honoring Winners', categoryAr: 'تكريم الفائزين', categoryEn: 'Honoring Winners' },
      { src: '/images/v5.jpg', altAr: 'تكريم الفائزين', altEn: 'Honoring Winners', categoryAr: 'تكريم الفائزين', categoryEn: 'Honoring Winners' },
    ],
  },
  {
    categoryAr: 'أنشطة تحفيظ القرآن',
    categoryEn: 'Quran Memorization Activities',
    images: [
      { src: '/images/j1.jpg', altAr: 'أنشطة تحفيظ القرآن', altEn: 'Quran Memorization Activities', categoryAr: 'أنشطة تحفيظ القرآن', categoryEn: 'Quran Memorization Activities' },
      { src: '/images/s7.jpg', altAr: 'أنشطة تحفيظ القرآن', altEn: 'Quran Memorization Activities', categoryAr: 'أنشطة تحفيظ القرآن', categoryEn: 'Quran Memorization Activities' },
      { src: '/images/g3.jpg', altAr: 'أنشطة تحفيظ القرآن', altEn: 'Quran Memorization Activities', categoryAr: 'أنشطة تحفيظ القرآن', categoryEn: 'Quran Memorization Activities' },
      { src: '/images/g4.jpg', altAr: 'أنشطة تحفيظ القرآن', altEn: 'Quran Memorization Activities', categoryAr: 'أنشطة تحفيظ القرآن', categoryEn: 'Quran Memorization Activities' },
      { src: '/images/g5.jpg', altAr: 'أنشطة تحفيظ القرآن', altEn: 'Quran Memorization Activities', categoryAr: 'أنشطة تحفيظ القرآن', categoryEn: 'Quran Memorization Activities' },
    ],
  },
  {
    categoryAr: 'مبادرات خيرية',
    categoryEn: 'Charity Initiatives',
    images: [
      { src: '/images/l1.jpg', altAr: 'مبادرات خيرية', altEn: 'Charity Initiatives', categoryAr: 'مبادرات خيرية', categoryEn: 'Charity Initiatives' },
      { src: '/images/l2.jpg', altAr: 'مبادرات خيرية', altEn: 'Charity Initiatives', categoryAr: 'مبادرات خيرية', categoryEn: 'Charity Initiatives' },
      { src: '/images/l3.jpg', altAr: 'مبادرات خيرية', altEn: 'Charity Initiatives', categoryAr: 'مبادرات خيرية', categoryEn: 'Charity Initiatives' },
      { src: '/images/l4.jpg', altAr: 'مبادرات خيرية', altEn: 'Charity Initiatives', categoryAr: 'مبادرات خيرية', categoryEn: 'Charity Initiatives' },
      { src: '/images/l5.jpg', altAr: 'مبادرات خيرية', altEn: 'Charity Initiatives', categoryAr: 'مبادرات خيرية', categoryEn: 'Charity Initiatives' },
    ],
  },
  {
    categoryAr: 'مسابقات الأطفال',
    categoryEn: 'Children Competitions',
    images: [
      { src: '/images/n1.jpg', altAr: 'مسابقات الأطفال', altEn: 'Children Competitions', categoryAr: 'مسابقات الأطفال', categoryEn: 'Children Competitions' },
      { src: '/images/n2.jpg', altAr: 'مسابقات الأطفال', altEn: 'Children Competitions', categoryAr: 'مسابقات الأطفال', categoryEn: 'Children Competitions' },
      { src: '/images/u5.jpg', altAr: 'مسابقات الأطفال', altEn: 'Children Competitions', categoryAr: 'مسابقات الأطفال', categoryEn: 'Children Competitions' },
      { src: '/images/n4.jpg', altAr: 'مسابقات الأطفال', altEn: 'Children Competitions', categoryAr: 'مسابقات الأطفال', categoryEn: 'Children Competitions' },
      { src: '/images/s1.jpg', altAr: 'مسابقات الأطفال', altEn: 'Children Competitions', categoryAr: 'مسابقات الأطفال', categoryEn: 'Children Competitions' },
    ],
  },
  {
    categoryAr: 'لقاءات المؤسسة',
    categoryEn: 'Foundation Meetings',
    images: [
      { src: '/images/k1.jpg', altAr: 'لقاءات المؤسسة', altEn: 'Foundation Meetings', categoryAr: 'لقاءات المؤسسة', categoryEn: 'Foundation Meetings' },
      { src: '/images/k2.jpg', altAr: 'لقاءات المؤسسة', altEn: 'Foundation Meetings', categoryAr: 'لقاءات المؤسسة', categoryEn: 'Foundation Meetings' },
      { src: '/images/p2.jpg', altAr: 'لقاءات المؤسسة', altEn: 'Foundation Meetings', categoryAr: 'لقاءات المؤسسة', categoryEn: 'Foundation Meetings' },
      { src: '/images/a8.jpg', altAr: 'لقاءات المؤسسة', altEn: 'Foundation Meetings', categoryAr: 'لقاءات المؤسسة', categoryEn: 'Foundation Meetings' },
      { src: '/images/p4.jpg', altAr: 'لقاءات المؤسسة', altEn: 'Foundation Meetings', categoryAr: 'لقاءات المؤسسة', categoryEn: 'Foundation Meetings' },
    ],
  },
];

export default function Gallery() {
  const lang = useCurrentLanguage();
  const isArabic = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const title = isArabic
      ? 'معرض الصور | مؤسسة حسن إبراهيم السبكي الخيرية'
      : 'Gallery | Hassan Ibrahim Al Sobky Charity Foundation';

    const description = isArabic
      ? 'شاهد معرض صور مؤسسة حسن إبراهيم السبكي الخيرية: فعاليات قرآنية، تكريم الفائزين، أنشطة تحفيظ القرآن، مسابقات الأطفال، المبادرات الخيرية ولقاءات المؤسسة.'
      : 'Explore Hassan Ibrahim Al Sobky Charity Foundation gallery: Quran events, honoring winners, Quran memorization activities, children competitions, charity initiatives, and foundation meetings.';

    const keywords = isArabic
      ? 'معرض الصور, مؤسسة حسن السبكي, صور مسابقات القرآن, تكريم الفائزين, تحفيظ القرآن, مسابقات الأطفال, مبادرات خيرية, فعاليات قرآنية'
      : 'gallery, Hassan Al Sobky Charity, Quran competition photos, honoring winners, Quran memorization, charity initiatives, Quran events';

    document.title = title;
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow, max-image-preview:large');

    setPropertyMeta('og:title', title);
    setPropertyMeta('og:description', description);
    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:locale', isArabic ? 'ar_EG' : 'en_US');
    setPropertyMeta('og:image', `${window.location.origin}/images/logo.jpg`);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', `${window.location.origin}/images/logo.jpg`);

    window.scrollTo({ top: 0 });
  }, [isArabic, lang]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const categories = [
    { key: 'all', label: isArabic ? 'الكل' : 'All' },
    ...GALLERY_SECTIONS.map((section) => ({
      key: section.categoryAr,
      label: isArabic ? section.categoryAr : section.categoryEn,
    })),
  ];

  const normalizedQuery = query.trim().toLowerCase();

  const visibleSections = GALLERY_SECTIONS.map((section) => {
    if (activeCategory !== 'all' && section.categoryAr !== activeCategory) return null;

    const images = section.images.filter((image) => {
      if (!normalizedQuery) return true;

      const searchableText = `${image.altAr} ${image.altEn} ${image.categoryAr} ${image.categoryEn}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    if (images.length === 0) return null;

    return {
      ...section,
      images,
    };
  }).filter((section): section is GallerySection => Boolean(section));

  const totalVisibleImages = visibleSections.reduce((total, section) => total + section.images.length, 0);

  return (
    <Layout>
      <section
        className="relative overflow-hidden bg-primary pb-14 pt-28 dark:bg-slate-950 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-40"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="absolute -right-24 top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <GoldDivider />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {isArabic ? 'معرض الصور' : 'Gallery'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-2xl text-sm leading-7 text-white/75 sm:text-base md:text-lg"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {isArabic
              ? 'لحظات من رحلة الخير والعطاء في مؤسسة حسن إبراهيم السبكي الخيرية'
              : 'Moments from the foundation’s journey of giving and community impact'}
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-14 dark:bg-slate-950 sm:py-16 lg:py-20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-3xl border border-primary/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search
                  size={19}
                  className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                    isArabic ? 'right-4' : 'left-4'
                  }`}
                />

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isArabic ? 'ابحث في الصور أو الأقسام' : 'Search images or categories'}
                  className={`min-h-[48px] w-full rounded-2xl border border-primary/10 bg-muted/40 px-4 text-sm font-bold outline-none transition-all focus:border-primary focus:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white ${
                    isArabic ? 'pr-12 text-right' : 'pl-12 text-left'
                  }`}
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                />
              </div>

              <div className="flex min-h-[48px] items-center justify-center rounded-2xl bg-primary/5 px-4 py-3 text-sm font-black text-primary dark:bg-white/10 dark:text-white">
                <ImageIcon className={isArabic ? 'ml-2 text-accent' : 'mr-2 text-accent'} size={18} />
                <span style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {totalVisibleImages} {isArabic ? 'صورة' : 'Photos'}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`min-h-[40px] shrink-0 rounded-full px-4 py-2 text-xs font-black transition-all sm:text-sm ${
                    activeCategory === cat.key
                      ? 'bg-primary text-primary-foreground shadow-md dark:bg-[#f69e12] dark:text-white'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary dark:bg-white/10 dark:text-white/70 dark:hover:text-white'
                  }`}
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {visibleSections.length > 0 ? (
            <div className="space-y-12 sm:space-y-16">
              {visibleSections.map((section) => {
                const sectionTitle = isArabic ? section.categoryAr : section.categoryEn;

                return (
                  <motion.section
                    key={section.categoryAr}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h2
                        className="flex items-center gap-2 text-xl font-black text-primary dark:text-white sm:text-2xl md:text-3xl"
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                      >
                        <ImageIcon className="text-accent" size={24} />
                        {sectionTitle}
                      </h2>

                      <span
                        className="w-fit rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black text-primary dark:bg-white/10 dark:text-white sm:text-sm"
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                      >
                        {section.images.length} {isArabic ? 'صور' : 'Photos'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                      {section.images.map((img, i) => (
                        <motion.button
                          key={`${section.categoryAr}-${img.src}-${i}`}
                          type="button"
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => setSelectedImage(img)}
                          className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white p-2 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10"
                        >
                          <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-muted/40 p-2 dark:bg-black/25">
                            <img
                              src={img.src}
                              alt={isArabic ? img.altAr : img.altEn}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="absolute inset-2 flex items-center justify-center rounded-2xl bg-primary/0 opacity-0 transition-all group-hover:bg-primary/35 group-hover:opacity-100">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                              <ZoomIn size={21} />
                            </div>
                          </div>

                          <p
                            className="mt-3 line-clamp-1 text-center text-xs font-bold text-muted-foreground dark:text-white/70"
                            style={{ fontFamily: "'Cairo', sans-serif" }}
                          >
                            {sectionTitle}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-10">
              <ImageIcon className="mx-auto mb-4 text-accent" size={44} />

              <h2
                className="mb-2 text-xl font-black text-primary dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic ? 'لا توجد صور مطابقة' : 'No matching images'}
              </h2>

              <p
                className="text-sm text-muted-foreground dark:text-white/65"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic ? 'جرّب تغيير القسم أو كلمة البحث.' : 'Try changing the category or search keyword.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-all hover:scale-105"
              aria-label={isArabic ? 'إغلاق الصورة' : 'Close image'}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="max-h-[90svh] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={isArabic ? selectedImage.altAr : selectedImage.altEn}
                className="mx-auto max-h-[82svh] w-full rounded-2xl object-contain"
              />

              <p
                className="mt-4 text-center text-sm font-bold text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic ? selectedImage.categoryAr : selectedImage.categoryEn}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

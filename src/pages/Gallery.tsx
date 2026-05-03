import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
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

const GALLERY_SECTIONS: GallerySection[] = [
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

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    document.title = isArabic
      ? 'معرض الصور | مؤسسة حسن السبكي الخيرية'
      : 'Gallery | Hassan Al Sobky Charity Foundation';

    window.scrollTo({ top: 0 });
  }, [isArabic]);

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

  const visibleSections =
    activeCategory === 'all'
      ? GALLERY_SECTIONS
      : GALLERY_SECTIONS.filter((section) => section.categoryAr === activeCategory);

  return (
    <Layout>
      <section
        className="relative overflow-hidden bg-primary pb-20 pt-32 dark:bg-slate-950"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <GoldDivider />

          <h1
            className="mb-4 mt-4 text-4xl font-black text-white md:text-5xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {isArabic ? 'معرض الصور' : 'Gallery'}
          </h1>

          <p
            className="mx-auto max-w-2xl text-base leading-8 text-white/75 md:text-lg"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {isArabic
              ? 'لحظات من رحلة الخير والعطاء في مؤسسة حسن السبكي الخيرية'
              : 'Moments from the foundation’s journey of giving and community impact'}
          </p>
        </div>
      </section>

      <section
        className="bg-background py-16 dark:bg-slate-950 sm:py-20"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
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

          <div className="space-y-16">
            {visibleSections.map((section) => {
              const sectionTitle = isArabic ? section.categoryAr : section.categoryEn;

              return (
                <section key={section.categoryAr}>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <h2
                      className="text-2xl font-black text-primary dark:text-white md:text-3xl"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {sectionTitle}
                    </h2>

                    <span
                      className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary dark:bg-white/10 dark:text-white"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {section.images.length} {isArabic ? 'صور' : 'Photos'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {section.images.map((img, i) => (
                      <motion.button
                        key={`${section.categoryAr}-${img.src}-${i}`}
                        type="button"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedImage(img)}
                        className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10"
                      >
                        <div className="flex h-72 items-center justify-center rounded-2xl bg-muted/40 p-2 dark:bg-black/25 sm:h-64">
                          <img
                            src={img.src}
                            alt={isArabic ? img.altAr : img.altEn}
                            loading="lazy"
                            className="h-full w-full rounded-2xl object-contain"
                          />
                        </div>

                        <div className="absolute inset-3 flex items-center justify-center rounded-2xl bg-primary/0 opacity-0 transition-all group-hover:bg-primary/35 group-hover:opacity-100">
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
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-all hover:scale-105"
              aria-label={isArabic ? 'إغلاق الصورة' : 'Close image'}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="max-h-[88vh] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={isArabic ? selectedImage.altAr : selectedImage.altEn}
                className="mx-auto max-h-[82vh] w-full rounded-2xl object-contain"
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
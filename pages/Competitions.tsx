import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Medal,
  Award,
  Mic,
  GraduationCap,
  Search,
  Send,
  User,
  Phone,
  CalendarDays,
  Trophy,
  UserRoundCheck,
} from 'lucide-react';
import { Layout, SectionTitle, IslamicPattern, GoldDivider } from '@/components/Layout';
import { WINNERS } from '@/data/index';

type Lang = 'ar' | 'en';
type YearFilter = number | 'all';

const YEARS = [2026, 2025, 2024];
const WHATSAPP_NUMBER = '201153637371';
const LANGUAGE_STORAGE_KEY = 'site_language';

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

function getSavedLanguage(): Lang {
  if (typeof window === 'undefined') return 'ar';

  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem('lang');

  if (saved === 'en' || saved === 'ar') return saved;

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

function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Competitions() {
  const lang = useCurrentLanguage();
  const isArabic = lang === 'ar';

  const [form, setForm] = useState<Record<'name' | 'phone' | 'level', string>>({
    name: '',
    phone: '',
    level: '',
  });

  const [selectedYear, setSelectedYear] = useState<YearFilter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const title = isArabic
      ? 'المسابقات والفائزون | مؤسسة حسن إبراهيم السبكي الخيرية'
      : 'Competitions & Winners | Hassan Ibrahim Al Sobky Charity Foundation';

    const description = isArabic
      ? 'تعرف على مسابقات القرآن الكريم، مسابقة آل سبكي، مسابقة ورتل، مستويات المشاركة، استمارة التواصل السريع، وقائمة الفائزين.'
      : 'Explore Quran competitions, Al Sobky Quran Competition, Wartel Competition, participation levels, quick contact form, and winners list.';

    const keywords = isArabic
      ? 'مسابقات القرآن الكريم, مسابقة آل سبكي, مسابقة ورتل, فائزين القرآن, مؤسسة حسن السبكي, تحفيظ القرآن'
      : 'Quran competitions, Al Sobky Quran Competition, Wartel Competition, Quran memorization, Hassan Al Sobky Charity';

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

  const levels = [
    { icon: BookOpen, ar: 'حفظ 3 أجزاء', en: '3 Parts' },
    { icon: BookOpen, ar: 'حفظ 5 أجزاء', en: '5 Parts' },
    { icon: GraduationCap, ar: 'حفظ الربع الأخير', en: 'Quarter Quran' },
    { icon: GraduationCap, ar: 'حفظ النصف الأخير', en: 'Half Quran' },
    { icon: Medal, ar: 'حفظ ثلاثة أرباع القرآن', en: 'Three Quarters' },
    { icon: Award, ar: 'حفظ القرآن كاملًا', en: 'Full Quran' },
  ];

  const wartelItems = isArabic
    ? ['جمال الصوت', 'أحكام التجويد', 'حسن الأداء', 'مخارج الحروف']
    : ['Voice Beauty', 'Tajweed Rules', 'Performance', 'Pronunciation'];

  const winnerStats = isArabic
    ? [
        { icon: Trophy, value: '1,800+', label: 'فائز سابق' },
        { icon: UserRoundCheck, value: '10,000+', label: 'متسابق في آخر عام' },
        { icon: CalendarDays, value: '22+', label: 'فعالية ومسابقة' },
      ]
    : [
        { icon: Trophy, value: '1,800+', label: 'Previous winners' },
        { icon: UserRoundCheck, value: '10,000+', label: 'Contestants last year' },
        { icon: CalendarDays, value: '22+', label: 'Events and competitions' },
      ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWhatsAppSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = isArabic
      ? `السلام عليكم، أريد التسجيل أو الاستفسار عن مسابقات مؤسسة حسن إبراهيم السبكي الخيرية.

الاسم: ${form.name}
رقم الهاتف: ${form.phone}
المستوى المطلوب: ${form.level || 'غير محدد'}`
      : `Hello, I would like to register or ask about Hassan Ibrahim Al Sobky Charity Foundation competitions.

Name: ${form.name}
Phone: ${form.phone}
Selected Level: ${form.level || 'Not specified'}`;

    window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  const filteredWinners = WINNERS.filter((winner) => {
    const matchesYear = selectedYear === 'all' || winner.year === selectedYear;
    const searchValue = `${winner.name} ${winner.rank} ${winner.category} ${winner.level} ${winner.year}`.toLowerCase();
    const matchesQuery = searchValue.includes(query.trim().toLowerCase());

    return matchesYear && matchesQuery;
  });

  return (
    <Layout>
      <section
        className="relative overflow-hidden bg-primary pb-12 pt-28 dark:bg-slate-950 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-40"
        dir={isArabic ? 'rtl' : 'ltr'}
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
            className="mb-4 mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {isArabic ? 'مسابقات القرآن الكريم' : 'Quran Competitions'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-2xl text-sm leading-7 text-white/75 sm:text-base md:text-lg"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {isArabic
              ? 'اكتشف موهبتك وشارك في أعظم المسابقات القرآنية وتعرّف على قائمة الفائزين'
              : 'Discover your talent, join Quran competitions, and explore the winners list'}
          </motion.p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://alsobky.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#f69e12] px-6 py-3 text-sm font-black text-white shadow-lg transition-all hover:brightness-110"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {isArabic ? 'التسجيل الرسمي' : 'Official Registration'}
            </a>

            <a
              href="https://alsobky.com/inquiries"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-black text-white transition-all hover:bg-white hover:text-primary"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Search size={18} />
              {isArabic ? 'الاستعلام الرسمي' : 'Official Inquiry'}
            </a>

            <Link
              to="/year-nine"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#f0ca84]/60 bg-[#f0ca84]/15 px-6 py-3 text-sm font-black text-[#f0ca84] transition-all hover:bg-[#f0ca84] hover:text-primary"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {isArabic ? 'ملف العام التاسع' : 'Year Nine Highlights'}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-20 lg:py-24" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={isArabic ? 'مسابقة آل سبكي للقرآن الكريم' : 'Al Sobky Quran Competition'}
            subtitle={
              isArabic
                ? 'مسابقة سنوية لتكريم حفظة القرآن الكريم وتشجيع النشء على الحفظ والمراجعة'
                : 'An annual competition honoring Quran memorizers and encouraging revision'
            }
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="/images/quran-year9-winners.jpg"
                alt={isArabic ? 'مسابقة آل سبكي للقرآن الكريم' : 'Al Sobky Quran Competition'}
                className="h-[220px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[320px] lg:h-[360px]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={isArabic ? 'text-right' : 'text-left'}>
              <p
                className="mb-6 text-sm leading-8 text-muted-foreground dark:text-white/70 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic
                  ? 'تهدف المسابقة إلى تشجيع الأطفال والشباب على حفظ كتاب الله، وتكريم النماذج المتميزة، وترسيخ قيمة التنافس الشريف في الخير.'
                  : 'The competition encourages children and youth to memorize the Quran, honors outstanding participants, and promotes positive competition in goodness.'}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {levels.map((level, i) => {
                  const Icon = level.icon;

                  return (
                    <motion.div
                      key={level.ar}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-2xl border border-primary/10 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
                    >
                      <Icon className="mx-auto mb-2 text-[#f69e12]" size={28} />
                      <p
                        className="text-sm font-black text-primary dark:text-white"
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                      >
                        {isArabic ? level.ar : level.en}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 dark:bg-slate-900 sm:py-20 lg:py-24" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={isArabic ? 'مسابقة ورتّل' : 'Wartel Competition'}
            subtitle={
              isArabic
                ? 'مسابقة لاكتشاف المواهب الصوتية في تلاوة القرآن الكريم'
                : 'A competition for discovering distinguished Quran recitation voices'
            }
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div className={isArabic ? 'order-2 text-right lg:order-1' : 'order-2 text-left lg:order-1'}>
              <p
                className="mb-6 text-sm leading-8 text-muted-foreground dark:text-white/70 sm:text-base"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic
                  ? 'تركز مسابقة ورتّل على حسن الأداء وجمال التلاوة، مع الاهتمام بمخارج الحروف وأحكام التجويد وإظهار المواهب الصوتية القرآنية.'
                  : 'Wartel focuses on performance, beautiful recitation, pronunciation, tajweed rules, and highlighting Quranic voice talents.'}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {wartelItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-primary/10 bg-white p-4 text-center text-sm font-black text-primary shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <Mic className="mx-auto mb-2 text-[#f69e12]" size={24} />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="order-1 overflow-hidden rounded-3xl shadow-xl lg:order-2">
              <img
                src="/images/s1.jpg"
                alt={isArabic ? 'مسابقة ورتل لتلاوة القرآن الكريم' : 'Wartel Quran Recitation Competition'}
                className="h-[220px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[320px] lg:h-[360px]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-20 lg:py-24" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={isArabic ? 'استمارة تواصل سريع' : 'Quick Contact Form'}
            subtitle={
              isArabic
                ? 'املأ البيانات وسيتم فتح واتساب برسالة جاهزة'
                : 'Fill in the data and WhatsApp will open with a ready message'
            }
          />

          <form
            onSubmit={handleWhatsAppSubmit}
            className="space-y-4 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10 sm:space-y-5 sm:p-8"
          >
            <div className="relative">
              <User
                className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                  isArabic ? 'right-4' : 'left-4'
                }`}
                size={19}
              />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder={isArabic ? 'الاسم بالكامل' : 'Full Name'}
                className={`min-h-[48px] w-full rounded-xl border-2 border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:bg-white/10 dark:text-white ${
                  isArabic ? 'pr-12 text-right' : 'pl-12 text-left'
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}
              />
            </div>

            <div className="relative">
              <Phone
                className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                  isArabic ? 'right-4' : 'left-4'
                }`}
                size={19}
              />
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                className={`min-h-[48px] w-full rounded-xl border-2 border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:bg-white/10 dark:text-white ${
                  isArabic ? 'pr-12 text-right' : 'pl-12 text-left'
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}
              />
            </div>

            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              dir={isArabic ? 'rtl' : 'ltr'}
              className={
                'min-h-[48px] w-full rounded-xl border-2 border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:bg-slate-900 dark:text-white ' +
                (isArabic ? 'text-right' : 'text-left')
              }
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <option value="">
                {isArabic ? 'اختر المستوى أو نوع المسابقة' : 'Select level or competition'}
              </option>

              {levels.map((level) => (
                <option key={level.ar} value={isArabic ? level.ar : level.en}>
                  {isArabic ? level.ar : level.en}
                </option>
              ))}

              <option value={isArabic ? 'مسابقة ورتّل' : 'Wartel Competition'}>
                {isArabic ? 'مسابقة ورتّل' : 'Wartel Competition'}
              </option>
            </select>

            <button
              type="submit"
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-black text-primary-foreground shadow-md transition-all hover:bg-primary/90 sm:text-base"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Send size={19} />
              {isArabic ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
            </button>
          </form>
        </div>
      </section>

      <section className="bg-muted/20 py-16 dark:bg-slate-900 sm:py-20 lg:py-24" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle
            title={isArabic ? 'قائمة الفائزين' : 'Winners List'}
            subtitle={
              isArabic
                ? 'تكريم حفظة كتاب الله الكريم وتشجيع المتميزين في المسابقات القرآنية'
                : 'Honoring Quran memorizers and outstanding participants in Quran competitions'
            }
          />

          <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 lg:mb-10">
            {winnerStats.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-3xl border border-primary/10 bg-white p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/10"
                >
                  <Icon className="mx-auto mb-3 text-accent" size={30} />
                  <p className="text-2xl font-black text-primary dark:text-white">
                    {item.value}
                  </p>
                  <p
                    className="mt-1 text-sm font-bold text-muted-foreground dark:text-white/70"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mb-8 rounded-[2rem] border border-primary/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-5 lg:mb-10">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search
                  size={20}
                  className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                    isArabic ? 'right-4' : 'left-4'
                  }`}
                />

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    isArabic
                      ? 'ابحث باسم الفائز أو المستوى أو الفئة أو السنة'
                      : 'Search by winner name, level, category, or year'
                  }
                  className={`min-h-[48px] w-full rounded-2xl border border-primary/10 bg-muted/40 px-4 text-sm font-bold outline-none transition-all focus:border-primary focus:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white ${
                    isArabic ? 'pr-12 text-right' : 'pl-12 text-left'
                  }`}
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedYear('all')}
                  className={`min-h-[42px] rounded-full px-4 py-2.5 text-xs font-black transition-all sm:px-5 sm:text-sm ${
                    selectedYear === 'all'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 dark:bg-white/10 dark:text-white/70'
                  }`}
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {isArabic ? 'جميع السنوات' : 'All Years'}
                </button>

                {YEARS.map((year) => (
                  <button
                    type="button"
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`min-h-[42px] rounded-full px-4 py-2.5 text-xs font-black transition-all sm:px-5 sm:text-sm ${
                      selectedYear === year
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted text-muted-foreground hover:bg-primary/10 dark:bg-white/10 dark:text-white/70'
                    }`}
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredWinners.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedYear}-${query}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-12"
              >
                {YEARS.filter((year) => selectedYear === 'all' || selectedYear === year).map((year) => {
                  const yearWinners = filteredWinners.filter((winner) => winner.year === year);

                  if (yearWinners.length === 0) return null;

                  return (
                    <motion.div
                      key={year}
                      initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                      className="overflow-hidden rounded-[2rem] border border-primary/10 bg-white/60 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-5"
                    >
                      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <motion.h3
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 }}
                          className="text-xl font-black text-primary dark:text-white sm:text-2xl"
                          style={{ fontFamily: "'Cairo', sans-serif" }}
                        >
                          {isArabic ? `فائزين سنة ${year}` : `${year} Winners`}
                        </motion.h3>

                        <motion.span
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.12 }}
                          className="w-fit rounded-full bg-accent/15 px-4 py-2 text-xs font-black text-accent"
                          style={{ fontFamily: "'Cairo', sans-serif" }}
                        >
                          {yearWinners.length} {isArabic ? 'فائز' : 'Winners'}
                        </motion.span>
                      </div>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                          hidden: {},
                          show: {
                            transition: {
                              staggerChildren: 0.07,
                            },
                          },
                        }}
                        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
                      >
                        {yearWinners.map((winner, i) => (
                          <motion.div
                            key={`${winner.name}-${winner.year}-${i}`}
                            variants={{
                              hidden: { opacity: 0, y: 24, scale: 0.96 },
                              show: { opacity: 1, y: 0, scale: 1 },
                            }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-2 hover:border-accent hover:shadow-xl dark:border-white/10 dark:bg-white/10"
                          >
                            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-[#279782] to-[#f69e12]" />

                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent/25 to-accent/5 text-accent transition-all group-hover:scale-110">
                              <Trophy size={32} />
                            </div>

                            <span
                              className="mb-3 inline-flex rounded-full bg-primary/5 px-3 py-1 text-xs font-black text-primary dark:bg-white/10 dark:text-white"
                              style={{ fontFamily: "'Cairo', sans-serif" }}
                            >
                              {isArabic ? 'فائز' : 'Winner'}
                            </span>

                            <h3
                              className="mb-2 text-lg font-black text-foreground dark:text-white"
                              style={{ fontFamily: "'Cairo', sans-serif" }}
                            >
                              {winner.name}
                            </h3>

                            <p
                              className="mb-1 text-sm font-black text-accent"
                              style={{ fontFamily: "'Cairo', sans-serif" }}
                            >
                              {winner.rank}
                            </p>

                            <p
                              className="mb-1 text-xs font-bold text-primary dark:text-white/85"
                              style={{ fontFamily: "'Cairo', sans-serif" }}
                            >
                              {winner.category}
                            </p>

                            <p
                              className="mb-4 text-xs text-muted-foreground dark:text-white/60"
                              style={{ fontFamily: "'Cairo', sans-serif" }}
                            >
                              {winner.level}
                            </p>

                            <div className="flex items-center justify-center gap-2 rounded-full bg-muted px-3 py-2 text-xs font-bold text-muted-foreground dark:bg-white/10 dark:text-white/65">
                              <Medal size={15} className="text-accent" />
                              <span style={{ fontFamily: "'Cairo', sans-serif" }}>
                                {isArabic ? 'دورة' : 'Cycle'} {winner.year}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="mx-auto max-w-xl rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-10">
              <Award className="mx-auto mb-4 text-accent" size={46} />

              <h2
                className="mb-2 text-xl font-black text-primary dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic ? 'لا توجد نتائج مطابقة' : 'No matching results'}
              </h2>

              <p
                className="text-sm text-muted-foreground dark:text-white/65"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic
                  ? 'جرّب تغيير سنة البحث أو كلمة البحث.'
                  : 'Try changing the year filter or search keyword.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

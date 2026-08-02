import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpenCheck,
  ExternalLink,
  Medal,
  Mic2,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { GoldDivider, IslamicPattern, Layout, SectionTitle } from '@/components/Layout';

const facebookPage = 'https://www.facebook.com/alsobkiquran';

const highlights = [
  {
    icon: Trophy,
    value: '1.5 مليون جنيه',
    title: 'إجمالي الجوائز',
    text: 'جوائز نقدية ورحلات عمرة وتكريم لمختلف المستويات ومكاتب التحفيظ.',
  },
  {
    icon: Medal,
    value: '6 مستويات',
    title: 'مسارات الحفظ',
    text: 'من ثلاثة أجزاء وحتى القرآن الكريم كاملًا، وفق الضوابط المعلنة.',
  },
  {
    icon: Mic2,
    value: 'مسابقة ورتّل',
    title: 'أجمل أداء صوتي',
    text: 'مسار لاكتشاف الأصوات المميزة في التلاوة والتجويد وحسن الأداء.',
  },
  {
    icon: Users,
    value: 'العام التاسع',
    title: 'رحلة مستمرة',
    text: 'تسعة أعوام من تشجيع حفظة كتاب الله والاحتفاء بمكاتب التحفيظ.',
  },
];

const stages = [
  ['فتح التسجيل', 'استقبال طلبات المتسابقين ومكاتب التحفيظ عبر منصة المسابقة.'],
  ['التصفيات الأولى', 'اختبارات منظمة لجميع المستويات وفق جداول زمنية معلنة.'],
  ['التصفية النهائية', 'اختيار المتميزين بإشراف لجان متخصصة في الحفظ والتجويد.'],
  ['إعلان النتائج', 'نشر أسماء الفائزين والمكرمين تباعًا عبر الصفحة الرسمية.'],
  ['الحفل الختامي', 'ليلة احتفاء بأهل القرآن وتكريم الفائزين والمحفظين والمكاتب.'],
];

const gallery = [
  ['/images/quran-year9-stage.jpg', 'المسرح الرئيسي للحفل الختامي'],
  ['/images/quran-year9-winners.jpg', 'حفظة كتاب الله خلال حفل التكريم'],
  ['/images/quran-year9-reciter.jpg', 'القارئ محمد القلاچي'],
  ['/images/quran-year9-guests.jpg', 'ضيوف الحفل الختامي'],
  ['/images/quran-year9-founder.jpg', 'كلمة المهندس أيمن السبكي'],
  ['/images/quran-year9-title.jpg', 'هوية العام التاسع'],
  ['/images/quran-year9-book.jpg', 'التجهيزات الفنية للحفل'],
  ['/images/quran-year9-entrance.jpg', 'مدخل فعاليات العام التاسع'],
];

export default function YearNine() {
  useEffect(() => {
    document.title = 'العام التاسع | مسابقة آل سبكي للقرآن الكريم';
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Layout>
      <section className="relative isolate min-h-[720px] overflow-hidden bg-[#071d39] pt-24 text-white">
        <img
          src="/images/quran-year9-stage.jpg"
          alt="الحفل الختامي للعام التاسع من مسابقة آل سبكي"
          className="absolute inset-0 -z-30 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-20 bg-gradient-to-l from-[#071d39] via-[#071d39]/92 to-[#071d39]/45" />
        <div className="absolute inset-0 -z-10 opacity-10">
          <IslamicPattern className="h-full w-full text-[#d7ad61]" />
        </div>

        <div className="mx-auto flex min-h-[620px] max-w-[1400px] items-center px-4 py-16 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d7ad61]/40 bg-[#d7ad61]/15 px-4 py-2 text-sm font-black text-[#f0ca84] backdrop-blur">
              <Sparkles size={18} />
              مسابقة آل سبكي للقرآن الكريم
            </span>
            <h1 className="mt-7 text-4xl font-black leading-[1.35] sm:text-6xl lg:text-7xl">
              العام التاسع
              <span className="block text-[#d7ad61]">ليلة تليق بأهل القرآن</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-white/78">
              رحلة بدأت بالتسجيل والاختبارات، واختُتمت بأمسية كبرى للاحتفاء بحفظة كتاب الله،
              وتكريم الفائزين والمحفظين ومكاتب التحفيظ المتميزة.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={facebookPage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center gap-2 rounded-xl bg-[#d7ad61] px-6 py-3 font-black text-[#071d39] transition hover:bg-[#efca83]"
              >
                الصفحة الرسمية
                <ExternalLink size={18} />
              </a>
              <Link
                to="/competitions"
                className="inline-flex min-h-[50px] items-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-black backdrop-blur transition hover:bg-white hover:text-[#071d39]"
              >
                مستويات المسابقة والفائزون
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f6f8fb] py-16 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle
            title="أرقام ومحطات العام التاسع"
            subtitle="مسابقة متكاملة تجمع الحفظ والتجويد وحسن الأداء وتقدير صُنّاع الأثر"
          />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map(({ icon: Icon, value, title, text }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-[#0b4d82]/10 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b4d82] text-[#e5bb6c]">
                  <Icon size={28} />
                </div>
                <p className="mt-5 text-2xl font-black text-[#0b4d82] dark:text-[#e5bb6c]">{value}</p>
                <h2 className="mt-2 text-lg font-black text-slate-950 dark:text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
          <div>
            <GoldDivider />
            <h2 className="text-3xl font-black leading-tight text-[#0b4d82] dark:text-white sm:text-5xl">
              من التسجيل إلى منصة التكريم
            </h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-white/65">
              تجربة منظمة تحفظ قيمة المنافسة، وتمنح كل متسابق فرصة عادلة لإظهار حفظه
              وإتقانه، ثم تحتفي بالمتفوقين في حضور أسرهم وضيوف المسابقة.
            </p>
            <img
              src="/images/quran-year9-book.jpg"
              alt="مجسم المصحف في الحفل الختامي"
              className="mt-8 h-80 w-full rounded-[2rem] object-cover shadow-xl"
            />
          </div>

          <div className="space-y-4">
            {stages.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="flex gap-4 rounded-3xl border border-[#0b4d82]/10 bg-[#f8fafc] p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e5bb6c] font-black text-[#071d39]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0b4d82] dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-white/65">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071d39] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title="مشاهد من الحفل الختامي" subtitle="هوية بصرية تليق بكتاب الله وحفظته" />
          <div className="grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map(([src, alt], index) => (
              <motion.figure
                key={src}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-3xl ${index === 0 || index === 5 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <img src={src} alt={alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-16 text-sm font-black">
                  {alt}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8fb] py-16 text-center dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4">
          <BookOpenCheck className="mx-auto text-[#d7ad61]" size={46} />
          <h2 className="mt-5 text-3xl font-black text-[#0b4d82] dark:text-white">تابع أخبار أهل القرآن</h2>
          <p className="mt-4 leading-8 text-slate-600 dark:text-white/65">
            النتائج، مقاطع التلاوة، أخبار «ورتّل»، ومشاهد التكريم منشورة عبر الصفحة الرسمية للمسابقة.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/quran-news" className="rounded-xl bg-[#0b4d82] px-6 py-3 font-black text-white">
              أخبار المسابقة
            </Link>
            <a href={facebookPage} target="_blank" rel="noreferrer" className="rounded-xl border-2 border-[#0b4d82] px-6 py-3 font-black text-[#0b4d82] dark:border-white dark:text-white">
              زيارة فيسبوك
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

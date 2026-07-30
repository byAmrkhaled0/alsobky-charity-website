import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpLeft, CalendarDays, Mic2, Trophy, Users } from 'lucide-react';
import { IslamicPattern, Layout, SectionTitle } from '@/components/Layout';

const news = [
  {
    title: 'الحفل الختامي للعام التاسع',
    text: 'أمسية كبرى للاحتفاء بحفظة كتاب الله وتكريم الفائزين والمحفظين ومكاتب التحفيظ، بمشاركة اللواء طارق مرزوق محافظ الدقهلية.',
    image: '/images/quran-year9-stage.jpg',
    link: 'https://www.facebook.com/alsobkiquran/posts/1460559432783980/',
    tag: 'الحفل الختامي',
  },
  {
    title: 'تلاوة القارئ محمد القلاچي',
    text: 'افتُتح الحفل الختامي بآيات من كتاب الله بصوت فضيلة القارئ محمد القلاچي، في بداية روحانية لليلة التكريم.',
    image: '/images/quran-year9-reciter.jpg',
    link: 'https://www.facebook.com/alsobkiquran/posts/1457065486466708/',
    tag: 'تلاوات',
  },
  {
    title: 'كلمة المهندس أيمن السبكي',
    text: 'رحّب المهندس أيمن السبكي بضيوف الحفل والحضور، مؤكدًا أن اللقاء مخصص لتكريم أهل القرآن وتقدير رحلتهم المباركة.',
    image: '/images/quran-year9-founder.jpg',
    link: 'https://www.facebook.com/alsobkiquran/posts/1461401519366438/',
    tag: 'كلمات الحفل',
  },
  {
    title: 'نتائج وتكريم الفائزين',
    text: 'إعلان نتائج مستويات المسابقة تباعًا، وتكريم المتميزين من المتسابقين ومكاتب التحفيظ والمحفظين.',
    image: '/images/quran-year9-winners.jpg',
    link: 'https://www.facebook.com/alsobkiquran/posts/1430543185785605/',
    tag: 'النتائج',
  },
  {
    title: 'مسابقة ورتّل لأفضل أداء صوتي',
    text: 'مسار متخصص لاكتشاف الأصوات القرآنية المتميزة وتقييم جمال الصوت وأحكام التجويد وحسن الأداء ومخارج الحروف.',
    image: '/images/quran-year9-title.jpg',
    link: 'https://www.facebook.com/alsobkiquran/posts/1423290333177557/',
    tag: 'ورتّل',
  },
  {
    title: 'جوائز وتقدير صُنّاع الأثر',
    text: 'جوائز إجمالية منشورة بلغت 1.5 مليون جنيه، تنوعت بين الجوائز النقدية ورحلات العمرة، دعمًا وتشجيعًا لحفظة القرآن.',
    image: '/images/quran-year9-guests.jpg',
    link: 'https://www.facebook.com/alsobkiquran',
    tag: 'جوائز',
  },
];

export default function QuranNews() {
  useEffect(() => {
    document.title = 'أخبار مسابقة آل سبكي للقرآن الكريم';
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#071d39] pb-16 pt-36 text-white sm:pt-44">
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-[#e5bb6c]" />
        </div>
        <div className="relative mx-auto max-w-[1100px] px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e5bb6c]/15 px-4 py-2 font-black text-[#e5bb6c]">
            <CalendarDays size={18} />
            أحدث التغطيات الرسمية
          </span>
          <h1 className="mt-6 text-4xl font-black sm:text-6xl">أخبار أهل القرآن</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-9 text-white/70">
            نتائج المسابقة، مشاهد الحفل، التلاوات، وأخبار «ورتّل» من الصفحة الرسمية لمسابقة آل سبكي.
          </p>
        </div>
      </section>

      <section className="bg-[#f6f8fb] py-16 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title="أبرز أخبار العام التاسع" subtitle="كل بطاقة مرتبطة بالمنشور الرسمي لمزيد من الصور والتفاصيل" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {news.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group overflow-hidden rounded-[2rem] border border-[#0b4d82]/10 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  <span className="absolute right-4 top-4 rounded-full bg-[#e5bb6c] px-4 py-2 text-xs font-black text-[#071d39]">{item.tag}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-black leading-8 text-[#0b4d82] dark:text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-8 text-slate-600 dark:text-white/65">{item.text}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-black text-[#0b4d82] transition hover:text-[#c38d36] dark:text-[#e5bb6c]">
                    مشاهدة المصدر الرسمي
                    <ArrowUpLeft size={18} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-14 grid gap-4 rounded-[2rem] bg-[#071d39] p-6 text-white sm:grid-cols-3 sm:p-8">
            {[
              [Trophy, 'تكريم الفائزين', 'بمختلف مستويات الحفظ'],
              [Mic2, 'مسابقة ورتّل', 'للأداء الصوتي المتميز'],
              [Users, 'مكاتب التحفيظ', 'تقديرًا للجهد والإخلاص'],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof Trophy;
              return (
                <div key={String(title)} className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">
                  <ItemIcon className="shrink-0 text-[#e5bb6c]" size={30} />
                  <div>
                    <p className="font-black">{String(title)}</p>
                    <p className="mt-1 text-sm text-white/65">{String(text)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

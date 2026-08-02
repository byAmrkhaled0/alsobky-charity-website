import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Eye,
  Gem,
  HeartHandshake,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  UserRoundCheck,
  HandHeart,
} from 'lucide-react';
import { Layout, SectionTitle, IslamicPattern, GoldDivider } from '@/components/Layout';
import { ROUTE_PATHS } from '@/lib/index';

type Lang = 'ar' | 'en';

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
    title: 'عن المؤسسة | مؤسسة حسن إبراهيم السبكي الخيرية',
    heroTitle: 'عن مؤسسة حسن إبراهيم السبكي الخيرية',
    heroSubtitle: 'رحلة خير في خدمة كتاب الله والمجتمع',
    aboutTitle: 'من نحن',
    aboutP1:
      'مؤسسة حسن إبراهيم السبكي الخيرية تهدف إلى تقديم الدعم والمساندة للأسر في جميع أنحاء مصر، مع التركيز على تحفيظ القرآن الكريم وتعليم علومه للأطفال والشباب وتعزيز القيم في المجتمع.',
    aboutP2:
      'تعمل المؤسسة على تنظيم مسابقات قرآنية، وتشجيع الأطفال والشباب على الحفظ والتلاوة، بجانب دعم المبادرات المجتمعية والأنشطة الخيرية لتكون رافدًا حقيقيًا للخير في مجتمعها.',
    aboutP3:
      'تسعى المؤسسة إلى تقديم نموذج منظم وموثوق للعمل الخيري والتعليمي، قائم على الشفافية، ورعاية المواهب القرآنية، وخدمة الأسر والمجتمع.',
    officialRegister: 'التسجيل الرسمي',
    contactUs: 'تواصل معنا',
    years: 'سنوات من العطاء',
    ownersTitle: 'أصحاب المؤسسة',
    ownersSubtitle: 'رجال عُرفوا بحب الخير وخدمة القرآن والمجتمع',
    owners: [
      {
        icon: UserRoundCheck,
        name: 'الحاج إبراهيم حسن السبكي',
        role: 'من أصحاب المؤسسة والمشهورين بحب الخير',
        bio: 'ساهم في دعم مسيرة المؤسسة ورسالتها في خدمة القرآن الكريم والمجتمع، وتشجيع أعمال الخير والعطاء.',
      },
      {
        icon: HandHeart,
        name: 'الحاج أيمن حسن السبكي',
        role: 'من أصحاب المؤسسة والمشهورين بحب الخير',
        bio: 'يدعم جهود المؤسسة في رعاية حفظة القرآن الكريم، وخدمة المجتمع، وتنمية المبادرات الخيرية.',
      },
    ],
    visionTitle: 'رؤيتنا ورسالتنا وقيمنا',
    visionSubtitle: 'مبادئ ثابتة تقود العمل داخل المؤسسة',
    cards: [
      {
        icon: Eye,
        title: 'الرؤية',
        content:
          'أن تكون المؤسسة شريكًا مفضلًا في تعليم وحفظ القرآن الكريم ودعم الجيل الناشئ ليكونوا حافظين لكتاب الله وعاملين به في حياتهم اليومية.',
      },
      {
        icon: Target,
        title: 'الرسالة',
        content:
          'رعاية حفظة القرآن الكريم ودعم المجتمع ببرامج خيرية وتعليمية منظمة تسهم في بناء جيل مرتبط بالقيم والعطاء.',
      },
      {
        icon: Gem,
        title: 'القيم',
        content:
          'الإخلاص، الأمانة، العطاء، الشفافية، المسؤولية المجتمعية، وخدمة الناس بصدق واحترام.',
      },
    ],
    impactTitle: 'أثر المؤسسة',
    impactSubtitle: 'أرقام وأنشطة تعبّر عن مسيرة الخير',
    impact: [
      { icon: Users, value: '10,000+', label: 'متسابق في آخر عام' },
      { icon: Trophy, value: '1,800+', label: 'فائز سابق' },
      { icon: BookOpen, value: '9+', label: 'سنوات من خدمة القرآن' },
      { icon: HeartHandshake, value: '22+', label: 'فعالية ومبادرة' },
    ],
    programsTitle: 'ما الذي تقدمه المؤسسة؟',
    programsSubtitle: 'أنشطة قرآنية وخيرية ومجتمعية متكاملة',
    programs: [
      {
        icon: BookOpen,
        title: 'تحفيظ القرآن الكريم',
        text: 'برامج تعليمية تساعد الأطفال والشباب على الحفظ والمراجعة والتلاوة الصحيحة.',
      },
      {
        icon: Trophy,
        title: 'مسابقة آل سبكي للقرآن الكريم',
        text: 'مسابقة سنوية لحفظ القرآن الكريم على عدة مستويات حتى عمر 18 سنة، بهدف تشجيع حفظة كتاب الله وتكريم المتميزين.',
      },
      {
        icon: ShieldCheck,
        title: 'مسابقة ورتّل لأجمل أداء صوتي',
        text: 'مبادرة لاكتشاف المواهب الصوتية في تلاوة القرآن الكريم، وصقل الأداء، وإحياء جمال الترتيل.',
      },
      {
        icon: HeartHandshake,
        title: 'خدمة المجتمع',
        text: 'دعم المبادرات الخيرية والمجتمعية التي تخدم الأسر وتساعد المحتاجين.',
      },
    ],
    ctaTitle: 'شارك معنا في صناعة أثر يبقى',
    ctaText:
      'يمكنك التسجيل في المسابقات، أو التواصل مع المؤسسة، أو دعم المبادرات الخيرية والتعليمية.',
  },
  en: {
    dir: 'ltr' as const,
    title: 'About | Hassan Ibrahim Al Sobky Charity Foundation',
    heroTitle: 'About Hassan Ibrahim Al Sobky Charity Foundation',
    heroSubtitle: 'A journey of giving in service of the Quran and community',
    aboutTitle: 'Who We Are',
    aboutP1:
      'Hassan Ibrahim Al Sobky Charity Foundation aims to support families across Egypt, with a strong focus on Quran memorization, teaching Quran sciences to children and youth, and promoting values in society.',
    aboutP2:
      'The foundation organizes Quran competitions, encourages children and youth to memorize and recite, and supports charitable and community initiatives that create real positive impact.',
    aboutP3:
      'The foundation aims to provide an organized and trusted model for charitable and educational work based on transparency, nurturing Quran talents, and serving families and society.',
    officialRegister: 'Official Registration',
    contactUs: 'Contact Us',
    years: 'Years of Giving',
    ownersTitle: 'Foundation Owners',
    ownersSubtitle: 'Known for supporting charity, Quran service, and community work',
    owners: [
      {
        icon: UserRoundCheck,
        name: 'Mr. Ibrahim Hassan Al Sobky',
        role: 'Foundation owner, known for supporting charitable work',
        bio: 'He supports the foundation’s mission in serving the Quran, the community, and encouraging charitable initiatives.',
      },
      {
        icon: HandHeart,
        name: 'Mr. Ayman Hassan Al Sobky',
        role: 'Foundation owner, known for supporting charitable work',
        bio: 'He supports the foundation’s efforts in honoring Quran memorizers, community service, and charitable development.',
      },
    ],
    visionTitle: 'Vision, Mission & Values',
    visionSubtitle: 'Clear principles guiding the foundation’s work',
    cards: [
      {
        icon: Eye,
        title: 'Vision',
        content:
          'To be a preferred partner in teaching and memorizing the Quran and supporting young generations to live by its values.',
      },
      {
        icon: Target,
        title: 'Mission',
        content:
          'Supporting Quran memorizers and serving society through organized charitable and educational programs.',
      },
      {
        icon: Gem,
        title: 'Values',
        content:
          'Sincerity, honesty, giving, transparency, social responsibility, and serving people with respect.',
      },
    ],
    impactTitle: 'Foundation Impact',
    impactSubtitle: 'Numbers and activities reflecting the journey of giving',
    impact: [
      { icon: Users, value: '10,000+', label: 'Contestants last year' },
      { icon: Trophy, value: '1,800+', label: 'Previous winners' },
      { icon: BookOpen, value: '9+', label: 'Years serving Quran' },
      { icon: HeartHandshake, value: '22+', label: 'Events and initiatives' },
    ],
    programsTitle: 'What the Foundation Offers',
    programsSubtitle: 'Integrated Quran, charity, and community activities',
    programs: [
      {
        icon: BookOpen,
        title: 'Quran Memorization',
        text: 'Educational programs that help children and youth memorize, review, and recite correctly.',
      },
      {
        icon: Trophy,
        title: 'Al Sobky Quran Competition',
        text: 'An annual Quran competition with several memorization levels up to the age of 18, encouraging and honoring Quran memorizers.',
      },
      {
        icon: ShieldCheck,
        title: 'Wartel Voice Recitation Competition',
        text: 'An initiative to discover distinguished Quran recitation voices, refine performance, and revive the beauty of Quran recitation.',
      },
      {
        icon: HeartHandshake,
        title: 'Community Service',
        text: 'Supporting charitable and community initiatives that serve families and people in need.',
      },
    ],
    ctaTitle: 'Join Us in Creating Lasting Impact',
    ctaText:
      'You can register for competitions, contact the foundation, or support charitable and educational initiatives.',
  },
};

export default function About() {
  const lang = useCurrentLanguage();
  const t = content[lang];
  const isArabic = lang === 'ar';

  useEffect(() => {
    document.title = t.title;
    window.scrollTo({ top: 0 });
  }, [t.title]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-primary pb-20 pt-44" dir={t.dir}>
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
          <GoldDivider />

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 mt-4 text-4xl font-black leading-tight text-white md:text-6xl"
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
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
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
                {t.aboutTitle}
              </span>

              <h2
                className="mb-5 text-3xl font-black leading-tight text-primary dark:text-white md:text-4xl"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {t.aboutTitle}
              </h2>

              <p className="mb-4 text-base leading-9 text-foreground dark:text-white/85" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {t.aboutP1}
              </p>

              <p className="mb-4 text-sm leading-8 text-muted-foreground dark:text-white/65 md:text-base" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {t.aboutP2}
              </p>

              <p className="text-sm leading-8 text-muted-foreground dark:text-white/65 md:text-base" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {t.aboutP3}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://alsobky.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#f69e12] px-6 py-3 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-1 hover:brightness-110"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {t.officialRegister}
                  <ArrowLeft size={18} className={isArabic ? '' : 'rotate-180'} />
                </a>

                <Link
                  to={ROUTE_PATHS.CONTACT}
                  className="rounded-2xl border border-primary/20 px-6 py-3 text-sm font-black text-primary transition-all hover:bg-primary hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-primary"
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
              <div className="grid grid-cols-2 gap-4">
                {['/images/a7.jpg', '/images/a6.jpg', '/images/a8.jpg',].map(
                  (src, i) => (
                    <div key={`${src}-${i}`} className={`overflow-hidden rounded-[2rem] bg-white shadow-xl dark:bg-white/10 ${i % 2 === 1 ? 'mt-10' : ''}`}>
                      <img
                        src={src}
                        alt={t.aboutTitle}
                        loading="lazy"
                        className="h-44 w-full object-contain object-center transition-transform duration-700 hover:scale-110 md:h-56"
                      />
                    </div>
                  )
                )}
              </div>

              <div className={`absolute -bottom-5 rounded-3xl bg-[#f69e12] px-6 py-4 text-white shadow-2xl ${isArabic ? '-left-4' : '-right-4'}`}>
                <p className="text-3xl font-black">9+</p>
                <p className="text-xs font-bold">{t.years}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24 dark:bg-slate-900" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.ownersTitle} subtitle={t.ownersSubtitle} />

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {t.owners.map((owner, i) => {
              const Icon = owner.icon;

              return (
                <motion.div
                  key={owner.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] dark:bg-white/10 dark:text-[#f69e12]">
                    <Icon size={32} />
                  </div>

                  <h3 className="mb-2 text-2xl font-black text-primary dark:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {owner.name}
                  </h3>

                  <p className="mb-3 text-sm font-bold text-[#f69e12]" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {owner.role}
                  </p>

                  <p className="text-sm leading-8 text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {owner.bio}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 dark:bg-slate-950" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.visionTitle} subtitle={t.visionSubtitle} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.cards.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] dark:bg-white/10 dark:text-[#f69e12]">
                    <Icon size={29} />
                  </div>

                  <h3 className="mb-3 text-xl font-black text-primary dark:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {item.title}
                  </h3>

                  <p className="text-sm leading-8 text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {item.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-24 dark:bg-slate-900" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.impactTitle} subtitle={t.impactSubtitle} />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.impact.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-3xl border border-primary/10 bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f69e12]/15 text-[#f69e12]">
                    <Icon size={29} />
                  </div>

                  <p className="text-3xl font-black text-primary dark:text-white">{item.value}</p>

                  <p className="mt-2 text-sm font-bold text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 dark:bg-slate-950" dir={t.dir}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionTitle title={t.programsTitle} subtitle={t.programsSubtitle} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {t.programs.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`group flex gap-5 rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] transition-all group-hover:bg-[#279782] group-hover:text-white">
                    <Icon size={29} />
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-black text-primary dark:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {item.title}
                    </h3>

                    <p className="text-sm leading-8 text-muted-foreground dark:text-white/65" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
            {t.ctaText}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://alsobky.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#f69e12] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.officialRegister}
            </a>

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
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  UserCheck,
  Scale,
  Gift,
  Camera,
  ShieldCheck,
  CalendarClock,
} from 'lucide-react';
import { Layout, IslamicPattern, GoldDivider } from '@/components/Layout';

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
    title: 'الشروط والأحكام | مؤسسة حسن إبراهيم السبكي الخيرية',
    heroTitle: 'الشروط والأحكام',
    heroSubtitle: 'شروط التسجيل والمشاركة في مسابقات مؤسسة حسن إبراهيم السبكي الخيرية',
    intro:
      'يرجى قراءة الشروط بعناية قبل التسجيل في أي مسابقة أو نشاط تابع للمؤسسة، لضمان وضوح آلية المشاركة والتقييم.',
    updated: 'آخر تحديث: يناير 2026',
    sections: [
      {
        icon: ClipboardCheck,
        title: 'شروط الاشتراك في المسابقة',
        content:
          'يحق لكل مسلم ومسلمة الاشتراك في المسابقة بشرط إتمام الحفظ للمستوى المتقدم للاشتراك فيه، مع الالتزام بالشروط المعلنة لكل مسابقة أو مستوى.',
      },
      {
        icon: UserCheck,
        title: 'صحة البيانات',
        content:
          'يلتزم المتسابق بتقديم بيانات صحيحة وحقيقية عند التسجيل، وتحتفظ المؤسسة بحق استبعاد أي متسابق يثبت تقديمه بيانات غير صحيحة أو غير مكتملة.',
      },
      {
        icon: Scale,
        title: 'آلية التقييم',
        content:
          'يتم التقييم من خلال لجنة متخصصة وفق معايير واضحة تشمل صحة الحفظ، جودة التلاوة، أحكام التجويد، الأداء العام، والالتزام بضوابط المسابقة.',
      },
      {
        icon: Gift,
        title: 'الجوائز والتكريم',
        content:
          'تُمنح الجوائز للفائزين وفق القرارات المعتمدة من إدارة المؤسسة ولجنة التحكيم، وتعد قرارات لجنة التحكيم نهائية بعد إعلان النتائج.',
      },
      {
        icon: Camera,
        title: 'الاستخدام الإعلامي',
        content:
          'بقبول المشاركة، يوافق المتسابق أو ولي أمره على استخدام الاسم والصور ومقاطع الفيديو الخاصة بالفعاليات في المواد الإعلامية والتوثيقية الخاصة بالمؤسسة.',
      },
      {
        icon: ShieldCheck,
        title: 'الالتزام بالأخلاق',
        content:
          'يلتزم جميع المتسابقين وأولياء الأمور بالآداب العامة واحترام المسؤولين والمحكمين والمتسابقين الآخرين، ويحق للمؤسسة استبعاد أي مخالف.',
      },
      {
        icon: CalendarClock,
        title: 'تعديل المواعيد أو الشروط',
        content:
          'تحتفظ المؤسسة بحق تعديل مواعيد الاختبارات أو شروط المسابقة أو آلية التنظيم عند الحاجة، ويتم الاعتماد على الإعلانات الرسمية للمؤسسة.',
      },
    ],
    footerNote:
      'تحتفظ مؤسسة حسن إبراهيم السبكي الخيرية بحق تعديل هذه الشروط في أي وقت بما يحقق مصلحة التنظيم والعدالة بين المتسابقين.',
  },
  en: {
    dir: 'ltr' as const,
    title: 'Terms & Conditions | Hassan Ibrahim Al Sobky Charity Foundation',
    heroTitle: 'Terms & Conditions',
    heroSubtitle:
      'Registration and participation terms for Hassan Ibrahim Al Sobky Charity Foundation competitions',
    intro:
      'Please read these terms carefully before registering for any competition or activity organized by the foundation.',
    updated: 'Last updated: January 2026',
    sections: [
      {
        icon: ClipboardCheck,
        title: 'Competition Eligibility',
        content:
          'Any eligible participant may register for the competition, provided they have completed memorization for the selected level and comply with the announced requirements.',
      },
      {
        icon: UserCheck,
        title: 'Accuracy of Information',
        content:
          'Participants must provide accurate and complete registration information. The foundation reserves the right to exclude any participant who submits false or incomplete data.',
      },
      {
        icon: Scale,
        title: 'Evaluation Process',
        content:
          'Evaluation is conducted by a specialized committee according to clear criteria including memorization accuracy, recitation quality, tajweed rules, general performance, and competition guidelines.',
      },
      {
        icon: Gift,
        title: 'Awards and Recognition',
        content:
          'Awards are granted according to the decisions approved by the foundation management and judging committee. Judging decisions are final after results are announced.',
      },
      {
        icon: Camera,
        title: 'Media Usage',
        content:
          'By participating, the participant or guardian agrees that names, photos, and videos from events may be used in the foundation’s media and documentation materials.',
      },
      {
        icon: ShieldCheck,
        title: 'Ethical Conduct',
        content:
          'All participants and guardians must respect the organizers, judges, and other participants. The foundation reserves the right to exclude anyone who violates these rules.',
      },
      {
        icon: CalendarClock,
        title: 'Changes to Dates or Terms',
        content:
          'The foundation reserves the right to amend test dates, competition terms, or organizational procedures when necessary. Official foundation announcements shall be the reference.',
      },
    ],
    footerNote:
      'Hassan Ibrahim Al Sobky Charity Foundation reserves the right to update these terms whenever needed to ensure fairness and proper organization.',
  },
};

export default function Terms() {
  const lang = useCurrentLanguage();
  const t = content[lang];
  const isArabic = lang === 'ar';

  useEffect(() => {
    document.title = t.title;
    window.scrollTo({ top: 0 });
  }, [t.title]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-primary pb-16 pt-44" dir={t.dir}>
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <GoldDivider />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 mt-4 text-4xl font-black text-white md:text-5xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-2xl text-sm leading-7 text-white/75 md:text-base"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-20 dark:bg-slate-950" dir={t.dir}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div
            className={`mb-8 rounded-3xl border border-primary/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/10 ${
              isArabic ? 'text-right' : 'text-left'
            }`}
          >
            <p
              className="text-sm leading-8 text-muted-foreground dark:text-white/70 md:text-base"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.intro}
            </p>
          </div>

          <div className="space-y-5">
            {t.sections.map((section, i) => {
              const Icon = section.icon;

              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] dark:bg-white/10 dark:text-[#f69e12]">
                      <Icon size={25} />
                    </div>

                    <h2
                      className="text-lg font-black text-primary dark:text-white"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {i + 1}. {section.title}
                    </h2>
                  </div>

                  <p
                    className="text-sm leading-8 text-muted-foreground dark:text-white/65"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {section.content}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-[#f69e12]/20 bg-[#f69e12]/10 p-5 text-center">
            <p
              className="text-xs leading-7 text-muted-foreground dark:text-white/70"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.footerNote}
            </p>

            <p
              className="mt-2 text-xs font-bold text-[#f69e12]"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.updated}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
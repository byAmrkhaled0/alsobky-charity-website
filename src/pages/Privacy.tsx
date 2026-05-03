import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Mail,
  ShieldCheck,
  UserCheck,
  FilePenLine,
  Clock,
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
    title: 'سياسة الخصوصية | مؤسسة حسن إبراهيم السبكي الخيرية',
    heroTitle: 'سياسة الخصوصية',
    heroSubtitle:
      'نحترم خصوصيتك ونلتزم بحماية البيانات التي يتم تقديمها عند التسجيل أو التواصل معنا.',
    intro:
      'توضح هذه السياسة كيفية جمع واستخدام وحفظ بيانات المشاركين والمتواصلين مع مؤسسة حسن إبراهيم السبكي الخيرية.',
    updated: 'آخر تحديث: يناير 2026',
    contactLabel: 'للتواصل',
    email: 'alsobkycharity@gmail.com',
    sections: [
      {
        icon: Database,
        title: 'جمع البيانات',
        content:
          'نقوم بجمع البيانات الشخصية التي تقدمها طوعًا عند التسجيل في مسابقاتنا أو التواصل معنا، مثل الاسم، رقم الهاتف، البريد الإلكتروني، والبيانات المطلوبة لإتمام التسجيل أو الاستعلام.',
      },
      {
        icon: ShieldCheck,
        title: 'استخدام البيانات',
        content:
          'تُستخدم البيانات فقط لأغراض تنظيم المسابقات، التواصل مع المشاركين، إدارة الطلبات، الاستعلام عن المواعيد أو النتائج، وتحسين خدمات المؤسسة.',
      },
      {
        icon: UserCheck,
        title: 'عدم مشاركة البيانات',
        content:
          'لا نبيع أو نشارك بياناتك الشخصية مع أي طرف ثالث لأغراض تجارية، ولا يتم استخدامها خارج نطاق أنشطة المؤسسة إلا عند وجود التزام قانوني أو موافقة صريحة.',
      },
      {
        icon: Clock,
        title: 'حفظ البيانات',
        content:
          'نحتفظ بالبيانات لمدة مناسبة لتحقيق الغرض الذي جُمعت من أجله، ثم يتم حذفها أو أرشفتها بشكل آمن وفق احتياجات التنظيم والتوثيق.',
      },
      {
        icon: Mail,
        title: 'حقوقك',
        content:
          'يحق لك طلب الاطلاع على بياناتك الشخصية أو تعديلها أو حذفها من خلال التواصل معنا عبر البريد الإلكتروني الرسمي للمؤسسة.',
      },
      {
        icon: FilePenLine,
        title: 'تعديل السياسة',
        content:
          'تحتفظ المؤسسة بحق تعديل سياسة الخصوصية عند الحاجة، ويتم اعتماد النسخة المنشورة على الموقع باعتبارها النسخة الأحدث.',
      },
    ],
  },
  en: {
    dir: 'ltr' as const,
    title: 'Privacy Policy | Hassan Ibrahim Al Sobky Charity Foundation',
    heroTitle: 'Privacy Policy',
    heroSubtitle:
      'We respect your privacy and are committed to protecting the information you provide when registering or contacting us.',
    intro:
      'This policy explains how Hassan Ibrahim Al Sobky Charity Foundation collects, uses, and protects participant and contact data.',
    updated: 'Last updated: January 2026',
    contactLabel: 'Contact',
    email: 'alsobkycharity@gmail.com',
    sections: [
      {
        icon: Database,
        title: 'Data Collection',
        content:
          'We collect personal information you voluntarily provide when registering for competitions or contacting us, such as name, phone number, email address, and data needed for registration or inquiry.',
      },
      {
        icon: ShieldCheck,
        title: 'Use of Data',
        content:
          'Your data is used only for organizing competitions, contacting participants, managing requests, providing inquiry results, and improving foundation services.',
      },
      {
        icon: UserCheck,
        title: 'No Data Sharing',
        content:
          'We do not sell or share your personal data with third parties for commercial purposes. Data is not used outside foundation activities except when legally required or with explicit consent.',
      },
      {
        icon: Clock,
        title: 'Data Retention',
        content:
          'We retain data for an appropriate period to fulfill the purpose for which it was collected, then securely delete or archive it according to organizational and documentation needs.',
      },
      {
        icon: Mail,
        title: 'Your Rights',
        content:
          'You may request access to, correction of, or deletion of your personal data by contacting the foundation through its official email address.',
      },
      {
        icon: FilePenLine,
        title: 'Policy Updates',
        content:
          'The foundation reserves the right to update this privacy policy when needed. The version published on the website is considered the latest version.',
      },
    ],
  },
};

export default function Privacy() {
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

          <div className="grid grid-cols-1 gap-5">
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] dark:bg-white/10 dark:text-[#f69e12]">
                      <Icon size={25} />
                    </div>

                    <h2
                      className="text-lg font-black text-primary dark:text-white"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {section.title}
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
              className="text-xs font-bold text-[#f69e12]"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.updated}
            </p>

            <a
              href={`mailto:${t.email}`}
              className="mt-2 inline-flex items-center gap-2 text-xs font-black text-primary transition-colors hover:text-[#f69e12] dark:text-white"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Mail size={15} />
              {t.contactLabel}: {t.email}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
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
    const updateLang = () => {
      setLang(getSavedLanguage());
    };

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

const content = {
  ar: {
    dir: 'rtl' as const,
    title: 'سياسة الخصوصية | مؤسسة حسن إبراهيم السبكي الخيرية',
    description:
      'سياسة الخصوصية الخاصة بمؤسسة حسن إبراهيم السبكي الخيرية، وكيفية جمع واستخدام وحماية بيانات المشاركين والمتواصلين في مسابقات القرآن وخدمات المؤسسة.',
    keywords:
      'سياسة الخصوصية, مؤسسة حسن السبكي, بيانات المشاركين, حماية البيانات, مسابقات القرآن, مؤسسة خيرية, خصوصية المستخدم',
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
    description:
      'Privacy Policy of Hassan Ibrahim Al Sobky Charity Foundation, explaining how participant and contact data is collected, used, stored, and protected.',
    keywords:
      'privacy policy, Hassan Al Sobky Charity, participant data, data protection, Quran competitions, charity foundation privacy',
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
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;

    setMeta('description', t.description);
    setMeta('keywords', t.keywords);
    setMeta('robots', 'index, follow, max-image-preview:large');

    setPropertyMeta('og:title', t.title);
    setPropertyMeta('og:description', t.description);
    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:locale', isArabic ? 'ar_EG' : 'en_US');
    setPropertyMeta('og:image', `${window.location.origin}/images/logo.jpg`);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', t.title);
    setMeta('twitter:description', t.description);
    setMeta('twitter:image', `${window.location.origin}/images/logo.jpg`);

    window.scrollTo({ top: 0 });
  }, [isArabic, lang, t.description, t.dir, t.keywords, t.title]);

  return (
    <Layout>
      <section
        className="relative overflow-hidden bg-primary pb-14 pt-28 dark:bg-slate-950 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-40"
        dir={t.dir}
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
            className="mb-3 mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-2xl text-sm leading-7 text-white/75 sm:text-base md:text-lg"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {t.heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-14 dark:bg-slate-950 sm:py-16 lg:py-20" dir={t.dir}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mb-8 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-6 ${
              isArabic ? 'text-right' : 'text-left'
            }`}
          >
            <p
              className="text-sm leading-8 text-muted-foreground dark:text-white/70 sm:text-base"
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
                  className={`rounded-3xl border border-primary/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 sm:p-6 ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#279782]/10 text-[#279782] dark:bg-white/10 dark:text-[#f69e12]">
                      <Icon size={25} />
                    </div>

                    <h2
                      className="pt-2 text-base font-black leading-7 text-primary dark:text-white sm:text-lg"
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

          <div className="mt-8 rounded-3xl border border-[#f69e12]/20 bg-[#f69e12]/10 p-5 text-center shadow-sm">
            <p
              className="text-xs font-bold text-[#f69e12]"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t.updated}
            </p>

            <a
              href={`mailto:${t.email}`}
              className="mt-3 inline-flex min-h-[40px] max-w-full items-center justify-center gap-2 break-all rounded-full bg-white/70 px-4 py-2 text-xs font-black text-primary transition-colors hover:text-[#f69e12] dark:bg-white/10 dark:text-white"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Mail size={15} className="shrink-0" />
              <span>
                {t.contactLabel}: {t.email}
              </span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
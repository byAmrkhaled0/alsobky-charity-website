import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  User,
  FileText,
} from 'lucide-react';
import { Layout, IslamicPattern, GoldDivider } from '@/components/Layout';

type Lang = 'ar' | 'en';

const WHATSAPP_NUMBER = '201153637371';
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
      const savedLang = getSavedLanguage();
      setLang(savedLang);
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

function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Contact() {
  const lang = useCurrentLanguage();
  const isArabic = lang === 'ar';

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const faq = isArabic
    ? [
        {
          q: 'كيف أسجل في المسابقة؟',
          a: 'يمكنك التسجيل من خلال صفحة التسجيل الرسمية أو التواصل معنا مباشرة عبر واتساب، وسيتم توجيهك للخطوات المطلوبة.',
        },
        {
          q: 'هل يوجد مستويات مختلفة في المسابقة؟',
          a: 'نعم، توجد مستويات مختلفة حسب مقدار الحفظ، مثل 3 أجزاء، 5 أجزاء، الربع الأخير، النصف الأخير، ثلاثة أرباع القرآن، والقرآن كاملًا.',
        },
        {
          q: 'كيف أتواصل مع المؤسسة؟',
          a: 'يمكنك التواصل عبر الهاتف أو واتساب أو البريد الإلكتروني، وسيتم الرد عليك في أقرب وقت ممكن.',
        },
        {
          q: 'هل يمكن الاستفسار عن الفائزين أو نتائج المسابقة؟',
          a: 'نعم، يمكنك الاستفسار من خلال صفحة المسابقات أو إرسال رسالة مباشرة عبر واتساب.',
        },
      ]
    : [
        {
          q: 'How can I register?',
          a: 'You can register through the official registration page or contact us directly via WhatsApp for guidance.',
        },
        {
          q: 'Are there different competition levels?',
          a: 'Yes, levels are based on memorization, such as 3 parts, 5 parts, quarter Quran, half Quran, three quarters, and full Quran.',
        },
        {
          q: 'How can I contact the foundation?',
          a: 'You can contact us by phone, WhatsApp, or email, and we will respond as soon as possible.',
        },
        {
          q: 'Can I ask about winners or competition results?',
          a: 'Yes, you can check the competitions page or send us a direct WhatsApp message.',
        },
      ];

  useEffect(() => {
    const title = isArabic
      ? 'تواصل معنا | مؤسسة حسن إبراهيم السبكي الخيرية'
      : 'Contact Us | Hassan Ibrahim Al Sobky Charity Foundation';

    const description = isArabic
      ? 'تواصل مع مؤسسة حسن إبراهيم السبكي الخيرية للاستفسار عن مسابقات القرآن الكريم، التسجيل، الفائزين، التبرعات، وخدمة المجتمع.'
      : 'Contact Hassan Ibrahim Al Sobky Charity Foundation for Quran competitions, registration, winners, donations, and community service inquiries.';

    const keywords = isArabic
      ? 'تواصل مؤسسة حسن السبكي, رقم مؤسسة حسن السبكي, واتساب مؤسسة حسن السبكي, مسابقات القرآن, تحفيظ القرآن, مؤسسة خيرية'
      : 'Contact Hassan Al Sobky Charity, WhatsApp Hassan Al Sobky, Quran competitions, Quran memorization, charity foundation Egypt';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = isArabic
      ? `السلام عليكم، أريد التواصل مع مؤسسة حسن إبراهيم السبكي الخيرية.

الاسم: ${form.name}
رقم الهاتف: ${form.phone}
الرسالة: ${form.message || 'لا توجد رسالة إضافية'}`
      : `Hello, I would like to contact Hassan Ibrahim Al Sobky Charity Foundation.

Name: ${form.name}
Phone: ${form.phone}
Message: ${form.message || 'No extra message'}`;

    window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout>
      <section
        className="relative overflow-hidden bg-primary pb-14 pt-28 text-center dark:bg-slate-950 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-40"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="absolute inset-0 opacity-10">
          <IslamicPattern className="h-full w-full text-accent" />
        </div>

        <div className="absolute -right-24 top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <GoldDivider />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {isArabic ? 'تواصل معنا' : 'Contact Us'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-2xl text-sm leading-7 text-white/75 sm:text-base md:text-lg"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {isArabic
              ? 'نسعد بتواصلكم معنا للاستفسار عن المسابقات، التسجيل، التبرعات، أو أي خدمة تخص المؤسسة.'
              : 'We are happy to hear from you about competitions, registration, donations, or any foundation service.'}
          </motion.p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={getWhatsAppLink(isArabic ? 'السلام عليكم، أريد التواصل مع المؤسسة' : 'Hello, I would like to contact the foundation')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-green-600"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <MessageCircle size={18} />
              {isArabic ? 'تواصل واتساب' : 'WhatsApp Contact'}
            </a>

            <a
              href="mailto:alsobkycharity@gmail.com"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-black text-white transition-all hover:bg-white hover:text-primary"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Mail size={18} />
              {isArabic ? 'راسلنا بالبريد' : 'Email Us'}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 dark:bg-slate-950 sm:py-20 lg:py-24" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-7"
          >
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <h2
                className="mb-3 text-2xl font-black text-primary dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic ? 'بيانات التواصل' : 'Contact Information'}
              </h2>

              <p
                className="mb-6 text-sm leading-7 text-muted-foreground dark:text-white/70"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic
                  ? 'يمكنك التواصل معنا مباشرة من خلال الوسائل التالية.'
                  : 'You can contact us directly through the following channels.'}
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+201153637371"
                className="flex min-h-[54px] items-center gap-3 rounded-2xl border border-primary/10 bg-muted/40 px-4 py-3 text-sm font-bold text-foreground transition-all hover:border-primary hover:bg-primary/5 dark:border-white/10 dark:bg-white/10 dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-white/10 dark:text-accent">
                  <Phone size={18} />
                </span>
                <span dir="ltr">+20 11 53637371</span>
              </a>

              <a
                href="mailto:alsobkycharity@gmail.com"
                className="flex min-h-[54px] items-center gap-3 rounded-2xl border border-primary/10 bg-muted/40 px-4 py-3 text-sm font-bold text-foreground transition-all hover:border-primary hover:bg-primary/5 dark:border-white/10 dark:bg-white/10 dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-white/10 dark:text-accent">
                  <Mail size={18} />
                </span>
                <span className="break-all">alsobkycharity@gmail.com</span>
              </a>

              <div
                className="flex min-h-[54px] items-center gap-3 rounded-2xl border border-primary/10 bg-muted/40 px-4 py-3 text-sm font-bold text-foreground dark:border-white/10 dark:bg-white/10 dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-white/10 dark:text-accent">
                  <MapPin size={18} />
                </span>
                <span>{isArabic ? 'مصر' : 'Egypt'}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={getWhatsAppLink(isArabic ? 'السلام عليكم، أريد التواصل مع المؤسسة' : 'Hello, I would like to contact the foundation')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white transition-all hover:-translate-y-1 hover:bg-green-600"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61589030337086"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white transition-all hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://www.instagram.com/alsobki_charity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4405F] text-white transition-all hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>

            <div className="mt-7 rounded-3xl bg-primary p-5 text-white">
              <CheckCircle className="mb-3 text-accent" size={28} />

              <h3 className="mb-2 text-lg font-black" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {isArabic ? 'نرد على استفساراتكم' : 'We answer your inquiries'}
              </h3>

              <p className="text-sm leading-7 text-white/75" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {isArabic
                  ? 'أرسل رسالتك الآن وسيتم فتح واتساب برسالة جاهزة لتسهيل التواصل.'
                  : 'Send your message now and WhatsApp will open with a ready-to-send message.'}
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: isArabic ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-7"
          >
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <h2
                className="mb-3 text-2xl font-black text-primary dark:text-white"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic ? 'أرسل رسالة مباشرة' : 'Send a Direct Message'}
              </h2>

              <p
                className="mb-6 text-sm leading-7 text-muted-foreground dark:text-white/70"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {isArabic
                  ? 'اكتب بياناتك وسيتم تحويلك إلى واتساب تلقائيًا.'
                  : 'Enter your information and you will be redirected to WhatsApp automatically.'}
              </p>
            </div>

            <div className="relative">
              <User
                className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                  isArabic ? 'right-4' : 'left-4'
                }`}
                size={19}
              />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={isArabic ? 'الاسم بالكامل' : 'Full Name'}
                className={`min-h-[50px] w-full rounded-xl border-2 border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:bg-slate-900 dark:text-white ${
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
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                className={`min-h-[50px] w-full rounded-xl border-2 border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:bg-slate-900 dark:text-white ${
                  isArabic ? 'pr-12 text-right' : 'pl-12 text-left'
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}
              />
            </div>

            <div className="relative">
              <FileText
                className={`absolute top-4 text-muted-foreground ${
                  isArabic ? 'right-4' : 'left-4'
                }`}
                size={19}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder={isArabic ? 'اكتب رسالتك أو استفسارك' : 'Write your message or inquiry'}
                className={`w-full resize-none rounded-xl border-2 border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:bg-slate-900 dark:text-white ${
                  isArabic ? 'pr-12 text-right' : 'pl-12 text-left'
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}
              />
            </div>

            <button
              type="submit"
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-sm font-black text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.98] sm:text-base"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Send size={19} />
              {isArabic ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
            </button>
          </motion.form>
        </div>
      </section>

      <section className="bg-muted/20 py-16 dark:bg-slate-900 sm:py-20 lg:py-24" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <GoldDivider />

            <HelpCircle className="mx-auto mb-3 text-accent" size={34} />

            <h2
              className="text-2xl font-black text-primary dark:text-white sm:text-3xl"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {isArabic ? 'الأسئلة الشائعة' : 'FAQ'}
            </h2>

            <p
              className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground dark:text-white/70"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {isArabic
                ? 'إجابات سريعة على أكثر الأسئلة تكرارًا.'
                : 'Quick answers to the most common questions.'}
            </p>
          </div>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/10"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-sm font-black text-primary dark:text-white sm:p-5"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  <span className={isArabic ? 'text-right' : 'text-left'}>{item.q}</span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-accent transition-transform ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p
                        className={`border-t border-primary/10 p-4 text-sm leading-7 text-muted-foreground dark:border-white/10 dark:text-white/70 sm:p-5 ${
                          isArabic ? 'text-right' : 'text-left'
                        }`}
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
import { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { Layout, IslamicPattern, GoldDivider } from '@/components/Layout';

type Lang = 'ar' | 'en';

function useCurrentLanguage() {
  const [lang, setLang] = useState<Lang>(
    document.documentElement.lang === 'en' ? 'en' : 'ar'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setLang(document.documentElement.lang === 'en' ? 'en' : 'ar');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  return lang;
}

export default function Contact() {
  const lang = useCurrentLanguage();
  const isArabic = lang === 'ar';

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faq = isArabic
    ? [
        {
          q: 'كيف أسجل في المسابقة؟',
          a: 'من خلال صفحة التسجيل الرسمية بالموقع.',
        },
        {
          q: 'هل يوجد مستويات؟',
          a: 'نعم، مستويات حسب الحفظ.',
        },
        {
          q: 'كيف أتواصل؟',
          a: 'عن طريق الهاتف أو الواتساب أو البريد.',
        },
      ]
    : [
        {
          q: 'How to register?',
          a: 'Through the official registration page.',
        },
        {
          q: 'Are there levels?',
          a: 'Yes, based on memorization.',
        },
        {
          q: 'How to contact?',
          a: 'Via phone, WhatsApp or email.',
        },
      ];

  useEffect(() => {
    document.title = isArabic ? 'تواصل معنا' : 'Contact';
  }, [isArabic]);

  return (
    <Layout>
      {/* HERO */}
      <section className="bg-primary pt-40 pb-20 text-center" dir={isArabic ? 'rtl' : 'ltr'}>
        <GoldDivider />
        <h1 className="text-4xl font-black text-white">
          {isArabic ? 'تواصل معنا' : 'Contact Us'}
        </h1>
      </section>

      {/* CONTACT INFO */}
      <section className="py-20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="space-y-4">
            <a href="tel:0502570086" className="flex gap-3">
              <Phone />
              0502570086
            </a>

            <a href="mailto:alsobkycharity@gmail.com" className="flex gap-3">
              <Mail />
              alsobkycharity@gmail.com
            </a>

            <div className="flex gap-3">
              <MapPin />
              {isArabic ? 'مصر' : 'Egypt'}
            </div>

            <div className="flex gap-3">
              <a href="https://wa.me/200502570086">
                <MessageCircle />
              </a>
              <a href="#">
                <Facebook />
              </a>
              <a href="#">
                <Instagram />
              </a>
            </div>
          </div>

          {/* FORM */}
          <form className="space-y-4">
            <input placeholder="Name" className="w-full p-3 border rounded" />
            <input placeholder="Phone" className="w-full p-3 border rounded" />
            <textarea placeholder="Message" className="w-full p-3 border rounded" />

            <button className="bg-primary text-white w-full p-3 rounded">
              {isArabic ? 'إرسال' : 'Send'}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-black text-center">
            {isArabic ? 'الأسئلة الشائعة' : 'FAQ'}
          </h2>

          {faq.map((item, i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-4 flex justify-between"
              >
                {item.q}
                <ChevronDown />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="p-4 text-sm"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
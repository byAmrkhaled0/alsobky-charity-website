import { Link } from 'react-router-dom';
import { Layout, IslamicPattern } from '@/components/Layout';
import { ROUTE_PATHS } from '@/lib/index';

export default function NotFound() {
  return (
    <Layout>
      <section className="relative min-h-screen flex items-center justify-center pt-20" dir="rtl">
        <div className="absolute inset-0 bg-primary/5 opacity-50">
          <IslamicPattern className="w-full h-full text-primary/10" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="text-8xl font-black text-primary/20 mb-4" style={{ fontFamily: "'Cairo', sans-serif" }}>٤٠٤</div>
          <h1 className="text-3xl font-black text-primary mb-3" style={{ fontFamily: "'Cairo', sans-serif" }}>الصفحة غير موجودة</h1>
          <p className="text-muted-foreground mb-8 text-base" style={{ fontFamily: "'Cairo', sans-serif" }}>
            عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to={ROUTE_PATHS.HOME}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              العودة للرئيسية
            </Link>
            <Link
              to={ROUTE_PATHS.CONTACT}
              className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

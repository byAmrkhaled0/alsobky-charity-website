import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/index';
import { StatItem } from '@/lib/index';

// ── Stat Counter Card ──────────────────────────────────────────────────────
function StatCard({ stat }: { stat: StatItem }) {
  const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
  const { count, ref } = useCountUp(numericValue, 2000);
  
  const formatNumber = (n: number) => n.toLocaleString('ar-EG');

  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-4xl md:text-5xl font-black text-primary mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {formatNumber(count)}{stat.suffix}
      </div>
      <div className="text-muted-foreground text-sm font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {stat.label}
      </div>
      <div className="mt-3 h-1 w-12 mx-auto rounded-full bg-accent" />
    </div>
  );
}

export function StatsSection({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <StatCard stat={stat} />
        </motion.div>
      ))}
    </div>
  );
}

// ── Service Card ───────────────────────────────────────────────────────────
export function ServiceCardComponent({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group bg-white border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-right"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors text-2xl">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {description}
      </p>
      <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-accent transition-all duration-500 rounded-full" />
    </motion.div>
  );
}

// ── Gallery Card ───────────────────────────────────────────────────────────
export function GalleryCard({
  src,
  alt,
  category,
  delay = 0,
}: {
  src: string;
  alt: string;
  category: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-white text-sm font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
          {category}
        </span>
      </div>
      <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {category}
      </div>
    </motion.div>
  );
}

// ── News Card ──────────────────────────────────────────────────────────────
export function NewsCard({
  title,
  date,
  excerpt,
  image,
  delay = 0,
}: {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
          {date}
        </div>
      </div>
      <div className="p-5 text-right">
        <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-relaxed" style={{ fontFamily: "'Cairo', sans-serif" }}>
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3" style={{ fontFamily: "'Cairo', sans-serif" }}>
          {excerpt}
        </p>
      </div>
    </motion.article>
  );
}

// ── Donation Card ──────────────────────────────────────────────────────────
export function DonationCard({
  icon,
  title,
  description,
  amount,
  delay = 0,
}: {
  icon: string;
  title: string;
  description: string;
  amount: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group bg-white border-2 border-border rounded-2xl p-6 text-right hover:border-accent hover:shadow-lg transition-all duration-300"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {description}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-accent font-bold text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{amount}</span>
        <button className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
          تبرع الآن
        </button>
      </div>
    </motion.div>
  );
}

// Route paths
export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  COMPETITIONS: '/competitions',
  ACADEMY: '/academy',
  GALLERY: '/gallery',
  DONATIONS: '/donations',
  CONTACT: '/contact',
  WINNERS: '/winners',
  FAQ: '/faq',
  PARTNERS: '/partners',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '*',
};

// Navigation items
export const NAV_ITEMS = [
  { label: 'الرئيسية', path: ROUTE_PATHS.HOME },
  { label: 'عن المؤسسة', path: ROUTE_PATHS.ABOUT },
  { label: 'خدماتنا', path: ROUTE_PATHS.SERVICES },
  { label: 'المسابقات', path: ROUTE_PATHS.COMPETITIONS },
  { label: 'أكاديمية القرآن', path: ROUTE_PATHS.ACADEMY },
  { label: 'معرض الصور', path: ROUTE_PATHS.GALLERY },
  { label: 'التبرعات', path: ROUTE_PATHS.DONATIONS },
  { label: 'تواصل معنا', path: ROUTE_PATHS.CONTACT },
];

// Types
export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface Winner {
  name: string;
  category: string;
  level: string;
  year: number;
  rank: string;
}

export interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

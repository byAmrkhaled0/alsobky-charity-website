import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alsobky.com"),
  title: {
    default: "مؤسسة حسن إبراهيم السبكي الخيرية",
    template: "%s | مؤسسة حسن السبكي الخيرية",
  },
  description:
    "الموقع الرسمي لمؤسسة حسن إبراهيم السبكي الخيرية: مبادرات إنسانية، دعم صحي وتعليمي، تطوير البنية والخدمات، ومسابقة آل سبكي للقرآن الكريم.",
  keywords: [
    "مؤسسة حسن السبكي الخيرية",
    "مؤسسة حسن إبراهيم السبكي",
    "جمعية السبكي",
    "بطرة",
    "طلخا",
    "الدقهلية",
    "مسابقة آل سبكي للقرآن الكريم",
    "أعمال خيرية",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "/",
    siteName: "مؤسسة حسن إبراهيم السبكي الخيرية",
    title: "مؤسسة حسن إبراهيم السبكي الخيرية",
    description:
      "عطاءٌ يبني الإنسان… وأثرٌ يبقى. تعرف على أحدث مبادرات المؤسسة وأخبارها.",
    images: [
      {
        url: "/images/road-batra-01.jpg",
        width: 1200,
        height: 800,
        alt: "مشروع تطوير ورصف الطريق الرئيسي بقرية بطرة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مؤسسة حسن إبراهيم السبكي الخيرية",
    description: "عطاءٌ يبني الإنسان… وأثرٌ يبقى.",
    images: ["/images/road-batra-01.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a3f31",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

"use client";

import { useEffect, useState } from "react";
import LegacyApp from "@/App";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-primary">
        جاري تحميل الموقع...
      </div>
    );
  }

  return <LegacyApp />;
}

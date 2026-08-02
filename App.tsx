"use client";

import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ROUTE_PATHS } from '@/lib/index';
import { WhatsAppButton, BackToTop, LoadingScreen } from '@/components/Layout';

import Home from '@/views/Home';
import About from '@/views/About';
import Services from '@/views/Services';
import Competitions from '@/views/Competitions';
import YearNine from '@/views/YearNine';
import QuranNews from '@/views/QuranNews';
import Gallery from '@/views/Gallery';
import Donations from '@/views/Donations';
import Contact from '@/views/Contact';
import Privacy from '@/views/Privacy';
import Terms from '@/views/Terms';
import NotFound from '@/views/NotFound';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <Router>
          <WhatsAppButton />
          <BackToTop />
          <Routes>
            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
            <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
            <Route path={ROUTE_PATHS.SERVICES} element={<Services />} />
            <Route path={ROUTE_PATHS.COMPETITIONS} element={<Competitions />} />
            <Route path={ROUTE_PATHS.YEAR_NINE} element={<YearNine />} />
            <Route path={ROUTE_PATHS.QURAN_NEWS} element={<QuranNews />} />
            <Route path={ROUTE_PATHS.GALLERY} element={<Gallery />} />
            <Route path={ROUTE_PATHS.DONATIONS} element={<Donations />} />
            <Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />
            <Route path={ROUTE_PATHS.PRIVACY} element={<Privacy />} />
            <Route path={ROUTE_PATHS.TERMS} element={<Terms />} />
            <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

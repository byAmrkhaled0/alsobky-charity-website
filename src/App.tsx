import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ROUTE_PATHS } from '@/lib/index';
import { WhatsAppButton, BackToTop, LoadingScreen } from '@/components/Layout';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Competitions from '@/pages/Competitions';
import Gallery from '@/pages/Gallery';
import Donations from '@/pages/Donations';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';

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

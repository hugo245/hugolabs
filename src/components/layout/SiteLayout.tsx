import { motion, useReducedMotion } from 'motion/react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export function SiteLayout() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <>
      <Header />
      <motion.div
        key={`curtain-${location.pathname}`}
        className="route-curtain"
        initial={reducedMotion ? false : { scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: .72, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden="true"
      />
      <div key={location.pathname} className="route-shell">
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

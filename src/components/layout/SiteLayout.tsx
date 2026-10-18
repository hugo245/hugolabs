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
        key={location.pathname}
        className="route-shell"
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <Outlet />
      </motion.div>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

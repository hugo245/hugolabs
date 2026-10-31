import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../../config/company';
import { Logo } from '../ui/Logo';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <motion.div className="site-scroll-progress" style={{ scaleX: reducedMotion ? 0 : progress }} aria-hidden="true" />
      <div className="header-inner">
        <Link className="logo-link" to="/" aria-label="HugoLabs home"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              className={location.pathname === item.href || `${location.pathname}${location.hash}` === item.href ? 'active' : ''}
              key={item.label}
              to={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" to="/contact">Start a project <span>↗</span></Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={reducedMotion ? undefined : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            {navigation.map((item, index) => (
              <motion.div key={item.label} initial={reducedMotion ? false : { opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045 }}>
                <Link to={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
              </motion.div>
            ))}
            <Link className="button button--solid" to="/contact" onClick={() => setOpen(false)}>Start a project</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

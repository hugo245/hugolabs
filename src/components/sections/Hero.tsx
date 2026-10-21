import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const disciplines = ['Websites', 'Discord bots', 'Internal tools', 'Automation'] as const;

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="hero-v3" aria-labelledby="hero-heading">
      <div className="hero-v3__layout">
        <div className="hero-v3__copy">
          <motion.p initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>HugoLabs, independent software studio</motion.p>
          <h1 id="hero-heading">
            <motion.span initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>Custom software</motion.span>
            <motion.span initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}>for work that</motion.span>
            <motion.em initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}>does not fit a template.</motion.em>
          </h1>
          <div className="hero-v3__footer"><p>We design and build sharp websites, Discord bots, and internal tools for teams that need something more specific than a ready-made setup.</p><div><Link to="/contact">Talk about a project <ArrowUpRight size={18} /></Link><a href="#work">View our work <ArrowDown size={17} /></a></div></div>
        </div>
        <motion.aside
          className="hero-v3__signal"
          aria-label="HugoLabs services"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Built here</h2>
          <div className="hero-v3__signal-list">{disciplines.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="hero-v3__signal-mark">HL</div><p>Design and development, handled by the same small team.</p>
        </motion.aside>
      </div>
    </section>
  );
}

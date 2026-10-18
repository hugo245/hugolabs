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
          <motion.p initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Websites, bots, and custom software</motion.p>
          <h1 id="hero-heading">
            <motion.span initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>SOFTWARE FOR</motion.span>
            <motion.span initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>WORK THAT DOESN'T</motion.span>
            <motion.em initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>FIT A TEMPLATE.</motion.em>
          </h1>
          <div className="hero-v3__footer"><p>Tell us what is slowing the team down. We will design the right thing, build it properly, and make sure you know how it works.</p><div><Link to="/contact">Start a conversation <ArrowUpRight size={18} /></Link><a href="#work">See example briefs <ArrowDown size={17} /></a></div></div>
        </div>
        <motion.aside
          className="hero-v3__signal"
          aria-label="HugoLabs services"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>What we build</h2>
          <div className="hero-v3__signal-list">{disciplines.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="hero-v3__signal-mark">HL</div><p>One studio from first sketch to working release.</p>
        </motion.aside>
      </div>
    </section>
  );
}

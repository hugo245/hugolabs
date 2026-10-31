import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FinalCta() {
  const reducedMotion = useReducedMotion();
  return <section className="final"><motion.h2 initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: .4 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>Something worth<br /><em>making properly?</em></motion.h2><div className="final__foot"><p>Tell us what needs to work, who it is for, and where the current options fall short.</p><Link to="/contact">Talk to HugoLabs <ArrowUpRight /></Link></div></section>;
}

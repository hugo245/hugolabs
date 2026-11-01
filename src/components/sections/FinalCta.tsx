import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FinalCta() {
  const reducedMotion = useReducedMotion();
  return <section className="final"><motion.h2 initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: .4 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>Got something<br /><em>in mind?</em></motion.h2><div className="final__foot"><p>Send the rough version. A few notes, a half-formed idea, or a link to what is not working is enough to start.</p><Link to="/contact">Tell us about it <ArrowUpRight /></Link></div></section>;
}

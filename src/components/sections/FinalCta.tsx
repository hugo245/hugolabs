import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const loop = 'WEBSITES / BOTS / INTERNAL TOOLS / AUTOMATION / '.repeat(5);

export function FinalCta() {
  const reducedMotion = useReducedMotion();
  return <section className="final-v3"><div className="final-v3__ticker" aria-hidden="true"><span>{loop}</span><span>{loop}</span></div><div className="final-v3__body"><motion.h2 initial={reducedMotion ? false : { opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>Tell us what<br />is not working.</motion.h2><motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65, delay: .12 }}><span>We will reply with useful questions, not a sales script.</span><Link to="/contact">Write to HugoLabs <ArrowUpRight /></Link></motion.div></div></section>;
}

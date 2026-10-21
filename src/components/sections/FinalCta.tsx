import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FinalCta() {
  const reducedMotion = useReducedMotion();
  return <section className="final-v3"><div className="final-v3__body"><motion.p initial={reducedMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Have something in mind?</motion.p><motion.h2 initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}>Let&apos;s build something<br />people want to use.</motion.h2><motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: .1 }}><span>Tell us what you are trying to build. We will come back with useful questions, not a sales script.</span><Link to="/contact">Write to HugoLabs <ArrowUpRight /></Link></motion.div></div></section>;
}

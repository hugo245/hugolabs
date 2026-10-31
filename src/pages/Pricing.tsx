import { motion, useReducedMotion } from 'motion/react';
import { PricingSimulator } from '../components/pricing/PricingSimulator';

export function Pricing() {
  const reducedMotion = useReducedMotion();
  return (
    <main id="main" className="pricing-page">
      <motion.header className="page-hero" initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}><h1>Shape a<br /><span>starting point.</span></h1><p>Use the builder for a rough first number. Every estimate is flexible and negotiable—we review your goals, scope, and budget together before giving a final quote.</p></motion.header>
      <PricingSimulator />
    </main>
  );
}

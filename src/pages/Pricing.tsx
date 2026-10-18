import { motion, useReducedMotion } from 'motion/react';
import { PricingSimulator } from '../components/pricing/PricingSimulator';

export function Pricing() {
  const reducedMotion = useReducedMotion();
  return (
    <main id="main" className="pricing-page">
      <motion.header className="page-hero" initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}><h1>PICK WHAT<br /><span>YOU NEED.</span></h1><p>Use the calculator to get a rough starting price. We review the requirements with you before giving a final quote.</p></motion.header>
      <PricingSimulator />
    </main>
  );
}

import { motion, useReducedMotion } from 'motion/react';
import { PricingSimulator } from '../components/pricing/PricingSimulator';

export function Pricing() {
  const reducedMotion = useReducedMotion();
  return (
    <main id="main" className="pricing-page">
      <motion.header className="page-hero" initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}><h1>Work out<br /><span>a ballpark.</span></h1><p>Pick what you need and the estimate will update as you go. It isn’t an invoice. We can change the scope, split the work into stages, and agree on a price that makes sense.</p></motion.header>
      <PricingSimulator />
    </main>
  );
}

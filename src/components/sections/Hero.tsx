import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BotVisual, SoftwareVisual, WebVisual } from '../visuals/ProductVisuals';

export function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <motion.div className="hero__copy" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}>
        <h1 id="hero-heading">We build the thing you actually need.</h1>
        <p>Websites, Discord bots, and small software tools—designed and coded by HugoLabs, without passing you through a sales team.</p>
        <Link to="/contact">Tell us what you’re making <ArrowRight /></Link>
      </motion.div>
      <motion.div className="hero-product" initial={reducedMotion ? false : { opacity: 0, y: 34, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: .12, ease: [0.16, 1, 0.3, 1] }}>
        <div className="hero-product__web"><WebVisual compact /></div>
        <div className="hero-product__bot"><BotVisual compact /></div>
        <div className="hero-product__software"><SoftwareVisual compact /></div>
      </motion.div>
    </section>
  );
}

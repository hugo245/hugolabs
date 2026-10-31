import { motion, useReducedMotion } from 'motion/react';

const steps = [['Listen first', 'We get the real problem clear before discussing features.'], ['Write it down', 'You receive the scope, price, and intended result in plain language.'], ['Show the work', 'You see working versions early enough to change something that matters.'], ['Leave it usable', 'We test, launch, document, and hand over the code and access you need.']] as const;

export function AboutProcess() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="process" id="about" aria-labelledby="about-heading">
      <div className="process__statement"><h2 id="about-heading">Close to the work.<br /><em>Clear about the work.</em></h2><p>You deal with the people doing the design and development. If a smaller answer is the right answer, we say so.</p></div>
      <div className="process__steps">{steps.map(([title, copy], index) => <motion.article key={title} initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: .65 }} transition={{ duration: .65, delay: index * .05, ease: [0.16, 1, 0.3, 1] }}><h3>{title}</h3><p>{copy}</p></motion.article>)}</div>
    </section>
  );
}

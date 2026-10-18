import { motion, useReducedMotion } from 'motion/react';

const steps = [['Listen', 'We get the real problem on the table before talking about features.'], ['Define', 'You get a written scope, a price, and a clear description of what will be delivered.'], ['Make', 'Working versions arrive early. You can test the important parts while we build.'], ['Release', 'We test, launch, document, and hand over the code and access you need.']] as const;

export function AboutProcess() {
  const reducedMotion = useReducedMotion();
  return <section className="about-v3" id="about" aria-labelledby="about-heading"><motion.div className="about-v3__statement" initial={reducedMotion ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}><h2 id="about-heading">Small team.<br /><em>Serious about the details.</em></h2><div><p>You work directly with the people doing the design and development. No account-manager relay. No mystery around progress.</p><p>If the sensible answer is a smaller build, we will say so.</p></div></motion.div><div className="about-v3__steps">{steps.map(([title, copy], index) => <motion.article key={title} initial={reducedMotion ? false : { opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} whileHover={reducedMotion ? undefined : { x: 12 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}><h3>{title}</h3><p>{copy}</p></motion.article>)}</div></section>;
}

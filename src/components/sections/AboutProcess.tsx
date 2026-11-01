import { motion, useReducedMotion } from 'motion/react';

const steps = [['Start with a conversation', 'Tell us what is happening now, what is annoying you, and what a good result would look like.'], ['Agree on the job', 'We write down what we are making, what it costs, and what is deliberately left out.'], ['See it while we build it', 'You get working versions early. That is when feedback is useful, so that is when we ask for it.'], ['Keep what you paid for', 'Once it is tested and live, you get the code, accounts, and notes needed to run it.']] as const;

export function AboutProcess() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="process" id="about" aria-labelledby="about-heading">
      <div className="process__statement"><h2 id="about-heading">You talk to the people<br /><em>building the thing.</em></h2><p>No account-manager relay race. If the sensible answer is smaller or cheaper than your original idea, we’ll tell you.</p></div>
      <div className="process__steps">{steps.map(([title, copy], index) => <motion.article key={title} initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: .65 }} transition={{ duration: .65, delay: index * .05, ease: [0.16, 1, 0.3, 1] }}><h3>{title}</h3><p>{copy}</p></motion.article>)}</div>
    </section>
  );
}

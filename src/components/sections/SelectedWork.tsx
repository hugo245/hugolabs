import { motion, useReducedMotion } from 'motion/react';

const briefs = [
  { type: 'Discord operations', problem: '“Support requests are getting lost in DMs.”', answer: 'One queue. Clear ownership. A complete record.', deliverables: ['Ticket intake', 'Automatic routing', 'Staff permissions', 'Searchable action log'], note: 'A focused bot and staff view that puts every request in one place.' },
  { type: 'Service business website', problem: '“People visit, but they do not understand what we sell.”', answer: 'A clearer story and a shorter path to contact.', deliverables: ['Content structure', 'Visual direction', 'Responsive build', 'Analytics handoff'], note: 'A compact site built around the questions real buyers ask before reaching out.' },
  { type: 'Internal workflow', problem: '“Every new request takes six messages and three handoffs.”', answer: 'Collect it once. Send it where it belongs.', deliverables: ['Guided intake', 'Rules and approvals', 'System connections', 'Team notifications'], note: 'A small internal tool that removes repeat admin without replacing the whole stack.' },
] as const;

export function SelectedWork() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="briefs-v3" id="work" aria-labelledby="work-heading">
      <motion.header className="briefs-v3__head" initial={reducedMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}><h2 id="work-heading">What a finished scope looks like.</h2><p className="briefs-v3__intro">These are sample briefs, not client work. Each one starts with the problem and ends with the concrete pieces we would deliver.</p></motion.header>
      <div className="briefs-v3__list">
        {briefs.map((brief, index) => <motion.article className={`brief-v3 brief-v3--${index + 1}`} key={brief.type} initial={reducedMotion ? false : { opacity: 0, y: 54 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reducedMotion ? undefined : { y: -5 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}><div className="brief-v3__poster"><strong>{brief.answer}</strong><p>{brief.type}</p></div><div className="brief-v3__details"><h3>{brief.problem}</h3><p>{brief.note}</p><div><h4>What we would build</h4><ul>{brief.deliverables.map((item, itemIndex) => <motion.li key={item} initial={reducedMotion ? false : { opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .16 + itemIndex * .07 }}>{item}</motion.li>)}</ul></div></div></motion.article>)}
      </div>
    </section>
  );
}

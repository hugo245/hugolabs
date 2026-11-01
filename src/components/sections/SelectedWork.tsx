import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioProjects } from '../../data/projects';

export function SelectedWork() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="work" id="work" aria-labelledby="work-heading">
      <header className="work__header"><h2 id="work-heading">A few things we’ve shipped.</h2><p>They’re live. Open one, click around, and see what we actually make.</p></header>
      <div className="work__list">
        {portfolioProjects.map((project, index) => (
          <motion.a href={project.url} target="_blank" rel="noreferrer" key={project.url} initial={reducedMotion ? false : { '--line': '0%' }} whileInView={{ '--line': '100%' }} viewport={{ once: true, amount: .55 }} transition={{ duration: .8, delay: index * .04, ease: [0.16, 1, 0.3, 1] }}>
            <strong>{project.name}</strong><span className="work__domain">{project.domain}</span><span className="work__icon" aria-hidden="true"><span>{project.fallback}</span><img className="work__favicon" src={project.favicon} alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><ArrowUpRight aria-hidden="true" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

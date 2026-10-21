import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioProjects } from '../../data/projects';

export function SelectedWork() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="portfolio" id="work" aria-labelledby="work-heading">
      <motion.header
        className="portfolio__head"
        initial={reducedMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="work-heading">Selected work.</h2>
        <p>Six live websites. Open any project and have a look around.</p>
      </motion.header>

      <div className="portfolio__grid">
        {portfolioProjects.map((project, index) => (
          <motion.a
            className={`portfolio-card portfolio-card--${project.theme}`}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${project.name}`}
            key={project.url}
            initial={reducedMotion ? false : { opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={reducedMotion ? undefined : { y: -8 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.68,
              delay: reducedMotion ? 0 : (index % 2) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="portfolio-card__top">
              <span>{project.domain}</span>
              <ArrowUpRight aria-hidden="true" />
            </div>
            <strong className="portfolio-card__mark" aria-hidden="true">
              {project.mark}
            </strong>
            <div className="portfolio-card__bottom">
              <h3>{project.name}</h3>
              <span>View live site</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

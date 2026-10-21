import { ArrowUpRight, Bot, Check, Globe2, Workflow } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Websites',
    icon: Globe2,
    copy: 'Clear, fast sites with a point of view. We handle the design, build, launch, and the unglamorous details in between.',
    items: ['Art direction and UX', 'Responsive React builds', 'CMS and API work'],
  },
  {
    title: 'Discord bots',
    icon: Bot,
    copy: 'Bots built around how your staff actually works, whether that means tickets, moderation, verification, or something stranger.',
    items: ['Support and ticketing', 'Moderation and logging', 'Roles and custom commands'],
  },
  {
    title: 'Internal tools',
    icon: Workflow,
    copy: 'Small systems that cut out repeated admin and move information where it needs to go without replacing your whole stack.',
    items: ['Workflow automation', 'API connections', 'Admin tools and reporting'],
  },
] as const;

export function Services() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="services-v4" id="services" aria-labelledby="services-heading">
      <motion.header
        className="services-v4__head"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="services-heading">Things we make well.</h2>
        <p>Websites that feel considered. Bots that remove work. Internal software that fits the way your team actually runs.</p>
      </motion.header>

      <div className="services-v4__list">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              className="service-row"
              key={service.title}
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reducedMotion ? undefined : { x: 5 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="service-row__icon"><Icon aria-hidden="true" /></div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <ul>
                {service.items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
              </ul>
              <span className="service-row__line" aria-hidden="true" />
            </motion.article>
          );
        })}
      </div>

      <Link className="services-v4__estimate" to="/pricing">Get a rough estimate <ArrowUpRight size={18} /></Link>
    </section>
  );
}

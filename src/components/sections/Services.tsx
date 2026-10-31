import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BotVisual, SoftwareVisual, WebVisual } from '../visuals/ProductVisuals';

const services = [
  { title: 'Web development', headline: 'Designed to be understood. Built to be felt.', copy: 'Responsive websites with a clear structure, strong visual character, and none of the drag that comes with a generic theme.', features: ['Direction and interface design', 'Responsive development', 'CMS, commerce, and integrations'], Visual: WebVisual, tone: 'light' },
  { title: 'Bot development', headline: 'Less administration. Better communities.', copy: 'Discord bots and connected systems for support, moderation, verification, roles, and the workflows unique to your server.', features: ['Support and ticketing', 'Moderation and logging', 'Roles, commands, and integrations'], Visual: BotVisual, tone: 'dark' },
  { title: 'Software development', headline: 'The tool your work has been waiting for.', copy: 'Desktop applications, internal utilities, and automation designed around a specific job—not a list of fashionable features.', features: ['Desktop applications', 'Internal tools', 'Workflow automation'], Visual: SoftwareVisual, tone: 'soft' },
] as const;

export function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <header className="services__intro"><h2 id="services-heading">Made for the way you work.</h2><p>Three disciplines, handled with the same care from first decision to final handoff.</p></header>
      {services.map(({ title, headline, copy, features, Visual, tone }) => <article className={`service-launch service-launch--${tone}`} key={title}><div className="service-launch__copy"><h3>{title}</h3><strong>{headline}</strong><p>{copy}</p><ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div className="service-launch__visual"><Visual /></div></article>)}
      <Link className="services__estimate" to="/pricing">Configure a project estimate <ArrowRight /></Link>
    </section>
  );
}

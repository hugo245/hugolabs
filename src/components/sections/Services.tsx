import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BotVisual, SoftwareVisual, WebVisual } from '../visuals/ProductVisuals';

const services = [
  { title: 'Web development', headline: 'A website should sound like you.', copy: 'We plan the pages, design the interface, and build the whole thing. No bought theme with your logo dropped into it.', features: ['Design from scratch', 'Works properly on phones', 'Shops, CMS, bookings, and more'], Visual: WebVisual, tone: 'light' },
  { title: 'Bot development', headline: 'Give the repetitive work to a bot.', copy: 'Tickets, moderation, verification, roles, alerts, payments—whatever keeps pulling your team away from the community.', features: ['Tickets and support', 'Moderation and logs', 'Roles, commands, and integrations'], Visual: BotVisual, tone: 'dark' },
  { title: 'Software development', headline: 'When a spreadsheet has done all it can.', copy: 'We build focused tools for awkward processes, repeated admin, and jobs that off-the-shelf software never quite gets right.', features: ['Desktop applications', 'Internal tools', 'Workflow automation'], Visual: SoftwareVisual, tone: 'soft' },
] as const;

export function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <header className="services__intro"><h2 id="services-heading">Websites, bots, and useful software.</h2><p>That’s the work. We keep the team small, show you progress early, and don’t pad the scope.</p></header>
      {services.map(({ title, headline, copy, features, Visual, tone }) => <article className={`service-launch service-launch--${tone}`} key={title}><div className="service-launch__copy"><h3>{title}</h3><strong>{headline}</strong><p>{copy}</p><ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div className="service-launch__visual"><Visual /></div></article>)}
      <Link className="services__estimate" to="/pricing">Get a rough price <ArrowRight /></Link>
    </section>
  );
}

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Command, Globe2, MessageSquareText, Send, ShieldCheck, Workflow } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function BrowserPreview({ active }: { readonly active: boolean }) {
  return (
    <div className="showcase-browser" aria-label="Sample responsive website preview">
      <div className="showcase-browser__bar"><span><i /><i /><i /></span><small>sample.hugolabs.eu</small><Globe2 size={14} /></div>
      <div className="showcase-browser__page">
        <header><strong>NORTH / CO</strong><span>Work&nbsp;&nbsp; Studio&nbsp;&nbsp; Contact</span></header>
        <div className="showcase-browser__hero"><small>INDEPENDENT ARCHITECTURE STUDIO</small><h4>Spaces made<br />for real life.</h4><button type="button">View selected work <ArrowUpRight size={13} /></button></div>
        <div className="showcase-browser__projects"><motion.div animate={active ? { y: -8 } : { y: 0 }}><strong>Field House</strong></motion.div><motion.div animate={active ? { y: 8 } : { y: 0 }}><strong>Harbor Rooms</strong></motion.div></div>
      </div>
    </div>
  );
}

function DiscordPreview({ active }: { readonly active: boolean }) {
  return (
    <div className="showcase-discord" aria-label="Sample Discord support workflow">
      <aside><strong>HL</strong><i /><i /><i /></aside>
      <div className="showcase-discord__channels"><small>HUGOLABS DEMO</small><span># general</span><span className="selected"># support-desk</span><span># staff-log</span></div>
      <div className="showcase-discord__chat">
        <header><MessageSquareText size={16} /><strong>support-desk</strong><span>3 members</span></header>
        <div className="showcase-discord__messages"><div><b>Maya</b><p>/ticket I need help with my order</p></div><motion.div className="bot-message" animate={active ? { scale: [1, 1.015, 1] } : { scale: 1 }} transition={{ duration: 1.8, repeat: active ? Infinity : 0 }}><b>HugoBot <em>BOT</em></b><p>Ticket #0184 is ready. A support member has been notified.</p><span><Check size={12} /> Routed to support</span></motion.div></div>
        <div className="showcase-discord__input">Message #support-desk <Send size={14} /></div>
      </div>
    </div>
  );
}

function WorkflowPreview({ active }: { readonly active: boolean }) {
  const steps = [{ icon: <MessageSquareText />, label: 'Request received' }, { icon: <ShieldCheck />, label: 'Rules checked' }, { icon: <Command />, label: 'Record created' }, { icon: <Send />, label: 'Team notified' }] as const;
  return (
    <div className="showcase-workflow" aria-label="Sample automation workflow">
      <div className="showcase-workflow__top"><span><Workflow size={16} /> New project intake</span><small>{active ? 'RUNNING' : 'READY'}</small></div>
      <div className="showcase-workflow__track">
        {steps.map((step, index) => <div className="showcase-workflow__step" key={step.label}><motion.span animate={active ? { backgroundColor: ['#11141a', '#1769ff', '#11141a'] } : undefined} transition={{ duration: 2.4, delay: index * .35, repeat: Infinity }}>{step.icon}</motion.span><strong>{step.label}</strong>{index < steps.length - 1 && <motion.i initial={false} animate={active ? { scaleX: [0, 1] } : { scaleX: 1 }} transition={{ duration: .7, delay: index * .35 }} />}</div>)}
      </div>
      <div className="showcase-workflow__log"><span>Last run</span><strong>4 steps completed in 1.8s</strong><Check size={15} /></div>
    </div>
  );
}

const services = [
  { title: 'Websites', label: 'Design and development', copy: 'Distinctive websites with the structure, speed, and polish needed to turn interest into action.', items: ['Art direction and UX', 'Responsive React builds', 'CMS and API integrations', 'Accessibility and performance'] },
  { title: 'Discord systems', label: 'Bots and community tools', copy: 'Purpose-built bots for the work behind a growing server, from first command to staff handoff.', items: ['Tickets and support queues', 'Moderation and logging', 'Roles and verification', 'Custom commands and data'] },
  { title: 'Automation', label: 'Connected workflows', copy: 'Focused systems that remove repetitive handoffs and keep information moving between the tools you already use.', items: ['Workflow design', 'API connections', 'Admin tools', 'Reporting and notifications'] },
] as const;

export function Services() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const visuals = [<BrowserPreview active={active === 0} />, <DiscordPreview active={active === 1} />, <WorkflowPreview active={active === 2} />] as const;
  return (
    <section className="services-v4" id="services" aria-labelledby="services-heading">
      <motion.header className="services-v4__head" initial={reducedMotion ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}><h2 id="services-heading">Built to be used.<br />Designed to be remembered.</h2><p>Every service has its own process and its own visual language. We do not force three different problems into the same template.</p></motion.header>
      <div className="services-v4__stack">
        {services.map((service, index) => <motion.article className={`service-showcase service-showcase--${index + 1}`} key={service.title} onMouseEnter={() => setActive(index)} onFocusCapture={() => setActive(index)} initial={reducedMotion ? false : { opacity: 0, y: 52, scale: .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={reducedMotion ? undefined : { y: -6 }} viewport={{ once: true, amount: .14 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}><div className="service-showcase__copy"><p className="service-showcase__label">{service.label}</p><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul></div><div className="service-showcase__visual">{visuals[index]}</div></motion.article>)}
      </div>
      <Link className="services-v4__estimate" to="/pricing">Configure a project estimate <ArrowUpRight size={18} /></Link>
    </section>
  );
}

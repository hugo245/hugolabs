import { motion, useReducedMotion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { company } from '../config/company';
import { buildContactMailto, contactLimits, type ContactFields } from '../utils/contactSecurity';

const initialFields: ContactFields = { name: '', email: '', projectType: '', budget: '', timeline: '', discord: '', website: '', domain: '', description: '' };

export function Contact() {
  const [fields, setFields] = useState(initialFields);
  const [error, setError] = useState('');
  const reducedMotion = useReducedMotion();
  const update = (key: keyof ContactFields, value: string) => setFields((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = buildContactMailto(fields, company.emails.projects);
    setFields(result.fields);
    if (result.error || !result.href) {
      setError(result.error ?? 'Please check the form and try again.');
      return;
    }
    setError('');
    window.location.assign(result.href);
  };

  return (
    <main id="main" className="contact-page">
      <motion.header className="contact-intro" initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}><h1>WHAT DO YOU<br /><span>NEED BUILT?</span></h1><p>Send us the basics. The form prepares an email to <a href={`mailto:${company.emails.projects}`}>{company.emails.projects}</a>, so you can review everything before sending it.</p></motion.header>
      <div className="contact-layout">
        <motion.form className="contact-form" onSubmit={submit} noValidate initial={reducedMotion ? false : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .12, ease: [0.16, 1, 0.3, 1] }}>
          <div className="form-grid">
            <label><span>Name *</span><input required maxLength={contactLimits.name} autoComplete="name" value={fields.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" /></label>
            <label><span>Email *</span><input required maxLength={contactLimits.email} type="email" inputMode="email" autoComplete="email" value={fields.email} onChange={(event) => update('email', event.target.value)} placeholder="you@company.com" /></label>
            <label><span>Project type</span><select value={fields.projectType} onChange={(event) => update('projectType', event.target.value)}><option value="">Select one</option><option>Website</option><option>Discord bot</option><option>Website + Discord bot</option><option>Automation</option><option>Something else</option></select></label>
            <label><span>Estimated budget</span><select value={fields.budget} onChange={(event) => update('budget', event.target.value)}><option value="">Choose a range</option><option>Under $500</option><option>$500 to $1,000</option><option>$1,000 to $2,500</option><option>$2,500+</option><option>Not sure yet</option></select></label>
            <label><span>Desired timeline</span><input maxLength={contactLimits.timeline} value={fields.timeline} onChange={(event) => update('timeline', event.target.value)} placeholder="For example: flexible, 6 to 8 weeks" /></label>
            <label><span>Discord username</span><input maxLength={contactLimits.discord} value={fields.discord} onChange={(event) => update('discord', event.target.value)} placeholder="Optional" /></label>
            <label><span>Existing website</span><input maxLength={contactLimits.website} type="url" inputMode="url" autoComplete="url" value={fields.website} onChange={(event) => update('website', event.target.value)} placeholder="https://" /></label>
            <label><span>Preferred domain</span><input maxLength={contactLimits.domain} inputMode="url" value={fields.domain} onChange={(event) => update('domain', event.target.value)} placeholder="example.com" /></label>
          </div>
          <label className="form-message"><span>Project description *</span><textarea required minLength={20} maxLength={contactLimits.description} rows={7} value={fields.description} onChange={(event) => update('description', event.target.value)} placeholder="What are you hoping to create? What should it help people do?" /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button--solid" type="submit">Prepare inquiry ↗</button>
          <p className="form-note">This form uses your email app. It does not submit data to a server or claim a message was sent.</p>
        </motion.form>
        <motion.aside className="contact-directory" initial={reducedMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .2, ease: [0.16, 1, 0.3, 1] }}>
          <span className="eyebrow">Direct contact</span>
          <div><small>Projects & hiring</small><a href={`mailto:${company.emails.projects}`}>{company.emails.projects}</a></div>
          <div><small>General inquiries</small><a href={`mailto:${company.emails.general}`}>{company.emails.general}</a></div>
          <div><small>Information & support</small><a href={`mailto:${company.emails.support}`}>{company.emails.support}</a></div>
          <p>We’ll use the details you provide only to understand and respond to your inquiry.</p>
        </motion.aside>
      </div>
    </main>
  );
}

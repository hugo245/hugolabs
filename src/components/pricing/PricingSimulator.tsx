import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Clipboard, ExternalLink, Info, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { discordFeatureLabels, pricing, websiteFeatureLabels } from '../../config/pricing';
import type { Complexity, DiscordFeature, PricingSelection, ProjectType, WebsiteFeature } from '../../types/pricing';
import { calculateEstimate, defaultSelection, formatCurrency } from '../../utils/calculateEstimate';
import { buildEstimateMailto, buildEstimateText } from '../../utils/estimateInquiry';

const projectOptions: readonly { id: ProjectType; label: string; description: string }[] = [
  { id: 'discord', label: 'Discord bot', description: 'Moderation, tickets, commands, and server tools' },
  { id: 'website', label: 'Website', description: 'Business sites, portfolios, and web applications' },
  { id: 'combined', label: 'Website + Bot', description: 'A website and Discord bot in one project' },
];

const complexityOptions: readonly { id: Complexity; label: string; detail: string }[] = [
  { id: 'basic', label: 'Basic', detail: 'Focused scope · 1.0×' },
  { id: 'standard', label: 'Standard', detail: 'More depth · 1.5×' },
  { id: 'advanced', label: 'Advanced', detail: 'Complex systems · 2.2×' },
];

const includesDiscord = (type: ProjectType) => type === 'discord' || type === 'combined';
const includesWebsite = (type: ProjectType) => type === 'website' || type === 'combined';

interface FeatureToggleProps {
  readonly label: string;
  readonly price: number;
  readonly selected: boolean;
  readonly onChange: () => void;
}

function FeatureToggle({ label, price, selected, onChange }: FeatureToggleProps) {
  return (
    <button className={`feature-toggle ${selected ? 'selected' : ''}`} type="button" aria-pressed={selected} onClick={onChange}>
      <span className="check-box">{selected && <Check size={13} />}</span><span>{label}</span><strong>+{formatCurrency(price)}</strong>
    </button>
  );
}

interface QuantityProps {
  readonly label: string;
  readonly value: number;
  readonly minimum: number;
  readonly maximum: number;
  readonly unitPrice: number;
  readonly onChange: (value: number) => void;
}

function QuantityControl({ label, value, minimum, maximum, unitPrice, onChange }: QuantityProps) {
  return (
    <div className="quantity-control">
      <div><span>{label}</span><small>{formatCurrency(unitPrice)} each</small></div>
      <div><button type="button" onClick={() => onChange(Math.max(minimum, value - 1))} disabled={value <= minimum} aria-label={`Remove ${label}`}>−</button><output>{value}</output><button type="button" onClick={() => onChange(Math.min(maximum, value + 1))} disabled={value >= maximum} aria-label={`Add ${label}`}>+</button></div>
    </div>
  );
}

export function PricingSimulator() {
  const [selection, setSelection] = useState<PricingSelection>(defaultSelection);
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  const estimate = useMemo(() => calculateEstimate(selection), [selection]);

  const patchSelection = <Key extends keyof PricingSelection>(key: Key, value: PricingSelection[Key]) => {
    setSelection((current) => ({ ...current, [key]: value }));
  };

  const toggleFeature = <Feature extends DiscordFeature | WebsiteFeature>(
    key: 'discordFeatures' | 'websiteFeatures',
    feature: Feature,
  ) => {
    setSelection((current) => {
      const list = current[key] as readonly Feature[];
      const next = list.includes(feature) ? list.filter((item) => item !== feature) : [...list, feature];
      return { ...current, [key]: next };
    });
  };

  const copyEstimate = async () => {
    try {
      await navigator.clipboard.writeText(buildEstimateText(selection, estimate));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="pricing-app">
      <div className="pricing-builder">
        <motion.section className="builder-section" aria-labelledby="project-type-heading" initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .12, ease: [0.16, 1, 0.3, 1] }}>
          <div className="builder-heading"><h2 id="project-type-heading">Pick a project</h2><p>Choose the option that is closest to what you need.</p></div>
          <div className="choice-grid choice-grid--project">
            {projectOptions.map((option) => <button key={option.id} className={selection.projectType === option.id ? 'selected' : ''} type="button" onClick={() => patchSelection('projectType', option.id)}><span className="radio-dot" /><strong>{option.label}</strong><small>{option.description}</small></button>)}
          </div>
        </motion.section>

        <motion.section className="builder-section" aria-labelledby="complexity-heading" initial={reducedMotion ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}>
          <div className="builder-heading"><h2 id="complexity-heading">How complex is it?</h2><p>This adjusts the estimate for design work, integrations, and technical difficulty.</p></div>
          <div className="choice-grid">
            {complexityOptions.map((option) => <button key={option.id} className={selection.complexity === option.id ? 'selected' : ''} type="button" onClick={() => patchSelection('complexity', option.id)}><span className="radio-dot" /><strong>{option.label}</strong><small>{option.detail}</small></button>)}
          </div>
        </motion.section>

        <AnimatePresence mode="popLayout">
          {includesDiscord(selection.projectType) && (
            <motion.section className="builder-section" aria-labelledby="bot-features-heading" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -16 }} transition={{ duration: .45 }}>
              <div className="builder-heading"><h2 id="bot-features-heading">Bot features</h2><p>Every bot starts with the base build shown below.</p></div>
              <div className="included-row"><Check size={15} /><span>Base custom Discord bot</span><strong>{formatCurrency(pricing.discord.base)}</strong></div>
              <div className="feature-list">
                {(Object.keys(discordFeatureLabels) as DiscordFeature[]).map((feature) => <FeatureToggle key={feature} label={discordFeatureLabels[feature]} price={pricing.discord[feature]} selected={selection.discordFeatures.includes(feature)} onChange={() => toggleFeature('discordFeatures', feature)} />)}
              </div>
              <QuantityControl label="Custom commands" value={selection.customCommands} minimum={0} maximum={10} unitPrice={pricing.discord.commandsEach} onChange={(value) => patchSelection('customCommands', value)} />
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {includesWebsite(selection.projectType) && (
            <motion.section className="builder-section" aria-labelledby="website-features-heading" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -16 }} transition={{ duration: .45 }}>
              <div className="builder-heading"><h2 id="website-features-heading">Website features</h2><p>Responsive development and the source code are included.</p></div>
              <div className="included-row"><Check size={15} /><span>Base responsive website</span><strong>{formatCurrency(pricing.website.base)}</strong></div>
              <div className="feature-list">
                {(Object.keys(websiteFeatureLabels) as WebsiteFeature[]).map((feature) => <FeatureToggle key={feature} label={websiteFeatureLabels[feature]} price={pricing.website[feature]} selected={selection.websiteFeatures.includes(feature)} onChange={() => toggleFeature('websiteFeatures', feature)} />)}
              </div>
              <QuantityControl label="Additional pages" value={selection.additionalPages} minimum={0} maximum={15} unitPrice={pricing.website.additionalPage} onChange={(value) => patchSelection('additionalPages', value)} />
            </motion.section>
          )}
        </AnimatePresence>

        {includesWebsite(selection.projectType) && (
          <motion.section className="builder-section" aria-labelledby="hosting-heading" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .6 }}>
            <div className="builder-heading"><h2 id="hosting-heading">Hosting & domain</h2><p>Choose who will arrange the hosting and domain.</p></div>
            <div className="hosting-options">
              <button className={selection.hostingChoice === 'self' ? 'selected' : ''} type="button" onClick={() => patchSelection('hostingChoice', 'self')}><span className="radio-dot" /><div><strong>I’ll handle hosting and domain</strong><small>You arrange hosting and domain registration independently.</small></div></button>
              <button className={selection.hostingChoice === 'launch' ? 'selected' : ''} type="button" onClick={() => patchSelection('hostingChoice', 'launch')}><span className="radio-dot" /><div><strong>HugoLabs Website Launch Package</strong><em>First year hosting & eligible domain included</em><small>For qualifying static websites, subject to approval and domain cost.</small></div></button>
            </div>
            {selection.hostingChoice === 'launch' && <div className={`eligibility eligibility--${estimate.eligibility}`}><Info size={17} /><div><strong>{estimate.eligibility === 'eligible' ? 'May qualify. We still need to confirm it.' : 'We need to review the hosting requirements.'}</strong><p>{estimate.eligibility === 'eligible' ? 'This setup may qualify for first-year static hosting and domain coverage.' : 'This setup may need additional hosting. You can still request the package and we will check it with you.'}</p></div></div>}
            <label className="text-field"><span>Preferred domain <small>optional</small></span><input type="text" placeholder="mybusiness.com" value={selection.preferredDomain} onChange={(event) => patchSelection('preferredDomain', event.target.value)} pattern="^(?!-)(?:[a-zA-Z0-9-]{1,63}\\.)+[a-zA-Z]{2,}$" /><small>Availability and eligibility will be confirmed during the quote process.</small></label>
          </motion.section>
        )}

        <motion.section className="builder-section" aria-labelledby="extras-heading" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .6 }}>
          <div className="builder-heading"><h2 id="extras-heading">Additional options</h2><p>Add priority scheduling or monthly support.</p></div>
          <div className="feature-list">
            <FeatureToggle label="Priority development" price={Math.round(estimate.complexityAdjustedCents * pricing.priorityMultiplier)} selected={selection.priority} onChange={() => patchSelection('priority', !selection.priority)} />
            <FeatureToggle label="Maintenance / month" price={pricing.monthly.maintenance} selected={selection.maintenance} onChange={() => patchSelection('maintenance', !selection.maintenance)} />
            {includesWebsite(selection.projectType) && <FeatureToggle label="Hosting management / month" price={pricing.monthly.hostingManagement} selected={selection.hostingManagement} onChange={() => patchSelection('hostingManagement', !selection.hostingManagement)} />}
          </div>
        </motion.section>
      </div>

      <motion.aside className="estimate-card" aria-live="polite" initial={reducedMotion ? false : { opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .2, ease: [0.16, 1, 0.3, 1] }}>
        <span className="estimate-kicker">Estimated price</span>
        <motion.strong className="estimate-total" key={estimate.oneTimeTotalCents} initial={{ opacity: 0.55, y: 4 }} animate={{ opacity: 1, y: 0 }}>{formatCurrency(estimate.oneTimeTotalCents)}</motion.strong>
        <span className="estimate-subtitle">one-time estimate</span>
        <div className="estimate-lines">
          <div><span>Development subtotal</span><strong>{formatCurrency(estimate.developmentSubtotalCents)}</strong></div>
          <div><span>Complexity · {selection.complexity}</span><strong>{pricing.complexity[selection.complexity]}×</strong></div>
          {estimate.prioritySurchargeCents > 0 && <div><span>Priority surcharge</span><strong>{formatCurrency(estimate.prioritySurchargeCents)}</strong></div>}
          <div className="estimate-monthly"><span>Monthly services</span><strong>{formatCurrency(estimate.monthlyTotalCents)} / mo</strong></div>
        </div>
        <p className="estimate-disclaimer">Prices shown are estimates only. Final pricing depends on project scope, technical requirements, and applicable hosting or domain costs.</p>
        <a className="button button--solid button--wide" href={buildEstimateMailto(selection, estimate)}>Request this build <ExternalLink size={16} /></a>
        <button className="button button--ghost button--wide" type="button" onClick={() => void copyEstimate()}><Clipboard size={16} />{copied ? 'Copied to clipboard' : 'Copy estimate'}</button>
        <button className="reset-button" type="button" onClick={() => setSelection(defaultSelection)}><RotateCcw size={14} />Reset configuration</button>
      </motion.aside>
    </div>
  );
}

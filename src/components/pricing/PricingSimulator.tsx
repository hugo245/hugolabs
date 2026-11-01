import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Clipboard, ExternalLink, Info, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { botPurposeLabels, communitySizeLabels, contentSupportLabels, discordFeatureLabels, pricing, softwareFeatureLabels, softwarePlatformLabels, softwarePurposeLabels, userScaleLabels, websiteDesignLevelLabels, websiteFeatureLabels, websitePurposeLabels } from '../../config/pricing';
import type { BotPurpose, CommunitySize, Complexity, ContentSupport, DiscordFeature, PricingSelection, ProjectType, SoftwareFeature, SoftwarePlatform, SoftwarePurpose, UserScale, WebsiteDesignLevel, WebsiteFeature, WebsitePurpose } from '../../types/pricing';
import { calculateEstimate, defaultSelection, formatCurrency } from '../../utils/calculateEstimate';
import { buildEstimateMailto, buildEstimateText } from '../../utils/estimateInquiry';

const projectOptions: readonly { id: ProjectType; label: string; description: string }[] = [
  { id: 'discord', label: 'Discord bot', description: 'For tickets, moderation, roles, commands, or community jobs' },
  { id: 'website', label: 'Website', description: 'Anything from one landing page to a shop or web app' },
  { id: 'software', label: 'Custom software', description: 'A tool for your team, customers, or one awkward process' },
  { id: 'combined', label: 'Website + Bot', description: 'One project, with the site and Discord server connected' },
  { id: 'websiteSoftware', label: 'Website + Software', description: 'A public-facing site with a private tool behind it' },
  { id: 'botSoftware', label: 'Bot + Software', description: 'A Discord bot with its own dashboard or desktop tool' },
  { id: 'full', label: 'All three', description: 'Website, bot, and software that need to work together' },
];

const complexityOptions: readonly { id: Complexity; label: string; detail: string }[] = [
  { id: 'basic', label: 'Straightforward', detail: 'One clear job · 1.0×' },
  { id: 'standard', label: 'Some moving parts', detail: 'Most projects land here · 1.25×' },
  { id: 'advanced', label: 'Several systems', detail: 'More edge cases and testing · 1.6×' },
];

const includesDiscord = (type: ProjectType) => ['discord', 'combined', 'botSoftware', 'full'].includes(type);
const includesWebsite = (type: ProjectType) => ['website', 'combined', 'websiteSoftware', 'full'].includes(type);
const includesSoftware = (type: ProjectType) => ['software', 'websiteSoftware', 'botSoftware', 'full'].includes(type);

interface ChoiceOption<Value extends string> { readonly id: Value; readonly label: string; readonly price: number; }

interface ChoiceGroupProps<Value extends string> {
  readonly label: string;
  readonly options: readonly ChoiceOption<Value>[];
  readonly value: Value;
  readonly onChange: (value: Value) => void;
  readonly basePrice?: boolean;
}

function ChoiceGroup<Value extends string>({ label, options, value, onChange, basePrice = false }: ChoiceGroupProps<Value>) {
  return <fieldset className="option-group"><legend>{label}</legend><div className="choice-grid choice-grid--compact">{options.map((option) => <button key={option.id} className={value === option.id ? 'selected' : ''} type="button" aria-pressed={value === option.id} onClick={() => onChange(option.id)}><span className="radio-dot" /><strong>{option.label}</strong><small>{basePrice ? `Starts at ${formatCurrency(option.price)}` : option.price > 0 ? `+${formatCurrency(option.price)}` : 'Included'}</small></button>)}</div></fieldset>;
}

const websitePurposeOptions = (Object.keys(websitePurposeLabels) as WebsitePurpose[]).map((id) => ({ id, label: websitePurposeLabels[id], price: pricing.websitePurpose[id] }));
const websiteDesignOptions = (Object.keys(websiteDesignLevelLabels) as WebsiteDesignLevel[]).map((id) => ({ id, label: websiteDesignLevelLabels[id], price: pricing.websiteDesignLevel[id] }));
const contentSupportOptions = (Object.keys(contentSupportLabels) as ContentSupport[]).map((id) => ({ id, label: contentSupportLabels[id], price: pricing.contentSupport[id] }));
const botPurposeOptions = (Object.keys(botPurposeLabels) as BotPurpose[]).map((id) => ({ id, label: botPurposeLabels[id], price: pricing.botPurpose[id] }));
const communitySizeOptions = (Object.keys(communitySizeLabels) as CommunitySize[]).map((id) => ({ id, label: communitySizeLabels[id], price: pricing.communitySize[id] }));
const softwarePurposeOptions = (Object.keys(softwarePurposeLabels) as SoftwarePurpose[]).map((id) => ({ id, label: softwarePurposeLabels[id], price: pricing.softwarePurpose[id] }));
const softwarePlatformOptions = (Object.keys(softwarePlatformLabels) as SoftwarePlatform[]).map((id) => ({ id, label: softwarePlatformLabels[id], price: pricing.softwarePlatform[id] }));
const userScaleOptions = (Object.keys(userScaleLabels) as UserScale[]).map((id) => ({ id, label: userScaleLabels[id], price: pricing.userScale[id] }));

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

  const toggleFeature = <Feature extends DiscordFeature | WebsiteFeature | SoftwareFeature>(
    key: 'discordFeatures' | 'websiteFeatures' | 'softwareFeatures',
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
          <div className="builder-heading"><h2 id="project-type-heading">What are we making?</h2><p>Choose the closest match. You can explain the unusual bits further down.</p></div>
          <div className="choice-grid choice-grid--project">
            {projectOptions.map((option) => <button key={option.id} className={selection.projectType === option.id ? 'selected' : ''} type="button" onClick={() => patchSelection('projectType', option.id)}><span className="radio-dot" /><strong>{option.label}</strong><small>{option.description}</small></button>)}
          </div>
        </motion.section>

        <motion.section className="builder-section builder-section--scope" aria-labelledby="project-purpose-heading" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .55, delay: .16 }}>
          <div className="builder-heading"><h2 id="project-purpose-heading">What does it need to do?</h2><p>This sets the starting price. Features come next.</p></div>
          {includesWebsite(selection.projectType) && <div className="scope-block"><h3>Website direction</h3><ChoiceGroup label="Primary use — sets the website base price" options={websitePurposeOptions} value={selection.websitePurpose} onChange={(value) => patchSelection('websitePurpose', value)} basePrice /><ChoiceGroup label="Design starting point" options={websiteDesignOptions} value={selection.websiteDesignLevel} onChange={(value) => patchSelection('websiteDesignLevel', value)} /><ChoiceGroup label="Content support" options={contentSupportOptions} value={selection.contentSupport} onChange={(value) => patchSelection('contentSupport', value)} /></div>}
          {includesDiscord(selection.projectType) && <div className="scope-block"><h3>Bot environment</h3><ChoiceGroup label="Primary use — sets the bot base price" options={botPurposeOptions} value={selection.botPurpose} onChange={(value) => patchSelection('botPurpose', value)} basePrice /><ChoiceGroup label="Community size" options={communitySizeOptions} value={selection.communitySize} onChange={(value) => patchSelection('communitySize', value)} /></div>}
          {includesSoftware(selection.projectType) && <div className="scope-block"><h3>Software environment</h3><ChoiceGroup label="Primary use — sets the software base price" options={softwarePurposeOptions} value={selection.softwarePurpose} onChange={(value) => patchSelection('softwarePurpose', value)} basePrice /><ChoiceGroup label="Platform" options={softwarePlatformOptions} value={selection.softwarePlatform} onChange={(value) => patchSelection('softwarePlatform', value)} /><ChoiceGroup label="Who will use it" options={userScaleOptions} value={selection.userScale} onChange={(value) => patchSelection('userScale', value)} /></div>}
        </motion.section>

        <motion.section className="builder-section" aria-labelledby="complexity-heading" initial={reducedMotion ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}>
          <div className="builder-heading"><h2 id="complexity-heading">How involved is the build?</h2><p>Choose Basic if it is straightforward, Standard for most projects, or Advanced if several systems need to work together.</p></div>
          <div className="choice-grid">
            {complexityOptions.map((option) => <button key={option.id} className={selection.complexity === option.id ? 'selected' : ''} type="button" onClick={() => patchSelection('complexity', option.id)}><span className="radio-dot" /><strong>{option.label}</strong><small>{option.detail}</small></button>)}
          </div>
        </motion.section>

        <motion.section className="builder-section" aria-labelledby="project-details-heading" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }}>
          <div className="builder-heading"><h2 id="project-details-heading">The part only you know</h2><p>A sentence or two helps us understand the number we’re putting together.</p></div>
          <div className="brief-grid">
            <label className="brief-field brief-field--wide"><span>What should it help someone do?</span><textarea rows={4} maxLength={800} placeholder="For example: book a table without calling us, or let staff approve requests in one place." value={selection.projectSummary} onChange={(event) => patchSelection('projectSummary', event.target.value)} /><small>{selection.projectSummary.length}/800</small></label>
            <label className="brief-field brief-field--wide"><span>Who will use it?</span><input type="text" maxLength={160} placeholder="Customers, staff, Discord members—whoever it is really for" value={selection.targetAudience} onChange={(event) => patchSelection('targetAudience', event.target.value)} /><small>{selection.targetAudience.length}/160</small></label>
          </div>
          <div className="project-operations">
            <QuantityControl label="External integrations" value={selection.additionalIntegrations} minimum={0} maximum={10} unitPrice={pricing.additionalIntegration} onChange={(value) => patchSelection('additionalIntegrations', value)} />
            <div className="feature-list">
              <FeatureToggle label="Migrate existing data" price={pricing.dataMigration} selected={selection.dataMigration} onChange={() => patchSelection('dataMigration', !selection.dataMigration)} />
              <FeatureToggle label="Team handoff and training" price={pricing.training} selected={selection.training} onChange={() => patchSelection('training', !selection.training)} />
            </div>
          </div>
        </motion.section>

        <AnimatePresence mode="popLayout">
          {includesDiscord(selection.projectType) && (
            <motion.section className="builder-section" aria-labelledby="bot-features-heading" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -16 }} transition={{ duration: .45 }}>
              <div className="builder-heading"><h2 id="bot-features-heading">What should the bot handle?</h2><p>Pick what you know you need. We can sort out the exact commands together.</p></div>
              <div className="included-row"><Check size={15} /><span>{botPurposeLabels[selection.botPurpose]} bot foundation</span><strong>{formatCurrency(pricing.botPurpose[selection.botPurpose])}</strong></div>
              <div className="feature-list">
                {(Object.keys(discordFeatureLabels) as DiscordFeature[]).map((feature) => <FeatureToggle key={feature} label={discordFeatureLabels[feature]} price={pricing.discord[feature]} selected={selection.discordFeatures.includes(feature)} onChange={() => toggleFeature('discordFeatures', feature)} />)}
              </div>
              <QuantityControl label="Custom commands" value={selection.customCommands} minimum={0} maximum={10} unitPrice={pricing.discord.commandsEach} onChange={(value) => patchSelection('customCommands', value)} />
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {includesSoftware(selection.projectType) && (
            <motion.section className="builder-section" aria-labelledby="software-features-heading" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -16 }} transition={{ duration: .45 }}>
              <div className="builder-heading"><h2 id="software-features-heading">What should the software handle?</h2><p>Pick the first version, not every idea you may ever add. It is usually cheaper to grow it in stages.</p></div>
              <div className="included-row"><Check size={15} /><span>{softwarePurposeLabels[selection.softwarePurpose]} foundation</span><strong>{formatCurrency(pricing.softwarePurpose[selection.softwarePurpose])}</strong></div>
              <div className="feature-list">
                {(Object.keys(softwareFeatureLabels) as SoftwareFeature[]).map((feature) => <FeatureToggle key={feature} label={softwareFeatureLabels[feature]} price={pricing.software[feature]} selected={selection.softwareFeatures.includes(feature)} onChange={() => toggleFeature('softwareFeatures', feature)} />)}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {includesWebsite(selection.projectType) && (
            <motion.section className="builder-section" aria-labelledby="website-features-heading" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -16 }} transition={{ duration: .45 }}>
              <div className="builder-heading"><h2 id="website-features-heading">What belongs on the site?</h2><p>Choose the useful parts. Mobile support and your source code are already included.</p></div>
              <div className="included-row"><Check size={15} /><span>{websitePurposeLabels[selection.websitePurpose]} foundation</span><strong>{formatCurrency(pricing.websitePurpose[selection.websitePurpose])}</strong></div>
              <div className="feature-list">
                {(Object.keys(websiteFeatureLabels) as WebsiteFeature[]).map((feature) => <FeatureToggle key={feature} label={websiteFeatureLabels[feature]} price={pricing.website[feature]} selected={selection.websiteFeatures.includes(feature)} onChange={() => toggleFeature('websiteFeatures', feature)} />)}
              </div>
              <QuantityControl label="Additional pages" value={selection.additionalPages} minimum={0} maximum={15} unitPrice={pricing.website.additionalPage} onChange={(value) => patchSelection('additionalPages', value)} />
            </motion.section>
          )}
        </AnimatePresence>

        {includesWebsite(selection.projectType) && (
          <motion.section className="builder-section" aria-labelledby="hosting-heading" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .6 }}>
            <div className="builder-heading"><h2 id="hosting-heading">Where will it live?</h2><p>Handle the hosting yourself, or ask us to sort out the first year.</p></div>
            <div className="hosting-options">
              <button className={selection.hostingChoice === 'self' ? 'selected' : ''} type="button" onClick={() => patchSelection('hostingChoice', 'self')}><span className="radio-dot" /><div><strong>I’ll sort it out</strong><small>You buy the domain and choose where the site is hosted.</small></div></button>
              <button className={selection.hostingChoice === 'launch' ? 'selected' : ''} type="button" onClick={() => patchSelection('hostingChoice', 'launch')}><span className="radio-dot" /><div><strong>Ask HugoLabs to handle it</strong><em>First year of hosting and an eligible domain included</em><small>Best for straightforward sites. We’ll check the domain cost and technical setup first.</small></div></button>
            </div>
            {selection.hostingChoice === 'launch' && <div className={`eligibility eligibility--${estimate.eligibility}`}><Info size={17} /><div><strong>{estimate.eligibility === 'eligible' ? 'This looks like a good fit.' : 'We need to check the hosting setup.'}</strong><p>{estimate.eligibility === 'eligible' ? 'The first year of hosting and an eligible domain may be covered. We’ll confirm before you commit.' : 'It may need a different hosting plan, but send it over and we’ll work out the simplest option.'}</p></div></div>}
            <label className="text-field"><span>Preferred domain <small>optional</small></span><input type="text" placeholder="mybusiness.com" value={selection.preferredDomain} onChange={(event) => patchSelection('preferredDomain', event.target.value)} pattern="^(?!-)(?:[a-zA-Z0-9-]{1,63}\\.)+[a-zA-Z]{2,}$" /><small>Availability and eligibility will be confirmed during the quote process.</small></label>
          </motion.section>
        )}

        <motion.section className="builder-section" aria-labelledby="extras-heading" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .6 }}>
          <div className="builder-heading"><h2 id="extras-heading">After the first build</h2><p>Add a faster slot or keep us around for updates and hosting.</p></div>
          <div className="feature-list">
            <FeatureToggle label="Priority development" price={Math.round(estimate.complexityAdjustedCents * pricing.priorityMultiplier)} selected={selection.priority} onChange={() => patchSelection('priority', !selection.priority)} />
            <FeatureToggle label="Maintenance / month" price={pricing.monthly.maintenance} selected={selection.maintenance} onChange={() => patchSelection('maintenance', !selection.maintenance)} />
            {includesWebsite(selection.projectType) && <FeatureToggle label="Hosting management / month" price={pricing.monthly.hostingManagement} selected={selection.hostingManagement} onChange={() => patchSelection('hostingManagement', !selection.hostingManagement)} />}
          </div>
        </motion.section>
      </div>

      <motion.aside className="estimate-card" aria-live="polite" initial={reducedMotion ? false : { opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .2, ease: [0.16, 1, 0.3, 1] }}>
        <span className="estimate-kicker">Rough price</span>
        <motion.strong className="estimate-total" key={estimate.oneTimeTotalCents} initial={{ opacity: 0.55, y: 4 }} animate={{ opacity: 1, y: 0 }}>{formatCurrency(estimate.oneTimeTotalCents)}</motion.strong>
        <span className="estimate-subtitle">one-time estimate</span>
        <span className="estimate-negotiable">Yes, we can negotiate it</span>
        <div className="estimate-lines">
          <div><span>Development subtotal</span><strong>{formatCurrency(estimate.developmentSubtotalCents)}</strong></div>
          <div><span>Complexity · {selection.complexity}</span><strong>{pricing.complexity[selection.complexity]}×</strong></div>
          {estimate.prioritySurchargeCents > 0 && <div><span>Priority surcharge</span><strong>{formatCurrency(estimate.prioritySurchargeCents)}</strong></div>}
          <div className="estimate-monthly"><span>Monthly services</span><strong>{formatCurrency(estimate.monthlyTotalCents)} / mo</strong></div>
        </div>
        <p className="estimate-disclaimer">This is a starting point, not a fixed quote. If the number is off, we can trim the scope, split the work into stages, or talk through your budget.</p>
        <a className="button button--solid button--wide" href={buildEstimateMailto(selection, estimate)}>Send us this setup <ExternalLink size={16} /></a>
        <button className="button button--ghost button--wide" type="button" onClick={() => void copyEstimate()}><Clipboard size={16} />{copied ? 'Copied to clipboard' : 'Copy estimate'}</button>
        <button className="reset-button" type="button" onClick={() => setSelection(defaultSelection)}><RotateCcw size={14} />Reset configuration</button>
      </motion.aside>
    </div>
  );
}

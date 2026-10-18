import { discordFeatureLabels, websiteFeatureLabels } from '../config/pricing';
import type { Estimate, PricingSelection } from '../types/pricing';
import { formatCurrency } from './calculateEstimate';

const projectLabels = {
  discord: 'Discord Bot',
  website: 'Website',
  combined: 'Website + Discord Bot',
} as const;

export function buildEstimateText(selection: PricingSelection, estimate: Estimate): string {
  const discordFeatures = selection.discordFeatures.map((feature) => discordFeatureLabels[feature]);
  if (selection.customCommands > 0) discordFeatures.push(`Custom commands: ${selection.customCommands}`);
  const websiteFeatures = selection.websiteFeatures.map((feature) => websiteFeatureLabels[feature]);
  if (selection.additionalPages > 0) websiteFeatures.push(`Additional pages: ${selection.additionalPages}`);

  return [
    'HugoLabs Project Inquiry',
    '',
    `Project: ${projectLabels[selection.projectType]}`,
    `Complexity: ${selection.complexity}`,
    `Discord features: ${discordFeatures.join(', ') || 'None selected'}`,
    `Website features: ${websiteFeatures.join(', ') || 'None selected'}`,
    `Priority delivery: ${selection.priority ? 'Yes' : 'No'}`,
    `Hosting preference: ${selection.hostingChoice === 'launch' ? 'HugoLabs Website Launch Package' : 'I will handle hosting and domain'}`,
    `Preferred domain: ${selection.preferredDomain || 'Not supplied'}`,
    `Hosting eligibility: ${estimate.eligibility === 'eligible' ? 'Appears eligible, subject to confirmation' : 'Requires manual review'}`,
    `One-time estimate: ${formatCurrency(estimate.oneTimeTotalCents)}`,
    `Monthly estimate: ${formatCurrency(estimate.monthlyTotalCents)}`,
    '',
    'I understand this estimate is not a guaranteed final quote.',
  ].join('\n');
}

export function buildEstimateMailto(selection: PricingSelection, estimate: Estimate): string {
  const subject = `HugoLabs Project Inquiry | ${projectLabels[selection.projectType]}`;
  return `mailto:hire@hugolabs.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildEstimateText(selection, estimate))}`;
}

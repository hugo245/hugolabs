import { botPurposeLabels, communitySizeLabels, contentSupportLabels, discordFeatureLabels, softwareFeatureLabels, softwarePlatformLabels, softwarePurposeLabels, userScaleLabels, websiteDesignLevelLabels, websiteFeatureLabels, websitePurposeLabels } from '../config/pricing';
import type { Estimate, PricingSelection } from '../types/pricing';
import { formatCurrency } from './calculateEstimate';

const projectLabels = {
  discord: 'Discord Bot',
  website: 'Website',
  software: 'Custom Software',
  combined: 'Website + Discord Bot',
  websiteSoftware: 'Website + Custom Software',
  botSoftware: 'Discord Bot + Custom Software',
  full: 'Website + Bot + Custom Software',
} as const;

export function buildEstimateText(selection: PricingSelection, estimate: Estimate): string {
  const includesDiscord = ['discord', 'combined', 'botSoftware', 'full'].includes(selection.projectType);
  const includesWebsite = ['website', 'combined', 'websiteSoftware', 'full'].includes(selection.projectType);
  const includesSoftware = ['software', 'websiteSoftware', 'botSoftware', 'full'].includes(selection.projectType);
  const discordFeatures = selection.discordFeatures.map((feature) => discordFeatureLabels[feature]);
  if (selection.customCommands > 0) discordFeatures.push(`Custom commands: ${selection.customCommands}`);
  const websiteFeatures = selection.websiteFeatures.map((feature) => websiteFeatureLabels[feature]);
  const softwareFeatures = selection.softwareFeatures.map((feature) => softwareFeatureLabels[feature]);
  if (selection.additionalPages > 0) websiteFeatures.push(`Additional pages: ${selection.additionalPages}`);

  const scopeLines = [
    ...(includesWebsite ? [
      `Website use: ${websitePurposeLabels[selection.websitePurpose]}`,
      `Design scope: ${websiteDesignLevelLabels[selection.websiteDesignLevel]}`,
      `Content support: ${contentSupportLabels[selection.contentSupport]}`,
      `Website features: ${websiteFeatures.join(', ') || 'None selected'}`,
    ] : []),
    ...(includesDiscord ? [
      `Bot use: ${botPurposeLabels[selection.botPurpose]}`,
      `Community size: ${communitySizeLabels[selection.communitySize]}`,
      `Discord features: ${discordFeatures.join(', ') || 'None selected'}`,
    ] : []),
    ...(includesSoftware ? [
      `Software use: ${softwarePurposeLabels[selection.softwarePurpose]}`,
      `Software platform: ${softwarePlatformLabels[selection.softwarePlatform]}`,
      `User scale: ${userScaleLabels[selection.userScale]}`,
      `Software features: ${softwareFeatures.join(', ') || 'None selected'}`,
    ] : []),
  ];

  const hostingLines = includesWebsite ? [
    `Hosting preference: ${selection.hostingChoice === 'launch' ? 'HugoLabs Website Launch Package' : 'I will handle hosting and domain'}`,
    `Preferred domain: ${selection.preferredDomain || 'Not supplied'}`,
    `Hosting eligibility: ${estimate.eligibility === 'eligible' ? 'Appears eligible, subject to confirmation' : 'Requires manual review'}`,
  ] : [];

  return [
    'HugoLabs Project Inquiry',
    '',
    `Project: ${projectLabels[selection.projectType]}`,
    `What it is for: ${selection.projectSummary || 'Not supplied'}`,
    `Target audience: ${selection.targetAudience || 'Not supplied'}`,
    `Complexity: ${selection.complexity}`,
    ...scopeLines,
    `Additional integrations: ${selection.additionalIntegrations}`,
    `Data migration: ${selection.dataMigration ? 'Yes' : 'No'}`,
    `Team training: ${selection.training ? 'Yes' : 'No'}`,
    `Priority delivery: ${selection.priority ? 'Yes' : 'No'}`,
    ...hostingLines,
    `One-time estimate: ${formatCurrency(estimate.oneTimeTotalCents)}`,
    `Monthly estimate: ${formatCurrency(estimate.monthlyTotalCents)}`,
    '',
    'I understand this is a negotiable starting estimate, not a guaranteed final quote.',
  ].join('\n');
}

export function buildEstimateMailto(selection: PricingSelection, estimate: Estimate): string {
  const subject = `HugoLabs Project Inquiry | ${projectLabels[selection.projectType]}`;
  return `mailto:hire@hugolabs.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildEstimateText(selection, estimate))}`;
}

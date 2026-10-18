import { discordFeatureLabels, pricing, websiteFeatureLabels } from '../config/pricing';
import type { EligibilityStatus, Estimate, LineItem, PricingSelection } from '../types/pricing';

export const defaultSelection: PricingSelection = {
  projectType: 'website',
  complexity: 'standard',
  discordFeatures: [],
  websiteFeatures: [],
  customCommands: 0,
  additionalPages: 0,
  priority: false,
  maintenance: false,
  hostingManagement: false,
  hostingChoice: 'self',
  preferredDomain: '',
};

const includesDiscord = (selection: PricingSelection) =>
  selection.projectType === 'discord' || selection.projectType === 'combined';

const includesWebsite = (selection: PricingSelection) =>
  selection.projectType === 'website' || selection.projectType === 'combined';

const clampInteger = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? Math.round(value) : minimum));

export function getHostingEligibility(selection: PricingSelection): EligibilityStatus {
  if (!includesWebsite(selection)) return 'review';
  const infrastructureFeatures = new Set(['authentication', 'dashboard', 'ecommerce']);
  const needsSubstantialInfrastructure = selection.websiteFeatures.some((feature) =>
    infrastructureFeatures.has(feature),
  );
  return selection.complexity === 'advanced' || needsSubstantialInfrastructure
    ? 'review'
    : 'eligible';
}

export function calculateEstimate(selection: PricingSelection): Estimate {
  const developmentItems: LineItem[] = [];

  if (includesDiscord(selection)) {
    developmentItems.push({ label: 'Base custom Discord bot', amountCents: pricing.discord.base });
    for (const feature of selection.discordFeatures) {
      developmentItems.push({ label: discordFeatureLabels[feature], amountCents: pricing.discord[feature] });
    }
    const commandCount = clampInteger(selection.customCommands, 0, 10);
    if (commandCount > 0) {
      developmentItems.push({
        label: `${commandCount} custom command${commandCount === 1 ? '' : 's'}`,
        amountCents: pricing.discord.commandsEach * commandCount,
      });
    }
  }

  if (includesWebsite(selection)) {
    developmentItems.push({ label: 'Base website', amountCents: pricing.website.base });
    for (const feature of selection.websiteFeatures) {
      developmentItems.push({ label: websiteFeatureLabels[feature], amountCents: pricing.website[feature] });
    }
    const pageCount = clampInteger(selection.additionalPages, 0, 15);
    if (pageCount > 0) {
      developmentItems.push({
        label: `${pageCount} additional page${pageCount === 1 ? '' : 's'}`,
        amountCents: pricing.website.additionalPage * pageCount,
      });
    }
  }

  const developmentSubtotalCents = developmentItems.reduce((total, item) => total + item.amountCents, 0);
  const complexityAdjustedCents = Math.round(
    developmentSubtotalCents * pricing.complexity[selection.complexity],
  );
  const prioritySurchargeCents = selection.priority
    ? Math.round(complexityAdjustedCents * pricing.priorityMultiplier)
    : 0;
  const packageChargeCents =
    includesWebsite(selection) && selection.hostingChoice === 'launch'
      ? pricing.launchPackage.additionalUpfrontPrice
      : 0;

  const monthlyItems: LineItem[] = [];
  if (selection.maintenance) {
    monthlyItems.push({ label: 'Maintenance', amountCents: pricing.monthly.maintenance });
  }
  if (selection.hostingManagement && includesWebsite(selection)) {
    monthlyItems.push({ label: 'Hosting management', amountCents: pricing.monthly.hostingManagement });
  }

  return {
    developmentItems,
    developmentSubtotalCents,
    complexityAdjustedCents,
    prioritySurchargeCents,
    packageChargeCents,
    oneTimeTotalCents: complexityAdjustedCents + prioritySurchargeCents + packageChargeCents,
    monthlyItems,
    monthlyTotalCents: monthlyItems.reduce((total, item) => total + item.amountCents, 0),
    eligibility: getHostingEligibility(selection),
  };
}

export function formatCurrency(amountCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}

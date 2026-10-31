import { botPurposeLabels, communitySizeLabels, contentSupportLabels, discordFeatureLabels, pricing, softwareFeatureLabels, softwarePlatformLabels, softwarePurposeLabels, userScaleLabels, websiteDesignLevelLabels, websiteFeatureLabels, websitePurposeLabels } from '../config/pricing';
import type { EligibilityStatus, Estimate, LineItem, PricingSelection } from '../types/pricing';

export const defaultSelection: PricingSelection = {
  projectType: 'website',
  complexity: 'standard',
  websitePurpose: 'business',
  websiteDesignLevel: 'provided',
  contentSupport: 'provided',
  botPurpose: 'community',
  communitySize: 'small',
  softwarePurpose: 'internalTool',
  softwarePlatform: 'windows',
  userScale: 'single',
  discordFeatures: [],
  websiteFeatures: [],
  softwareFeatures: [],
  customCommands: 0,
  additionalPages: 0,
  additionalIntegrations: 0,
  dataMigration: false,
  training: false,
  priority: false,
  maintenance: false,
  hostingManagement: false,
  hostingChoice: 'self',
  preferredDomain: '',
  targetAudience: '',
  projectSummary: '',
};

const includesDiscord = (selection: PricingSelection) =>
  ['discord', 'combined', 'botSoftware', 'full'].includes(selection.projectType);

const includesWebsite = (selection: PricingSelection) =>
  ['website', 'combined', 'websiteSoftware', 'full'].includes(selection.projectType);

const includesSoftware = (selection: PricingSelection) =>
  ['software', 'websiteSoftware', 'botSoftware', 'full'].includes(selection.projectType);

const clampInteger = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? Math.round(value) : minimum));

export function getHostingEligibility(selection: PricingSelection): EligibilityStatus {
  if (!includesWebsite(selection)) return 'review';
  const infrastructureFeatures = new Set(['authentication', 'dashboard', 'ecommerce', 'database', 'api', 'payments', 'subscriptions', 'fileUploads']);
  const needsSubstantialInfrastructure = selection.websiteFeatures.some((feature) =>
    infrastructureFeatures.has(feature),
  );
  return selection.complexity === 'advanced' || needsSubstantialInfrastructure
    ? 'review'
    : 'eligible';
}

export function calculateEstimate(selection: PricingSelection): Estimate {
  const developmentItems: LineItem[] = [];
  const addPricedOption = (label: string, amountCents: number) => {
    if (amountCents > 0) developmentItems.push({ label, amountCents });
  };

  if (includesDiscord(selection)) {
    developmentItems.push({ label: `${botPurposeLabels[selection.botPurpose]} bot`, amountCents: pricing.botPurpose[selection.botPurpose] });
    addPricedOption(communitySizeLabels[selection.communitySize], pricing.communitySize[selection.communitySize]);
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
    developmentItems.push({ label: websitePurposeLabels[selection.websitePurpose], amountCents: pricing.websitePurpose[selection.websitePurpose] });
    addPricedOption(websiteDesignLevelLabels[selection.websiteDesignLevel], pricing.websiteDesignLevel[selection.websiteDesignLevel]);
    addPricedOption(contentSupportLabels[selection.contentSupport], pricing.contentSupport[selection.contentSupport]);
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

  if (includesSoftware(selection)) {
    developmentItems.push({ label: softwarePurposeLabels[selection.softwarePurpose], amountCents: pricing.softwarePurpose[selection.softwarePurpose] });
    addPricedOption(softwarePlatformLabels[selection.softwarePlatform], pricing.softwarePlatform[selection.softwarePlatform]);
    addPricedOption(userScaleLabels[selection.userScale], pricing.userScale[selection.userScale]);
    for (const feature of selection.softwareFeatures) {
      developmentItems.push({ label: softwareFeatureLabels[feature], amountCents: pricing.software[feature] });
    }
  }

  const integrationCount = clampInteger(selection.additionalIntegrations, 0, 10);
  if (integrationCount > 0) developmentItems.push({ label: `${integrationCount} additional integration${integrationCount === 1 ? '' : 's'}`, amountCents: pricing.additionalIntegration * integrationCount });
  if (selection.dataMigration) developmentItems.push({ label: 'Existing data migration', amountCents: pricing.dataMigration });
  if (selection.training) developmentItems.push({ label: 'Team training session', amountCents: pricing.training });

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

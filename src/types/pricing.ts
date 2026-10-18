export type ProjectType = 'discord' | 'website' | 'combined';
export type Complexity = 'basic' | 'standard' | 'advanced';
export type HostingChoice = 'self' | 'launch';
export type EligibilityStatus = 'eligible' | 'review';

export type DiscordFeature =
  | 'moderation'
  | 'tickets'
  | 'leveling'
  | 'logging'
  | 'database'
  | 'api'
  | 'automation'
  | 'dashboard';

export type WebsiteFeature =
  | 'contactForm'
  | 'animations'
  | 'cms'
  | 'authentication'
  | 'database'
  | 'api'
  | 'dashboard'
  | 'ecommerce';

export interface PricingSelection {
  readonly projectType: ProjectType;
  readonly complexity: Complexity;
  readonly discordFeatures: readonly DiscordFeature[];
  readonly websiteFeatures: readonly WebsiteFeature[];
  readonly customCommands: number;
  readonly additionalPages: number;
  readonly priority: boolean;
  readonly maintenance: boolean;
  readonly hostingManagement: boolean;
  readonly hostingChoice: HostingChoice;
  readonly preferredDomain: string;
}

export interface LineItem {
  readonly label: string;
  readonly amountCents: number;
}

export interface Estimate {
  readonly developmentItems: readonly LineItem[];
  readonly developmentSubtotalCents: number;
  readonly complexityAdjustedCents: number;
  readonly prioritySurchargeCents: number;
  readonly packageChargeCents: number;
  readonly oneTimeTotalCents: number;
  readonly monthlyItems: readonly LineItem[];
  readonly monthlyTotalCents: number;
  readonly eligibility: EligibilityStatus;
}

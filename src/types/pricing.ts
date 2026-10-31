export type ProjectType = 'discord' | 'website' | 'software' | 'combined' | 'websiteSoftware' | 'botSoftware' | 'full';
export type Complexity = 'basic' | 'standard' | 'advanced';
export type HostingChoice = 'self' | 'launch';
export type EligibilityStatus = 'eligible' | 'review';
export type WebsitePurpose = 'business' | 'landing' | 'portfolio' | 'ecommerce' | 'membership' | 'webApp' | 'nonprofit' | 'restaurant' | 'event' | 'directory' | 'education' | 'realEstate';
export type WebsiteDesignLevel = 'provided' | 'custom' | 'brandSystem';
export type ContentSupport = 'provided' | 'editing' | 'copywriting';
export type BotPurpose = 'community' | 'moderation' | 'support' | 'commerce' | 'gaming' | 'internal' | 'events' | 'creator' | 'roleplay' | 'utilities' | 'onboarding' | 'marketplace';
export type CommunitySize = 'small' | 'growing' | 'large' | 'enterprise';
export type SoftwarePurpose = 'internalTool' | 'automation' | 'data' | 'customerPortal' | 'desktopUtility' | 'crm' | 'inventory' | 'scheduling' | 'integrationHub' | 'kiosk' | 'mobileCompanion';
export type SoftwarePlatform = 'windows' | 'macos' | 'crossPlatform' | 'web';
export type UserScale = 'single' | 'team' | 'business' | 'multiTenant';

export type DiscordFeature =
  | 'moderation'
  | 'tickets'
  | 'leveling'
  | 'logging'
  | 'database'
  | 'api'
  | 'automation'
  | 'dashboard'
  | 'verification'
  | 'payments'
  | 'aiAssistant'
  | 'scheduledJobs'
  | 'webhooks'
  | 'reactionRoles'
  | 'welcomeFlow'
  | 'polls'
  | 'giveaways'
  | 'music'
  | 'applications'
  | 'economy'
  | 'leaderboards'
  | 'localization'
  | 'backup'
  | 'antiSpam'
  | 'analytics';

export type WebsiteFeature =
  | 'contactForm'
  | 'animations'
  | 'cms'
  | 'authentication'
  | 'database'
  | 'api'
  | 'dashboard'
  | 'ecommerce'
  | 'blog'
  | 'booking'
  | 'multilingual'
  | 'search'
  | 'analytics'
  | 'seo'
  | 'payments'
  | 'donations'
  | 'subscriptions'
  | 'advancedForms'
  | 'maps'
  | 'reviews'
  | 'liveChat'
  | 'emailMarketing'
  | 'accessibility'
  | 'performance'
  | 'pwa'
  | 'socialFeeds'
  | 'calculators'
  | 'fileUploads'
  | 'notifications';

export type SoftwareFeature = 'database' | 'api' | 'automation' | 'authentication' | 'reporting' | 'installer' | 'fileHandling' | 'offlineMode' | 'notifications' | 'auditLog' | 'updater' | 'payments' | 'calendar' | 'barcode' | 'printing' | 'cloudSync' | 'roleManagement' | 'mobileCompanion' | 'backups' | 'twoFactor' | 'search' | 'bulkActions' | 'integrationHub';

export interface PricingSelection {
  readonly projectType: ProjectType;
  readonly complexity: Complexity;
  readonly websitePurpose: WebsitePurpose;
  readonly websiteDesignLevel: WebsiteDesignLevel;
  readonly contentSupport: ContentSupport;
  readonly botPurpose: BotPurpose;
  readonly communitySize: CommunitySize;
  readonly softwarePurpose: SoftwarePurpose;
  readonly softwarePlatform: SoftwarePlatform;
  readonly userScale: UserScale;
  readonly discordFeatures: readonly DiscordFeature[];
  readonly websiteFeatures: readonly WebsiteFeature[];
  readonly softwareFeatures: readonly SoftwareFeature[];
  readonly customCommands: number;
  readonly additionalPages: number;
  readonly additionalIntegrations: number;
  readonly dataMigration: boolean;
  readonly training: boolean;
  readonly priority: boolean;
  readonly maintenance: boolean;
  readonly hostingManagement: boolean;
  readonly hostingChoice: HostingChoice;
  readonly preferredDomain: string;
  readonly targetAudience: string;
  readonly projectSummary: string;
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

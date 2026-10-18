import type { Complexity, DiscordFeature, WebsiteFeature } from '../types/pricing';

export const pricing = {
  currency: 'USD',
  complexity: { basic: 1, standard: 1.5, advanced: 2.2 } satisfies Record<Complexity, number>,
  discord: {
    base: 7_500,
    moderation: 3_000,
    tickets: 3_500,
    leveling: 3_000,
    logging: 2_500,
    commandsEach: 1_500,
    database: 4_500,
    api: 5_000,
    automation: 6_500,
    dashboard: 12_000,
  },
  website: {
    base: 20_000,
    additionalPage: 4_000,
    contactForm: 2_500,
    animations: 7_500,
    cms: 9_000,
    authentication: 11_000,
    database: 10_000,
    api: 8_500,
    dashboard: 17_500,
    ecommerce: 20_000,
  },
  priorityMultiplier: 0.25,
  monthly: { maintenance: 3_000, hostingManagement: 1_500 },
  launchPackage: {
    enabled: true,
    eligibleStaticHostingIncluded: true,
    eligibleFirstYearDomainIncluded: true,
    additionalUpfrontPrice: 0,
    domainPriceCap: null,
    requiresEligibilityReview: true,
  },
} as const;

export const discordFeatureLabels: Record<DiscordFeature, string> = {
  moderation: 'Moderation system',
  tickets: 'Ticket system',
  leveling: 'Leveling & XP',
  logging: 'Logging system',
  database: 'Database integration',
  api: 'External API integration',
  automation: 'Advanced automation',
  dashboard: 'Custom dashboard',
};

export const websiteFeatureLabels: Record<WebsiteFeature, string> = {
  contactForm: 'Contact form',
  animations: 'Advanced animations',
  cms: 'CMS integration',
  authentication: 'User authentication',
  database: 'Database integration',
  api: 'API integration',
  dashboard: 'Admin dashboard',
  ecommerce: 'E-commerce functionality',
};

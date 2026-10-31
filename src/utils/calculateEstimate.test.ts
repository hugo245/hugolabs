import { describe, expect, it } from 'vitest';
import type { PricingSelection } from '../types/pricing';
import { calculateEstimate, defaultSelection, formatCurrency, getHostingEligibility } from './calculateEstimate';

const configure = (changes: Partial<PricingSelection>): PricingSelection => ({ ...defaultSelection, ...changes });

describe('calculateEstimate', () => {
  it('calculates a basic website from its required base', () => {
    const result = calculateEstimate(configure({ projectType: 'website', complexity: 'basic' }));
    expect(result.developmentSubtotalCents).toBe(15_000);
    expect(result.oneTimeTotalCents).toBe(15_000);
  });

  it('calculates a basic Discord bot from its required base', () => {
    const result = calculateEstimate(configure({ projectType: 'discord', complexity: 'basic' }));
    expect(result.oneTimeTotalCents).toBe(4_500);
  });

  it('calculates custom software from its base and selected scope', () => {
    const result = calculateEstimate(configure({ projectType: 'software', complexity: 'basic', softwareFeatures: ['automation'] }));
    expect(result.oneTimeTotalCents).toBe(19_000);
  });

  it('includes both bases in a combined project without duplication', () => {
    const result = calculateEstimate(configure({ projectType: 'combined', complexity: 'basic' }));
    expect(result.developmentSubtotalCents).toBe(19_500);
    expect(result.developmentItems).toHaveLength(2);
  });

  it('supports a complete website, bot, and software system', () => {
    const result = calculateEstimate(configure({ projectType: 'full', complexity: 'basic' }));
    expect(result.developmentSubtotalCents).toBe(33_500);
    expect(result.developmentItems).toHaveLength(3);
  });

  it('prices detailed website scope and operational requirements', () => {
    const result = calculateEstimate(configure({
      projectType: 'website',
      complexity: 'basic',
      websitePurpose: 'webApp',
      websiteDesignLevel: 'custom',
      contentSupport: 'copywriting',
      additionalIntegrations: 2,
      dataMigration: true,
      training: true,
    }));
    expect(result.developmentSubtotalCents).toBe(47_500);
    expect(result.oneTimeTotalCents).toBe(47_500);
  });

  it('uses the selected purpose as the service base instead of adding it as a surcharge', () => {
    const landing = calculateEstimate(configure({ projectType: 'website', complexity: 'basic', websitePurpose: 'landing' }));
    const portfolio = calculateEstimate(configure({ projectType: 'website', complexity: 'basic', websitePurpose: 'portfolio' }));
    const store = calculateEstimate(configure({ projectType: 'website', complexity: 'basic', websitePurpose: 'ecommerce' }));
    expect(landing.developmentItems).toEqual([{ label: 'Landing page', amountCents: 7_500 }]);
    expect(portfolio.developmentItems).toEqual([{ label: 'Portfolio or showcase', amountCents: 7_500 }]);
    expect(store.developmentItems).toEqual([{ label: 'Online store', amountCents: 20_000 }]);
  });

  it('uses purpose-based starting prices for bots and software too', () => {
    const communityBot = calculateEstimate(configure({ projectType: 'discord', complexity: 'basic', botPurpose: 'community' }));
    const commerceBot = calculateEstimate(configure({ projectType: 'discord', complexity: 'basic', botPurpose: 'commerce' }));
    const utility = calculateEstimate(configure({ projectType: 'software', complexity: 'basic', softwarePurpose: 'desktopUtility' }));
    const portal = calculateEstimate(configure({ projectType: 'software', complexity: 'basic', softwarePurpose: 'customerPortal' }));
    expect(communityBot.oneTimeTotalCents).toBe(4_500);
    expect(commerceBot.oneTimeTotalCents).toBe(11_000);
    expect(utility.oneTimeTotalCents).toBe(10_000);
    expect(portal.oneTimeTotalCents).toBe(22_000);
  });

  it('prices expanded feature options', () => {
    const result = calculateEstimate(configure({
      projectType: 'discord',
      complexity: 'basic',
      discordFeatures: ['aiAssistant', 'payments', 'verification'],
    }));
    expect(result.oneTimeTotalCents).toBe(17_000);
  });

  it('applies the complexity multiplier and rounds to integer cents', () => {
    const result = calculateEstimate(configure({ projectType: 'discord', complexity: 'standard' }));
    expect(result.complexityAdjustedCents).toBe(5_625);
  });

  it('handles feature quantities within their supported bounds', () => {
    const result = calculateEstimate(configure({ projectType: 'combined', complexity: 'basic', customCommands: 3, additionalPages: 2 }));
    expect(result.developmentSubtotalCents).toBe(27_500);
  });

  it('adds priority after complexity adjustment', () => {
    const result = calculateEstimate(configure({ projectType: 'website', complexity: 'standard', priority: true }));
    expect(result.complexityAdjustedCents).toBe(18_750);
    expect(result.prioritySurchargeCents).toBe(4_688);
    expect(result.oneTimeTotalCents).toBe(23_438);
  });

  it('keeps recurring costs separate from the one-time estimate', () => {
    const result = calculateEstimate(configure({ maintenance: true, hostingManagement: true }));
    expect(result.monthlyTotalCents).toBe(4_500);
    expect(result.oneTimeTotalCents).toBe(18_750);
  });

  it('flags infrastructure-heavy hosting configurations for review', () => {
    const selection = configure({ websiteFeatures: ['ecommerce'] });
    expect(getHostingEligibility(selection)).toBe('review');
  });

  it('treats the reset state as predictable and immutable', () => {
    const result = calculateEstimate(defaultSelection);
    expect(result.oneTimeTotalCents).toBe(18_750);
    expect(defaultSelection.websiteFeatures).toEqual([]);
  });

  it('clamps invalid and excessive quantities', () => {
    const result = calculateEstimate(configure({ projectType: 'combined', complexity: 'basic', customCommands: Number.NaN, additionalPages: 99 }));
    expect(result.developmentSubtotalCents).toBe(57_000);
  });

  it('formats currency from cents without floating-point artifacts', () => {
    expect(formatCurrency(12_345)).toBe('$123');
  });
});

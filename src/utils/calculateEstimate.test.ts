import { describe, expect, it } from 'vitest';
import type { PricingSelection } from '../types/pricing';
import { calculateEstimate, defaultSelection, formatCurrency, getHostingEligibility } from './calculateEstimate';

const configure = (changes: Partial<PricingSelection>): PricingSelection => ({ ...defaultSelection, ...changes });

describe('calculateEstimate', () => {
  it('calculates a basic website from its required base', () => {
    const result = calculateEstimate(configure({ projectType: 'website', complexity: 'basic' }));
    expect(result.developmentSubtotalCents).toBe(20_000);
    expect(result.oneTimeTotalCents).toBe(20_000);
  });

  it('calculates a basic Discord bot from its required base', () => {
    const result = calculateEstimate(configure({ projectType: 'discord', complexity: 'basic' }));
    expect(result.oneTimeTotalCents).toBe(7_500);
  });

  it('includes both bases in a combined project without duplication', () => {
    const result = calculateEstimate(configure({ projectType: 'combined', complexity: 'basic' }));
    expect(result.developmentSubtotalCents).toBe(27_500);
    expect(result.developmentItems).toHaveLength(2);
  });

  it('applies the complexity multiplier and rounds to integer cents', () => {
    const result = calculateEstimate(configure({ projectType: 'discord', complexity: 'standard' }));
    expect(result.complexityAdjustedCents).toBe(11_250);
  });

  it('handles feature quantities within their supported bounds', () => {
    const result = calculateEstimate(configure({ projectType: 'combined', complexity: 'basic', customCommands: 3, additionalPages: 2 }));
    expect(result.developmentSubtotalCents).toBe(40_000);
  });

  it('adds priority after complexity adjustment', () => {
    const result = calculateEstimate(configure({ projectType: 'website', complexity: 'standard', priority: true }));
    expect(result.complexityAdjustedCents).toBe(30_000);
    expect(result.prioritySurchargeCents).toBe(7_500);
    expect(result.oneTimeTotalCents).toBe(37_500);
  });

  it('keeps recurring costs separate from the one-time estimate', () => {
    const result = calculateEstimate(configure({ maintenance: true, hostingManagement: true }));
    expect(result.monthlyTotalCents).toBe(4_500);
    expect(result.oneTimeTotalCents).toBe(30_000);
  });

  it('flags infrastructure-heavy hosting configurations for review', () => {
    const selection = configure({ websiteFeatures: ['ecommerce'] });
    expect(getHostingEligibility(selection)).toBe('review');
  });

  it('treats the reset state as predictable and immutable', () => {
    const result = calculateEstimate(defaultSelection);
    expect(result.oneTimeTotalCents).toBe(30_000);
    expect(defaultSelection.websiteFeatures).toEqual([]);
  });

  it('clamps invalid and excessive quantities', () => {
    const result = calculateEstimate(configure({ projectType: 'combined', complexity: 'basic', customCommands: Number.NaN, additionalPages: 99 }));
    expect(result.developmentSubtotalCents).toBe(87_500);
  });

  it('formats currency from cents without floating-point artifacts', () => {
    expect(formatCurrency(12_345)).toBe('$123');
  });
});

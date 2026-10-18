import { describe, expect, it } from 'vitest';
import { buildContactMailto, sanitizeContactFields, validateContactFields, type ContactFields } from './contactSecurity';

const validFields: ContactFields = {
  name: 'Avery Stone',
  email: 'avery@example.com',
  projectType: 'Website',
  budget: '$1,000 to $2,500',
  timeline: 'Six weeks',
  discord: 'avery',
  website: 'https://example.com',
  domain: 'hugolabs.eu',
  description: 'We need a clear website for our growing service business.',
};

describe('contact form security', () => {
  it('removes control characters and line breaks from single-line values', () => {
    const safe = sanitizeContactFields({ ...validFields, name: 'Avery\r\nBcc: attacker@example.com\u0000' });
    expect(safe.name).toBe('Avery Bcc: attacker@example.com');
  });

  it('rejects non-http website protocols', () => {
    const safe = sanitizeContactFields({ ...validFields, website: 'javascript:alert(1)' });
    expect(validateContactFields(safe)).toContain('http:// or https://');
  });

  it('drops injected select values', () => {
    const safe = sanitizeContactFields({ ...validFields, projectType: '<script>alert(1)</script>' });
    expect(safe.projectType).toBe('');
  });

  it('encodes user input in the mail link', () => {
    const result = buildContactMailto({ ...validFields, description: 'Build this & keep the details private, please.' }, 'hire@hugolabs.eu');
    expect(result.error).toBeNull();
    expect(result.href).toContain('%26');
    expect(result.href).not.toContain('<script>');
  });
});

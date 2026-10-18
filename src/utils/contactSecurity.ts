export interface ContactFields {
  readonly name: string;
  readonly email: string;
  readonly projectType: string;
  readonly budget: string;
  readonly timeline: string;
  readonly discord: string;
  readonly website: string;
  readonly domain: string;
  readonly description: string;
}

export const contactLimits = {
  name: 80,
  email: 254,
  timeline: 100,
  discord: 80,
  website: 300,
  domain: 253,
  description: 3000,
} as const;

const projectTypes = new Set(['', 'Website', 'Discord bot', 'Website + Discord bot', 'Automation', 'Something else']);
const budgets = new Set(['', 'Under $500', '$500 to $1,000', '$1,000 to $2,500', '$2,500+', 'Not sure yet']);
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const domainPattern = /^(?=.{1,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const removeUnsafeControls = (value: string) => Array.from(value)
  .filter((character) => {
    const code = character.charCodeAt(0);
    return code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127);
  })
  .join('');

const cleanSingleLine = (value: string, maximum: number) => removeUnsafeControls(value.normalize('NFKC'))
  .replace(/[\r\n\t]+/g, ' ')
  .replace(/\s{2,}/g, ' ')
  .trim()
  .slice(0, maximum);

const cleanMultiline = (value: string, maximum: number) => removeUnsafeControls(value.normalize('NFKC'))
  .replace(/\r\n?/g, '\n')
  .trim()
  .slice(0, maximum);

export function sanitizeContactFields(fields: ContactFields): ContactFields {
  return {
    name: cleanSingleLine(fields.name, contactLimits.name),
    email: cleanSingleLine(fields.email, contactLimits.email),
    projectType: projectTypes.has(fields.projectType) ? fields.projectType : '',
    budget: budgets.has(fields.budget) ? fields.budget : '',
    timeline: cleanSingleLine(fields.timeline, contactLimits.timeline),
    discord: cleanSingleLine(fields.discord, contactLimits.discord),
    website: cleanSingleLine(fields.website, contactLimits.website),
    domain: cleanSingleLine(fields.domain, contactLimits.domain).toLowerCase(),
    description: cleanMultiline(fields.description, contactLimits.description),
  };
}

function isSafeWebsite(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function validateContactFields(fields: ContactFields): string | null {
  if (!fields.name) return 'Please add your name.';
  if (!emailPattern.test(fields.email) || fields.email.length > contactLimits.email) return 'Please add a valid email address.';
  if (fields.description.length < 20) return 'Please add at least 20 characters about the project.';
  if (!isSafeWebsite(fields.website)) return 'The existing website must start with http:// or https://.';
  if (fields.domain && !domainPattern.test(fields.domain)) return 'Please enter a valid domain, such as example.com.';
  return null;
}

export function buildContactMailto(fields: ContactFields, recipient: string) {
  const safe = sanitizeContactFields(fields);
  const error = validateContactFields(safe);
  if (error) return { error, href: null, fields: safe } as const;

  const labels: Readonly<Record<keyof ContactFields, string>> = {
    name: 'Name',
    email: 'Email',
    projectType: 'Project type',
    budget: 'Budget',
    timeline: 'Timeline',
    discord: 'Discord username',
    website: 'Existing website',
    domain: 'Preferred domain',
    description: 'Project description',
  };
  const body = (Object.keys(labels) as (keyof ContactFields)[])
    .map((key) => `${labels[key]}: ${safe[key] || 'Not supplied'}`)
    .join('\n');
  const subject = `HugoLabs project inquiry | ${safe.projectType || 'New project'}`;
  const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { error: null, href, fields: safe } as const;
}

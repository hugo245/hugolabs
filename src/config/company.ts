export const company = {
  name: 'HugoLabs',
  description: 'Websites, Discord bots, and custom software built with care in one small studio.',
  emails: {
    general: 'hello@hugolabs.eu',
    support: 'info@hugolabs.eu',
    projects: 'hire@hugolabs.eu',
  },
} as const;

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
] as const;

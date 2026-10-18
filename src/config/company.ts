export const company = {
  name: 'HugoLabs',
  description: 'Custom websites, Discord bots, and automation built for the way you work.',
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

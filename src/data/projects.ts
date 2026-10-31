export interface PortfolioProject {
  readonly name: string;
  readonly domain: string;
  readonly url: string;
  readonly favicon: string;
  readonly fallback: string;
  readonly theme: 'blue' | 'ink' | 'ice' | 'white' | 'cyan';
}

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    name: 'Worth Works',
    domain: 'worthworks.nl',
    url: 'https://worthworks.nl/',
    favicon: 'https://www.google.com/s2/favicons?domain=worthworks.nl&sz=128',
    fallback: 'WW',
    theme: 'blue',
  },
  {
    name: 'Worth',
    domain: 'worth.nl',
    url: 'https://worth.nl/',
    favicon: 'https://www.google.com/s2/favicons?domain=worth.nl&sz=128',
    fallback: 'W',
    theme: 'white',
  },
  {
    name: 'Evo Studios',
    domain: 'evostudios.vercel.app',
    url: 'https://evostudios.vercel.app/',
    favicon: 'https://www.google.com/s2/favicons?domain=evostudios.vercel.app&sz=128',
    fallback: 'E',
    theme: 'ink',
  },
  {
    name: 'Paradox',
    domain: 'paradox-nns8.onrender.com',
    url: 'https://paradox-nns8.onrender.com/',
    favicon: 'https://www.google.com/s2/favicons?domain=paradox-nns8.onrender.com&sz=128',
    fallback: 'P',
    theme: 'blue',
  },
  {
    name: 'PlayVerse',
    domain: 'playverse.cc',
    url: 'https://www.playverse.cc/',
    favicon: 'https://www.google.com/s2/favicons?domain=playverse.cc&sz=128',
    fallback: 'PV',
    theme: 'cyan',
  },
  {
    name: 'SupStore',
    domain: 'supstore.dev',
    url: 'https://supstore.dev/',
    favicon: 'https://www.google.com/s2/favicons?domain=supstore.dev&sz=128',
    fallback: 'S',
    theme: 'ice',
  },
] as const;

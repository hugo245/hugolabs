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
    favicon: '/assets/project-favicons/worthworks.png',
    fallback: 'WW',
    theme: 'blue',
  },
  {
    name: 'Worth',
    domain: 'worth.nl',
    url: 'https://worth.nl/',
    favicon: '/assets/project-favicons/worth.png',
    fallback: 'W',
    theme: 'white',
  },
  {
    name: 'Evo Studios',
    domain: 'evostudios.vercel.app',
    url: 'https://evostudios.vercel.app/',
    favicon: '/assets/project-favicons/evo-studios.svg',
    fallback: 'E',
    theme: 'ink',
  },
  {
    name: 'Paradox',
    domain: 'paradox-nns8.onrender.com',
    url: 'https://paradox-nns8.onrender.com/',
    favicon: '/assets/project-favicons/paradox.svg',
    fallback: 'P',
    theme: 'blue',
  },
  {
    name: 'PlayVerse',
    domain: 'playverse.cc',
    url: 'https://www.playverse.cc/',
    favicon: '/assets/project-favicons/playverse.png',
    fallback: 'PV',
    theme: 'cyan',
  },
  {
    name: 'SupStore',
    domain: 'supstore.dev',
    url: 'https://supstore.dev/',
    favicon: '/assets/project-favicons/supstore.svg',
    fallback: 'S',
    theme: 'ice',
  },
] as const;

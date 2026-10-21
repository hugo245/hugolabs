export interface PortfolioProject {
  readonly name: string;
  readonly domain: string;
  readonly url: string;
  readonly mark: string;
  readonly theme: 'blue' | 'ink' | 'ice' | 'violet' | 'white' | 'cyan';
}

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    name: 'Worth Works',
    domain: 'worthworks.nl',
    url: 'https://worthworks.nl/',
    mark: 'WW',
    theme: 'blue',
  },
  {
    name: 'Worth',
    domain: 'worth.nl',
    url: 'https://worth.nl/',
    mark: 'W',
    theme: 'white',
  },
  {
    name: 'Evo Studios',
    domain: 'evostudios.vercel.app',
    url: 'https://evostudios.vercel.app/',
    mark: 'EVO',
    theme: 'ink',
  },
  {
    name: 'Paradox',
    domain: 'paradox-nns8.onrender.com',
    url: 'https://paradox-nns8.onrender.com/',
    mark: 'PX',
    theme: 'violet',
  },
  {
    name: 'PlayVerse',
    domain: 'playverse.cc',
    url: 'https://www.playverse.cc/',
    mark: 'PLAY',
    theme: 'cyan',
  },
  {
    name: 'SupStore',
    domain: 'supstore.dev',
    url: 'https://supstore.dev/',
    mark: 'SUP',
    theme: 'ice',
  },
] as const;

export interface Grant {
  id: string;
  name: string;
  description: string;
  amount: string;
  deadline: string;
  requirements: string[];
  link: string;
  category: 'tech' | 'business' | 'social' | 'research';
  region: 'global' | 'usa' | 'canada' | 'uk' | 'eu';
}

export const grants: Grant[] = [
  {
    id: 'verizon-resilience-2025',
    name: 'Verizon Disaster Resilience Prize 2025',
    description: 'Tech solutions enhancing U.S. disaster resilience. Total prize pool of $1,000,000, with $250,000 awarded to each of four innovative solutions.',
    amount: '$250,000',
    deadline: 'June 13, 2025',
    requirements: [
      'Must be registered in contiguous U.S.',
      'Minimum 4 full-time employees',
      'Technology-driven solution beyond prototype stage'
    ],
    link: 'https://solve.mit.edu/verizon-disaster-resilience-prize-2025',
    category: 'tech',
    region: 'usa'
  },
  {
    id: 'mit-solve-2025',
    name: 'MIT Solve Global Challenges 2025',
    description: 'Various challenges including Health, Learning, Economic Prosperity, and more. Focus on tech solutions with social impact.',
    amount: '$10,000 - $100,000',
    deadline: 'July 11, 2025',
    requirements: [
      'Open to global applicants',
      'Tech-based solution',
      'Clear social impact'
    ],
    link: 'https://solve.mit.edu/challenges',
    category: 'tech',
    region: 'global'
  },
  {
    id: 'hello-tomorrow-2025',
    name: 'Hello Tomorrow Global Challenge',
    description: 'Deep tech solutions addressing global issues. Focus on science-backed innovations.',
    amount: '€100,000',
    deadline: 'Late 2025',
    requirements: [
      'Deep tech focus',
      'Science-backed innovation',
      'Global impact potential'
    ],
    link: 'https://hello-tomorrow.org/',
    category: 'research',
    region: 'global'
  },
  {
    id: 'kiva-microloan',
    name: 'Kiva U.S. Microloan Program',
    description: '0% interest loans for small businesses and startups. Crowdfunded microloans.',
    amount: 'Up to $15,000',
    deadline: 'Rolling',
    requirements: [
      'U.S. based',
      'Credit check required',
      'Business plan needed'
    ],
    link: 'https://www.kiva.org/',
    category: 'business',
    region: 'usa'
  },
  {
    id: 'ifundwomen',
    name: 'IFundWomen Universal Grant Application',
    description: 'Grants for women-led businesses across various industries. Includes coaching and support.',
    amount: 'Varies',
    deadline: 'Rolling',
    requirements: [
      'Women-led business',
      'Clear business plan',
      'Growth potential'
    ],
    link: 'https://ifundwomen.com/',
    category: 'business',
    region: 'usa'
  }
]; 
import { Grant } from './types';

export const seedGrants: Grant[] = [
  {
    id: '1',
    name: 'Verizon Disaster Resilience Prize 2025',
    description: 'Tech solutions enhancing U.S. disaster resilience. Total prize pool of $1,000,000, with $250,000 awarded to each of four innovative solutions.',
    amount: 250000,
    region: 'USA',
    industries: ['tech', 'social'],
    deadline: '2025-06-13',
    applicationUrl: 'https://solve.mit.edu/verizon-disaster-resilience-prize-2025',
    provider: 'Verizon & MIT Solve',
    requirements: [
      'Registered in contiguous U.S.',
      'Minimum 4 full-time employees',
      'Technology-driven solution beyond prototype stage'
    ],
    tags: ['disaster-resilience', 'emergency-response']
  },
  {
    id: '2',
    name: 'Canada Digital Adoption Program (CDAP)',
    description: 'Funding for businesses adopting digital tools and services. Includes grant and interest-free loan options.',
    amount: 115000,
    region: 'Canada',
    industries: ['tech', 'business'],
    deadline: '2024-12-31',
    applicationUrl: 'https://ised-isde.canada.ca/site/canada-digital-adoption-program/en',
    provider: 'Government of Canada',
    requirements: [
      'Canadian SME',
      'Digital transformation project',
      'Business plan'
    ],
    tags: ['digital-adoption', 'sme-support']
  },
  {
    id: '3',
    name: 'Innovate UK Smart Grants',
    description: 'Support for R&D projects in digital technology, AI, and data platforms.',
    amount: 500000,
    region: 'UK',
    industries: ['tech', 'research'],
    deadline: '2025-06-26',
    applicationUrl: 'https://www.ukri.org/opportunity/innovate-uk-smart-grants/',
    provider: 'Innovate UK',
    requirements: [
      'UK-based business',
      'Innovative R&D project',
      'Clear market potential'
    ],
    tags: ['innovation', 'rd-funding']
  },
  {
    id: '4',
    name: 'Tech Hubs and EDA Build to Scale Grants',
    description: 'Regional innovation funding for SaaS platform scale-up and software for economic development.',
    amount: 1000000,
    region: 'USA',
    industries: ['tech', 'business'],
    deadline: '2025-03-15',
    applicationUrl: 'https://www.eda.gov/funding/programs/',
    provider: 'Economic Development Administration',
    requirements: [
      'U.S. based organization',
      'Regional economic impact',
      'Innovation focus'
    ],
    tags: ['regional-development', 'tech-hubs']
  }
]; 
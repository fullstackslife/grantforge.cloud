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
  },
  {
    id: '5',
    name: 'NSF Small Business Innovation Research (SBIR)',
    description: 'Federal funding for small businesses to conduct R&D with commercial potential.',
    amount: 750000,
    region: 'USA',
    industries: ['tech', 'research', 'science'],
    deadline: '2025-04-15',
    applicationUrl: 'https://www.nsf.gov/sbir/',
    provider: 'National Science Foundation',
    requirements: [
      'U.S. small business',
      'R&D project',
      'Commercial potential'
    ],
    tags: ['sbir', 'federal-funding', 'rd']
  },
  {
    id: '6',
    name: 'European Innovation Council (EIC) Accelerator',
    description: 'EU funding for breakthrough innovations with high market potential.',
    amount: 2500000,
    region: 'Europe',
    industries: ['tech', 'innovation', 'startup'],
    deadline: '2025-05-20',
    applicationUrl: 'https://eic.ec.europa.eu/eic-accelerator_en',
    provider: 'European Commission',
    requirements: [
      'EU-based SME',
      'Breakthrough innovation',
      'Market potential'
    ],
    tags: ['eic', 'eu-funding', 'innovation']
  },
  {
    id: '7',
    name: 'Australia Research Council Linkage Projects',
    description: 'Funding for collaborative research projects between universities and industry partners.',
    amount: 300000,
    region: 'Australia',
    industries: ['research', 'academic', 'collaboration'],
    deadline: '2025-07-10',
    applicationUrl: 'https://www.arc.gov.au/grants/linkage-program/linkage-projects',
    provider: 'Australian Research Council',
    requirements: [
      'Australian research organization',
      'Industry collaboration',
      'Research excellence'
    ],
    tags: ['research', 'collaboration', 'academic']
  },
  {
    id: '8',
    name: 'Google for Startups Accelerator',
    description: 'Equity-free support for startups using AI/ML to solve complex problems.',
    amount: 50000,
    region: 'Global',
    industries: ['tech', 'startup', 'ai'],
    deadline: '2025-03-30',
    applicationUrl: 'https://startup.google.com/accelerator/',
    provider: 'Google',
    requirements: [
      'AI/ML focus',
      'Seed to Series A stage',
      'Technical team'
    ],
    tags: ['google', 'accelerator', 'ai-ml']
  },
  {
    id: '9',
    name: 'Microsoft for Startups Founders Hub',
    description: 'Free access to Microsoft tools, resources, and funding for eligible startups.',
    amount: 150000,
    region: 'Global',
    industries: ['tech', 'startup', 'software'],
    deadline: '2025-08-15',
    applicationUrl: 'https://startups.microsoft.com/',
    provider: 'Microsoft',
    requirements: [
      'Software/SaaS focus',
      'Less than 5 years old',
      'Less than $10M funding'
    ],
    tags: ['microsoft', 'startup', 'software']
  },
  {
    id: '10',
    name: 'Y Combinator Startup School',
    description: 'Free online startup course with potential for YC funding and mentorship.',
    amount: 500000,
    region: 'Global',
    industries: ['tech', 'startup', 'education'],
    deadline: '2025-06-01',
    applicationUrl: 'https://www.startupschool.org/',
    provider: 'Y Combinator',
    requirements: [
      'Early-stage startup',
      'Technical founder',
      'Innovative idea'
    ],
    tags: ['y-combinator', 'accelerator', 'startup']
  },
  {
    id: '11',
    name: 'AWS Activate',
    description: 'Free AWS credits and resources for eligible startups and accelerators.',
    amount: 100000,
    region: 'Global',
    industries: ['tech', 'startup', 'cloud'],
    deadline: '2025-09-30',
    applicationUrl: 'https://aws.amazon.com/activate/',
    provider: 'Amazon Web Services',
    requirements: [
      'Cloud-based solution',
      'Startup or accelerator member',
      'Technical team'
    ],
    tags: ['aws', 'cloud', 'startup']
  },
  {
    id: '12',
    name: 'Canada\'s Strategic Innovation Fund',
    description: 'Large-scale funding for innovative projects that create jobs and economic growth.',
    amount: 5000000,
    region: 'Canada',
    industries: ['innovation', 'business', 'economic-development'],
    deadline: '2025-11-15',
    applicationUrl: 'https://www.ic.gc.ca/eic/site/125.nsf/eng/home',
    provider: 'Government of Canada',
    requirements: [
      'Canadian business',
      'Large-scale project',
      'Economic impact'
    ],
    tags: ['canada', 'innovation', 'economic-development']
  },
  {
    id: '13',
    name: 'UK Research and Innovation (UKRI) Future Leaders Fellowships',
    description: 'Funding for early-career researchers and innovators to develop their research and innovation careers.',
    amount: 1200000,
    region: 'UK',
    industries: ['research', 'academic', 'innovation'],
    deadline: '2025-04-30',
    applicationUrl: 'https://www.ukri.org/opportunity/future-leaders-fellowships/',
    provider: 'UK Research and Innovation',
    requirements: [
      'Early-career researcher',
      'Innovative research',
      'UK-based organization'
    ],
    tags: ['ukri', 'research', 'fellowship']
  },
  {
    id: '14',
    name: 'Singapore Enterprise Development Grant',
    description: 'Support for Singapore-based enterprises to upgrade their business capabilities and innovate.',
    amount: 1000000,
    region: 'Singapore',
    industries: ['business', 'innovation', 'enterprise'],
    deadline: '2025-10-20',
    applicationUrl: 'https://www.enterprisesg.gov.sg/financial-assistance/grants/enterprise-development-grant',
    provider: 'Enterprise Singapore',
    requirements: [
      'Singapore-based enterprise',
      'Business capability upgrade',
      'Innovation project'
    ],
    tags: ['singapore', 'enterprise', 'innovation']
  },
  {
    id: '15',
    name: 'Japan Science and Technology Agency (JST) START Program',
    description: 'Funding for young researchers to start their own research projects and establish research groups.',
    amount: 300000,
    region: 'Japan',
    industries: ['research', 'science', 'academic'],
    deadline: '2025-07-25',
    applicationUrl: 'https://www.jst.go.jp/start/',
    provider: 'Japan Science and Technology Agency',
    requirements: [
      'Young researcher',
      'Japanese institution',
      'Innovative research'
    ],
    tags: ['japan', 'research', 'young-researchers']
  },
  {
    id: '16',
    name: 'Germany EXIST Research Transfer',
    description: 'Funding for researchers to transfer their research results into business applications.',
    amount: 800000,
    region: 'Germany',
    industries: ['research', 'transfer', 'startup'],
    deadline: '2025-05-10',
    applicationUrl: 'https://www.exist.de/EN/Programme/Research-Transfer/Research-Transfer.html',
    provider: 'Federal Ministry for Economic Affairs and Energy',
    requirements: [
      'German research institution',
      'Research transfer project',
      'Commercial potential'
    ],
    tags: ['germany', 'research-transfer', 'startup']
  },
  {
    id: '17',
    name: 'France Bpifrance Innovation',
    description: 'Support for innovative French companies to develop and market new products or services.',
    amount: 2000000,
    region: 'France',
    industries: ['innovation', 'business', 'french-companies'],
    deadline: '2025-08-05',
    applicationUrl: 'https://www.bpifrance.fr/',
    provider: 'Bpifrance',
    requirements: [
      'French company',
      'Innovation project',
      'Market potential'
    ],
    tags: ['france', 'innovation', 'business']
  },
  {
    id: '18',
    name: 'Netherlands MIT R&D Partnership',
    description: 'Collaborative R&D funding between Dutch companies and MIT researchers.',
    amount: 500000,
    region: 'Netherlands',
    industries: ['research', 'collaboration', 'mit'],
    deadline: '2025-06-20',
    applicationUrl: 'https://www.mit-nl.org/',
    provider: 'MIT Netherlands',
    requirements: [
      'Dutch company',
      'MIT collaboration',
      'R&D project'
    ],
    tags: ['netherlands', 'mit', 'collaboration']
  },
  {
    id: '19',
    name: 'Sweden Vinnova Innovation Grants',
    description: 'Funding for Swedish companies and organizations to develop innovative solutions.',
    amount: 400000,
    region: 'Sweden',
    industries: ['innovation', 'swedish-companies', 'development'],
    deadline: '2025-09-15',
    applicationUrl: 'https://www.vinnova.se/en/',
    provider: 'Vinnova',
    requirements: [
      'Swedish organization',
      'Innovation project',
      'Societal benefit'
    ],
    tags: ['sweden', 'innovation', 'development']
  },
  {
    id: '20',
    name: 'Norway Innovation Norway',
    description: 'Support for Norwegian companies to innovate and grow internationally.',
    amount: 600000,
    region: 'Norway',
    industries: ['innovation', 'norwegian-companies', 'international-growth'],
    deadline: '2025-07-30',
    applicationUrl: 'https://www.innovasjonnorge.no/',
    provider: 'Innovation Norway',
    requirements: [
      'Norwegian company',
      'Innovation project',
      'International potential'
    ],
    tags: ['norway', 'innovation', 'international']
  }
]; 
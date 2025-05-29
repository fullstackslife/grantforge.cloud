export interface Grant {
  id: string;
  title: string;
  description: string;
  deadline: string;
  amount: string;
  eligibility: {
    businessType: string[];
    location: string[];
    other?: string[];
  };
  category: string[];
  url: string;
}

export const grants: Grant[] = [
  {
    id: "verizon-resilience",
    title: "Verizon Disaster Resilience Prize 2025",
    description: "Tech solutions enhancing U.S. disaster resilience. Total prize pool of $1,000,000, with $250,000 awarded to each of four innovative solutions.",
    deadline: "2025-06-13",
    amount: "$250,000",
    eligibility: {
      businessType: ["For-profit", "Startup"],
      location: ["United States"],
      other: ["4+ full-time employees", "Beyond prototype stage"]
    },
    category: ["Disaster Relief", "Technology", "Innovation"],
    url: "https://solve.mit.edu/verizon-disaster-resilience-prize-2025"
  },
  {
    id: "mit-solve",
    title: "MIT Solve Global Challenges 2025",
    description: "Various challenges including Health, Learning, Economic Prosperity, and more. Open to innovative solutions addressing global issues.",
    deadline: "2025-07-11",
    amount: "$10,000 - $100,000",
    eligibility: {
      businessType: ["For-profit", "Non-profit", "Startup"],
      location: ["Global"]
    },
    category: ["Technology", "Social Impact", "Innovation"],
    url: "https://solve.mit.edu/challenges"
  },
  {
    id: "hello-tomorrow",
    title: "Hello Tomorrow Global Challenge",
    description: "Deep tech solutions addressing global issues. Focus on science-backed innovations with potential for significant impact.",
    deadline: "2025-12-31",
    amount: "€100,000",
    eligibility: {
      businessType: ["For-profit", "Startup"],
      location: ["Global"]
    },
    category: ["Deep Tech", "Science", "Innovation"],
    url: "https://hello-tomorrow.org/global-challenge"
  },
  {
    id: "kiva",
    title: "Kiva U.S. Microloan Program",
    description: "0% interest loans for small businesses and startups. Perfect for early-stage funding needs.",
    deadline: "Rolling",
    amount: "Up to $15,000",
    eligibility: {
      businessType: ["For-profit", "Startup"],
      location: ["United States"]
    },
    category: ["Microloan", "Early Stage"],
    url: "https://www.kiva.org/borrow"
  },
  {
    id: "ifundwomen",
    title: "IFundWomen Universal Grant Application",
    description: "Grants for women-led businesses across various industries. Includes coaching and support services.",
    deadline: "Rolling",
    amount: "Varies",
    eligibility: {
      businessType: ["For-profit", "Startup"],
      location: ["United States"],
      other: ["Women-led"]
    },
    category: ["Women Entrepreneurs", "Early Stage"],
    url: "https://ifundwomen.com/grants"
  },
  {
    id: "techstars",
    title: "Techstars Accelerator Programs",
    description: "Global accelerator programs offering investment, mentorship, and resources for tech startups.",
    deadline: "Varies",
    amount: "Investment + Support",
    eligibility: {
      businessType: ["For-profit", "Startup"],
      location: ["Global"]
    },
    category: ["Accelerator", "Technology"],
    url: "https://www.techstars.com/accelerators"
  },
  {
    id: "lenovo-evolve",
    title: "Lenovo Evolve Small Initiative",
    description: "Supports small businesses with funding, technology, and mentorship, focusing on business development and AI implementation.",
    deadline: "Rolling",
    amount: "$25,000 cash + $10,000 tech package",
    eligibility: {
      businessType: ["For-profit", "Small Business"],
      location: ["United States"]
    },
    category: ["Technology", "AI", "Small Business"],
    url: "https://www.lenovo.com/us/en/evolve-small"
  },
  {
    id: "amazon-grant",
    title: "Amazon Small Business Grants",
    description: "Offers grants to small businesses to support growth and innovation in the digital space.",
    deadline: "2025-05-23",
    amount: "Up to $25,000",
    eligibility: {
      businessType: ["For-profit", "Small Business"],
      location: ["United States"]
    },
    category: ["Small Business", "Technology"],
    url: "https://sell.amazon.com/programs/small-business-grants"
  }
]; 
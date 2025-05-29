export interface Grant {
  grant_name: string;
  provider: string;
  amount: string;
  deadline: string;
  link: string;
  use_case: string;
}

export const grants: Grant[] = [
  {
    grant_name: "Verizon Disaster Resilience Prize 2025",
    provider: "Verizon + MIT Solve",
    amount: "$250,000",
    deadline: "June 13, 2025",
    link: "https://solve.mit.edu/verizon-disaster-resilience-prize-2025",
    use_case: "Tech solutions enhancing U.S. disaster resilience. Must be U.S.-registered with 4+ employees."
  },
  {
    grant_name: "MIT Solve Global Challenges",
    provider: "MIT Solve",
    amount: "$10K–$100K",
    deadline: "July 11, 2025",
    link: "https://solve.mit.edu/challenges",
    use_case: "Various challenges including Health, Learning, Economic Prosperity. No entity required to apply."
  },
  {
    grant_name: "Hello Tomorrow Global Challenge",
    provider: "Hello Tomorrow",
    amount: "€100,000",
    deadline: "Late 2025",
    link: "https://hello-tomorrow.org/global-challenge",
    use_case: "Deep tech solutions addressing global issues. Pre-registration OK."
  },
  {
    grant_name: "Kiva U.S. Microloan",
    provider: "Kiva",
    amount: "Up to $15,000",
    deadline: "Rolling",
    link: "https://www.kiva.org/borrow",
    use_case: "0% interest loans for small businesses and startups. No entity required."
  },
  {
    grant_name: "IFundWomen Universal Grant",
    provider: "IFundWomen",
    amount: "$2K–$25K",
    deadline: "Rolling",
    link: "https://ifundwomen.com/grants",
    use_case: "Grants for women-led businesses across various industries. Includes coaching."
  },
  {
    grant_name: "Lenovo Evolve Small Initiative",
    provider: "Lenovo",
    amount: "$25,000 + $10,000 tech",
    deadline: "Rolling",
    link: "https://www.lenovo.com/us/en/evolve-small",
    use_case: "Supports small businesses with funding, technology, and mentorship. Focus on AI implementation."
  },
  {
    grant_name: "Amazon Small Business Grant",
    provider: "Amazon",
    amount: "Up to $25,000",
    deadline: "May 23, 2025",
    link: "https://sell.amazon.com/programs/small-business-grants",
    use_case: "Grants to small businesses to support growth and innovation."
  },
  {
    grant_name: "Visa Everywhere Initiative",
    provider: "Visa",
    amount: "Up to $100,000",
    deadline: "Varies",
    link: "https://usa.visa.com/partner-with-us/innovation/visa-everywhere-initiative.html",
    use_case: "Global innovation program for payment and commerce challenges. Requires entity registration."
  },
  {
    grant_name: "SBIR/STTR Phase I",
    provider: "U.S. Government",
    amount: "$50K–$250K",
    deadline: "Rolling",
    link: "https://www.sbir.gov/",
    use_case: "Federal innovation grants for R&D in tech. U.S.-based companies with <500 employees."
  },
  {
    grant_name: "Canada Digital Adoption Program",
    provider: "Government of Canada",
    amount: "$15K + $100K loan",
    deadline: "Rolling",
    link: "https://ised-isde.canada.ca/site/canada-digital-adoption-program/en",
    use_case: "Funding for businesses adopting digital tools and services. Canadian SMEs only."
  }
]; 
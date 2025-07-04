export interface GrantInput {
  projectName: string;
  description: string;
  fundingAmount: string;
  targetAudience: string;
  impact: string;
}

export interface GrantOutput {
  proposal: string;
  sections: {
    executiveSummary: string;
    projectDescription: string;
    methodology: string;
    budget: string;
    timeline: string;
    impact: string;
  };
}

export async function generateGrantProposal(input: GrantInput): Promise<GrantOutput> {
  try {
    // For now, we'll generate a template-based proposal
    // In production, this would integrate with OpenAI or another AI service
    
    const proposal = generateTemplateProposal(input);
    const sections = parseProposalSections(proposal);

    return {
      proposal,
      sections,
    };
  } catch (error) {
    console.error('Error generating grant proposal:', error);
    throw error;
  }
}

function generateTemplateProposal(input: GrantInput): string {
  const { projectName, description, fundingAmount, targetAudience, impact } = input;
  
  return `# Grant Proposal: ${projectName}

## Executive Summary

${projectName} is an innovative project that addresses critical needs in the ${targetAudience} community. This proposal seeks ${fundingAmount} in funding to support the development and implementation of this transformative initiative.

## Project Description

${description}

Our project represents a significant advancement in the field, leveraging cutting-edge technology and best practices to deliver measurable impact.

## Methodology

Our approach combines proven methodologies with innovative strategies:

1. **Research & Development Phase**: Comprehensive market research and technical development
2. **Pilot Implementation**: Small-scale testing with target audience feedback
3. **Full Deployment**: Scaled implementation with continuous monitoring
4. **Evaluation & Optimization**: Ongoing assessment and improvement

## Budget Breakdown

Total Request: ${fundingAmount}

- **Development & Technology**: 40% - Core platform development and technical infrastructure
- **Marketing & Outreach**: 25% - User acquisition and community building
- **Operations & Support**: 20% - Ongoing maintenance and customer support
- **Evaluation & Reporting**: 10% - Impact measurement and reporting
- **Contingency**: 5% - Unforeseen expenses and opportunities

## Timeline

**Phase 1 (Months 1-3)**: Project setup and initial development
**Phase 2 (Months 4-6)**: Beta testing and user feedback integration
**Phase 3 (Months 7-9)**: Full launch and user acquisition
**Phase 4 (Months 10-12)**: Scale and optimization

## Expected Impact

${impact}

Our project will create lasting positive change in the community, with measurable outcomes including:

- Increased accessibility to critical services
- Enhanced user engagement and satisfaction
- Sustainable long-term impact
- Scalable model for future expansion

## Conclusion

${projectName} represents a unique opportunity to make a significant positive impact. With your support, we can transform this vision into reality and create lasting value for our target audience and the broader community.`;
}

function parseProposalSections(content: string) {
  const sections = {
    executiveSummary: '',
    projectDescription: '',
    methodology: '',
    budget: '',
    timeline: '',
    impact: '',
  };

  // Extract sections based on headers
  const sectionRegex = /## (Executive Summary|Project Description|Methodology|Budget Breakdown|Timeline|Expected Impact):\s*([\s\S]*?)(?=## |$)/g;
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const [_, section, content] = match;
    const sectionKey = section.toLowerCase().replace(/\s+/g, '').replace('breakdown', '') as keyof typeof sections;
    if (sectionKey in sections) {
      sections[sectionKey] = content.trim();
    }
  }

  return sections;
} 
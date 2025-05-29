import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GrantProposalInput {
  projectName: string;
  organizationType: 'nonprofit' | 'startup' | 'small business' | 'individual';
  mission: string;
  fundingNeeds: string;
  desiredImpact: string;
}

export async function generateGrantProposal(input: GrantProposalInput): Promise<string> {
  const prompt = `
You are an expert grant writer. Create a compelling grant proposal based on the following information:

Project Name: ${input.projectName}
Organization Type: ${input.organizationType}

Mission/Purpose:
${input.mission}

Funding Needs:
${input.fundingNeeds}

Desired Impact:
${input.desiredImpact}

Please write a professional grant proposal that:
1. Clearly articulates the project's goals and impact
2. Demonstrates strong alignment with potential funders' priorities
3. Includes specific, measurable outcomes
4. Maintains a professional yet engaging tone
5. Is structured with clear sections (Executive Summary, Project Description, Budget, etc.)

Format the response in markdown for easy reading and copying.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert grant writer with years of experience securing funding for various organizations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content || 'Failed to generate proposal';
  } catch (error) {
    console.error('Error generating proposal:', error);
    throw new Error('Failed to generate grant proposal');
  }
} 
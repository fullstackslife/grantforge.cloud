import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateGrantProposal(formData: {
  projectName: string;
  description: string;
  fundingAmount: string;
  targetAudience: string;
  impact: string;
}) {
  const prompt = `Write a professional grant proposal for the following project:

Project Name: ${formData.projectName}
Description: ${formData.description}
Funding Amount Needed: ${formData.fundingAmount}
Target Audience: ${formData.targetAudience}
Expected Impact: ${formData.impact}

Please structure the proposal with the following sections:
1. Executive Summary
2. Project Description
3. Funding Request
4. Target Audience
5. Expected Impact
6. Implementation Plan
7. Budget Breakdown
8. Timeline

Make it professional, compelling, and well-structured.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert grant writer with years of experience in writing successful proposals. Your writing is clear, professional, and compelling."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated from OpenAI');
    }

    return content;
  } catch (error) {
    console.error('Error generating proposal:', error);
    throw new Error('Failed to generate proposal. Please try again.');
  }
} 
import { NextResponse } from 'next/server';
import { generateGrantProposal } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const proposal = await generateGrantProposal(formData);
    return NextResponse.json({ proposal });
  } catch (error) {
    console.error('Error in generate API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    );
  }
} 
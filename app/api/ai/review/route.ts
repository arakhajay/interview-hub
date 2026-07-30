import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeWithAI } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { resumeText, targetRole } = await req.json();
    if (!resumeText) {
      return NextResponse.json({ error: 'Missing resumeText' }, { status: 400 });
    }

    const review = await analyzeResumeWithAI(resumeText, targetRole);
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
  }
}

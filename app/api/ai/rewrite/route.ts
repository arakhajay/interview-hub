import { NextRequest, NextResponse } from 'next/server';
import { rewriteBulletWithAI } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { bullet, method } = await req.json();
    if (!bullet) {
      return NextResponse.json({ error: 'Missing bullet string' }, { status: 400 });
    }

    const rewritten = await rewriteBulletWithAI(bullet, method || 'STAR');
    return NextResponse.json({ rewritten });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to rewrite bullet' }, { status: 500 });
  }
}

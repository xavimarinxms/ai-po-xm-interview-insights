import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { InterviewInput, InterviewInsights } from '@/types';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const input: InterviewInput = await req.json();

  const prompt = `You are an expert UX researcher and Product Manager analyzing a user interview transcript.

Context: ${input.context || 'User research interview'}
Persona: ${input.persona || 'Not specified'}

Transcript:
"""
${input.transcript}
"""

Extract structured insights from this interview. Return ONLY a valid JSON object (no markdown, no extra text):
{
  "summary": "2-3 sentence executive summary of the interview",
  "jtbds": [
    { "text": "Job-to-be-done statement in format: When [situation], I want to [motivation], so I can [outcome]", "quote": "relevant direct quote from transcript if available" }
  ],
  "painPoints": [
    { "text": "Clear pain point description", "quote": "relevant direct quote if available" }
  ],
  "opportunities": [
    { "text": "Product opportunity derived from pain points and JTBDs" }
  ],
  "quotes": ["Most impactful verbatim quote 1", "Most impactful verbatim quote 2", "Most impactful verbatim quote 3"],
  "sentiment": "positive | neutral | negative | mixed",
  "sentimentNote": "One sentence explaining the overall sentiment"
}

Rules:
- Extract 2-4 JTBDs, 3-5 pain points, 3-4 opportunities, 3 quotes
- Quotes must be verbatim from the transcript
- Opportunities should be actionable product insights, not generic statements
- Be specific — avoid generic statements like "improve UX"`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found');
    const insights: InterviewInsights = JSON.parse(jsonMatch[0]);
    return NextResponse.json(insights);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}

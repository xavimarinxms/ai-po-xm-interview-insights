import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { InterviewInput, InterviewInsights } from '@/types';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Llama sometimes returns raw, unescaped control characters (literal
 * newlines, tabs) inside JSON string values instead of \n / \t. That's
 * invalid JSON and makes JSON.parse throw "Bad control character in
 * string literal". This escapes control characters that appear *inside*
 * string literals only, leaving the JSON structure (outside strings)
 * untouched.
 */
function safeJsonParse<T>(text: string): T {
  let inString = false;
  let escaped = false;
  let result = '';
  for (const ch of text) {
    if (inString) {
      if (escaped) {
        result += ch;
        escaped = false;
      } else if (ch === '\\') {
        result += ch;
        escaped = true;
      } else if (ch === '"') {
        result += ch;
        inString = false;
      } else if (ch === '\n') {
        result += '\\n';
      } else if (ch === '\r') {
        result += '\\r';
      } else if (ch === '\t') {
        result += '\\t';
      } else if (ch.charCodeAt(0) < 0x20) {
        // Drop other stray control characters.
      } else {
        result += ch;
      }
    } else {
      result += ch;
      if (ch === '"') inString = true;
    }
  }
  return JSON.parse(result) as T;
}

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
      model: 'openai/gpt-oss-120b',
      temperature: 0.2,
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found');
    const insights = safeJsonParse<InterviewInsights>(jsonMatch[0]);
    return NextResponse.json(insights);
  } catch (err) {
    console.error(err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Analysis failed', detail }, { status: 500 });
  }
}

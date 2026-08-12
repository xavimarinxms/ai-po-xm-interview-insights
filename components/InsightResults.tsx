'use client';

import { InterviewInsights } from '@/types';

const SENTIMENT_COLORS: Record<string, string> = {
  positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  negative: 'bg-red-50 text-red-700 border-red-200',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
  mixed: 'bg-amber-50 text-amber-700 border-amber-200',
};

interface Props { insights: InterviewInsights; }

export default function InsightResults({ insights }: Props) {
  const copyAll = () => {
    const text = [
      `SUMMARY\n${insights.summary}`,
      `JOBS-TO-BE-DONE\n${insights.jtbds.map(j => `• ${j.text}${j.quote ? `\n  "${j.quote}"` : ''}`).join('\n')}`,
      `PAIN POINTS\n${insights.painPoints.map(p => `• ${p.text}${p.quote ? `\n  "${p.quote}"` : ''}`).join('\n')}`,
      `OPPORTUNITIES\n${insights.opportunities.map(o => `• ${o.text}`).join('\n')}`,
      `KEY QUOTES\n${insights.quotes.map(q => `"${q}"`).join('\n')}`,
    ].join('\n\n');
    navigator.clipboard?.writeText(text).catch(() => {
      /* Clipboard API blocked (e.g. embedded iframe without permission) — fail silently. */
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Interview insights</h2>
          <div className="flex items-center gap-2" data-tour="export">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${SENTIMENT_COLORS[insights.sentiment]}`}>
              {insights.sentiment}
            </span>
            <button onClick={copyAll} className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">
              Copy all
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{insights.summary}</p>
        <p className="text-xs text-gray-400 mt-2">{insights.sentimentNote}</p>
      </div>

      {/* JTBDs */}
      <Section title="Jobs to be done" color="text-brand-600">
        {insights.jtbds.map((j, i) => (
          <InsightCard key={i} text={j.text} quote={j.quote} />
        ))}
      </Section>

      {/* Pain points */}
      <Section title="Pain points" color="text-red-600">
        {insights.painPoints.map((p, i) => (
          <InsightCard key={i} text={p.text} quote={p.quote} accent="red" />
        ))}
      </Section>

      {/* Opportunities */}
      <Section title="Opportunities" color="text-emerald-600">
        {insights.opportunities.map((o, i) => (
          <InsightCard key={i} text={o.text} accent="green" />
        ))}
      </Section>

      {/* Key quotes */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Key quotes</h3>
        <div className="flex flex-col gap-3">
          {insights.quotes.map((q, i) => (
            <blockquote key={i} className="border-l-2 border-brand-300 pl-4 text-sm text-gray-700 italic leading-relaxed">
              "{q}"
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${color}`}>{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function InsightCard({ text, quote, accent }: { text: string; quote?: string; accent?: string }) {
  const dotColor = accent === 'red' ? 'bg-red-400' : accent === 'green' ? 'bg-emerald-400' : 'bg-brand-400';
  return (
    <div className="flex gap-3">
      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      <div>
        <p className="text-sm text-gray-800 leading-relaxed">{text}</p>
        {quote && <p className="text-xs text-gray-400 italic mt-1">"{quote}"</p>}
      </div>
    </div>
  );
}

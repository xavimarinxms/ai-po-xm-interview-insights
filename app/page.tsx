import Link from 'next/link';

const HOW_IT_WORKS = [
  { step: '01', title: 'Paste your transcript', desc: 'Copy your interview transcript from Otter, Notion, or any tool and paste it in. No special format needed.' },
  { step: '02', title: 'AI extracts the insights', desc: 'Groq (GPT-OSS 120B) reads the transcript and identifies JTBDs, pain points, opportunities, and key quotes.' },
  { step: '03', title: 'Copy and use in your PRD', desc: 'Copy insights as structured text and paste directly into your PRD, Confluence page, or research repository.' },
];

const ROADMAP: { category: string; items: { label: string; desc: string; status: 'planned' | 'considering' }[] }[] = [
  {
    category: 'Input methods',
    items: [
      { label: 'Audio file upload', desc: 'Upload an .mp3 or .m4a interview recording and get it transcribed + analyzed automatically.', status: 'planned' },
      { label: 'Otter / Fireflies import', desc: 'Connect your Otter or Fireflies account and import transcripts directly.', status: 'considering' },
      { label: 'Batch processing', desc: 'Analyze multiple interview transcripts at once and get aggregated insights across all of them.', status: 'planned' },
    ],
  },
  {
    category: 'Insight quality',
    items: [
      { label: 'Confidence scoring', desc: 'Each insight gets a confidence score based on how many times the theme appears in the transcript.', status: 'planned' },
      { label: 'Cross-interview patterns', desc: 'Upload multiple transcripts and see which pain points and JTBDs appear most frequently across all interviews.', status: 'planned' },
      { label: 'Assumption tagging', desc: 'Flag insights that need validation — i.e. where the user assumed rather than experienced something.', status: 'considering' },
    ],
  },
  {
    category: 'Export & sharing',
    items: [
      { label: 'Notion push', desc: 'Push structured insights directly to a Notion database with one click.', status: 'planned' },
      { label: 'Dovetail export', desc: 'Export insights in Dovetail-compatible format for research repositories.', status: 'considering' },
      { label: 'PDF research brief', desc: 'Generate a formatted research brief PDF from the extracted insights.', status: 'planned' },
    ],
  },
];

const STATUS_BADGE: Record<string, string> = {
  planned: 'bg-blue-50 text-blue-700 border-blue-200',
  considering: 'bg-gray-100 text-gray-600 border-gray-200',
};
const STATUS_LABEL: Record<string, string> = { planned: 'Planned', considering: 'Considering' };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zM1 8a7 7 0 1114 0A7 7 0 011 8z" fill="white"/><path d="M8 5v3l2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">Interview Insights</span>
              <span className="hidden sm:inline text-xs text-gray-500 ml-2">by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Xavi Marín</a></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#roadmap" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">Roadmap</a>
            <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">xavimarin.net</a>
            <a href="https://ai-po-xavi-marin-suite.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">← AI PO Suite</a>
            <Link href="/demo" className="text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg px-3.5 py-1.5 transition-colors">Try Demo</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 pt-24 pb-24 text-center">
          <p className="text-xs font-semibold text-brand-600 mb-5 tracking-widest uppercase">PO Toolkit · Tool #1 of 12</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
            From transcript<br />to insights in seconds
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Paste a user interview transcript and get structured jobs-to-be-done, pain points, opportunities, and key quotes — extracted by AI, ready for your PRD.
          </p>
          {/* Output preview — what you get */}
          <div className="text-left bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10 max-w-xl mx-auto">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sample output</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-1">Jobs to be done</p>
                <p className="text-xs text-gray-700 bg-white border border-gray-100 rounded-lg px-3 py-2">"When I get a new expense report, I want to approve it from my phone so I don't have to be at my desk."</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">Pain points</p>
                <p className="text-xs text-gray-700 bg-white border border-gray-100 rounded-lg px-3 py-2">The approval flow requires 4 clicks and a desktop login — users abandon on mobile mid-flow.</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Opportunities</p>
                <p className="text-xs text-gray-700 bg-white border border-gray-100 rounded-lg px-3 py-2">Push notification + one-tap approval could reduce time-to-approve from 48h to &lt;5 min.</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">+ key quotes extracted · 2h of analysis → 10 seconds</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors shadow-sm">
              ✨ Try with sample data
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M1 8a.75.75 0 01.75-.75h10.69L8.22 3.03a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l4.22-4.22H1.75A.75.75 0 011 8z"/></svg>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">Paste your transcript</Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">No login required · Transcripts never stored · Free forever</p>
        </section>

        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12"><h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2><p className="text-sm text-gray-500">UX research synthesis in three steps</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOW_IT_WORKS.map(item => (
                <div key={item.step} className="bg-white rounded-xl border border-gray-200 p-6">
                  <span className="text-xs font-bold text-brand-500 font-mono">{item.step}</span>
                  <h3 className="text-sm font-semibold text-gray-900 mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Roadmap</h2>
              <p className="text-sm text-gray-500">What's coming next to this tool</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE.planned}`}><span className="w-1.5 h-1.5 rounded-full bg-blue-500"/>Planned</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE.considering}`}><span className="w-1.5 h-1.5 rounded-full bg-gray-400"/>Considering</span>
              </div>
            </div>
            <div className="space-y-10">
              {ROADMAP.map(group => (
                <div key={group.category}>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{group.category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.items.map(item => (
                      <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_BADGE[item.status]}`}>{STATUS_LABEL[item.status]}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">Why I built this</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Problem', text: 'Synthesizing a 45-min interview transcript into structured insights takes 1–2 hours of reading and tagging. Most teams skip it.' },
                { label: 'Solution', text: 'Paste the transcript and AI extracts JTBDs, pain points, opportunities, and key quotes in under 10 seconds.' },
                { label: 'Impact', text: 'Interview synthesis drops from 2 hours to 10 seconds. More interviews analyzed, better product decisions.' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">{item.label}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>Built by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Xavi Marín</a> · Transcripts are never stored</span>
          <span>PO Toolkit #1 of 12</span>
        </div>
      </footer>
    </div>
  );
}

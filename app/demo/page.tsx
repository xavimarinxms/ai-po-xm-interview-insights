'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import InsightResults from '@/components/InsightResults';
import { InterviewInput, InterviewInsights } from '@/types';
import { SAMPLE_INPUT } from '@/lib/sampleData';

const EMPTY: InterviewInput = { transcript: '', context: '', persona: '' };

export default function DemoPage() {
  return (
    <Suspense fallback={null}>
      <DemoPageInner />
    </Suspense>
  );
}

function DemoPageInner() {
  const embed = useSearchParams().get('embed') === '1';
  const [input, setInput] = useState<InterviewInput>(EMPTY);
  const [insights, setInsights] = useState<InterviewInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof InterviewInput>(k: K, v: string) => setInput(prev => ({ ...prev, [k]: v }));

  const analyze = async () => {
    setLoading(true); setError(''); setInsights(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error();
      setInsights(await res.json());
    } catch { setError('Analysis failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!embed && <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zM1 8a7 7 0 1114 0A7 7 0 011 8z" fill="white"/><path d="M8 5v3l2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">Interview Insights</span>
            <span className="hidden sm:inline text-xs text-gray-500">by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Xavi Marín</a></span>
          </div>
          <Link href="/" className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">← Home</Link>
        </div>
      </nav>}

      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2.5 text-center text-xs text-blue-700 font-medium">
        Demo mode — no login required · No transcripts stored · Powered by Groq (Llama 3.3, free tier)
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Interview Insights Extractor</h1>
          <p className="text-sm text-gray-500">Paste your interview transcript and get structured insights in seconds.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Interview transcript</h2>
                <button onClick={() => setInput(SAMPLE_INPUT)}
                  className="text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-300 rounded-lg px-3 py-1.5 transition-colors">
                  ✨ Sample data
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">User persona <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="text" value={input.persona} onChange={e => set('persona', e.target.value)}
                  placeholder="e.g. Finance Manager, SMB"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Research context <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="text" value={input.context} onChange={e => set('context', e.target.value)}
                  placeholder="e.g. Onboarding discovery — NovaPay"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Transcript <span className="text-red-500">*</span></label>
                <textarea value={input.transcript} onChange={e => set('transcript', e.target.value)}
                  placeholder="Paste your interview transcript here…" rows={14}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none font-mono" />
                <p className="text-xs text-gray-400 mt-1">{input.transcript.length} chars · ~{Math.ceil(input.transcript.split(' ').length / 130)} min read</p>
              </div>

              <button onClick={analyze} disabled={loading || input.transcript.length < 100}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl py-3 px-6 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Analyzing…</>
                ) : '✦ Extract insights'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-4">{error}</div>}
            {!insights && !loading && (
              <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center h-48 flex flex-col items-center justify-center">
                <p className="text-sm text-gray-400">Insights will appear here</p>
                <p className="text-xs text-gray-300 mt-1">Paste a transcript and click Extract</p>
              </div>
            )}
            {loading && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <svg className="animate-spin w-6 h-6 text-brand-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                <p className="text-sm text-gray-500">Reading the transcript…</p>
                <p className="text-xs text-gray-400 mt-1">Usually takes 5–8 seconds</p>
              </div>
            )}
            {insights && <InsightResults insights={insights} />}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>Built by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Xavi Marín</a> · Transcripts are never stored</span>
          <span>PO Toolkit #8 of 9</span>
        </div>
      </footer>
    </div>
  );
}

export interface InterviewInput {
  transcript: string;
  context: string;
  persona: string;
}

export interface InsightItem {
  text: string;
  quote?: string;
}

export interface InterviewInsights {
  summary: string;
  jtbds: InsightItem[];
  painPoints: InsightItem[];
  opportunities: InsightItem[];
  quotes: string[];
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
  sentimentNote: string;
}

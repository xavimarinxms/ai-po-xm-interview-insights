# Interview Insights Extractor — by Xavi Marín

Part of the [PO Toolkit](https://xavimarin.net) · Tool #8 of 9

Paste a user interview transcript and get structured insights: jobs-to-be-done, pain points, opportunities, and key quotes — extracted by AI (Groq / Llama 3.3).

## Setup

```bash
npm install
cp .env.example .env.local
# Add your GROQ_API_KEY
npm run dev
```

## Deploy to Vercel

```bash
npx vercel deploy
```

Add `GROQ_API_KEY` in Vercel → Project Settings → Environment Variables.

## Tech stack

Next.js 14 · TypeScript · Tailwind CSS · Groq (Llama 3.3) · Vercel

## License

MIT © [Xavi Marín](https://xavimarin.net)

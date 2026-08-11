import { InterviewInput } from '@/types';

export const SAMPLE_INPUT: InterviewInput = {
  persona: 'Finance Manager, SMB (20 employees)',
  context: 'User onboarding research for NovaPay — B2B payments platform. This is a 30-min discovery interview conducted via Zoom.',
  transcript: `Interviewer: Thanks for joining us, María. Can you walk me through how you currently handle payments for your business?

María: Sure. We use three different tools right now — one for payroll, one for supplier invoices, and a spreadsheet for tracking everything. It's a mess honestly. Every month I spend a whole day reconciling everything.

Interviewer: A whole day? Can you tell me more about what that process looks like?

María: Yeah, it's painful. I have to export from each platform, put it all in a spreadsheet, check for duplicates, and then manually enter totals into our accounting system. And if I make a mistake, the auditors flag it. Last quarter we had a €2,000 discrepancy because of a double payment I didn't catch.

Interviewer: How did that feel?

María: Honestly, stressful. I'm the only person who manages this. If I get sick or go on holiday, nobody else knows how it works. We don't even have documentation.

Interviewer: What would make your life easier here?

María: If I could see everything in one place and the system just... caught the duplicates for me. I don't want to think about it. I want to open one screen, see all payments, and know everything is correct.

Interviewer: Have you looked at other tools?

María: We tried one last year. The problem was the setup took three weeks and IT had to be involved every step. I gave up. I just want something I can set up myself in an afternoon.

Interviewer: What about the rest of your team?

María: My manager wants a summary every month — how much we spent, on what. Right now I build that manually. It takes four hours. If the tool could generate that automatically, I'd upgrade immediately.

Interviewer: Anything else?

María: Security. I'm nervous about entering bank details in a new platform. I need to know it's safe and I need to see that certification or whatever clearly on the website. If I can't find it easily, I won't trust it.`,
};

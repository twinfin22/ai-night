declare const process: {
  env: Record<string, string | undefined>;
};

type ContactPayload = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  pain?: unknown;
  question?: unknown;
  context?: unknown;
  requestId?: unknown;
};

type TutorialContext = {
  day?: unknown;
  stepId?: unknown;
  stepTitle?: unknown;
  app?: unknown;
  os?: unknown;
  branch?: unknown;
  version?: unknown;
};

const RESEND_API_URL = 'https://api.resend.com/emails';
const DEFAULT_FROM = 'AI 야학 <hello@ai-night.study>';
const DEFAULT_TO = 'hello@ai-night.study';
const REQUEST_TIMEOUT_MS = 10_000;
const UNSELECTED = '미선택';

const cleanText = (value: unknown, maxLength = 1000) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const requiredText = (value: unknown, maxLength: number) => {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  return cleaned && cleaned.length <= maxLength ? cleaned : null;
};

const optionalText = (value: unknown, maxLength: number) => {
  if (value === undefined || value === null || value === '') return UNSELECTED;
  return requiredText(value, maxLength);
};

const tutorialSelection = (value: unknown, values: readonly string[]) => {
  if (value === undefined || value === null || value === '') return UNSELECTED;
  return typeof value === 'string' && values.includes(value) ? value : null;
};

const sendWithTimeout = async (payload: Record<string, unknown>, headers: Record<string, string>) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(RESEND_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const sendTutorialContact = async (
  body: ContactPayload,
  resendApiKey: string,
  response: any,
) => {
  const email = requiredText(body.email, 254);
  const question = requiredText(body.question, 2000);
  const context = (body.context && typeof body.context === 'object' && !Array.isArray(body.context)
    ? body.context
    : {}) as TutorialContext;
  const day = typeof context.day === 'number' ? context.day : Number.NaN;
  const stepId = requiredText(context.stepId, 120);
  const stepTitle = requiredText(context.stepTitle, 200);
  const app = tutorialSelection(context.app, ['codex', 'claude']);
  const os = tutorialSelection(context.os, ['macos', 'windows']);
  const branch = optionalText(context.branch, 200);
  const version = optionalText(context.version, 100);
  const requestId = requiredText(body.requestId, 256);

  if (!email || !isValidEmail(email)) {
    return response.status(400).json({ error: 'Valid email is required.' });
  }
  if (!question) {
    return response.status(400).json({ error: 'A question up to 2,000 characters is required.' });
  }
  if (!Number.isInteger(day) || day < 1 || day > 20) {
    return response.status(400).json({ error: 'A tutorial day from 1 to 20 is required.' });
  }
  if (!stepId || !/^[a-z0-9][a-z0-9-]*$/i.test(stepId) || !stepTitle || /[\r\n]/.test(stepTitle)) {
    return response.status(400).json({ error: 'Valid tutorial step context is required.' });
  }
  if (!app || !os || !branch || !version) {
    return response.status(400).json({ error: 'Valid tutorial context is required.' });
  }
  if (!requestId || /[\r\n]/.test(requestId)) {
    return response.status(400).json({ error: 'A request identifier is required.' });
  }

  const appLabel = app === 'codex' ? 'Codex' : app === 'claude' ? 'Claude' : UNSELECTED;
  const osLabel = os === 'macos' ? 'macOS' : os === 'windows' ? 'Windows' : UNSELECTED;
  const text = [
    'AI 야학 튜토리얼 문의가 도착했습니다.',
    '',
    `답변받을 이메일: ${email}`,
    '',
    '수업 문맥:',
    `Day: ${day}`,
    `단계 ID: ${stepId}`,
    `단계 제목: ${stepTitle}`,
    `선택 앱: ${appLabel}`,
    `OS: ${osLabel}`,
    `실습 분기: ${branch}`,
    `교재 버전: ${version}`,
    '',
    '질문:',
    question,
  ].join('\n');

  try {
    const resendResponse = await sendWithTimeout({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM,
      // Tutorial support always routes to this address. Do not accept a client recipient.
      to: [DEFAULT_TO],
      reply_to: email,
      subject: `[AI 야학 튜토리얼] Day ${day} · ${stepTitle}`,
      text,
    }, {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
      // Resend accepts this header on POST /emails and deduplicates matching keys for 24 hours.
      'Idempotency-Key': requestId,
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text().catch(() => '');
      console.error('Resend tutorial contact failed:', resendResponse.status, errorText);
      return response.status(502).json({ error: 'Email delivery failed.' });
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return response.status(504).json({ error: 'Email service timed out.' });
    }
    console.error('Resend tutorial contact request failed:', error);
    return response.status(502).json({ error: 'Email delivery failed.' });
  }

  return response.status(200).json({ ok: true });
};

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return response.status(500).json({ error: 'Resend API key is not configured.' });
  }

  const body = (request.body ?? {}) as ContactPayload;
  if (body.type === 'tutorial') {
    return sendTutorialContact(body, resendApiKey, response);
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254);
  const pain = cleanText(body.pain, 2000);

  if (!email || !isValidEmail(email)) {
    return response.status(400).json({ error: 'Valid email is required.' });
  }

  const from = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;
  const to = process.env.CONTACT_EMAIL || DEFAULT_TO;
  const subject = `[AI 야학] 맞춤 교육 문의${name ? ` - ${name}` : ''}`;
  const text = [
    'AI 야학 사이트 문의가 도착했습니다.',
    '',
    `이름: ${name || '-'}`,
    `이메일: ${email}`,
    '',
    '메모:',
    pain || '-',
  ].join('\n');

  let resendResponse: Response;
  try {
    resendResponse = await sendWithTimeout({
      from,
      to: [to],
      reply_to: email,
      subject,
      text,
    }, {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return response.status(504).json({ error: 'Email service timed out.' });
    }
    console.error('Resend email request failed:', error);
    return response.status(502).json({ error: 'Email delivery failed.' });
  }

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text().catch(() => '');
    console.error('Resend email failed:', resendResponse.status, errorText);
    return response.status(502).json({ error: 'Email delivery failed.' });
  }

  return response.status(200).json({ ok: true });
}

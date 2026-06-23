declare const process: {
  env: Record<string, string | undefined>;
};

type OutreachPayload = {
  to?: unknown;
  subject?: unknown;
  text?: unknown;
  scheduledAt?: unknown;
  idempotencyKey?: unknown;
};

const RESEND_API_URL = 'https://api.resend.com/emails';
const FROM_ADDRESS = 'AI 야학 <hello@ai-night.study>';
const REPLY_TO = 'hello@ai-night.study';

const cleanText = (value: unknown, maxLength = 3000) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const sendToken = process.env.OUTREACH_SEND_TOKEN;
  const authorization = request.headers.authorization || request.headers.Authorization;
  if (!sendToken || authorization !== `Bearer ${sendToken}`) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return response.status(500).json({ error: 'Resend API key is not configured.' });
  }

  const body = (request.body ?? {}) as OutreachPayload;
  const to = cleanText(body.to, 254);
  const subject = cleanText(body.subject, 200);
  const text = cleanText(body.text, 5000);
  const scheduledAt = cleanText(body.scheduledAt, 120);
  const idempotencyKey = cleanText(body.idempotencyKey, 256);

  if (!to || !isValidEmail(to)) {
    return response.status(400).json({ error: 'Valid recipient email is required.' });
  }

  if (!subject || !text) {
    return response.status(400).json({ error: 'Subject and text are required.' });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${resendApiKey}`,
    'Content-Type': 'application/json',
  };
  if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;

  const payload: Record<string, unknown> = {
    from: FROM_ADDRESS,
    to: [to],
    subject,
    text,
    reply_to: REPLY_TO,
  };
  if (scheduledAt) payload.scheduled_at = scheduledAt;

  const resendResponse = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const result = await resendResponse.json().catch(async () => ({
    raw: await resendResponse.text().catch(() => ''),
  }));

  if (!resendResponse.ok) {
    console.error('Resend outreach failed:', resendResponse.status, result);
    return response.status(502).json({ error: 'Email delivery failed.', details: result });
  }

  return response.status(200).json({ ok: true, id: result.id, scheduledAt: scheduledAt || null });
}

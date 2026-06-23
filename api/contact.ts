declare const process: {
  env: Record<string, string | undefined>;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  pain?: unknown;
};

const RESEND_API_URL = 'https://api.resend.com/emails';
const DEFAULT_FROM = 'AI 야학 <hello@ai-night.study>';
const DEFAULT_TO = 'hello@ai-night.study';

const cleanText = (value: unknown, maxLength = 1000) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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

  const resendResponse = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text().catch(() => '');
    console.error('Resend email failed:', resendResponse.status, errorText);
    return response.status(502).json({ error: 'Email delivery failed.' });
  }

  return response.status(200).json({ ok: true });
}

# ai-evening

## Resend contact email

The site contact form sends through the Vercel serverless function at `/api/contact`.

Required production env:

- `RESEND_API_KEY`: Resend API key with permission to send email.

Optional production env:

- `RESEND_FROM_EMAIL`: defaults to `AI 야학 <hello@ai-night.study>`.
- `CONTACT_EMAIL`: defaults to `hello@ai-night.study`.

Resend must have `ai-night.study` verified before `hello@ai-night.study` can be used as the sender. Add the DNS records Resend gives for the domain, then set the env vars in Vercel and redeploy.

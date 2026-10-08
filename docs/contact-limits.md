# Public contact admission

Both ordinary and tutorial `/api/contact` submissions validate their existing
payloads before reserving one provider attempt. A single Redis Lua `EVAL` checks
all rolling budgets and then reserves all three together. No in-memory fallback
can permit sends. Redis server time determines the windows.

| Budget | Default | Rolling window | Optional environment override |
| --- | --- | --- | --- |
| IP | 5 attempts | 10 minutes | `CONTACT_LIMIT_IP` |
| Reply email | 3 attempts | 1 hour | `CONTACT_LIMIT_EMAIL` |
| All public contact | 50 attempts | 24 hours | `CONTACT_LIMIT_GLOBAL` |

An accepted attempt remains charged even when the provider fails, times out, or
deduplicates delivery. Each attempt uses a new server UUID, independent of any
client tutorial `requestId`. Resend still receives that original requestId as its
`Idempotency-Key`. Changing requestIds, switching form type, or deploying another
production build cannot reset the shared budgets. Rejected submissions reserve
no new capacity. When several budgets are exhausted, `Retry-After` is the latest
time required by all exhausted budgets; subsequent traffic may extend that wait.

## Configuration before rollout

No service was provisioned and no deployment configuration was changed by this
patch. Configure these server-only variables after separate approval:

| Variable | Requirement |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | HTTPS database root URL on `*.upstash.io`; no path, credentials, query, or custom port |
| `UPSTASH_REDIS_REST_TOKEN` | Redis write-capable REST token permitting `EVAL` and its script commands; never use a public frontend variable |
| `CONTACT_LIMIT_HASH_SECRET` | High-entropy secret of at least 32 characters; store only in server environment |
| `CONTACT_LIMIT_NAMESPACE` | Stable application name, 1–80 letters, digits, underscores or hyphens; identical for every production deployment |
| `CONTACT_LIMIT_IP`, `CONTACT_LIMIT_EMAIL`, `CONTACT_LIMIT_GLOBAL` | Optional positive integers up to 1,000,000; omitted values use the defaults above |

The runtime also requires Vercel-provided `VERCEL=1` and `VERCEL_ENV`.
Production uses `contact:<namespace>:production` for every deployment.
Preview requires Vercel-provided `VERCEL_URL` and uses
`contact:<namespace>:preview:<deployment-url>`, isolating each preview from
production and other previews. The environment scope comes from server
configuration, never a request header. Local development intentionally fails
closed; browser tests mock the API and local Redis tests use synthetic variables.

Keep the production database, namespace and hashing secret stable. Changing them
resets some or all counters. Secret rotation requires a coordinated rollout with
public sends blocked or a migration strategy that preserves the existing budget.
For an Upstash global database, use one write-authoritative REST endpoint across
production instances; do not use read replicas to perform admission. If keys can
be evicted, deleted, or lost, historical attempts cannot be counted. Configure
durable storage/no eviction and restrict administrative access before release.

The 50/day default is a proposed conservative budget, not a measured traffic or
Resend allowance. Confirm it against the account's actual allowance and leave
headroom for `api/outreach.ts`, which is outside these public-contact counters.

## Trusted ingress and identity

The helper accepts only the single IP in `x-vercel-forwarded-for`, under a Vercel
runtime. It refuses missing, malformed, array or multi-address values. Client
`x-forwarded-for`, `x-real-ip`, body IPs, and requestIds are never identities.
Vercel documents that it overwrites incoming `x-forwarded-for` to prevent
spoofing, and that `x-vercel-forwarded-for` avoids a proxy overwriting that header.
Actual ingress behavior for this application remains to be verified in preview.
With a proxy in front of Vercel, the observed IP may be the proxy, so unrelated
clients can share an IP budget. IPv6 privacy addresses can change; the email and
aggregate budgets continue to apply.

IPs are canonicalized, including IPv4-mapped IPv6 aliases. Reply emails are
trimmed, NFC-normalized and lowercased for the budget identity; the validated
original reply address remains in the provider payload. This intentionally shares
an email budget across case variations. Provider-specific aliases such as plus
addressing are not collapsed. Redis keys contain HMAC-SHA256 values for IP/email,
not their raw values. Reserved entries hold timestamps and random attempt IDs,
expire after their rolling window, and contain no inquiry text. HMAC keys still
represent pseudonymous identifiers, so restrict database access. Application logs
record generic admission failures and provider status codes, with no request
contents, raw IP/email, provider response bodies, or credential values.

## Failure behavior and checks

Exhausted capacity returns HTTP 429 with integer-seconds `Retry-After` and
`Cache-Control: no-store`. Invalid/missing configuration, Redis errors, malformed
results and a two-second datastore timeout return HTTP 503 before the email
provider is called. Redis ambiguity may consume a slot without sending an email;
that conservative behavior protects the budget. Existing provider error status
codes and success payloads remain. Both forms retain entered values after 429/503,
show retry guidance, and offer `mailto:hello@ai-night.study`.

Focused checks:

```sh
npx vitest run tests/unit/contact-api.test.ts tests/unit/contact-redis.test.ts
npx playwright test tests/e2e/contact-limits.spec.ts
```

The Redis suite starts an isolated local server on a private Unix socket, with
TCP, persistence and external services disabled. It checks concurrent enforcement
of every dimension, reservation atomicity, window expiry, and both API branches
sharing a budget even when provider sends fail. It skips explicitly if Redis
binaries are unavailable; provide `REDIS_SERVER_BIN` and `REDIS_CLI_BIN` or put
locally compiled Redis binaries on PATH to execute those checks. REST unit mocks
and browser mocks verify application contracts but do not prove managed-service
or Vercel ingress behavior.

Before production approval, test a configured preview function with controlled
provider behavior: assert ordinary/tutorial success, concurrent exhaustion,
requestId changes and retries, Redis outage, spoofed client IP headers, and
preview/production isolation. Verify the helper is bundled only as an import
(it lives outside `api/`) and creates no public helper endpoint. Observe only
status/count summaries; do not log inquiry content or raw identities. No preview
or production release is established by local checks. On rollback, keep public
sends blocked rather than restoring delivery without admission.

References checked for this implementation:
[Upstash REST API](https://upstash.com/docs/redis/features/restapi),
[Vercel request headers](https://vercel.com/docs/headers/request-headers).

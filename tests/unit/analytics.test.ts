import { describe, expect, it } from 'vitest';
import { isValidGa4Id } from '../../src/lib/analytics';

describe('GA4 ID validation', () => {
  it('accepts only usable GA4 measurement IDs', () => {
    expect(isValidGa4Id('G-ABC1234')).toBe(true);
    expect(isValidGa4Id(' G-ABC1234 ')).toBe(true);
  });

  it.each([undefined, '', 'G-XXXXXXXXXX', 'G-PLACEHOLDER', 'UA-123', 'G-', 'not-an-id'])('does not enable analytics for %j', (id) => {
    expect(isValidGa4Id(id)).toBe(false);
  });
});

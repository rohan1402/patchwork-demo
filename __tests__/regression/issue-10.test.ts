import { parseAuthHeader } from '../lib/auth'

describe('Regression: test bug', () => {
  it('should parse Bearer token regardless of case', () => {
    // The bug is likely that the scheme check is case-sensitive (e.g., `header.startsWith('Bearer ')`)
    // whereas the RFC specifies the scheme is case-insensitive.
    expect(parseAuthHeader('bearer abc123')).toBe('abc123')
  })
})

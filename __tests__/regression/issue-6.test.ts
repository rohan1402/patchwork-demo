import { validateEmail } from '../lib/auth';

describe('Email Validation', () => {
  it('should reject an email that is missing a top-level domain', () => {
    // This test reproduces the bug where an email like "user@domain" is incorrectly accepted.
    // We expect the validation to fail because a TLD (.com, .org, etc.) is missing.
    const result = validateEmail('user@domain');
    expect(result.valid).toBe(false);
  });

  it('should accept a valid email address', () => {
    // Sanity check to ensure the validator still passes valid emails.
    const result = validateEmail('user@domain.com');
    expect(result.valid).toBe(true);
  });
});

import crypto from 'crypto'

// BUG: regex doesn't require a TLD — "user@domain" passes validation
// Should be /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+$/
  return emailRegex.test(email)
}

// BUG: doesn't guard against null userId — produces tokens like "null-token-abc123"
// Should throw or return null when userId is null/undefined
export function generateToken(userId: string): string {
  const random = crypto.randomBytes(16).toString('hex')
  return `${userId}-token-${random}`
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export function validatePassword(password: string): { valid: boolean; reason?: string } {
  if (password.length < 8) {
    return { valid: false, reason: 'Password must be at least 8 characters' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one uppercase letter' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one number' }
  }
  return { valid: true }
}

export function parseAuthHeader(header: string): string | null {
  if (!header.startsWith('Bearer ')) return null
  return header.slice(7)
}

import { formatPrice, getItemCount } from '../lib/cart'
import { hashPassword, validatePassword, parseAuthHeader } from '../lib/auth'
import { calculateOrderTotal } from '../lib/orders'

describe('cart utilities', () => {
  it('formats a price as USD currency', () => {
    expect(formatPrice(19.99)).toBe('$19.99')
    expect(formatPrice(0)).toBe('$0.00')
    expect(formatPrice(1000)).toBe('$1,000.00')
  })

  it('counts total item quantity across cart', () => {
    const items = [
      { id: '1', name: 'Widget', price: 10, quantity: 2 },
      { id: '2', name: 'Gadget', price: 20, quantity: 3 },
    ]
    expect(getItemCount(items)).toBe(5)
  })

  it('returns 0 for an empty cart', () => {
    expect(getItemCount([])).toBe(0)
  })
})

describe('auth utilities', () => {
  it('hashes a password deterministically', () => {
    expect(hashPassword('secret')).toBe(hashPassword('secret'))
    expect(hashPassword('secret')).not.toBe(hashPassword('other'))
  })

  it('validates password strength', () => {
    expect(validatePassword('short').valid).toBe(false)
    expect(validatePassword('alllowercase1').valid).toBe(false)
    expect(validatePassword('NoNumber').valid).toBe(false)
    expect(validatePassword('Valid1Pass').valid).toBe(true)
  })

  it('parses Bearer token from auth header', () => {
    expect(parseAuthHeader('Bearer abc123')).toBe('abc123')
    expect(parseAuthHeader('Basic abc123')).toBeNull()
    expect(parseAuthHeader('')).toBeNull()
  })
})

describe('order utilities', () => {
  it('calculates order total from subtotal and shipping', () => {
    expect(calculateOrderTotal(49.99, 9.99)).toBeCloseTo(59.98)
    expect(calculateOrderTotal(100, 0)).toBe(100)
  })
})

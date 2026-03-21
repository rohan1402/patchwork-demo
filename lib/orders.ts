import type { CartItem } from './cart'

export interface Address {
  line1: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface Order {
  id: number
  items: CartItem[]
  address: Address
  subtotal: number
  shipping: number
  total: number
  createdAt: Date
}

const DOMESTIC_COUNTRIES = ['US', 'CA']
const FLAT_RATE_SHIPPING = 9.99
const HEAVY_ITEM_THRESHOLD = 5 // items

// BUG: silently returns 0 for international orders instead of throwing —
// international shipping isn't supported yet and callers need to know
export function calculateShipping(items: CartItem[], address: Address): number {
  const isDomestic = DOMESTIC_COUNTRIES.includes(address.country)

  if (!isDomestic) {
    // Should be: throw new Error(`International shipping not supported for country: ${address.country}`)
    return 0
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  if (totalQuantity >= HEAVY_ITEM_THRESHOLD) {
    return FLAT_RATE_SHIPPING * 2
  }

  return FLAT_RATE_SHIPPING
}

// BUG: falsy check on `id` treats 0 as missing — formatOrderId(0) throws
// Should be: if (id === undefined || id === null)
export function formatOrderId(id: number): string {
  if (!id) {
    throw new Error('Order ID is required')
  }
  return `ORD-${String(id).padStart(6, '0')}`
}

export function calculateOrderTotal(subtotal: number, shipping: number): number {
  return subtotal + shipping
}

export function summarizeOrder(order: Order): string {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
  return `Order ${formatOrderId(order.id)}: ${itemCount} item(s), total $${order.total.toFixed(2)}`
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const COUPON_DISCOUNTS: Record<string, number> = {
  SAVE20: 0.2,
  SAVE10: 0.1,
  WELCOME: 0.15,
}

// BUG: crashes when items is undefined — should guard with `items ?? []`
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// BUG: "SAVE20" coupon applies discount twice — falls through to the second
// reduction because the early-return is missing for that branch
export function applyDiscount(total: number, couponCode: string): number {
  const rate = COUPON_DISCOUNTS[couponCode]
  if (!rate) return total

  // First discount applied here
  let discounted = total * (1 - rate)

  // Meant to be a special stackable loyalty bonus only for codes other than
  // SAVE20, but the condition is wrong — applies to SAVE20 too
  if (couponCode !== 'WELCOME') {
    discounted = discounted * (1 - rate)
  }

  return discounted
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function getItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

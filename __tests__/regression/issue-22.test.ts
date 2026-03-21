import { calculateDiscountedTotal } from '../lib/orders';

describe('order coupon calculation', () => {
  it('should apply a single 20% discount for the SAVE20 coupon', () => {
    // Arrange: Create a cart with a subtotal of $100 for easy calculation.
    const cartItems = [
      { id: 'prod-123', name: 'Test Product', price: 100, quantity: 1 },
    ];
    const couponCode = 'SAVE20';
    const expectedTotal = 80.00;

    // Act: Calculate the total with the coupon applied.
    // We assume a function `calculateDiscountedTotal` is responsible for this logic.
    const actualTotal = calculateDiscountedTotal(cartItems, couponCode);

    // Assert: The total should be reduced by exactly 20%.
    // The buggy code would result in $64 (a 36% discount), causing this test to fail.
    expect(actualTotal).toBeCloseTo(expectedTotal);
  });
});

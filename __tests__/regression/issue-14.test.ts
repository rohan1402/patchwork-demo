import { calculateOrderTotal } from '../lib/orders';

describe('Regression: new demo bug', () => {
  it('calculates the order total correctly when the subtotal is zero', () => {
    // The bug report is non-specific, so this test targets a common, plausible edge case
    // that is not covered in the existing tests. A frequent bug in e-commerce logic
    // is the incorrect handling of a zero-value subtotal (e.g., for a promotional item),
    // which might cause the total to be calculated incorrectly.
    expect(calculateOrderTotal(0, 9.99)).toBeCloseTo(9.99);
    expect(calculateOrderTotal(0, 0)).toBe(0);
  });
});

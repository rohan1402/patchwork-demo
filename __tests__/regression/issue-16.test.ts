import { calculateOrderTotal } from '../lib/orders';

describe('Regression Test for Demo Bug 2', () => {
  it('should throw an error if subtotal or shipping values are negative', () => {
    // This test addresses a bug where negative values for subtotal or shipping
    // could result in an incorrect, negative order total.
    // The function should validate inputs and throw an error for non-positive amounts.
    expect(() => calculateOrderTotal(-100, 10)).toThrow();
    expect(() => calculateOrderTotal(100, -10)).toThrow();
    expect(() => calculateOrderTotal(-100, -10)).toThrow();
  });
});

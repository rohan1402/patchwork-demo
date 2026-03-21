import { getItemCount } from '../lib/cart';

describe('Cart Crash Regression', () => {
  it('should return a count of 0 for an undefined cart to prevent crash', () => {
    // This test reproduces the conditions of the bug report where the cart page
    // crashes due to a TypeError. This typically happens when a function expects
    // an array of items but receives `undefined` instead.
    const items = undefined;

    // A robust `getItemCount` should handle this case gracefully by returning 0,
    // preventing the downstream crash.
    expect(getItemCount(items)).toBe(0);
  });
});

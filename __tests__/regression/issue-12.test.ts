import { getItemCount } from '../lib/cart';

describe('Regression: demo bug', () => {
  it('should correctly calculate total items when a cart item has a zero or missing quantity', () => {
    const cartItems = [
      { id: 'item1', name: 'Valid Item', price: 10, quantity: 5 },
      { id: 'item2', name: 'Zero Quantity Item', price: 20, quantity: 0 },
      { id: 'item3', name: 'Missing Quantity Item', price: 30 }, // quantity is undefined
      { id: 'item4', name: 'Another Valid Item', price: 15, quantity: 1 },
    ];

    // A buggy implementation might fail to handle the undefined quantity, returning NaN.
    // The expected behavior is to treat missing or zero quantities as 0.
    expect(getItemCount(cartItems)).toBe(6);
  });
});

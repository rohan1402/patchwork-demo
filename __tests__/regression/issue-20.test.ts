import { calculateShippingCost } from '../lib/orders';

describe('shipping cost calculation', () => {
  it('applies a non-zero shipping cost for international orders', () => {
    const sampleCart = [
      { id: 'prod_123', name: 'Patchwork Demo T-Shirt', price: 25.00, quantity: 1 },
    ];

    const internationalAddress = {
      street: '1 Rue de la Paix',
      city: 'Paris',
      country: 'FR', // France is an international address
    };

    const shippingCost = calculateShippingCost(sampleCart, internationalAddress);

    // This assertion fails when the bug is present (shippingCost is 0)
    // and passes once a shipping cost is correctly applied.
    expect(shippingCost).not.toBe(0);
  });
});

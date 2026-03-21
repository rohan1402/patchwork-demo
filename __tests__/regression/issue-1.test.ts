import React from 'react';
import { render, screen } from '@testing-library/react';
import CartPage from '../pages/cart'; // The component with the bug
import { CartContext } from '../context/CartContext'; // The context providing cart data

describe('Cart page regression tests', () => {
  it('should not crash and should show empty cart message when items are undefined', () => {
    // This state simulates the condition where the cart is empty and the data source
    // provides `undefined` for the items list, causing the reported '.map' error.
    const emptyCartContextValue = {
      items: undefined,
      // Mock other context functions as needed by the component
      addItem: jest.fn(),
      removeItem: jest.fn(),
      clearCart: jest.fn(),
    };

    // In the buggy state, this render call will throw a TypeError and fail the test.
    // After the fix (e.g., defaulting `items` to [] in the component), it will render successfully.
    render(
      <CartContext.Provider value={emptyCartContextValue}>
        <CartPage />
      </CartContext.Provider>
    );

    // This assertion checks for the expected behavior after the bug is fixed.
    // The test only passes if the component renders without crashing.
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

    // Additionally, we can confirm that cart total/summary elements are not rendered.
    expect(screen.queryByText(/subtotal/i)).not.toBeInTheDocument();
  });
});

import pytest
from commerce.discounts import apply_discount

def test_save20_coupon_applies_correct_20_percent_discount():
    """
    Verifies the 'SAVE20' coupon code applies exactly a 20% discount.

    This regression test targets a bug where a 20% discount was being
    applied twice, resulting in an incorrect total discount of 36%.
    """
    initial_price = 100.00
    coupon_code = "SAVE20"

    # With the bug, final_price would be 64.00 (100 * 0.8 * 0.8).
    # The correct price should be 80.00 (100 * 0.8).
    final_price = apply_discount(price=initial_price, code=coupon_code)

    expected_price = 80.00
    assert final_price == pytest.approx(expected_price)
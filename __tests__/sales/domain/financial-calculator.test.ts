import { test, expect } from "vitest";

import { pmt } from "../../../src/sales/domain/financial-calculator";

test("pmt", () => {
    // given

    // when
    const payment = pmt(48.0, 0.3, -40_000.0, 0.0, 0.0);

    // then
    expect(payment).toBe(896.0200583908082);
});

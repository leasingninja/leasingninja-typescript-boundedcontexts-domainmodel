import { test, expect } from "vitest";

import { LeaseTerm } from "../../../src/sales/domain/lease-term";

test("given_whenALeaseTermIsCreatedOfYears_thenNoOfMonthsIsCorrect", () => {
    // given

    // when
    const leaseTerm = LeaseTerm.ofYears(4);

    // then
    expect(leaseTerm.noOfMonths).toBe(48);
});

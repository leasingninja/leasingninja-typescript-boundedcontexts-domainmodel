import { test, expect } from "vitest";

import { Interest } from "../../../src/sales/domain/interest";

test("givenAnInterest_whenPerMonth_thenCorrectValue()", () => {
    // given
    const interest = Interest.of(3.6);

    // when
    const perMonth = interest.perMonth;

    // then
    expect(perMonth).toBe(0.3);
});

test("givenTwoEqualInterests whenEquals thenAreEqual", () => {
    // given
    const Interest1 = Interest.of(4.2);
    const Interest2 = Interest.of(4.2);

    // when
    const are_equal = Interest1.equals(Interest2);

    // then
    expect(are_equal).toBe(true);
    expect(Interest1).toEqual(Interest2);
});

test("givenTwoUnequalInterests_whenEquals_thenAreNotEqual", () => {
    // given
    const Interest1 = Interest.of(4.2);
    const Interest2 = Interest.of(2.3);

    // when
    const areEqual = Interest1.equals(Interest2);

    // then
    expect(areEqual).toBeFalsy();
    expect(Interest1).not.toEqual(Interest2);
});


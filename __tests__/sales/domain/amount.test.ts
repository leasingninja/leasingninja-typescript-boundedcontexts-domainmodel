import { test, expect } from "vitest";

import { Amount } from "../../../src/sales/domain/amount";
import { Currency } from "../../../src/sales/domain/currency";

test("givenTwoEqualAmounts whenEquals thenAreEqual", () => {
    // given
    const amount1 = Amount.of(100, Currency.EUR);
    const amount2 = Amount.of(100, Currency.EUR);

    // when
    const are_equal = amount1.equals(amount2);

    // then
    expect(are_equal).toBeTruthy;
});

test("givenTwoUnequalAmounts_whenEquals_thenAreNotEqual", () => {
    // given
    const amount1 = Amount.of(100, Currency.EUR);
    const amount2 = Amount.of(200, Currency.EUR);

    // when
    const areEqual = amount1.equals(amount2);

    // then
    expect(areEqual).toBeFalsy();
});

test("givenTwoAmountsWithUnequalCurrencies_whenEquals_thenAreNotEqual", () => {
    // given
    const amount1 = Amount.of(100, Currency.EUR);
    const amount2 = Amount.of(100, Currency.GBP);

    // when
    const areEqual = amount1.equals(amount2);

    // then
    expect(areEqual).toBeFalsy();
});

test("givenTwoAmountsWithRoundingAfterThePoint_whenEquals_thenAreEqual", () => {
    // given
    const amount1 = Amount.of(100.45, Currency.EUR);
    const amount2 = Amount.of(100.447123, Currency.EUR);

    // when
    const areEqual = amount1.equals(amount2);

    // then
    expect(areEqual).toBeTruthy;
});

test("givenAnAmountsWithCents_whenToString_thenAfterThePointIsCorrectlyPrinted", () => {
    // given
    const amount = Amount.of(100.45, Currency.EUR);

    // when
    const amountString = amount.toString();

    // then
    expect(amountString).toBe("EUR 100.45");
});

test("givenTwoAmountsOfEurosAndCents_whenEquals_thenAreEqual", () => {
    // given
    const amount1 = Amount.of(100.45, Currency.EUR);
    const amount2 = Amount.ofCents(10045, Currency.EUR);

    // when
    const areEqual = amount1.equals(amount2);

    // then
    expect(areEqual).toBeTruthy;
});


import { test, expect } from "vitest";

import { Amount } from "../../../src/sales/domain/amount";
import { Car } from "../../../src/sales/domain/car";
import { Contract } from "../../../src/sales/domain/contract";
import { ContractNumber } from "../../../src/sales/domain/contract-number";
import { Currency } from "../../../src/sales/domain/currency";
import { Customer } from "../../../src/sales/domain/customer";
import { Interest } from "../../../src/sales/domain/interest";
import { LeaseTerm } from "../../../src/sales/domain/lease-term";
import { SignDate } from "../../../src/sales/domain/sign-date";

test("givenAFilledOutContract_whenCalculate_thenInstallmentIsX()", () => {
    // given
    const contract = new Contract(ContractNumber.of("4711"),
            Customer.of("John Buyer"),
            Car.of("Volkswagen ID.3"),
            Amount.of(40_000, Currency.EUR));

    // when
    contract.calculateInstallmentFor(LeaseTerm.ofMonths(48), Interest.of(3.7));

    // then
    expect(contract.isCalculated).toBeTruthy();
    expect(contract.leaseTerm).toEqual(LeaseTerm.ofMonths(48));
    expect(contract.interest).toEqual(Interest.of(3.7));
    expect(contract.installment).toEqual(Amount.of(897.80, Currency.EUR));
});

test("givenAFilledOutContractWith0Interest_whenCalculate_thenInstallmentIsX", () => {
    // given
    const contract = new Contract(ContractNumber.of("4711"),
            Customer.of("John Buyer"),
            Car.of("Volkswagen ID.3"),
            Amount.of(40_000, Currency.EUR));

    // when
    contract.calculateInstallmentFor(LeaseTerm.ofMonths(48), Interest.of(0));

    // then
    expect(contract.isCalculated).toBeTruthy();
    expect(contract.installment).toEqual(Amount.of(833.33, Currency.EUR));
});

test("givenACalculatedContract_whenSign_thenContractIsSigned", () => {
    // given
    const contract = new Contract(ContractNumber.of("4711"),
            Customer.of("John Buyer"),
            Car.of("Mercedes Benz C-Class"),
            Amount.of(20_000, Currency.EUR));
    contract.calculateInstallmentFor(LeaseTerm.ofMonths(48), Interest.of(3.7));

    // when
    contract.sign(SignDate.of(2018, 12, 24));

    // then
    expect(contract.isSigned).toBeTruthy();
    expect(contract.signDate).toEqual(SignDate.of(2018, 12, 24));
});

test("givenAnUncalculatedContract_whenSign_thenThrows", () => {
    // given
    const contract = new Contract(ContractNumber.of("4711"),
            Customer.of("John Buyer"),
            Car.of("Mercedes Benz C-Class"),
            Amount.of(20_000, Currency.EUR));

    // when / then
    expect(() => contract.sign(SignDate.of(2018, 12, 24))).toThrow();
});

test("givenAnUncalculatedContract_whenInstallment_thenThrows", () => {
    // given
    const contract = new Contract(ContractNumber.of("4711"),
            Customer.of("John Buyer"),
            Car.of("Mercedes Benz C-Class"),
            Amount.of(20_000, Currency.EUR));

    // when / then
    expect(contract.isCalculated).toBeFalsy();
    expect(() => contract.installment).toThrow();
});

test("givenTwoContractsWithSameIdButDifferentFields_whenEquals_thenShouldReturnTrue", () => {
    // given
    const contract1 = new Contract(ContractNumber.of("4711"),
            Customer.of("John Buyer"),
            Car.of("Mercedes Benz C-Class"),
            Amount.of(40_000, Currency.EUR));
    const contract2 = new Contract(ContractNumber.of("4711"),
            Customer.of("Bob Myers"),
            Car.of("Volkswagen ID.3"),
            Amount.of(30_000, Currency.EUR));

    // when
    const equal = contract1.equals(contract2);

    // then
    expect(equal).toBe(true);
});

test("givenTwoContractsWithDifferentIdButSameFields_whenEquals_thenShouldReturnFalse", () => {
    // given
    const contract1 = new Contract(ContractNumber.of("4711"),
            Customer.of("John Buyer"),
            Car.of("Mercedes Benz C-Class"),
            Amount.of(40_000, Currency.EUR));
    const contract2 = new Contract(ContractNumber.of("4712"),
            Customer.of("John Buyer"),
            Car.of("Mercedes Benz C-Class"),
            Amount.of(40_000, Currency.EUR));

    // when
    const equal = contract1.equals(contract2);

    // then
    expect(equal).toBe(false);
});

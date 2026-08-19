import { test, expect } from "vitest";

import { Amount } from "../../../src/sales/domain/amount";
import { Car } from "../../../src/sales/domain/car";
import { Contract } from "../../../src/sales/domain/contract";
import { ContractNumber } from "../../../src/sales/domain/contract-number";
import { Currency } from "../../../src/sales/domain/currency";
import { Customer } from "../../../src/sales/domain/customer";
import { Interest } from "../../../src/sales/domain/interest";
import { LeaseTerm } from "../../../src/sales/domain/lease-term";

test("givenAFilledOutContract_whenCalculate_thenInstallmentIsX()", () => {
    // given
    const contract = new Contract(ContractNumber.of("4711"),
            Customer.of("John Buyer"),
            Car.of("Volkswagen ID.3"),
            Amount.of(40_000, Currency.EUR));

    // when
    contract.calculateInstallmentFor(LeaseTerm.ofMonths(48), Interest.of(3.7));

    // then
    expect(contract.isCalculated()).toBeTruthy();
    expect(contract.leaseTerm).toBe(LeaseTerm.ofMonths(48));
    expect(contract.interest).toBe(Interest.of(3.7));
    expect(contract.installment).toBe(Amount.of(897.80, Currency.EUR));
});

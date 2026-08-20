import assert from "node:assert";

import { Amount } from "./amount";
import { Car } from "./car";
import { ContractNumber } from "./contract-number";
import { Customer } from "./customer";
import { Interest } from "./interest";
import { LeaseTerm } from "./lease-term";
import { SignDate } from "./sign-date";

import { pmt } from "./financial-calculator";

type Calculation = {
    readonly leaseTerm: LeaseTerm;
    readonly interest: Interest;
    readonly installment: Amount;
};

export class Contract {

    #calculation?: Calculation;
    #signDate?: SignDate;

    public constructor(
        public readonly number: ContractNumber,
        public readonly lessee: Customer,
        public readonly car: Car,
        public readonly price: Amount
    ) {
    }

    get isCalculated() {
        return this.#calculation !== undefined;
    }

    calculateInstallmentFor(leaseTerm: LeaseTerm, interest: Interest) {
        assert(!this.isSigned);

        const inAdvance = 0.0;
        const residualValue = 0.0;

        const payment = pmt(
            leaseTerm.noOfMonths,
            interest.perMonth,
            -1 * this.price.amount,
            residualValue,
            inAdvance);

        this.#calculation = {
            leaseTerm,
            interest,
            installment: Amount.of(payment, this.price.currency)
        };

        assert(this.isCalculated);
    }

    get leaseTerm() {
        assert(this.#calculation !== undefined);

        return this.#calculation.leaseTerm;
    }

    get interest() {
        assert(this.#calculation !== undefined);

        return this.#calculation.interest;
    }

    get installment() {
        assert(this.#calculation !== undefined);

        return this.#calculation.installment;
    }

    sign(date: SignDate) {
        assert(this.isCalculated);
        assert(!this.isSigned);

        this.#signDate = date;

        assert(this.isSigned);
    }

    get isSigned() {
        return this.#signDate !== undefined;
    }

    get signDate() {
        assert(this.#signDate !== undefined);

        return this.#signDate;
    }

    /** A contract is identified by its number alone. */
    equals(other: Contract) {
        return this.number.equals(other.number);
    }

    toString() {
        return `Contract [number=${this.number.number}, lessee=${this.lessee.customer}`
            + `, car=${this.car.car}, price=${this.price}, signDate=${this.#signDate ?? "-"}]`;
    }

}

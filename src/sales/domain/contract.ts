import { Amount } from "./amount";
import { Car } from "./car";
import { ContractNumber } from "./contract-number";
import { Customer } from "./customer";
import { Interest } from "./interest";
import { LeaseTerm } from "./lease-term";

import { pmt } from "./financial-calculator";


export class Contract {

    public constructor(
        public readonly number: ContractNumber,
        public readonly lessee: Customer,
        public readonly car: Car,
        public readonly price: Amount
    ) {

    }

	public calculateInstallmentFor(leaseTerm: LeaseTerm, interest: Interest) {
		//requireNonNull(leaseTerm);
		//requireNonNull(interest);
		//assert !isSigned();

		const inAdvance = 0.0;
		const residualValue = 0.0;

		const payment = pmt(
			leaseTerm.noOfMonths,
			interest.perMonth,
			-1 * this.price.amount,
			residualValue,
			inAdvance);

		this.calculation = Optional.of(new Calculation(leaseTerm, interest, Amount.of(payment, this.price.currency)));

		//assert isCalculated();
	}
}

import { Currency } from "./currency";

export class Amount {
    private constructor(
        public readonly amountInCents: number,
        public readonly currency: Currency
    ) {
    }

    static of(amount: number, currency: Currency) {
        return new Amount(Math.round(amount * 100), currency);
    }

    static ofCents(amount_in_cents: number, currency: Currency) {
        return new Amount(amount_in_cents, currency);
    }

    get amount(): number {return this.amountInCents / 100.0;}

    equals(other: any) {
        return this.amountInCents === other.amountInCents && this.currency === other.currency;
    }

	toString() {
		return this.currency + ' ' + this.amount;
	}

}

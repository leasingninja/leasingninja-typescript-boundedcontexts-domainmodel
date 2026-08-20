export class Customer {

    private constructor(
        public readonly customer: string
    ) {}

    static of(customer: string) {
        return new Customer(customer);
    }

    toString() {
        return this.customer;
    }

}

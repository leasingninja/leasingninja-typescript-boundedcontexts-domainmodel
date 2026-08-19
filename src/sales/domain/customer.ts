export class Customer {

    private constructor(
        public readonly customer: String
    ) {}

    static of(customer: String) {
        return new Customer(customer);
    }
}

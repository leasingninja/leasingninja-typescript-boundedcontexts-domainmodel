export class ContractNumber {

    private constructor(
        public readonly number: String
    ) {}

    static of(number: String) {
        return new ContractNumber(number);
    }
}

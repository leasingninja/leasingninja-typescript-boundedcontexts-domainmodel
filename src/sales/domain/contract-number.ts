export class ContractNumber {

    private constructor(
        public readonly number: string
    ) {}

    static of(number: string) {
        return new ContractNumber(number);
    }

    equals(other: ContractNumber) {
        return this.number === other.number;
    }

    toString() {
        return this.number;
    }

}

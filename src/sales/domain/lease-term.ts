export class LeaseTerm {
    private constructor(
        public readonly noOfMonths: number
    ) {}

    public static ofMonths(noOfMonths: number) {
        return new LeaseTerm(noOfMonths);
    }

    public static ofYears(noOfYears: number) {
        return new LeaseTerm(noOfYears * 12);
    }
}

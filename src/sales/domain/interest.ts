export class Interest {

    private constructor(
        public readonly perYear: number
    ) {}

    static of(perYear: number) {
        return new Interest(perYear);
    }

    get perMonth() { return this.perYear / 12; }

}

import assert from "node:assert";

/**
 * Interest in percent.
 */
export class Interest {

    private constructor(
        public readonly perYear: number
    ) {}

    static of(perYear: number) {
        assert(perYear >= 0);

        return new Interest(perYear);
    }

    get perMonth() { return this.perYear / 12; }

    equals(other: Interest) {
        return this.perYear === other.perYear;
    }

    toString() {
        return `Interest [${this.perYear}% p.a.]`;
    }

}

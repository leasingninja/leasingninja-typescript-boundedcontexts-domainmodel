/**
 * The date a contract was signed.
 *
 * Kept as plain year/month/day instead of a `Date`, because a sign date is a
 * calendar date without a time or a time zone.
 */
export class SignDate {

    private constructor(
        public readonly year: number,
        public readonly month: number,
        public readonly day: number
    ) {}

    static of(year: number, month: number, day: number) {
        return new SignDate(year, month, day);
    }

    toString() {
        const padded = (value: number) => String(value).padStart(2, "0");

        return `${this.year}-${padded(this.month)}-${padded(this.day)}`;
    }

}

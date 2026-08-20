export class Car {

    private constructor(
        public readonly car: string
    ) {}

    static of(car: string) {
        return new Car(car);
    }

    toString() {
        return this.car;
    }

}

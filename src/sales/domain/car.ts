export class Car {

    private constructor(
        public readonly car: String
    ) {}

    static of(car: String) {
        return new Car(car);
    }
}

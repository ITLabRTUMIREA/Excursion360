export class ExcursionVector3 {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly z: number
    ) {}
    public static Zero(): ExcursionVector3 {
        return new ExcursionVector3(0, 0, 0);
    }
}
module math {
    export class Vec2 extends createjs.Point {
        // Variables
        // Constructor

        constructor(x: number=0, y: number=0) {
            super(x, y);
        }

        public get Magnitude(): number {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        }

        public get Normalized(): Vec2 {
            let mag = this.Magnitude;
            if (mag != 0) {
                return new Vec2(this.x / mag, this.y / mag);
            } else {
                return Vec2.Zero;
            }
        }

        public Scale(s: number) {
            return new Vec2(this.x * s, this.y * s);
        }

        public Add(v: Vec2) {
            return Vec2.Sum(this, v);
        }

        // Static Methods

        public static Sum(a: Vec2, b: Vec2): Vec2 {
            return new Vec2(a.x + b.x, a.y + b.y);
        }

        public static Distance(a: Vec2, b: Vec2): number {
            let x = a.x - b.x;
            let y = a.y - b.y;
            return Math.sqrt((x * x) + (y * y));
        }

        public static Difference(a: Vec2, b: Vec2): Vec2 {
            return new math.Vec2(a.x - b.x, a.y - b.y);
        }

        public static get Zero(): Vec2 {
            return new Vec2(0, 0);
        }
    }
}
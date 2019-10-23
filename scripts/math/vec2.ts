module math {
    export class Vec2 /*extends createjs.Point*/ {
        // Variables
        // Constructor

        public x: number;
        public y: number;

        constructor(x: number = 0, y: number = 0) {
            // super(x, y);
            this.x = x;
            this.y = y;
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

        public static Distance(P1:Vec2, P2:Vec2): number {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        }

        public static Difference(a: Vec2, b: Vec2): Vec2 {
            return new math.Vec2(a.x - b.x, a.y - b.y);
        }

        public get Magnitude(): number {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        }

        public get Normalized(): Vec2 {
            let mag = this.Magnitude;
            if (mag != 0) {
                return new Vec2(this.x / mag, this.y / mag);
            }
        }
    }
}
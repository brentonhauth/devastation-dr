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

        /**
         * Returns a new scaled Vector
         * @param {Number} s
         */
        public Scale(s: number) {
            return new Vec2(this.x * s, this.y * s);
        }

        /**
         * Scales the current Vector
         * @param {Number} s
         */
        public ScaleEq(s: number) {
            this.x *= s;
            this.y *= s;
            return this;
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

        /**
         * Checks if the distance between 2 vectors is within a certain range.
         * 
         * @example
         * // Use instead of:
         * Vec2.Distance(a, b) <= range
         * @param {Vec2} a
         * @param {Vec2} b
         * @param {number} range
         */
        public static WithinRange(a: Vec2, b: Vec2, range: number): boolean {
            let x = a.x - b.x,
                y = a.y - b.y;
            range *= range;

            let disSq = (x * x) + (y * y);

            return disSq <= range;
        }

        public static Difference(a: Vec2, b: Vec2): Vec2 {
            return new math.Vec2(a.x - b.x, a.y - b.y);
        }

        public static get Zero(): Vec2 {
            return new Vec2(0, 0);
        }

        public static get Up(): Vec2 {
            return new Vec2(0, -1);
        }

        public static get Down(): Vec2 {
            return new Vec2(0, 1);
        }

        public static get Left(): Vec2 {
            return new Vec2(-1, 0);
        }

        public static get Right(): Vec2 {
            return new Vec2(1, 0);
        }
    }
}
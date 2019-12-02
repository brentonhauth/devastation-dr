module math {
    export class Vec2 extends createjs.Point {
        // Variables
        // Constructor

        constructor(x?: number, y?: number) {
            super(x || 0, y || 0);
        }


        // Properties

        public get Magnitude(): number {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        }

        public get Normalized(): Vec2 {

            if (!this.x && !this.y) {
                return math.Vec2.Zero;
            }

            let magSq = (this.x * this.x) + (this.y * this.y);

            if (magSq === 1) {
                return new math.Vec2(this.x, this.y);
            } else if (magSq) {
                let mag = Math.sqrt(magSq);
                return new Vec2(this.x / mag, this.y / mag);
            } else {
                return Vec2.Zero;
            }
        }

        public get LiteralDirection(): config.Direction {

            if (!this.x && !this.y) {
                return config.Direction.None;
            }

            let norm = this.Normalized;

            if (Math.abs(norm.x) > Math.abs(norm.y)) {
                return norm.x > 0 ? config.Direction.Right : config.Direction.Left;
            } else {
                return norm.y > 0 ? config.Direction.Down : config.Direction.Up;
            }
        }


        // Methods

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
        public ScaleEq(s: number): Vec2 {
            // this.x *= s;
            // this.y *= s;
            return <Vec2>this.setValues(this.x * s, this.y * s);
        }

        /**
         * Returns the sum of two Vectors
         * @example
         * // Use
         * vecA.Add(vecB);
         * 
         * // instead of
         * vecA = math.Vec2.Sum(vecA, vecB);
         * 
         * @param {Vec2} v
         */
        public Add(v: Vec2): Vec2 {
            return <Vec2>this.setValues(this.x + v.x, this.y + v.y);
        }


        // Static Methods

        public static Sum(a: Vec2, b: Vec2): Vec2 {
            return new Vec2(a.x + b.x, a.y + b.y);
        }

        public static SumMany(...vecs: Vec2[]): Vec2 {
            var sum = new math.Vec2(0, 0);
            vecs.forEach(v => {
                sum.x += v.x;
                sum.y += v.y;
            });

            return sum;
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
         * @param {Number} range
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

        /**
         * Returns the Normalized Difference of 2 Vectors
         * @example
         * // Use
         * var dir = math.Vec2.Direction(a, b);
         * 
         * // instead of
         * var dir = math.Vec2.Difference(a, b).Normalized;
         * @param {Vec2} a
         * @param {Vec2} b
         */
        public static Direction(a: Vec2, b: Vec2): Vec2 {
            let x = a.x - b.x;
            let y = a.y - b.y;

            if (!x && !y) {
                return math.Vec2.Zero;
            }

            let mag = Math.sqrt((x * x) + (y * y));

            return new Vec2(x / mag, y / mag);
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
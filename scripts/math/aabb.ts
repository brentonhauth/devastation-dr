// start of collision detection

module math {
    export class AABB {
        public min: Vec2;
        public max: Vec2;

        constructor(min: Vec2, max: Vec2) {
            this.min = min;
            this.max = max;
        }

        public static Intersect(a: AABB, b: AABB) {
            if (a.max.x < b.min.x || a.min.x > b.max.x) {
                return false;
            } else if (a.max.y < b.min.y || a.min.y > b.max.y) {
                return false;
            } else {
                return true;
            }
        }
    }
}

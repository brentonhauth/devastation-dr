// start of collision detection

module math {
    export class AABB {
        public min: Vec2;
        public max: Vec2;

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

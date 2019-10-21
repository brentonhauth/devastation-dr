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

        public static Overlap(abox: AABB, bbox: AABB): Vec2 {
            let over = new Vec2(0, 0);

            let checkedMinX = abox.min.x < bbox.max.x && abox.min.x > bbox.min.x;
            let checkedMaxX = abox.max.x > bbox.min.x && abox.max.x < bbox.max.x;

            let xorX = checkedMinX !== checkedMaxX;

            if (xorX) {
                over.x = checkedMinX ?
                (abox.min.x - bbox.max.x) :
                (abox.max.x - bbox.min.x);
            }


            let checkedMinY = abox.min.y < bbox.max.y && abox.min.y > bbox.min.y;
            let checkedMaxY = abox.max.y > bbox.min.y && abox.max.y < bbox.max.y;

            let xorY = checkedMinY !== checkedMaxY;

            if (xorY) {
                over.y = checkedMinY ?
                (abox.min.y - bbox.max.y) :
                (abox.max.y - bbox.min.y);
            }

            if (xorX && xorY) {
                if (Math.abs(over.x) < Math.abs(over.y)) {
                    over.y = 0;
                } else {
                    over.x = 0;
                }
            }

            return over;
        }
    }
}

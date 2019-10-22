var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2, options) {
            if (options === void 0) { options = undefined; }
            // Create 2 temp Vec2 objects used for collision detection
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfH + object2.halfH)) {
                if (!object2.isColliding) {
                    // React to our collision
                    console.log("Collision with " + object2.name);
                    object1.OnCollision(object2);
                    object2.OnCollision(object1);
                    object2.isColliding = true;
                }
            }
            else {
                object2.isColliding = false;
            }
            // let intersecting = math.AABB.Intersect(object1.boxCollider.aabb, object2.boxCollider.aabb);
            // if (intersecting) {
            //     this.HandleCollision(object1, object2);
            // }
        };
        Collision.HandleCollision = function (a, b) {
            var overlap = math.AABB.Overlap(a.boxCollider.aabb, b.boxCollider.aabb);
            a.position = math.Vec2.Difference(overlap.Scale(1.01), a.position);
            a.OnCollision(b);
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map
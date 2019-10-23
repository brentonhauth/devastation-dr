var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            // Create 2 temp Vec2 objects used for collision detection
            // let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
            // let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);
            // if(math.Vec2.Distance(P1, P2) < (object1.halfH + object2.halfH)) {
            //     if(!object2.isColliding) {
            //         // React to our collision
            //         console.log("Collision with " + object2.name);
            //         object1.OnCollision(object2);
            //         object2.OnCollision(object1);
            //         object2.isColliding = true;
            //     }
            // } else {
            //     object2.isColliding = false;
            // }
            var intersecting = math.AABB.Intersect(object1.boxCollider.aabb, object2.boxCollider.aabb);
            if (intersecting) {
                // let ignore = false;
                // for (let c of object1.boxCollider.ignore) {
                //     if (object2 instanceof c) {
                //         ignore = true;
                //         break;
                //     }
                // }
                // if (!ignore) {
                //     for (let c of object2.boxCollider.ignore) {
                //         if (object1 instanceof c) {
                //             ignore = true;
                //             break;
                //         }
                //     }
                // }
                // if (!ignore) {
                //     this.HandleCollision(object1, object2);
                // }
                object1.OnCollision(object2);
                object2.OnCollision(object1);
            }
        };
        Collision.HandleCollision = function (a, b) {
            var overlap = math.AABB.Overlap(a.boxCollider.aabb, b.boxCollider.aabb);
            a.position = math.Vec2.Difference(overlap.Scale(1.01), a.position);
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map
var components;
(function (components) {
    var BoxCollider = /** @class */ (function () {
        function BoxCollider(x, y, width, height) {
            this.drawMode = false;
            var hw = width / 2;
            var hh = height / 2;
            this.center = new math.Vec2(x, y);
            var min = new math.Vec2(x - hw, y - hh);
            var max = new math.Vec2(x + hw, y + hh);
            this.aabb = new math.AABB(min, max);
        }
        Object.defineProperty(BoxCollider.prototype, "position", {
            set: function (v2) {
                var m = math.Vec2.Difference(this.center, v2);
                // let mx = v2.x - this.center.x;
                // let my = v2.y - this.center.y;
                this.aabb.min.x += m.x;
                this.aabb.min.y += m.y;
                this.aabb.max.x += m.x;
                this.aabb.max.y += m.y;
                this.center.x = v2.x;
                this.center.y = v2.y;
                if (this.drawMode) {
                    this.draw();
                    // REMOVE
                }
                else {
                    objects.Game.stage.removeChild(this.shape);
                }
            },
            enumerable: true,
            configurable: true
        });
        BoxCollider.prototype.draw = function () {
            if (this.shape) {
                objects.Game.stage.removeChild(this.shape);
            }
            var g = new createjs.Graphics();
            g.beginStroke("firebrick");
            // let rect: any = {
            //     x: this.aabb.min
            // };
            var w = this.aabb.max.x - this.aabb.min.x;
            var h = this.aabb.max.y - this.aabb.min.y;
            g.drawRect(this.aabb.min.x, this.aabb.min.y, w, h);
            g.endStroke();
            this.shape = new createjs.Shape(g);
            objects.Game.stage.addChild(this.shape);
        };
        return BoxCollider;
    }());
    components.BoxCollider = BoxCollider;
})(components || (components = {}));
//# sourceMappingURL=boxcollider.js.map
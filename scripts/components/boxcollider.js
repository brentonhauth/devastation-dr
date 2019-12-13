var components;
(function (components) {
    var BoxCollider = /** @class */ (function () {
        function BoxCollider(x, y, width, height) {
            this.ignore = [];
            this.drawMode = false;
            var hw = width / 2;
            var hh = height / 2;
            this.center = new math.Vec2(x, y);
            var min = new math.Vec2(x - hw, y - hh);
            var max = new math.Vec2(x + hw, y + hh);
            this.aabb = new math.AABB(min, max);
        }
        Object.defineProperty(BoxCollider.prototype, "position", {
            set: function (pos) {
                // let m = math.Vec2.Difference(pos, this.center);
                // let dx = pos.x - this.center.x,
                //     dy = pos.y - this.center.y;
                this.SetPosition(pos.x, pos.y);
            },
            enumerable: true,
            configurable: true
        });
        BoxCollider.prototype.SetPosition = function (x, y) {
            var m = {
                x: x - this.center.x,
                y: y - this.center.y
            };
            this.aabb.min.Add(m);
            this.aabb.max.Add(m);
            this.center.setValues(x, y);
            if (this.drawMode) {
                this.draw();
            }
        };
        Object.defineProperty(BoxCollider.prototype, "width", {
            get: function () {
                if (this.aabb) {
                    return this.aabb.max.x - this.aabb.min.x;
                }
                else {
                    return 0;
                }
            },
            set: function (w) {
                if (w < 0) {
                    w = 0;
                }
                var hw = w / 2;
                this.aabb.min.x = this.center.x - hw;
                this.aabb.max.x = this.center.x + hw;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxCollider.prototype, "height", {
            get: function () {
                if (this.aabb) {
                    return this.aabb.max.y - this.aabb.min.y;
                }
                else {
                    return 0;
                }
            },
            set: function (h) {
                if (h < 0) {
                    h = 0;
                }
                var hh = h / 2;
                this.aabb.min.x = this.center.y - hh;
                this.aabb.max.x = this.center.y + hh;
            },
            enumerable: true,
            configurable: true
        });
        BoxCollider.prototype.draw = function () {
            if (this.shape) {
                objects.Game.stage.removeChild(this.shape);
            }
            var g = new createjs.Graphics();
            g.beginStroke("green");
            // let rect: any = {
            //     x: this.aabb.min
            // };
            g.drawRect(this.aabb.min.x, this.aabb.min.y, this.width, this.height);
            g.endStroke();
            this.shape = new createjs.Shape(g);
            objects.Game.stage.addChild(this.shape);
        };
        return BoxCollider;
    }());
    components.BoxCollider = BoxCollider;
})(components || (components = {}));
//# sourceMappingURL=boxcollider.js.map
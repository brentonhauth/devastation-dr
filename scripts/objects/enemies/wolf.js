var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Wolf = /** @class */ (function (_super) {
        __extends(Wolf, _super);
        function Wolf(spawn, moveTo) {
            if (spawn === void 0) { spawn = null; }
            if (moveTo === void 0) { moveTo = null; }
            var _this = _super.call(this, "wolfSheet") || this;
            _this.isDes = false; // temp
            if (true || spawn === null) {
                _this.spawn = new math.Vec2(math.randRange(600), -100);
                moveTo = new math.Vec2(_this.spawn.x, 700);
            }
            else {
                _this.spawn = spawn;
            }
            if (moveTo === null) {
                moveTo = new math.Vec2(300, 300); // temp
            }
            var speed = .1, sheet = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("wolfSheet")],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    move_down: { speed: speed, frames: [0, 1, 2] },
                    move_left: { speed: speed, frames: [3, 4, 5] },
                    move_right: { speed: speed, frames: [6, 7, 8] },
                    move_up: { speed: speed, frames: [9, 10, 11] },
                }
            });
            var diff = math.Vec2.Difference(moveTo, _this.spawn).Normalized;
            _this.direction = diff.ScaleEq(Wolf.moveSpeed);
            var anim = "move_down";
            if (Math.abs(diff.x) > Math.abs(diff.y)) {
                anim = diff.x > 0 ? "move_right" : "move_left";
            }
            else {
                anim = diff.y > 0 ? "move_down" : "move_up";
            }
            _this.wolfAnimator = new createjs.Sprite(sheet, anim);
            _this.width = 48;
            _this.height = 48;
            _this.Init();
            return _this;
        }
        Wolf.prototype.Start = function () {
            var _this = this;
            this.removeChild(this.sprite);
            this.addChild(this.wolfAnimator);
            this.position = this.spawn;
            // TEMP
            setTimeout(function () {
                if (!_this.isDes) {
                    _this.Destroy();
                }
            }, 10000);
        };
        Wolf.prototype.Update = function () {
            this.position = this.position.Add(this.direction);
            if (this.y > objects.Game.canvas.height) {
                this.Destroy();
            }
        };
        Wolf.prototype.Destroy = function () {
            _super.prototype.Destroy.call(this);
            this.isDes = true;
        };
        Wolf.moveSpeed = 7;
        return Wolf;
    }(objects.Enemy));
    objects.Wolf = Wolf;
})(objects || (objects = {}));
//# sourceMappingURL=wolf.js.map
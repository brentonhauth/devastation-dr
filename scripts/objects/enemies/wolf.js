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
        function Wolf() {
            var _this = _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.getAsset('wolfSheet')],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    move_Down: { speed: .1, frames: [0, 1, 2] },
                    move_Left: { speed: .1, frames: [3, 4, 5] },
                    move_Right: { speed: .1, frames: [6, 7, 8] },
                    move_Up: { speed: .1, frames: [9, 10, 11] },
                }
            })) || this;
            // this.width = 48;
            // this.height = 48;
            _this.Init();
            _this.Reset();
            return _this;
        }
        Wolf.prototype.Start = function () {
            this.position = this.spawn;
        };
        Wolf.prototype.Reset = function () {
            this.spawn = new math.Vec2(math.randInt(600), math.randInt(-105, -95));
            var moveTo = new math.Vec2(this.spawn.x, 700);
            var diff = math.Vec2.Direction(moveTo, this.spawn);
            this.direction = diff.ScaleEq(Wolf.moveSpeed);
            // let anim = "move_down";
            // if (Math.abs(diff.x) > Math.abs(diff.y)) {
            //     anim = diff.x > 0 ? "move_right" : "move_left";
            // } else {
            //     anim = diff.y > 0 ? "move_down" : "move_up";
            // }
            this.animator.gotoAndPlay('move_Down');
        };
        Wolf.prototype.Update = function () {
            this.position = this.position.Add(this.direction);
            if (this.y > objects.Game.canvas.height) {
                this.Destroy();
            }
        };
        Wolf.moveSpeed = 7;
        return Wolf;
    }(objects.Enemy));
    objects.Wolf = Wolf;
})(objects || (objects = {}));
//# sourceMappingURL=wolf.js.map
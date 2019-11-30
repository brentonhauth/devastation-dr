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
    var Jackal = /** @class */ (function (_super) {
        __extends(Jackal, _super);
        function Jackal(side, sweeps) {
            if (side === void 0) { side = null; }
            if (sweeps === void 0) { sweeps = 5; }
            var _this = _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.getAsset('jackalSheet')],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    // idle_down: 1, walk_down: { speed, frames: [0, 1, 2] },
                    idle_Left: 4, walk_Left: { speed: .1, frames: [3, 4, 5] },
                    idle_Right: 7, walk_Right: { speed: .1, frames: [6, 7, 8] },
                }
            })) || this;
            _this.sweepCount = 1;
            _this.yoinked = null;
            if (side) {
                _this.startSide = side === 'left' ?
                    config.Direction.Left :
                    config.Direction.Right;
            }
            else {
                _this.startSide = math.oneIn(2) ?
                    config.Direction.Left :
                    config.Direction.Right;
            }
            _this.sweeps = sweeps;
            // this.width = 48;
            // this.height = 48;
            _this.Init();
            return _this;
        }
        Jackal.prototype.Start = function () {
            // this.removeChild(this.sprite);
            // this.addChild(this.jackalAnimator);
            this.Reset();
        };
        Jackal.prototype.Update = function () {
            this.position = this.position.Add(this.direction);
            this.CheckBounds();
        };
        Jackal.prototype.getOpositeSide = function () {
            return this.startSide === config.Direction.Right ?
                config.Direction.Left : config.Direction.Right;
        };
        Jackal.prototype.Reset = function () {
            var r = math.randRange(25, 100);
            this.position = new math.Vec2(this.startSide === config.Direction.Left ? -r :
                (objects.Game.canvas.width + r), this.playScene.player.y -
                math.randRange(-50, 50));
            this.direction = math.Vec2.Difference(this.playScene.player.position, this.position).Normalized;
            this.direction = this.direction.ScaleEq(Jackal.speed);
            this.animator.gotoAndPlay('walk_' + config.Direction[this.getOpositeSide()]);
        };
        Jackal.prototype.CheckBounds = function () {
            if ((this.startSide === config.Direction.Left &&
                this.x > (objects.Game.canvas.width + 100)) ||
                this.x < -100) {
                if (!!this.yoinked || this.sweepCount === this.sweeps) {
                    this.Destroy();
                }
                else {
                    this.sweepCount++;
                    this.startSide = this.getOpositeSide();
                    this.Reset();
                }
            }
        };
        Jackal.prototype.yoink = function (item) {
            this.animator.gotoAndPlay('walk_' + config.Direction[this.startSide]);
            this.startSide = this.getOpositeSide();
            this.yoinked = item;
            this.direction = new math.Vec2(-this.direction.x, this.direction.y).ScaleEq(.7);
            this.position = this.position.Add(this.direction);
        };
        Jackal.speed = 9;
        return Jackal;
    }(objects.Enemy));
    objects.Jackal = Jackal;
})(objects || (objects = {}));
//# sourceMappingURL=jackal.js.map
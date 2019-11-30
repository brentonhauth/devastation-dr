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
    var Penguin = /** @class */ (function (_super) {
        __extends(Penguin, _super);
        function Penguin() {
            var _this = _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.getAsset('penguinSheet')],
                frames: { width: 48, height: 48, count: 24 },
                animations: {
                    idle_Down: 1, slide_Down: 13,
                    idle_Left: 4, slide_Left: 16,
                    idle_Right: 7, slide_Right: 19,
                    idle_Up: 10, slide_Up: 22,
                }
            })) || this;
            _this.isAggressive = false;
            _this.setSlideAnimation = false;
            _this.playerRef = _this.playScene.player || { position: math.Vec2.Zero };
            // this.width = 48;
            // this.height = 48;
            _this.Init();
            _this.Reset();
            return _this;
        }
        Penguin.prototype.Reset = function () {
            // let posArr = ['down', 'left', 'right']; // posArr[math.randInt(2)]
            this.animator.gotoAndPlay('idle_' + config.Direction[math.randInt(2, 4)]);
            this.aggressiveRange = math.randInt(350, 450);
            this.spawn = Penguin.randomSpawnPosition();
            this.isAggressive = false;
            this.setSlideAnimation = false;
        };
        Penguin.prototype.Start = function () {
            this.position = this.spawn;
        };
        Penguin.prototype.Update = function () {
            if (this.isAggressive) {
                if (!this.setSlideAnimation) {
                    var slide = void 0, diff = math.Vec2.Difference(this.playerRef.position, this.position).Normalized;
                    if (Math.abs(diff.x) > Math.abs(diff.y)) {
                        slide = diff.x > 0 ? config.Direction.Right : config.Direction.Left;
                    }
                    else {
                        slide = diff.y > 0 ? config.Direction.Down : config.Direction.Up;
                    }
                    this.animator.gotoAndPlay('slide_' + config.Direction[slide]);
                    this.direction = diff.ScaleEq(Penguin.moveSpeed);
                    this.setSlideAnimation = true;
                }
                this.position = this.position.Add(this.direction);
            }
            else if (math.Vec2.WithinRange(this.playerRef.position, this.position, this.aggressiveRange)) {
                this.isAggressive = true;
            }
            else {
                this.position = this.position.Add(new math.Vec2(0, this.playScene.background.Speed));
            }
            if (this.x < -100 || this.x > 700 || this.y < -200 ||
                this.y > (objects.Game.canvas.height + 100)) {
                this.Destroy();
            }
        };
        Penguin.randomSpawnPosition = function () {
            return math.randVec2([1, 600], [-125, -25]);
        };
        Penguin.moveSpeed = 7.5;
        return Penguin;
    }(objects.Enemy));
    objects.Penguin = Penguin;
})(objects || (objects = {}));
//# sourceMappingURL=penguin.js.map
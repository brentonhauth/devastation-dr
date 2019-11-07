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
        function Penguin(spawn, startAggressive) {
            if (spawn === void 0) { spawn = null; }
            if (startAggressive === void 0) { startAggressive = false; }
            var _this = _super.call(this, "penguinSheet") || this;
            _this.isAggressive = false;
            _this.setSlideAnimation = false;
            _this.isDes = false;
            _this.isAggressive = startAggressive;
            _this.aggressiveRange = Math.floor(math.randRange(350, 450));
            _this.spawn = spawn ? spawn : new math.Vec2(math.randRange(1, 600), -math.randRange(25, 125));
            var sheet = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("penguinSheet")],
                frames: { width: 48, height: 48, count: 24 },
                animations: {
                    idle_down: 1, slide_down: 13,
                    idle_left: 4, slide_left: 16,
                    idle_right: 7, slide_right: 19,
                    idle_up: 10, slide_up: 22,
                }
            });
            var cs = objects.Game.currentScene;
            _this.playerRef = cs.player || { position: math.Vec2.Zero };
            var arr = ["down", "left", "right"];
            var da = Math.round(math.randRange(0, 2));
            _this.penguinAnimator = new createjs.Sprite(sheet, "idle_" + arr[da]);
            _this.width = 48;
            _this.height = 48;
            _this.Init();
            return _this;
        }
        Penguin.prototype.Start = function () {
            var _this = this;
            this.removeChild(this.sprite);
            this.addChild(this.penguinAnimator);
            this.position = this.spawn;
            setTimeout(function () {
                if (!_this.isDes) {
                    _this.Destroy();
                }
            }, 8000);
        };
        Penguin.prototype.Update = function () {
            if (this.isAggressive) {
                if (!this.setSlideAnimation) {
                    var slide = void 0, diff = math.Vec2.Difference(this.playerRef.position, this.position).Normalized;
                    if (Math.abs(diff.x) > Math.abs(diff.y)) {
                        slide = diff.x > 0 ? "slide_right" : "slide_left";
                    }
                    else {
                        slide = diff.y > 0 ? "slide_down" : "slide_up";
                    }
                    this.penguinAnimator.gotoAndPlay(slide);
                    this.direction = diff.Scale(Penguin.moveSpeed);
                    this.setSlideAnimation = true;
                }
                this.position = this.position.Add(this.direction);
            }
            else if (math.Vec2.Distance(this.playerRef.position, this.position) < this.aggressiveRange) {
                this.isAggressive = true;
            }
            else {
                this.position = this.position.Add(new math.Vec2(0, 1.5));
            }
            if (this.x < -100 || this.x > 700 ||
                this.y < -200 || this.y > 900) {
                this.Destroy();
            }
        };
        Penguin.prototype.Destroy = function () {
            _super.prototype.Destroy.call(this);
            this.isDes = true;
        };
        Penguin.moveSpeed = 7.5;
        return Penguin;
    }(objects.Enemy));
    objects.Penguin = Penguin;
})(objects || (objects = {}));
//# sourceMappingURL=penguin.js.map
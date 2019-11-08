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
    var PolarBear = /** @class */ (function (_super) {
        __extends(PolarBear, _super);
        function PolarBear() {
            var _this = _super.call(this, "polarBearSheet") || this;
            _this.shootBuffer = 0;
            _this.reachedSpot = false;
            _this.playScene = objects.Game.currentScene;
            _this.startingPosition = new math.Vec2(math.randRange(20, 540), math.randRange(50, 250));
            var speed = .1, sheet = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("polarBearSheet")],
                frames: { width: 72, height: 72, count: 12 },
                animations: {
                    idle_down: 1, idle_left: 4,
                    idle_right: 7, idle_up: 10,
                    move_down: { speed: speed, frames: [0, 1, 2] },
                    move_left: { speed: speed, frames: [3, 4, 5] },
                    move_right: { speed: speed, frames: [6, 7, 8] },
                    move_up: { speed: speed, frames: [9, 10, 11] },
                    throw_down: [0, 1, "idle_down", speed],
                    throw_left: [3, 4, "idle_left", speed],
                    throw_right: [6, 7, "idle_right", speed],
                    throw_up: [9, 10, "idle_up", speed],
                }
            });
            var cs = objects.Game.currentScene;
            _this.playerRef = cs.player || { position: math.Vec2.Zero };
            _this.polarBearAnimator = new createjs.Sprite(sheet, "move_down");
            _this.width = 72;
            _this.height = 72;
            _this.Init();
            return _this;
        }
        PolarBear.prototype.Start = function () {
            this.position = new math.Vec2(this.startingPosition.x, this.startingPosition.y - 200);
            this.removeChild(this.sprite);
            this.addChild(this.polarBearAnimator);
        };
        PolarBear.prototype.Update = function () {
            if (!this.reachedSpot) {
                if (math.Vec2.Distance(this.position, this.startingPosition) < 15) {
                    this.reachedSpot = true;
                }
                else {
                    this.position = this.position.Add(new math.Vec2(0, 6));
                }
            }
            else {
                this.facePlayer();
                if (this.shootBuffer > 0) {
                    this.shootBuffer--;
                }
                else {
                    this.shootBuffer = 20;
                    this.polarBearAnimator.gotoAndPlay("throw_" + this.lastFacing);
                    this.position = this.position.Add(math.Vec2.Down);
                    this.throwFish();
                }
            }
        };
        PolarBear.prototype.facePlayer = function () {
            var face, diff = math.Vec2.Difference(this.position, this.playerRef.position);
            if (Math.abs(diff.x) > Math.abs(diff.y)) {
                face = diff.x < 0 ? "right" : "left";
            }
            else {
                face = diff.y > 0 ? "up" : "down";
            }
            if (this.lastFacing !== face) {
                this.polarBearAnimator.gotoAndPlay("idle_" + face);
                this.lastFacing = face;
            }
        };
        PolarBear.prototype.throwFish = function () {
            var fish = new objects.Fish(this, this.playerRef);
            this.playScene.enemyBulletHandler.AddExistingBullet(fish);
        };
        return PolarBear;
    }(objects.Enemy));
    objects.PolarBear = PolarBear;
})(objects || (objects = {}));
//# sourceMappingURL=polarbear.js.map
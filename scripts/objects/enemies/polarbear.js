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
            var _this = _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.getAsset('polarBearSheet')],
                frames: { width: 72, height: 72, count: 12 },
                animations: {
                    idle_Down: 1, walk_Down: { speed: .1, frames: [0, 1, 2] },
                    idle_Left: 4, walk_Left: { speed: .1, frames: [3, 4, 5] },
                    idle_Right: 7, walk_Right: { speed: .1, frames: [6, 7, 8] },
                    idle_Up: 10, walk_Up: { speed: .1, frames: [9, 10, 11] },
                }
            })) || this;
            _this.reachedSpot = false;
            _this.playerRef = _this.playScene.player || { position: math.Vec2.Zero };
            // this.width = 72;
            // this.height = 72;
            _this.Init();
            _this.Reset();
            return _this;
        }
        PolarBear.prototype.Start = function () {
            this.position = new math.Vec2(this.startingPosition.x, this.startingPosition.y - math.randRange(250, 350));
        };
        PolarBear.prototype.Reset = function () {
            this.startingPosition = math.randVec2([30, 540], [50, 250]);
            this.animator.gotoAndPlay('walk_Down');
            this.reachedSpot = false;
        };
        PolarBear.prototype.Update = function () {
            if (!this.reachedSpot) {
                if (math.Vec2.WithinRange(this.position, this.startingPosition, 15)) {
                    this.reachedSpot = true;
                }
                else {
                    this.position = this.position.Add(new math.Vec2(0, 6));
                }
            }
            else {
                this.facePlayer();
                if (!(createjs.Ticker.getTicks() % 20)) {
                    this.throwFish();
                }
                this.position = this.position.Add(new math.Vec2(0, this.playScene.background.Speed));
            }
            if (this.y > (objects.Game.canvas.height + 100)) {
                this.Destroy();
            }
        };
        PolarBear.prototype.facePlayer = function () {
            var face, diff = math.Vec2.Difference(this.position, this.playerRef.position);
            if (Math.abs(diff.x) > Math.abs(diff.y)) {
                face = diff.x < 0 ? config.Direction.Right : config.Direction.Left;
            }
            else {
                face = diff.y > 0 ? config.Direction.Up : config.Direction.Down;
            }
            if (this.lastFacing !== face) {
                this.animator.gotoAndPlay('idle_' + config.Direction[face]);
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
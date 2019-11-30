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
    var Turtle = /** @class */ (function (_super) {
        __extends(Turtle, _super);
        function Turtle(spawn) {
            var _this = _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.getAsset('turtleSheet')],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    shell: 10,
                    idle_down: 1, walk_down: { speed: .1, frames: [0, 1, 2] },
                    idle_left: 4, walk_left: { speed: .1, frames: [3, 4, 5] },
                    idle_right: 7, walk_right: { speed: .1, frames: [6, 7, 8] },
                    idle_up: 9, walk_up: { speed: .1, frames: [9, 11] },
                }
            })) || this;
            _this.isAggressive = false;
            _this.spawn = spawn ? spawn : Turtle.randomStartPosition();
            _this.playerRef = _this.playScene.player || { position: math.Vec2.Zero };
            // this.width = 48;
            // this.height = 48;
            _this.Init();
            _this.Reset();
            return _this;
        }
        Turtle.prototype.Start = function () {
            this.position = this.spawn;
            this.animator.x = this.animator.y = 24;
            this.animator.regX = 24;
            this.animator.regY = 30;
        };
        Turtle.prototype.Update = function () {
            if (this.isAggressive) {
                var tick = createjs.Ticker.getTicks();
                this.animator.gotoAndPlay('shell');
                this.animator.rotation += 10;
                if (!(tick % 10)) {
                    var point = math.pointOnCircle(this.position, (tick * 2) % 360);
                    var b = new objects.EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(b);
                }
                this.position = this.position.Add(new math.Vec2(0, this.playScene.background.Speed));
            }
            else if (math.Vec2.WithinRange(this.playerRef.position, this.position, this.aggressiveRange)) {
                this.isAggressive = true;
            }
            else {
                this.position = this.position.Add(new math.Vec2(0, 3));
            }
            if (this.y > objects.Game.canvas.height) {
                this.Destroy();
            }
        };
        Turtle.prototype.Reset = function () {
            this.spawn = Turtle.randomStartPosition();
            this.isAggressive = false;
            this.aggressiveRange = math.randInt(350, 450);
            this.animator.gotoAndPlay('walk_down');
            this.animator.rotation = 0;
        };
        Turtle.randomStartPosition = function () {
            return new math.Vec2(math.randRange(1, 600), -math.randRange(25, 125));
        };
        return Turtle;
    }(objects.Enemy));
    objects.Turtle = Turtle;
})(objects || (objects = {}));
//# sourceMappingURL=turtle.js.map
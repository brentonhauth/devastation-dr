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
            if (spawn === void 0) { spawn = null; }
            var _this = _super.call(this, "turtleSheet") || this;
            _this.isAggressive = false;
            _this.shootDegree = 0;
            _this.spawn = spawn ? spawn : new math.Vec2(math.randRange(1, 600), -math.randRange(25, 125));
            _this.aggressiveRange = Math.floor(math.randRange(350, 450));
            var speed = .1, sheet = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("turtleSheet")],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    shell: 10,
                    idle_down: 1, walk_down: { speed: speed, frames: [0, 1, 2] },
                    idle_left: 4, walk_left: { speed: speed, frames: [3, 4, 5] },
                    idle_right: 7, walk_right: { speed: speed, frames: [6, 7, 8] },
                    idle_up: 9, walk_up: { speed: speed, frames: [9, 11] },
                }
            });
            var cs = objects.Game.currentScene;
            _this.playerRef = cs.player || { position: math.Vec2.Zero };
            _this.turtleAnimator = new createjs.Sprite(sheet, "walk_down");
            _this.width = 48;
            _this.height = 48;
            _this.Init();
            return _this;
        }
        Turtle.prototype.Start = function () {
            this.removeChild(this.sprite);
            this.addChild(this.turtleAnimator);
            this.position = this.spawn;
            this.turtleAnimator.x = this.turtleAnimator.y = 24;
            this.turtleAnimator.regX = 24;
            this.turtleAnimator.regY = 30;
        };
        Turtle.prototype.Update = function () {
            if (this.isAggressive) {
                var tick = createjs.Ticker.getTicks();
                this.turtleAnimator.gotoAndPlay("shell");
                this.turtleAnimator.rotation += 10;
                if ((tick % 10) === 0) {
                    var point = math.pointOnCircle(this.position, (tick * 2) % 360);
                    var cs = objects.Game.currentScene;
                    var b = new objects.EnemyBullet(this.position, point, this, cs.enemyBulletHandler);
                    cs.enemyBulletHandler.AddExistingBullet(b);
                }
                this.position = this.position.Add(new math.Vec2(0, .5));
            }
            else if (math.Vec2.Distance(this.playerRef.position, this.position) < this.aggressiveRange) {
                this.isAggressive = true;
            }
            else {
                this.position = this.position.Add(new math.Vec2(0, 3));
            }
        };
        return Turtle;
    }(objects.Enemy));
    objects.Turtle = Turtle;
})(objects || (objects = {}));
//# sourceMappingURL=turtle.js.map
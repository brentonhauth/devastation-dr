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
    var Lizard = /** @class */ (function (_super) {
        __extends(Lizard, _super);
        function Lizard(enemyHandler) {
            if (enemyHandler === void 0) { enemyHandler = null; }
            var _this = _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.getAsset('lizardSheet')],
                frames: { width: 96, height: 96, count: 12 },
                animations: {
                    move: { speed: .1, frames: [0, 1, 2] }
                }
            })) || this;
            _this.scaleX = 1.5;
            _this.scaleY = 1.5;
            // let bounds = this.sprite.getBounds();
            // this.width = bounds.width;
            // this.height = bounds.height;
            // this.removeChild(this.sprite);
            // this.addChild(this.lizardAnimator);
            _this.Init();
            // this.lastPlayerPos = new math.Vec2();
            _this.enemyBullets = new Array(0);
            _this.Reset();
            return _this;
        }
        Lizard.prototype.Start = function () {
            this.animator.gotoAndPlay('move');
        };
        Lizard.prototype.Reset = function () {
            this.yCenterAxis = math.randInt(250, 350);
            this.cosWave = math.cosWaveFunction(math.randInt(20, 50), math.randInt(50, 250));
            var y = math.randInt(-500, -100);
            this.position = new math.Vec2(this.yCenterAxis, y);
        };
        /*
        public setLastPlayerPos(x: number, y: number) {
            this.lastPlayerPos = new math.Vec2(x, y);
        }
        */
        Lizard.prototype.Update = function () {
            this.Move();
            if (this.y >= 0 && this.y <= objects.Game.canvas.height) {
                this.SpawnBullet();
            }
        };
        Lizard.prototype.Move = function () {
            var y = this.y + 1;
            if (y > Lizard.yBounds) {
                return this.Reset();
            }
            var x = this.cosWave(y) + this.yCenterAxis;
            this.position = new math.Vec2(x, y);
        };
        Lizard.prototype.SpawnBullet = function () {
            if (createjs.Ticker.getTicks() % 3) {
                return;
            }
            if (math.oneIn(10)) {
                managers.Sound.sfx('spitVenom');
                this.playScene.AddEnemyBullet(this);
            }
        };
        Lizard.yBounds = 970; // canvas.height + 400
        return Lizard;
    }(objects.Enemy));
    objects.Lizard = Lizard;
})(objects || (objects = {}));
//# sourceMappingURL=lizard.js.map
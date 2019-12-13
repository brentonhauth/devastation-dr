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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // Constructor
        function Enemy(sprite) {
            var _this = _super.call(this) || this;
            _this.playScene = objects.Game.currentScene;
            if (sprite) {
                var isStr = void 0, isSheet = void 0, isSprite = true;
                if ((isStr = typeof sprite === 'string') || sprite instanceof createjs.Bitmap) {
                    _this.sprite = sprite = !isStr ? sprite : new createjs.Bitmap(objects.Game.getAsset(sprite));
                    _this.addChild(_this.sprite);
                }
                else if ((isSheet = sprite instanceof createjs.SpriteSheet) || sprite instanceof createjs.Sprite) {
                    _this.animator = sprite = !isSheet ? sprite :
                        new createjs.Sprite(sprite);
                    _this.addChild(_this.animator);
                    _this.animator.stop();
                }
                else {
                    isSprite = false;
                }
                if (isSprite) {
                    var bounds = sprite.getBounds();
                    _this.width = bounds.width;
                    _this.height = bounds.height;
                }
            }
            // this.sprite = new createjs.Bitmap(objects.Game.getAsset(enemyType));
            // this.addChild(this.sprite);
            // let bounds = this.sprite.getBounds();
            // this.width = bounds.width;
            // this.height = bounds.height;
            _this.Init();
            return _this;
            //this.pointsWorth = pointsWorth;
            // this.Start();
        }
        // Methods
        Enemy.prototype.Start = function () {
            this.Reset();
        };
        Enemy.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Enemy.prototype.Reset = function () {
            var x = Math.floor(Math.random() * 550) + 50;
            var y = Math.floor(Math.random() * -800) - 50;
            this.position = new math.Vec2(x, y);
        };
        // public Move():void {
        //     this.y += 5;
        // }
        Enemy.prototype.CheckBounds = function () {
            if (this.y >= 900 + this.halfH + 5) {
                this.Reset();
            }
        };
        Enemy.prototype.Destroy = function () {
            var curWave;
            if (curWave = this.playScene.waveHandler.currentWave) {
                if (this.animator) {
                    this.animator.stop();
                }
                curWave.Remove(this);
            }
        };
        Enemy.prototype.Pool = function () { };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map
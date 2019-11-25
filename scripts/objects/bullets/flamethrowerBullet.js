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
    var FlamethrowerBullet = /** @class */ (function (_super) {
        __extends(FlamethrowerBullet, _super);
        function FlamethrowerBullet(x, y, bulletType, bulletHandler) {
            var _this = _super.call(this, x, y, bulletType) || this;
            _this.position = new math.Vec2(x, y);
            _this.bulletHandler = bulletHandler;
            _this.Start();
            var sheet = new createjs.SpriteSheet({
                images: [objects.Game.getAsset('flameStartSheet')],
                frames: { width: 40, height: 150, count: 9 },
                animations: {
                    //flameIdle: {speed:speed, frames: [8], next:"flameStart"},
                    //flameStart: { speed: speed, frames: [0, 1, 2, 3, 4 , 5, 6, 7, 8], next: "flameIdle"}
                    flameIdle: [7, 8, true, 0.4],
                    flameStart: [0, 8, "flameIdle", 0.5]
                }
            });
            //this.flameAnimator = new createjs.Sprite(sheet, "flameStart");
            _this.flameAnimator = new createjs.Sprite(sheet, "flameStart");
            //this.bulletHandler.playScene.addChild(this.flameAnimator);
            _this.removeChild(_this.sprite);
            _this.addChild(_this.flameAnimator);
            return _this;
            //console.log(this.flameAnimator);
            //this.flameAnimator.gotoAndPlay("flameStart");
            //this.flameAnimator.play();
        }
        FlamethrowerBullet.prototype.checkSpawnItem = function (obj) {
            var spawnItem = false;
            var playScene = this.bulletHandler.playScene;
            if (obj instanceof objects.Jackal) {
                // TODO: improve upon 'yoink' system with Jackals
                if (obj.yoinked) {
                    spawnItem = true;
                }
            }
            else {
                //let rr = Math.floor(math.randRange(1, 1));
                var rr = Math.floor(math.randRange(1, 5));
                if (rr == 1) {
                    spawnItem = true;
                }
            }
            if (spawnItem) {
                playScene.AddEnemyItem(obj);
            }
        };
        FlamethrowerBullet.prototype.OnCollision = function (obj) {
            var playScene = this.bulletHandler.playScene;
            if (obj instanceof objects.Enemy) {
                this.checkSpawnItem(obj);
                obj.Destroy();
                //this.Destroy();
                var points = obj instanceof objects.Lizard ? 300 : 100;
                playScene.score.addPoints(points);
            }
        };
        FlamethrowerBullet.prototype.Update = function () {
            //console.log(this.flameAnimator.currentFrame);
            this.Move();
            this.CheckBounds();
        };
        FlamethrowerBullet.prototype.Move = function () {
            var player = this.bulletHandler.playScene.player;
            //this.x = this.bulletHandler.playScene.player.x;
            var x = player.x;
            var y = player.y - player.height;
            //this.y = this.bulletHandler.playScene.player.y;
            //this.y = this.bulletHandler.playScene.player.boxCollider.aabb.min.y
            this.position = new math.Vec2(x, y);
        };
        FlamethrowerBullet.prototype.Destroy = function () {
            this.bulletHandler.DestroyBullet(this);
        };
        return FlamethrowerBullet;
    }(objects.Bullet));
    objects.FlamethrowerBullet = FlamethrowerBullet;
})(objects || (objects = {}));
//# sourceMappingURL=flamethrowerBullet.js.map
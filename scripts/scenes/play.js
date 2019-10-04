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
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Constructor
        function PlayScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Methods
        PlayScene.prototype.Start = function () {
            var _this = this;
            // Initialize our variables
            this.background = new objects.Background();
            this.player = new objects.Player();
            this.lifeCounter = new hud.LifeCounter();
            // this.enemy = new objects.Enemy(this.assetManager);
            this.enemies = new Array();
            this.score = new hud.Score();
            this.enemyNum = 5;
            this.bullets = new Array(0);
            for (var i = 0; i < this.enemyNum; i++) {
                if (i == 0) {
                    this.enemies[i] = new objects.Lizard();
                }
                else {
                    this.enemies[i] = new objects.Spider();
                }
            }
            managers.Input.keypress(' ', function () {
                var bullet = new objects.Bullet(_this.player.x, _this.player.y);
                _this.bullets.push(bullet);
                _this.addChild(bullet);
                //var fn: any = bullet.Destroy;
                bullet.Destroy = function () {
                    var b = _this.bullets.shift();
                    if (!b)
                        return;
                    b.isDestroyed = true;
                    _this.removeChild(b);
                };
            });
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
            // Update the background here
            this.background.Update();
            this.player.Update();
            // this.enemy.Update();
            this.score.updateText();
            this.lifeCounter.text("" + this.player.lives);
            this.enemies.forEach(function (e) {
                if (e instanceof objects.Lizard) {
                    e.setLastPlayerPos(_this.player.x, _this.player.y);
                }
                e.Update();
                managers.Collision.Check(_this.player, e);
            });
            this.bullets.forEach(function (b) {
                if (!b.isDestroyed) {
                    b.Update();
                    _this.enemies.forEach(function (e) {
                        managers.Collision.Check(b, e);
                    });
                }
            });
        };
        PlayScene.prototype.Main = function () {
            var _this = this;
            // Order matters when adding game objects.
            this.addChild(this.background);
            this.addChild(this.player);
            this.addChild(this.lifeCounter);
            this.addChild(this.score);
            // this.addChild(this.enemy);
            this.enemies.forEach(function (e) {
                _this.addChild(e);
            });
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map
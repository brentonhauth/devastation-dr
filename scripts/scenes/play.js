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
        function PlayScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            createjs.Sound.play("cyberpunker");
            this.background = new objects.Background();
            this.player = new objects.Player();
            this.lifeCounter = new hud.LifeCounter();
            this.score = new hud.Score();
            this.playerBulletHandler = new objects.PlayerBulletHandler(this);
            this.enemyBulletHandler = new objects.EnemyBulletHandler(this);
            this.enemyHandler = new objects.EnemyHandler(this);
            this.initEventHandlers();
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.background.Update();
            this.player.Update();
            this.score.updateText();
            this.lifeCounter.text("" + this.player.lives);
            this.playerBulletHandler.Update();
            this.enemyHandler.Update();
            this.enemyBulletHandler.Update();
            this.enemyHandler.CheckCollision();
            this.enemyBulletHandler.CheckCollision();
            this.playerBulletHandler.CheckCollision();
        };
        PlayScene.prototype.Main = function () {
            var _this = this;
            // Order matters when adding game objects.
            this.addChild(this.background);
            this.addChild(this.player);
            this.addChild(this.lifeCounter);
            this.addChild(this.score);
            this.enemyHandler.enemies.forEach(function (e) {
                _this.addChild(e);
            });
        };
        PlayScene.prototype.initEventHandlers = function () {
            var playScene = this;
            managers.Input.keypress(" ", function () { playScene.AddBullet(playScene); });
        };
        PlayScene.prototype.AddBullet = function (playScene) {
            var bullet = playScene.playerBulletHandler.SpawnBullet();
            playScene.addChild(bullet);
        };
        PlayScene.prototype.RemoveBullet = function (bullet) {
            this.removeChild(bullet);
        };
        PlayScene.prototype.AddEnemyBullet = function (enemy) {
            var bullet = this.enemyBulletHandler.SpawnBullet(enemy);
            this.addChild(bullet);
        };
        PlayScene.prototype.RemoveEnemyBullet = function (bullet) {
            this.removeChild(bullet);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map
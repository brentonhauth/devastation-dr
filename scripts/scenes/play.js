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
            managers.Sound.music("cyberpunker");
            this.background = new objects.Background();
            this.player = new objects.Player();
            this.lifeCounter = new hud.LifeCounter();
            this.score = new hud.Score();
            this.playerBulletHandler = new handlers.PlayerBulletHandler(this);
            this.enemyBulletHandler = new handlers.EnemyBulletHandler(this);
            this.enemyHandler = new handlers.EnemyHandler(this);
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.background.Update();
            this.player.Update();
            this.score.updateText();
            this.lifeCounter.text(this.player.lives);
            this.enemyHandler.Update();
            this.enemyHandler.CheckCollision(this.player);
            this.enemyBulletHandler.UpdateAndCheckCollision(this.player);
            this.playerBulletHandler.UpdateAndCheckCollision(this.enemyHandler.enemies);
            if (managers.Keyboard.pressed(config.Key.Space)) {
                this.AddBullet();
            }
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
        PlayScene.prototype.AddBullet = function () {
            var bullet = this.playerBulletHandler.SpawnBullet();
            this.addChild(bullet);
        };
        PlayScene.prototype.AddEnemyBullet = function (enemy) {
            var bullet = this.enemyBulletHandler.SpawnBullet(enemy);
            this.addChild(bullet);
        };
        return PlayScene;
    }(scenes.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map
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
            var levelType = config.Scene[objects.Game.currentState];
            _this.background = new objects.Background(levelType.toLowerCase());
            _this.player = new objects.Player(_this);
            _this.lifeCounter = new hud.LifeCounter();
            _this.score = new hud.Score();
            _this.weaponHUD = new hud.WeaponHUD();
            _this.playerBulletHandler = new handlers.PlayerBulletHandler(_this);
            _this.enemyBulletHandler = new handlers.EnemyBulletHandler(_this);
            _this.enemyHandler = new handlers.EnemyHandler(_this);
            _this.dialogHandler = new handlers.DialogHandler(_this);
            _this.waveHandler = new handlers.WaveHandler(_this);
            _this.enemyItemHandler = new handlers.EnemyItemHandler(_this);
            return _this;
        }
        PlayScene.prototype.Start = function () {
            this.addChild(this.background);
            this.addChild(this.player);
            this.addChild(this.lifeCounter);
            this.addChild(this.score);
            this.addChild(this.weaponHUD);
            this.dialogHandler.AppendDialogBox();
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.background.Update();
            this.player.Update();
            this.waveHandler.Update();
            this.waveHandler.CheckCollision(this.player);
            this.enemyBulletHandler.UpdateAndCheckCollision(this.player);
            this.playerBulletHandler.UpdateAndCheckCollision(this.waveHandler.ActiveEnemies);
            this.enemyItemHandler.Update();
            this.enemyItemHandler.CheckCollision(this.player);
            if (managers.Keyboard.down(config.Key.Space)) {
                this.player.ShootWeapon();
            }
        };
        PlayScene.prototype.AddEnemyBullet = function (enemy) {
            var bullet = this.enemyBulletHandler.SpawnBullet(enemy);
            this.addChild(bullet);
        };
        PlayScene.prototype.AddEnemyItem = function (enemy) {
            var item = this.enemyItemHandler.SpawnItem(enemy);
            this.addChild(item);
        };
        return PlayScene;
    }(scenes.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map
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
            return _super.call(this) || this;
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
            this.dialogHandler = new handlers.DialogHandler(this);
            this.waveHandler = new handlers.WaveHandler(this);
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            if (this.waveHandler.CompletedAllWaves) {
                this.dialogHandler.TriggerMany(["You've beaten all of the enemies.", 3], ["At this point you would move onto the next scene!", 4]);
            }
            this.background.Update();
            this.player.Update();
            this.score.updateText();
            this.lifeCounter.text(this.player.lives);
            // this.enemyHandler.Update();
            // this.enemyHandler.CheckCollision(this.player);
            this.waveHandler.Update();
            this.waveHandler.CheckCollision(this.player);
            this.enemyBulletHandler.UpdateAndCheckCollision(this.player);
            this.playerBulletHandler.UpdateAndCheckCollision(this.waveHandler.ActiveEnemies);
            if (managers.Keyboard.down(config.Key.Space)) {
                this.AddBullet();
            }
            if (managers.Keyboard.pressed(config.Key.F)) {
                this.dialogHandler.TriggerMany(["You pressed F!", 3], ["This will disapear after 2 seconds", 2], ["5", 1], ["4", 1], ["3", 1], ["2", 1], ["1", 1], ["Blastoff!", 3]);
                // this.dialogHandler.Trigger("You pressed F!", 3);
                // this.dialogHandler.Trigger("This will disapear after 2 seconds", 2);
                // this.dialogHandler.Trigger("5", 1);
                // this.dialogHandler.Trigger("4", 1);
                // this.dialogHandler.Trigger("3", 1);
                // this.dialogHandler.Trigger("2", 1);
                // this.dialogHandler.Trigger("1", 1);
                // this.dialogHandler.Trigger("Blastoff!", 3);
            }
        };
        PlayScene.prototype.Main = function () {
            // Order matters when adding game objects.
            this.addChild(this.background);
            this.addChild(this.player);
            this.addChild(this.lifeCounter);
            this.addChild(this.score);
            // this.enemyHandler.enemies.forEach(e => {
            //     this.addChild(e);
            // });
            this.dialogHandler.AppendDialogBox();
            var wave1 = new objects.Wave(new objects.Spider(), new objects.Spider(), new objects.Spider(), new objects.Spider(), new objects.Spider());
            var wave2 = new objects.Wave();
            wave2.Add(new objects.Spider(), new objects.Spider(), new objects.Lizard(), new objects.Spider(), new objects.Spider(), new objects.Spider(), new objects.Lizard());
            wave1.AddAmount(objects.Spider, 20);
            wave1.Behavior(objects.Spider, function (x, y, index) {
                if (index % 2 === 0) {
                    x += 5;
                    if (x > 760) {
                        x = 0;
                    }
                }
                else {
                    x -= 5;
                    if (x < 0) {
                        x = 760;
                    }
                }
                y += 1;
                if (y > 700) {
                    y = -100;
                }
                return new math.Vec2(x, y);
            });
            this.waveHandler.Add(wave1, wave2);
            this.waveHandler.Start();
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
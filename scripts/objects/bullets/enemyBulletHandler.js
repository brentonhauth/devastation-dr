var objects;
(function (objects) {
    var EnemyBulletHandler = /** @class */ (function () {
        function EnemyBulletHandler(playScene) {
            this.playScene = playScene;
            this.enemyBullets = new Array();
        }
        EnemyBulletHandler.prototype.SpawnEnemyBullet = function () {
            /*
            let eb = new objects.EnemyBullet(new math.Vec2(this.x, this.y), this.lastPlayerPos);
            objects.Game.currentSceneRef.addChild(eb);
            this.enemyBullets.push(eb);
            */
        };
        EnemyBulletHandler.prototype.CheckCollision = function () {
            this.enemyBullets.forEach(function (eb) {
                if (!eb.isDestroyed) {
                    eb.Update();
                    if (objects.Game.currentSceneRef instanceof scenes.PlayScene) {
                        managers.Collision.Check(objects.Game.currentSceneRef.player, eb);
                    }
                }
            });
        };
        return EnemyBulletHandler;
    }());
    objects.EnemyBulletHandler = EnemyBulletHandler;
})(objects || (objects = {}));
//# sourceMappingURL=enemyBulletHandler.js.map
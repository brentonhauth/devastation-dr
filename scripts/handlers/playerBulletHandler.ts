module handlers {
    export class PlayerBulletHandler extends BulletHandler {

        constructor(playScene:scenes.PlayScene) {
            super(playScene);
        }

        public SpawnBullet(position: math.Vec2, bulletType: config.BulletType, bulletDirection = config.BulletDirection.NORTH):objects.PlayerBullet {
            
            let bullet;

            if (bulletType == config.BulletType.MACHINEGUN)
            {
                bullet = new objects.MachineGunBullet(position.x, position.y, bulletDirection, this);
            }
            else
            {
                bullet = new objects.PlayerBullet(position.x, position.y, bulletType, this);
            }
            this.bullets[bullet.id] = bullet;

            return bullet;
        }

        public CheckCollision(enemies: any[]){
            //this.bullets.forEach(b => {
            for(let key in this.bullets)
            {
                let b = this.bullets[key];
                enemies.forEach(e => {
                    managers.Collision.Check(b, e);
                });
            };
        }

        public DestroyBullet(bullet) {
            delete this.bullets[bullet.id];
            this.playScene.removeChild(bullet);
        }
    }
}
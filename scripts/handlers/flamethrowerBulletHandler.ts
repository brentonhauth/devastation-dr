module handlers {
    export class FlamethrowerBulletHandler extends BulletHandler {

        public activeFlame: objects.FlamethrowerBullet;
        public isActive: boolean;

        constructor(playScene:scenes.PlayScene) {
            super(playScene);
        }

        public SpawnBullet(position: math.Vec2, bulletType: config.BulletType):objects.PlayerBullet {
            let bullet;
            if (!this.isActive)
            {
                bullet = new objects.FlamethrowerBullet(position.x, position.y, bulletType, this);
                this.bullets[bullet.id] = bullet;
                this.activeFlame = bullet;
                this.isActive = true;
            }
            else
            {
                bullet = this.activeFlame;
            }
            
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

        public StopFlame() {
            if (this.isActive)
            {
                delete this.bullets[this.activeFlame.id];
                this.playScene.removeChild(this.activeFlame);
                this.isActive = false;
            }
        }
    }
}
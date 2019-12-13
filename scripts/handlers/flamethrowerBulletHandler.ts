module handlers {
    export class FlamethrowerBulletHandler extends BulletHandler {

        public activeFlame: objects.FlamethrowerBullet;
        public activeFlameEast: objects.FlamethrowerBullet;
        public activeFlameWest: objects.FlamethrowerBullet;
        public isActive: boolean;
        public isActiveEast: boolean;
        public isActiveWest: boolean;

        constructor(playScene:scenes.PlayScene) {
            super(playScene);
        }

        public SpawnBullet(position: math.Vec2, bulletType: config.BulletType, bulletDirection:config.BulletDirection):objects.PlayerBullet {
            
            let bullet;

            if (bulletDirection == config.BulletDirection.NORTH)
            {
                if (!this.isActive)
                {
                    bullet = new objects.FlamethrowerBullet(position.x, position.y, bulletDirection, this);
                    this.bullets[bullet.id] = bullet;
                    this.activeFlame = bullet;
                    this.isActive = true;
                }
                else
                {
                    bullet = this.activeFlame;
                }
            }
            if (bulletDirection == config.BulletDirection.EAST)
            {
                if (!this.isActiveEast)
                {
                    bullet = new objects.FlamethrowerBullet(position.x, position.y, bulletDirection, this, 1);
                    this.bullets[bullet.id] = bullet;
                    this.activeFlameEast = bullet;
                    this.isActiveEast = true;
                }
                else
                {
                    bullet = this.activeFlameEast;
                }
            }
            if (bulletDirection == config.BulletDirection.WEST)
            {
                if (!this.isActiveWest)
                {
                    bullet = new objects.FlamethrowerBullet(position.x, position.y, bulletDirection, this, 2);
                    this.bullets[bullet.id] = bullet;
                    this.activeFlameWest = bullet;
                    this.isActiveWest = true;
                }
                else
                {
                    bullet = this.activeFlameWest;
                }
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
                //delete this.bullets[this.activeFlame.id];
                for(let key in this.bullets)
                {
                    let b = this.bullets[key];
                    this.playScene.removeChild(b);

                    delete this.bullets[b.id];
                };
                //this.playScene.removeChild(this.activeFlame);
                this.isActive = false;
                this.isActiveEast = false;
                this.isActiveWest = false;
            }
        }
    }
}
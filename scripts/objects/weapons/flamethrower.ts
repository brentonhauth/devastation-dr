module objects {
    export class Flamethrower extends objects.Weapon {

        playScene: scenes.PlayScene;
        isShooting: boolean;

        constructor(playScene: scenes.PlayScene) {
            super(config.Weapon.FLAMETHROWER);
            this.playScene = playScene;
        }

        public Shoot(): void {
            let player = this.playScene.player;
            let bulletType = config.BulletType.FLAMETHROWER

            if (this.upgradeLevel == 1)
            {
                let position1 = new math.Vec2(player.x, player.y - player.height);
                //let bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType);
                let bullet1 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
    
                this.playScene.addChild(bullet1);
            }
            else if (this.upgradeLevel == 2)
            {
                let position1 = new math.Vec2(player.x, player.y - player.height);
                let position2 = new math.Vec2(player.x, player.y - player.height);

                let bullet1 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                let bullet2 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.EAST);

                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
            }           
            else if (this.upgradeLevel >= 3)
            {
                let position1 = new math.Vec2(player.x, player.y - player.height);
                let position2 = new math.Vec2(player.x, player.y - player.height);
                let position3 = new math.Vec2(player.x, player.y - player.height);

                let bullet1 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                let bullet2 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.EAST);
                let bullet3 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position3, bulletType, config.BulletDirection.WEST);

                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
                this.playScene.addChild(bullet3);
            }

            this.isShooting = true;
        }

        public stopShooting(): void {
            this.isShooting = false;
            this.playScene.flamethrowerBulletHandler.StopFlame();
        }
    }
}
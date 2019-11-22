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

            let position1 = new math.Vec2(player.x, player.y - player.height);
            //let bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType);
            let bullet1 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position1, bulletType);

            this.playScene.addChild(bullet1);

            if (this.upgradeLevel == 1)
            {

            }

            this.isShooting = true;
        }

        public stopShooting(): void {
            this.isShooting = false;
            this.playScene.flamethrowerBulletHandler.StopFlame();
        }
    }
}
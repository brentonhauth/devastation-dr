module objects {
    export class MachineGun extends objects.Weapon {

        playScene: scenes.PlayScene;

        constructor(playScene: scenes.PlayScene) {
            super(config.Weapon.MACHINEGUN);
            this.playScene = playScene;
        }

        public Shoot(): void {
            let player = this.playScene.player;
            let bulletType = config.BulletType.MACHINEGUN
            if (this.upgradeLevel == 1)
            {
                let position1 = new math.Vec2(player.x, player.y);
                let bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType);
                this.playScene.addChild(bullet1);
            }
            else if (this.upgradeLevel == 2)
            {
                let position1 = new math.Vec2(player.x - 15, player.y);
                let position2 = new math.Vec2(player.x + 15, player.y);

                let bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType);
                let bullet2 = this.playScene.playerBulletHandler.SpawnBullet(position2, bulletType);

                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
            }
            else if (this.upgradeLevel >= 3)
            {
                let position1 = new math.Vec2(player.x - 30, player.y);
                let position2 = new math.Vec2(player.x + 30, player.y);
                let position3 = new math.Vec2(player.x, player.y);

                let bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType);
                let bullet2 = this.playScene.playerBulletHandler.SpawnBullet(position2, bulletType);
                let bullet3 = this.playScene.playerBulletHandler.SpawnBullet(position3, bulletType);

                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
                this.playScene.addChild(bullet3);
            }
            
        }
    }
}
module objects {
    export class Pistol extends objects.Weapon {

        public playScene: scenes.PlayScene;

        constructor(playScene: scenes.PlayScene) {
            super(config.Weapon.PISTOL);
            this.playScene = playScene;  
        }

        public Shoot(): void {
            let player = this.playScene.player;
            let bulletType = config.BulletType.PISTOL;
            let position = new math.Vec2(player.x, player.y);
            player.position;
            
            let bullet = this.playScene.playerBulletHandler.SpawnBullet(position, bulletType);
            this.playScene.addChild(bullet);
        }
    }
}
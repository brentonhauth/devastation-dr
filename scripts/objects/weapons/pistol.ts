module objects {
    export class Pistol extends objects.Weapon {

        public playScene: scenes.PlayScene;

        constructor(playScene: scenes.PlayScene) {
            super(config.Weapon.PISTOL);
            this.playScene = playScene;

            
        }

        public Shoot(): void {
            let player = this.playScene.player;
            let position = new math.Vec2(player.x, player.y);
            let bullet = this.playScene.playerBulletHandler.SpawnBullet(position);
            this.playScene.addChild(bullet);
        }
    }
}
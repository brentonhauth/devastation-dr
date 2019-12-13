module objects {
    export class Fish extends EnemyBullet {


        // private sprite: createjs.Bitmap;

        constructor(enemy: Enemy, player: Player) {
            super(enemy.position, player.position, enemy,
                (<scenes.PlayScene>objects.Game.currentScene).enemyBulletHandler
            );

            this.speed = 2.75;

            this.width = 20;
            this.height = 20;
            
            this.Init();
            
            this.removeChild(this.sprite)
            this.sprite = new createjs.Bitmap(objects.Game.getAsset('fish'));
            this.addChild(this.sprite);
            this.sprite.regX = 18;
            this.sprite.regY = 8;
            this.sprite.x = 9;
            this.sprite.y = 4;
        }

        public Update() {
            super.Update();

            this.sprite.rotation += 5;
            if (this.sprite.rotation >= 354) {
                this.sprite.rotation = 0;
            }
        }
    }
}

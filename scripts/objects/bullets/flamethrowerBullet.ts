module objects {
    export class FlamethrowerBullet extends objects.Bullet {

        public flameAnimator:createjs.Sprite;
        public bulletHandler:handlers.PlayerBulletHandler;

        constructor(x:number, y:number, bulletType:config.BulletType, bulletHandler: handlers.PlayerBulletHandler) {
            super(x, y, bulletType);
            this.position = new math.Vec2(x, y);
            this.bulletHandler = bulletHandler;

            this.Start();

            let sheet = new createjs.SpriteSheet({
                images: [objects.Game.getAsset('flameStartSheet')],
                frames: { width: 40, height: 150, count: 9 },
                animations: {
                    //flameIdle: {speed:speed, frames: [8], next:"flameStart"},
                    //flameStart: { speed: speed, frames: [0, 1, 2, 3, 4 , 5, 6, 7, 8], next: "flameIdle"}
                    flameIdle: [7,8,true,0.4],
                    flameStart: [ 0,8, "flameIdle", 0.5]
                }
            });
            

            //this.flameAnimator = new createjs.Sprite(sheet, "flameStart");
            this.flameAnimator = new createjs.Sprite(sheet,"flameStart");

            //this.bulletHandler.playScene.addChild(this.flameAnimator);
            this.removeChild(this.sprite);
            this.addChild(this.flameAnimator);
            //console.log(this.flameAnimator);
            //this.flameAnimator.gotoAndPlay("flameStart");
            //this.flameAnimator.play();
        }

        private checkSpawnItem(obj: objects.Enemy): void {
            let spawnItem = false;
            let playScene = this.bulletHandler.playScene;

            if (obj instanceof objects.Jackal) {
                // TODO: improve upon 'yoink' system with Jackals
                if (obj.yoinked) {
                    spawnItem = true;
                }
            } else {
                //let rr = Math.floor(math.randRange(1, 1));
                let rr = Math.floor(math.randRange(1, 5));
                if (rr == 1)
                {
                    spawnItem = true;
                }
            }

            if (spawnItem) {
                playScene.AddEnemyItem(obj);
            }
        
        }
        public OnCollision(obj: objects.GameObject): void {
            let playScene = this.bulletHandler.playScene;

            if (obj instanceof objects.Enemy) {

                this.checkSpawnItem(obj);
                obj.Destroy();
                //this.Destroy();

                let points = obj instanceof objects.Lizard ? 300 : 100;
                playScene.score.addPoints(points);
            }
        }

        public Update(): void {
            //console.log(this.flameAnimator.currentFrame);
            this.Move();
            this.CheckBounds();
        }

        public Move(): void {
            let player = this.bulletHandler.playScene.player;

            //this.x = this.bulletHandler.playScene.player.x;
            let x = player.x;
            let y = player.y - player.height;

            //this.y = this.bulletHandler.playScene.player.y;
            //this.y = this.bulletHandler.playScene.player.boxCollider.aabb.min.y
            this.position = new math.Vec2(x, y);

        }


        public Destroy(){
            this.bulletHandler.DestroyBullet(this);
        }
    }
}
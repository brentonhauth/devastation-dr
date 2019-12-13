module objects {
    export class FlamethrowerBullet extends objects.PlayerBullet {

        public flameAnimator:createjs.Sprite;
        public flameAnimatorEast:createjs.Sprite;
        public flameAnimatorWest:createjs.Sprite;

        public bulletHandler:handlers.PlayerBulletHandler;
        public bulletDirection:config.BulletDirection;

        constructor(x:number, y:number, bulletDirection:config.BulletDirection, bulletHandler: handlers.PlayerBulletHandler, flameFix = 0) {
            super(x, y, config.BulletType.FLAMETHROWER, bulletHandler, flameFix);

            this.position = new math.Vec2(x, y);
            this.bulletHandler = bulletHandler;
            this.bulletDirection = bulletDirection;
            this.Start();

            if (bulletDirection == config.BulletDirection.NORTH)
            {
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
            }
            else if (bulletDirection == config.BulletDirection.EAST)
            {
                let sheet = new createjs.SpriteSheet({
                    images: [objects.Game.getAsset('flameSheetEast')],
                    frames: { width: 150, height: 40, count: 9 },
                    animations: {
                        flameIdle: [7,8,true,0.4],
                        flameStart: [ 0,8, "flameIdle", 0.5]
                    }
                });
                

                this.flameAnimatorEast = new createjs.Sprite(sheet,"flameStart");

                this.removeChild(this.sprite);
                this.addChild(this.flameAnimatorEast);
                this.Init()
            }
            else if (bulletDirection == config.BulletDirection.WEST)
            {
                let sheet = new createjs.SpriteSheet({
                    images: [objects.Game.getAsset('flameSheetWest')],
                    frames: { width: 150, height: 40, count: 9 },
                    animations: {
                        flameIdle: [7,8,true,0.4],
                        flameStart: [ 0,8, "flameIdle", 0.5]
                    }
                });
                

                this.flameAnimatorWest = new createjs.Sprite(sheet,"flameStart");

                this.removeChild(this.sprite);
                this.addChild(this.flameAnimatorWest);
                this.Init()
            }
            //console.log(this.flameAnimator);
            //this.flameAnimator.gotoAndPlay("flameStart");
            //this.flameAnimator.play();
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

            let x = 0;
            let y = 0;
            //this.x = this.bulletHandler.playScene.player.x;
            if (this.bulletDirection == config.BulletDirection.NORTH)
            {
                x = player.x;
                y = player.y - player.height;
            }
            else if (this.bulletDirection == config.BulletDirection.EAST)
            {
                x = player.x + 50;
                y = player.y + (player.height / 2);
            }
            else if (this.bulletDirection == config.BulletDirection.WEST)
            {
                x = player.x - 100;
                y = player.y + (player.height / 2);
            }
            //this.y = this.bulletHandler.playScene.player.y;
            //this.y = this.bulletHandler.playScene.player.boxCollider.aabb.min.y
            this.position = new math.Vec2(x, y);

        }


        public Destroy(){
            this.bulletHandler.DestroyBullet(this);
        }
    }
}
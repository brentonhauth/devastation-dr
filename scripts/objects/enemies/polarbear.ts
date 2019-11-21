module objects {
    export class PolarBear extends Enemy {

        private startingPosition: math.Vec2;
        private polarBearAnimator: createjs.Sprite;
        private playerRef: Player;

        private playScene: scenes.PlayScene;

        private lastFacing;

        private reachedSpot = false;


        constructor() {
            super("polarBearSheet");

            this.playScene = <scenes.PlayScene>objects.Game.currentScene;

            this.startingPosition = new math.Vec2(
                math.randRange(20, 540),
                math.randRange(50, 250)
            );

            let speed=.1,sheet=new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("polarBearSheet")],
                frames: { width: 72, height: 72, count: 12 },
                animations: {
                    idle_down: 1, idle_left: 4,
                    idle_right: 7, idle_up: 10,
                    move_down: { speed, frames: [0, 1, 2] },
                    move_left: { speed, frames: [3, 4, 5] },
                    move_right: { speed, frames: [6, 7, 8] },
                    move_up: { speed, frames: [9, 10, 11] },
                    throw_down: [0, 1, "idle_down", speed],
                    throw_left: [3, 4, "idle_left", speed],
                    throw_right: [6, 7, "idle_right", speed],
                    throw_up: [9, 10, "idle_up", speed],
                }
            });

            this.playerRef = this.playScene.player || <Player>{position:math.Vec2.Zero};

            this.polarBearAnimator = new createjs.Sprite(sheet, "move_down");

            this.width = 72;
            this.height = 72;

            this.Init();
        }

        public Start() {
            this.position = new math.Vec2(
                this.startingPosition.x,
                this.startingPosition.y - math.randRange(250, 350)
            );

            this.removeChild(this.sprite);
            this.addChild(this.polarBearAnimator);
        }

        public Update() {
            if (!this.reachedSpot) {
                if (math.Vec2.WithinRange(this.position, this.startingPosition, 15)) {
                    this.reachedSpot = true;
                } else {
                    this.position = this.position.Add(new math.Vec2(0, 6));
                }
            } else {
                this.facePlayer();

                if (!(createjs.Ticker.getTicks() % 20)) {
                    this.throwFish();
                }

                this.position = this.position.Add(
                    new math.Vec2(0, this.playScene.background.Speed)
                );
            }

            if (this.y > (objects.Game.canvas.height + 100)) {
                this.Destroy();
            }
        }

        private facePlayer() {
            let face: string, diff = math.Vec2.Difference(this.position, this.playerRef.position);

            if (Math.abs(diff.x) > Math.abs(diff.y)) {
                face = diff.x < 0 ? "right" : "left";
            } else {
                face = diff.y > 0 ? "up" : "down";
            }

            if (this.lastFacing !== face) {
                this.polarBearAnimator.gotoAndPlay("idle_" + face);
                this.lastFacing = face;
            }
        }

        private throwFish() {
            let fish = new Fish(this, this.playerRef);
            this.playScene.enemyBulletHandler.AddExistingBullet(fish);
        }
    }
}

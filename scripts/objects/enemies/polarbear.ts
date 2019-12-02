module objects {
    export class PolarBear extends Enemy {

        private startingPosition: math.Vec2;

        private lastFacing: config.Direction;

        private reachedSpot = false;


        constructor() {
            super(new createjs.SpriteSheet({
                images: [objects.Game.getAsset('polarBearSheet')],
                frames: { width: 72, height: 72, count: 12 },
                animations: {
                    idle_Down: 1, walk_Down: { speed: .1, frames: [0, 1, 2] },
                    idle_Left: 4, walk_Left: { speed: .1, frames: [3, 4, 5] },
                    idle_Right: 7, walk_Right: { speed: .1, frames: [6, 7, 8] },
                    idle_Up: 10, walk_Up: { speed: .1, frames: [9, 10, 11] },
                }
            }));


            // this.width = 72;
            // this.height = 72;

            this.Init();
            this.Reset();
        }

        public Start() {
            this.position = new math.Vec2(
                this.startingPosition.x,
                this.startingPosition.y - math.randRange(250, 350)
            );
        }

        public Reset() {
            this.startingPosition = math.randVec2([30, 540], [50, 250]);
            this.animator.gotoAndPlay('walk_Down');
            this.reachedSpot = false;
        }

        public Update() {
            if (!this.reachedSpot) {
                if (math.Vec2.WithinRange(this.position, this.startingPosition, 15)) {
                    this.reachedSpot = true;
                } else {
                    this.position = this.position.Add(new math.Vec2(0, 6));
                }
            } else {

                let tick = createjs.Ticker.getTicks();

                if (!(tick % 2)) {
                    this.facePlayer();
                }

                if (!(tick % 20)) {
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
            let diff = math.Vec2.Difference(this.playScene.player.position, this.position),
            face = diff.LiteralDirection;

            if (this.lastFacing !== face) {
                this.animator.gotoAndPlay('idle_' + config.Direction[face]);
                this.lastFacing = face;
            }
        }

        private throwFish() {
            let fish = new Fish(this, this.playScene.player);
            this.playScene.enemyBulletHandler.AddExistingBullet(fish);
        }
    }
}

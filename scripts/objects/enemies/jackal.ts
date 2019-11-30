module objects {
    export class Jackal extends Enemy {

        private static speed = 9;

        private startSide: config.Direction;

        private sweeps: number;
        private sweepCount = 1;

        public yoinked: any = null;

        private direction: math.Vec2;



        constructor(side: 'left'|'right'=null, sweeps=5) {
            super(new createjs.SpriteSheet({
                images: [objects.Game.getAsset('jackalSheet')],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    // idle_down: 1, walk_down: { speed, frames: [0, 1, 2] },
                    idle_Left: 4, walk_Left: { speed: .1, frames: [3, 4, 5] },
                    idle_Right: 7, walk_Right: { speed: .1, frames: [6, 7, 8] },
                    // idle_up: 10, walk_up: { speed, frames: [9, 10, 11] }
                }
            }));

            if (side) {
                this.startSide = side === 'left' ?
                config.Direction.Left :
                config.Direction.Right;
            } else {
                this.startSide = math.oneIn(2) ?
                config.Direction.Left :
                config.Direction.Right;
            }

            this.sweeps = sweeps;

            
            // this.width = 48;
            // this.height = 48;
            this.Init();
        }

        public Start(): void {
            // this.removeChild(this.sprite);
            // this.addChild(this.jackalAnimator);

            this.Reset();
        }

        public Update(): void {

            this.position = this.position.Add(this.direction);

            this.CheckBounds();
        }

        private getOpositeSide() {
            return this.startSide === config.Direction.Right ?
            config.Direction.Left : config.Direction.Right;
        }

        public Reset() {
            let r = math.randRange(25, 100);
            this.position = new math.Vec2(
                this.startSide === config.Direction.Left ? -r :
                (objects.Game.canvas.width + r),
                this.playScene.player.y -
                math.randRange(-50, 50)
            );

            this.direction = math.Vec2.Difference(this.playScene.player.position, this.position).Normalized;
            this.direction = this.direction.ScaleEq(Jackal.speed);
            this.animator.gotoAndPlay('walk_' + config.Direction[this.getOpositeSide()]);
        }

        public CheckBounds() {
            if ((this.startSide === config.Direction.Left &&
            this.x > (objects.Game.canvas.width + 100)) ||
            this.x < -100) {
                if (!!this.yoinked || this.sweepCount === this.sweeps) {
                    this.Destroy();
                } else {
                    this.sweepCount++;
                    this.startSide = this.getOpositeSide();
                    this.Reset();
                }
            }
        }

        public yoink(item: any) {
            this.animator.gotoAndPlay('walk_' + config.Direction[this.startSide]);
            this.startSide = this.getOpositeSide();
            this.yoinked = item;
            this.direction = new math.Vec2(
                -this.direction.x,
                this.direction.y
            ).ScaleEq(.7);
            this.position = this.position.Add(this.direction);
        }

        // public OnCollision(_object: GameObject) {}
    }
}

module objects {
    export class Penguin extends Enemy {

        private static moveSpeed = 7.5;

        private spawn: math.Vec2;
        private direction: math.Vec2;
        
        private aggressiveRange: number;

        private playerRef: Player;
        
        private isAggressive = false;
        private setSlideAnimation = false;

        constructor() {
            super(new createjs.SpriteSheet({
                images: [objects.Game.getAsset('penguinSheet')],
                frames: { width: 48, height: 48, count: 24 },
                animations: {
                    idle_Down: 1, slide_Down: 13,
                    idle_Left: 4, slide_Left: 16,
                    idle_Right: 7, slide_Right: 19,
                    idle_Up: 10, slide_Up: 22,
                }
            }));

            this.playerRef = this.playScene.player || <Player>{position:math.Vec2.Zero};

            // this.width = 48;
            // this.height = 48;
            this.Init();

            this.Reset();
        }

        public Reset() {
            // let posArr = ['down', 'left', 'right']; // posArr[math.randInt(2)]
            this.animator.gotoAndPlay('idle_' + config.Direction[math.randInt(2, 4)]);
            this.aggressiveRange = math.randInt(350, 450);
            this.spawn = Penguin.randomSpawnPosition();
            this.isAggressive = false;
            this.setSlideAnimation = false;
        }

        public Start() {
            this.position = this.spawn;
        }

        public Update() {
            if (this.isAggressive) {
                if (!this.setSlideAnimation) {
                    let slide: config.Direction, diff = math.Vec2.Difference(this.playerRef.position, this.position).Normalized;
                    if (Math.abs(diff.x) > Math.abs(diff.y)) {
                        slide = diff.x > 0 ? config.Direction.Right : config.Direction.Left;
                    } else {
                        slide = diff.y > 0 ? config.Direction.Down : config.Direction.Up;
                    }
                    this.animator.gotoAndPlay('slide_' + config.Direction[slide]);
                    this.direction = diff.ScaleEq(Penguin.moveSpeed);
                    this.setSlideAnimation = true;
                }
                this.position = this.position.Add(this.direction);
            } else if (math.Vec2.WithinRange(this.playerRef.position, this.position, this.aggressiveRange)) {
                this.isAggressive = true;
            } else {
                this.position = this.position.Add(new math.Vec2(0, this.playScene.background.Speed));
            }

            if (
                this.x < -100 || this.x > 700 || this.y < -200 ||
                this.y > (objects.Game.canvas.height + 100)
            ) {
                this.Destroy();
            }
        }

        private static randomSpawnPosition() {
            return math.randVec2([1, 600], [-125, -25]);
        }
    }
}

module objects {
    export class Penguin extends Enemy {

        private static moveSpeed = 7.5;

        private spawn: math.Vec2;
        private direction: math.Vec2;
        
        private aggressiveRange: number;

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
            this.health = 1;
        }

        public Start() {
            this.position = this.spawn;
        }

        public Update() {
            if (this.isAggressive) {
                let pos = this.position;
                if (!this.setSlideAnimation) {
                    let diff = math.Vec2.Direction(this.playScene.player.position, pos),
                    dir = diff.LiteralDirection;
                    this.animator.gotoAndPlay('slide_' + config.Direction[dir]);
                    this.direction = diff.ScaleEq(Penguin.moveSpeed);
                    this.setSlideAnimation = true;
                }
                this.position = pos.Add(this.direction);
            } else if (math.Vec2.WithinRange(this.playScene.player.position, this.position, this.aggressiveRange)) {
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

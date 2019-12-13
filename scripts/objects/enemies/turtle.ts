module objects {
    export class Turtle extends Enemy {

        private playerRef: Player;
        private isAggressive = false;
        private aggressiveRange: number;

        private spawn: math.Vec2;

        constructor(spawn?: math.Vec2) {
            super(new createjs.SpriteSheet({
                images: [objects.Game.getAsset('turtleSheet')],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    shell: 10,
                    idle_down: 1, walk_down: { speed: .1, frames: [0, 1, 2] },
                    idle_left: 4, walk_left: { speed: .1, frames: [3, 4, 5] },
                    idle_right: 7, walk_right: { speed: .1, frames: [6, 7, 8] },
                    idle_up: 9, walk_up: { speed: .1, frames: [9, 11] },
                }
            }));


            this.spawn = spawn ? spawn : Turtle.randomStartPosition();

            this.playerRef = this.playScene.player || <Player>{position:math.Vec2.Zero};

            // this.width = 48;
            // this.height = 48;
            this.Init();

            this.Reset();
        }

        public Start() {
            this.position = this.spawn;
            this.animator.x = this.animator.y = 24;
            this.animator.regX = 24;
            this.animator.regY = 30;
        }

        public Update() {
            if (this.isAggressive) {
                let tick = createjs.Ticker.getTicks();
                this.animator.gotoAndPlay('shell');
                this.animator.rotation += 10;
                if (!(tick % 10)) {
                    let point = math.pointOnCircle(this.position, (tick * 2) % 360);
                    let b = new EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(b);
                }
                this.position = this.position.Add(new math.Vec2(0, this.playScene.background.Speed));
            } else if (math.Vec2.WithinRange(this.playerRef.position, this.position, this.aggressiveRange)) {
                this.isAggressive = true;
            } else {
                this.position = this.position.Add(new math.Vec2(0, 3));
            }

            if (this.y > objects.Game.canvas.height) {
                this.Destroy();
            }
        }

        public Reset() {
            this.spawn = Turtle.randomStartPosition();
            this.isAggressive = false;
            this.aggressiveRange = math.randInt(350, 450);
            this.animator.gotoAndPlay('walk_down');
            this.animator.rotation = 0;
        }

        private static randomStartPosition() {
            return new math.Vec2(
                math.randRange(1, 600),
                -math.randRange(25, 125)
            );
        }
    }
}

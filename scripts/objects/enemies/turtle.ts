module objects {
    export class Turtle extends Enemy {

        private playerRef: Player;
        private playScene: scenes.PlayScene;
        private turtleAnimator: createjs.Sprite;
        private isAggressive = false;
        private aggressiveRange: number;
        private shootDegree: number = 0;

        private spawn: math.Vec2;

        constructor(spawn: math.Vec2=null) {
            super("turtleSheet");


            

            this.spawn = spawn?spawn:new math.Vec2(
                math.randRange(1, 600),
                -math.randRange(25, 125)
            );

            this.aggressiveRange = Math.floor(math.randRange(350, 450));
            
            let speed=.1,sheet=new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("turtleSheet")],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    shell: 10,
                    idle_down: 1, walk_down: { speed, frames: [0, 1, 2] },
                    idle_left: 4, walk_left: { speed, frames: [3, 4, 5] },
                    idle_right: 7, walk_right: { speed, frames: [6, 7, 8] },
                    idle_up: 9, walk_up: { speed, frames: [9, 11] },
                }
            });

            this.playScene = <scenes.PlayScene>objects.Game.currentScene;
            this.playerRef = this.playScene.player || <Player>{position:math.Vec2.Zero};

            this.turtleAnimator = new createjs.Sprite(sheet, "walk_down");

            this.width = 48;
            this.height = 48;
            this.Init();
        }

        public Start() {
            this.removeChild(this.sprite);
            this.addChild(this.turtleAnimator);
            this.position = this.spawn;
            this.turtleAnimator.x = this.turtleAnimator.y = 24;
            this.turtleAnimator.regX = 24;
            this.turtleAnimator.regY = 30;
        }

        public Update() {
            if (this.isAggressive) {
                let tick = createjs.Ticker.getTicks();
                this.turtleAnimator.gotoAndPlay("shell");
                this.turtleAnimator.rotation += 10;
                if ((tick % 10) === 0) {
                    let point = math.pointOnCircle(this.position, (tick*2) % 360);
                    let b = new EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(b);
                }
                this.position = this.position.Add(new math.Vec2(0, this.playScene.background.Speed));
            } else if (math.Vec2.WithinRange(this.playerRef.position, this.position, this.aggressiveRange)) {
                //math.Vec2.Distance(this.playerRef.position, this.position) < this.aggressiveRange
                this.isAggressive = true;
            } else {
                this.position = this.position.Add(new math.Vec2(0, 3));
            }

            if (this.y > objects.Game.canvas.height) {
                this.Destroy();
            }
        }
    }
}

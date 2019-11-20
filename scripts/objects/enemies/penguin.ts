module objects {
    export class Penguin extends Enemy {

        private static moveSpeed = 7.5;

        private penguinAnimator: createjs.Sprite;
        private spawn: math.Vec2;
        private direction: math.Vec2;
        
        private aggressiveRange: number;

        private playerRef: Player;
        private playScene: scenes.PlayScene;
        
        private isAggressive = false;
        private setSlideAnimation = false;
        private isDes = false;

        constructor(spawn: math.Vec2=null, startAggressive=false) {
            super("penguinSheet");

            this.isAggressive = startAggressive;
            this.aggressiveRange = Math.floor(math.randRange(350, 450));

            this.spawn = spawn?spawn:new math.Vec2(
                math.randRange(1, 600),
                -math.randRange(25, 125)
            );



            let sheet = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("penguinSheet")],
                frames: { width: 48, height: 48, count: 24 },
                animations: {
                    idle_down: 1, slide_down: 13,
                    idle_left: 4, slide_left: 16,
                    idle_right: 7, slide_right: 19,
                    idle_up: 10, slide_up: 22,
                }
            });

            this.playScene = <scenes.PlayScene>objects.Game.currentScene;
            this.playerRef = this.playScene.player || <Player>{position:math.Vec2.Zero};


            let arr = ["down", "left", "right"];
            let da = Math.round(math.randRange(0, 2));

            this.penguinAnimator = new createjs.Sprite(sheet, "idle_"+arr[da]);

            this.width = 48;
            this.height = 48;
            this.Init();

        }

        public Start() {
            this.removeChild(this.sprite);
            this.addChild(this.penguinAnimator);

            this.position = this.spawn;

            setTimeout(() => {
                if (!this.isDes) {
                    this.Destroy();
                }
            }, 8_000);
        }

        public Update() {
            if (this.isAggressive) {
                if (!this.setSlideAnimation) {
                    let slide, diff = math.Vec2.Difference(this.playerRef.position, this.position).Normalized;
                    if (Math.abs(diff.x) > Math.abs(diff.y)) {
                        slide = diff.x > 0 ? "slide_right" : "slide_left";
                    } else {
                        slide = diff.y > 0 ? "slide_down" : "slide_up";
                    }
                    this.penguinAnimator.gotoAndPlay(slide);
                    this.direction = diff.Scale(Penguin.moveSpeed);
                    this.setSlideAnimation = true;
                }
                this.position = this.position.Add(this.direction);
            } else if (math.Vec2.Distance(this.playerRef.position, this.position) < this.aggressiveRange) {
                this.isAggressive = true;
            } else {
                this.position = this.position.Add(new math.Vec2(0, this.playScene.background.Speed));
            }


            if (this.x < -100 || this.x > 700 ||
            this.y < -200 || this.y > 900) {
                this.Destroy();    
            }
        }

        public Destroy() {
            super.Destroy();
            this.isDes = true;
        }
    }
}

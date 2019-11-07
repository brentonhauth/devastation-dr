module objects {
    export class Wolf extends Enemy {

        private wolfAnimator: createjs.Sprite;
        private direction: math.Vec2;
        private spawn: math.Vec2;

        private isDes = false; // temp
        
        private static moveSpeed = 7;

        constructor(spawn: math.Vec2=null, moveTo: math.Vec2=null) {
            super("wolfSheet");

            if (true ||spawn === null) {
                this.spawn = new math.Vec2(math.randRange(600), -100);
                moveTo = new math.Vec2(this.spawn.x, 700);
            } else {
                this.spawn = spawn;
            }

            if (moveTo === null) {
                moveTo = new math.Vec2(300, 300); // temp
            }

            let speed=.1, sheet=new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("wolfSheet")],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    move_down: { speed, frames: [0, 1, 2] },
                    move_left: { speed, frames: [3, 4, 5] },
                    move_right: { speed, frames: [6, 7, 8] },
                    move_up: { speed, frames: [9, 10, 11] },
                }
            });

            let diff = math.Vec2.Difference(moveTo, this.spawn).Normalized;

            this.direction = diff.Scale(Wolf.moveSpeed);

            let anim = "move_down";

            if (Math.abs(diff.x) > Math.abs(diff.y)) {
                anim = diff.x > 0 ? "move_right" : "move_left";
            } else {
                anim = diff.y > 0 ? "move_down" : "move_up";
            }

            this.wolfAnimator = new createjs.Sprite(sheet, anim);


            this.width = 48;
            this.height = 48;

            this.Init();
        }

        
        public Start() {
            this.removeChild(this.sprite);
            this.addChild(this.wolfAnimator);

            this.position = this.spawn;

            // TEMP
            setTimeout(() => {
                if (!this.isDes) {
                    this.Destroy();
                }
            }, 10_000);
        }

        public Update() {
            this.position = math.Vec2.Sum(this.position, this.direction);
        }

        public Destroy() {
            super.Destroy();
            this.isDes = true;
        }
    }
}

module objects {
    export class Wolf extends Enemy {

        private direction: math.Vec2;
        private spawn: math.Vec2;

        private static moveSpeed = 7;

        constructor() {
            super(new createjs.SpriteSheet({
                images: [objects.Game.getAsset('wolfSheet')],
                frames: { width: 48, height: 48, count: 12 },
                animations: {
                    move_Down: { speed: .1, frames: [0, 1, 2] },
                    move_Left: { speed: .1, frames: [3, 4, 5] },
                    move_Right: { speed: .1, frames: [6, 7, 8] },
                    move_Up: { speed: .1, frames: [9, 10, 11] },
                }
            }));


            // this.width = 48;
            // this.height = 48;

            this.Init();

            this.Reset();
        }


        public Start() {
            this.position = this.spawn;
        }

        public Reset() {
            this.spawn = new math.Vec2(math.randInt(600), math.randInt(-105, -95));

            let moveTo = new math.Vec2(this.spawn.x, 700);

            let diff = math.Vec2.Direction(moveTo, this.spawn);

            this.direction = diff.ScaleEq(Wolf.moveSpeed);

            // let anim = "move_down";
            // if (Math.abs(diff.x) > Math.abs(diff.y)) {
            //     anim = diff.x > 0 ? "move_right" : "move_left";
            // } else {
            //     anim = diff.y > 0 ? "move_down" : "move_up";
            // }

            this.animator.gotoAndPlay('move_Down');
        }

        public Update() {
            this.position = this.position.Add(this.direction);

            if (this.y > objects.Game.canvas.height) {
                this.Destroy();
            }
        }
    }
}

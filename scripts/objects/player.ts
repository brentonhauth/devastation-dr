module objects {
    export class Player extends objects.GameObject {
        // Variables
        public lives: number;
        private blink: boolean = false;
        private intangible: boolean = false;
        private oddBlink = 0;
        private moveSpeed = 8;
        private moved: math.Vec2;
        
        private sprite: createjs.Bitmap;
        

        // Constructor
        constructor() {
            super();
            this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult("player"));
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            this.addChild(this.sprite);
            this.Start();
        }
        // Methods
        public Start(): void {
            // Set the initial position
            this.position = new math.Vec2(320, 500);
            this.lives = 3;
            this.moved = new math.Vec2(0, 0);

            //this.scaleX = 0.25;
            //this.scaleY = 0.25;
        }
        public Update(): void {
            this.Move();
            // this.CheckBound(); // <-- Check collisions
            this.Blink();

        }
        public Reset(): void {}
        public Move(): void {
            this.moved.x = this.moved.y = 0;

            if (managers.Keyboard.pressed(config.Key.W)) {
                this.moved.y = -this.moveSpeed;
            }

            if (managers.Keyboard.pressed(config.Key.S)) {
                this.moved.y += this.moveSpeed;
            }

            if (managers.Keyboard.pressed(config.Key.A)) {
                this.moved.x = -this.moveSpeed;
            }

            if (managers.Keyboard.pressed(config.Key.D)) {
                this.moved.x += this.moveSpeed;
            }

            if (this.moved.x || this.moved.y) {
                if (this.moved.x && this.moved.y) {
                    this.moved = this.moved.Scale(Math.SQRT1_2);
                }

                this.position = this.position.Add(this.moved);
            }
            

            // We reference the stage object and get mouse position
            // this.x = objects.Game.stage.mouseX;
            // this.y = objects.Game.stage.mouseY;
            // this.CheckBound();
            // This is evetually replaced with keyboard input
            // Maybe xbox controller...
        }

        private Blink() {
            if (this.blink) {
                if (this.oddBlink == 2) {
                    this.visible = !this.visible;
                    this.oddBlink = 0;
                } else {
                    this.oddBlink++;
                }
            }
        }

        public StartBlink() {
            this.blink = this.intangible = true;
            setTimeout(() => {
                this.blink = this.intangible = false;
                this.visible = true;
            }, 1000);
        }

        public CheckBound(): void {
            // Right boundary
            if(this.x >= 640 - this.halfW) {
                this.x = 640 - this.halfW;
            }

            // Left boundary
            if(this.x <= this.halfW) {
                this.x = this.halfW;
            }

            if (this.y <= this.halfH) {
                this.y = this.halfH;
            }

            /*
            if (this.y >= 900 - this.halfH) {
                this.y = this.halfH;
            }
            */
        }

        public OnCollision(_gameObject: objects.GameObject): void {
            if (this.intangible) { return; }
            this.lives -= 1;
            managers.Sound.sfx("explosion");
            this.StartBlink();
            if (this.lives == 0) {
                objects.Game.currentState = config.Scene.OVER;
                console.log("dead");
            }
        }
    }
}
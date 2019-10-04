module objects {
    export class Player extends objects.GameObject {
        // Variables
        public lives: number;
        private blink: boolean = false;
        private oddBlink = 0;

        private explosion: createjs.AbstractSoundInstance;
        
        

        // Constructor
        constructor() {
            super("player");
            this.Start();
        }
        // Methods
        public Start(): void {
            // Set the initial position
            this.y = 700;
            this.x = 320;
            this.lives = 3;
            

            // managers.Input.keypress('a', () => {
            //     this.x -= 15;
            //     this.CheckBound();
            // });

            // managers.Input.keypress('d', () => {
            //     this.x += 15;
            //     this.CheckBound();
            // });

            //this.scaleX = 0.25;
            //this.scaleY = 0.25;
        }
        public Update(): void {
            this.Move();
            this.CheckBound(); // <-- Check collisions
            this.Blink();

        }
        public Reset(): void {}
        public Move(): void {
            // We reference the stage object and get mouse position
            this.x = objects.Game.stage.mouseX;
            this.y = objects.Game.stage.mouseY;
            this.CheckBound();
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
            this.blink = true;
            setTimeout(() => {
                this.blink = false;
                this.visible = true;
            }, 750);
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

            if (this.y >= 900 - this.halfH) {
                this.y = this.halfH;
            }
        }

        public OnCollision(_gameObject: objects.GameObject): void {
            this.lives -= 1;
            createjs.Sound.play("explosion");
            this.StartBlink();
            if (this.lives == 0) {
                objects.Game.currentScene = config.Scene.OVER;
                console.log("dead");
            }
        }
    }
}
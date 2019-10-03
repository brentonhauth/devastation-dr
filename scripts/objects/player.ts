module objects {
    export class Player extends objects.GameObject {
        // Variables
        public lives:number;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "player");
            this.Start();
        }
        // Methods
        public Start():void {
            // Set the initial position
            this.y = 700;
            this.x = 320;
            this.lives = 3;

            //this.scaleX = 0.25;
            //this.scaleY = 0.25;
        }
        public Update():void {
            this.Move();
            this.CheckBound(); // <-- Check collisions
        }
        public Reset():void {}
        public Move():void {
            // We reference the stage object and get mouse position
            this.x = objects.Game.stage.mouseX;
            // This is evetually replaced with keyboard input
            // Maybe xbox controller...
        }
        public CheckBound():void {
            // Right boundary
            if(this.x >= 640 - this.halfW) {
                this.x = 640 - this.halfW;
            }

            // Left boundary
            if(this.x <= this.halfW) {
                this.x = this.halfW;
            }
        }

        public OnCollision(_gameObject:objects.GameObject):void {
            this.lives -= 1;
            if (this.lives == 0)
            {
                objects.Game.currentScene = config.Scene.OVER;
                console.log("dead"); 
            }
        }
    }
}
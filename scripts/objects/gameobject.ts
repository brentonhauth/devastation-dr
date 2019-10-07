module objects {
    export abstract class GameObject extends createjs.Bitmap {
        // Variables
        protected speedX: number;
        protected speedY: number;

        public width: number;
        public height: number;
        public halfW: number;   // Half-width; Useful for collision detection
        public halfH: number;   // Half-height
        public isColliding: boolean;
        // Constructor
        constructor(imageString:string) {
            super(objects.Game.assetManager.getResult(imageString));

            this.name = imageString;

            this.Init();
        }


        // Properties

        public get position() {
            return new math.Vec2(this.x, this.y);
        }

        public set position(pos: math.Vec2) {
            this.x = pos.x;
            this.y = pos.y;
        }


        // Methods 
        private Init():void {
            // Initialize all the properties of my object
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfW = this.width * 0.5;
            this.halfH = this.height * 0.5;

            // Registration Points
            this.regX = this.halfW;
            this.regY = this.halfH;

            this.isColliding = false;
        }

        public Start(): void {}
        public Update(): void {}
        public Reset(): void {}
        public Move(): void {}
        public CheckBound(): void {}
        public OnCollision(_gameObject: GameObject): void {}
    }
}
module objects {
    export abstract class GameObject extends createjs.Container {
        // Variables
        protected speedX: number;
        protected speedY: number;

        public width: number;
        public height: number;
        public halfW: number;   // Half-width; Useful for collision detection
        public halfH: number;   // Half-height
        public isColliding: boolean;
        
        public boxCollider: components.BoxCollider;

        // Constructor
        constructor(width=0, height=0) {
            super();
            //objects.Game.assetManager.getResult(imageString)
            // this.name = imageString;
            this.width = width;
            this.height = height;
            this.Init();



            this.boxCollider = new components.BoxCollider(this.x, this.y, this.width, this.height);
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
            // this.width = this.getBounds().width;
            // this.height = this.getBounds().height;
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
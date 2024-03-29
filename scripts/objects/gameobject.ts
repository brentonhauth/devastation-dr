module objects {
    export abstract class GameObject extends createjs.Container {
        // Variables
        protected speedX: number;
        protected speedY: number;

        private m_width: number;
        private m_height: number;

        public halfW: number;   // Half-width; Useful for collision detection
        public halfH: number;   // Half-height
        public isColliding: boolean;
        public boxCollider: components.BoxCollider;

        // Constructor
        constructor() {
            super();
            //objects.Game.assetManager.getResult(imageString)
            // this.name = imageString;
            // this.width = width;
            // this.height = height;
            // this.Init();

            // this.boxCollider = new components.BoxCollider(this.x, this.y, this.width, this.height);
        }


        // Properties

        public get position() {
            return new math.Vec2(this.x, this.y);
        }

        public set position(pos: math.Vec2) {
            this.boxCollider.position = pos;
            this.x = pos.x;
            this.y = pos.y;
        }

        /**
         * Use this method if you are wraping new co-ord's in a Vector
         * @example
         * obj.SetPosition(newX, newY);
         * 
         * // instead of
         * obj.position = new math.Vec2(newX, newY);
         *
         * // unless you're mutating the position
         * obj.position = obj.position.Add(new math.Vec2(2, 3));
         * @param {number} x
         * @param {number} y
         */
        public SetPosition(x: number, y: number) {
            this.boxCollider.SetPosition(x, y);
            this.x = x;
            this.y = y;
        }

        public get width(): number {
            return this.m_width;
        }

        public get height(): number {
            return this.m_height;
        }

        public set width(w: number) {
            if (w < 0) { w = 0; }
            this.m_width = w;
            // this.regX = this.halfW = w * .5;
            if (this.boxCollider) {
                this.boxCollider.width = w;
            }
        }

        public set height(h: number) {
            if (h < 0) { h = 0; }
            this.m_height = h;
            // this.regY = this.halfH = h * .5;
            if (this.boxCollider) {
                this.boxCollider.height = h;
            }
        }


        // Methods
        protected Init():void {
            // Initialize all the properties of my object
            // this.width = this.getBounds().width;
            // this.height = this.getBounds().height;
            this.halfW = this.width * 0.5;
            this.halfH = this.height * 0.5;

            // Registration Points
            this.regX = this.halfW;
            this.regY = this.halfH;

            this.isColliding = false;
            this.boxCollider = new components.BoxCollider(this.x || 0, this.y || 0, this.width, this.height);
        }

        public Start(): void {}
        public Update(): void {}
        public Reset(): void {}
        public Move(): void {}
        public CheckBound(): void {}
        public OnCollision(_gameObject: GameObject): void {}
    }
}
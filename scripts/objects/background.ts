module objects {
    export class Background extends createjs.Container {
        // Variables
        private speedY: number;  // Speed of background scrolling on Y-axis
        private images: createjs.Bitmap[];
        private canvasW: number;
        private canvasH: number;
        private imageHeight: number;
        private overlap: number = 0;
        private hasStarted: boolean = false;


        public set Speed(value: number) {
            this.speedY = (isNaN(value) || value < 0) ? 1.5 : value;
        }

        public get Speed(): number {
            return this.speedY;
        }

        public set Overlap(value: number) {
            this.overlap = value;
            if (this.hasStarted) {
                this.Reset();
            }
        }

        // Constructor
        constructor(speed=1.5) {
            super();
            this.images = new Array<createjs.Bitmap>();
            this.speedY = speed;
            this.canvasH = objects.Game.canvas.height;
            this.canvasW = objects.Game.canvas.width;

            let imgString = Background.getImageFromState(objects.Game.currentState);
            this.images.push(
                new createjs.Bitmap(objects.Game.getAsset(imgString)),
                new createjs.Bitmap(objects.Game.getAsset(imgString))
            );
        }
        // Functions 
        // Initializing our variables with default values
        public Start(): void {

            this.hasStarted = true;

            let bounds = this.images[0].getBounds();
            let scale = this.canvasW / (bounds.width || 1);

            scale = Number(scale.toFixed(3));

            this.images.forEach(img => {
                img.x = 0;
                img.scaleX = img.scaleY = scale;
                this.addChild(img);
            });

            this.imageHeight = bounds.height * scale;

            this.Reset();
        }
        // Updated 60 times per second (60FPS)
        public Update(): void {

            this.images.forEach((img, i) => {
                img.y += this.speedY;
                if (img.y >= this.canvasH) {
                    let img2 = this.images[!!i?0:1];
                    this.removeChild(img, img2);
                    this.addChildAt(img, 0);
                    this.addChildAt(img2, 1);
                    img.y = img2.y - this.imageHeight + this.overlap;
                }
            });

            // this.Move();
            // this.CheckBound();
        }
        // Resets the position of the object
        public Reset(): void {
            this.images[1].y = -this.imageHeight + this.canvasH;
            this.images[0].y = (this.images[1].y - this.imageHeight) + this.overlap;
        }

        // Collision Detection 
        public CheckBound(): void {
            if (this.y >= 0) {
                this.Reset();
            }
        }

        // // Temporary Method
        // private static getOverlapFromState(state: config.Scene) {
        //     switch (state) {
        //         case config.Scene.JUNGLE:
        //             return 10;
        //         case config.Scene.DESERT:
        //             return 20;
        //         case config.Scene.ARCTIC:
        //             return 104;
        //     }
        // }

        private static getImageFromState(state: config.Scene) {
            switch (state) {
                case config.Scene.JUNGLE:
                    return 'jungle';
                case config.Scene.DESERT:
                    return 'desert';
                case config.Scene.ARCTIC:
                    return 'arctic';
                case config.Scene.RETROWAVE:
                    return 'retrowave';
            }
        }
    }
}
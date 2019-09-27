module objects {
    export class Button extends createjs.Bitmap {
        constructor(assetManager: createjs.LoadQueue, imageString: string, x: number=0, y: number=0) {
            super(assetManager.getResult(imageString));
            this.x = x;
            this.y = y;

            // set up event handlers
            this.on("mouseover", this.mouseOver);
            this.on("mouseout", this.mouseOut);
        }

        private mouseOver(): void {
            this.alpha = .7;
        }

        private mouseOut(): void {
            this.alpha = 1;
        }
    }
}
module objects {
    export class Background extends createjs.Bitmap {
        private speedY: number;

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager.getResult("background"));

            this.Start();
        }

        // Initialize variables with default values
        Start(): void {
            this.speedY = 5;
            this.Reset();
        }

        Update(): void {
            this.Move();
            this.CheckBound();
        }

        Reset(): void {
            this.y = -124;
        }

        Move(): void {
            this.y += this.speedY;
        }

        CheckBound(): void {
            if (this.y >= 0) {
                this.Reset();
            }
        }
    }
}

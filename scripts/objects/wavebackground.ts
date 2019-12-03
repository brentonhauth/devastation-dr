module objects {
    export class WaveBackground extends Background {

        private abyssBg: createjs.Bitmap;

        constructor(speed=1.5) {
            super(speed);

            this.abyssBg = new createjs.Bitmap(objects.Game.getAsset('abyss2'));

            let bounds = this.abyssBg.getBounds();
            let scale = this.canvasW / (bounds.width || 1);

            scale = Number(scale.toFixed(3));
            this.abyssBg.alpha = .7;
            let heightDiff = (scale * bounds.height) - this.canvasH;

            this.abyssBg.scaleX = this.abyssBg.scaleY = scale;

            this.abyssBg.x = 0;
            this.abyssBg.y = -(heightDiff / 2);
        }

        public Start() {
            super.Start();
            this.addChildAt(this.abyssBg, 0);
        }
    }
}

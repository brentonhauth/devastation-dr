module ui {
    export class Volumeslider extends createjs.Container {

        sliderContainer: createjs.Bitmap;
        sliderKnob: createjs.Bitmap;
        sliderValue: ui.Label;
        sliderTitle: ui.Label;
        volumeType: string;
        volumeLabel: ui.Label;
        constructor(volumeType: string) {
            super();

            this.volumeType = volumeType;
            this.sliderContainer = new createjs.Bitmap(objects.Game.assetManager.getResult("sliderContainer"));
            this.sliderKnob = new createjs.Bitmap(objects.Game.assetManager.getResult("sliderKnob"));

            this.sliderValue = new ui.Label(
                this.GetVolume(), "18px", "Arial", "#008000", 100, 0, true);
            this.sliderValue.outline = 1.5;

            this.sliderTitle = new ui.Label(
                this.volumeType, "25px", "Arial", "#008000", -50, 15, true);
            this.sliderTitle.outline = 2;

            this.sliderContainer.x = 10;
            this.sliderContainer.y = 8;

            this.sliderKnob.x = 185;
            this.sliderKnob.y = 0;

            this.addChild(this.sliderContainer, this.sliderKnob, this.sliderValue, this.sliderTitle);

            this.start();
        }

        public start(): void {
            this.sliderKnob.on("pressmove", () => {
                var point = this.localToGlobal(this.x, 0);
                if (this.stage.mouseX >= point.x - 5 && this.stage.mouseX <= point.x + 195) {
                    this.sliderKnob.x = this.stage.mouseX - point.x - 10;
                    this.SetVolume((this.sliderKnob.x - 5) / 180);
                    this.sliderValue.text = this.GetVolume();

                }
            });
        }

        public SetVolume(level: number): void {
            console.log(level);
            switch (this.volumeType) {
                case "Sfx":
                    managers.Sound.sfxVolume = level;
                    break;
                case "Music":
                    managers.Sound.musicVolume = level;
                    break;
                case "Sound":
                    managers.Sound.volume = level;
                    break;
            }
        }

        public GetVolume(): string {
            switch (this.volumeType) {
                case "Sfx":
                    return Math.round((managers.Sound.sfxVolume * 100)).toString();
                case "Music":
                    return Math.round((managers.Sound.musicVolume * 100)).toString();
                case "Sound":
                    return Math.round((managers.Sound.volume * 100)).toString();
            }
        }

    }
}
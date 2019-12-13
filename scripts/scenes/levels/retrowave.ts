module scenes {
    export class Retrowave extends PlayScene {


        private ending = false;
        private fadeCounter = 0;

        constructor() {
            super();
            this.background.Overlap = 5;
        }

        public Start() {
            super.Start();

            
            this.dialogHandler.TriggerMany(
                ["", 1, () => {
                    managers.Sound.sfx('monsterGrowl');
                }], ["", 2],
                ["There's that noise again...", 2, () => {
                    this.waveHandler.Start();
                }]
            );
        }

        public Update() {
            super.Update();

            if (this.ending) {
                this.fadeCounter++;

                if (!(createjs.Ticker.getTicks() % 2)) {
                    let randV2 = math.randVec2([-1, 1], [-1, 1]);
                    this.player.position = this.player.position.Add(randV2);
                }


                if (this.fadeCounter <= 250) {
                    this.player.alpha =
                    this.background.alpha = (250 - this.fadeCounter) / 250;
                    if (this.fadeCounter === 100) {
                        this.dialogHandler.Trigger("WHAAAAAAAAAAAA!", 1.5);
                    }
                } else {
                    this.ending = false;
                    let txt = new ui.Label("To be continued...", "28px", "Arial", "#000",
                    objects.Game.canvas.width / 2, objects.Game.canvas.height / 2, true);
                    this.dialogHandler.TriggerMany(
                        ["", 1],
                        ["", 1, () => {
                            this.addChild(txt);
                        }],
                        ["", 2, () => {
                            txt.text = "";
                        }],
                        ["", 1, () => {
                            txt.text = "In memory of Reggie";
                        }],
                        ["", 2, () => {
                            txt.text = "";
                        }],
                        ["", 1, () => {
                            managers.Keyboard.enable();
                            objects.Game.currentState = config.Scene.START;
                        }]
                    );
                }
            }
        }

        public Main() {
            super.Main();

            this.waveHandler.Add(
                new objects.Wave(
                    [objects.Boss, 1]
                )
            );

            this.waveHandler.on('complete', () => {
                this.ending = true;
                managers.Keyboard.disable();
                managers.Sound.music(false);
                // this.dialogHandler.TriggerMany(
                //     ["", 1.5, () => {

                //     }],
                //     ['', 2, () => {
                //         //objects.Game.currentState = config.Scene.START;
                //     }]
                // );
            });
        }
    }
}

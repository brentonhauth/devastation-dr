module scenes {
    export class ArcticScene extends PlayScene {

        private finishedCheck = false;
        private ending = false;

        constructor() {
            super();
        }

        public Start() {
            super.Start();

            this.background.Overlap = 104;

            if (!managers.Sound.isPlayingMusic) {
                managers.Sound.music("cyberpunker");
            }

            this.dialogHandler.TriggerMany(
                ["Brrr... When did it get so cold...", 3],
                ["", 1, () => this.waveHandler.Start()]
            );
        }

        public Update() {
            super.Update();

            if (!this.finishedCheck && this.waveHandler.CompletedAllWaves) {
                managers.Keyboard.disable();
                this.player.intangible = true;
                this.player.canLeaveBounds = true;
                this.dialogHandler.TriggerMany(
                    ["Hopefully that's the last of 'em.", 2], ["", 1],
                    ["Wait what's that in the distance?!", 3],
                    ["Whatever it is, it\ndoesn't look normal...", 3, ()=>this.ending=true],
                    ["", 2.5],
                    ["[  to be continued...  ]", 3, () => {
                        objects.Game.currentState = config.Scene.START;
                        managers.Keyboard.enable();
                        managers.Sound.music(false);
                    }]
                );

                this.finishedCheck = true;
            }

            if (this.ending) {
                this.player.position = this.player.position.Add(new math.Vec2(0, -8));
            }
        }

        public Main() {
            super.Main();

            this.waveHandler.Add(
                new objects.Wave([objects.Penguin, 2]),
                new objects.Wave([objects.Penguin, 3]),
                new objects.Wave([objects.Penguin, 5]),

                new objects.Wave(
                    [objects.Wolf, 5],
                    [objects.Penguin, 3]
                ),

                new objects.Wave(new objects.PolarBear()),

                new objects.Wave(
                    new objects.PolarBear(),
                    [objects.Penguin, 2]
                ),

                new objects.Wave([objects.PolarBear, 3]),

                // new objects.Wave([objects.Wolf, 5]),
                // new objects.Wave(
                //     [objects.Wolf, 5],
                //     [objects.Penguin, 2]
                // )
            );
        }
    }
}

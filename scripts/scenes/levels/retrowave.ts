module scenes {
    export class Retrowave extends PlayScene {
        constructor() {
            super();
            this.background.Overlap = 5;
        }

        public Start() {
            super.Start();

            this.dialogHandler.Trigger('[ Final level ]', 2, () => {
                this.waveHandler.Start();
            });
        }

        public Update() {
            super.Update();

        }

        public Main() {
            super.Main();

            this.waveHandler.Add(
                new objects.Wave(
                    [objects.Boss, 1]
                )
            );

            this.waveHandler.on('complete', () => {
                this.dialogHandler.TriggerMany(
                    ['Ending...', 2, () => {
                        objects.Game.currentState = config.Scene.START;
                    }]
                );
            });
        }
    }
}

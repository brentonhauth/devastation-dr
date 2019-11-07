module scenes {
    export class JungleScene extends PlayScene {

        private finishedCheck = false;

        constructor() {
            super("jungle");
        }

        public Start() {
            super.Start();

            managers.Sound.music("cyberpunker");

            this.dialogHandler.TriggerMany(
                ["I've entered this part!", 2],
                ["I hope something bad\ndoesn't happen...", 2,
                    () => this.waveHandler.Start()]
            );
        }

        public Update() {
            super.Update();

            if (this.waveHandler.CompletedAllWaves && !this.finishedCheck) {
                this.dialogHandler.TriggerMany(
                    ["It looks like that's the last of 'em!", 2.5],
                    ["The drive home feels a lot\nlonger than normal...", 3],
                    ["", 1], ["I have to keep a clear head!", 3],
                    ["I'll reach the end eventually!", 3],
                    ["", 2, () => {
                        objects.Game.currentState = config.Scene.DESERT;
                    }]
                );

                this.finishedCheck = true;
            }

        }

        public Main() {
            super.Main();

            this.waveHandler.Add(

                new objects.Wave(new objects.Lizard()),

                // This wave has 25 spiders,
                // and they all act different
                new objects.Wave(
                    [objects.Spider, 25]
                ).Behavior(objects.Spider, (x, y, index) => {
                    x = index % 2 === 0 ?
                        (x < 760 ? x + 5 : 0) :
                        (x > 0 ? x - 5 : 760);
                    y = y < 700 ? y + 1 : -100;
                    return new math.Vec2(x, y);
                }),

                // this wave has 5 spiders & 2 lizards
                new objects.Wave(
                    [objects.Spider, 5],
                    [objects.Lizard, 2]
                ),

                // this wave has 5 lizards
                new objects.Wave([objects.Lizard, 5])
            );
        }
    }
}

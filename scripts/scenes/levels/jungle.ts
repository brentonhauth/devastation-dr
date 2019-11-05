module scenes {
    export class JungleScene extends PlayScene {
        constructor() {
            super();
        }

        public Start() {
            super.Start();


            this.dialogHandler.TriggerMany(
                ["I've entered this part!", 2],
                ["I hope something bad\ndoesn't happen", 2,
                () => {
                    this.waveHandler.Start();
                }]
            );
        }

        public Update() {
            super.Update();
        }

        public Main() {
            super.Main();

            let wave1 = new objects.Wave(
                new objects.Spider(),
                new objects.Spider(),
                new objects.Spider(),
                new objects.Spider(),
                new objects.Spider()
            );


            let wave2 = new objects.Wave();

            wave2.Add(
                [objects.Spider, 5],
                [objects.Lizard, 2]
                // new objects.Spider(),
                // new objects.Spider(),

                // new objects.Lizard(),

                // new objects.Spider(),
                // new objects.Spider(),
                // new objects.Spider(),

                // new objects.Lizard(),
            );

            wave1.AddAmount(objects.Spider, 20);
            // SAME AS: wave1.Add([objects.Spider, 20]);

            wave1.Behavior(objects.Spider, (x, y, index) => {
                if (index % 2 === 0) {
                    x += 5;
                    if (x > 760) {
                        x = 0;
                    }
                } else {
                    x -= 5;
                    if (x < 0) {
                        x = 760;
                    }
                }
                y += 1;
                if (y > 700) {
                    y = -100;
                }
                return new math.Vec2(x, y);
            });


            this.waveHandler.Add(
                wave1, wave2
            );

            // this.waveHandler.Start();
        }
    }
}

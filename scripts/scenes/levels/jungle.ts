module scenes {
    export class JungleScene extends PlayScene {

        private finishedCheck = false;

        private bgs: createjs.Bitmap[];

        private ending = false;

        constructor() {
            super();

            this.bgs = new Array<createjs.Bitmap>();


            this.bgs.push(
                new createjs.Bitmap(objects.Game.assetManager.getResult("jungle")),
                new createjs.Bitmap(objects.Game.assetManager.getResult("jungle"))
            );


            
            this.bgs.forEach(b => {
                b.x = 0;
                b.scaleX = b.scaleY = 1.35;
                this.addChild(b);
            });

            // 1142[.1] = 846 * 1.35
            this.bgs[1].y = -572; // -1142 + 570
            this.bgs[0].y = -1704; // (-572 - 1142) + 10
        }

        public Start() {
            super.Start();

            this.removeChild(this.background);

            if (!managers.Sound.isPlayingMusic) {
                managers.Sound.music("cyberpunker");
            }

            this.dialogHandler.TriggerMany(
                ["I've entered this part!", 2],
                ["I hope something bad\ndoesn't happen...", 2,
                    () => this.waveHandler.Start()]
            );
        }

        public Update() {
            super.Update();

            if (this.waveHandler.CompletedAllWaves && !this.finishedCheck) {

                this.player.intangible = true;
                managers.Keyboard.disable();

                this.dialogHandler.TriggerMany(
                    ["It looks like that's the last of 'em!", 2.5],
                    ["The drive home feels a lot\nlonger than normal...", 3],
                    ["", 1], ["I have to keep a clear head!", 3],
                    ["I'll reach the end eventually!", 3, () => {
                        this.ending = true;
                        this.player.canLeaveBounds = true;
                    }],
                    ["", 2.5, () => {
                        objects.Game.currentState = config.Scene.DESERT;
                        managers.Keyboard.enable();
                    }]
                );

                this.finishedCheck = true;
            }

            if (this.ending) {
                this.player.position = this.player.position.Add(new math.Vec2(0, -8));
            }

            this.bgs.forEach((b, i) => {
                b.y += 1.5;
                // 104 = 65 * 1.6
                if (b.y >= 570) {
                    let b2 = this.bgs[!!i?0:1];
                    this.removeChild(b, b2);
                    let h = 1142;
                    this.addChildAt(b, 0);
                    this.addChildAt(b2, 1);
                    b.y = b2.y - h + 10;
                    console.log(b.y, b2.y)
                }
            });   

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

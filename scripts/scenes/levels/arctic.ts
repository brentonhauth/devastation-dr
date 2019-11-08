module scenes {
    export class ArcticScene extends PlayScene {

        private finishedCheck = false;
        private ending = false;

        private backings: createjs.Bitmap[];

        constructor() {
            super();

            this.backings = new Array<createjs.Bitmap>();


            this.backings.push(
                new createjs.Bitmap(objects.Game.assetManager.getResult("arctic")),
                new createjs.Bitmap(objects.Game.assetManager.getResult("arctic"))
            );


            
            this.backings.forEach((b, i) => {
                b.x = 0;
                b.scaleX = b.scaleY = 1.6;
                this.addChild(b);
            });
            
            // 1107[.2] = 692 * 1.6
            // 537 = 1107 - 570
            this.backings[1].y = -537;
            // -1540 = (-537 - 1107) + 104
            this.backings[0].y = -1540;

        }

        public Start() {
            super.Start();

            this.removeChild(this.background);

            managers.Sound.music("cyberpunker");

            this.dialogHandler.TriggerMany(
                ["Brrr... When did it get so cold...", 3],
                ["", 1, () => this.waveHandler.Start()]
            );
        }

        public Update() {
            super.Update();

            // this.backings[0].x=objects.Game.stage.mouseX;
            // this.backings[0].y=objects.Game.stage.mouseY;

            if (!this.finishedCheck && this.waveHandler.CompletedAllWaves) {
                managers.Keyboard.disable();
                this.player.intangible = true;
                this.dialogHandler.TriggerMany(
                    ["Hopefully that's the last of 'em.", 2], ["", 1],
                    ["Wait what's that in the distance?!", 3],
                    ["Whatever it is, it\ndoesn't look normal...", 3, ()=>this.ending=true],
                    ["", 2.5],
                    ["[  to be continued...  ]", 3, () => {
                        objects.Game.currentState = config.Scene.START;
                        managers.Keyboard.enable();
                    }]
                );

                this.finishedCheck = true;
            }

            if (this.ending) {
                this.player.position = this.player.position.Add(new math.Vec2(0, -8));
            }


            this.backings.forEach((b, i) => {
                b.y += 1.5;
                // 104 = 65 * 1.6
                if (b.y >= 570) {
                    let b2 = this.backings[!!i?0:1];
                    this.removeChild(b, b2);
                    let h = 692 * 1.6;
                    this.addChildAt(b, 0);
                    this.addChildAt(b2, 1);
                    b.y = b2.y - h + 104;
                    console.log(b.y, b2.y)
                }
            });        
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

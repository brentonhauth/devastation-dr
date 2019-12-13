module scenes {
    export class DesertScene extends PlayScene {

        private ending = false;

        constructor() {
            super();
            this.background.Overlap = 20;
        }

        public Start() {
            super.Start();

            if (!managers.Sound.isPlayingMusic) {
                managers.Sound.music("cyberpunker");
            }

            this.dialogHandler.TriggerMany(
                ["Man, when did it get so hot?", 2.5,
                () => this.waveHandler.Start()]
            );
        }

        public Update() {
            super.Update();


            if (this.ending) {
                this.player.position = this.player.position.Add(new math.Vec2(0, -8));
            }
        }

        public Main() {
            this.waveHandler.Add(

                new objects.Wave(
                    [objects.Jackal, 3]
                ),

                new objects.Wave(
                    [objects.Lizard, 1]
                ),

                new objects.Wave(
                    [objects.Turtle, 1]
                ),

                new objects.Wave(
                    [objects.Turtle, 2]
                ),

                new objects.Wave(
                    [objects.Lizard, 2],
                    [objects.Turtle, 1]
                ),

                new objects.Wave(
                    [objects.Turtle, 2],
                    [objects.Lizard, 2]
                ),

                new objects.Wave(
                    [objects.Camel, 1]
                ),

            );

            this.waveHandler.on('complete', () => {
                this.player.intangible = true;
                managers.Keyboard.disable();

                this.dialogHandler.TriggerMany(
                    ["I think that's it for now...", 2],
                    ["We're pretty far north, but it's\n"+
                    "really hot for some reason...", 3,
                    () => {
                        this.ending = true;
                        this.player.canLeaveBounds = true;
                    }],
                    ["", 2.5, () => {
                        managers.Keyboard.enable();
                        objects.Game.currentState = config.Scene.ARCTIC;
                    }]
                );
            });
        }
    }
}

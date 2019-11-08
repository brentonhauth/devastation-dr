module scenes {
    export class DesertScene extends PlayScene {
        constructor() {
            super();
        }

        public Start() {
            super.Start();
            this.waveHandler.Start();
        }

        public Update() {
            super.Update();
        }

        public Main() {
            this.waveHandler.Add(
                new objects.Wave([objects.Turtle, 1])
            );
        }
    }
}

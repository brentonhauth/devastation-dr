module scenes {
    export class ArcticScene extends PlayScene {
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
            super.Main();

            this.waveHandler.Add(
                new objects.Wave([objects.Wolf, 5])
            );
        }
    }
}

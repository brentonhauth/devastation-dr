module handlers {
    export class WaveHandler {
        public currentWave: objects.Wave;
        private waves: objects.Wave[];
        private playScene: scenes.PlayScene;

        public get CompletedAllWaves(): boolean {
            return this.currentWave &&
            this.currentWave.IsDone &&
            this.waves.length === 0;
        }

        public get ActiveEnemies(): objects.Enemy[] {
            return this.currentWave ?
            this.currentWave.enemies : [];
        }

        constructor(playScene: scenes.PlayScene) {
            this.playScene = playScene;
            this.waves = new Array<objects.Wave>();
        }
        
        public Start() {
            // this.NextWave();
            this.currentWave = this.waves.shift();
            if (this.currentWave) {
                this.currentWave.Start();
            }
        }

        public Update() {
            if (!this.currentWave || this.currentWave.IsDone) {
                this.Start();
            } else if (!this.CompletedAllWaves) {
                this.currentWave.Update();
            }
        }

        public CheckCollision(against:objects.GameObject|objects.GameObject[]) {
            if (this.currentWave) {
                this.currentWave.CheckCollision(against);
            }
        }

        private NextWave() {
            this.currentWave = this.waves.shift();
        }

        public Add(...ws: objects.Wave[]) {
            ws.forEach(w => {
                w.playScene = this.playScene;
                this.waves.push(w);
            });
        }
    }
}
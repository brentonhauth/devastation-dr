module handlers {

    /**
     * TODO:
     * - loop through waves and create a pool of all the required enemies
     * - instantiate only the required amount per wave
     * - use gameObject.Reset() to reset an enemy
     * - On gameObject.Destroy(), remove object from scene, and store object in pool.
     */
    export class WaveHandler {
        public currentWave: objects.Wave;
        private waves: objects.Wave[];
        private playScene: scenes.PlayScene;
        private hasStarted = false;

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
        
        /**
         * Call when you would like the waves to start
         */
        public Start() {
            this.hasStarted = true;
        }

        public Update() {
            if (!this.hasStarted) { return; }

            if (!this.currentWave || this.currentWave.IsDone) {
                this.NextWave();
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
            if (this.currentWave) {
                this.currentWave.Start();
            }
        }

        public Add(...ws: objects.Wave[]) {
            ws.forEach(w => {
                w.playScene = this.playScene;
                this.waves.push(w);
            });
        }
    }
}

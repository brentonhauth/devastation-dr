module handlers {

    type VoidCallback = () => void;
    type NextWaveCallback = (waveID: number) => void;

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
        private hasFinished = false;
        private m_onCompleteCb: VoidCallback;
        private m_onStartCb: VoidCallback;
        private m_onNextWaveCb: NextWaveCallback;

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
            this.NextWave();

            if (typeof this.m_onStartCb === 'function') {
                this.m_onStartCb();
            }
        }

        public Update() {
            if (!this.hasStarted || this.hasFinished) { return; }

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

                if (typeof this.m_onNextWaveCb === 'function') {
                    this.m_onNextWaveCb(3);
                }

            } else if (this.waves.length === 0 && !this.hasFinished) { // is finished
                this.hasFinished = true;

                if (typeof this.m_onCompleteCb === 'function') {
                    this.m_onCompleteCb();
                }

            }
        }

        public on(event: 'start'|'complete'|'next', callback: VoidCallback|NextWaveCallback) {
            switch (event) {
                case 'start':
                    this.m_onStartCb = <VoidCallback>callback;
                    break;
                case 'complete':
                    this.m_onCompleteCb = <VoidCallback>callback;
                    break;
                case 'next':
                    this.m_onNextWaveCb = <NextWaveCallback>callback;
                    break;
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

module handlers {

    type VoidCallback = () => void;
    type NextWaveCallback = (waveID: number) => void;
    type EnemyPool = { type: any, amount: number, enemies: math.Queue<objects.Enemy> };

    /**
     * TODO:
     * - test...
     * - Turn math.Queue into a better 'EnemyPool' system
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

        private enemyPools: Array<EnemyPool>;

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
            this.enemyPools = new Array<EnemyPool>();
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

        public UpdateAndCheckCollision(against:objects.GameObject|objects.GameObject[]) {
            if (!this.hasStarted || this.hasFinished) { return; }

            if (!this.currentWave || this.currentWave.IsDone) {
                this.NextWave();
            } else {
                this.currentWave.UpdateAndCheckCollision(against);
            }
        }

        private NextWave() {
            this.currentWave = this.waves.shift();
            if (this.currentWave) {
                this.currentWave.Start();

                if (typeof this.m_onNextWaveCb === 'function') {
                    this.m_onNextWaveCb(this.currentWave.id);
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

        public Add(...waves: objects.Wave[]) {
            waves.forEach(wave => {
                wave.playScene = this.playScene;
                this.waves.push(wave);
            });
        }

        public TallyAmount(enemyAmount: objects.EnemyAmount) {
            let foundPool = false;
            this.enemyPools.forEach(pool => {
                if (!foundPool && pool.type === enemyAmount.type) {
                    if (pool.amount < enemyAmount.amount) {
                        pool.amount = enemyAmount.amount;
                    }
                    foundPool = true;
                }
            });

            if (!foundPool) {
                this.enemyPools.push({
                    type: enemyAmount.type,
                    amount: enemyAmount.amount,
                    enemies: new math.Queue<typeof enemyAmount.type>()
                });
            }
        }

        public AcquireFromPool(enemyAmount: objects.EnemyAmount): objects.Enemy[] {
            let enemies: Array<objects.Enemy>;
            for (let pool of this.enemyPools) {
                if (pool.type === enemyAmount.type) {
                    enemies = pool.enemies.pop(enemyAmount.amount);

                    enemies.forEach(e => e.Reset());
                    if (enemies.length < enemyAmount.amount) {
                        let missing = enemyAmount.amount - enemies.length;
                        for (let j = 0; j < missing; j++) {
                            enemies.push(new pool.type());
                        }
                    }

                    return enemies;
                }
            }
            return [];
        }

        public Pool(enemy: objects.Enemy) {
            let foundPool = false;
            this.enemyPools.forEach(pool => {
                if (!foundPool && enemy instanceof pool.type) {
                    pool.enemies.push(enemy);
                }
            });
        }
    }
}

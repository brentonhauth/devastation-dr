var handlers;
(function (handlers) {
    // type EnemyPool = { type: any, amount: number, enemies: math.Queue<objects.Enemy> };
    /**
     * TODO:
     * - test...
     */
    var WaveHandler = /** @class */ (function () {
        function WaveHandler(playScene) {
            this.hasStarted = false;
            this.hasFinished = false;
            this.playScene = playScene;
            this.waves = new Array();
            this.enemyPools = new Array();
        }
        Object.defineProperty(WaveHandler.prototype, "CompletedAllWaves", {
            get: function () {
                return this.currentWave &&
                    this.currentWave.IsDone &&
                    this.waves.length === 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WaveHandler.prototype, "ActiveEnemies", {
            get: function () {
                return this.currentWave ?
                    this.currentWave.enemies : [];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Call when you would like the waves to start
         */
        WaveHandler.prototype.Start = function () {
            this.hasStarted = true;
            this.NextWave();
            if (this.m_onStartCb) {
                this.m_onStartCb();
            }
        };
        WaveHandler.prototype.Update = function () {
            if (!this.hasStarted || this.hasFinished) {
                return;
            }
            if (!this.currentWave || this.currentWave.IsDone) {
                this.NextWave();
            }
            else if (!this.CompletedAllWaves) {
                this.currentWave.Update();
            }
        };
        WaveHandler.prototype.CheckCollision = function (against) {
            if (this.currentWave) {
                this.currentWave.CheckCollision(against);
            }
        };
        WaveHandler.prototype.UpdateAndCheckCollision = function (against) {
            if (!this.hasStarted || this.hasFinished) {
                return;
            }
            if (!this.currentWave || this.currentWave.IsDone) {
                this.NextWave();
            }
            else {
                this.currentWave.UpdateAndCheckCollision(against);
            }
        };
        WaveHandler.prototype.NextWave = function () {
            this.currentWave = this.waves.shift();
            if (this.currentWave) {
                this.currentWave.Start();
                if (this.m_onNextWaveCb) {
                    this.m_onNextWaveCb(this.currentWave.id);
                }
            }
            else if (this.waves.length === 0 && !this.hasFinished) { // is finished
                this.hasFinished = true;
                if (this.m_onCompleteCb) {
                    this.m_onCompleteCb();
                }
            }
        };
        WaveHandler.prototype.on = function (event, callback) {
            switch (event) {
                case 'start':
                    this.m_onStartCb = callback;
                    break;
                case 'complete':
                    this.m_onCompleteCb = callback;
                    break;
                case 'next':
                    this.m_onNextWaveCb = callback;
                    break;
            }
        };
        WaveHandler.prototype.Add = function () {
            var _this = this;
            var waves = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                waves[_i] = arguments[_i];
            }
            waves.forEach(function (wave) {
                wave.playScene = _this.playScene;
                _this.waves.push(wave);
            });
        };
        WaveHandler.prototype.TallyAmount = function (enemyAmount) {
            var foundPool = false;
            this.enemyPools.forEach(function (pool) {
                if (!foundPool && pool.type === enemyAmount.type) {
                    if (pool.limit < enemyAmount.amount) {
                        pool.limit = enemyAmount.amount;
                    }
                    foundPool = true;
                }
            });
            if (!foundPool) {
                this.enemyPools.push(new math.Pool(enemyAmount.type, enemyAmount.amount));
            }
        };
        WaveHandler.prototype.AcquireFromPool = function (enemyAmount) {
            var enemies;
            for (var _i = 0, _a = this.enemyPools; _i < _a.length; _i++) {
                var pool = _a[_i];
                if (pool.type === enemyAmount.type) {
                    enemies = pool.pop(enemyAmount.amount);
                    enemies.forEach(function (e) { return e.Reset(); });
                    if (enemies.length < enemyAmount.amount) {
                        var missingAmount = enemyAmount.amount - enemies.length;
                        var missing = pool.More(missingAmount);
                        enemies.push.apply(enemies, missing);
                    }
                    return enemies;
                }
            }
            return [];
        };
        WaveHandler.prototype.Pool = function (enemy) {
            var foundPool = false;
            this.enemyPools.forEach(function (pool) {
                if (!foundPool && enemy instanceof pool.type) {
                    pool.push(enemy);
                }
            });
        };
        return WaveHandler;
    }());
    handlers.WaveHandler = WaveHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=waveHandler.js.map
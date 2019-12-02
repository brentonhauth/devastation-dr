var handlers;
(function (handlers) {
    /**
     * TODO:
     * - loop through waves and create a pool of all the required enemies
     * - instantiate only the required amount per wave
     * - use gameObject.Reset() to reset an enemy
     * - On gameObject.Destroy(), remove object from scene, and store object in pool.
     */
    var WaveHandler = /** @class */ (function () {
        function WaveHandler(playScene) {
            this.hasStarted = false;
            this.hasFinished = false;
            this.playScene = playScene;
            this.waves = new Array();
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
            if (typeof this.m_onStartCb === 'function') {
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
        WaveHandler.prototype.NextWave = function () {
            this.currentWave = this.waves.shift();
            if (this.currentWave) {
                this.currentWave.Start();
                if (typeof this.m_onNextWaveCb === 'function') {
                    this.m_onNextWaveCb(3);
                }
            }
            else if (this.waves.length === 0 && !this.hasFinished) { // is finished
                this.hasFinished = true;
                if (typeof this.m_onCompleteCb === 'function') {
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
            var ws = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                ws[_i] = arguments[_i];
            }
            ws.forEach(function (w) {
                w.playScene = _this.playScene;
                _this.waves.push(w);
            });
        };
        return WaveHandler;
    }());
    handlers.WaveHandler = WaveHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=waveHandler.js.map
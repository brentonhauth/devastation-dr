var handlers;
(function (handlers) {
    var WaveHandler = /** @class */ (function () {
        function WaveHandler(playScene) {
            this.hasStarted = false;
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
        };
        WaveHandler.prototype.Update = function () {
            if (!this.hasStarted) {
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
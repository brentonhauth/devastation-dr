var handlers;
(function (handlers) {
    var WaveHandler = /** @class */ (function () {
        function WaveHandler(playScene) {
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
        WaveHandler.prototype.Start = function () {
            // this.NextWave();
            this.currentWave = this.waves.shift();
            if (this.currentWave) {
                this.currentWave.Start();
            }
        };
        WaveHandler.prototype.Update = function () {
            if (!this.currentWave || this.currentWave.IsDone) {
                this.Start();
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
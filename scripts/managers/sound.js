var managers;
(function (managers) {
    var Sound = /** @class */ (function () {
        function Sound() {
        }
        Object.defineProperty(Sound, "volume", {
            get: function () {
                return this.masterVol;
            },
            set: function (level) {
                this.masterVol = level > 1 ? 1 : (level < 0 ? 0 : level);
                if (this.backgroundMusic) {
                    this.backgroundMusic.volume = this.musicVol * this.masterVol;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sound, "sfxVolume", {
            get: function () {
                return this.sfxVol;
            },
            set: function (level) {
                this.sfxVol = level > 1 ? 1 : (level < 0 ? 0 : level);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sound, "musicVolume", {
            get: function () {
                return this.musicVol;
            },
            set: function (level) {
                this.musicVol = level > 1 ? 1 : (level < 0 ? 0 : level);
                if (this.backgroundMusic) {
                    this.backgroundMusic.volume = this.musicVol * this.masterVol;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sound, "isPlayingMusic", {
            get: function () {
                return this.playingMusic;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         * @param id give it a src to play, or a boolean to turn the music off/on (doesn't work if music was never set)
         */
        Sound.music = function (id) {
            if (typeof id === "string") {
                if (this.backgroundMusic) {
                    this.backgroundMusic.stop();
                }
                this.backgroundMusic = createjs.Sound.play(id);
                this.backgroundMusic.loop = -1;
                this.backgroundMusic.volume = this.musicVol * this.masterVol;
                this.playingMusic = true;
            }
            else if (this.backgroundMusic) {
                if (id && !this.playingMusic) {
                    this.backgroundMusic.play();
                    this.playingMusic = true;
                }
                else if (this.playingMusic) {
                    this.playingMusic = false;
                    this.backgroundMusic.stop();
                }
            }
        };
        Sound.sfx = function (id) {
            var sfx, vol = Sound.sfxVol * Sound.masterVol;
            if (Sound.sfxMap[id]) {
                Sound.sfxMap[id].volume = vol;
                sfx = Sound.sfxMap[id];
                if (sfx.playState === 'playFinished') {
                    sfx.play();
                }
            }
            else {
                Sound.sfxMap[id] = sfx = createjs.Sound.play(id);
                sfx.volume = vol;
            }
            return sfx;
        };
        Sound.musicVol = 1.0;
        Sound.sfxVol = 1.0;
        Sound.masterVol = 1.0;
        Sound.sfxMap = {};
        Sound.playingMusic = false;
        return Sound;
    }());
    managers.Sound = Sound;
})(managers || (managers = {}));
//# sourceMappingURL=sound.js.map
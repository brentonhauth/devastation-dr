module managers {
    export class Sound {

        private static musicVol = 1.0;
        private static sfxVol = 1.0;
        private static masterVol = 1.0;

        private static sfxMap = {};

        private static playingMusic = false;

        private static backgroundMusic: createjs.AbstractSoundInstance;


        public static get volume(): number {
            return this.masterVol;
        }
        
        public static set volume(level: number) {
            this.masterVol = level > 1 ? 1 : (level < 0 ? 0 : level);
            if (this.backgroundMusic) {
                this.backgroundMusic.volume = this.musicVol * this.masterVol;
            }
        }


        public static get sfxVolume(): number {
            return this.sfxVol;
        }

        public static set sfxVolume(level: number) {
            this.sfxVol = level > 1 ? 1 : (level < 0 ? 0 : level);
        }


        public static get musicVolume(): number {
            return this.musicVol;
        }

        public static set musicVolume(level: number) {
            this.musicVol = level > 1 ? 1 : (level < 0 ? 0 : level);
            if (this.backgroundMusic) {
                this.backgroundMusic.volume = this.musicVol * this.masterVol;
            }
        }


        public static get isPlayingMusic(): boolean {
            return this.playingMusic;
        }

        /**
         * 
         * @param id give it a src to play, or a boolean to turn the music off/on (doesn't work if music was never set)
         */
        public static music(id: string | boolean): void {

            if (typeof id === "string") {
                if (this.backgroundMusic) {
                    this.backgroundMusic.stop();
                }
                this.backgroundMusic = createjs.Sound.play(id);
                this.backgroundMusic.loop = -1;
                this.backgroundMusic.volume = this.musicVol * this.masterVol;

                this.playingMusic = true;
            } else if (this.backgroundMusic) {
                if (id && !this.playingMusic) {
                    this.backgroundMusic.play();
                    this.playingMusic = true;
                } else if (this.playingMusic) {
                    this.playingMusic = false;
                    this.backgroundMusic.stop();
                }
            }
        }

        public static sfx(id: string) {
            let sfx: createjs.AbstractSoundInstance,
            vol = Sound.sfxVol * Sound.masterVol;
            if (Sound.sfxMap[id]) {
                (<createjs.AbstractSoundInstance>Sound.sfxMap[id]).volume = vol;
                sfx = (<createjs.AbstractSoundInstance>Sound.sfxMap[id]).play();
            } else {
                Sound.sfxMap[id] = sfx = createjs.Sound.play(id);
                sfx.volume = vol;
            }
            return sfx;
        }
    }
}

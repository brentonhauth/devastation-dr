module managers {

    
    
    export class Input {
        private static keydownMaping: InputOption[];

        // Remove (?)
        //private static keyupMaping: InputOption[];
        //private static keyholdMaping: InputOption[];

        public static Init() {
            this.keydownMaping = new Array<InputOption>(0);
        }

        public static keypress(key: string, callback: Function): void {
            let io: InputOption = new InputOption(key, KeyAction.Down, callback);
            Input.keydownMaping.push(io);
        }

        public static listen(): void {
            this.keydownMaping = new Array<InputOption>(0);
            window.addEventListener("keydown", Input.onKey, false);
        }

        private static onKey(e: any): void {
            let key = e.key ? e.key.toLowerCase() : "";
            Input.keydownMaping.forEach(k => {
                if (k.key.toLowerCase() == key && !k.disabled) {
                    k.Call(e);
                }
            });
        }

        public static disable(key: string): void {
            key = key.toLowerCase();
            Input.keydownMaping.forEach(keyOption => {
                if (keyOption.key.toLowerCase() == key) {
                    keyOption.disabled = true;
                }
            });
        }

        public static enabled(key: string): void {
            key = key.toLowerCase();
            Input.keydownMaping.forEach(keyOption => {
                if (keyOption.key.toLowerCase() == key) {
                    keyOption.disabled = false;
                }
            });
        }
    }


    class InputOption {
        public key: string;
        public disabled: boolean;
        private keyAction: KeyAction;
        private callback: Function;

        constructor(key: string, keyAct: KeyAction, callback: Function) {
            this.disabled = false;
            this.key = key.charAt(0);
            this.keyAction = keyAct;
            this.callback = callback;
        }

        Call(e: any) {
            this.callback(e);
        }
    }

    enum KeyAction { Down, Up, Hold }
}

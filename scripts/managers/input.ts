module managers {

    
    
    export class Input {
        private static keydownMaping: InputOption[];

        // Remove (?)
        //private static keyupMaping: InputOption[];
        //private static keyholdMaping: InputOption[];

        public static Init() {
            this.keydownMaping = new Array<InputOption>(0);
        }

        public static keypress(key: string, callback: Function): InputOption {
            let io: InputOption = new InputOption(key, KeyAction.Down, callback);
            Input.keydownMaping.push(io);
            return io;
        }

        public static listen(): void {
            this.keydownMaping = new Array<InputOption>(0);
            window.addEventListener("keydown", Input.onKey, false);
        }

        private static onKey(e: any): void {
            let key = e.key ? e.key.toLowerCase() : "";
            Input.keydownMaping.forEach(k => {
                if (k.getKey().toLowerCase() == key && !k.isDisabled()) {
                    k.Call(e);
                }
            });
        }

        public static disable(key: string): void {
            key = key.toLowerCase();
            Input.keydownMaping.forEach(keyOption => {
                if (keyOption.getKey().toLowerCase() == key) {
                    keyOption.disable();
                }
            });
        }

        public static enabled(key: string): void {
            key = key.toLowerCase();
            Input.keydownMaping.forEach(keyOption => {
                if (keyOption.getKey().toLowerCase() == key) {
                    keyOption.enable();
                }
            });
        }
    }


    export class InputOption {
        private key: string;
        private disabled: boolean;
        private keyAction: KeyAction;
        private callback: Function;

        constructor(key: string, keyAct: KeyAction | number, callback: Function) {
            this.disabled = false;
            this.key = key.charAt(0);
            this.keyAction = keyAct;
            this.callback = callback;
        }

        public getKey() {
            return this.key;
        }

        Call(e: any) {
            this.callback(e);
        }

        public isDisabled() {
            return this.disabled;
        }

        public disable() {
            this.disabled = true;
        }

        public enable() {
            this.disabled = false;
        }
    }

    export enum KeyAction { Down, Up, Hold }
}

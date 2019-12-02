module math {
    export class Queue<T> {
        private array: Array<T>;

        constructor() {
            this.array = new Array<T>();
        }

        public push(...items: T[]) {
            items.forEach(item => {
                this.array.push(item);
            });
        }

        public pop(amount?: number) {
            if (amount <= 0) {
                return []; // this.array.shift();
            }

            let popped = new Array<T>();

            for (let i = 0; i < amount; i++) {
                let e = this.array.shift();
                if (e !== undefined) {
                    popped.push(e);
                } else break;
            }

            return popped;
        }
    }
}

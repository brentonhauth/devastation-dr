module math {

    // type ObjectType = ;
    export class Pool<T extends objects.GameObject> {
        
        public type: any;

        public limit: number = 0;

        public get size(): number {
            return this.arr.length;
        }

        private arr: Array<T>;

        constructor(type?: any, limit?: number) {
            this.arr = new Array<T>();

            let typeDef: boolean,
            limitGt0: boolean;
            if (typeDef=!!type) {
                this.type = type;
            }

            if (limitGt0=(limit > 0)) {
                this.limit = limit;
            }

            // if (typeDef && limitGt0) {
            //     this.IncreasePool(limit);
            // }
        }

        public push(...items: T[]) {
            return this.arr.push(...items);
        }

        public pop(amount?: number): T[] {
            if (!amount || amount < 0) {
                return [this.arr.shift()];
            }

            let popped: T[] = [];

            for (let i = 0; i < amount; i++) {
                let item = this.arr.shift();

                if (item === undefined) {
                    return popped;
                }

                popped.push(item);
            }

            return popped;
        }

        public forEach(iter: (item:T,index?:number)=>void) {
            this.arr.forEach(iter);
        }

        public IncreasePool(amount: number) {
            if (!this.type || !amount || amount < 0) {
                return [];
            }

            // let added: T[] = [],
            let type = this.type;

            for (let i = 0; i < amount; i++) {
                let item = new type();
                this.arr.push(item);
            }
        }

        public More(amount: number) {
            if (!amount || amount < 0) {
                return [];
            }

            let added: T[] = [],
            type = this.type;

            for (let i = 0; i < amount; i++) {
                let item = new type();
                added.push(item);
            }

            return added;
        }

    }

    // let p = new Pool<objects.Jackal>();
}

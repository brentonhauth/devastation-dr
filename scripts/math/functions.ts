module math {
    export function cosWaveFunction(stretch: number, depth: number): Function {
        let o: any = { stretch, depth };
        o.fn = (val: number): number => {

            if (o.stretch == 0) {
                return o.depth;
            }

            return Math.cos(val / o.stretch) * o.depth;
        };

        return o.fn;
    }


    export function randRange(min: number, max: number=null): number {
        if (max === null) {
            [min, max] = [0, min];
        }
        let r = Math.random() * (max - min);
        
        return min + r;
    }
}

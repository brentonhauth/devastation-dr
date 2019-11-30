module math {

    const PI_OVER_180 = Math.PI / 180;

    export function cosWaveFunction(stretch: number, depth: number): (val:number)=>number {
        let o: any = { stretch, depth };
        o.fn = (val: number): number => {

            if (o.stretch === 0) {
                return o.depth;
            }

            return Math.cos(val / o.stretch) * o.depth;
        };

        return o.fn;
    }


    export function randRange(min: number, max?: number): number {
        if (max === undefined) {
            max = min;
            min = 0;
        }

        let rnd = Math.random() * (max - min);
        
        return min + rnd;
    }

    export function randInt(min: number, max?: number): number {
        if (max === undefined) {
            max = min;
            min = 0;
        } else if (min % 1) {
            min = Math.round(min);
        }

        if (max % 1) {
            max = Math.round(max);
        }

        let rnd = Math.random() * (max - min);

        return min + Math.round(rnd);
    }

    /**
     * 
     * @param {Number|[Number, Number]} x Range for the x value
     * @param {Number|[Number, Number]} y Range for the y value
     */
    export function randVec2(x: number|[number, number], y: number|[number, number]): Vec2 {
        return new math.Vec2(
            typeof x !== 'number' ?
            randRange(x[0], x[1]) :
            randRange(x),
            typeof y !== 'number' ?
            randRange(y[0], y[1]) :
            randRange(y)
        );
    }

    /**
     * Random odds
     * @example
     * math.oneIn(2); // 50% chance to return true
     * math.oneIn();
     * 
     * math.oneIn(8); // 12.5% chance to return true
     * math.oneIn(1); // will always return true
     * math.oneIn(1.5) // ~66.7% chance to return true
     * @param {Number} bias
     */
    export function oneIn(bias=2) {
        return Math.random() <= (1 / Math.abs(bias));
    }

    export function pointOnCircle(center: math.Vec2, degree: number) {
        let radian = degree * PI_OVER_180;

        let x = center.x + Math.cos(radian);
        let y = center.y + Math.sin(radian);

        return new math.Vec2(x, y);
    }
}

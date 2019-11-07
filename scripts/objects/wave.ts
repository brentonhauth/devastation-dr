module objects {

    type WaveBehaviorCallback = (x:number,y:number,index?:number)=>math.Vec2;
    type WaveEnemyAmount = [any, number, Params?];
    type Params = any[];
    type EnemyBehavior = {type: any, cb:WaveBehaviorCallback};

    export class Wave {
        public enemies: Enemy[];
        public playScene: scenes.PlayScene;

        private behaviors: EnemyBehavior[];

        public get IsDone(): boolean {
            return this.enemies.length === 0;
        }

        constructor(...enemies: (objects.Enemy|WaveEnemyAmount)[]) {
            this.enemies = new Array<Enemy>();
            this.behaviors = new Array<EnemyBehavior>();
            this.Add(...enemies);
            this.playScene = <scenes.PlayScene>objects.Game.currentScene;
        }

        public Start() {
            this.enemies.forEach(e => this.playScene.addChild(e));
        }

        public Update() {
            this.enemies.forEach((enemy, index) => {
                let pos = enemy.position;
                enemy.Update();
                this.behaviors.forEach(behavior => {
                    if (enemy instanceof behavior.type) {
                        enemy.position = behavior.cb(pos.x, pos.y, index);
                    }
                });
            });
        }

        public CheckCollision(against: objects.GameObject|objects.GameObject[]) {
            let check: (e:Enemy)=>any;
            if (Array.isArray(against)) {
                check = (e: Enemy) => {
                    against.forEach(obj => {
                        managers.Collision.Check(obj, e);
                    });
                };
            } else {
                check = (e: Enemy) => {
                    managers.Collision.Check(against, e);
                };
            }
            this.enemies.forEach(check);
        }

        public Add(...enemies: (Enemy|WaveEnemyAmount)[]) {
            enemies.forEach(e => {
                if (Array.isArray(e)) {
                    this.AddAmount(e[0], e[1], e[2] || []);
                } else if (e instanceof Enemy) {
                    this.enemies.push(e);
                }
            });
            return this;
        }

        public AddAmount(type: any, amount: number, params:Params=[]) {
            for (let i = 0; i < amount; i++) {
                try {
                    let e = new type(...params);
                    if (e instanceof Enemy) {
                        this.enemies.push(e);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            return this;
        }

        public Behavior<T>(type: T, cb: WaveBehaviorCallback) {
            this.behaviors.push({ type, cb });
            return this;
        }

        public Remove(enemy: Enemy): boolean {
            let index = this.enemies.map(e => e.id).indexOf(enemy.id);
            if (index !== -1) {
                this.enemies.splice(index, 1);
                return this.playScene.removeChild(enemy);
            }
            return false;
        }
    }
}

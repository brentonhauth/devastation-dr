module objects {

    var WaveID = 0;

    type WaveBehaviorCallback = (x:number,y:number,index?:number)=>math.Vec2;
    type WaveEnemyAmount = [any, number, Params?];
    type Params = any[];
    type EnemyBehavior = {type: any, cb:WaveBehaviorCallback};

    export type EnemyAmount = {type: any, amount: number};


    export class Wave {
        public id: number;
        public enemies: Enemy[];
        public playScene: scenes.PlayScene;

        private waveHandler: handlers.WaveHandler;

        private behaviors: EnemyBehavior[];

        public enemyAmounts: EnemyAmount[];

        public get IsDone(): boolean {
            return this.enemies.length === 0;
        }

        constructor(...enemies: WaveEnemyAmount[]) {
            this.id = ++WaveID;
            this.enemies = new Array<Enemy>();
            this.behaviors = new Array<EnemyBehavior>();
            this.enemyAmounts = new Array<EnemyAmount>();
            this.playScene = <scenes.PlayScene>objects.Game.currentScene;
            this.waveHandler = this.playScene.waveHandler;
            this.Add(...enemies);
        }

        public Start() {

            this.enemyAmounts.forEach(ea => {
                let fromPool = this.waveHandler.AcquireFromPool(ea);
                this.enemies.push(...fromPool);
            });

            this.enemies.forEach(e => {
                this.playScene.addChild(e);
                e.Start();
            });
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

        public UpdateAndCheckCollision(against: objects.GameObject|objects.GameObject[]) {
            let check: (e:Enemy,index:number)=>any;
            if (Array.isArray(against)) {
                check = (e: Enemy, index: number) => {
                    let pos = e.position;
                    e.Update();
                    this.behaviors.forEach(behavior => {
                        if (e instanceof behavior.type) {
                            e.position = behavior.cb(pos.x, pos.y, index);
                        }
                    });
                    against.forEach(obj => {
                        managers.Collision.Check(obj, e);
                    });
                };
            } else {
                check = (e: Enemy, index: number) => {
                    let pos = e.position;
                    e.Update();
                    this.behaviors.forEach(behavior => {
                        if (e instanceof behavior.type) {
                            e.position = behavior.cb(pos.x, pos.y, index);
                        }
                    });
                    managers.Collision.Check(against, e);
                };
            }
            this.enemies.forEach(check);
        }

        public Add(...enemies: WaveEnemyAmount[]) {
            enemies.forEach(e => {
                // if (Array.isArray(e)) {
                    this.AddAmount(e[0], e[1], e[2] || []);
                // } else if (e instanceof Enemy) {
                //     this.enemies.push(e);
                // }
            });
            return this;
        }

        public AddAmount(type: any, amount: number, params:Params=[]) {
            let existing: EnemyAmount = null;
            if (amount <= 0) { return; }
            this.enemyAmounts.forEach(r => {
                if (r.type == type) {
                    r.amount += amount;
                    existing = r;
                }
            });

            if (!existing) {
                existing = { type, amount };
                this.enemyAmounts.push(existing);
            }

            this.waveHandler.TallyAmount(existing);

            // for (let i = 0; i < amount; i++) {
            //     try {
            //         let e = new type(...params);
            //         if (e instanceof Enemy) {
            //             this.enemies.push(e);
            //         }
            //     } catch (err) {
            //         console.log(err);
            //     }
            // }
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
                this.waveHandler.Pool(enemy);
                return this.playScene.removeChild(enemy);
            }
            return false;
        }
    }
}

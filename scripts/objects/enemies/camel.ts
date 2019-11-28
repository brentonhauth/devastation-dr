module objects {

    enum CamelAttack {
        None = 0,
        Spiral = 1,
        Oscillate = 2,
        ReverseSpiral = 4,
        Direct = 8
    }

    enum CamelState {
        SettingUp = 1,
        Attacking,
        Pending,
        Dying
    }

    export class Camel extends Enemy {

        private camalAnimator: createjs.Sprite;

        private currentAttack: CamelAttack;

        private state: CamelState;

        private playScene: scenes.PlayScene;

        private oscillateCountUp = true;

        private oscillateCounter = 60;
        private health = 30;

        private startingPos: math.Vec2;

        private dirToNextPost: math.Vec2;


        constructor() {
            super('camelSheet');


            this.playScene = <scenes.PlayScene>objects.Game.currentScene;

            this.state = CamelState.SettingUp;


            let speed = .1;
            let sheet = new createjs.SpriteSheet({
                images: [objects.Game.getAsset('camelSheet')],
                frames: { width: 72, height: 72, count: 12 },
                animations: {
                    idle_down: 1, walk_down: { speed, frames: [0, 1, 2] },
                    idle_left: 4, walk_left: { speed, frames: [3, 4, 5] },
                    idle_right: 7, walk_right: { speed, frames: [6, 7, 8] },
                    idle_up: 10, walk_up: { speed, frames: [9, 10, 11] },
                    walk_backwards: { speed, frames: [2, 1, 0] },
                    oscillate: { speed: .05, frames: [4, 7] }
                }
            });

            this.startingPos = Camel.randomStartingPosition();

            this.camalAnimator = new createjs.Sprite(sheet, 'idle_down');
            this.width = 72;
            this.height = 72;
            this.Init();
        }

        public Start() {
            this.camalAnimator.gotoAndPlay('walk_down');
            managers.Sound.music(false);
            this.removeChild(this.sprite);
            this.addChild(this.camalAnimator);
            this.currentAttack = Camel.randomAttack();
            this.position = new math.Vec2(
                this.startingPos.x,
                this.startingPos.y - 300
            );

            this.dirToNextPost = math.Vec2.Difference(this.startingPos, this.position).Normalized;
        }

        public Update() {

            var point: math.Vec2, bullet: EnemyBullet, tick = createjs.Ticker.getTicks();

            if (this.state === CamelState.SettingUp) {
                this.SettingUp();
            } else if (this.state === CamelState.Pending) {
                this.Pending();
            } else if (this.state === CamelState.Attacking) {

                if (this.hasAttack(CamelAttack.Spiral) && !(tick % 9)) {
                    point = math.pointOnCircle(this.position, (tick*2.5) % 360);
                    bullet = new EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }

                if (this.hasAttack(CamelAttack.ReverseSpiral) && !(tick % 9)) {
                    point = math.pointOnCircle(this.position, 360 - ((tick*2.5) % 360));
                    bullet = new EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }

                if (this.hasAttack(CamelAttack.Oscillate)) {
                    if (this.oscillateCountUp) {
                        if (this.oscillateCounter > 120) {
                            this.oscillateCountUp = false;
                        } else {
                            this.oscillateCounter += 1.5; // ?
                        }
                    } else {
                        if (this.oscillateCounter < 60) {
                            this.oscillateCountUp = true;
                        } else {
                            this.oscillateCounter -= 1.5;
                        }
                    }

                    if (!(this.oscillateCounter % 5)) {
                        point = math.pointOnCircle(this.position, this.oscillateCounter);
                        bullet = new EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                        this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                    }

                    this.position = this.position.Add(new math.Vec2(this.oscillateCountUp ? -1 : 1));
                }

                if (this.hasAttack(CamelAttack.Direct) && !(tick % 15)) {
                    bullet = new EnemyBullet(
                        this.position,
                        this.playScene.player.position, this,
                        this.playScene.enemyBulletHandler
                    );

                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }
            }
        }

        private SettingUp() {
            if (math.Vec2.WithinRange(this.position, this.startingPos, 10)) {
                this.state = CamelState.Attacking;
                if (!managers.Sound.isPlayingMusic) {
                    this.playScene.dialogHandler.Trigger('What is that?!', 2.5);
                    managers.Sound.music(true);
                }
                if (this.currentAttack === CamelAttack.Oscillate) {
                    this.camalAnimator.gotoAndPlay('oscillate');
                } else {
                    this.camalAnimator.gotoAndPlay('walk_backwards');
                }
                setTimeout(() => {
                    this.state = CamelState.Pending;
                }, math.randRange(4, 8) * 1000);
            } else {
                this.position = this.position.Add(this.dirToNextPost);
            }
        }

        private Pending() {
            let prevAttack = this.currentAttack,
            newAttack = CamelAttack.None,
            curAttack = CamelAttack.None,
            numOfAttacks = this.health <= 15 ? 2 : 1;

            // if (this.health <= 10) {
            //     numOfAttacks = 3;
            // } else if (this.health <= 20) {
            //     numOfAttacks = 2;
            // }


            for (let i = 0; i < numOfAttacks; i++) {
                do {
                    newAttack = Camel.randomAttack();
                } while ((curAttack & newAttack) !== 0);
                curAttack |= newAttack;
            }

            this.currentAttack = curAttack;
            // while (prevAttack === this.currentAttack) {
            //     this.currentAttack = Camel.randomAttack();
            // }
            this.startingPos = Camel.randomStartingPosition();
            this.state = CamelState.SettingUp;
            this.dirToNextPost = math.Vec2.Difference(this.startingPos, this.position).Normalized;
            this.dirToNextPost = this.dirToNextPost.Scale(3);
        }

        private static randomAttack(): CamelAttack {
            let rnd = Math.floor(math.randRange(1, 5));
            switch (rnd) {
                case 1: return CamelAttack.Direct;
                case 2: return CamelAttack.Oscillate;
                case 3: return CamelAttack.Spiral;
                case 4: return CamelAttack.ReverseSpiral;
                default: return CamelAttack.Direct;
            }
        }

        private hasAttack(attack: CamelAttack): boolean {
            return (this.currentAttack & attack) !== 0;
        }

        private static randomStartingPosition() {
            return new math.Vec2(
                math.randRange(50, 400),
                math.randRange(50, 250)
            );
        }

        public Destroy() {
            this.health--;
            if (this.health === 0) {
                super.Destroy();
            }
        }
    }
}

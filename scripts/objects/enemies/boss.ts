module objects {

    enum BossAttack {
        None = 0,
        Spiral = 1,
        // Oscillate = 2,
        // ReverseSpiral = 4,
        Direct = 8,
        Charge = 16,
        Shadow = 32,
    }

    enum BossState {
        SettingUp = 1,
        Attacking,
        Pending,
        Dying
    }


    export class Boss extends Enemy {

        
        private static centerPosition: math.Vec2;
        private static aboveCenter: math.Vec2;
        private startingPosition: math.Vec2;
        private dirToPos: math.Vec2;
        private playerPositionSnapshot: math.Vec2;
        private direction: math.Vec2;
        public intangible: boolean = false;
        
        private attack: BossAttack;        
        private state: BossState;
        private shadowGotClose = false;
        private initialSetup = true;
        
        private setFrame = 0;
        private get frameDifference(): number {
            if (this.setFrame <= 0) {
                return 0;
            }

            let tick = createjs.Ticker.getTicks();
            return tick - this.setFrame;
        }

        private bossShadow: createjs.Shape;

        constructor() {
            super(new createjs.SpriteSheet({
                images: [objects.Game.getAsset('bossSheet')],
                frames: { width: 72, height: 114, count: 12 },
                animations: {
                    green: { speed: .1, frames: [0, 1, 2] },
                    white: { speed: .1, frames: [3, 4, 5] },
                    gold: { speed: .1, frames: [6, 7, 8] },
                    blue: { speed: .1, frames: [9, 10, 11] },
                }
            }));

            if (!Boss.centerPosition) {
                Boss.centerPosition = new math.Vec2(
                    objects.Game.canvas.width / 2,
                    objects.Game.canvas.height / 4
                );

                Boss.aboveCenter = new math.Vec2(
                    Boss.centerPosition.x,
                    Boss.centerPosition.y - 300
                );
            }

            this.Init();
            this.animator.gotoAndPlay('white');
            this.bossShadow = new createjs.Shape();
            this.bossShadow.graphics
                .beginFill("rgba(0,0,0,.4)")
                .drawCircle(0, 0, 50)
                .endFill();
            //

            this.playScene.addChild(this.bossShadow);

            this.bossShadow.visible = false;
            this.Reset();
        }

        public Start() {
            // this.position = Boss.aboveCenter;
        }

        public Reset() {
            this.health = 35;
            this.initialSetup = true;
            this.state = BossState.Pending;
            this.resetToAboveCenter();
            // this.startingPosition = Boss.centerPosition;//Boss.randomStartingPosition();
        }

        public Update() {
            if (this.state === BossState.SettingUp) {
                this.SettingUp();
            } else if (this.state === BossState.Pending) {
                this.Pending();
            } else if (this.state === BossState.Attacking) {

                let bullet: EnemyBullet, point: math.Vec2;
                let tick = createjs.Ticker.getTicks();

                if (this.hasAttack(BossAttack.Spiral) && !(tick % 9)) {
                    point = math.pointOnCircle(this.position, (tick*2.5) % 360);
                    bullet = new EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }

                if (this.hasAttack(BossAttack.Direct) && !(tick % 20)) {
                    bullet = new EnemyBullet(
                        this.position,
                        this.playScene.player.position, this,
                        this.playScene.enemyBulletHandler
                    );

                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }

                if (this.hasAttack(BossAttack.Charge)) {
                    if (this.frameDifference < 30) {
                        // shake or somethin'
                        // console.log('Frame difference', this.frameDifference);
                    } else {
                        if (!this.playerPositionSnapshot) {
                            this.playerPositionSnapshot = this.playScene.player.position;
                            this.direction = math.Vec2.Direction(this.playerPositionSnapshot, this.position);
                            this.direction.ScaleEq(10);
                        }

                        this.position = this.position.Add(this.direction);

                        if (!objects.Game.isWithinCanvas(this.position)) {
                            this.state = BossState.Pending;
                            // this.resetToAboveCenter();
                            // this.attack = Boss.randomAttack();
                            // this.playerPositionSnapshot = null;
                        }
                    }
                }

                if (this.hasAttack(BossAttack.Shadow)) {

                    let shadowPos = new math.Vec2(this.bossShadow.x, this.bossShadow.y),
                    playerPos = this.playScene.player.position;
                    // diff = math.Vec2.Difference(playerPos, shadowPos);

                    if (!this.shadowGotClose) {
                        if (this.frameDifference >= 160) {
                            this.state = BossState.Pending;
                        } else if (this.frameDifference === 110) {
                            this.bossShadow.visible = false;
                            this.position = shadowPos;//new math.Vec2(this.bossShadow.x, this.bossShadow.y);
                        } else if (this.frameDifference <= 100) {
                            let dir = math.Vec2.Direction(playerPos, shadowPos).ScaleEq(6);
                            shadowPos.Add(dir);
                            this.setShadowPos(shadowPos.x, shadowPos.y);
                        }
                        if (math.Vec2.WithinRange(shadowPos, playerPos, 10)) {
                            this.setFrame = createjs.Ticker.getTicks();
                            this.playerPositionSnapshot = playerPos;
                            this.shadowGotClose = true;
                        }
                    } else {
                        if (this.frameDifference >= 160) {
                            this.state = BossState.Pending;
                        } else if (this.frameDifference === 110) {
                            this.bossShadow.visible = false;
                            this.position = shadowPos;//new math.Vec2(this.bossShadow.x, this.bossShadow.y);
                        } else if (this.frameDifference <= 100) {
                            let playerPos = this.playerPositionSnapshot// || this.playScene.player.position;
                            this.playerPositionSnapshot = this.playScene.player.position;
    
                            // playerPos.Add(math.randVec2([-20, 20], [-20, 20]));
                            if (playerPos) {
                                this.setShadowPos(playerPos.x, playerPos.y);
                            }
                        }
                    }
                }
            }
        }

        public SettingUp() {
            if (math.Vec2.WithinRange(this.position, this.startingPosition, 10)) {
                this.state = BossState.Attacking;
                // setTimeout(() => {}, math.randRange());
                this.playerPositionSnapshot = null;
                this.setFrame = createjs.Ticker.getTicks();
                if (this.hasAttack(BossAttack.Direct | BossAttack.Spiral)) {
                    setTimeout(() => {
                        this.state = BossState.Pending;
                    }, math.randRange(3, 6) * 1000);
                }
                if (this.initialSetup) {
                    this.playScene.dialogHandler.TriggerMany(
                        ["", 1.5],
                        ["You wouldn't happen to be the" +
                        "one responsible for all this?", 2.5]
                    );
                    this.initialSetup = false;
                }
            } else {
                this.position = this.position.Add(this.dirToPos);
            }
        }

        private resetToAboveCenter() {
            this.position = Boss.aboveCenter;
            this.startingPosition = Boss.centerPosition;
            this.dirToPos = math.Vec2.Direction(this.startingPosition, this.position);
        }


        public Pending() {
            this.playerPositionSnapshot = null;
            var newAttack: BossAttack, resetAboveCenter = false;
            if (this.initialSetup) {
                newAttack = BossAttack.Direct;
            } else {
                do {
                    newAttack = Boss.randomAttack();
                } while (newAttack === this.attack);
            }

            this.attack = newAttack;
            this.setFrame = createjs.Ticker.getTicks();

            console.log('New Attack', BossAttack[this.attack]);

            if (!objects.Game.isWithinCanvas(this.position)) {
                this.resetToAboveCenter();
                resetAboveCenter = true;
            }

            if (this.hasAttack(BossAttack.Direct | BossAttack.Spiral)) {
                if (!resetAboveCenter) {
                    this.startingPosition = Boss.randomStartingPosition();
                    this.dirToPos = math.Vec2.Direction(
                        this.startingPosition,
                        this.position
                    ).ScaleEq(4);

                }
            } else if (this.attack === BossAttack.Shadow) {
                let p = this.position;
                this.setShadowPos(p.x, p.y);
                this.position = new math.Vec2(-100, -100);
                this.bossShadow.visible = true;
                this.state = BossState.Attacking;
                this.shadowGotClose = false;
                return;
            } else if (this.attack === BossAttack.Charge) {
                this.state = BossState.Attacking;
                return;
            }
            
            this.attack = newAttack;
            //this.resetToAboveCenter();
            this.state = BossState.SettingUp;
            // this.initialSetup = false;
        }

        private static randomAttack(): BossAttack {
            switch (math.randInt(1, 4)) {
                case 1: return BossAttack.Direct;
                case 2: return BossAttack.Charge;
                case 3: return BossAttack.Shadow;
                case 4: return BossAttack.Spiral;
                // case 4: return BossAttack.ReverseSpiral;

                // prevents unexpected failure
                default: return BossAttack.Direct;
            }
            return BossAttack.Shadow;
        }


        private hasAttack(attack: BossAttack): boolean {
            // console.log((this.attack & attack))
            return (this.attack & attack) !== 0;
        }

        private static randomStartingPosition(): math.Vec2 {
            return math.randVec2([50, 400], [50, 250]);
        }

        public Destroy() {
            if (this.intangible) { return; }
            this.health--;
            if (this.health === 0) {
                super.Destroy();
                managers.Sound.sfx('monsterGrowl');
            }
        }

        private setShadowPos(x: number, y: number) {
            this.bossShadow.x = x;
            this.bossShadow.y = y;
        }
    }
}

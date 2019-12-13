module objects {
    export class Player extends objects.GameObject {
        // Variables
        public lives: number;
        private blink: boolean = false;
        public intangible: boolean = false;
        private vMoveSpeed = 8;
        private hMoveSpeed: number;
        private moved: math.Vec2;
        
        private sprite: createjs.Bitmap;

        public weapon: objects.Weapon;
        public playScene: scenes.PlayScene;

        public canLeaveBounds = false;
        public hasShield = false;
        

        // Constructor
        constructor(playScene: scenes.PlayScene) {
            super();
            this.hMoveSpeed = this.vMoveSpeed * .75;
            this.playScene = playScene;
            this.sprite = new createjs.Bitmap(objects.Game.getAsset("hummer"));
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.weapon = new objects.Pistol(playScene);
            this.Init();
            this.addChild(this.sprite);
        }
        // Methods
        public Start(): void {
            // Set the initial position
            this.SetPosition(320, 500);
            this.lives = 3;
            this.moved = new math.Vec2();

            //this.scaleX = 0.25;
            //this.scaleY = 0.25;
        }
        public Update(): void {
            this.Move();

            if (this.blink) {
                this.Blink();
            }
        }
        public Reset(): void {}
        public Move(): void {
            this.moved.x = this.moved.y = 0;

            if (managers.Keyboard.pressed(config.Key.W)) {
                this.moved.y = -this.vMoveSpeed;
            }

            if (managers.Keyboard.pressed(config.Key.S)) {
                this.moved.y += this.vMoveSpeed;
            }

            if (managers.Keyboard.pressed(config.Key.A)) {
                this.moved.x = -this.hMoveSpeed;
            }

            if (managers.Keyboard.pressed(config.Key.D)) {
                this.moved.x += this.hMoveSpeed;
            }

            if (this.moved.x || this.moved.y) {
                if (this.moved.x && this.moved.y) {
                    this.moved = this.moved.ScaleEq(Math.SQRT1_2);
                }

                this.position = this.position.Add(this.moved);

                if (!this.canLeaveBounds) {
                    this.CheckBound();
                }
            }

        }

        private Blink() {
            if (!(createjs.Ticker.getTicks() % 3)) {
                this.visible = !this.visible;
            }
        }

        public StartBlink() {
            this.blink = this.intangible = true;

            setTimeout(() => {
                requestAnimationFrame(() => {
                    this.blink = this.intangible = false;
                    this.visible = true;
                });
            }, 1000);
        }

        public CheckBound(): void {

            let setX: number, setY: number;

            if(this.x >= (objects.Game.canvas.width - this.halfW)) {
                setX = objects.Game.canvas.width - this.halfW;
            } else if (this.x <= this.halfW) {
                setX = this.halfW;
            }

            if (this.y >= (objects.Game.canvas.height - this.halfH)) {
                setY = objects.Game.canvas.height - this.halfH;
            } else if (this.y <= this.halfH) {
                setY = this.halfH;
            }

            if (setX || setY) {
                this.SetPosition(setX || this.x, setY || this.y);
            }
        }

        public ShootWeapon():void {
            if (this.weapon.weaponType == config.Weapon.LASER)
            {
                managers.Sound.sfx("laserShoot");
            }
            else if(this.weapon.weaponType == config.Weapon.PISTOL)
            {
                managers.Sound.sfx("laserShoot");
            }
            else if(this.weapon.weaponType == config.Weapon.MACHINEGUN)
            {
                managers.Sound.sfx("laserShoot");
            }
            else if(this.weapon.weaponType == config.Weapon.FLAMETHROWER)
            {
                managers.Sound.sfx("laserShoot");
            }
            this.weapon.Shoot();
        }

        public ChangeWeapon(weaponType: config.Weapon): void {
            if (this.playScene.flamethrowerBulletHandler.isActive)
            {
                this.playScene.flamethrowerBulletHandler.StopFlame();
            }
            if (weaponType == config.Weapon.MACHINEGUN) 
            {
                this.weapon = new objects.MachineGun(this.playScene);
            }
            else if (weaponType == config.Weapon.LASER) 
            {
                this.weapon = new objects.Laser(this.playScene);
            }
            else if (weaponType == config.Weapon.FLAMETHROWER) 
            {
                this.weapon = new objects.Flamethrower(this.playScene);
            }
            managers.Sound.sfx("reload");
        }



        public OnCollision(gameObject: objects.GameObject): void {
            if(gameObject instanceof objects.EnemyItem)
            {
                this.handleItemCollision(gameObject);
            }
            else
            {
                if (!this.intangible) {
                    if (!this.hasShield)
                    {
                        this.StartBlink();
                        this.lives -= 1;                    
                        this.playScene.lifeCounter.text(this.lives);

                        managers.Sound.sfx("explosion");
                        if (this.lives == 0) {
                            objects.Game.currentState = config.Scene.OVER;
                            console.log("dead");
                        }

                        if (gameObject instanceof objects.Jackal) {
                            // TODO: improve upon downgrade system (when hit by Jackal)
                            this.weapon.Downgrade();
                            gameObject.yoink(this.weapon.weaponType);
                        }
                    }
                    else
                    {
                        this.hasShield = false;
                        this.changeSprite();
                        this.StartBlink(); // this.startShieldBlink();

                    }
                }
            }
        }

        private handleItemCollision(gameObject: objects.EnemyItem): void {
            if (gameObject.itemType == config.Item.machineGun)
            {
                if (this.weapon.weaponType == config.Weapon.MACHINEGUN)
                {
                    if (this.weapon.upgradeLevel >= 4)
                    {
                        this.playScene.score.addPoints(100);
                    }
                    else
                    {
                        this.weapon.Upgrade();
                    }
                }
                else
                {
                    this.ChangeWeapon(config.Weapon.MACHINEGUN);
                }
                this.playScene.weaponHUD.updateWeapon(this.weapon);
            }
            else if (gameObject.itemType == config.Item.laser)
            {
                if (this.weapon.weaponType == config.Weapon.LASER)
                {
                    if (this.weapon.upgradeLevel >= 3)
                    {
                        this.playScene.score.addPoints(100);
                    }
                    else
                    {
                        this.weapon.Upgrade();
                    }
                }
                else
                {
                    this.ChangeWeapon(config.Weapon.LASER);
                }
                this.playScene.weaponHUD.updateWeapon(this.weapon);
            }
            else if (gameObject.itemType == config.Item.flamethrower)
            {
                if (this.weapon.weaponType == config.Weapon.FLAMETHROWER)
                {
                    if (this.weapon.upgradeLevel >= 3)
                    {
                        this.playScene.score.addPoints(100);
                    }
                    else
                    {
                        this.weapon.Upgrade();
                    }
                }
                else
                {
                    this.ChangeWeapon(config.Weapon.FLAMETHROWER);
                }
                this.playScene.weaponHUD.updateWeapon(this.weapon);
            }
            else if (gameObject.itemType == config.Item.life)
            {
                this.lives++;
                this.playScene.lifeCounter.text(this.lives); 
            }

            else if (gameObject.itemType == config.Item.shield)
            {
                if (!this.hasShield)
                {
                    this.hasShield = true;
                    this.changeSprite();
                }
            }

            gameObject.Destroy();
        }

        private changeSprite(): void{
            let spriteString = this.hasShield ? "hummerShield" : "hummer";
            this.removeChild(this.sprite)
            this.sprite = new createjs.Bitmap(objects.Game.getAsset(spriteString));
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            this.addChild(this.sprite);
            //this.Start();
        }
    }
}
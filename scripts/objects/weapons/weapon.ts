module objects {
    export class Weapon {

        public weaponType: config.Weapon;
        public upgradeLevel: number;

        constructor(weaponType: config.Weapon) {
            this.weaponType = weaponType;
            this.upgradeLevel = 1;
        }

        public Upgrade(): void{
            this.upgradeLevel++;
        }

        public Shoot(): void {}

        public Downgrade(): void {
            if (this.upgradeLevel > 1) {
                this.upgradeLevel--;
            }
        }

    }
}

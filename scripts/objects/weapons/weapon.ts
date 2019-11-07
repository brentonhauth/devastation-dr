module objects {
    export class Weapon {

        public weaponType: config.Weapon;
        protected upgradeLevel: number;

        constructor(weaponType: config.Weapon) {
            this.weaponType = weaponType;
            this.upgradeLevel = 1;
        }

        public Upgrade(): void{
            this.upgradeLevel ++;
        }

        public Shoot(): void {}



    }
}

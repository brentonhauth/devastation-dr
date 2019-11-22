var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var EnemyItem = /** @class */ (function (_super) {
        __extends(EnemyItem, _super);
        function EnemyItem(spawnedFrom, itemHandler) {
            var _this = _super.call(this) || this;
            _this.isDestroyed = false;
            _this.speed = 3;
            _this.itemID = String(EnemyItem.counter);
            EnemyItem.counter++;
            _this.itemHandler = itemHandler;
            _this.spawnedFrom = spawnedFrom;
            _this.itemType = _this.chooseItemType();
            _this.itemTypeString = ["machineGun", "laser", "shield", "life"][_this.itemType];
            //console.log(this.itemTypeString);
            _this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult("item_" + _this.itemTypeString));
            _this.addChild(_this.sprite);
            var bounds = _this.sprite.getBounds();
            _this.width = bounds.width;
            _this.height = bounds.height;
            _this.Init();
            _this.position = new math.Vec2(spawnedFrom.x, spawnedFrom.boxCollider.aabb.max.y);
            _this.Start();
            return _this;
        }
        EnemyItem.prototype.chooseItemType = function () {
            var itemTypeMap = ["machineGun", "laser", "shield", "life"];
            var rr = Math.floor(math.randRange(1, 5));
            var itemType = config.Item[itemTypeMap[rr - 1]];
            //console.log(rr);
            return itemType;
        };
        EnemyItem.prototype.setInitialPosition = function () {
        };
        EnemyItem.prototype.Start = function () {
        };
        EnemyItem.prototype.Update = function () {
            this.position = new math.Vec2(this.x, this.y + this.speed);
            this.CheckBound();
        };
        EnemyItem.prototype.CheckBound = function () {
            if (this.x > 650 || this.x < 0 ||
                this.y > 900 || this.y < 0) {
                this.Destroy();
            }
        };
        EnemyItem.prototype.Destroy = function () {
            this.itemHandler.DestroyItem(this);
        };
        EnemyItem.prototype.Move = function () {
            this.position = new math.Vec2(this.x, this.y - 7);
        };
        EnemyItem.prototype.OnCollision = function (obj) {
        };
        EnemyItem.counter = 1;
        return EnemyItem;
    }(objects.GameObject));
    objects.EnemyItem = EnemyItem;
})(objects || (objects = {}));
//# sourceMappingURL=enemyItem.js.map
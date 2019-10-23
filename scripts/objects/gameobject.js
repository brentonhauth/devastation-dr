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
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // Constructor
        function GameObject() {
            return _super.call(this) || this;
            //objects.Game.assetManager.getResult(imageString)
            // this.name = imageString;
            // this.width = width;
            // this.height = height;
            // this.Init();
            // this.boxCollider = new components.BoxCollider(this.x, this.y, this.width, this.height);
        }
        Object.defineProperty(GameObject.prototype, "position", {
            // Properties
            get: function () {
                return new math.Vec2(this.x, this.y);
            },
            set: function (pos) {
                this.boxCollider.position = pos;
                this.x = pos.x;
                this.y = pos.y;
            },
            enumerable: true,
            configurable: true
        });
        // Methods
        GameObject.prototype.Init = function () {
            // Initialize all the properties of my object
            // this.width = this.getBounds().width;
            // this.height = this.getBounds().height;
            this.halfW = this.width * 0.5;
            this.halfH = this.height * 0.5;
            // Registration Points
            this.regX = this.halfW;
            this.regY = this.halfH;
            this.isColliding = false;
            this.boxCollider = new components.BoxCollider(this.x || 0, this.y || 0, this.width, this.height);
        };
        GameObject.prototype.Start = function () { };
        GameObject.prototype.Update = function () { };
        GameObject.prototype.Reset = function () { };
        GameObject.prototype.Move = function () { };
        GameObject.prototype.CheckBound = function () { };
        GameObject.prototype.OnCollision = function (_gameObject) { };
        return GameObject;
    }(createjs.Container));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map
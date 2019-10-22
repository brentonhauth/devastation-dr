var config;
(function (config) {
    var Key;
    (function (Key) {
        // Arrow Keys
        Key[Key["LeftArrow"] = 37] = "LeftArrow";
        Key[Key["UpArrow"] = 38] = "UpArrow";
        Key[Key["RightArrow"] = 39] = "RightArrow";
        Key[Key["DownArrow"] = 40] = "DownArrow";
        // WASD
        Key[Key["W"] = 87] = "W";
        Key[Key["A"] = 65] = "A";
        Key[Key["S"] = 83] = "S";
        Key[Key["D"] = 68] = "D";
        // Spacebar
        Key[Key["Space"] = 32] = "Space";
        // Others
        Key[Key["E"] = 69] = "E";
        Key[Key["F"] = 70] = "F";
        Key[Key["Q"] = 81] = "Q";
        Key[Key["LeftShift"] = 16] = "LeftShift";
        Key[Key["LeftCtrl"] = 0] = "LeftCtrl";
    })(Key = config.Key || (config.Key = {}));
})(config || (config = {}));
//# sourceMappingURL=key.js.map
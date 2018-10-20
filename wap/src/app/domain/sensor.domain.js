"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sensor = (function () {
    function Sensor(type, currentValue, status) {
        if (type === void 0) { type = ""; }
        if (currentValue === void 0) { currentValue = ""; }
        if (status === void 0) { status = ""; }
        this.id = 0;
        this.type = "";
        this.currentValue = "";
        this.status = "";
        this.type = type;
        this.currentValue = currentValue;
        this.status = status;
    }
    return Sensor;
}());
exports.Sensor = Sensor;

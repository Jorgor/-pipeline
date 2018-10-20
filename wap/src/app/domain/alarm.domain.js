"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var target_domain_1 = require("./target.domain");
var Alarm = (function () {
    function Alarm() {
        this.type = '';
        this.description = '';
        this.target = new target_domain_1.Target();
    }
    return Alarm;
}());
exports.Alarm = Alarm;

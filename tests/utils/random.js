"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = exports.randomPassword = exports.randomTeamName = exports.randomEmail = void 0;
var randomEmail = function () {
    return "test_".concat(Math.random().toString(36).substring(7), "@example.com");
};
exports.randomEmail = randomEmail;
var randomTeamName = function () {
    return "Team ".concat(Math.random().toString(36).substring(7));
};
exports.randomTeamName = randomTeamName;
var randomPassword = function () { return "".concat(Math.random().toString(36).substring(2)); };
exports.randomPassword = randomPassword;
var slugify = function (text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};
exports.slugify = slugify;

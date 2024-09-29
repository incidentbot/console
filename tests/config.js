"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstSuperuserPassword = exports.firstSuperuser = void 0;
var node_path_1 = require("node:path");
var node_url_1 = require("node:url");
var dotenv_1 = require("dotenv");
var __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
var __dirname = node_path_1.default.dirname(__filename);
dotenv_1.default.config({ path: node_path_1.default.join(__dirname, "../../.env") });
var _a = process.env, FIRST_SUPERUSER = _a.FIRST_SUPERUSER, FIRST_SUPERUSER_PASSWORD = _a.FIRST_SUPERUSER_PASSWORD;
if (typeof FIRST_SUPERUSER !== "string") {
    throw new Error("Environment variable FIRST_SUPERUSER is undefined");
}
if (typeof FIRST_SUPERUSER_PASSWORD !== "string") {
    throw new Error("Environment variable FIRST_SUPERUSER_PASSWORD is undefined");
}
exports.firstSuperuser = FIRST_SUPERUSER;
exports.firstSuperuserPassword = FIRST_SUPERUSER_PASSWORD;

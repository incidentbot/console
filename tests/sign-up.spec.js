"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@playwright/test");
var random_1 = require("./utils/random");
test_1.test.use({ storageState: { cookies: [], origins: [] } });
var fillForm = function (page, full_name, email, password, confirm_password) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.getByPlaceholder("Full Name").fill(full_name)];
            case 1:
                _a.sent();
                return [4 /*yield*/, page.getByPlaceholder("Email").fill(email)];
            case 2:
                _a.sent();
                return [4 /*yield*/, page.getByPlaceholder("Password", { exact: true }).fill(password)];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.getByPlaceholder("Repeat Password").fill(confirm_password)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var verifyInput = function (page, placeholder, options) { return __awaiter(void 0, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                input = page.getByPlaceholder(placeholder, options);
                return [4 /*yield*/, (0, test_1.expect)(input).toBeVisible()];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, test_1.expect)(input).toHaveText("")];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, test_1.expect)(input).toBeEditable()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
(0, test_1.test)("Inputs are visible, empty and editable", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, verifyInput(page, "Full Name")];
            case 2:
                _c.sent();
                return [4 /*yield*/, verifyInput(page, "Email")];
            case 3:
                _c.sent();
                return [4 /*yield*/, verifyInput(page, "Password", { exact: true })];
            case 4:
                _c.sent();
                return [4 /*yield*/, verifyInput(page, "Repeat Password")];
            case 5:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign Up button is visible", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.getByRole("button", { name: "Sign Up" })).toBeVisible()];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Log In link is visible", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.getByRole("link", { name: "Log In" })).toBeVisible()];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign up with valid name, email, and password", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var full_name, email, password;
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                full_name = "Test User";
                email = (0, random_1.randomEmail)();
                password = (0, random_1.randomPassword)();
                return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, fillForm(page, full_name, email, password, password)];
            case 2:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()];
            case 3:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign up with invalid email", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, fillForm(page, "Playwright Test", "invalid-email", "changethis", "changethis")];
            case 2:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.getByText("Invalid email address")).toBeVisible()];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign up with existing email", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var fullName, email, password;
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fullName = "Test User";
                email = (0, random_1.randomEmail)();
                password = (0, random_1.randomPassword)();
                // Sign up with an email
                return [4 /*yield*/, page.goto("/signup")];
            case 1:
                // Sign up with an email
                _c.sent();
                return [4 /*yield*/, fillForm(page, fullName, email, password, password)];
            case 2:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()
                    // Sign up again with the same email
                ];
            case 3:
                _c.sent();
                // Sign up again with the same email
                return [4 /*yield*/, page.goto("/signup")];
            case 4:
                // Sign up again with the same email
                _c.sent();
                return [4 /*yield*/, fillForm(page, fullName, email, password, password)];
            case 5:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()];
            case 6:
                _c.sent();
                return [4 /*yield*/, page
                        .getByText("The user with this email already exists in the system")
                        .click()];
            case 7:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign up with weak password", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var fullName, email, password;
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fullName = "Test User";
                email = (0, random_1.randomEmail)();
                password = "weak";
                return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, fillForm(page, fullName, email, password, password)];
            case 2:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.getByText("Password must be at least 8 characters")).toBeVisible()];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign up with mismatched passwords", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var fullName, email, password, password2;
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fullName = "Test User";
                email = (0, random_1.randomEmail)();
                password = (0, random_1.randomPassword)();
                password2 = (0, random_1.randomPassword)();
                return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, fillForm(page, fullName, email, password, password2)];
            case 2:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.getByText("Passwords do not match")).toBeVisible()];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign up with missing full name", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var fullName, email, password;
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fullName = "";
                email = (0, random_1.randomEmail)();
                password = (0, random_1.randomPassword)();
                return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, fillForm(page, fullName, email, password, password)];
            case 2:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.getByText("Full Name is required")).toBeVisible()];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign up with missing email", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var fullName, email, password;
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fullName = "Test User";
                email = "";
                password = (0, random_1.randomPassword)();
                return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, fillForm(page, fullName, email, password, password)];
            case 2:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.getByText("Email is required")).toBeVisible()];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, test_1.test)("Sign up with missing password", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var fullName, email, password;
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fullName = "";
                email = (0, random_1.randomEmail)();
                password = "";
                return [4 /*yield*/, page.goto("/signup")];
            case 1:
                _c.sent();
                return [4 /*yield*/, fillForm(page, fullName, email, password, password)];
            case 2:
                _c.sent();
                return [4 /*yield*/, page.getByRole("button", { name: "Sign Up" }).click()];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.getByText("Password is required")).toBeVisible()];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });

const __awaiter =
  (this && this.__awaiter) ||
  ((thisArg, _arguments, P, generator) => {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P((resolve) => {
            resolve(value)
          })
    }
    return new (P || (P = Promise))((resolve, reject) => {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  })
const __generator =
  (this && this.__generator) ||
  ((thisArg, body) => {
    let _ = {
      label: 0,
      sent: () => {
        if (t[0] & 1) throw t[1]
        return t[1]
      },
      trys: [],
      ops: [],
    }
    let f
    let y
    let t
    let g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return (v) => step([n, v])
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.")
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y.return
                  : op[0]
                    ? y.throw || ((t = y.return) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  })
Object.defineProperty(exports, "__esModule", { value: true })
const test_1 = require("@playwright/test")
const config_ts_1 = require("./config.ts")
const random_ts_1 = require("./utils/random.ts")
const user_ts_1 = require("./utils/user.ts")
const tabs = ["My profile", "Password", "Appearance"]
// User Information
;(0, test_1.test)("My profile tab is active by default", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/settings")]
        case 1:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(
              page.getByRole("tab", { name: "My profile" }),
            ).toHaveAttribute("aria-selected", "true"),
          ]
        case 2:
          _c.sent()
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("All tabs are visible", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    let _i
    let tabs_1
    let tab
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/settings")]
        case 1:
          _c.sent()
          ;(_i = 0), (tabs_1 = tabs)
          _c.label = 2
        case 2:
          if (!(_i < tabs_1.length)) return [3 /*break*/, 5]
          tab = tabs_1[_i]
          return [
            4 /*yield*/,
            (0, test_1.expect)(
              page.getByRole("tab", { name: tab }),
            ).toBeVisible(),
          ]
        case 3:
          _c.sent()
          _c.label = 4
        case 4:
          _i++
          return [3 /*break*/, 2]
        case 5:
          return [2 /*return*/]
      }
    })
  }),
)
test_1.test.describe("Edit user full name and email successfully", () => {
  test_1.test.use({ storageState: { cookies: [], origins: [] } })
  ;(0, test_1.test)("Edit user name with a valid name", (_a) =>
    __awaiter(void 0, [_a], void 0, function (_b) {
      let fullName
      let email
      let updatedName
      let password
      const page = _b.page
      return __generator(this, (_c) => {
        switch (_c.label) {
          case 0:
            fullName = "Test User"
            email = (0, random_ts_1.randomEmail)()
            updatedName = "Test User 2"
            password = (0, random_ts_1.randomPassword)()
            // Sign up a new user
            return [
              4 /*yield*/,
              (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
              // Log in the user
            ]
          case 1:
            // Sign up a new user
            _c.sent()
            // Log in the user
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, password),
            ]
          case 2:
            // Log in the user
            _c.sent()
            return [4 /*yield*/, page.goto("/settings")]
          case 3:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("tab", { name: "My profile" }).click(),
            ]
          case 4:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Edit" }).click(),
            ]
          case 5:
            _c.sent()
            return [4 /*yield*/, page.getByLabel("Full name").fill(updatedName)]
          case 6:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Save" }).click(),
            ]
          case 7:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page.getByText("User updated successfully"),
              ).toBeVisible(),
              // Check if the new name is displayed on the page
            ]
          case 8:
            _c.sent()
            // Check if the new name is displayed on the page
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page
                  .getByLabel("My profile")
                  .getByText(updatedName, { exact: true }),
              ).toBeVisible(),
            ]
          case 9:
            // Check if the new name is displayed on the page
            _c.sent()
            return [2 /*return*/]
        }
      })
    }),
  )
  ;(0, test_1.test)("Edit user email with a valid email", (_a) =>
    __awaiter(void 0, [_a], void 0, function (_b) {
      let fullName
      let email
      let updatedEmail
      let password
      const page = _b.page
      return __generator(this, (_c) => {
        switch (_c.label) {
          case 0:
            fullName = "Test User"
            email = (0, random_ts_1.randomEmail)()
            updatedEmail = (0, random_ts_1.randomEmail)()
            password = (0, random_ts_1.randomPassword)()
            // Sign up a new user
            return [
              4 /*yield*/,
              (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
              // Log in the user
            ]
          case 1:
            // Sign up a new user
            _c.sent()
            // Log in the user
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, password),
            ]
          case 2:
            // Log in the user
            _c.sent()
            return [4 /*yield*/, page.goto("/settings")]
          case 3:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("tab", { name: "My profile" }).click(),
            ]
          case 4:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Edit" }).click(),
            ]
          case 5:
            _c.sent()
            return [4 /*yield*/, page.getByLabel("Email").fill(updatedEmail)]
          case 6:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Save" }).click(),
            ]
          case 7:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page.getByText("User updated successfully"),
              ).toBeVisible(),
            ]
          case 8:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page
                  .getByLabel("My profile")
                  .getByText(updatedEmail, { exact: true }),
              ).toBeVisible(),
            ]
          case 9:
            _c.sent()
            return [2 /*return*/]
        }
      })
    }),
  )
})
test_1.test.describe("Edit user with invalid data", () => {
  test_1.test.use({ storageState: { cookies: [], origins: [] } })
  ;(0, test_1.test)("Edit user email with an invalid email", (_a) =>
    __awaiter(void 0, [_a], void 0, function (_b) {
      let fullName
      let email
      let password
      let invalidEmail
      const page = _b.page
      return __generator(this, (_c) => {
        switch (_c.label) {
          case 0:
            fullName = "Test User"
            email = (0, random_ts_1.randomEmail)()
            password = (0, random_ts_1.randomPassword)()
            invalidEmail = ""
            // Sign up a new user
            return [
              4 /*yield*/,
              (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
              // Log in the user
            ]
          case 1:
            // Sign up a new user
            _c.sent()
            // Log in the user
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, password),
            ]
          case 2:
            // Log in the user
            _c.sent()
            return [4 /*yield*/, page.goto("/settings")]
          case 3:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("tab", { name: "My profile" }).click(),
            ]
          case 4:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Edit" }).click(),
            ]
          case 5:
            _c.sent()
            return [4 /*yield*/, page.getByLabel("Email").fill(invalidEmail)]
          case 6:
            _c.sent()
            return [4 /*yield*/, page.locator("body").click()]
          case 7:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page.getByText("Email is required"),
              ).toBeVisible(),
            ]
          case 8:
            _c.sent()
            return [2 /*return*/]
        }
      })
    }),
  )
  ;(0, test_1.test)("Cancel edit action restores original name", (_a) =>
    __awaiter(void 0, [_a], void 0, function (_b) {
      let fullName
      let email
      let password
      let updatedName
      const page = _b.page
      return __generator(this, (_c) => {
        switch (_c.label) {
          case 0:
            fullName = "Test User"
            email = (0, random_ts_1.randomEmail)()
            password = (0, random_ts_1.randomPassword)()
            updatedName = "Test User"
            // Sign up a new user
            return [
              4 /*yield*/,
              (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
              // Log in the user
            ]
          case 1:
            // Sign up a new user
            _c.sent()
            // Log in the user
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, password),
            ]
          case 2:
            // Log in the user
            _c.sent()
            return [4 /*yield*/, page.goto("/settings")]
          case 3:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("tab", { name: "My profile" }).click(),
            ]
          case 4:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Edit" }).click(),
            ]
          case 5:
            _c.sent()
            return [4 /*yield*/, page.getByLabel("Full name").fill(updatedName)]
          case 6:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Cancel" }).first().click(),
            ]
          case 7:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page
                  .getByLabel("My profile")
                  .getByText(fullName, { exact: true }),
              ).toBeVisible(),
            ]
          case 8:
            _c.sent()
            return [2 /*return*/]
        }
      })
    }),
  )
  ;(0, test_1.test)("Cancel edit action restores original email", (_a) =>
    __awaiter(void 0, [_a], void 0, function (_b) {
      let fullName
      let email
      let password
      let updatedEmail
      const page = _b.page
      return __generator(this, (_c) => {
        switch (_c.label) {
          case 0:
            fullName = "Test User"
            email = (0, random_ts_1.randomEmail)()
            password = (0, random_ts_1.randomPassword)()
            updatedEmail = (0, random_ts_1.randomEmail)()
            // Sign up a new user
            return [
              4 /*yield*/,
              (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
              // Log in the user
            ]
          case 1:
            // Sign up a new user
            _c.sent()
            // Log in the user
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, password),
            ]
          case 2:
            // Log in the user
            _c.sent()
            return [4 /*yield*/, page.goto("/settings")]
          case 3:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("tab", { name: "My profile" }).click(),
            ]
          case 4:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Edit" }).click(),
            ]
          case 5:
            _c.sent()
            return [4 /*yield*/, page.getByLabel("Email").fill(updatedEmail)]
          case 6:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Cancel" }).first().click(),
            ]
          case 7:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page.getByLabel("My profile").getByText(email, { exact: true }),
              ).toBeVisible(),
            ]
          case 8:
            _c.sent()
            return [2 /*return*/]
        }
      })
    }),
  )
})
// Change Password
test_1.test.describe("Change password successfully", () => {
  test_1.test.use({ storageState: { cookies: [], origins: [] } })
  ;(0, test_1.test)("Update password successfully", (_a) =>
    __awaiter(void 0, [_a], void 0, function (_b) {
      let fullName
      let email
      let password
      let NewPassword
      const page = _b.page
      return __generator(this, (_c) => {
        switch (_c.label) {
          case 0:
            fullName = "Test User"
            email = (0, random_ts_1.randomEmail)()
            password = (0, random_ts_1.randomPassword)()
            NewPassword = (0, random_ts_1.randomPassword)()
            // Sign up a new user
            return [
              4 /*yield*/,
              (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
              // Log in the user
            ]
          case 1:
            // Sign up a new user
            _c.sent()
            // Log in the user
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, password),
            ]
          case 2:
            // Log in the user
            _c.sent()
            return [4 /*yield*/, page.goto("/settings")]
          case 3:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("tab", { name: "Password" }).click(),
            ]
          case 4:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Current Password*").fill(password),
            ]
          case 5:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Set Password*").fill(NewPassword),
            ]
          case 6:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Confirm Password*").fill(NewPassword),
            ]
          case 7:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Save" }).click(),
            ]
          case 8:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page.getByText("Password updated successfully."),
              ).toBeVisible(),
            ]
          case 9:
            _c.sent()
            return [
              4 /*yield*/,
              (0, user_ts_1.logOutUser)(page),
              // Check if the user can log in with the new password
            ]
          case 10:
            _c.sent()
            // Check if the user can log in with the new password
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, NewPassword),
            ]
          case 11:
            // Check if the user can log in with the new password
            _c.sent()
            return [2 /*return*/]
        }
      })
    }),
  )
})
test_1.test.describe("Change password with invalid data", () => {
  test_1.test.use({ storageState: { cookies: [], origins: [] } })
  ;(0, test_1.test)("Update password with weak passwords", (_a) =>
    __awaiter(void 0, [_a], void 0, function (_b) {
      let fullName
      let email
      let password
      let weakPassword
      const page = _b.page
      return __generator(this, (_c) => {
        switch (_c.label) {
          case 0:
            fullName = "Test User"
            email = (0, random_ts_1.randomEmail)()
            password = (0, random_ts_1.randomPassword)()
            weakPassword = "weak"
            // Sign up a new user
            return [
              4 /*yield*/,
              (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
              // Log in the user
            ]
          case 1:
            // Sign up a new user
            _c.sent()
            // Log in the user
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, password),
            ]
          case 2:
            // Log in the user
            _c.sent()
            return [4 /*yield*/, page.goto("/settings")]
          case 3:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("tab", { name: "Password" }).click(),
            ]
          case 4:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Current Password*").fill(password),
            ]
          case 5:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Set Password*").fill(weakPassword),
            ]
          case 6:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Confirm Password*").fill(weakPassword),
            ]
          case 7:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page.getByText("Password must be at least 8 characters"),
              ).toBeVisible(),
            ]
          case 8:
            _c.sent()
            return [2 /*return*/]
        }
      })
    }),
  )
  ;(0, test_1.test)(
    "New password and confirmation password do not match",
    (_a) =>
      __awaiter(void 0, [_a], void 0, function (_b) {
        let fullName
        let email
        let password
        let newPassword
        let confirmPassword
        const page = _b.page
        return __generator(this, (_c) => {
          switch (_c.label) {
            case 0:
              fullName = "Test User"
              email = (0, random_ts_1.randomEmail)()
              password = (0, random_ts_1.randomPassword)()
              newPassword = (0, random_ts_1.randomPassword)()
              confirmPassword = (0, random_ts_1.randomPassword)()
              // Sign up a new user
              return [
                4 /*yield*/,
                (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
                // Log in the user
              ]
            case 1:
              // Sign up a new user
              _c.sent()
              // Log in the user
              return [
                4 /*yield*/,
                (0, user_ts_1.logInUser)(page, email, password),
              ]
            case 2:
              // Log in the user
              _c.sent()
              return [4 /*yield*/, page.goto("/settings")]
            case 3:
              _c.sent()
              return [
                4 /*yield*/,
                page.getByRole("tab", { name: "Password" }).click(),
              ]
            case 4:
              _c.sent()
              return [
                4 /*yield*/,
                page.getByLabel("Current Password*").fill(password),
              ]
            case 5:
              _c.sent()
              return [
                4 /*yield*/,
                page.getByLabel("Set Password*").fill(newPassword),
              ]
            case 6:
              _c.sent()
              return [
                4 /*yield*/,
                page.getByLabel("Confirm Password*").fill(confirmPassword),
              ]
            case 7:
              _c.sent()
              return [
                4 /*yield*/,
                page.getByRole("button", { name: "Save" }).click(),
              ]
            case 8:
              _c.sent()
              return [
                4 /*yield*/,
                (0, test_1.expect)(
                  page.getByText("Passwords do not match"),
                ).toBeVisible(),
              ]
            case 9:
              _c.sent()
              return [2 /*return*/]
          }
        })
      }),
  )
  ;(0, test_1.test)("Current password and new password are the same", (_a) =>
    __awaiter(void 0, [_a], void 0, function (_b) {
      let fullName
      let email
      let password
      const page = _b.page
      return __generator(this, (_c) => {
        switch (_c.label) {
          case 0:
            fullName = "Test User"
            email = (0, random_ts_1.randomEmail)()
            password = (0, random_ts_1.randomPassword)()
            // Sign up a new user
            return [
              4 /*yield*/,
              (0, user_ts_1.signUpNewUser)(page, fullName, email, password),
              // Log in the user
            ]
          case 1:
            // Sign up a new user
            _c.sent()
            // Log in the user
            return [
              4 /*yield*/,
              (0, user_ts_1.logInUser)(page, email, password),
            ]
          case 2:
            // Log in the user
            _c.sent()
            return [4 /*yield*/, page.goto("/settings")]
          case 3:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("tab", { name: "Password" }).click(),
            ]
          case 4:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Current Password*").fill(password),
            ]
          case 5:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Set Password*").fill(password),
            ]
          case 6:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByLabel("Confirm Password*").fill(password),
            ]
          case 7:
            _c.sent()
            return [
              4 /*yield*/,
              page.getByRole("button", { name: "Save" }).click(),
            ]
          case 8:
            _c.sent()
            return [
              4 /*yield*/,
              (0, test_1.expect)(
                page.getByText(
                  "New password cannot be the same as the current one",
                ),
              ).toBeVisible(),
            ]
          case 9:
            _c.sent()
            return [2 /*return*/]
        }
      })
    }),
  )
})
// Appearance
;(0, test_1.test)("Appearance tab is visible", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/settings")]
        case 1:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("tab", { name: "Appearance" }).click(),
          ]
        case 2:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(page.getByLabel("Appearance")).toBeVisible(),
          ]
        case 3:
          _c.sent()
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("User can switch from light mode to dark mode", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    let isDarkMode
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/settings")]
        case 1:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("tab", { name: "Appearance" }).click(),
          ]
        case 2:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByLabel("Appearance").locator("span").nth(3).click(),
          ]
        case 3:
          _c.sent()
          return [
            4 /*yield*/,
            page.evaluate(() =>
              document.body.classList.contains("chakra-ui-dark"),
            ),
          ]
        case 4:
          isDarkMode = _c.sent()
          ;(0, test_1.expect)(isDarkMode).toBe(true)
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("User can switch from dark mode to light mode", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    let isLightMode
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/settings")]
        case 1:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("tab", { name: "Appearance" }).click(),
          ]
        case 2:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByLabel("Appearance").locator("span").first().click(),
          ]
        case 3:
          _c.sent()
          return [
            4 /*yield*/,
            page.evaluate(() =>
              document.body.classList.contains("chakra-ui-light"),
            ),
          ]
        case 4:
          isLightMode = _c.sent()
          ;(0, test_1.expect)(isLightMode).toBe(true)
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("Selected mode is preserved across sessions", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    let isDarkMode
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/settings")]
        case 1:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("tab", { name: "Appearance" }).click(),
          ]
        case 2:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByLabel("Appearance").locator("span").nth(3).click(),
          ]
        case 3:
          _c.sent()
          return [4 /*yield*/, (0, user_ts_1.logOutUser)(page)]
        case 4:
          _c.sent()
          return [
            4 /*yield*/,
            (0, user_ts_1.logInUser)(
              page,
              config_ts_1.firstSuperuser,
              config_ts_1.firstSuperuserPassword,
            ),
          ]
        case 5:
          _c.sent()
          return [
            4 /*yield*/,
            page.evaluate(() =>
              document.body.classList.contains("chakra-ui-dark"),
            ),
          ]
        case 6:
          isDarkMode = _c.sent()
          ;(0, test_1.expect)(isDarkMode).toBe(true)
          return [2 /*return*/]
      }
    })
  }),
)

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
const mailcatcher_1 = require("./utils/mailcatcher")
const random_1 = require("./utils/random")
const user_1 = require("./utils/user")
test_1.test.use({ storageState: { cookies: [], origins: [] } })
;(0, test_1.test)("Password Recovery title is visible", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/recover-password")]
        case 1:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(
              page.getByRole("heading", { name: "Password Recovery" }),
            ).toBeVisible(),
          ]
        case 2:
          _c.sent()
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("Input is visible, empty and editable", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/recover-password")]
        case 1:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(page.getByPlaceholder("Email")).toBeVisible(),
          ]
        case 2:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(page.getByPlaceholder("Email")).toHaveText(""),
          ]
        case 3:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(page.getByPlaceholder("Email")).toBeEditable(),
          ]
        case 4:
          _c.sent()
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("Continue button is visible", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, page.goto("/recover-password")]
        case 1:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(
              page.getByRole("button", { name: "Continue" }),
            ).toBeVisible(),
          ]
        case 2:
          _c.sent()
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("User can reset password successfully using the link", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    let fullName
    let email
    let password
    let newPassword
    let emailData
    let selector
    let url
    const page = _b.page
    const request = _b.request
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          fullName = "Test User"
          email = (0, random_1.randomEmail)()
          password = (0, random_1.randomPassword)()
          newPassword = (0, random_1.randomPassword)()
          // Sign up a new user
          return [
            4 /*yield*/,
            (0, user_1.signUpNewUser)(page, fullName, email, password),
          ]
        case 1:
          // Sign up a new user
          _c.sent()
          return [4 /*yield*/, page.goto("/recover-password")]
        case 2:
          _c.sent()
          return [4 /*yield*/, page.getByPlaceholder("Email").fill(email)]
        case 3:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("button", { name: "Continue" }).click(),
          ]
        case 4:
          _c.sent()
          return [
            4 /*yield*/,
            (0, mailcatcher_1.findLastEmail)({
              request: request,
              filter: (e) => e.recipients.includes("<".concat(email, ">")),
              timeout: 5000,
            }),
          ]
        case 5:
          emailData = _c.sent()
          return [
            4 /*yield*/,
            page.goto(
              "http://localhost:1080/messages/".concat(emailData.id, ".html"),
            ),
          ]
        case 6:
          _c.sent()
          selector = 'a[href*="/reset-password?token="]'
          return [
            4 /*yield*/,
            page.getAttribute(selector, "href"),
            // TODO: update var instead of doing a replace
          ]
        case 7:
          url = _c.sent()
          // TODO: update var instead of doing a replace
          url = url.replace("http://localhost/", "http://localhost:5173/")
          // Set the new password and confirm it
          return [4 /*yield*/, page.goto(url)]
        case 8:
          // Set the new password and confirm it
          _c.sent()
          return [
            4 /*yield*/,
            page.getByLabel("Set Password").fill(newPassword),
          ]
        case 9:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByLabel("Confirm Password").fill(newPassword),
          ]
        case 10:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("button", { name: "Reset Password" }).click(),
          ]
        case 11:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(
              page.getByText("Password updated successfully"),
            ).toBeVisible(),
            // Check if the user is able to login with the new password
          ]
        case 12:
          _c.sent()
          // Check if the user is able to login with the new password
          return [4 /*yield*/, (0, user_1.logInUser)(page, email, newPassword)]
        case 13:
          // Check if the user is able to login with the new password
          _c.sent()
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("Expired or invalid reset link", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    let password
    let invalidUrl
    const page = _b.page
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          password = (0, random_1.randomPassword)()
          invalidUrl = "/reset-password?token=invalidtoken"
          return [4 /*yield*/, page.goto(invalidUrl)]
        case 1:
          _c.sent()
          return [4 /*yield*/, page.getByLabel("Set Password").fill(password)]
        case 2:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByLabel("Confirm Password").fill(password),
          ]
        case 3:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("button", { name: "Reset Password" }).click(),
          ]
        case 4:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(page.getByText("Invalid token")).toBeVisible(),
          ]
        case 5:
          _c.sent()
          return [2 /*return*/]
      }
    })
  }),
)
;(0, test_1.test)("Weak new password validation", (_a) =>
  __awaiter(void 0, [_a], void 0, function (_b) {
    let fullName
    let email
    let password
    let weakPassword
    let emailData
    let selector
    let url
    const page = _b.page
    const request = _b.request
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          fullName = "Test User"
          email = (0, random_1.randomEmail)()
          password = (0, random_1.randomPassword)()
          weakPassword = "123"
          // Sign up a new user
          return [
            4 /*yield*/,
            (0, user_1.signUpNewUser)(page, fullName, email, password),
          ]
        case 1:
          // Sign up a new user
          _c.sent()
          return [4 /*yield*/, page.goto("/recover-password")]
        case 2:
          _c.sent()
          return [4 /*yield*/, page.getByPlaceholder("Email").fill(email)]
        case 3:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("button", { name: "Continue" }).click(),
          ]
        case 4:
          _c.sent()
          return [
            4 /*yield*/,
            (0, mailcatcher_1.findLastEmail)({
              request: request,
              filter: (e) => e.recipients.includes("<".concat(email, ">")),
              timeout: 5000,
            }),
          ]
        case 5:
          emailData = _c.sent()
          return [
            4 /*yield*/,
            page.goto(
              "http://localhost:1080/messages/".concat(emailData.id, ".html"),
            ),
          ]
        case 6:
          _c.sent()
          selector = 'a[href*="/reset-password?token="]'
          return [4 /*yield*/, page.getAttribute(selector, "href")]
        case 7:
          url = _c.sent()
          url = url.replace("http://localhost/", "http://localhost:5173/")
          // Set a weak new password
          return [4 /*yield*/, page.goto(url)]
        case 8:
          // Set a weak new password
          _c.sent()
          return [
            4 /*yield*/,
            page.getByLabel("Set Password").fill(weakPassword),
          ]
        case 9:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByLabel("Confirm Password").fill(weakPassword),
          ]
        case 10:
          _c.sent()
          return [
            4 /*yield*/,
            page.getByRole("button", { name: "Reset Password" }).click(),
          ]
        case 11:
          _c.sent()
          return [
            4 /*yield*/,
            (0, test_1.expect)(
              page.getByText("Password must be at least 8 characters"),
            ).toBeVisible(),
          ]
        case 12:
          _c.sent()
          return [2 /*return*/]
      }
    })
  }),
)

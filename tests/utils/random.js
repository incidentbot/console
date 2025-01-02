Object.defineProperty(exports, "__esModule", { value: true })
exports.slugify =
  exports.randomPassword =
  exports.randomTeamName =
  exports.randomEmail =
    void 0
const randomEmail = () =>
  "test_".concat(Math.random().toString(36).substring(7), "@example.com")
exports.randomEmail = randomEmail
const randomTeamName = () =>
  "Team ".concat(Math.random().toString(36).substring(7))
exports.randomTeamName = randomTeamName
const randomPassword = () => "".concat(Math.random().toString(36).substring(2))
exports.randomPassword = randomPassword
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
exports.slugify = slugify

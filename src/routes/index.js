const landingRoute = require("./landing");
const profileRoute = require("./profile");
const dashboardRoute = require("./dashboard");
const userRoute = require("./user");
const settingRoute = require("./setting");
const content02Route = require("./content02");
const login = require("./login.router");
const logout = require("./logout.router");
const register = require("./register");

const {
  authen,
  exposeAdmin
} = require("../app/middleware/check_auth");

function route(app) {
  app.use("/login", login);
  app.use("/register", register);
  app.use("/logout", logout);
  app.use("/", landingRoute);
  app.use("/user", authen, userRoute);
  app.use("/profile", profileRoute);
  app.use("/dashboard", authen, exposeAdmin, dashboardRoute);
  app.use("/setting", authen, settingRoute);
  app.use("/content02", authen, content02Route);
}

module.exports = route;

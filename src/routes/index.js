const landingRoute = require("./landing");
const profileRoute = require("./profile");
const dashboardRoute = require("./dashboard");
const userRoute = require("./user");
const settingRoute = require("./setting");
const productRoute = require("./product");
const login = require("./login.router");
const logout = require("./logout.router");
const {
  authen,
  exposeAdmin
} = require("../app/middleware/check_auth");

function route(app) {
  app.use("/login", login);
  app.use("/logout", logout);
  app.use("/", landingRoute);
  app.use("/user", authen, userRoute);
  app.use("/profile", profileRoute);
  app.use("/dashboard", authen, exposeAdmin, dashboardRoute);
  app.use("/setting", authen, settingRoute);
  app.use("/product", authen, productRoute);
}

module.exports = route;

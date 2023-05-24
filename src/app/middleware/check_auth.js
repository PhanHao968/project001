const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user");

const authen = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.redirect("../");
    else {
      req.user = decoded;
      next();
    }
  });
};

const exposeAdmin = (req, res, next) => {
  if (!req.user.admin) return res.redirect("../setting");
  else next();
}

const authorization = (req, res, next) => {
  if (req.user.admin) {
    res.redirect("../dashboard/store");
  }
  else {
    res.redirect("../setting");
  }
};

module.exports = {
  authen,
  authorization,
  exposeAdmin,
};
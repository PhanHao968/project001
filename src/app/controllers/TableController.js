const User = require("../models/user");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const mongoose = require("../../util/mongoose");

class TableController {

  show(req, res, next) {
    const userName = req.cookies.userName;
    const userAvatar = req.cookies.userAvartar;
    return res.render("admin/dashboard", {
      layout: "admin",
      userName: userName,
      userAvatar: userAvatar,
    });
  }

  storeUsersTable(req, res, next) {
    const userAvatar = req.cookies.userAvatar;
    let userQuery = User.find({});
    let deletedCount = User.countDocumentsDeleted();
    const userName = req.cookies.userName;
    Promise.all([userQuery, deletedCount])
      .then(([users, deletedCount]) => {
        res.render("admin/tables", {
          layout: "admin",
          deletedCount,
          users: mutipleMongooseToObject(users),
          userName: userName,
          userAvatar: userAvatar,
        });
      })
      .catch(next);
  }

  trashUsers(req, res, next) {
    const userName = req.cookies.userName;
    const userAvatar = req.cookies.userAvatar;
    User.findDeleted({})
      .then((users) =>
        res.render("admin/trashtables", {
          layout: "admin",
          users: mutipleMongooseToObject(users),
          userName: userName,
          userAvatar: userAvatar,
        })
      )
      .catch(next);
  }
}

module.exports = new TableController;

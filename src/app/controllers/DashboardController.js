const User = require("../models/user");
const Product = require("../models/products");
const { mutipleMongooseToObject } = require("../../util/mongoose");
//const { response } = require('../..');
const mongoose = require("../../util/mongoose");

class DashboardController {
  show(req, res, next) {
    const userAvatar =req.cookies.userAvatar;
    const userName = req.cookies.userName;
    return res.render("admin/dashboard", {
      layout: "admin",
      //user: res.user,
      userName :userName,
      userAvatar :userAvatar,
    });
  }

  storeUsers(req, res, next) {
    let userQuery = User.find({});
    let deletedCount = User.countDocumentsDeleted();
    const userName = req.cookies.userName;
    let userAvatar = req.cookies.userAvatar;
    Promise.all([userQuery, deletedCount])
      .then(([users, deletedCount]) => {
        res.render("me/storeUsers", {
          layout: "admin",
          deletedCount,
          users: mutipleMongooseToObject(users),
          userName : userName,
          userAvatar:userAvatar,
        });
      })
      .catch(next);
  }

  trashUsers(req, res, next) {
    const userName = req.cookies.userName;
    User.findDeleted({})
      .then((users) =>
        res.render("me/trashUsers", {
          layout: "admin",
          users: mutipleMongooseToObject(users),
          userName: userName,
        })
      )
      .catch(next);
  }

  //product

  storeProduct(req, res, next) {
    let productQuery = Product.find({});
    let deletedCount = Product.countDocumentsDeleted();
    const userName = req.cookies.userName;
    Promise.all([productQuery, deletedCount])
      .then(([products, deletedCount]) => {
        res.render("me/storeProduct", {
          layout: "user",
          deletedCount,
          products: mutipleMongooseToObject(products),
          userName: userName,
        });
      })
      .catch(next);
  }

  trashProduct(req, res, next) {
    const userName = req.cookies.userName;
    Product.findDeleted({})
      .then((Product) =>
        res.render("me/trashProduct", {
          layout: "user",
          Product: mutipleMongooseToObject(Product),
          userName: userName,
        })
      )
      .catch(next);
  }
}

module.exports = new DashboardController;

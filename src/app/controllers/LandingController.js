const {
    mongooseToObject,
    mutipleMongooseToObject } = require("../../util/mongoose");
const Content02 = require("../models/content02");
const User = require("../models/user");

class LandingController {

    show(req, res, next) {

        const userAvatar = req.cookies.userAvatar;
        const userName = req.cookies.userName;

        Promise.all([
            User.find({}),
            Content02.find({}),
        ])
        .then(([users, contents])=>{
            res.render('landing',{
                userName: userName,
                userAvatar: userAvatar,
                User: mutipleMongooseToObject(users),
                Content02: mutipleMongooseToObject(contents),
            });

        })
        .catch(next);

    };
};

module.exports = new LandingController();

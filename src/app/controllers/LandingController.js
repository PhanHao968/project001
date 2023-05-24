const {
    mongooseToObject,
    mutipleMongooseToObject } = require("../../util/mongoose");
const User = require("../models/user");

class LandingController {

    show(req, res, next) {
       
        const userAvatar = req.cookies.userAvatar;
        const userName = req.cookies.userName;

        User.find({})
            .then((User) => {
                res.render('landing', {
                    userName: userName,
                    userAvatar: userAvatar,
                    User: mutipleMongooseToObject(User)
                });
            })
            .catch(next);

    };
};

module.exports = new LandingController();

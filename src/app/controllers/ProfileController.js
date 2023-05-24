const { mongooseToObject } = require("../../util/mongoose");
const User = require("../models/user");
class ProfileController {

    show(req, res, next) {
        const userId = req.cookies.userId;
        const userName = req.cookies.userName;
        const userAvatar = req.cookies.userAvatar;
        User.findById(userId)
            .then((User) => {
                res.render('profile', {
                    userName: userName,
                    User: mongooseToObject(User),
                    userAvatar: userAvatar,
                });
            })
            .catch(next);

    };

    showClients(req, res, next) {
        User.findOne({ slug: req.params.slug })
        .then(User => {
            console.log(User)
            res.render('profile', {
                User: mongooseToObject(User)
            })
        })
        .catch(next);
    };
};

module.exports = new ProfileController();

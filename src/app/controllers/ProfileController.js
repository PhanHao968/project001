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

    //Modify
    editProfile(req, res, next) {
        debugger
        const userAvatar = req.cookies.userAvatar;
        const userName = req.cookies.userName;
        User.findById(req.params.id)
            .then((User) => {
                res.render('admin/editProfile', {
                    layout: "admin",
                    User: mongooseToObject(User),
                    userName: userName,
                    userAvatar: userAvatar,
                });
            })
            .catch(next);
    }

    updateProfile(req, res, next) {

        const userId = req.params.id;
        const { firstName, lastName, specialized, position, city, country, education, description } = req.body;
        const updateFields = {};

        if (req.file) {
            updateFields.avatar = "/img/" + req.file.filename;
        }

        updateFields.firstName = firstName ? firstName : '';
        updateFields.lastName = lastName ? lastName : '';
        updateFields.position = position ? position : '';
        updateFields.city = city ? city : '';
        updateFields.country = country ? country : '';
        updateFields.education = education ? education : '';
        updateFields.description = description ? description : '';
        updateFields.specialized = specialized ? specialized : '';


        User.updateOne({ _id: userId }, updateFields)
            .then(() => {
                User.findById(userId)
                    .then((User) => {
                        if (User) {
                            User.slug = createSlug(User.firstName);
                            User.save();
                        }
                    });
                res.redirect('back');
            })
            .catch(next);
    };
};

module.exports = new ProfileController();

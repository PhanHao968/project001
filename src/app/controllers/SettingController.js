const { mongooseToObject } = require("../../util/mongoose");
const User = require("../models/user");
const multer = require('multer')
const { createSlug } = require('../middleware/createSlug');

class SettingController {

    edit(req, res, next) {
        const userId = req.cookies.userId;
        const userName = req.cookies.userName;
        const userAvatar = req.cookies.userAvatar;
        User.findById(userId)
            .then((User) => {
                res.render('admin/settings', {
                    layout: 'user',
                    userName: userName,
                    User: mongooseToObject(User),
                    userAvatar: userAvatar,
                });
            })
            .catch(next);
    };

    update(req, res, next) {

        const userId = req.cookies.userId;
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

    editProfile(req, res, next) {
        User.findById(req.params.id)
            .then((User) => {
                res.render('admin/settings', {
                    layout: "admin",
                    User: mongooseToObject(User),
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
module.exports = new SettingController();

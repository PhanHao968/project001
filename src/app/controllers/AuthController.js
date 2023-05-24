const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {

    showLogin(req, res, next) {
        res.render('auth/login')
    };

    async login(req, res, next) {
        try {
            // Get user from database
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'This email is not existing!' });

            }
            // Check password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(404).json({ message: 'Passwords do not match!' });
            }
            // Create and send JWT token
            const token = jwt.sign(
                {
                    email: user.email,
                    Userid: user._id,
                    admin: user.admin,
                    createdAt: user.createdAt,
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                }
            );
            //res.token = token;
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });// ----> browser
            let userName = user.name;
            res.cookie("userName", userName,{
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });

            let userId = user._id;
            res.cookie("userId", userId,{
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });

            let userAvatar = user.avatar;
            res.cookie("userAvatar", userAvatar,{
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });

            req.user = user;
            next();
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error!' });
        }
    }

    logout(req, res, next) {
        res.clearCookie('token');
        res.clearCookie('userName');
        res.clearCookie('userId');
        res.clearCookie('userAvatar');
        res.redirect('../');
    }

};

module.exports = new AuthController();

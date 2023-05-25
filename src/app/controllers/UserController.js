const User = require("../models/user");
const bcrypt = require("bcrypt");
const { mongooseToObject, mongoose } = require("../../util/mongoose");
const { aggregate } = require("../models/user");
const jwt = require("jsonwebtoken");

class UserController {
  showRegister(req, res, next) {
    res.render("auth/register");
  }
  // register user
  async store(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email đã được sử dụng." });
      }
      if (password && password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password: hashedPassword,
        isApproved: false,
        admin: process.env.ADMIN_USER === email ? true : false,
      });
      const result = await user.save();

      let role;
      if (user.isApproved) {
        role = user.admin ? "admin" : "user";
      } else {
        role = "pending";
      }
      return res.redirect("/");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }

  userEdit(req, res, next) {
    User.findById(req.params.id)
      .then((User) => {
        res.render("auth/registerEdit", {
          layout: "admin",
          User: mongooseToObject(User),
        });
      })
      .catch(next);
  }
  //Update user
  async updatedUser(req, res, next) {
    const { id } = req.params;
    const { name, email, oldPassword, password, confirmPassword } = req.body;
    const filter = { _id: id };
    let user;
    try {
      user = await User.findOne(filter);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (email && email !== user.email) {
        return res.status(400).json({ message: "Email cannot be changed" });
      }
      if (oldPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Incorrect old password" });
        }
      }
      if (password && password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const update = { name: name || user.name };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        update.password = hashedPassword;
      }
      const options = { new: true };
      const updatedUser = await User.findOneAndUpdate(filter, update, options);
      res.redirect("/dashboard/store");
    } catch (err) {
      next(err);
    }
  }



  deleteUser(req, res, next) {
    const id = req.params.id.trim();
    User.delete({ _id: id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  restoreUser(req, res, next) {
    const id = req.params.id.trim();
    User.restore({ _id: id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  forceDeleteUser(req, res, next) {
    const id = req.params.id.trim();
    User.deleteOne({ _id: id })
      .then(() => res.redirect("back"))
      .catch(next);
  };

  // Controller
  updateUserApproval = async (req, res) => {
    const userId = req.params.userId;
    const isApproved = req.body.isApproved;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { isApproved });
  
      res.redirect('../dashboard/store')
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

}

module.exports = new UserController();

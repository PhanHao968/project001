const Content02 = require("../models/content02");
const { mongooseToObject, mongoose } = require("../../util/mongoose");
const multer = require("multer");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class Content02Controller {
  //[GET] /content/create

  create(req, res, next) {
    const userName = req.cookies.userName;
    const userAvatar = req.cookies.userAvatar;
    res.render("content02/createContent02", {
      layout: "user",
      userAvatar: userAvatar,
      userName: userName,
    });
  }

  //[POST] /content/store

  store(req, res, next) {
    let imagePathAbout;
    let imagePathBelow;
    const {
      nameAbout,
      nameAbout_1,
      nameBelow,
      descriptionAbout,
      descriptionAbout_1,
      descriptionBelow,
      item,
      item01,
      item02,
      item03,
    } = req.body;
    if (req.file) {
      if (req.file.imgAbout) {
        imagePathAbout = "/img/" + req.files.imgAbout[0].filename;
      }
      if (req.file.imgBelow) {
        imagePathBelow = "/img/" + req.files.imgBelow[0].filename;
      }
    }

    console.log(req.body);
    console.log(req.files.imgAbout);

    const newContent02 = new Content02({
      _id: new mongoose.Types.ObjectId(),
      nameAbout: nameAbout,
      nameAbout_1: nameAbout_1,
      nameBelow: nameBelow,
      descriptionAbout: descriptionAbout,
      descriptionAbout_1: descriptionAbout_1,
      descriptionBelow: descriptionBelow,
      item: item,
      item01: item01,
      item02: item02,
      item03: item03,
      imgAbout: imagePathAbout,
      imgBelow: imagePathBelow,
      createdAt: new Date(),
    });

    newContent02
      .save()
      .then(() => {
        res.redirect("/content02/create");
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
  //Show store content
  storeContent02(req, res, next) {
    const userAvatar = req.cookies.userAvatar;
    let content02Query = Content02.find({});
    let deletedCount = Content02.countDocumentsDeleted();
    const userName = req.cookies.userName;
    Promise.all([content02Query, deletedCount])
      .then(([Content02, deletedCount]) => {
        res.render("content02/storeContent", {
          layout: "admin",
          deletedCount,
          Content02: mutipleMongooseToObject(Content02),
          userName: userName,
          userAvatar: userAvatar,
        });
      })
      .catch(next);
  }

  //[GET] /content/:id/edit

  editContent(req, res, next) {
    //debugger
    const userAvatar = req.cookies.userAvatar;
    const userName = req.cookies.userName;
    Content02.findById(req.params.id)
      .then((content02) => {
        res.render("content02/editContent02", {
          layout: "admin",
          Content02: mongooseToObject(content02),
          userName: userName,
          userAvatar: userAvatar,
        });
      })
      .catch(next);
  }

  //[PUT] /content02/:id

  update(req, res, next) {
    debugger;
    const contentId = req.params.id;
    const { name, description, item01, item02, item03 } = req.body;
    const updateFields = {};

    if (req.file) {
      updateFields.img = "/img/" + req.file.filename;
    }

    updateFields.name = name ? name : "";
    updateFields.description = description ? description : "";
    updateFields.item01 = item01 ? item01 : "";
    updateFields.item02 = item02 ? item02 : "";
    updateFields.item03 = item03 ? item03 : "";

    Content02.updateOne({ _id: contentId }, updateFields)
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  //[DELETE] /content02/:id

  destroy(req, res, next) {
    const id = req.params.id.trim();
    Content02.delete({ _id: id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  trashContent02(req, res, next) {
    const userName = req.cookies.userName;
    const userAvatar = req.cookies.userAvatar;
    Content02.findDeleted({})
      .then((Content02) =>
        res.render("content02/trashContent", {
          layout: "admin",
          Content02: mutipleMongooseToObject(Content02),
          userName: userName,
          userAvatar: userAvatar,
        })
      )
      .catch(next);
  }

  //[DELETE] /content/:id/force

  forceDestroy(req, res, next) {
    const id = req.params.id.trim();
    Content02.deleteOne({ _id: id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /content02/:id/restore

  restore(req, res, next) {
    const id = req.params.id.trim();
    Content02.restore({ _id: id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  updateContent02Approval = async (req, res) => {
    const content02Id = req.params.content02Id;
    const isApproved = req.body.isApproved;

    try {
      await Content02.findByIdAndUpdate(
        { _id: content02Id },
        {
          isApproved,
        }
      ).exec();
      res.redirect("../content02/storecontent");
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  //[POST]//product/handle-form-action
  // handleFormAction(req, res, next) {
  //     switch (req.body.action) {
  //         case 'delete':
  //             Course.delete({ _id: { $in: req.body.courseIds } })
  //                 .then(() => res.redirect('back'))
  //                 .catch(next);
  //             break;
  //         default:
  //             res.json({ message: 'Action in valid!' })
  //     };

  // }
}
module.exports = new Content02Controller();

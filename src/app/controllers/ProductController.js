const Product = require('../models/products');
const { mongooseToObject, mongoose } = require('../../util/mongoose');
const { upload } = require('../middleware/upload');
const multer = require('multer')


class ProductController {

    //[GET] /product/show

    show(req, res, next) {
        return res.render("admin/dashboard", {
          layout: "user",
          user: req.user
        });
      }

    //[GET] /product/create

    create(req, res, next) {
        res.render('products/productCreate', {
            layout: 'user',
        })
    }

    //[POST] /Product/store

    store(req, res, next) {
        
        upload.single('img')(req, res, function (err) {
            if (err) {
                return res.sendStatus(500);
            }
            const imagePath = req.file.path.replace(/^public\//, '');

            const newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                img: imagePath,
                createdAt: new Date()
            });

            newProduct
            .save()
            .then(() => {
                res.redirect('dashboard/storeproduct');
            }).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
        });
    };


    //[GET] /product/:id/edit

    edit(req, res, next) {
        Product.findById(req.params.id).then(Product => {
            res.render('products/productEdit', {
                layout: 'user',
                Product: mongooseToObject(Product)
            })
        })
            .catch(next);
    }

    //[PUT] /product/:id

    update(req, res, next) {
        const data = req.body
        console.log(data)
        Product.updateOne({ _id: req.params.id }, data)
            .then(() => res.redirect('/product/storeproduct'))
            .catch(next);
    }

    //[DELETE] /product/:id

    destroy(req, res, next) {
        const id = (req.params.id).trim();
        Product.delete({ _id: id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /product/:id/force

    forceDestroy(req, res, next) {
        const id = (req.params.id).trim();
        Product.deleteOne({ _id: id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /product/:id/restore

    restore(req, res, next) {
        const id = (req.params.id).trim();
        Product.restore({ _id: id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

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
module.exports = new ProductController();     
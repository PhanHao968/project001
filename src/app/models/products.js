const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');


const Product = new Schema({
  name: { type: String, required: true },
  description: { type: String, maxLength: 600 },
  img: { data: Buffer, contentType: String },
  slug: { type: String, slug: 'name', slugOn: { updateOne: true } },
  createdAt: { type: Date, default: moment().tz('Asia/Ho_Chi_Minh').toDate() },
  updatedAt: { type: Date, default: moment().tz('Asia/Ho_Chi_Minh').toDate() },
}, {
  timestamps: true,
});

//Add plugins
mongoose.plugin(slug);
Product.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model('Product', Product);
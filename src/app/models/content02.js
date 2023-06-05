const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');


const Content02 = new Schema({
  nameAbout: { type: String, required: true },
  nameAbout_1: { type: String, required: true },
  nameBelow: { type: String, required: true },
  descriptionAbout: { type: String, maxLength: 600 },
  descriptionAbout_1: { type: String, maxLength: 600 },
  descriptionBelow: { type: String, maxLength: 600 },
  item: { type: String, required: true },
  item01: { type: String, required: true },
  item02: { type: String, required: true },
  item03: { type: String, required: true },
  imgAbout: { type: String },
  imgBelow: { type: String },
  slug: { type: String, slug: 'nameAbout', slugOn: { updateOne: true } },
  isApproved: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (createdAt) {
      return moment.utc(createdAt).utcOffset(7).format('HH:mm:ss DD/MM/YYYY');
    },
  },

  updatedAt: {
    type: Date,
    default: Date.now,
    get: function (updatedAt) {
      return moment.utc(updatedAt).utcOffset(7).format('HH:mm:ss DD/MM/YYYY');
    },
  },

}, {
  timestamps: true,
});

//Add plugins
Content02.set('toObject', { getters: true });
mongoose.plugin(slug);
Content02.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model('Content02', Content02);
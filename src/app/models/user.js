const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const { format } = require('date-fns');
const moment = require('moment');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    slug: { type: String, slug: 'firstName', slugOn: { updateOne: true } },
    img: { data: Buffer, contentType: String },
    //avatar: { data: Buffer, contentType: String },
    avatar: { type: String },
    position: { type: String },
    city: { type: String },
    country: { type: String },
    education: { type: String },
    specialized: { type: String },
    description: { type: String, maxLength: 1000 },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    admin: { type: Boolean },
    isApproved: { type: Boolean, default: false },
    password: { type: String, required: true },
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

mongoose.plugin(slug);
userSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});
userSchema.set('toObject', { getters: true });
module.exports = mongoose.model('User', userSchema);

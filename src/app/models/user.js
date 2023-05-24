const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    slug: { type: String, slug: 'firstName', slugOn: { updateOne: true } },
    img: { data: Buffer, contentType: String },
    avatar: { data: Buffer, contentType: String },
    position: { type: String },
    city: { type: String},
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
    password: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updateAt: { type: Date, default: new Date() },
}, {
    timestamps: true,
});


mongoose.plugin(slug);
userSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});
module.exports = mongoose.model('User', userSchema);

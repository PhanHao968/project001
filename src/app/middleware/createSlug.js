const slugify = require('slugify');

const createSlug = (firstName) => {
    return slugify(firstName, {
        lower: true, // Chuyển đổi slug thành chữ thường
    });
};

module.exports = {
    createSlug
};
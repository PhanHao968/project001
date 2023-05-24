const multer = require('multer');
const path = require('path');

// Khởi tạo multer để xử lý tệp tin ảnh được tải lên
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img'); // Lưu tệp tin ảnh vào thư mục public/img
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Đặt tên cho tệp tin ảnh
    }
});
const upload = multer({
    storage: storage,
});

module.exports = {
    upload,
};

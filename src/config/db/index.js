
const mongoose = require('mongoose');
function connect() {

    try {
        mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect to db successfully!!!');
    } catch (error) {
        console.log('connect faillure!!!');
    }
}

module.exports = { connect };
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const backgroundSchema = new Schema({
    imageUrl:{
        type: String,
        required: true
    },
    blurHashString: {
        type: String,
        required: true
    },
    creator:{
        type: String,
        required: true
    },
    reference:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Background', backgroundSchema);
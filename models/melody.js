const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const melodySchema = new Schema({
    streamUrl:{
        type: String,
        required: true
    },
    albumArtUrl:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    artist:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Melody', melodySchema);
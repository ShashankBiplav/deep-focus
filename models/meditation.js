const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meditationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    melodies: [{
        type: Schema.Types.ObjectId,
        ref:'Melody'
    }],
    illustrationImageUrl:{
        type: String,
        required: true
    },
    baseQuote: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Meditation', meditationSchema);
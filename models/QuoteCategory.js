const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteCategorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    quotes:[{
        type: Schema.Types.ObjectId,
        ref: 'Quote'
    }]
});

module.exports = mongoose.model('QuoteCategory', quoteCategorySchema);
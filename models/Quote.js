const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quoteLine:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    category:[{
        type: Schema.Types.ObjectId,
        ref: 'QuoteCategory'
    }]
});

module.exports = mongoose.model('Quote', quoteSchema);
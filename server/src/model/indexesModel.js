const mongoose = require('mongoose');

const indexesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    museumId: {
        type: String,
        required: true
    },
    museumTitle: {
        type: String,
        required: true
    },
    sort: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

const Indexes = mongoose.model('indexes', indexesSchema)

module.exports = Indexes
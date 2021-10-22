const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
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

const Museum = mongoose.model('museum', museumSchema)

module.exports = Museum
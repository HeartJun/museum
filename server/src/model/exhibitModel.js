const mongoose = require('mongoose');

const exhibitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
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
    explain:{
        type: String,
        required: false
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

const Exhibit = mongoose.model('exhibit', exhibitSchema)

module.exports = Exhibit
const mongoose = require('mongoose');
const shortId = require('shortid');

const smallUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        default : shortId.generate,
        required: true
    },
    clicks: {
        type: Number,
        default: 0,
        required: true
    }
});

var smallUrl = mongoose.model('smallUrl', smallUrlSchema);

module.exports = smallUrl;

var mongoose = require('mongoose');
var VideosSchema = new mongoose.Schema({
    name: String,
    genre: String,
    description: String,
    address: String,
    age: Number,
    updated_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Videos', VideosSchema, 'videos');
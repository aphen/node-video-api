var mongoose = require('mongoose');
var VideosSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    genre: String,
    address: String,
    updated_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Videos', VideosSchema, 'videos');
var mongoose = require('mongoose');
var VideosSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    address: String,
    age: Number,
    updated_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Videos', VideosSchema, 'videos');
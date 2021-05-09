var mongoose = require('mongoose');
var VideosSchema = new mongoose.Schema({
    id: String,
    name: String,
<<<<<<< HEAD
    age: Number,
    genre: String,
    address: String,
=======
    description: String,
    address: String,
    age: Number,
>>>>>>> d9691d754fbf2e3776925fbb9f63f732cb74eb4f
    updated_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Videos', VideosSchema, 'videos');
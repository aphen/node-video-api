const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        require: true
    },
    password: String,
    updated_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', userSchema, 'users');
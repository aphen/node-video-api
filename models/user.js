const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    updated_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', userSchema, 'users');
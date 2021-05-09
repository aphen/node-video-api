const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        require: true
    },
    password:{
        type: String,
        set(val){
            // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
            return require('bcryptjs').hashSync(val,10)
        }
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', userSchema, 'users');
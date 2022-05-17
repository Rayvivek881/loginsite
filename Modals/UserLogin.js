const mongoose = require('mongoose');
const loginSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password : {
        type: String,
        required: true
    },
    Admin : {
        type : Boolean,
        default : false
    }
}, {timestamps: true});
const UserLogin = mongoose.model('UserLogin', loginSchema);
module.exports = UserLogin;
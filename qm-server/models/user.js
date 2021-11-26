var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String,
        default: '',
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: '',
        trim: true
    },
    password: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    email: {
        type: String,
        default: '',
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
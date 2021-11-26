var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var ChatGroup = new Schema({
    //users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    users: [{ type: String, default:'' }],
    name: {
        type: String,
        default: '',
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
}, {
    timestamps: true
});

//User.plugin(passportLocalMongoose);

module.exports = mongoose.model('ChatGroup', ChatGroup);
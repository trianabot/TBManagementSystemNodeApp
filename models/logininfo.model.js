const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LoginInfoModel = new Schema({
    username:{
        type: String
    },
    role:{
        type: String
    },
    userId:{
        type:String
    },
    emailId:{
        type: String
    },
    password:{
        type: String
    },
    sysCreatedBy: {
        type: String,
        required: false
    },
    sysUpdatedBy: {
        type: String,
        required: false
    },
    sysCreatedDate: {
        type: String,
        required: false
    },
    sysUpdatedDate: {
        type: String,
        required: false
    }, 
    loginStatus: {
        type:Boolean,
        default:true
    }
});


module.exports = mongoose.model('LoginInfo',LoginInfoModel);
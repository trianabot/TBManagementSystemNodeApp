const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminModel = new Schema({
    adminId: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    name :{
        type: String
    },
    userName: {
        type: String,
        // required: true
    },
    emailId: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    contactNumber:{
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
});

module.exports = mongoose.model('Admin',adminModel);
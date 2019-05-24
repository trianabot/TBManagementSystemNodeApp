const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departmentModel = new Schema({
    deptId :{
        type: String,
        required:true
    },
    departmentName :{
        type: String,
        required: true
    },
    contactPerson :{
        type: String,
        required:true
    },
    phone :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    createDate :{
        type: String
    }
});

module.exports = mongoose.model('Department',departmentModel);
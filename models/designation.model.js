const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let designationModel = new Schema({
    
    designationId :{
        type: String,
        required: true
    },
    designationName :{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Designation',designationModel);
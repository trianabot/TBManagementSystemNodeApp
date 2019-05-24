const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let shiftModel = new Schema({
        shiftId :{
            type: String,
            required: true
        },
        shiftName :{
            type: String,
            required:true
        }
});

module.exports = mongoose.model('Shift',shiftModel);
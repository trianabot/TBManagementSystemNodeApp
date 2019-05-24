const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeModel = new Schema({
    emplId : {
        type: String,
        required:true,
    },
   employeeName :{
       type: String,
       required:true
   },
   phoneNumber :{
       type:String,
       required:true,
   },
   alternatePhone :{
        type:String,
        required:true
   },
   email : {
       type: String,
       required:true,
   },
   userName :{
        type: String,
        required: true,
   },
   passWord :{
        type: String,
        required: true
   },
   dateofBirth :{
        type: String,
        required: true
   },
   gender :{
        type: String,
        required: true
   },
   designation : {
        type: String,
        required: true
   },
   tempAddress:{
       type:String,
       required:true,
   },
   permanentAddress :{
       type:String, 
       required:true
   },
   state : {
       type: String,
       required:true
   },
   city : {
       type: String,
       required: true,
   },
   pinCode :{
       type: String,
       required: true,
   },
   aadhar :{
       type: String,
       required: true,
   },
   pan : {
       type: String,
       required: true
   },
   employeeStatus :{
        type: Boolean,
        default:true
   },
   joiningDate :{
        type: String,
        required: true
   },
   experienceLevel :{
       type: String,
       required: true
   },
   createDate :{
       type:String
   }
});

module.exports = mongoose.model('Employee',employeeModel);
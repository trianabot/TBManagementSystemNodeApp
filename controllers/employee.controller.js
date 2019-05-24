const employeeModel = require('../models/employee.model');
const uuid = require('uuid4');

//Display employees list 
exports.employees = (req, res) =>{
    employeeModel.find({}, function(err, data) {
        if (err){
            res.send(err);
        }else {
            res.status(200).send({data:data});
        }
      });
}

//Add Employee
exports.addemployee = (req, res) =>{
    employeeModel.findOne({ email: req.body.email }, (err, user) => {
        if (user) return res.status(400).send({ message: 'The Email mail you have entered is already associated with another account.' });
        var Emplid = uuid();
        try {
            var date = new Date().getTime();
            var createDate = (Math.round(date/1000));

                const employee = new employeeModel({
                    emplId:Emplid,
                    employeeName: req.body.employeeName,
                    phoneNumber : req.body.phoneNumber,
                    alternatePhone : req.body.alternatePhone,
                    email : req.body.email,
                    userName: req.body.userName,
                    passWord : req.body.passWord,
                    dateofBirth : req.body.dateofBirth,
                    designation : req.body.designation,
                    gender : req.body.gender,
                    tempAddress: req.body.tempAddress,
                    permanentAddress : req.body.permanentAddress,
                    state : req.body.state,
                    city : req.body.city,
                    pinCode: req.body.pinCode,
                    aadhar : req.body.aadhar,
                    pan : req.body.pan,
                    employeeStatus : req.body.employeeStatus,
                    joiningDate : req.body.joiningDate,
                    experienceLevel : req.body.experienceLevel,
                    createDate:createDate
                });

                employee.save((err,data) =>{
                    if(!err){   
                        res.status(200).send({msg:'Success',data:data});
                    }
                    else{
                        console.log(err);
                    }
                })
            } catch (e) {
                res.status(500).send(e);
            }
        });
}

//Edit employee
exports.updateemployee = (req, res) =>{
      // Find note and update it with the request body
      employeeModel.update({ emplId: req.body.emplId }, {
        $set: { 
            employeeName: req.body.employeeName,
            phoneNumber : req.body.phoneNumber,
            alternatePhone : req.body.alternatePhone,
            email : req.body.email,
            userName: req.body.userName,
            passWord : req.body.passWord,
            dateofBirth : req.body.dateofBirth,
            gender : req.body.gender,
            tempAddress: req.body.tempAddress,
            permanentAddress : req.body.permanentAddress,
            state : req.body.state,
            city : req.body.city,
            pinCode: req.body.pinCode,
            aadhar : req.body.aadhar,
            pan : req.body.pan,
            employeeStatus : req.body.employeeStatus,
            joiningDate : req.body.joiningDate,
            experienceLevel : req.body.experienceLevel
                }
      }, { new: true })
        .then(data => {
          if (!data) {
            return res.status(404).send({
              message: "Department name not found with id " + req.body.emplId
            });
          }
          res.status(200).send({
            msg: "Updated",
            data: data
          });
        }).catch(err => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "Department name not found with id " + req.body.emplId
            });
          }
          return res.status(500).send({
            message: "Error updating Department name with id " + req.body.emplId
          });
        });
}

//Delete Employee
exports.deleteemployee = (req, res) =>{
    employeeModel.remove({ emplId: req.body.emplId })
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Department not found with id " + req.body.emplId
            });
        }
        res.send({message: "Department deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Department not found with id " + req.body.emplId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Department with id " + req.body.emplId
        });
    });
}


const departmentModel = require('../models/department.model');
const AdminModel = require('../models/adminregister.model');
const loginModel = require('../models/logininfo.model');
const uuid = require('uuid4');

//List of department
exports.department = (req, res) =>{
    departmentModel.find({}, function(err, data) {
        if (err){
            res.send(err);
        }else {
            res.status(200).send({data:data});
        }
      });
}

//add new designation
exports.adddepartment = (req, res) => {
    departmentModel.findOne({ departmentName: req.body.departmentName }, (err, user) => {
        if (user) return res.status(400).send({ message: 'The Designation you have entered is already associated with another account.' });
        var deptid = uuid();
        try {
                var date = new Date().getTime();
                var createDate = (Math.round(date/1000));
                const department = new departmentModel({
                    deptId:deptid,
                    departmentName: req.body.departmentName,
                    contactPerson : req.body.contactPerson,
                    phone : req.body.phone,
                    email : req.body.email,
                    createDate : createDate,
                    username : req.body.username,
                    password : req.body.password,
                    departmentStatus : true,
                    role: req.body.role
                });
                //console.log(department);
                department.save((err,data) =>{
                    if(!err){   
                        
                        //res.status(200).send({msg:'Success',data:data});
                        saveToLoginInfo(req, data);

                    }
                    else{
                        console.log(err);
                    }
                })
            } catch (e) {
                res.status(500).send(e);
            }

            function saveToLoginInfo(request, user) {
                var logininfo = new loginModel(
                    {
                        username: user.username,
                        password: user.password,
                        role:  user.role,
                        sysCreatedDate: new Date(),
                        sysUpdatedDate: new Date()
                    }
                );
        
                logininfo.save((err, userinfodata) => {
                    if (!err) {
                        // Create a confirmation email token for this user
                    res.send({message: 'Success'});
                    } else if (userinfodata == "" || userinfodata == []) {
                        res.send({ message: "User not registered please check the data" });
                    } else {
                        return next(err);
                        // res.send({message:err});
                    }
                });
            }

        });
}

//edit and update designation 

exports.updatedepartment = (req, res) => {
    if (!req.body.departmentName) {
      return res.status(400).send({
        message: "Department name can not be empty"
      });
    }
    // Find note and update it with the request body
    departmentModel.findOneAndUpdate({ deptId: req.body.deptId }, {
      $set: { departmentName: req.body.departmentName }
    }, { new: true })
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: "Department name not found with id " + req.body.DeptId
          });
        }
        res.status(200).send({
          msg: "Updated",
          data: data
        });
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Department name not found with id " + req.body.deptId
          });
        }
        return res.status(500).send({
          message: "Error updating Department name with id " + req.body.deptId
        });
      });
  };

  // Delete a note with the specified noteId in the request
exports.deletedepartment = (req, res) => {
    departmentModel.remove({ deptId: req.body.deptId })
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Department not found with id " + req.body.deptId
            });
        }
        res.send({message: "Department deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Department not found with id " + req.body.deptId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Department with id " + req.body.deptId
        });
    });
};
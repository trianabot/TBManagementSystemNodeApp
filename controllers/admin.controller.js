const AdminModel = require('../models/adminregister.model');
const loginModel = require('../models/logininfo.model');
const hrModel = require('../models/hrregister.model');

const uuid = require('uuid4');


exports.register = (req, res) =>{

    AdminModel.findOne({ userName: req.body.userName }, (err, user) => {
        if (user) return res.status(400).send({ message: 'The username you have entered is already associated with another account.' });
        try {

        var id = uuid();

        const adminRegister = new AdminModel({
            adminId: id,
            userName: req.body.userName,
            password: req.body.password,
            role: req.body.role,
            sysCreatedDate: new Date(),
            sysUpdatedDate: new Date()
        });

        adminRegister.save((err,data) =>{
            if(!err){
                saveToLoginInfo(req, data);
            }
            else{
                console.log(err);
            }
        });
    } catch (e) {
        res.status(500).send(e);
    }
    
    function saveToLoginInfo(request, user) {
        var adminlogininfo = new loginModel(
            {
                userName: user.userName,
                password: user.password,
                role:  user.role,
                sysCreatedDate: new Date(),
                sysUpdatedDate: new Date()
            }
        );

        adminlogininfo.save((err, userinfodata) => {
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

exports.hrregister = (req, res) =>{
    hrModel.findOne({ userName: req.body.userName }, (err, user) => {
        if (user) return res.status(400).send({ message: 'The username you have entered is already associated with another account.' });
        try {

        var id = uuid();

        const hrRegister = new hrModel({
            hrId: id,
            userName: req.body.userName,
            password: req.body.password,
            role: req.body.role,
            sysCreatedDate: new Date(),
            sysUpdatedDate: new Date()
        });

        hrRegister.save((err,data) =>{
            if(!err){
                saveToLoginInfo(req, data);
            }
            else{
                console.log(err);
            }
        });
    } catch (e) {
        res.status(500).send(e);
    }
    
    function saveToLoginInfo(request, user) {
        var adminlogininfo = new loginModel(
            {
                userName: user.userName,
                password: user.password,
                role:  user.role,
                sysCreatedDate: new Date(),
                sysUpdatedDate: new Date()
            }
        );

        adminlogininfo.save((err, userinfodata) => {
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
var express = require('express');
var router = express.Router();
const loginModel = require('../models/logininfo.model');

//Login route
router.post('/login', (req, res)=>{
        //console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    loginModel.findOne({username: username, password:password, loginStatus:true}, function(err, user) {
        if(err) {
            return res.status(500).send();
        }
        if(!user) { 
            return res.status(404).send({msg:"Wrong Details"});
        }
        return res.status(200).send({msg:"success",user:user});
        // if(user){
        //     loginModel.findOne({loginStatus:true}, function(err, user){
        //         if(user){
        //             return res.status(200).send({msg:"success",user:user});
        //         }else {
        //             return res.status(403).send({msg:"Status false"});
        //         }            
        //         });
        // }
    });
});

module.exports = router;
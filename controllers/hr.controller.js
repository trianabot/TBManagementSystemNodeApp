const designationModel = require('../models/designation.model');
const uuid = require('uuid4');

//List of designation 
exports.designation = (req, res) =>{
    designationModel.find({}, function(err, data) {
        if (err){
            res.send(err);
        }else {
            res.status(200).send({data:data});
        }
      });
}

//add new designation
exports.adddesignation = (req, res) => {
    designationModel.findOne({ designationName: req.body.designationName }, (err, user) => {
        if (user) return res.status(400).send({ message: 'The Designation you have entered is already associated with another account.' });
        var id = uuid();
        try {
 
                const designation = new designationModel({
                    designationId:id,
                    designationName: req.body.designationName
                });

                designation.save((err,data) =>{
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

//edit and update designation 

exports.updateDesignation = (req, res) => {
    // res.send("test");
    // Validate Request
    if (!req.body.designationName) {
      return res.status(400).send({
        message: "Designation name can not be empty"
      });
    }
  
    // Find note and update it with the request body
    designationModel.findOneAndUpdate({ designationId: req.body.designationId }, {
      $set: { designationName: req.body.designationName }
    }, { new: true })
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: "Designation name not found with id " + req.body.designationId
          });
        }
        res.status(200).send({
          msg: "Updated",
          data: data
        });
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Designation name not found with id " + req.body.designationId
          });
        }
        return res.status(500).send({
          message: "Error updating Designation name with id " + req.body.designationId
        });
      });
  };

  // Delete a note with the specified noteId in the request
exports.deleteDesignation = (req, res) => {
        //console.log(req.body);
    designationModel.remove({ designationId: req.body.designationId })
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Designation not found with id " + req.body.designationId
            });
        }
        res.send({message: "Designation deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Designation not found with id " + req.body.designationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Designation with id " + req.body.designationId
        });
    });
};






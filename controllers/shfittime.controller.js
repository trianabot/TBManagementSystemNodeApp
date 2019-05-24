const shiftModel = require('../models/shifttime.model');
const uuid = require('uuid4');

 exports.shifts = (req, res) =>{
    shiftModel.find({}, function(err, data) {
        if (err){
            res.send(err);
        }else {
            res.status(200).send({data:data});
        }
      });
}

exports.addShift = (req, res) =>{
    shiftModel.findOne({ shiftName: req.body.shiftName }, (err, user) => {
        if (user) return res.status(400).send({ message: 'Shifttime name already exist' });
        var shiftId = uuid();
        try {
                const shift = new shiftModel({
                    shiftId:shiftId,
                    shiftName: req.body.shiftName
                });

                shift.save((err,data) =>{
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

//Update shift Name
exports.updateShift = (req, res) =>{
    if (!req.body.shiftName) {
        return res.status(400).send({
          message: "Shift name can not be empty"
        });
      }
      // Find note and update it with the request body
      shiftModel.findOneAndUpdate({ shiftId: req.body.shiftId }, {
        $set: { shiftName: req.body.shiftName }
      }, { new: true })
        .then(data => {
          if (!data) {
            return res.status(404).send({
              message: "Shift name not found with id " + req.body.shiftId
            });
          }
          res.status(200).send({
            msg: "Updated",
            data: data
          });
        }).catch(err => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "Shift name not found with id " + req.body.shiftId
            });
          }
          return res.status(500).send({
            message: "Error updating shift name with id " + req.body.shiftId
          });
        });
};

  // Delete a note with the specified noteId in the request
exports.deleteShift = (req, res) => {
    shiftModel.remove({ shiftId: req.body.shiftId })
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Shift name not found with id " + req.body.shiftId
            });
        }
        res.send({message: "Department deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Shift name not found with id " + req.body.shiftId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Shift name with id " + req.body.shiftId
        });
    });
};
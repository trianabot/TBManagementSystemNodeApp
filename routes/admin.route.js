const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

router.post('/register', adminController.register);
router.post('/hrregister', adminController.hrregister);

module.exports=router;
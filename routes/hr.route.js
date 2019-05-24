const express = require('express');
const router = express.Router();

const hrController = require('../controllers/hr.controller');
const deptController = require('../controllers/department.controller');
const shiftController = require('../controllers/shfittime.controller');
const employeeController = require('../controllers/employee.controller');

//designation
router.get('/designation', hrController.designation);
router.post('/adddesignation', hrController.adddesignation);
router.post('/updateDesignation', hrController.updateDesignation);
router.delete('/deleteDesignation', hrController.deleteDesignation);

//department
router.get('/department', deptController.department);
router.post('/adddepartment', deptController.adddepartment);
router.post('/updatedepartment', deptController.updatedepartment);
router.delete('/deletedepartment', deptController.deletedepartment);

//Shift timing 
router.get('/shifttime', shiftController.shifts);
router.post('/addshiftTime', shiftController.addShift);
router.post('/updateShift', shiftController.updateShift);
router.delete('/deleteShift', shiftController.deleteShift);

//Employee 
router.get('/employees', employeeController.employees);
router.post('/addemployee', employeeController.addemployee);
router.post('/updateemployee', employeeController.updateemployee);
router.delete('/deleteemployee', employeeController.deleteemployee);

module.exports=router;
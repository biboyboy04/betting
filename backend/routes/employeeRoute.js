import express from 'express';
import employeeController from '../controller/employeeController.js';
const router = express.Router();

router.post('/addEmployee', employeeController.addEmployee);
router.get('/getAllEmployee', employeeController.getAllEmployee);
router.get('/getEmployeeById/:id', employeeController.getEmployeeById);
router.put('/updateEmployee', employeeController.updateEmployee);
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee);

export default router;

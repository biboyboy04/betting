import express from 'express';
import employeeController from '../controller/employeeController.js';
const router = express.Router();

router.post('/', employeeController.add);
router.get('/', employeeController.getAll);
router.get('/byId/:id', employeeController.getById);
router.get('/byUsername/:username', employeeController.getByUsername);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);


export default router;

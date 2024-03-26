import express from 'express';
import teamController from '../controller/teamController.js';
const router = express.Router();

router.post('/', teamController.add);
router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);
router.put('/:id', teamController.update);
router.delete('/:id', teamController.delete);

export default router;



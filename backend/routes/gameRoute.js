import express from 'express';
import gameController from '../controller/gameController.js';
const router = express.Router();

router.post('/', gameController.add);
router.get('/', gameController.getAll);
router.get('/id', gameController.getAllId);
router.get('/byId/:id', gameController.getById);
router.put('/:id', gameController.update);
router.delete('/:id', gameController.delete);


export default router;

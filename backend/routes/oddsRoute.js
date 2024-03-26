import express from 'express';
import oddsController from '../controller/oddsController.js';
const router = express.Router();

router.post('/', oddsController.add);
router.get('/', oddsController.getAll);
router.get('/:id', oddsController.getById);
router.get('/byMatchId/:id', oddsController.getByMatchId);
router.put('/:id', oddsController.update);
router.delete('/:id', oddsController.delete);

export default router;




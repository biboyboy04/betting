import express from 'express';
import matchController from '../controller/matchController.js';
const router = express.Router();

router.post('/', matchController.add);
router.get('/', matchController.getAll);
router.get('/:id', matchController.getById);
router.get('/byDateAndTime/:dateTime', matchController.getByDateAndTime);
router.get('/byGameId/:id', matchController.getByGameId);
router.put('/:id', matchController.update);
router.delete('/:id', matchController.delete);


export default router;




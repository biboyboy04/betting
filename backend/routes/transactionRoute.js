import express from 'express';
import transactionController from '../controller/transactionController.js';
const router = express.Router();

router.post('/', transactionController.add);
router.get('/', transactionController.getAll);
router.get('/:id', transactionController.getById);
router.get('/byPlayer/:id', transactionController.getByPlayerId);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

export default router;
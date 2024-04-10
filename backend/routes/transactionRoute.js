import express from 'express';
import transactionController from '../controller/transactionController.js';
const router = express.Router();

router.post('/', transactionController.add);
router.get('/', transactionController.getAll);
router.get('/total', transactionController.getTotal);
router.get('/:type', transactionController.getAll);
router.get('/total/:type', transactionController.getTotal);
router.get('/:id', transactionController.getById);
router.get('/byPlayer/:id', transactionController.getByPlayerId);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

export default router;
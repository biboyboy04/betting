import express from 'express';
import playerController from '../controller/playerController.js';
const router = express.Router();

router.post('/', playerController.add);
router.post('/bet', playerController.bet)
router.get('/', playerController.getAll);
router.get('/total', playerController.getTotal);
router.get('/:id', playerController.getById);
router.get('/byUsername/:username', playerController.getByUsername);
router.put('/:id', playerController.update);
router.delete('/:id', playerController.delete);
router.put('/deposit/:id', playerController.deposit);
router.put('/withdraw/:id', playerController.withdraw);


export default router;

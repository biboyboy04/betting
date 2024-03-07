import express from 'express';
import playerController from '../controller/playerController.js';
const router = express.Router();

router.post('/', playerController.add);
router.get('/', playerController.getAll);
router.get('/:id', playerController.getById);
router.get('/byUsername/:username', playerController.getByUsername);
router.put('/:id', playerController.update);
router.delete('/:id', playerController.delete);
router.put('/addBalance/:id', playerController.addBalance);
router.put('/deductBalance/:id', playerController.deductBalance);


export default router;

import express from 'express';
import playerController from '../controller/playerController.js';
const router = express.Router();

router.post('/addPlayer', playerController.addPlayer);
router.get('/getAllPlayer', playerController.getAllPlayer);
router.get('/getPlayerById/:id', playerController.getPlayerById);
router.put('/updatePlayer/:id', playerController.updatePlayer);
router.delete('/deletePlayer/:id', playerController.deletePlayer);
router.put('/addBalance/:id', playerController.addBalance);
router.put('/deductBalance/:id', playerController.deductBalance);

export default router;

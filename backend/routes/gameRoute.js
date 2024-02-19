import express from 'express';
import gameController from '../controller/gameController.js';
const router = express.Router();

router.post('/addGame', gameController.addGame);
router.get('/getAllGame', gameController.getAllGame);
router.get('/getGameById', gameController.getGameById);
router.put('/updateGame', gameController.updateGame);
router.delete('/deleteGame', gameController.deleteGame);


export default router;

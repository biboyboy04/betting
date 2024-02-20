import express from 'express';
import gameController from '../controller/gameController.js';
const router = express.Router();

router.post('/addGame', gameController.addGame);
router.get('/getAllGame', gameController.getAllGame);
router.get('/getGameById/:id', gameController.getGameById);
router.put('/updateGame/:id', gameController.updateGame);
router.delete('/deleteGame/:id', gameController.deleteGame);


export default router;

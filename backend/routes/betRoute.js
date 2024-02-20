import express from 'express';
import betController from '../controller/betController.js';
const router = express.Router();

router.post('/addBet', betController.addBet);
router.get('/getAllBet', betController.getAllBet);
router.get('/getBetById/:id', betController.getBetById);
router.get('/getBetByPlayerId/:id', betController.getBetByPlayerId);
router.get('/getBetByMatchId/:id', betController.getBetByMatchId);
router.put('/updateBet/:id', betController.updateBet);
router.delete('/deleteBet/:id', betController.deleteBet);

//refactor
router.get('/getTotalMatchBets', betController.getTotalMatchBets);

export default router;


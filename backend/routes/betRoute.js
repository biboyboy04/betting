import express from 'express';
import betController from '../controller/betController.js';
const router = express.Router();

router.post('/addBet', betController.addBet);
router.get('/getAllBet', betController.getAllBet);
router.get('/getBetById', betController.getBetById);
router.get('/getBetByPlayerId', betController.getBetByPlayerId);
router.get('/getBetByMatchId', betController.getBetByMatchId);
router.put('/updateBet', betController.updateBet);
router.delete('/deleteBet', betController.deleteBet);

//refactor
router.get('/getTotalMatchBets', betController.getTotalMatchBets);

export default router;


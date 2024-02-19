import express from 'express';
import matchController from '../controller/matchController.js';
const router = express.Router();

router.post('/addMatch', matchController.addMatch);
router.get('/getAllMatch', matchController.getAllMatch);
router.get('/getMatchById', matchController.getMatchById);
router.get('/getMatchByDateAndTime', matchController.getMatchByDateAndTime);
router.get('/getMatchByGameId', matchController.getMatchByGameId);
router.put('/updateMatch', matchController.updateMatch);
router.delete('/deleteMatch', matchController.deleteMatch);

export default router;




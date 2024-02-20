import express from 'express';
import matchController from '../controller/matchController.js';
const router = express.Router();

router.post('/addMatch', matchController.addMatch);
router.get('/getAllMatch', matchController.getAllMatch);
router.get('/getMatchById/:id', matchController.getMatchById);
router.get('/getMatchByDateAndTime', matchController.getMatchByDateAndTime);
router.get('/getMatchByGameId/:id', matchController.getMatchByGameId);
router.put('/updateMatch/:id', matchController.updateMatch);
router.delete('/deleteMatch/:id', matchController.deleteMatch);

export default router;




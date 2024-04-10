import express from 'express';
import generateController from '../controller/generateController.js';
const router = express.Router();

router.post('/players', generateController.generateUsers);
router.post('/matches', generateController.generateMatches);
router.post('/bets', generateController.generateBets);
router.put('/winners', generateController.generateWinners);
// put for generateWInner? as we are just updating/??



export default router;

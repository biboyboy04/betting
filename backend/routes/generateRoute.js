import express from 'express';
import generateController from '../controller/generateController.js';
const router = express.Router();

router.get('/player/:numberOfPlayers', generateController.generateUsers);
router.get('/match/:numberOfMatches', generateController.generateMatches);
router.get('/bet/:numberOfBets', generateController.generateBets);
router.get('/winner', generateController.generateWinners);
// put for generateWInner? as we are just updating/??



export default router;

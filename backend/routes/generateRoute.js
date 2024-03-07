import express from 'express';
import generateController from '../controller/generateController.js';
const router = express.Router();

router.get('/player/:numberOfPlayers', generateController.generateUsers);
router.get('/match/:numberOfMatches', generateController.generateMatches);
router.get('/bet/:numberOfBets', generateController.generateBets);
// put for generateWInner? as we are just updating/??
router.get('/winner', generateController.generateWinners);


export default router;

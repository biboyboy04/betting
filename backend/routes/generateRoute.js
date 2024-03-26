import express from 'express';
import generateController from '../controller/generateController.js';
const router = express.Router();

router.post('/player', generateController.generateUsers);
router.post('/match', generateController.generateMatches);
router.post('/bet', generateController.generateBets);
router.put('/winner', generateController.generateWinners);
// put for generateWInner? as we are just updating/??



export default router;

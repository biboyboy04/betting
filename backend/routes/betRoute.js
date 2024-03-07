import express from 'express';
import betController from '../controller/betController.js';
const router = express.Router();

router.post('/', betController.add);
router.post('/payout', betController.payout);
router.get('/', betController.getAll);
router.get('/matchWithBets', betController.getMatchWithBets); // know why this is the working route order for this route
router.get('/:id', betController.getById);
router.get('/byPlayerId/:id', betController.getByPlayerId);
router.get('/byMatchId/:id', betController.getByMatchId);
router.put('/:id', betController.update);
router.delete('/:id', betController.delete);

//refactor?
router.get('/totalMatchBets/:id', betController.getTotalMatchBets);


export default router;

// will change player 

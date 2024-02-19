import express from 'express';
import teamController from '../controller/teamController.js';
const router = express.Router();

router.post('/addTeam', teamController.addTeam);
router.get('/getAllTeam', teamController.getAllTeam);
router.get('/getTeamById', teamController.getTeamById);
router.put('/updateTeam', teamController.updateTeam);
router.delete('/deleteTeam', teamController.deleteTeam);

export default router;

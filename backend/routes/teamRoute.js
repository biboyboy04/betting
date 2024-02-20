import express from 'express';
import teamController from '../controller/teamController.js';
const router = express.Router();

router.post('/addTeam', teamController.addTeam);
router.get('/getAllTeam/:id', teamController.getAllTeam);
router.get('/getTeamById/:id', teamController.getTeamById);
router.put('/updateTeam/:id', teamController.updateTeam);
router.delete('/deleteTeam/:id', teamController.deleteTeam);

export default router;

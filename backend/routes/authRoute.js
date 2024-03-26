import express from 'express';
import authController from '../controller/authController.js';
const router = express.Router();

router.post('/employee', authController.authenticateEmployee);
router.post('/player', authController.authenticatePlayer);
router.get('/getUser', authController.getUser);
router.delete('/logout', authController.logout);

export default router;

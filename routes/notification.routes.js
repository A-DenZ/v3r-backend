import express from 'express';
import { updateOpenedOn, fetchAllNotificationByUser } from '../controllers/notifications.js';

const router = express.Router();

router.get('/fetch/:userID' ,fetchAllNotificationByUser );
router.put('/opened' , updateOpenedOn)

export default router;
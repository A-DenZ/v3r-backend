import express from 'express';
import { updateOpenedOn, fetchAllNotification, fetchAllNotificationByUser } from '../controllers/notifications.js';

const router = express.Router();

router.get('/fetchall' , fetchAllNotification ); 
router.get('/fetch' , fetchAllNotificationByUser );
router.put('/opened' , updateOpenedOn)

export default router;
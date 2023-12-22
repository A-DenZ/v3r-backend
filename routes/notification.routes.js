import express from 'express';
import { updateOpenedOn, fetchAllNotificationByUser } from '../controllers/notifications.js';

const router = express.Router();

router.get('/fetch/:userID' ,fetchAllNotificationByUser );
router.patch('/open/:id' , updateOpenedOn)

export default router;
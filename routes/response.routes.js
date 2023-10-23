import express from 'express';
import { storeAuditSSTResponse, storeIncidentReportResponse } from '../controllers/responses';

const router = express.Router();

router.get('/responseAuditSST' , storeAuditSSTResponse); 
router.get('/responseIncidentReport' , storeIncidentReportResponse);


export default router;
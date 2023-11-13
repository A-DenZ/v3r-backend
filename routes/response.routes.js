import express from 'express';
import { storeAuditSSTResponse, storeIncidentReportResponse , storeWorkingAccidentReport, storeSSD , fetchAllResponse } from '../controllers/responses.js';

const router = express.Router();

router.post('/auditsst' , storeAuditSSTResponse); 
router.post('/incidentreport' , storeIncidentReportResponse);
router.post('/workingaccidentreport' , storeWorkingAccidentReport);
router.post('/ssd' , storeSSD);

router.get('/fetchallresponse', fetchAllResponse)

export default router;
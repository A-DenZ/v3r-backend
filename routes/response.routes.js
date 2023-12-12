import express, { Router } from 'express';
import { storeAuditSSTResponse, storeIncidentReportResponse , storeWorkingAccidentReport, storeSSD , fetchAllResponse, fetchMyResponse, fetchEmployeeResponse } from '../controllers/responses.js';

const router = express.Router();

router.post('/auditsst' , storeAuditSSTResponse); 
router.post('/incidentreport' , storeIncidentReportResponse);
router.post('/workingaccidentreport' , storeWorkingAccidentReport);
router.post('/ssd' , storeSSD);

router.get('/fetchallresponse', fetchAllResponse)
router.get('/fetchmyresponse', fetchMyResponse)
router.get('/fetchemployeeresponse', fetchEmployeeResponse)

export default router;
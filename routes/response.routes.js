import express, { Router } from 'express';
import { storeAuditSSTResponse, storeIncidentReportResponse , storeWorkingAccidentReport, storeSSD , fetchAllResponse, fetchMyResponse, fetchEmployeeResponse, updateReadStatus, chartResponseInfo } from '../controllers/responses.js';

const router = express.Router();

router.post('/auditsst' , storeAuditSSTResponse); 
router.post('/incidentreport' , storeIncidentReportResponse);
router.post('/workingaccidentreport' , storeWorkingAccidentReport);
router.post('/ssd' , storeSSD);

router.get('/fetchallresponse', fetchAllResponse)
router.get('/fetchmyresponse/:userID', fetchMyResponse)
router.get('/fetchemployeeresponse/:userID', fetchEmployeeResponse)
router.get('/fetchanalyticsresponse', chartResponseInfo)

router.patch('/updateread', updateReadStatus)

export default router;
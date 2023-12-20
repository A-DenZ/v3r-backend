import express from 'express';
import { fetchDepartments } from '../controllers/departments.js';

const router = express.Router();

router.get('/', fetchDepartments);

export default router;
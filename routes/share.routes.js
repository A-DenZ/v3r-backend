import express from 'express'
import { storeSharedLink, fetchAllSharedLink }  from '../controllers/share.js'

const router = express.Router()

router.post('/link', storeSharedLink)
router.get('/fetchallsharedlink', fetchAllSharedLink)

export default router
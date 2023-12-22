import express from 'express'
import { fetchSharedDocuments, createSharedDocument, deleteDocument, updateDocument, fetchMySharedDocuments }  from '../controllers/share.js'

const router = express.Router()

router.post('/new', createSharedDocument)

router.get('/', fetchSharedDocuments)

router.get('/:id', fetchMySharedDocuments)

router.delete('/:id', deleteDocument)

router.put('/', updateDocument)

export default router
import express from 'express'
import { fetchSharedDocuments, createSharedDocument, deleteDocument, updateDocument }  from '../controllers/share.js'

const router = express.Router()

router.post('/new', createSharedDocument)

router.get('/', fetchSharedDocuments)

router.delete('/:id', deleteDocument)

router.put('/', updateDocument)

export default router
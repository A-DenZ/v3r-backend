import pool from '../config/db.config.js'
import dotenv from 'dotenv'
import { validateForm } from '../utilities/request/request.js'

const fetchAllDocuments = 'SELECT sd.id, sd.title AS title, sd.link AS link, JSON_ARRAYAGG(d.name) AS departments FROM sharedDocument sd JOIN sharedDocument_department sdd ON sd.id = sdd.docId JOIN department d ON sdd.depId = d.id GROUP BY sd.id, sd.title, sd.link'
const fetchDocumentById = 'SELECT sd.id, sd.title AS title, sd.link AS link, JSON_ARRAYAGG(d.name) AS departments FROM sharedDocument sd JOIN sharedDocument_department sdd ON sd.id = sdd.docId JOIN department d ON sdd.depId = d.id WHERE sd.id = ? GROUP BY sd.id, sd.title, sd.link'

export const createSharedDocument = async (req, res) => {
    const { title, link, departments } = req.body


    try {
        const insertDoc = 'INSERT INTO sharedDocument (title, link) VALUES (?, ?)'
        const joinDocToDep = 'INSERT INTO sharedDocument_department (docId, depId) VALUES (?, ?)'
        const fetchAllDepartments = 'SELECT * FROM department'

        // create new sharedDocument row
        const insertedDocResult = await pool.query(insertDoc, [title, link])
        const docId = insertedDocResult?.[0]?.insertId

        // create rows in junction table for each department
        const storedDepartments = await pool.query(fetchAllDepartments)
        const deps = storedDepartments?.[0]

        const departmentInsertions = departments.map(async (department) => {
            const depId = deps.find((dep) => dep.name === department)?.id
            if (depId) {
                await pool.query(joinDocToDep, [docId, depId])
            }
        })

        await Promise.all(departmentInsertions)

        const newDoc = await pool.query(fetchDocumentById, [docId])


        if (newDoc?.[0]?.length === 0) throw new Error('Erreur back-end')

        res.status(201).json(newDoc?.[0]?.[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erreur du serveur' })
    }
}

export const fetchSharedDocuments = async (req, res) => {
    try {
        const sharedDocuments = await pool.query(fetchAllDocuments)

        res.status(200).json(sharedDocuments?.[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erreur du serveur' })
    }
}

export const deleteDocument = async (req, res) => {
    const { id } = req.params

    try {
        const deleteDocDepartmentRelations = 'DELETE FROM sharedDocument_department WHERE docId = ?'
        const deleteDocument = 'DELETE FROM sharedDocument WHERE id = ?'
        
        await pool.query(deleteDocDepartmentRelations, [id])
        await pool.query(deleteDocument, [id])


        res.status(200).json(id)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erreur du serveur' })
    }
}

export const updateDocument = async (req, res) => {
    const { id, title, link, departments } = req.body

    try {
        const updateDoc = 'UPDATE sharedDocument SET title = ?, link = ? WHERE id = ?'
        const deleteDocDepartmentRelations = 'DELETE FROM sharedDocument_department WHERE docId = ?'
        const joinDocToDep = 'INSERT INTO sharedDocument_department (docId, depId) VALUES (?, ?)'
        const fetchAllDepartments = 'SELECT * FROM department'

        // update sharedDocument row
        await pool.query(updateDoc, [title, link, id])

        // delete all rows in junction table for this document
        await pool.query(deleteDocDepartmentRelations, [id])

        // create rows in junction table for each department
        const storedDepartments = await pool.query(fetchAllDepartments)
        const deps = storedDepartments?.[0]

        const departmentInsertions = departments.map(async (department) => {
            const depId = deps.find((dep) => dep.name === department)?.id
            if (depId) {
                await pool.query(joinDocToDep, [id, depId])
            }
        })

        await Promise.all(departmentInsertions)

        const updatedDoc = await pool.query(fetchDocumentById, [id])

        if (updatedDoc?.[0]?.length === 0) throw new Error('Erreur back-end')

        res.status(200).json(updatedDoc?.[0]?.[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erreur du serveur' })
    }
}

export const fetchMySharedDocuments = async (req, res) => {
    const { id } = req.params

    try {
        const userResponse = await pool.query('SELECT * FROM user INNER JOIN department WHERE user.id = ?', [id])
        const user = userResponse?.[0]?.[0]
        
        if (!user) throw new Error('Utilisateur non trouvé')
        console.log('User: ', user?.firstName)

        // fetch all documents
        const documentsResponse = await pool.query(fetchAllDocuments)
        const documents = documentsResponse?.[0]
        console.log('documents: ', documents)

        // return all documents if user is admin
        if (user?.accessLevel === 3) return res.status(200).json(documents)

        // return documents that belong to user's department
        const myDocuments = documents?.filter(document => document?.departments?.includes(user?.name))
        console.log('myDocuments: ', myDocuments)

        res.status(200).json(myDocuments)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erreur du serveur' })
    }
}
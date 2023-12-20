import pool from '../config/db.config.js'

export const fetchDepartments = async (req, res) => {
    try {
        const fetchAllDepartments = 'SELECT * FROM department'
        
        const departments = await pool.query(fetchAllDepartments)

        res.status(200).json(departments?.[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erreur du serveur' })
    }
}